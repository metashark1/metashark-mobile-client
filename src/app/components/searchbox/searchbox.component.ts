import { Component, OnInit, NgZone, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFerhadoTranslatorPipe } from '../../services/ng-f-translator/ng-f-translator.pipe';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { UrlManagerService } from 'src/app/services/url-manager.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {
  @ViewChild('searchInput') searchInput;
  @Input() inpAddress;
  @Input() isBounded;

  userCity: string = this.storage.get('city');
  lang: string = this.storage.get('f-language-lang');
  autocompleteItems;
  autocomplete;
  latitude: number;
  longitude: number;
  geo: any;
  hasToast: boolean = false;
  enter_address: string = this.tr.transform('enter_address');
  hasBn: boolean = false;
  fnSupplementData: any = [];
  defaultBounds: any;
  boundData: any;
  inProcess: boolean = false;

  constructor(
    public viewCtrl: ModalController,
    private zone: NgZone,
    public tr: NgFerhadoTranslatorPipe,
    private storage: StorageService,
    private _userService: UserService,
    private http: HttpClient,
    private urlManager: UrlManagerService
  ) {
    this.autocompleteItems = {};
    this.autocomplete = {
      query: this.inpAddress
    };
  }

  ngOnInit() {
    this.autocomplete = {
      query: this.inpAddress
    };
    this.hasBn = false;
    this.fnSupplementData = [];
  }

  // SET FOCUS AFTER MODAL OPEN
  ngAfterViewChecked() {
    this.searchInput.setFocus();
  }

  dismiss() {
    this.hasToast = false;
    this.viewCtrl.dismiss();
  }

  updateSearch() {
    this.inProcess = true;
    let params = {};
    if (this.autocomplete.query == '') {
      this.autocompleteItems = {};
      this.inProcess = false;
      return;
    } else {
      console.log(this.autocomplete.query);

      // params.text = this.autocomplete.query;

      this.searchFetch(this.autocomplete.query)
        .subscribe(
          (resp: any) => {
            console.log(resp);

            if (resp && resp.data.list) {
              if (resp.data.list) {
                const moviesList = resp.data.list.filter(item => item.type == 'movie');
                const actorsList = resp.data.list.filter(item => item.type == 'actor');
                this.autocompleteItems = {
                  movies: moviesList,
                  actors: actorsList
                };

                this.inProcess = false;
              }

            } else {
              console.log('no query list');
            }
          },
          error => console.log(error)
        );
    }
  }

  searchFetch(text) {
    console.log('searchFetch fn start');
    console.log(text);

    const customHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.urlManager.getApiUrl('autocomplete') + '?limit=10&text=' + text;
    return this.http.get(
      url,
      { headers: customHeaders }
    );
  }

}