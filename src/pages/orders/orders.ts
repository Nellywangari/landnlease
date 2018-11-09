import { Storage } from '@ionic/storage';
import { OrderProvider } from './../../providers/order/order';
import { Order } from './../../models/order.model';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  myOrders$: Observable<Order[]>;
  businessOrders$: Observable<Order[]>;

  user = {
    id:'',
    name: '',
    profileImage: '',
    occupation: '',
    description: '',
    email: '',
    status: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderProvider, public  storage: Storage) {
 
    this.storage.get('userDetails')
    .then((data) => {
      this.user.id = data.id,
      this.user.name = data.username,
      this.user.profileImage = data.profileImage,
      this.user.occupation = data.occupation,
      this.user.description = data.about,
      this.user.email = data.email,
      this.user.status = data.status
      console.log(data.id, this.user.id);

      this.myOrders$=this.orderService.fetchMyOrders(this.user.id).valueChanges();
      this.businessOrders$ =this.orderService.businessOrder(this.user.id).valueChanges();
      console.log(this.myOrders$);
      console.log("orders initiated");
    });

 
  }

  ngOnInit() {
   
  
  }


   
  


  items = [
    {
      imageUrl: 'assets/img/lists/stadium.jpg',
      title: 'First Cup',
      place: 'Madison Square',
      date: '05/06/2016'
    },
    {
      imageUrl: 'assets/img/lists/stadium-3.png',
      title: 'Season',
      place: 'Hooli',
      date: '15/03/2016'
    },
    {
      imageUrl: 'assets/img/lists/stadium-2.jpg',
      title: '2nd Season',
      place: 'Castelão',
      date: '05/12/2015'
    },
  ];


  delete(item) {
    alert('Deleted ' + item.title);
  }

  viewComments(item) {
    alert('Viewing comments of ' + item.title);
  }

  viewPlayers(item) {
    alert('Viewing players of ' + item.title);
  }


}
