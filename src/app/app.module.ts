import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// BrowserAnimationsModule
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttpUserService } from './services/http-user.service';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { NgFTranslatorModule } from './services/ng-f-translator';
import { NgFerhadoTranslatorPipe } from './services/ng-f-translator/ng-f-translator.pipe';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Network } from '@ionic-native/network/ngx';
import { environment } from 'src/environments/environment';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    SimpleMaskModule,
    IonicModule.forRoot(),
    NgFTranslatorModule.forRoot({
      defaultLang: 'ru',
      storagePrefix: 'f-language'
    }),
    NgxIonicImageViewerModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpUserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal,
    Network,
    NgFerhadoTranslatorPipe,
    ImagePicker,
    Crop,
    FileTransfer,
    Camera,
    File,
    Geolocation,
    Vibration,
    TapticEngine,
    Device,
    InAppBrowser,
    NgxIonicImageViewerModule,
    Keyboard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
