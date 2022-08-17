import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
declare var window: any;

@Injectable({
  providedIn: "root",
})
export class UrlManagerService {
  constructor() {}

  getApiUrl(type, params: any = {}) {
    let defaultHapi = environment.defaultHostApi;
    let url = environment.apiUrls[type];

    let output = url;
    if (!!params) {
      Object.keys(params).forEach((v) => {
        output = output.replace("{" + v + "}", params[v]);
      });

      if (!url.includes("//")) {
        output = defaultHapi + output;
      }
    } else {
      output = defaultHapi + url;
    }

    // OUTPUT
    // console.log(output);
    return output;
  }
}
