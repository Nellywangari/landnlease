import { MapPage } from './../map/map';
import { ProductProvider } from './../../providers/product/product';
import { ImghandlerProvider } from './../../providers/imghandler/imghandler';
import { Category } from './../../models/category';
import { Observable } from 'rxjs';
import { CategoriesProvider } from './../../providers/categories/categories';
import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ModalController,Modal, ViewController } from 'ionic-angular';
import { Products } from '../../models/product.model';
import * as firebase from 'firebase';
import { Response, Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-products.html',
})
export class AddProductsPage {
  product = {} as Products;
  imgUrl = "./../../assets/imgs/upload.png";
  placeTitle="";
  latitude=0;
  longitude=0;
  temp:0;
  url;
  apikey='ad20cea20297bcd229ea4a33764ff6ae';

  

  categories: Observable<Category[]>;

  constructor(public navCtrl: NavController, public http:Http,public view: ViewController, public modalCtrl: ModalController, public productService: ProductProvider, public navParams: NavParams,public categoryService: CategoriesProvider,public imgservice: ImghandlerProvider,public loadCtrl: LoadingController, public zone: NgZone) {
    this.url='http://api.openweathermap.org/data/2.5/weather?lat='+this.latitude+'&lon='+this.longitude+'&units=metric&APPID='+this.apikey;
    console.log(this.url)
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories$(ref => ref);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  chooseimg(){
    let loader = this.loadCtrl.create({
      content:'please wait'
    })
    loader.present();
    this.imgservice.uploadProductimage().then((uploadedurl:any)=>{
      loader.dismiss();
      this.zone.run(()=>{
        this.imgUrl = uploadedurl;
        this.product.imgUrl= this.imgUrl;
      })
    })
}

// category_id: string;
// user_id: string;
// imgUrl: string;
// name: string;
// brief_description: string;
// description: string;
// units: number;
// measurement: string;
// price: number;

  upload(){
    const name = this.product.name;
    const brief_description = this.product.brief_description;
    const description = this.product.description;
    const units = this.product.units;
    // const measurement = this.product.measurement;
    const price = this.product.price;
    const imgUrl = this.product.imgUrl;
    const category_id = this.product.category_id;
    const user_id = firebase.auth().currentUser.uid;
    const location = this.placeTitle;
    const lat=this.latitude;
    const lng=this.longitude;
    // const tempe=this.temp;

    console.log({name,brief_description,description,units,price,imgUrl,category_id,user_id,location,lat,lng});

    // category_id,
    // user_id,
    // imgUrl,
    // name,
    // brief_description,
    // description,
    // units,
    // measurement,
    // price

    this.productService.addnewProduct(category_id, user_id, imgUrl,name,brief_description,description,units,price,location,lat,lng).then((res:any)=>{
      
      this.navCtrl.push('MyProductsPage');
      
    })
  }

  getLocation() {
    let mapModal = this.modalCtrl.create(MapPage);
    mapModal.onDidDismiss(localeData => {
      if(localeData != null){
      this.placeTitle = localeData.name;
      this.latitude = localeData.lat;
      this.longitude = localeData.lng;
      console.log(localeData);
      } else {
        this.placeTitle ="Undefined";
        this.latitude = 0;
        this.longitude = 0;
      }
    })

    mapModal.present();
  
  }
   gettemp(){
     
   } 
  
   getweather(){
    return this.http.get(this.url)
     .map(res => res.json());
  }
}
