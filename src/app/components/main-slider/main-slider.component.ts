import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],
})
export class MainSliderComponent implements OnInit {
  isLoadedAdditional: any = [];
  slidersList: any;

  constructor(
    private RequestService: RequestService
  ) {
    this.getSlidersList();
  }

  ngOnInit() { }

  getSlidersList() {
    this.isLoadedAdditional['slidersList'] = false;
    this.RequestService.simpleGetData('moviesList', { limit: 3, type: 'homeSlider' })
      .subscribe(inc => {
        // console.log(inc);
        
        if (inc && inc.data.list.length) {
          this.isLoadedAdditional['slidersList'] = true;
          this.slidersList = inc.data.list;
        }
      });
  }

}
