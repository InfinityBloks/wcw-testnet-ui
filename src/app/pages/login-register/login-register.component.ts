import { Component, OnInit } from '@angular/core';
import { WCWTestnetApiService } from 'src/app/_services/wcw-testnet-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  wallet: string = "";
  password: string = "";
  repassword: string = "";
  mode: string = "";
  errorMsg: string = '';
  walletSuffix: string = environment.wallet_suffix;
  constructor(
    private _apiService: WCWTestnetApiService
  ) { }

  async ngOnInit(): Promise<void> {
    const sessionInfo = await this._apiService.getSession();
    if(sessionInfo['token']) {
      //redirect to dummy wallet page or close the popup window
      if(window.opener){
        window.opener.postMessage({ verified: true}, '*');
        setTimeout(() => {
          window.close();
        }, 500);
      }
      else{
        window.location.href = '/wallet';
      }
    }
    else{
      this.mode = 'login';
    }
  }

  toogleForm(mode: string) {
    this.mode = mode;
    this.wallet = '';
    this.password = '';
    this.repassword = '';
  }

  isProcessing = false;
  async doLoginRegister() {
    if(this.isProcessing) return;
    this.isProcessing = true;
    this.errorMsg = '';
    switch(this.mode) {
      case 'login':
        {
          let errMsg = '';
          if(!this.wallet) { 
            errMsg = "Wallet is required.";
          }
          else if(!this.password) {
            errMsg = "Password is required.";
          }

          if(errMsg){
            this.errorMsg = errMsg;
            this.isProcessing = false;
            return;
          }

          const loginResult = await this._apiService.login(this.wallet, this.password);
          if(loginResult['code'] == 200){
            if(window.opener){
              window.opener.postMessage({ is_logged: true}, '*');
              window.close();
            }
            else{
              window.location.href = '/wallet';
            }
          }
          else{
            alert(loginResult['msg']);
          }
        }
        break;
      case 'register':
        {
          let errMsg = '';
          if(!this.wallet) { 
            errMsg = "Wallet is required.";
          }
          else if(!this.password) {
            errMsg = "Password is required.";
          }
          else if(this.password != this.repassword) {
            errMsg = "Passwords does not match.";
          }

          if(errMsg){
            this.errorMsg = errMsg;
            this.isProcessing = false;
            return;
          }

          const registerResult = await this._apiService.register(this.wallet + this.walletSuffix, this.password);
          if(registerResult['code'] == 200){
            if(window.opener){
              window.opener.postMessage({ is_logged: true}, '*');
              setTimeout(() => {
                window.close();
              }, 500);
            }
            else{
              window.location.href = '/wallet';
            }
          }
          else{
            alert(registerResult['msg']);
          }
        }
        break;
    }
    this.isProcessing = false;
  }

}
