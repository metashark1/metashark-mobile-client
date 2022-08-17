import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { FavouriteComponent } from '../components/favourite-list/favourite.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild(FavouriteComponent) favourites: FavouriteComponent;

  constructor(
    private _userService: UserService,
    private taptic: TapticEngine
  ) { }

  ngOnInit() { }

  doInfinite(event) {
    this.taptic.selection();
    this.favourites.doPaginate(event);
  }

}
