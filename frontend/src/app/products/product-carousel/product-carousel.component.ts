import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css']
})
export class ProductCarouselComponent implements OnInit {

  @Input('productImages') productImages:string[];

  productImagesArr:string[];
  
  constructor() {
  }

  ngOnInit() {
  }

}
