import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { ContactUsPage } from './contactus';
import { CartPage } from '../cart/cart';
import { MS1Service, MS6Service } from '../../app/service/index';
/**
* Generated class for the InfoPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
@Component({
    selector: 'page-info',
    templateUrl: 'info.html',
})
export class InfoPage {

    introList:any=[];
    imageUrl: string = globalVariable.url+'uploads/';
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public ms1Service: MS1Service,
        public ms6Service: MS6Service,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController
        ) {
    }

    ionViewDidLoad() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ms6Service.getOneUrl('about-us').subscribe(data => {
            // document.getElementById('getData').innerHTML = data.message[0]['description'];
            loading.dismiss();
            /*})
            this.ms1Service.getIntro().subscribe((data)=>{
                if (!data.error) {
                    this.introList = data.message;
                }*/
        },(err)=>{
            loading.dismiss();
            this.getToast('Unable to load data. Please check your Internet connection.');
        });
    }


    getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }

    ionViewDidEnter(){
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:block");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:block");
        }
    }

    contactUsPage(){
        this.navCtrl.push(ContactUsPage);
    }

    cartPage(){
        this.navCtrl.push(CartPage);
    }

}
