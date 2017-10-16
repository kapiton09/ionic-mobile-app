import { Injectable } from '@angular/core';
import {  HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-spacing
import {Http, Response, Headers, ResponseOptionsArgs, RequestOptions} from '@angular/http';

import { IAddress } from './address';

@Injectable()
export class AddressService {

        // tslint:disable-next-line:max-line-length
   token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3RhbmRhcmRDdXN0b21lciIsImlhdCI6MTUwNzYwNDM1N30.KapqmRMLu9xbk9c6iKj-2R0tFkCRJpnnF7PY_tCDzbk';
   // private _addressUrl = './api/addresses/address.json';
   private _addressUrl = 'http://localhost:4041/api/address/';

    constructor(private _http: Http) {

    }

    setHeaders(): Headers {
        const headers = new Headers();
        headers.set('API_key', this.token);
        return headers;
    }

    getAddresses(): Observable<IAddress[]> {
        let reqOptions: ResponseOptionsArgs = {headers: this.setHeaders()};
        const options = new RequestOptions(reqOptions);
        return this._http.get(this._addressUrl, options)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAddress(id: number): Observable<IAddress> {
        return this.getAddresses()
            .map((addresses: IAddress[]) => addresses.find(a => a.addressID === id));
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
