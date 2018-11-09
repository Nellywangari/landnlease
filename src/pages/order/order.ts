import { OrderProvider } from './../../providers/order/order';
import { Component, NgZone, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import {} from 'google-maps';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ProductReview } from '../../models/ProductReview';
import { ProductProvider } from '../../providers/product/product';
import { AngularFirestore } from 'angularfire2/firestore';




/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  selectedProduct;
  selectedProductId;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  user;
  url;
  weather:any;
  apikey='ad20cea20297bcd229ea4a33764ff6ae';
  reviewFormGroup: FormGroup;
  reviews: Array<ProductReview>;
  constructor(public navCtrl: NavController,public http: Http, private afs: AngularFirestore,public productService:ProductProvider, private fb: FormBuilder, public navParams: NavParams, private orderService: OrderProvider, private view: ViewController, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    console.log('order')
    this.selectedProduct = this.navParams.get('data');
  this.selectedProductId=this.selectedProduct.id;
 console.log(this.selectedProduct.price)

          this.initializeForm();
    //set current position
    this.setProductPosition();
    this.url='http://api.openweathermap.org/data/2.5/weather?lat='+this.selectedProduct.lat+'&lon='+this.selectedProduct.lng+'&units=metric&APPID='+this.apikey;    
  
    this.getweather().subscribe(weather => {
      this.weather = weather;
      console.log(this.url)
      console.log(this.weather.main.temp)
      console.log()
    
    })
  }

  ionViewDidLoad() {
    this.getReviews();
  }
  initializeForm() {
    this.reviewFormGroup = this.fb.group({
         username: ['', Validators.required],
         summary: ['', Validators.required],
         review: ['', Validators.required],
         productId: [this.selectedProductId]
    });
}
getReviews() {
  this.productService.getProductReviews(this.selectedProductId).subscribe((data) => {
       this.reviews = data;
  });
}
  makeOrder() {

  }

  setProductPosition() {
    this.latitude = this.selectedProduct.lat;
    this.longitude = this.selectedProduct.lng;
    this.zoom = 12;
  }

  orderProduct() {

    const product_id = this.selectedProduct.id;
    const product_name= this.selectedProduct.name;
    const buyer_id = firebase.auth().currentUser.uid;
    const seller_id = this.selectedProduct.user_id;
    const quantity = this.selectedProduct.units;
    const price = this.selectedProduct.price
    const accepted = false;
    const rejected=false;

    this.orderService.pushOrders(product_id,product_name,buyer_id,seller_id,quantity,price,accepted,rejected).then((res:any)=>{
      //navigate to a page showing your order status
      this.navCtrl.push("OrdersPage");
    })

  }

  // calcoutput(product){
  //   this.navCtrl.push("CalculateOutputPage",{data:product});
  // }
  submitReview() {
    let body: ProductReview = this.reviewFormGroup.value;
    this.productService.postReview(body);
    this.initializeForm();
}
rateProduct(val) {

  this.productService.postRating({
       productId: this.selectedProductId,
       ratingValue: val
  });

  this.productService.getProductRating(this.selectedProductId).subscribe((retVal) => {
      const ratings = retVal.map(v => v.ratingValue);
       let avRating = (ratings.length ? ratings.reduce((total, val) => total + val) / retVal.length : 0);

       this.productService.setProductRating(this.selectedProductId,avRating.toFixed(1));
  });
}
getweather(){
  return this.http.get(this.url)
  .map(res => res.json())
}
}