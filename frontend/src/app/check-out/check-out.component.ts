import { Component, OnInit } from '@angular/core';
import { Address } from '../models/address';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor( private orderService: OrderService,
                private auth: AuthService,
                private productService: ProductService,
                private router: Router) { }

  address: Address = {
    addressLine1 : null,
    zipcode : null,
    phoneNumber: null
  };

  confirmOrder( newaddress: Address) {
    let cartProduct:Product = this.productService.getCartProduct();
    let res = this.orderService.placeOrder( this.auth.user$._id , cartProduct._id, cartProduct.price, newaddress)
    .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['order-success']);
        },
        error => {
            let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            alert(errMsg); // log to console instead        
        }
      );
      this.orderService.sendOrderConfirmationEmail(this.auth.user$.email);
  }



  ngOnInit() {
  }

}
