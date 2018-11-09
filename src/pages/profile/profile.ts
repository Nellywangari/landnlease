import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    user = {
    name: '',
    profileImage: '',
    occupation: '',
    description: '',
    email: '',
    status: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.checkDetails();
    const user_id = firebase.auth().currentUser.uid;
    console.log(user_id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  checkDetails(){
    this.storage.get('userDetails')
  .then((data) => {
    this.user.name = data.username,
    this.user.profileImage = data.profileImage,
    this.user.occupation = data.occupation,
    this.user.description = data.about,
    this.user.email = data.email,
    this.user.status = data.status
  }
  );
  }

}
