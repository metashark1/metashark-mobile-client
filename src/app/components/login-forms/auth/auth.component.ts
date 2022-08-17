import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { GlobalToastService } from 'src/app/services/global-toast.service';
import { UserService } from 'src/app/services/user.service';
import { HttpUserService } from 'src/app/services/http-user.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authorizationForm: FormGroup;
  inProcess = false;
  passwordType: string = 'password';

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

  // FORM INITIALIZATION 
  private initForm() {
    this.authorizationForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(17)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // GET VALIDITY single field
  getValidity(controlName: string): boolean {
    return this.authorizationForm.controls[controlName].invalid && this.authorizationForm.controls[controlName].touched;
  }

  // ON SUBMIT FORM VALIDATION HIGHTLIGHT
  onSubmit() {
    // validation start
    const controls = this.authorizationForm.controls;
    if (this.authorizationForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.inProcess = true;
    }
    // validation end

    // fetch start 
    this.httpUserService.simplePostData(this.authorizationForm.value, 'auth')
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp && resp.status && (resp.data && resp.data.profile)) {
            this.publishSuccess(resp.data.token, resp.data.profile);
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.inProcess = false;
          }

        },
        error => console.log(error)
      );
  }

  // PUBLISH SUCCESS PROCESSING
  publishSuccess(token, profile): void {
    this.storage.set('phone', profile.phone);
    this.inProcess = false;
    if (profile.name) {
      this._userService.logIn(token, profile);
    } else {
      this._userService.logIn(token, profile, true);
    }
  }

  togglePasswordMode() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

}



