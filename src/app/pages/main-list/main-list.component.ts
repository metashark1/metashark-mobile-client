import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
})
export class MainListComponent implements OnInit {
  dataItems: any;
  allRequests: Request[] = [];
  allFilms: any[] = [];
  isLoaded: boolean = false;
  page_number: number = 1;
  page_limit: number = environment.page_limit;

  // CAROUSELS
  isLoadedAdditional: any = [];
  newestList: any = [1, 2, 3, 4, 5, 6];
  animationList: any = [1, 2, 3, 4, 5, 6];
  serialList: any = [1, 2, 3, 4, 5, 6];

  constructor(
    private RequestService: RequestService,
    private storage: StorageService,
    private favourite: FavouriteService
  ) {
    this.getNewestList();
    this.getAnimationList();
    this.getSerialList();
  }

  ngOnInit() { }

  getNewestList() {
    this.isLoadedAdditional['newestList'] = false;
    this.RequestService.simpleGetData('movieSearch', { limit: 6, type: 'Lastest' })
      .subscribe(inc => {
        if (inc && inc.data.list.length) {
          this.isLoadedAdditional['newestList'] = true;
          this.newestList = inc.data.list;
        }
      });
  }

  getAnimationList() {
    this.isLoadedAdditional['animationList'] = false;
    this.RequestService.simpleGetData('movieSearch', { limit: 6, genre: 'Animation' })
      .subscribe(inc => {
        if (inc && inc.data.list.length) {
          this.isLoadedAdditional['animationList'] = true;
          this.animationList = inc.data.list;
        }
      });
  }

  getSerialList() {
    this.isLoadedAdditional['serialList'] = false;
    this.RequestService.simpleGetData('movieSearch', { limit: 6, serial: 1 })
      .subscribe(inc => {
        if (inc && inc.data.list.length) {
          this.isLoadedAdditional['serialList'] = true;
          this.serialList = inc.data.list;
        }
      });
  }

  // PUSH NEW ITEM
  pushData(data) {
    this.allRequests.push(data);
    this.storage.setObject('allRequests', this.allRequests);
  }

  doRefresh(event) {
    this.page_number = 1;
  }

  doPaginate(event) {
    console.log('doPaginate');
    this.page_number++;
  }

  // FN CONVERT DATE TO VISIBLE 
  // toVisDate(y) { var d = new Date(y); return ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear(); }

}
