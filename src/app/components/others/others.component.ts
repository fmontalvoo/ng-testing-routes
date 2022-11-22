import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  color = 'green';
  products: Product[] = [];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe(res => {
        this.products = res;
      });
  }

}
