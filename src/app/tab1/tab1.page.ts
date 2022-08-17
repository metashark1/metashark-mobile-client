import { Component, Input, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public _userService: UserService,
    private vibration: Vibration,
    private taptic: TapticEngine,
    route: ActivatedRoute,
    public modalController: ModalController,
    private storage: StorageService
  ) { }

  ionViewWillEnter() {
    console.log('Tab1Page ionViewWillEnter');
    // this.courier.wanaBeCourier = this.storage.get('wanaBeCourier');
  }

  ngOnInit() {
  }

  doRefresh(event) {
    // this.vibration.vibrate(500);
    this.taptic.selection();
  }

  doInfinite(event) {
    this.taptic.selection();
  }

  // async courierQuestions() {
  //   const modal = await this.modalController.create({
  //     component: CourierQuestionsComponent,
  //     swipeToClose: false,
  //     componentProps: { },
  //     cssClass: 'block_content_modal'
  //   });
  //   modal.onDidDismiss().then(data => {
  //     // console.log(data);
  //   })
  //   await modal.present();
  // }

}