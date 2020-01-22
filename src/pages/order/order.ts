import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { OrderDetailPage } from './orderdetail';

import { MS1Service, MS4Service } from '../../app/service/index';

import { DatePipe } from '@angular/common';

import * as globalVariable from "../../app/global";


/**
* Generated class for the OrderPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-order',
    templateUrl: 'order.html',
})
export class OrderPage {

    orders : any = [];
    currentCustomer : any;
    imageURL: string = globalVariable.imageUrl;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public ms4Service: MS4Service,
        public ms1Service: MS1Service
        ) {
        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        }
        /*this.orders = JSON.parse(localStorage.getItem('order'))*/
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
        this.getOrders();
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getOrders();
            refresher.complete();
        }, 2000);
    }

    ionViewDidLoad() {
        this.getOrders();
    }

    getOrderImage(img){
        let imgPath: any;
        if (typeof img == 'undefined' || img == null || img == '') {
            imgPath = "assets/imgs/res1.jpg";
        }else{
            imgPath = this.imageURL + img;
        }
        return imgPath;
    }

    getAllResaurants(){
        this.ms1Service.getAll().subscribe((data)=>{
            if (!data.error && data.message != null && data.message.length > 0) {
                let kitchens = data.message;
                for (var i = 0; i < this.orders.length; i++) {
                    let indx = kitchens.findIndex((mn)=>{
                        return mn['_id'] == this.orders[i]['restaurantid'];
                    })

                    if (indx > -1 && kitchens[indx]['image'].length > 0) {
                        this.orders[i]['resImage'] = kitchens[indx]['image'][0];
                        this.orders[i]['resName'] = kitchens[indx]['restaurantname'];
                    }else{
                        this.orders[i]['resImage'] = null;
                    }
                }
            }
        })
    }

    getOrders(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        if (this.currentCustomer) {
            this.ms4Service.getCustomerOrders(this.currentCustomer._id).subscribe((data)=>{
                loading.dismiss();

                if (!data.error) {
                    this.orders = data.message;
                    this.getAllResaurants();
                }else{
                    let toast = this.toastCtrl.create({
                        message: 'Unable to load Data. Please try later!',
                        duration: 3000,
                        position:'top' //top,middle,bottom
                    });
                    toast.present();
                }
            },
            (err)=>{
                loading.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Unable to load Data. Please check your Internet connection.',
                    duration: 3000,
                    position:'top' //top,middle,bottom
                });
                toast.present();

            })
        }else{
            loading.dismiss();
        }
    }

    showDetail(order){
        this.navCtrl.push(OrderDetailPage,{
            'item' : order
        })
    }

}
