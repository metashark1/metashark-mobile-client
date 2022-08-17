import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { NgFerhadoTranslatorPipe } from 'src/app/services/ng-f-translator/ng-f-translator.pipe';
import { RequestService } from 'src/app/services/request.service';
import { CommentsAddModalPage } from './comments-add-modal/comments-add-modal.page';
import { CommentsDetailModalComponent } from './comments-detail-modal/comments-detail-modal.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [DatePipe]
})
export class CommentsComponent implements OnInit {
  @Input() movieId;
  isLoaded: any = [];
  commentsList: any = [];

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public tr: NgFerhadoTranslatorPipe,
    private RequestService: RequestService,
    public alertController: AlertController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    console.log('CommentsComponent.OnInit');
    this.getCommentsList();
  }

  getCommentsList() {
    console.log('AdditionalParamsService.getCommentsList fn start');
    this.isLoaded['comments'] = false;

    this.RequestService.getCommentsList(this.movieId)
      .subscribe(req => {
        console.log(req);
        this.isLoaded['comments'] = true;

        if (req && req.status && req.data) {
          this.commentsList = req.data;
        }
      });
  }

  // async commentDetail(comment) {
  //   console.log('commentDetail fn call');

  //   const modal = await this.modalController.create({
  //     component: CommentsDetailModalComponent,
  //     swipeToClose: true,
  //     presentingElement: this.routerOutlet.nativeEl,
  //     componentProps: { item: comment }
  //   });
  //   modal.onDidDismiss().then(data => {
  //     console.log(data);
  //   })
  //   await modal.present();
  // }

  async commentDetail(comment) {
    const alert = await this.alertController.create({
      cssClass: 'comment-alert',
      // header: 'Alert',
      subHeader: this.datePipe.transform(comment?.createdAt, 'dd.MM.yyyy hh:mm'),
      message: comment.text,
      buttons: [
        {
          text: 'This spoiler',
          cssClass: 'text-danger',
          handler: () => {
            console.log('This spoiler fn start');
            this.commentSpoilerConfirm();
          },
        },
        {
          text: 'Close',
          role: 'cancel'
        }
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async commentSpoilerConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'comment-alert',
      header: 'Are you sure?',
      // message: 'text',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('commentSpoilerConfirm');
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async addComment() {
    console.log('addComment fn call');

    const modal = await this.modalController.create({
      component: CommentsAddModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { movieId: this.movieId }
    });
    modal.onDidDismiss().then(data => {
      console.log(data);
    })
    await modal.present();
  }

}
