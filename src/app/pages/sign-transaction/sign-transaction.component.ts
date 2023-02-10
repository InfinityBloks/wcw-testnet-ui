import { Component, HostListener, OnInit } from '@angular/core';
import { WCWTestnetApiService } from 'src/app/_services/wcw-testnet-api.service';
import { Api, JsonRpc } from "enf-eosjs";
import { JsSignatureProvider } from 'enf-eosjs/dist/eosjs-jssig';

@Component({
  selector: 'app-sign-transaction',
  templateUrl: './sign-transaction.component.html',
  styleUrls: ['./sign-transaction.component.scss']
})
export class SignTransactionComponent implements OnInit {

  windowName: string = '';
  referrerUrl: string = '';
  isChecked: boolean = false;
  isLogged: boolean = false;
  parsedActions: any[] = [];
  trx: any;
  signResult: any;
  isShowError = false;
  errorMsg: string = '';
  constructor(
    private _apiService: WCWTestnetApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.windowName = window.name;
    this.referrerUrl = window.name ? document.referrer.replace('https://', '').replace('http://', '').split('/')[0] : '';
    await this.checkSession();
  }

  async checkSession() {
    this.isChecked = false;
    const sessionInfo = await this._apiService.getSession();
    if(sessionInfo['token']) {
      this.isLogged = true;
      if(window.opener){
        window.opener.postMessage({ type: 'READY'}, '*');
      }
    }
    else{
      this.isChecked = true;
      this.isLogged = false;
    }
  }

  async approve() {
    this.isShowError = false;
    if(this.signResult['message']){
      this.isShowError = true;
      this.errorMsg = this.signResult['message'];
      return;
    }
    if(window.opener) {
      window.opener.postMessage({ ...this.signResult, verified: true, type: 'TX_SIGNED', whitelistedContracts: null }, '*');
      window.close();
    }
  }

  deny() {
    if(window.opener){
      window.opener.postMessage({ type: 'TX_SIGNED', verified: false }, '*');
      window.close();
    }
    else{
      window.location.href = '/wallet';
    }
  }

  openLoginPage() {
    window.open("/", '_blank');
    if(window.opener){
      window.close();
    }
  }

  @HostListener('window:message', ['$event'])
  async onMessage(data: any) {
    const { data: msg_data } = data;
    switch(msg_data['type']){
      case 'TRANSACTION':
        {
          //deserialize transaction
          const { transaction: serializedTransaction } = msg_data;
          const api = new Api({
            rpc: new JsonRpc('https://testnet.wax.pink.gg', {fetch: window.fetch}),
            signatureProvider: new JsSignatureProvider([]) 
          });
          const transaction = await api.deserializeTransactionWithActions(serializedTransaction);
          const { actions } = transaction;
          this.trx = {
            "serializedTransaction": Array.from(msg_data['transaction']),
            "website": this.referrerUrl || 'unknow-url',
            "description":"jwt is insecure",
            "freeBandwidth": msg_data['freeBandwidth'],
            "feeFallback": msg_data['feeFallback']
          };
          this.parsedActions = [];
          actions.forEach(({account, name, data}) => {
            this.parsedActions = [...this.parsedActions, [account, name, data]];
          });

          const sessionInfo = await this._apiService.getSession();
          if(sessionInfo['token']) {
            const token = sessionInfo['token'];
            this.signResult = await this._apiService.signTransaction(this.trx, token);
          }

          this.isChecked = true;
        }
      break;
    }
  }

}
