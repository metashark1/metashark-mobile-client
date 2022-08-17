import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class InAppBrowserService {
    browserApp: any;
    // styles = "body {font-family: arial; background-color: #fff} .lang, .p_page>h1, .info, .header, .footer { display: none; } .support {margin-top: 32px;} .numbercard {top: 52px;} select, input[type=text], input[type=password], input[type=tel] {padding-top: 6px; padding-bottom: 6px; border-radius: 8px; height: auto} select {height: 30px} .datecard {top: 92px;}"
  
    options : InAppBrowserOptions = {
      location : 'no',
      hideurlbar : 'yes',
      hidden : 'no',
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'no',
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no',
      closebuttoncaption : 'Закрити',
      disallowoverscroll : 'no',
      toolbar : 'yes',
      toolbarposition: 'top',
      toolbartranslucent: 'yes', 
      enableViewportScale : 'no',
      allowInlineMediaPlayback : 'no',
      // presentationstyle : 'formsheet',
      presentationstyle: "fullscreen",
      transitionstyle: "crossdissolve",
      fullscreen : 'yes',
      hidenavigationbuttons: 'yes'
    };
  
    constructor(
      private theInAppBrowser: InAppBrowser
    ) { }

    public openBrowser (url : string,  params: any = {}){
        let target = "_blank";
        let fullUrl;

        if (!!params) {
            fullUrl = url + '?';
            Object.keys(params).forEach((k) => {
                fullUrl += k + '=' + params[k] + '&';
            });
        } else {
            fullUrl = url;
        }
        
        this.browserApp =  this.theInAppBrowser.create(fullUrl, target, this.options);
        this.browserApp.on('loadstart').subscribe(
          data => {
            if(data.url.indexOf("success") !== -1 || data.url.indexOf("checkemail") !== -1)
            this.loadStartEventHandler(data);
          }
        )
      }
    
      public loadStartEventHandler(data) {
        setTimeout(()=>{
          this.browserApp.close();
        }, 3000);
      }
    
}