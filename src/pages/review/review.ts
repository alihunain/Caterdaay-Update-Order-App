import { Component } from '@angular/core';
import { Events, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CartPage } from '../cart/cart';

import { MS3Service, MS4Service } from '../../app/service/index';

import * as globalVariable from "../../app/global";

/**
* Generated class for the ReviewPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-review',
	templateUrl: 'review.html',
})
export class ReviewPage {

    currentCustomer : any;
    kitchenId : any;
    customerObj : any;
    reviewRating : any;

    imageURL : any =  globalVariable.url1+ "uploads/";

    rateOrderPacking : any;
    rateDeliveryTime : any;
	rateValueOfMoney : any;

	constructor(
		public navCtrl: NavController,
        public navParams: NavParams,
        public ms4Service: MS4Service,
        public toastCtrl: ToastController,
        public events: Events,
        public ms3service: MS3Service,
		) {
        this.kitchenId = navParams.get('kitchenId');
        this.getReviewRating();
	}

    public getReviewRating(){
        this.ms4Service.getReviewRating(this.kitchenId).subscribe((data) =>{
            if (!data.error) {

                this.reviewRating = data.message;

                if (this.reviewRating['deliveryTimeRating'] == 'NaN') {
                    this.rateDeliveryTime = 0;
                }else{
                    this.rateDeliveryTime = this.reviewRating['deliveryTimeRating']
                }

                if (this.reviewRating['orderPackagingRating'] == 'NaN') {
                    this.rateOrderPacking = 0;
                }else{
                    this.rateOrderPacking = this.reviewRating['orderPackagingRating'];
                }

                if (this.reviewRating['valueOfTimeRating'] == 'NaN') {
                    this.rateValueOfMoney = 0;
                }else{
                    this.rateValueOfMoney = this.reviewRating['valueOfTimeRating']
                }
 
                /*this.reviewRating = data.message;*/
                var temparr = [];
                if (this.reviewRating['review'].length > 0) {
                    this.reviewRating['review'].forEach((item) => {
                        var index = temparr.indexOf(item.customerId);
                        if(index == -1){temparr.push(item.customerId);}
                    });
                }
                var obj = {"ids": temparr};

                this.ms3service.getMultipleCust(obj).subscribe((customers) =>{
                    this.customerObj = customers.message;
                    
                    if (this.reviewRating['review'].length > 0) {
                        this.reviewRating['review'].forEach((item) => {
                            var index = this.customerObj.findIndex((mn)=> item.customerId == mn._id);
                            if(index > -1){item.customerId = this.customerObj[index]}
                        });
                    }
                    /*this.reviewRating = datai;*/

                    console.log("this.customerObj, this.reviewRating");
                    console.log(this.customerObj, this.reviewRating);
                });
            }
        },(error)=>{
            this.getToast('Something went wrong. Unable to load data!')
            /*this.events.publish('internet:lost','abc');*/
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

	ionViewDidEnter() {
		let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:block");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:block");
        }
	}
    
    cartPage(){
        this.navCtrl.push(CartPage)
    }

    customerImage(img){
        let imgPath : any;

        if (img != null) {
            imgPath = this.imageURL + img;
        }else{
            imgPath = "assets/imgs/profile.png";
        }
        return imgPath;
    }
}
