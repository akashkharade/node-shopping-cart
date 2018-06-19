//import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { Address } from "./models/address";
import { HttpParams } from '@angular/common/http';


@Injectable()
export class ProductService {

  constructor(private http:Http) { }

  public BASE_URL: string = "http://localhost:5000";
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
  create(product) {
    return '';//this.db.list('/products').push(product);
  }

  getAll() {

    let catalog = this.http.get(this.BASE_URL+"/api/catalogs").map((res:Response) => res.json());
    console.log(catalog);
    return catalog;
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get(this.BASE_URL + "/api/products/"+ id)
        .map((res:Response) =>  res.json())
        .do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError)
  }

  public getProduct(id: number): Observable<Product> {
    return this.getProductById(id);
  }

  /*confirmOrder(userId: string, productId: string, productPrice: string, address: Address){
    let _body = 'total_price='+productPrice+'&status=confirmed&address='+JSON.stringify(address)+'&productId='+productId;
    return this.http.post(this.BASE_URL + "/api/user/" + userId + "/orders", _body , { headers: this.headers } );
 }*/

  getData() {
    return this.http.get('http://jsonplaceholder.typicode.com/posts/')
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || [];
  }

  private handleError1(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
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

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
}
}
