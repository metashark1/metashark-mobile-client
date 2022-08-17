import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpClientJsonpModule,
} from "@angular/common/http";
import { User } from "../interfaces/user";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { Device } from "@ionic-native/device/ngx";
import { UrlManagerService } from "src/app/services/url-manager.service";
import { StorageService } from "./storage.service";

@Injectable()
export class HttpUserService {
  user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  customHeaders = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    private http: HttpClient,
    private device: Device,
    private urlManager: UrlManagerService
  ) {}

  // Prepare USER data before POST form
  prepareData(data) {
    return (data = {
      deviceId: this.device.uuid,
      work: true,
      type: data.type,
      fio: data.fio,
      phone: data.phone,
      photoUrl: data.foto,
      address: {
        formatted_address: data.formatted_address,
        lat: data.lat,
        lng: data.lng,
      },
    });
  }

  preparePatchData(data) {
    return (data = {
      deviceId: this.device.uuid ? this.device.uuid : "empty",
      fio: data.fio,
      photoUrl: data.foto,
      city: data.city,
    });
  }

  getCourierQuestions() {
    return this.http.get(environment.defaultHostApi + "courier-questions");
  }

  postData(user: User) {
    return this.http.post(
      this.urlManager.getApiUrl("postProfile"),
      this.prepareData(user),
      { headers: this.customHeaders }
    );
  }

  patchData(user: User) {
    console.log("patchData user");
    console.log(user);
    return this.http.patch(
      this.urlManager.getApiUrl("patchProfile"),
      this.preparePatchData(user),
      { headers: this.customHeaders }
    );
  }

  simplePatchData(data) {
    console.log("simplePatchData user");
    console.log(data);
    return this.http.patch(this.urlManager.getApiUrl("patchProfile"), data, {
      headers: this.customHeaders,
    });
  }

  simplePostData(data, apiUrlKey) {
    console.log("RequestService.simplePostData fn start");
    console.log(data);
    return this.http.post<any>(this.urlManager.getApiUrl(apiUrlKey), data, {
      headers: this.customHeaders,
    });
  }

  avatarUploadPrepare(filename) {
    return this.http.get(
      this.urlManager.getApiUrl("fileUploadService") + "?file-name=" + filename
    );
  }

  avatarUpload(upload_url, photoUrl) {
    return this.http.put(upload_url, { headers: this.customHeaders });
  }

  /** GET one user by token from server */
  loadUser(userId): Observable<any> {
    return this.http.get<any>(
      this.urlManager.getApiUrl("profile", { user_id: userId })
    );
  }
}
