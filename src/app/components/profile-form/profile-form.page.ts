import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { GlobalToastService } from 'src/app/services/global-toast.service';
import { UserService } from 'src/app/services/user.service';
import { HttpUserService } from 'src/app/services/http-user.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.page.html',
  styleUrls: ['./profile-form.page.scss'],
})
export class ProfileFormPage implements OnInit {
  profileForm: FormGroup;
  chPassForm: FormGroup;
  inProcess: any = [];
  formType: string = 'profile';
  pageTitle: string = 'profile';

  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private GlobalToastService: GlobalToastService,
    private _userService: UserService,
    private httpUserService: HttpUserService,
    private NavController: NavController,
    private route: ActivatedRoute,
  ) {

    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (params && params.type) {
          this.formType = params.type;
          this.pageTitle = params.type;
        }
      })
  }

  ngOnInit() {
    this.initForm();
    this.initRestoreConfirmForm();
  }

  // FORM INITIALIZATION 
  private initForm() {
    this.profileForm = this.fb.group({
      email: [this._userService.userData.email, [Validators.required]],
      name: [this._userService.userData.name, [Validators.required, Validators.minLength(2)]],
      phone: [this._userService.userData.phone, [Validators.minLength(17)]]
    });
  }

  // FORM init 
  private initRestoreConfirmForm() {
    this.chPassForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword2: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.checkPasswords });
  }

  // GET VALIDITY single field
  getValidity(controlName: string): boolean {
    return this.profileForm.controls[controlName].invalid && this.profileForm.controls[controlName].touched;
  }

  // GET VALIDITY CONFIRM FORM BY FIELDNAME
  getValidityRestore(controlName: string): boolean {
    return this.chPassForm.controls[controlName].invalid && this.chPassForm.controls[controlName].touched;
  }

  // CHECK PASSWORDS EQUALS 
  checkPasswords(group: FormGroup) {
    return ((group.get('newPassword2').value).length >= 8 && (group.get('newPassword').value !== group.get('newPassword2').value)) ? { notSamePassword: true } : null
  }

  // ON SUBMIT FORM VALIDATION HIGHTLIGHT
  onSubmitProfile() {
    // validation start
    const controls = this.profileForm.controls;
    if (this.profileForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.inProcess['profile'] = true;
    }
    // validation end

    // fetch start 
    this.httpUserService.simplePostData(this.profileForm.value, 'profile')
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp && resp.status) {
            this.inProcess['profile'] = false;
            this.GlobalToastService.callToast('profile save', 'success', 'top', 'alert-circle-outline', 3000, true, 'success');
            console.log('herrerer');
            this._userService.updateUserData();
            this.NavController.navigateRoot(['/user/profile']);
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.inProcess['profile'] = false;
          }

        },
        error => console.log(error)
      );
  }

  // ON SUBMIT FORM VALIDATION HIGHTLIGHT
  onSubmitPassword() {
    // validation start
    const controls = this.chPassForm.controls;
    if (this.chPassForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.inProcess['password'] = true;
    }
    // validation end

    // fetch start 
    this.httpUserService.simplePostData(this.chPassForm.value, 'passwordChange')
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp && resp.status) {
            this.inProcess['password'] = false;
            this.GlobalToastService.callToast('password change', 'success', 'top', 'alert-circle-outline', 3000, true, 'success');
            console.log('herrerer');
            this._userService.updateUserData();
            this.NavController.navigateRoot(['/user/profile']);
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.inProcess['password'] = false;
          }

        },
        error => console.log(error)
      );
  }
}



