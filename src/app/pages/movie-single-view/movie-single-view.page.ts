import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
import { StorageService } from "src/app/services/storage.service";
import { FavouriteService } from "src/app/services/favourite.service";
import { AlertController } from "@ionic/angular";
import { VideoPlayerComponent } from "src/app/components/video-player/video-player.component";

@Component({
  selector: "app-movie-single-view",
  templateUrl: "./movie-single-view.page.html",
  styleUrls: ["./movie-single-view.page.scss"],
})
export class MovieSingleViewPage implements OnInit {
  @ViewChild(VideoPlayerComponent) vpComponent: VideoPlayerComponent;
  requestId: string;
  isLoaded: boolean = false;
  isLoadedVideo: boolean = false;

  singleRequest: Request;
  courierLoc: any;
  connection: any;
  singleMovie: any;
  singleMovieVideo: any;
  singleMoviePlaylists: any;
  singleMovieVideoUrl: any;
  singleMovieVideoQual: any = "quality";
  radioQualList: any = [];
  seriesList: any = [];
  poster: string;
  selectedSeries: string = "1_1";

  constructor(
    public _userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private RequestService: RequestService,
    private storage: StorageService,
    public favourite: FavouriteService,
    public alertController: AlertController
  ) {
    this.route.params.subscribe((params) => {
      this.requestId = params.id;
      this.getData();
    });
  }

  ngOnInit() {
    this.isLoaded = false;
  }

  qualityControl() {
    console.log("qualityControl fn call");

    const qual = Object.keys(this.singleMoviePlaylists);
    console.log(this.singleMoviePlaylists);
    console.log(qual);

    // REWRITE radioQualList
    this.radioQualList = [];
    qual.forEach((item) => {
      this.radioQualList.push({
        name: "vQuality",
        type: "radio",
        label: item + "x",
        value: item,
        checked: this.singleMovieVideoQual == item ? true : false,
      });
    });
  }

  selectSeries() {
    console.log("selectSeries fn start");
    console.log(this.singleMovieVideo.playlists);

    // REWRITE radioQualList
    this.seriesList = [];
    for (let [seazonKey, seazonValue] of Object.entries(
      this.singleMovieVideo.playlists
    )) {
      this.seriesList.push({
        name: "seazon",
        type: "radio",
        value: "seazon",
        label: "Seazon " + seazonKey,
        cssClass: "seazon_radio",
      });

      for (let [seriesKey, seriesValue] of Object.entries(
        this.singleMovieVideo.playlists
      )) {
        this.seriesList.push({
          name: "series",
          type: "radio",
          label: "Series " + seriesKey,
          value: seazonKey + "_" + seriesKey,
          checked:
            this.selectedSeries == seazonKey + "_" + seriesKey ? true : false,
        });
      }
    }

    console.log(this.seriesList);
    this.selectSeriesDialogue();
  }

  async selectSeriesDialogue() {
    const alert = await this.alertController.create({
      cssClass: "select_series_dialogue",
      header: "Series",
      subHeader: "selected: " + this.selectedSeriesView(),
      inputs: this.seriesList,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (selectedS) => {
            const sel = selectedS.split("_");
            this.selectedSeries = selectedS;

            this.singleMoviePlaylists =
              this.singleMovieVideo.playlists[sel[0]][sel[1]];
            this.singleMovieVideoUrl =
              this.singleMoviePlaylists[this.singleMovieVideoQual];
            this.qualityControl();
            // this.singleMovieVideoQual = selectedQuality;
          },
        },
      ],
    });

    await alert.present();
  }

  async selectQualityDialogue() {
    const alert = await this.alertController.create({
      header: "Quality",
      inputs: this.radioQualList,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (selectedQuality) => {
            console.log("Confirm Ok");
            console.log(selectedQuality);
            this.singleMovieVideoUrl =
              this.singleMoviePlaylists[selectedQuality];
            this.singleMovieVideoQual = selectedQuality;
            this.qualityControl();
            console.log(this.singleMovieVideoUrl);
          },
        },
      ],
    });

    await alert.present();
  }

  selectedSeriesView() {
    const outp = this.selectedSeries.split("_");
    return "s" + outp[0] + "e" + outp[1];
  }

  favouriteAction(id) {
    console.log("MovieSingleViewPage.favouriteAction fn start");
    this.favourite.toggle(id);
  }

  // GET DATA OF ONE ITEM
  getData(e: any = null) {
    console.log("MovieSingleViewPage.getData");
    console.log(this.requestId);

    this.RequestService.simpleGetOneMovie(this.requestId).subscribe(
      (request) => {
        console.log("simpleGetOneMovie");

        console.log(request);

        this.singleMovie = request.data;
        this.poster = request?.data?.backdrops?.[0];

        this.isLoaded = true;
      }
    );

    this.RequestService.getUserIp().subscribe((data) => {
      if (data && data.ip) {
        this.RequestService.simpleLoadOneMovieVideoMovapi(
          this.requestId
        ).subscribe((request) => {
          console.log(request);
          if (e) e.target.complete();

          if (request) {
            this.singleMovieVideo = request;

            if (request.serial == "1") {
              console.log("serial");
              this.singleMoviePlaylists = request.playlists[1][1];
            } else {
              console.log("no serial");
              this.singleMoviePlaylists = request.playlists;
            }

            console.log(this.singleMoviePlaylists);

            const qual = Object.keys(this.singleMoviePlaylists);
            this.singleMovieVideoUrl = this.singleMoviePlaylists[qual[0]];
            this.singleMovieVideoQual = qual[0];

            this.qualityControl();
          }
          this.isLoadedVideo = true;
        });
      }
    });
  }

  ionViewWillLeave() {
    console.log("MovieSingleViewPage.ionViewDidLeave");

    if (this.vpComponent && this.vpComponent.continueTime) {
      console.log(this.vpComponent.continueTime);
      this.storage.setObject("continueWatch", {
        [this.vpComponent.movieId]: this.vpComponent.continueTime,
      });
    }
  }

  doRefresh(event) {
    console.log("MovieSingleViewPage.doRefresh");

    this.getData(event);
  }
}
