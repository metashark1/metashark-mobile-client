import { Injectable } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { NgFTranslatorModule } from "src/app/services/ng-f-translator";
import { NgFerhadoTranslatorPipe } from "src/app/services/ng-f-translator/ng-f-translator.pipe";
import { UrlManagerService } from "./url-manager.service";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  dataItems: any;
  inProcess: boolean = false;
  file_url: string = "";
  filesize: any;
  films = new Subject<any>();
  movie = new Subject<any>();
  movieVideo = new Subject<any>();
  customHeaders = new HttpHeaders().set("Content-Type", "application/json");

  // films: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // films = new Subject<any>();

  constructor(
    private http: HttpClient,
    private urlManager: UrlManagerService,
    public translator: NgFTranslatorModule,
    public tr: NgFerhadoTranslatorPipe
  ) {}

  getMoviesList(params: any = {}): Subscription {
    console.log("RequestService.getMoviesList fn start");
    console.log(params);

    params = Object.keys(params).length
      ? "?limit=" + params.limit + "&page=" + params.page
      : "";
    return this.http
      .get<any[]>(this.urlManager.getApiUrl("moviesList") + params)
      .subscribe((data) => this.films.next(data));
  }

  loadOneMovie(id): Subscription {
    console.log("RequestService.loadOneMovie fn call");
    const url = this.urlManager.getApiUrl("singleMovie", { imdb: id });
    console.log(url);

    return this.http.get<any>(url).subscribe((data) => this.movie.next(data));
  }

  simpleGetOneMovie(id) {
    console.log("RequestService.simpleGetOneMovie fn start");
    return this.http.get<any>(
      this.urlManager.getApiUrl("singleMovie", { imdb: id }),
      { headers: this.customHeaders }
    );
  }

  simpleLoadOneMovieVideo(id, userIp) {
    console.log("RequestService.simpleGetOneMovie fn start");
    return this.http.get<any>(
      this.urlManager.getApiUrl("singleMovieVideo", { imdb: id, ip: userIp }),
      { headers: this.customHeaders }
    );
  }

  simpleLoadOneMovieVideoMovapi(id) {
    console.log("RequestService.simpleGetOneMovie fn start");
    return this.http.get<any>(
      this.urlManager.getApiUrl("singleMovieVideoMovapi", { imdb: id }),
      { headers: this.customHeaders }
    );
  }

  loadOneMovieVideo(id, userIp): Subscription {
    const url = this.urlManager.getApiUrl("singleMovieVideo", {
      imdb: id,
      ip: userIp,
    });
    console.log(url);

    return this.http
      .get<any>(url)
      .subscribe((data) => this.movieVideo.next(data));
  }

  simplePostData(data, apiUrlKey) {
    console.log("RequestService.simplePostData fn start");
    console.log(data);
    return this.http.post<any>(this.urlManager.getApiUrl(apiUrlKey), data, {
      headers: this.customHeaders,
    });
  }

  simpleGetData(apiUrlKey, params: any = {}) {
    console.log("RequestService.simpleGetData fn start");
    const queryParamsParamsString = new HttpParams({
      fromObject: params,
    }).toString();
    return this.http.get<any>(
      this.urlManager.getApiUrl(apiUrlKey) + "?" + queryParamsParamsString,
      { headers: this.customHeaders }
    );
  }

  getCommentsList(movieId) {
    console.log("RequestService.getCommentsList fn start");
    return this.http.get<any>(
      this.urlManager.getApiUrl("commentsList", { id: movieId }),
      { headers: this.customHeaders }
    );
  }

  commentPost(movieId, data) {
    console.log("RequestService.commentPost fn start");
    return this.http.post<any>(
      this.urlManager.getApiUrl("commentPost", { id: movieId }),
      data,
      { headers: this.customHeaders }
    );
  }

  deletetFromFavourite(id) {
    console.log("RequestService.deletetFromFavourite fn start");
    return this.http.delete<any>(
      this.urlManager.getApiUrl("favouriteRemove", { id: id }),
      { headers: this.customHeaders }
    );
  }

  getUserIp() {
    return this.http.get<any>(this.urlManager.getApiUrl("getUserIp"));
  }

  // OLD CODE ZONE
  /** GET all orders from the server */
  // load(params: any = {}): Subscription {
  //   params = (Object.keys(params).length) ? ('?limit=' + params.limit + '&page=' + params.page) : '?limit=100';
  //   console.log(params);
  //   return this.http.get<Request[]>(this.urlManager.getApiUrl('allOrders') + params)
  //     .subscribe((data) => this.requests.next(data));
  // }
}
