import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController, ViewController } from 'ionic-angular';

import { MS3Service } from '../../app/service/index';

import { LocationService } from '../../app/service/location.service';




/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-login',
    templateUrl: 'guestlogin.html',
})

export class GuestModalPage {

    guestLoginForm: FormGroup;
    emailp : any = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
    constructor(
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private lf: FormBuilder,
        public navCtrl: NavController,
        public ms3Service: MS3Service,
        public locationService: LocationService
        ) {

        this.guestLoginForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]]
        });
    }
    
    /*ionViewDidEnter(){
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }*/

    iconImage(){
        return 'assets/imgs/MealDaay-small.png'
    }

    login(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        let obj = {};

        obj['email'] = this.guestLoginForm.value['email'];
        obj['username'] = this.guestLoginForm.value['email'];
        obj['password'] = 'mealdaay123';
        obj['accounttype'] = 'guest';
        obj['status'] = true;

        this.ms3Service.addCustomer(obj).subscribe((data)=>{
            loading.dismiss();
            if (data.error) {
                this.getToast('Email ID already in use');
            }else{
                console.log("guest data");
                console.log(data);
                this.viewCtrl.dismiss(obj);
            }
        },(err)=>{
            loading.dismiss();
            this.getToast('Error Occured! Please check your Internet Connection')
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

    loginPage(){
        this.viewCtrl.dismiss();
    }
}
