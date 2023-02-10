import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  // public readonly _apiEndpoint: string;
  constructor(
    private _httpClient: HttpClient
  ) {

  }

  public fetch(url: string, options?: FetchOption): Promise<any>{
    return window.fetch(url, options)
      .then((res: Response) => {
        const contentLength = res.headers.get('content-length');
        const contentType = res.headers.get('content-type');

      if(contentLength != '0') {
        if(contentType?.indexOf('application/json') != -1) {
          return res.json().then(json => {
            return {...json, code: res['status'], statusText: res['statusText']};
          });
        }
        else{
          return res.text().then(text => {
            return {msg: text, code: res['status'], statusText: res['statusText']};
          });
        }
      }
      else {
        return { code: res['status'], statusText: res['statusText']};
      }
    }).catch(ex => {
      return { msg: 'Fail to fetch', code: 444, statusText: 'No response'};
    });
  }

  public fetchTimeout(url: string, requestTimeout: number, options?: FetchOption) {
    const controller = new AbortController();
    const promise = this.fetch(url, { signal: controller.signal, ...options });
    if (options?.signal) options.signal.addEventListener("abort", () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), requestTimeout);
    return promise.finally(() => clearTimeout(timeout));
  }
}

export class HttpOptions {
  url?: string;
  body?: any;
  options?: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: any;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: any;
    withCredentials?: boolean;
  };
}

export class FetchOption implements RequestInit {
  method?: string;
  headers?: any;
  body?: any;
  signal?: AbortSignal | null;
  credentials?: RequestCredentials;
}

export class HttpGetOptions extends HttpOptions {
  is_cache?: boolean;
}