import { Component } from "@angular/core";
import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { UserService } from "./services/user.service";
import { NgFerhadoTranslator } from "./services/ng-f-translator";
import { environment } from "src/environments/environment";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { StorageService } from "src/app/services/storage.service";
// import { OneSignalService } from "./services/one-signal.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  ln: string;
  isMobileBrowser: boolean;
  platformName: string;
  versionIsActual: boolean = true;
  currDate: any = new Date();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _userService: UserService,
    public translator: NgFerhadoTranslator,
    private keyboard: Keyboard,
    // private osignal: OneSignalService,
    private storage: StorageService,
    public modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // if (this.platform.is("cordova")) {
      //   this.osignal.setupPush();
      // }

      if (this.platform.platforms().includes("mobile")) {
        this.isMobileBrowser = true;
      }

      if (this.platform.platforms().includes("ios")) {
        this.platformName = "ios";
      } else if (this.platform.platforms().includes("android")) {
        this.platformName = "android";
      } else {
        this.platformName = this.platform.platforms()[0];
        this.isMobileBrowser = false;
      }

      // this.keyboard.setKeyboardStyle("dark");
    });
  }

  ngOnInit() {
    // INIT LANGUAGE
    // this.ln = (window.navigator.language).substring(0,2);
    this.ln = "ua";
    this.translator.setLanguage(this.ln);

    this._userService.appConfigLoaded.subscribe((data) => {
      if (data) {
        // this.versionIsActual = (environment.version >= this._userService.appConfig.currentVersion) ? true : false;
      }
    });
  }
}
