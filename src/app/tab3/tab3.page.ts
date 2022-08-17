import { Component, ViewChild } from '@angular/core';
import { ProfileViewComponent } from '../components/profile-view/profile-view.component';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(ProfileViewComponent) ProfileView: ProfileViewComponent;

  constructor(
    public _userService: UserService,
    private storage: StorageService
  ) { }

  ionViewWillEnter() {
    console.log('Tab3Page ionViewWillEnter');
    this.ProfileView.wanaBeCourier = this.storage.get('wanaBeCourier');

    this._userService.hasUserData.subscribe(data => {
      if (data && !!this.ProfileView) {
        this.ProfileView.isWork = this._userService.userData.work;
      }
    });
  }

}
