import { ProductProvider } from './../../providers/product/product';
import { Products } from './../../models/product.model';
import { Observable } from 'rxjs';
import { AddProductsPage } from './../add-products/add-products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products$: Observable<Products[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductProvider) {
  
  }

  addProductPage(){
    this.navCtrl.push("AddProductsPage");
  }


  ngOnInit() {
    this.products$ =this.productService.getAllProducts(ref => ref);
    console.log(this.products$);
  }

  orderPage(product) {
    this.navCtrl.push("OrderPage",{data:product})
  }
  calcoutput(product){
    this.navCtrl.push("CalculateOutputPage",{data:product});
  }

}
