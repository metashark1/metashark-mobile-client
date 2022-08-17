import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { GlobalToastService } from 'src/app/services/global-toast.service';
import { UserService } from 'src/app/services/user.service';
import { HttpUserService } from 'src/app/services/http-user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isSaving: boolean = false;
  passwordType: any = {
    password: 'password',
    password2: 'password'
  };

  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private GlobalToastService: GlobalToastService,
    private _userService: UserService,
    private httpUserService: HttpUserService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  // FORM CONFIRM INIT 
  private initForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(17)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.checkPasswords });
  }

  // GET VALIDITY CONFIRM FORM BY FIELDNAME
  getValidity(controlName: string): boolean {
    return this.registrationForm.controls[controlName].invalid && this.registrationForm.controls[controlName].touched;
  }

  // CHECK PASSWORDS EQUALS 
  checkPasswords(group: FormGroup) {
    return ((group.get('password2').value).length >= 8 && (group.get('password').value !== group.get('password2').value)) ? { notSamePassword: true } : null
  }

  // ON SUBMIT CONFIRM FORM VALIDATION HIGHTLIGHT
  onSubmitConfirm() {
    // validation start
    const controls = this.registrationForm.controls;
    if (this.registrationForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.isSaving = true;
    }
    // validation end

    this.httpUserService.simplePostData(this.registrationForm.value, 'registration')
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp && resp.status && (resp.data && resp.data.profile)) {
            this.publishSuccess(resp.data.profile, resp.data.token);
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.isSaving = false;
          }

        },
        error => {
          console.log(error);
          this.isSaving = false;
          if (error.error) {
            this.GlobalToastService.callToast(error.error.message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
          }
        }
      );
  }

  // PUBLISH SUCCESS PROCESSING
  publishSuccess(profile, token) {
    // this.storage.set('phone', profile.phone);
    this.isSaving = false;
    if (profile.name) {
      this._userService.logIn(token, profile);
    } else {
      this._userService.logIn(token, profile, true);
    }
  }

  togglePasswordMode(field) {
    this.passwordType[field] = this.passwordType[field] === 'text' ? 'password' : 'text';
  }

}


