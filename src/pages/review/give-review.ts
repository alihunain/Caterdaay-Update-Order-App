import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CartPage } from '../cart/cart';

import { MS3Service, MS4Service } from '../../app/service/index';

import * as globalVariable from "../../app/global";


@Component({
    selector: 'page-give-review',
    templateUrl: 'give-review.html',
})
export class GiveReviewPage {
    ratingForm: FormGroup;
    rateOrderPacking: any;
    rateDeliveryTime: any;
    rateValueOfMoney: any;
    review: any;

    kitchenId: any;
    order: any;

    constructor(
        public viewCtrl: ViewController,
        private lf: FormBuilder,
        public modalCtrl: ModalController,
        public ms4service: MS4Service,
        public toastCtrl: ToastController,
        public navParams: NavParams
    ) {
        this.kitchenId = navParams.get('kitchenId');
        this.order = navParams.get('order');
        /*let rating = navParams.get('rating');*/

        this.ratingForm = this.lf.group({
            orderId: ['', Validators.required],
            restaurantId: ['', Validators.required],
            customerId: ['', [Validators.required]],
            review: [],
            average: [],
            orderPackagingRating: ['', Validators.required],
            deliveryTimeRating: ['', Validators.required],
            valueOfTimeRating: ['', Validators.required],
            items: [],
            combo: [],
            package: []
        });

        let items = [];
        let combo = [];
        let packagee = [];


        this.order.items.forEach((item) => {
            var objindex = items.indexOf(item._id);
            if(objindex == -1){
                items.push(item._id)
            }
        });


        this.order.combo.forEach((item) => {
            var objindex = combo.indexOf(item._id);
            if(objindex == -1){
                combo.push(item._id)
            }
        });


        this.order.package.forEach((item) => {
            var objindex = packagee.indexOf(item._id);
            if(objindex == -1){
                packagee.push(item._id)
            }
        });

        this.ratingForm.controls['customerId'].setValue(this.order['customerid']);
        this.ratingForm.controls['orderId'].setValue(this.order['_id']);
        this.ratingForm.controls['restaurantId'].setValue(this.kitchenId);


        this.ratingForm.controls['items'].setValue(items);
        this.ratingForm.controls['combo'].setValue(combo);
        this.ratingForm.controls['package'].setValue(packagee);



        /*this.ratingForm.patchValue(this.order);*/


        /*if (typeof rating != 'undefined') {
            if(rating.orderPackagingRating){
                this.rateOrderPacking = rating.orderPackagingRating;
                this.ratingForm.controls['orderPackagingRating'].setValue(this.rateOrderPacking);
            }
            if(rating.deliveryTimeRating){
                this.rateDeliveryTime = rating.deliveryTimeRating;
                this.ratingForm.controls['deliveryTimeRating'].setValue(this.rateDeliveryTime);
            }
            if(rating.valueOfTimeRating){
                this.rateValueOfMoney = rating.valueOfTimeRating;
                this.ratingForm.controls['valueOfTimeRating'].setValue(this.rateValueOfMoney);
            }
            if(rating.review){
                this.review = rating.review;
            }
        }*/
    }

    /*ionViewDidEnter(){
        var obj = {"orderId": this.order._id,"customerId" : this.order['customerid']};
        this.ms4service.checkRestroRating(obj).subscribe((presetRating) => {

            console.log("presetRating => " , presetRating);

            if(presetRating.message.length > 0){
                var data = presetRating.message[0];
                if(data.orderPackagingRating){
                    this.rateOrderPacking = data.orderPackagingRating;
                }
                if(data.deliveryTimeRating){
                    this.rateDeliveryTime = data.deliveryTimeRating;
                }
                if(data.valueOfTimeRating){
                    this.rateValueOfMoney = data.valueOfTimeRating;
                }
                if(data.review){
                    this.review = data.review;
                }
            }
        });
    }*/

    onModelChange(event,type){
        if (type == 'order') {
            this.ratingForm.controls['orderPackagingRating'].setValue(this.rateOrderPacking);
        }

        if (type == 'delivery') {
            this.ratingForm.controls['deliveryTimeRating'].setValue(this.rateDeliveryTime);
        }

        if (type == 'money') {
            this.ratingForm.controls['valueOfTimeRating'].setValue(this.rateValueOfMoney);
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    addReview(){
        if (typeof this.review != 'undefined' && this.review != '') {
            this.ratingForm.controls['review'].setValue(this.review);
        }

        let avg = ((this.rateOrderPacking + this.rateDeliveryTime + this.rateValueOfMoney)/3).toFixed(2);

        this.ratingForm.controls['average'].setValue(parseFloat(avg));

        this.ms4service.add(this.ratingForm.value).subscribe((data)=>{
            if (!data.error) {
                this.getToast("Thanks for rating!");
                this.dismiss();
            }else{
                this.getToast("Unable to add your review! Please Try again.");
            }
        },(err)=>{
            this.getToast('Unable to add Rating! Please check your Internet connection');
        })
    }

    getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }


}