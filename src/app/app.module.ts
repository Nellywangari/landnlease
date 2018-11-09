import { ProfilePage } from './../pages/profile/profile';
import { ProductsPage } from './../pages/products/products';
import { ChatsPage } from './../pages/chats/chats';
import { MapPage } from './../pages/map/map';
//import { ManageBusinessPage } from './../pages/manage-business/manage-business';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath  } from '@ionic-native/file-path';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credentials';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { ProductProvider } from '../providers/product/product';
import { CategoriesProvider } from '../providers/categories/categories';
import { AgmCoreModule } from '@agm/core';
import { OrderProvider } from '../providers/order/order';
import { OrderPage } from '../pages/order/order';
import { OrdersPage } from '../pages/orders/orders';
import { ChatProvider } from '../providers/chat/chat';
import { WeatherProvider } from '../providers/weather/weather';
import { HttpModule } from '@angular/http';

import { LoginPage } from '../pages/login/login';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatsPage,
    OrdersPage,
    ProductsPage,
   //LoginPage,
   ProfilePage,

    //ManageBusinessPage,
    MapPage
  ],
  imports: [
    BrowserModule,
   // IonicPageModule.forChild(ProfilePage),
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SuperTabsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqM_dnUoYpXct09oYVNkpEhKgY4USVJnI'
    }),
    IonicStorageModule.forRoot({
      name:"__Ewallet"
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  
    ChatsPage,
   OrdersPage,
   ProductsPage,
  ProfilePage,
  // LoginPage,
  
   // ManageBusinessPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileChooser,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ImghandlerProvider,
    ProductProvider,
    CategoriesProvider,
    OrderProvider,
    ChatProvider,
    WeatherProvider
  ]
})
export class AppModule {}
