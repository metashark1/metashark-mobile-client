import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { GlobalToastService } from 'src/app/services/global-toast.service';

@Component({
  selector: 'app-comments-add-modal',
  templateUrl: './comments-add-modal.page.html',
  styleUrls: ['./comments-add-modal.page.scss'],
})
export class CommentsAddModalPage implements OnInit {
  @Input() movieId;
  commentForm: FormGroup;
  inProcess: boolean = false;

  constructor(
    public ModalController: ModalController,
    private fb: FormBuilder,
    private RequestService: RequestService,
    private GlobalToastService: GlobalToastService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  // FORM INITIALIZATION 
  private initForm() {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // GET VALIDITY single field
  getValidity(controlName: string): boolean {
    return this.commentForm.controls[controlName].invalid && this.commentForm.controls[controlName].touched;
  }

  // ON SUBMIT FORM VALIDATION HIGHTLIGHT
  onSubmit() {
    // validation start
    const controls = this.commentForm.controls;
    if (this.commentForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    } else {
      this.inProcess = true;
    }
    // validation end

    // fetch start 
    this.RequestService.commentPost(this.movieId, this.commentForm.value)
      .subscribe(
        (resp: any) => {
          console.log(resp);

          if (resp && resp.status) {
            this.inProcess = false;
            this.dismiss();
            this.GlobalToastService.callToast('comment_success_publish', 'success', 'top', 'alert-circle-outline', 3000, true, 'success');
          } else {
            const message = (resp.message) ? resp.message : 'have_some_error';
            this.GlobalToastService.callToast(message, 'error', 'top', 'alert-circle-outline', 3000, true, 'danger');
            this.inProcess = false;
          }
        },
        error => console.log(error)
      );
  }

  dismiss() {
    this.ModalController.dismiss(false);
  }

}

