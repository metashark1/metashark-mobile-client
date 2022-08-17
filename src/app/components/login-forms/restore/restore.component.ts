import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { GlobalToastService } from 'src/app/services/global-toast.service';
import { UserService } from 'src/app/services/user.service';
import { HttpUserService } from 'src/app/services/http-user.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss'],
})
export class RestoreComponent implements OnInit {
  @Output() goToAuth: EventEmitter<any> = new EventEmitter<any>();
  restoreForm: FormGroup;
  restoreConfirmForm: FormGroup;
  isSaving: any = [];
  showRestoreForm: boolean = false;
  passwordType: any = {
    newPassword: 'password',
    newPassword2: 'password'
  };

  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private GlobalToastService: GlobalToastService,
    private _userService: UserService,
    private httpUserService: HttpUserService
  ) { }

  ngOnInit() {
    this.initRestoreForm();
    this.initRestoreConfirmForm();
  }

  // FORM Phone init 
  private initRestoreForm() {
    this.restoreForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(17)]]
    });
  }

  // FORM init 
  private initRestoreConfirmForm() {
    this.restoreConfirmForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(4)]],
      login: [''],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword2: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.checkPasswords });
  }

  // GET VALIDITY PHONE FORM BY FIELDNAME
  getValidity(controlName: string): boolean {
    return this.restoreForm.controls[controlName].invalid && this.restoreForm.controls[controlName].touched;
  }

  // GET VALIDITY CONFIRM FORM BY FIELDNAME
  getValidityRestore(controlName: string): boolean {
    return this.restoreConfirmForm.controls[controlName].invalid && this.restoreConfirmForm.controls[controlName].touched;
  }

  // CHECK PASSWORDS EQUALS 
  checkPasswords(group: FormGroup) {
    return ((group.get('newPassword2').value).length >= 8 && (group.get('newPassword').value !== group.get('newPassword2').value)) ? { notSamePassword: true } : null
  }

  // ON SUBMIT FORM VALIDATION HIGHTLIGHT
  onSubmitRestore() {
    console.log('onSubmitRestore fn start');

    // validation Highlight
    const controls = this.restoreForm.controls;
    if (this.restoreForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.isSaving['restore'] = true;
    }

    this.httpUserService.simplePostData(this.restoreForm.value, 'passwordRestore')
      .subscribe(
        (resp: any) => {
          console.log(resp);

          if (resp && resp.status) {
            this.showRestoreForm = true;

            this.restoreConfirmForm.patchValue({
              login: this.restoreForm.value.login
            });

          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.isSaving['restore'] = false;
          }
        },
        error => {
          console.log(error);
          this.isSaving['restore'] = false;
          if (error.error) {
            this.GlobalToastService.callToast(error.error.message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
          }
        }
      );
  }

  // ON SUBMIT FORM VALIDATION HIGHTLIGHT
  onSubmitRestoreConfirm() {
    console.log('onSubmitRestoreConfirm fn start');

    // validation start
    const controls = this.restoreConfirmForm.controls;
    if (this.restoreConfirmForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.isSaving['confirm'] = true;
    }
    // validation end

    this.httpUserService.simplePostData(this.restoreConfirmForm.value, 'passwordRestoreConfirm')
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp && resp.status) {
            this.publishSuccess();
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.isSaving['confirm'] = false;
          }

        },
        error => {
          console.log(error);
          this.isSaving['confirm'] = false;
          if (error.error) {
            this.GlobalToastService.callToast(error.error.message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
          }
        }
      );
  }

  // PUBLISH SUCCESS PROCESSING
  publishSuccess() {
    this.GlobalToastService.callToast('password_restore_success', 'error', 'top', 'checkmark-circle-outline', 4000, true, 'success');
    this.isSaving['confirm'] = false;
    this.goToAuth.emit(true);
  }

  togglePasswordMode(field) {
    this.passwordType[field] = this.passwordType[field] === 'text' ? 'password' : 'text';
  }

}
