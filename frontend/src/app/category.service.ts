//import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(private http:Http) { }

  getAll(): Observable<Category> {
    let BASE_URL:string = "http://localhost:5000";
    let categories = this.http.get(BASE_URL+"/api/catalogs/categories").map((res:Response) =>  res.json().categories);
    return categories;

// return JSON.parse('[{"name":"shoes"},{"name":"mobile"},{"name":"watches"},{"name":"clothes"}]');
//    return this.db.list('/categories', {
//      query: {
//        orderByChild: 'name'
//      }
//    });
  }
}
