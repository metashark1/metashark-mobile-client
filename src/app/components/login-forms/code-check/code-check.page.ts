import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { timer } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { UrlManagerService } from '../../../services/url-manager.service';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../services/storage.service';
import { NavController } from '@ionic/angular';
import { HttpUserService } from 'src/app/services/http-user.service';
import { GlobalToastService } from 'src/app/services/global-toast.service';

@Component({
  selector: 'app-code-check',
  templateUrl: './code-check.page.html',
  styleUrls: ['./code-check.page.scss'],
})
export class CodeCheckPage implements OnInit {
  codeForm: FormGroup;
  userEmail: any;
  isSaving: any = [];
  timer: any;
  timerSubscribe: any;
  source: any = timer(1000, 1000);
  formRespError: string;

  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public _userService: UserService,
    private urlManager: UrlManagerService,
    private NavController: NavController,
    private httpUserService: HttpUserService,
    private GlobalToastService: GlobalToastService,
  ) { }

  ngOnInit() {
    this.userEmail = this.storage.get('email');
    this.initForm();
    this.timerStart();
  }

  // FORM init
  private initForm() {
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
      email: [this._userService.userData.email]
    }
    );
  }

  // Get VALIDITY single field
  getValidity(controlName: string): boolean {
    return this.codeForm.controls[controlName].invalid && this.codeForm.controls[controlName].touched;
  }

  onSubmit() {
    // validation Highlight
    const controls = this.codeForm.controls;
    if (this.codeForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.isSaving['form'] = true;
    }

    this.httpUserService.simplePostData(this.codeForm.value, 'emailConfirm')
      .subscribe(
        (resp: any) => {
          console.log(resp);

          if (resp && resp.status && (resp.data && resp.data.profile)) {
            console.log('publishSuccess');
            this.publishSuccess(resp.data.profile, resp.data.token);
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.isSaving['form'] = false;
          }

        },
        error => {
          console.log(error);
          this.isSaving['form'] = false;
          if (error.error) {
            this.GlobalToastService.callToast(error.error.message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
          }
        }
      );
  }

  publishSuccess(profile, token) {
    this.isSaving['form'] = false;
    this._userService.logIn(token, profile);
  }

  timerStart() {
    this.timerSubscribe = this.source.subscribe((val) => {
      this.timer = (60 - val);
      if (val == 60) this.timerStop();
    });
  }

  timerStop() {
    this.timerSubscribe.unsubscribe();
    this.timer = true;
  }

  codeResend() {
    this.timerStop();
    this.httpUserService.simplePostData({ email: this._userService.userData.email }, 'emailCodeResend')
      .subscribe(
        (resp: any) => {
          console.log(resp);

          if (resp && resp.status) {
            console.log('publishSuccess');
            this.GlobalToastService.callToast('code_resend_success', 'success', 'top', 'alert-circle-outline', 3000, true, 'success');
            this.timerStart();
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.isSaving['timer'] = false;
          }

        },
        error => {
          console.log(error);
          this.isSaving['timer'] = false;
          if (error.error) {
            this.GlobalToastService.callToast(error.error.message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
          }
        }
      );
  }

}
