import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Products } from './../../models/product.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/firestore/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import DocumentReference = firebase.firestore.DocumentReference;
import { ProductReview } from '../../models/ProductReview';
import {ProductRating} from '../../models/Rating';
import { ActionSheet } from 'ionic-angular';

@Injectable()
export class ProductProvider {


  readonly path = 'Products';
  constructor(private afs: AngularFirestore) {
    
  }

  addnewProduct(
    category_id: string,
    user_id: string,
    imgUrl: string,
    name: string,
    brief_description: string,
    description: string,
    units: number,
    // measurement: string,
    price: number,
    location: string, 
    lat: number,
    lng: number

  ): Promise<void> {
    const productId: string = this.afs.createId();
    return this.afs.doc<Products>(`Products/${productId}`)
    .set({
    id: productId,
    category_id,
    user_id,
    imgUrl,
    name,
    brief_description,
    description,
    units,
    price,
    location, 
    lat,
    lng
    });

    //persist added items to local storage
  }

  deleteProduct(id: string): Promise<void>{
    return this.afs.doc<Products>(`${this.path}/${id}`).delete();
  }

  update(id: string, data: Partial<Products>): Promise<void> {
    return this.afs.doc<Products>(`${this.path}/${id}`).update(data);
  }

  getAllProducts(ref?: QueryFn): Observable<Products[]> {
    return this.afs.collection<Products>(this.path, ref)
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Products;
        const id= a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  getUserProducts(userId: string): AngularFirestoreCollection<Products> {
    return this.afs.collection<Products>('Products',
    ref => 
      ref
        .where('user_id', '==',userId)
    );
  }

  postReview(comment: ProductReview) {
    this.afs.collection('reviews').add({
         username: comment.username,
         summary: comment.summary,
         review: comment.review,
         productId: comment.productId
    });
}
getProductReviews(productId) {
  return this.afs.collection('reviews', ref => ref.where('productId', '==', productId)).snapshotChanges().map(actions => {
       return actions.map(a => {
            const data = a.payload.doc.data() as ProductReview;
            return data;
       });
  });
}
getProductprice(productId){
  // return this.afs.collection('Categories',ref=>ref.where('id','==',productId)).snapshotChanges().map(actions=>){
  //   return ActionSheet.
  

}
postRating(rating: ProductRating) {
  this.afs.collection('ratings').add({
       productId: rating.productId,
       ratingValue: rating.ratingValue
  });
}

getProductRating(productId) {

  return this.afs.collection('ratings', ref => ref.where('productId', '==', productId)).snapshotChanges().map(actions => {
       return actions.map(a => {
            const data = a.payload.doc.data() as ProductRating;
            return data;
       });
  });
}

setProductRating(productId, rating) {
  const docPath = `products/${productId}`;
  const productDoc = this.afs.doc(docPath);
  productDoc.update({ avRating: rating });
}
}