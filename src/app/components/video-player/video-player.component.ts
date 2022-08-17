import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @Input() poster: any;
  @Input() videoSrc: any;
  @Input() movieId: any;
  continueTime: number;
  continueWatch: any;

  constructor(
    private alertCtrl: AlertController,
    private storage: StorageService
  ) { }

  ngOnInit() {
    console.log('VideoPlayerComponent.OnInit');
    this.continueWatch = this.storage.getAsObject('continueWatch');
    if (this.continueWatch && this.continueWatch.hasOwnProperty(this.movieId)) {
      this.continueTime = this.continueWatch[this.movieId];
      console.log(this.continueTime);
    }

    // this.videoSrc = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';
  }

  ngAfterViewInit() {
    this.videoPlayer.nativeElement.onloadeddata = (event) => {
      console.log('Video data is loaded.');
      if (!!this.continueTime) {
        this.presentConfirm();
      }
    };
  }

  // ionViewWillLeave() { }

  // ngOnDestroy() {
  //   console.log('VideoPlayerComponent.OnDestroy');
  // }

  getCurrentTime(data) {
    // console.log(data.target.currentTime);
    this.continueTime = data.target.currentTime;
  }

  setToTime() {
    console.log('VideoPlayerComponent.setTime at position: ' + this.continueTime);
    this.videoPlayer.nativeElement.currentTime = this.continueTime;
    this.videoPlayer.nativeElement.play();
  }

  timeNormalize(inc) {
    const value = Math.round(inc);
    const minutes = Math.floor(value / 60);
    const seconds = (value % 60 ? value % 60 : '00')
    return ((minutes < 10) ? ('0' + minutes) : minutes) + ":" + ((seconds < 10) ? ('0' + seconds) : seconds);
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Continue watching?',
      message: 'You have stop watching at ' + this.timeNormalize(this.continueTime) + ' sec.',
      buttons: [
        {
          text: 'No, from start',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.videoPlayer.nativeElement.play();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('setToTime clicked');
            this.setToTime();
          }
        }
      ]
    });
    alert.present();
  }

}
