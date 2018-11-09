import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore'; 
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { viewClassName } from '@angular/compiler';
import { userSettings } from '../../models/userSettings';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afs: AngularFirestore, public afireauth: AngularFireAuth, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  async login(login) {
    return this.afireauth.auth.signInWithEmailAndPassword(login.email, login.password);
  }

  async registerUser(user): Promise<any> {
    //try catch statement
    try {
    const credentials: firebase.auth.UserCredential = await this.afireauth.auth
    .createUserWithEmailAndPassword(
      user.email,
      user.password
    );

    const userProfileDocument: AngularFirestoreDocument<
    userSettings
    > = this.afs.doc(`userProfile/${credentials.user.uid}`);

    //populate the document with user data
    await userProfileDocument.set({
      id: credentials.user.uid,
      email: user.email,
      username: user.username,
      time: user.time,
      occupation: user.occupation,
      about: user.about,
      status: user.status,
      profileImage: user.profileImg      
    });
   
           //persit userdetails to local storage after successful registration
  await  this.storage.set('userDetails', {
      id: credentials.user.uid,
      email: user.email,
      username: user.username,
      time: user.time,
      occupation: user.occupation,
      about: user.about,
      status: user.status,
      profileImage: user.profileImg     
    })
    .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

  } catch (error){
    console.error(error);
  }
  }

}
