import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WCWTestnetApiService {
  private _apiEndpoint: string = environment.api_endpoint;
  private _requestTimeout: number = 10000;
  constructor(
    private _http: HttpClientService
  ) { }

  async getSession(): Promise<any> {
    try{
      const result = await this._http.fetchTimeout(`${this._apiEndpoint}/v1/wcw/session`, this._requestTimeout,
      {
        method: 'GET',
        credentials: 'include'
      });
      return result;
    }
    catch(ex){
      return { code: 444, statusText: "No response" };
    }
  }

  async login(wallet: string, password: string): Promise<any> {
    try{
      const result = await this._http.fetchTimeout(`${this._apiEndpoint}/v1/wcw/session`, this._requestTimeout,
      {
        method: 'POST',
        body: JSON.stringify({wallet, password}),
        credentials: 'include'
      });
      return result;
    }
    catch(ex){
      return { code: 444, statusText: "No response" };
    }
  }

  async logout(): Promise<any> {
    try{
      const result = await this._http.fetchTimeout(`${this._apiEndpoint}/v1/wcw/logout`, this._requestTimeout,
      {
        method: 'POST',
        credentials: 'include'
      });
      return result;
    }
    catch(ex){
      return { code: 444, statusText: "No response" };
    }
  }

  async register(wallet: string, password: string): Promise<any> {
    try{
      const result = await this._http.fetchTimeout(`${this._apiEndpoint}/v1/wcw/register`, this._requestTimeout,
      {
        method: 'POST',
        body: JSON.stringify({wallet, password}),
        credentials: 'include'
      });
      return result;
    }
    catch(ex){
      return { code: 444, statusText: "No response" };
    }
  }

  async getUserInfo(token: string): Promise<any> {
    try{
      const result = await this._http.fetchTimeout(`${this._apiEndpoint}/wam/users`, this._requestTimeout,
      {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      });
      return result;
    }
    catch(ex){
      return { code: 444, statusText: "No response" };
    }
  }

  async signTransaction(trx: any, token: string): Promise<any> {
    try{
      const result = await this._http.fetchTimeout(`${this._apiEndpoint}/wam/sign`, this._requestTimeout,
      {
        method: 'POST',
        body: JSON.stringify({trx}),
        headers: {
          'x-access-token': token
        }
      });
      return result;
    }
    catch(ex){
      return { code: 444, statusText: "No response" };
    }
  }

  // async getBalance(token: string): Promise<any> {
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._apiEndpoint}/get-balance`,{
  //       method: 'POST',
  //       headers: {
  //         'X-Token': token
  //       }
  //     });
  //     return result;
  //   }
  //   catch {
  //     return { message: "", status_code: 444, error: { message: "No response" } };
  //   }
  // }

  // async getEndPoints(token: string): Promise<any> {
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._apiEndpoint}/get-endpoints`,{
  //       method: 'GET',
  //       headers: {
  //         'X-Token': token
  //       }
  //     });
  //     return result;
  //   }
  //   catch {
  //     return { message: "", status_code: 444, error: { message: "No response" } };
  //   }
  // }

  // async getNftExchangeData(token: string): Promise<any> {
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._apiEndpoint}/get-nft-exchange`,{
  //       method: 'GET',
  //       headers: {
  //         'X-Token': token
  //       }
  //     });
  //     return result;
  //   }
  //   catch {
  //     return { message: "", status_code: 444, error: { message: "No response" } };
  //   }
  // }
  // listPlanet;
  // async getLandData(token: string): Promise<any> {
  //   // if(this.listPlanet) return this.listPlanet;
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._apiEndpoint}/get-land-data`,{
  //       method: 'GET',
  //       headers: {
  //         'X-Token': token
  //       }
  //     });
  //     this.listPlanet = result['result'];
  //     return this.listPlanet;
  //   }
  //   catch {
  //     if(this.listPlanet) return this.listPlanet;
  //     else return { message: "", status_code: 444, error: { message: "No response" } };
  //   }
  // }

  // async linkOrUnlinkChatId(token, chat_id, action = 'link') {
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._apiEndpoint}/${action}-chat`,{
  //       method: 'POST',
  //       body: JSON.stringify({
  //         chat_id
  //       }),
  //       headers: {
  //         'X-Token': token
  //       }
  //     });
  //     return result;
  //   }
  //   catch {
  //     return { message: "", status_code: 444, error: { message: "No response" } };
  //   }
  //   // return this._http.fetch(`${this._apiEndpoint}/${action}-chat`, {
  //   //   method: 'POST'
  //   // }).then(result => {
  //   //   return result;
  //   // })
  //   //   .catch(err => {
  //   //     return null;
  //   //   });
  // }

  // // /${token}/${maskToken}/${chatId || '0'}

  // async pushTelegramMsg(token, chat_id, message) {
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._apiEndpoint}/push-tg-message`,{
  //       method: 'POST',
  //       body: JSON.stringify({
  //         chat_id,
  //         message
  //       }),
  //       headers: {
  //         'X-Token': token
  //       }
  //     });
  //     return result;
  //   }
  //   catch {
  //     return { message: "", status_code: 444, error: { message: "No response" } };
  //   }
  //   // return this._http.fetch(`${this._apiEndpoint}/push-tg-message?id=${token}&account=${account}&msg=${msg}&chatId=${chatId}`, {
  //   //   method: 'POST',
  //   // }).then(result => {
  //   //   return result;
  //   // })
  //   //   .catch(err => {
  //   //     return null;
  //   //   });
  // }

  // async signWAMTrx(token: string, access_token, trx): Promise<any> {
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._wamApiEndpoint}/wam/sign`,
  //     {
  //       method: 'POST',
  //       body: JSON.stringify(trx),
  //       headers: {
  //         'X-Token': token,
  //         'x-access-token': access_token
  //       }
  //     });
  //     return result;
  //   }
  //   catch(ex){
  //     return { message: "", status_code: 444, error: { message: "No response", error_detail: "No response from server" } };
  //   }
  // }

  // async checkWAMUser(token: string, access_token): Promise<any> {
  //   try{
  //     const result = await this._http.fetchBotApi(`${this._wamApiEndpoint}/wam/users`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'X-Token': token,
  //         'x-access-token': access_token
  //       }
  //     });
  //     return result;
  //   }
  //   catch(ex){
  //     return { message: "", status_code: 444, error: { message: "No response", error_detail: "No response from server" } };
  //   }
  // }
}