import { StorageService } from 'src/app/services/storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpUserService } from './http-user.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { GlobalToastService } from './global-toast.service';
import { HttpParams } from '@angular/common/http';
declare var window: any;

@Injectable({ providedIn: 'root' })

export class UserService {
    userData: any = this.storage.getAsObject('userData');
    appConfig: any = this.storage.getAsObject('appConfig');

    hasUserData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    accessToken: any;
    logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.accessToken ? true : false);
    user = [];
    appConfigLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    gapiLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    noConnection = false;

    constructor(
        private storage: StorageService,
        private router: Router,
        private NavController: NavController,
        private HttpUserService: HttpUserService,
        public loadingController: LoadingController,
        private network: Network,
        private GlobalToastService: GlobalToastService
    ) {
        this.getTokenStorage().then(data => {
            if (!!data) {
                this.setToken(data);
                this.updateUserData();
            }
        });

        // START CHECK INTERNET CONNECTION 
        this.checkConnection();
    }

    setToken(data) {
        this.accessToken = data;
        if (data) this.logged.next(true);
    }

    async getTokenStorage(): Promise<string> {
        try {
            const token = await this.storage.get('access-token');
            return token;
        }
        catch (e) { console.log(e) }
    }

    async updateUserData(): Promise<any> {
        console.log('updateUserData');
        try {
            await this.HttpUserService.loadUser(this.accessToken).subscribe(data => {
                console.log(data);

                this.userData = data.data;
                this.setUserData(data.data);

                // ROUTE TO PROFILE FORM IF USER DATA IS EMPTY 
                // if (this.logged.getValue() && Object.keys(data).length == 0) this.router.navigate(['/profile-form']);

                if (this.logged.getValue() && !data.data.confirmEmail) {
                    // this.router.navigate(['/profile-form']);
                    this.NavController.navigateRoot(['/user/code-check']);
                }

                return data;
            });
        }
        catch (e) { console.log(e) }
    }

    setUserData(data) {
        console.log('setUserData');
        console.log(data);

        this.userData = data;
        this.storage.setObject('userData', data);

        // USER DATA LOADING SUBSCRIPTION 
        this.hasUserData.next(true);
    }

    logIn(token, profile, new_user: boolean = false) {
        console.log('logIn fn start');
        console.log(profile);

        this.storage.set('access-token', token);
        this.setUserData(profile);
        this.loggedSuccess();

        if (profile.confirmEmail) {
            console.log('route to list');
            this.NavController.navigateRoot(['/user/listing']);
        } else {
            console.log('route to confirmEmail');
            this.NavController.navigateRoot(['/user/code-check']);
        }
    }

    logOut() {
        let city = this.storage.get('city');
        let appConfig = this.storage.getAsObject('appConfig');
        this.storage.clear();
        this.loggedFalse();
        this.storage.set('greeting', 'show');
        this.storage.setObject('appConfig', appConfig);
        this.storage.set('city', city);
        this.NavController.navigateRoot('/auth');
    }

    loggedSuccess() {
        this.logged.next(true);
    }

    loggedFalse() {
        this.logged.next(false);
    }

    // CHECK INTERNET CONNECTION
    checkConnection() {
        this.network.onDisconnect().subscribe(() => {
            this.GlobalToastService.callToast('no_connection', '', 'top', 'cloud-offline-outline', 0, true);
            this.noConnection = true;
        });

        this.network.onConnect().subscribe(() => {
            if (this.noConnection)
                this.GlobalToastService.callToast('connection_restored', '', 'top', 'cloud-done-outline', 2500, false);

            this.noConnection = false;
        });
    }

}