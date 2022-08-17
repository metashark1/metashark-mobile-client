import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";

@Injectable({
  providedIn: "root",
})
export class FavouriteService {
  isFavouriteLoaded: boolean = false;
  favouriteToggleProcess: any = {};
  userFavouriteList: any;
  userFavouriteListIds: any = [];

  constructor(private RequestService: RequestService) {
    this.getFavouriteList();
  }

  getFavouriteList() {
    this.RequestService.simpleGetData("favourite").subscribe((req) => {
      console.log(req);
      this.isFavouriteLoaded = true;

      if (req && req.data) {
        console.log("FavouriteService get favourite");
        console.log(req.data);
        this.userFavouriteList = req.data;
        this.userFavouriteListIds = req.data.map((a) => a.imdb);

        console.log(this.userFavouriteListIds);
      }
    });
  }

  add(id) {
    this.favouriteToggleProcess[id] = true;

    console.log("FavouriteService.add fn for id: " + id);
    this.RequestService.simplePostData({ id: id }, "favourite").subscribe(
      (req) => {
        console.log(req);
        if (req && req.status) {
          this.userFavouriteListIds.push(id);
          this.favouriteToggleProcess[id] = false;
          this.getFavouriteList();
        } else {
          console.log("FavouriteService.add some error");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id) {
    console.log("FavouriteService.delete fn for id: " + id);
    this.favouriteToggleProcess[id] = true;

    this.RequestService.deletetFromFavourite(id).subscribe(
      (req) => {
        console.log(req);
        if (req && req.status) {
          if (this.userFavouriteListIds.indexOf(id) > -1) {
            this.userFavouriteListIds.splice(this.userFavouriteListIds, 1);
          }

          this.getFavouriteList();
          this.favouriteToggleProcess[id] = false;
        } else {
          console.log("FavouriteService.add some error");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggle(id) {
    console.log("FavouriteService.toggle fn for id: " + id);
    if (this.isFavourite(id)) {
      this.delete(id);
    } else {
      this.add(id);
    }
  }

  isFavourite(id) {
    return this.userFavouriteListIds.includes(id) ? true : false;
  }
}
