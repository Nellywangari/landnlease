import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from './../../models/order.model';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import DocumentReference = firebase.firestore.DocumentReference;
import { Injectable } from '@angular/core';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class OrderProvider {

  readonly path="Orders";

  constructor(public afs: AngularFirestore) {
   
  }

  //create orders table, fetch individual user orders , accept and reject orders

  pushOrders(
    product_id: string,
    product_name: string,
    buyer_id: string,
    seller_id: string,
    quantity: number,
    price: number,
    accepted: boolean,
    rejected: boolean
  ): Promise<void> {
    const orderId: string = this.afs.createId();
    return this.afs.doc<Order>(`Order/${orderId}`)
    .set({
    id: orderId,
    product_id,
    product_name,
    buyer_id,
    seller_id,
    quantity,
    price,
    accepted,
    rejected
    });

  }

  // fetch all the orders that i have sent 

  fetchMyOrders(userId: string): AngularFirestoreCollection<Order> {
    return this.afs.collection<Order>('Order',
    ref => 
      ref
        .where('buyer_id', '==',userId)
    );
  }

  acceptOrder() {

  }

  rejectOrder() {

  }

  deleteOrder() {

  }


  //fetch all the orders sent to my business


  businessOrder(userId: string): AngularFirestoreCollection<Order> {
    return this.afs.collection<Order>('Order',
    ref => 
      ref
        .where('seller_id', '==',userId)
    );
  }


}
