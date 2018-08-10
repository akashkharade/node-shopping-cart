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
import { OrderService } from "../order.service";

declare var $: any;

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
    
    constructor(private route: ActivatedRoute, 
                private router: Router,
                private productService: ProductService,
                private orderService: OrderService,
                private authService: AuthService,
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
            product => {this.product = product; this.productService.setCartProduct(product)},
            error => this.errorMessage = <any> error);
           console.log(' product value is ' + this.product);
    }
    
    checkIfUserIsLoggedIn(): boolean {
        let checkLoginStatus =  this.authService.checkIfUserisLoggedin(); 
        return checkLoginStatus;
    }

    onBack(): void {
        this.router.navigate(['/products']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onBuyClick() {
        $("#loginModal").modal("hide");
    }

    getProuductDescriptions(): string[] {
        return this.product.describtion.split(";")
    }

}