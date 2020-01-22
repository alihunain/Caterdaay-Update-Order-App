import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { CartPage } from '../cart/cart';

import * as globalVariable from "../../app/global";

import { MS1Service, MS2Service, MS3Service } from '../../app/service/index';

/**
* Generated class for the WishlistPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-wishlist',
    templateUrl: 'wishlist.html',
})
export class WishlistPage {

    imageURL : string = globalVariable.imageUrl;

    kitchenList : any = [];
    allItems : any = [];

    currentCustomer : any;
    wishlistArray : any;

    loading : any;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public ms1Service: MS1Service,
        public ms2Service: MS2Service,
        public ms3Service: MS3Service
        ) {
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        this.getLoader();
        this.getAllKitchen();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WishlistPage');
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

    getLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    getAllKitchen(){
        this.ms1Service.getAll().subscribe((data)=>{
            if (!data.error) {
                let kitchen = data.message.filter((item) => {
                    return item['activestatus'] == true;
                });
                this.kitchenList = kitchen;

                this.getAllItems();
            }
        },(err)=>{
            this.loading.dismiss();
            /*this.getToast('Unable to load data! Please check your Internet connection');*/
        })
    }

    getAllItems(){
        this.ms2Service.getEntireItems().subscribe((data)=>{
            if (!data.error) {
                this.allItems = data.message;

                if (typeof this.currentCustomer.customerfavrestro != 'undefined') {
                    if (this.currentCustomer.customerfavrestro.length > 0) {

                        let wArray = [];

                        wArray = this.currentCustomer.customerfavrestro;

                        /*this.wishlistArray = this.currentCustomer.customerfavrestro;*/

                        for (var i = 0; i < wArray.length; i++) {
                            let indx = this.kitchenList.findIndex((mn)=> mn._id == wArray[i]['id'])
                            if (indx > -1) {
                                wArray[i]['resDetail'] = this.kitchenList[indx];
                            }
                        }

                        for (var j = 0; j < wArray.length; j++) {
                            wArray[j]['itemDetail'] = [];
                            if (wArray[j]['items'].length > 0) {
                                for (var k = 0; k < wArray[j]['items'].length; k++) {
                                    let index = this.allItems.findIndex((mn)=> mn._id == wArray[j]['items'][k]);
                                    if (index > -1) {
                                        wArray[j]['itemDetail'].push(this.allItems[index]);
                                    }
                                }
                            }
                        }
                        setTimeout(()=>{
                            this.setWishlistArray(wArray);
                        },1000);
                    }else{
                        this.loading.dismiss();
                        this.wishlistArray = []; 
                    }
                }else{
                    this.loading.dismiss();
                    this.wishlistArray = []; 
                }
            }
        },(err)=>{
            this.loading.dismiss();
            /*this.getToast('Unable to add Address! Please check your Internet connection');*/
        })
    }


    setWishlistArray(wArray){

        this.wishlistArray = [];

        wArray.forEach((obj)=>{
            if (obj['itemDetail'].length > 0 && typeof obj['resDetail'] != 'undefined' && obj['resDetail'] != null) {
                this.wishlistArray.push(obj);
            }
        });

        this.loading.dismiss();

    }




    cartPage(){
        this.navCtrl.push(CartPage);
    }

    restroImage(img){
        let imgPath : any;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res1.jpg";
        }
        return imgPath;
    }

    itemImage(img){
        let imgPath : any;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res2.jpg";
        }
        return imgPath;
    }

    /*checkFav(id1,id){
        if(typeof this.currentCustomer['customerfavrestro'] == 'undefined'){
            return true;
        }else{
            if (this.currentCustomer['customerfavrestro'].length > 0) {
                let indx = this.currentCustomer['customerfavrestro'].findIndex((mn)=>mn.id == id1);
                if (indx > -1) {
                    let index = this.currentCustomer['customerfavrestro'][indx].items.findIndex((pq)=>pq == id);
                    if (index > -1) {
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }
    }*/

    removeFav(resid, itemid){
        this.getLoader();
        let index = this.currentCustomer['customerfavrestro'].findIndex((mn)=> mn.id == resid);
        this.currentCustomer['customerfavrestro'][index]['items'].splice(this.currentCustomer['customerfavrestro'][index]['items'].indexOf(itemid),1);
        if (this.currentCustomer['customerfavrestro'][index]['items'].length == 0) {
            this.currentCustomer.customerfavrestro.splice(index,1);
        }
        this.updateCustomer();
    }

    updateCustomer(){
        this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data)=>{
            if (!data.error) {
                this.getCustomer(this.currentCustomer._id);
            }
        })
    }

    getCustomer(id){
        this.ms3Service.getOneCustomer(id).subscribe((data)=>{
            if (!data.error) {
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
                this.currentCustomer = data.message;

                this.getAllKitchen();
            }
        })
    }


}
