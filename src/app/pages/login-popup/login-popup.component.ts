import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {


  windowName: string = "";
  isLogged: boolean = false;
  isChecked: boolean = false;
  loggedWalletInfo: {} = {};

  constructor() { }

  ngOnInit(): void {
    this.windowName = window.name;
    

    //TODO: check login session
    setTimeout(() => {
      this.isChecked = true;
    }, 2000);
    // console.log('window name', window.name);
  }


  openLogin(): void {
    window.open(window.location.origin, 'WAX Login', "height=800,width=600");
  }

  
  approve(): void {
    if(window.opener){
      window.opener.postMessage({ verified: true, userAccount: 'test.wamtn',
        pubKeys: []}, '*');
    }
    else{
      window.location.href = '/dummy-wallet';
    }
  }

  reject(): void {
    if(window.opener){
      window.opener.postMessage({ verified: false }, '*');
    }
    else{
      window.location.href = '/dummy-wallet';
    }
  }

}
