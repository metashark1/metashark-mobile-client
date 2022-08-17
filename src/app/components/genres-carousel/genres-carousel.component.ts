import { Component, OnInit } from '@angular/core';
import { AdditionalParamsService } from 'src/app/services/additional-params.service';

@Component({
  selector: 'app-genres-carousel',
  templateUrl: './genres-carousel.component.html',
  styleUrls: ['./genres-carousel.component.scss'],
})
export class GenresCarouselComponent implements OnInit {

  constructor(
    private apService: AdditionalParamsService
  ) {

    if (!this.apService.genresList) {
      this.apService.getGenresList();
    }

  }

  ngOnInit() { }

}
