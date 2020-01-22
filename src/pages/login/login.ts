import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events, LoadingController, ModalController, ToastController, Nav, NavController, NavParams, MenuController } from 'ionic-angular';

import { ForgetPasswordPage } from './forgetpassword';
import { SignupPage } from './signup';
import { GuestModalPage } from './guestlogin';

import { ListPage } from '../list/list';

import { MS3Service } from '../../app/service/index';

import { FirebaseFunctionService } from '../../app/service/firebase-function.service';



import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/
import 'rxjs/add/operator/map';
import firebase from 'firebase';
declare var FCMPlugin : any;
/*import { AngularFirestore } from 'angularfire2/firestore';*/
import { Observable } from 'rxjs/Observable';




/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {

    guestObj = {};

    popOrRoot : any;

    loginForm: FormGroup;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    constructor(
        public nav: Nav,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public menuCtrl: MenuController,
        private lf: FormBuilder,
        public navCtrl: NavController,
        public navParams: NavParams,
        public ms3Service: MS3Service,
        public events: Events,
        public modalCtrl: ModalController,
        public fcmService: FirebaseFunctionService
        ) {

        this.popOrRoot = navParams.get('pop');

        this.loginForm = this.lf.group({
            username: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', Validators.required],
        });
        /*this.menuCtrl.enable(false);*/
    }
    
    ionViewDidEnter(){
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }

    iconImage(){
        return 'assets/imgs/MealDaay-small.png'
    }
    afterCustomerGet(userObj){
    
        console.log(userObj,"check it ");
        let that = this;
        FCMPlugin.getToken(function(token){
          
          console.log(token);
          that.AddTokenToDB(token,userObj);
    
         console.log( token );
        });
      }
      AddTokenToDB(token,that){
        let data = {_id:"none",fcmToken:[] };
        let temp =  that;
        console.log(temp,"temp inside function");
        data._id = temp._id;
        let tokens = temp.fcmToken;
        if(tokens == undefined){
          tokens = new Array();
        }
        if(tokens.includes(token)){
          return;
        }
     
        tokens.push(token);
        data.fcmToken = tokens;
        this.ms3Service.updateCustomer(data).subscribe((res)=>{
          console.log(res);
        })
    
      }
    login(type){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        let obj = {};

        if (type == 'customer') {
            obj['username'] = this.loginForm.value['username'];
            obj['password'] = this.loginForm.value['password'];
        }else{
            obj['username'] = this.guestObj['username'];
            obj['password'] = this.guestObj['password'];
        }


        this.ms3Service.getCustomer(obj).subscribe((data)=>{
            loading.dismiss();
            if (data.error) {
                this.getToast("Invalid email or password. Please try again.");
            }else{
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.data));
                this.afterCustomerGet(data.data);
                if (typeof this.popOrRoot != 'undefined' && this.popOrRoot != null) {
                    this.navCtrl.pop();
                }else{
                    this.navCtrl.setRoot(ListPage);
                }

                let cartItem = localStorage.getItem('cartinfo');

                if (type == 'customer') {
                    this.getToast('Login Successfully');
                    this.events.publish('user:created', data.data , Date.now());
                }else{
                    this.getToast('Guest Login Successfully');
                }
                
                if (cartItem != null) {
                    if (JSON.parse(cartItem)['customerid'] != '' && JSON.parse(cartItem)['customerid'] != data.data['_id']) {
                        localStorage.removeItem('cartinfo');
                    }
                    this.events.publish('cart:item', 'abc', Date.now());
                }
                
                this.fcmService.getTokenForCustomer();
                /*this.menuCtrl.enable(true);*/
            }
        },(err)=>{
            loading.dismiss();
            this.getToast('Invalid email or password. Please try again.')
        });
    }

    private getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }

    forgetPass(){
        this.navCtrl.push(ForgetPasswordPage);
    }

    signup(){
        this.navCtrl.push(SignupPage);
    }

    loginAsGuest(){
        let modal = this.modalCtrl.create(GuestModalPage);

        modal.onDidDismiss(data => {
            if (typeof data != 'undefined' && data != null) {
                this.guestObj = data;

                this.login('guest');
            }
        });


        modal.present();
        /*this.menuCtrl.enable(true);
        this.navCtrl.setRoot(ListPage);*/
    }
}
