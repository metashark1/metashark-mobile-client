import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  allFilms: any[] = [];
  isLoaded: boolean = false;
  page_number: number = 1;
  page_limit: number = environment.page_limit;

  constructor(
    private favourite: FavouriteService,
  ) {

    this.allFilms = this.favourite.userFavouriteList;
  }

  ngOnInit() { }

  // PUSH NEW ITEM
  pushData(data) {
    this.allFilms.push(data);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  doPaginate(event) {
    console.log('doPaginate favourites');
    this.page_number++;
    console.log(this.page_number);

    // this.RequestService.getMoviesList({ limit: this.page_limit, page: this.page_number }).add(e => {
    //   event.target.complete();
    // });
  }

}
