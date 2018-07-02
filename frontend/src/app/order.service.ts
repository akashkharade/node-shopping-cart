import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Http, Response, Headers } from '@angular/http';
import { Address } from "./models/address";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './models/order';
import { Product } from './models/product';
import { Email } from './models/email.model'

@Injectable()
export class OrderService {

  constructor(private http:Http, private productService: ProductService) { }
  public BASE_URL: string = "http://localhost:5000";
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private emailUrl='http://localhost:5000/api/sendMail';
  emailFrom: string = 'no-reply@smtp.pidc.com';
  emailSubject: string = 'Order Confirmed';
  emailBody: string = 'Hello Nessian, your order is successfully placed and will be delievered in 2-4 business days! Thankyou for shopping with us :)';
 
  placeOrder(userId: string, productId: string, productPrice: string, address: Address){
    let _body = 'total_price='+productPrice+'&status=confirmed&address='+JSON.stringify(address)+'&productId='+productId;
    return this.http.post(this.BASE_URL + "/api/user/" + userId + "/orders", _body , { headers: this.headers } );
  }

  getOrders() { 
   // return this.db.list('/orders');

  }

  getOrdersByUser(userId: string): Observable<Order> {

    return this.http.get(this.BASE_URL + "/api/user/"+ userId+"/orders")
    .map((res:Response) =>  res.json());
    /*.switchMap(order => {
      order.name = this.getOrderProduct(order.productId);
      console.log("(((((((((("+order);
      return order;
    });*/
  }

  getOrderProduct(productId: number) {
    console.log("-----++++++------"+productId);
    return this.productService.getProduct(productId).map(product => {
      console.log("&&&&&&&&&&&"+product.name);
      return product;
    });
  }

  sendOrderConfirmationEmail(email: String){
    let _body = 'to='+email+'&from='+this.emailFrom+'&subject='+this.emailSubject+'&bodyText='+this.emailBody;
    return this.http
        .post(this.emailUrl, _body, { headers: this.headers })
        .toPromise()
        .then(res => res.json().data as Email)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}
}
