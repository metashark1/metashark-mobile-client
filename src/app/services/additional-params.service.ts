import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";

@Injectable({
  providedIn: "root",
})
export class AdditionalParamsService {
  isLoaded: any = [];
  genresList: any;
  countriesList: any;

  constructor(private RequestService: RequestService) {}

  getGenresList() {
    console.log("AdditionalParamsService.getGenresList fn start");
    this.isLoaded["genres"] = false;

    this.RequestService.simpleGetData("genres").subscribe((req) => {
      console.log(req);
      this.isLoaded["genres"] = true;

      if (req && req.data) {
        this.genresList = req.data;
      }
    });
  }

  getCountriesList() {
    console.log("AdditionalParamsService.getCountriesList fn start");
    this.isLoaded["countries"] = false;

    this.RequestService.simpleGetData("countries").subscribe((req) => {
      console.log(req);
      this.isLoaded["countries"] = true;

      if (req && req.data) {
        this.countriesList = req.data;
      }
    });
  }
}
