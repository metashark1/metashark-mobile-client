import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  closeGreeting: boolean = false;
  tabSwitch = 'auth';

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {
    // GREETING WAS SHOW 
    if (this.storage.get('greeting') == 'show') this.closeGreeting = true;
  }

  closeGreetingLogin(data) {
    this.closeGreeting = data;
  }

}
