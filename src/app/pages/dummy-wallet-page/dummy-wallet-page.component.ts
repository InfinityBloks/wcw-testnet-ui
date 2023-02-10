import { Component, OnInit } from '@angular/core';
import { WCWTestnetApiService } from 'src/app/_services/wcw-testnet-api.service';

@Component({
  selector: 'app-dummy-wallet-page',
  templateUrl: './dummy-wallet-page.component.html',
  styleUrls: ['./dummy-wallet-page.component.scss']
})
export class DummyWalletPageComponent implements OnInit {

  isChecked = false;
  isLogged = false;
  loggedWallet;
  constructor(
    private _apiService: WCWTestnetApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.checkSession();
  }

  async checkSession() {
    this.isChecked = false;
    const sessionInfo = await this._apiService.getSession();
    if(sessionInfo['token']) {
      this.isChecked = true;
      this.isLogged = true;
      this.loggedWallet = sessionInfo['wallet'];
    }
    else{
      window.location.href = '/';
      // this.isChecked = true;
      // this.isLogged = false;
    }
  }

  async logout() {
    const logoutResult = await this._apiService.logout();
    window.location.href = '/';
  }

}
