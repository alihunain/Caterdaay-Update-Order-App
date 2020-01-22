import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongPressModule } from 'ionic-long-press'
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MyPopOverPage } from '../pages/home/my-pop-over';

import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/login/forgetpassword';
import { SignupPage } from '../pages/login/signup';
import { GuestModalPage } from '../pages/login/guestlogin';
import { DatePickerModule } from 'ion-datepicker';
import { ListPage } from '../pages/list/list';
import { FilterPage } from '../pages/list/filter';
import {FilterService} from '../app/service/filter.service';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/cart/checkout';
import { ThankPage } from '../pages/cart/thankupage';
import { AppMinimize } from '@ionic-native/app-minimize';
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasswordPage } from '../pages/profile/changepassword';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';
import { AddAddressPage } from '../pages/profile/addaddress';
import { AddCardsPage } from '../pages/profile/addcards';

import { OrderPage } from '../pages/order/order';
import { OrderDetailPage } from '../pages/order/orderdetail';

import { ReferPage } from '../pages/refer/refer';

import { Diagnostic } from '@ionic-native/diagnostic';

import { ReviewPage } from '../pages/review/review';
import { GiveReviewPage } from '../pages/review/give-review';

import { InfoPage } from '../pages/info/info';
import { ContactUsPage } from '../pages/info/contactus';

import { WishlistPage } from '../pages/wishlist/wishlist';

import { OfferPage } from '../pages/offer/offer'

import { SnapPage } from '../pages/snap/snap';

import { Network } from '@ionic-native/network';

import { Ionic2RatingModule } from 'ionic2-rating';
import { FileDropDirective,FileUploadModule } from 'ng2-file-upload';


/*Services*/
import { MS1Service, MS2Service, MS3Service, MS4Service, MS6Service } from './service/index';

import { LocationService } from './service/location.service';

import { FirebaseFunctionService } from './service/firebase-function.service';


import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Keyboard } from '@ionic-native/keyboard/ngx';
/*import { NativeGeocoder } from '@ionic-native/native-geocoder';*/
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database'


import { AngularFirestoreModule } from 'angularfire2/firestore';

/*import { AngularFireModule } from 'angularfire2';*/
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
/*import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';*/
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';


import { Badge } from '@ionic-native/badge';
/*import { BackgroundMode } from '@ionic-native/background-mode';*/

import * as firebase from "firebase";
// import { BackgroundMode } from '@ionic-native/background-mode';
import { CallNumber } from '@ionic-native/call-number';
// import{ScreenOrientation} from '@ionic-native/screen-orientation';
import { MultiPickerModule } from 'ion2-datetime-picker';
import { AddOn } from '../pages/cart/add-on';
var config = {
    apiKey: "AIzaSyB5oue6snCCcEKDTpoX8hRQkP0q2bl1Ojo",
    authDomain: "mealdaay-334ae.firebaseapp.com",
    databaseURL: "https://mealdaay-334ae.firebaseio.com",
    projectId: "mealdaay-334ae",
    storageBucket: "mealdaay-334ae.appspot.com",
    messagingSenderId: "202055895804"
  };


firebase.initializeApp(config);



@NgModule({
  declarations: [
    AddOn,
    MyApp,
    HomePage,MyPopOverPage,
    LoginPage,ForgetPasswordPage,SignupPage,GuestModalPage,
    ListPage,FilterPage,
    CartPage,CheckoutPage,ThankPage,
    ProfilePage,ChangePasswordPage,ProfileUpdatePage,AddAddressPage,AddCardsPage,
    OrderPage,OrderDetailPage,
    ReferPage,ReviewPage,
    InfoPage,ContactUsPage,
    WishlistPage,
    OfferPage,
    SnapPage,
    GiveReviewPage
  ],
  imports: [
    
    MultiPickerModule,
    DatePickerModule,
    LongPressModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    Ionic2RatingModule,
    
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,MyPopOverPage,
    LoginPage,ForgetPasswordPage,SignupPage,GuestModalPage,
    ListPage,FilterPage,
    CartPage,CheckoutPage,ThankPage,
    ProfilePage,ChangePasswordPage,ProfileUpdatePage,AddAddressPage,AddCardsPage,
    OrderPage,OrderDetailPage,
    ReferPage,ReviewPage,
    InfoPage,ContactUsPage,
    WishlistPage,
    OfferPage,
    AddOn,
    SnapPage,
    GiveReviewPage
  ],
  exports: [FileUploadModule],
  providers: [
  
    // CallNumber,
    Badge,
    AppMinimize,
    // BackgroundMode,
    LocationService,
    FilterService,
    MS1Service, MS2Service, MS3Service, MS4Service, MS6Service, FirebaseFunctionService,
    StatusBar,
    SplashScreen,
    Keyboard,
    File,
    Transfer,
    Camera,
    FilePath,
    Diagnostic,
    /*NativeGeocoder,*/
    Geolocation,
    /*BackgroundMode,*/
    Network,
    AngularFireDatabase,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
