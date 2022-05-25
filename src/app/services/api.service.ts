import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class APIService {
    constructor(
        private httpClient: HttpClient,        
    ){}

    getDeviceList(): Observable<any> {
        return this.httpClient.get('http://localhost:3000/device').pipe()
    }
}
