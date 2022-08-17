import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { NgFerhadoTranslatorPipe } from "src/app/services/ng-f-translator/ng-f-translator.pipe";

@Injectable({
  providedIn: "root",
})
export class GlobalToastService {
  constructor(
    private ToastController: ToastController,
    public tr: NgFerhadoTranslatorPipe
  ) {}

  async callToast(
    message: string = "msg",
    header: string = "",
    position: any = "top",
    icon: string = "",
    duration: number = 0,
    ok_btn: boolean = false,
    color: string = ""
  ) {
    let options: any = {
      message: this.tr.transform(message),
      position: position,
      translucent: true,
      cssClass: "global_toast",
      buttons: [],
    };

    // DYNAMIC FIELDS AND OPTIONS
    if (!!header) options.header = this.tr.transform(header);
    if (!!icon) options.buttons.push({ side: "start", icon: icon });
    if (!!duration) options.duration = duration;
    if (!!ok_btn) options.buttons.push({ text: "Ok", role: "cancel" });

    // AVAILABLE options: "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark"
    if (!!color) {
      options.color = color;
      options.translucent = false;
    }

    const toast = await this.ToastController.create(options);
    toast.present();
  }
}
