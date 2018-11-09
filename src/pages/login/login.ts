import { AuthProvider } from './../../providers/auth/auth';
import { userCreds } from './../../models/userCreds';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  creds = {} as userCreds;
  public backgroundImage = 'assets/imgs/background-5.jpg';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {
    try{
      await this.authService.login(this.creds);

     this.navCtrl.setRoot(ProfilePage);

    } catch(error) {
     console.log(error);
 
  }
  }

  goToSignup() {
    this.navCtrl.setRoot("RegisterPage");
  }

}
