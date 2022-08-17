import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { environment } from "src/environments/environment";
import { Device } from "@ionic-native/device/ngx";

@Injectable({
  providedIn: "root",
})
export class OneSignalService {
  constructor(
    private oneSignal: OneSignal,
    private device: Device,
    private alertCtrl: AlertController
  ) {}

  addTag(key, value) {
    console.log(key + " | " + value);
    this.oneSignal.sendTag(key, value);
  }

  setEUid(uid) {
    this.oneSignal.setExternalUserId(uid);
  }

  showDID() {
    console.log(this.device.uuid);
  }

  setupPush() {
    this.oneSignal.startInit(environment.oneSignal, environment.googleFirebase);
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.None
    );
    this.setEUid(this.device.uuid);

    // Notifcation was received
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      let additionalData = data.notification.payload.additionalData;
      this.showAlert(
        "Notification opened",
        "You already read this before",
        additionalData.task
      );
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          },
        },
      ],
    });
    alert.present();
  }
}
