import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { LoginService } from '../login/login.service';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';


@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  orders$: Observable<Order>;
  
  constructor(
    private authService: LoginService,
    private orderService: OrderService,
    private productService: ProductService) { 
      this.orders$ = this.authService.user$.switchMap(u => orderService.getOrdersByUser(u._id));
      /*.switchMap(order => {
        console.log("^^^^"+order.productId);
        return this.orderService.getOrderProduct(order.productId)
        .map(product => {
          console.log("****"+product.name);
          order.productName = product.name;
          return order;
        });
      });;*/
  }

  ngOnInit() {
    //this.orders$
  }
  
}
