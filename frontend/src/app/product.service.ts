//import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http:Http) { }

  create(product) {
    return '';//this.db.list('/products').push(product);
  }

  getAll(): Observable<Product> {
    //return this.db.list('/products');
    let BASE_URL:string = "http://localhost:5000";
    let catalog = this.http.get(BASE_URL+"/api/catalogs").map((res:Response) => res.json());
    console.log(catalog);
    return catalog;
  }

  get(productId) {
    return '';//this.db.object('/products/' + productId);
  }

  update(productId, product) {
    return '';//this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return '';//this.db.object('/products/' + productId).remove();
  }
}
