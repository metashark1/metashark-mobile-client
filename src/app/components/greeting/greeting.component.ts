import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent implements OnInit {
  @Output() closeGreeting: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('sliderRef')  slides: IonSlides;

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {}

  swipeNext(){
    this.slides.slideNext();
  }

  wanaBeCourier() {
    this.closeGr();
    this.storage.set('wanaBeCourier', '0');
  }

  public closeGr(skip_questions: boolean = false): void {
    this.closeGreeting.emit(true);
    this.storage.set('greeting', 'show');

    if (skip_questions) {
      this.storage.set('wanaBeCourier', '0');
    }
  }

}
