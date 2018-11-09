import { Component, Output } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import * as firebase from 'firebase';
import { Angularfirestore } from 'angularfire2/firebase-node';
import { AngularFirestore } from 'angularfire2/firestore';
import{Review} from '../../models/output1'
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import 'rxjs/add/operator/mergeMap';
import { get } from '@ionic-native/core';
/**
 * Generated class for the CalculateOutputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculate-output',
  templateUrl: 'calculate-output.html',
})
export class CalculateOutputPage {
  category$;
  db = firebase.firestore();
  userDoc
    // variables 
    a:number;
    x:number;
    alpha: number;
    z:number;
    beta: number;
    //profit
    wage: number;
    profit:number;
    p:number;
    output:number;
    selectedProduct;
  selectedProductId;
  pricea:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public productService:ProductProvider, public afs: AngularFirestore) {
    this.selectedProduct=this.navParams.get('data');
  console.log(this.selectedProduct.price)
  this.selectedProductId=this.selectedProduct.id;
console.log(this.selectedProductId)
  const user_id = firebase.auth().currentUser.uid;
  console.log(user_id)
 // this.userDoc = fireStore.doc<any>('userProfile/we45tfgy8ij');
    // fetch details of the category
    // this.category$ = this.afs.collection('Categories', ref=> ref.where('id', '==', this.selectedProduct.category_id).limit(1))
    // .valueChanges().flatMap(result => result);
    this.category$ = this.db.collection('Categories').where("id","==",this.selectedProductId).get()
    .then(function(querySnapshot){
      querySnapshot.forEach((doc)=>{
        let docData = doc.data()
        console.log(docData)
        console.log('doing great')
      })
    })
  // const user_id = firebase.auth().currentUser.uid;
  // let userRef = this.afs.collection('userProfile').ref.where('id', '==', user_id);
  // userRef.get().then((result) => {
  // result.forEach(doc => {
  // console.log(doc.data());
  // })
  // })
  
  
    this.alpha=0.5;
    this.beta=0.5
    this.x=10000;
    this.a=50;
    this.z=5000;
    this.wage=250*1;
    this.p=1000;
    this.calculateOutput();
    this.calculateProfit();
   
  }
  getprice(){

   
//     this.category$=this.afs.collection('reviews', ref => ref.where('productId', '==',this.selectedProduct.category_id )).snapshotChanges().map(actions => {
//       return actions.map(a => {
//            const data = a.payload.doc.data() as Review;
//            console.log(data)
//            return data;
//       });
//  });

  }

  calculateOutput(): number {
    //output=ax^alphaz^beta
    //a= total factor of productivity alpha=output elaticity of labour beta= output elasiticity of capital
 //z=capital, x=labour
 //profit= az^beta*p-alpha.wage^alpha


   return this.output = Math.floor(this.a * Math.pow(this.x, this.alpha) * Math.pow(this.z,this.beta));
    
  }
  calculateProfit(): number  {
    let sigma = (this.beta * this.p) - this.alpha;

    return this.profit = Math.floor(this.a * Math.pow(this.z,sigma) * Math.pow(this.wage,this.alpha));

  }
  
}
