import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Product;

  constructor(private router: Router) { }

  onCardClick() {
    this.router.navigate(['/product', this.product._id]);
  }

}
