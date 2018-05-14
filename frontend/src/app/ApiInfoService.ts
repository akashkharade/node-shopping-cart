import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {AppConfig} from './AppConfig';
import {ApiInfo} from './ApiInfo';

@Injectable()
export class ApiInfoService {

    constructor(private http:Http){

    }

    getAPInfo(): Observable<ApiInfo>{
      
      let cc = this.http.get(AppConfig.BASE_URL+"/api").map((res:Response) => res.json());
      console.log(cc);
     return  cc;
    }
}