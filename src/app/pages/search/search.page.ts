import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { UrlManagerService } from 'src/app/services/url-manager.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdditionalParamsService } from 'src/app/services/additional-params.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('year') year: IonSelect;
  @ViewChild('genre') genre: IonSelect;
  @ViewChild('serial') serial: IonSelect;
  @ViewChild('country') country: IonSelect;
  searchForm: FormGroup;

  search = new Subject<any>();
  allFilms: any;
  page_number: number = 1;
  page_limit: number = environment.page_limit;
  isLoaded: boolean = false;
  allLoaded: boolean = false;
  queryParams: any;
  pageName: string = 'Search';
  queryParamsLoaded: boolean = true;
  currentYear: any = new Date().getFullYear();
  yearSearchArray: number[] = Array(120).fill(0).map((e, i) => i + 1);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private urlManager: UrlManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private serializer: UrlSerializer,
    public apService: AdditionalParamsService
  ) {
    console.log('SearchPage constructor start');

    if (!this.apService.genresList) {
      this.apService.getGenresList();
    }

    if (!this.apService.countriesList) {
      this.apService.getCountriesList();
    }

    this.queryParamsLoad();

    this.search
      .subscribe(data => {
        console.log(data);

        if (this.page_number <= 1) {
          this.allFilms = data.data.list;
        } else {
          data.data.list.forEach((v) => {
            this.allFilms.push(v);
          })
        }
        this.isLoaded = true;
      }, error => {
        this.isLoaded = true;
        this.allLoaded = true;
      });

  }

  ngOnInit() { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter searchpage');
    this.page_number = 1;
    this.allFilms = null;
    this.isLoaded = false;
    console.log('ionViewWillEnter page_number: ' + this.page_number);
  }

  clearSeacrhForm() {
    this.searchForm.patchValue({
      year: '',
      genre: '',
      country: '',
      serial: '',
    })
  }

  isEmptyForm() {
    return Object.values(this.searchForm.value).every(x => x === null || x === '');
  }

  queryParamsLoad() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.queryParamsLoaded = true;

        if (params) {
          this.queryParams = params;
          this.loadSearch();
          if (params.pagename) {
            this.pageName = params.pagename;
          } else {
            this.initForm();
            this.searchForm.valueChanges.subscribe(value => {
              console.log('searchForm has changed:', value);
              this.allFilms = null;
              this.page_number = 1;
              this.isLoaded = false;

              this.queryParams = value;
              this.loadSearch();
            });
          }
        }
      });
  }

  openSelect(el) {
    console.log('SearchPage.openSelect fn start');
    this[el].open();
  }

  /** GET get search from api */
  loadSearch(page_number: number = 1): Subscription {
    let queryParams = JSON.parse(JSON.stringify(this.queryParams));
    console.log('loadSearch');
    console.log(queryParams);

    if (queryParams.hasOwnProperty('pagename')) { delete queryParams['pagename']; }
    queryParams.limit = this.page_limit;
    queryParams.offset = (page_number == 1) ? 0 : (page_number - 1) * this.page_limit;
    const queryParamsParamsString = new HttpParams({ fromObject: queryParams }).toString();
    return this.http.get<Request[]>(this.urlManager.getApiUrl('movieSearch') + '?' + queryParamsParamsString)
      .subscribe((data) => this.search.next(data),
        error => {
          this.isLoaded = true;
          this.allLoaded = true;
          console.log('oopss error');
        });
  }

  doInfinite(event) {
    if (!this.allLoaded) {
      this.page_number++;
      this.loadSearch(this.page_number).add(e => {
        event.target.complete();
      });
    } else {
      event.target.complete();
    }
  }

  // FORM init 
  private initForm() {
    this.searchForm = this.fb.group({
      year: [''],
      genre: [''],
      country: [''],
      serial: ['']
    });
  }

}
