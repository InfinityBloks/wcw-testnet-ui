import { Component, HostListener, OnInit } from '@angular/core';
import { WCWTestnetApiService } from 'src/app/_services/wcw-testnet-api.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {


  windowName: string = "";
  isLogged: boolean = false;
  isChecked: boolean = false;
  loggedWalletInfo: { wallet?: string, token?: string } = {};
  userInfo: any = {};
  referrerUrl: string = "";

  constructor(
    private _apiService: WCWTestnetApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.windowName = window.name;
    this.referrerUrl = window.name ? document.referrer.replace('https://', '').replace('http://', '').split('/')[0] : '';

    await this.checkSession();
  }


  openLogin(): void {
    window.open(window.location.origin, 'WAX Login', "height=800,width=600");
  }

  async checkSession() {
    this.isChecked = false;
    const sessionInfo = await this._apiService.getSession();
    if(sessionInfo['token']) {
      this.isChecked = true;
      this.isLogged = true;
      this.loggedWalletInfo = sessionInfo;
      const userInfo = await this._apiService.getUserInfo(sessionInfo['token']);
      this.userInfo = {
        verified: userInfo['verified'],
        userAccount: userInfo['accountName'],
        pubKeys: userInfo['publicKeys'],
      }
    }
    else{
      this.isChecked = true;
      this.isLogged = false;
    }
  }

  
  approve(): void {
    if(window.opener){
      window.opener.postMessage(this.userInfo, '*');
      window.close();
    }
    else{
      window.location.href = '/wallet';
    }
  }

  deny(): void {
    if(window.opener){
      window.opener.postMessage({ verified: false }, '*');
      window.close();
    }
    else{
      window.location.href = '/wallet';
    }
  }

  @HostListener('window:message', ['$event'])
  async onMessage(data: any) {
    const { data: msg_data } = data;
    if(msg_data['is_logged']) {
      await this.checkSession();
    }
  }

}
