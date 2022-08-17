import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController, ModalController } from '@ionic/angular';
import { NgFerhadoTranslatorPipe } from '../services/ng-f-translator/ng-f-translator.pipe';
import { IconBadgeService } from '../services/icon-badge.service';
import { StorageService } from '../services/storage.service';
import { SearchboxComponent } from '../components/searchbox/searchbox.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  constructor(
    public _userService: UserService,
    private storage: StorageService,
    public alertController: AlertController,
    public modalController: ModalController,
    public tr: NgFerhadoTranslatorPipe,
    public bs: IconBadgeService
  ) { }

  ngOnInit() { }

  async fnCallOrder() {
    const alert = await this.alertController.create({
      header: this.tr.transform('call_order'),
      message: this.tr.transform('call_order_txt'),
      buttons: [
        {
          text: this.tr.transform('no'),
          role: 'cancel',
          cssClass: 'secondary ion-text-capitalize'
        }, {
          text: this.tr.transform('yes'),
          cssClass: 'ion-text-capitalize',
          handler: () => {
            window.location.href = 'tel: ' + this._userService.appConfig.callOrderCreatePhone;
          }
        }
      ]
    });

    await alert.present();
  }

  searchBox() {
    console.log('searchBox fn call');

    this.autocompleteCall();
  }

  async autocompleteCall() {
    const modal = await this.modalController.create({
      component: SearchboxComponent,
      swipeToClose: true,
      componentProps: { inpAddress: '', isBounded: true }
    });
    modal.onDidDismiss().then(data => {
      // if (data.data != undefined) this.fromChange(data.data);
      console.log(data);
    })
    await modal.present();
  }

}
