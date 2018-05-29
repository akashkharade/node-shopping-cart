import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../models/product";
import { Address } from "../models/address";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { User } from '../models/user.model';

@Component({
    templateUrl:'./product-details.component.html'
})

export class ProductDetailsComponent implements OnInit { 
    pageTitle: string = 'Product Details';
    errorMessage: string;
    product: Product;
    user: User;
    userName: string;
    status: string;
    private sub : Subscription;
    ObservableProduct: Observable<Product[]>;
    noWalletBalanceMEssage : string = 'You do not have sufficient Balance in your Wallet, please recharge and try again';
    loginMessage: string = "You need to login before you can purchase anything!";
    
    address: Address = {
        addressLine1 : null,
        zipcode : null,
        phoneNumber: null
    };
    
    constructor(private route: ActivatedRoute, 
                private router: Router,
                private productService: ProductService,
                private auth: AuthService,
                private userService: UserService) {
    }
    
    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getProduct(id);
        });
    }

    getProduct(id: number){
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any> error);
           console.log(' product value is ' + this.product);
    }
    
    confirmOrder( newaddress: Address) {

        return this.productService.confirmOrder( this.auth.user$._id , this.product._id, this.product.price, newaddress);
    }

    checkIfUserIsLoggedIn(): boolean {
        let checkLoginStatus =  this.auth.checkIfUserisLoggedin(); 
        return checkLoginStatus;
    }



    onBack(): void {
        this.router.navigate(['/products']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}