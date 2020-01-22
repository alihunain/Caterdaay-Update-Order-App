import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController, ToastController, LoadingController, ModalController } from 'ionic-angular';

import * as globalVariable from "../../app/global";

import { CheckoutPage } from './checkout';

import { LoginPage } from '../login/login';

import { MS1Service, MS2Service, MS6Service } from '../../app/service/index';
import { e } from '@angular/core/src/render3';
import { AddOn } from './add-on';

/**
* Generated class for the CartPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {

    loading : any;
    orderdetails : any;
    currentCustomer : any;
    kitchen : any;
    specialInstruction : any;
    imageURL : string = globalVariable.imageUrl;

    couponCode : any;
    taxAmmount : any;
    coupons : any = [];
    noCode : boolean = true;
    typeCode : boolean = false;
    haveCode : boolean = false;
    deliveryRate :any ;
    minConditionSatisfy : boolean;
    deilveryCharges: any;
    deliveryChargesHide: boolean = false;
    ionViewWillEnter(){
        console.log('works fine');
        }
        
    constructor(
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public ms1Service: MS1Service,
        public ms2Service: MS2Service,
        public ms6Service: MS6Service,
        public alertCtrl: AlertController,
        public events: Events,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public navParams: NavParams
        ) {
            
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }

        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        }

        if (localStorage.getItem('cartinfo')) {
            if(JSON.parse(localStorage.getItem('cartinfo'))['items'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['combo'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['package'].length > 0){
                this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));
                console.log(this.orderdetails,'ORDERDETAILS');
                /*console.log("this.orderdetails");
                console.log(this.orderdetails);*/

                if (this.currentCustomer && this.orderdetails['customerid'] == '') {
                    this.orderdetails['customerid'] = this.currentCustomer['_id'];
                }

                if (typeof this.orderdetails['coupon'] != 'undefined') {
                    this.couponCode = this.orderdetails['coupon']['couponcode'];
                }

                let resId = this.orderdetails['restaurantid'];
                this.getKitchen(resId);
             
            } else{
                this.loading.dismiss();
            }
        }else{
            this.loading.dismiss();
        }
    }

    ionViewDidEnter(){
        console.log("ionViewEnter",this.orderdetails)
        this.recalculateTotal();
        // if(localStorage.getItem('deliveryMethod') == 'pick'){
        //     this.deliveryChargesHide = true;
        // }else{
        //     this.deliveryChargesHide = false;
        // }
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }

        if (localStorage.getItem('cartinfo')) {
            if (localStorage.getItem('Mealdaay_customer')) {
                this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
                this.orderdetails['customerid'] = this.currentCustomer['_id'];
            }
        }else{
            delete this.orderdetails;
        }
    }

    getDeliveryCharges(){
        this.ms6Service.getDeliveryCharges().subscribe((data)=>{
            if (!data.error && data.message.length > 0) {
                // let itemChrg = data.message[0]['itemcharge'];
             
                // if (this.orderdetails['package'].length == 0) {
                //     this.orderdetails['deliveryCharges'] = itemChrg;
                // }else{
                //     // let pkgChrg = this.calculatePackageCharge(data.message[0]['mealpackagecharge']);

                //     // if (this.orderdetails['items'].length == 0 && this.orderdetails['combo'].length == 0) {
                //     //     this.orderdetails['deliveryCharges'] = pkgChrg;
                //     // }else{
                //     //     this.orderdetails['deliveryCharges'] = pkgChrg > itemChrg? pkgChrg : itemChrg;
                //     // }
                //     this.orderdetails['deliveryCharges'] = data.message[0]['mealpackagecharge'];
                // }
                let weekendExist = false; 
                let weeklyExist = false ;
                // this.orderdetails['deliveryCharges'] = this.kitchen.DeliveryCharges ;
                // if(this.orderdetails['deliveryCharges'] == undefined){
                //     this.orderdetails['deliveryCharges'] = 0;
                // }
                console.log(this.orderdetails,'135','OrderDetails');
                this.deliveryRate = data.message[0];
                for(let i =0 ; i < this.orderdetails.package.length ; i++){
                    if(this.orderdetails.package[i].type == "flexible"){
                        weekendExist = true;
                    }else{
                        weeklyExist = true;
                    }
                }
                if(weekendExist){
                    this.orderdetails['deliveryCharges'] += data.message[0].weekend ;
                }
                if(weeklyExist){
                    this.orderdetails['deliveryCharges'] += data.message[0].weekly ;  
                }
                this.deilveryCharges = this.orderdetails['deliveryCharges'];
                this.recalculateTotal();
            }else{
                if (typeof this.orderdetails['deliveryCharges'] == 'undefined') {
                    this.orderdetails['deliveryCharges'] = 0;
                }
                this.deilveryCharges = this.orderdetails['deliveryCharges'];
                this.recalculateTotal();
            }
        }, (err)=>{
            /*this.events.publish('internet:lost','abc');*/
            this.getToast('Something went wrong. Unable to load data!')
            if (typeof this.orderdetails['deliveryCharges'] == 'undefined') {
                this.orderdetails['deliveryCharges'] = 0;
            }
            this.recalculateTotal();
        })
    }

    calculatePackageCharge(amount){
        let totalPkgCharge = 0;
        this.orderdetails['package'].forEach((pkgObj)=>{
            totalPkgCharge = totalPkgCharge + (pkgObj['dayandmenus'].length*amount)
        })
        return totalPkgCharge;
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

    private getKitchen(id){
        this.ms1Service.getOne(id).subscribe((data)=>{
            if (!data.error) {
                this.kitchen = data.message;
                this.checkOpenClose();
                if (typeof this.kitchen['tax'] != 'undefined' && this.kitchen['tax']['status'] == true && this.kitchen['tax']['value'] != '') {
                    this.orderdetails['tax'] = parseFloat(this.kitchen['tax']['value']);
                }else{
                    this.orderdetails['tax'] = 0;
                }
                console.log(this.kitchen.DeliveryCharges);
                this.orderdetails.DeliveryCharges = this.kitchen.DeliveryCharges;
                this.orderdetails.deliveryCharges = this.kitchen.DeliveryCharges;
                if (typeof this.kitchen['currency'] != 'undefined') {
                    if (typeof this.orderdetails['currency'] == 'undefined' || this.orderdetails['currency'] == '') {
                        this.orderdetails['currency'] = this.kitchen['currency'];
                    }
                }else{
                    this.orderdetails['currency'] = '';
                }
                this.recalculateTotal();
                this.loading.dismiss();
                // this.getDeliveryCharges();
            }
        },(err)=>{
            /*this.events.publish('internet:lost','abc');*/
            this.loading.dismiss();
            this.getToast('Something went wrong. Unable to load data!');
        })
    }


    checkOpenClose(){
        var today = new Date();
        var day = today.getDay();
        var daylist = ["sunday", "monday", "tuesday", "wednesday ", "thursday", "friday", "saturday"];
        let todayDay = daylist[day];
        var hour = today.getHours();
        var minute = today.getMinutes();
        var prepand = (hour >= 12) ? " PM " : " AM ";
        hour = (hour >= 12) ? hour - 12 : hour;
        if (hour === 0 && prepand === ' PM ') {
            hour = 12;
            prepand = ' PM';
        }
        if (hour === 0 && prepand === ' AM ') {
            hour = 12;
            prepand = ' AM';
        }
        var ctime = hour + ':' + minute + prepand;

        var element = this.kitchen['openinghours'];
        if (element.length > 0) {
            
            /*let indx = element.findIndex((mn)=>{
               return mn['name'] == todayDay && mn['status'] == false;
            })

            if (indx > -1){
                if(element[indx].times.length > 0) {
                    for (var i = 0; i < element[indx].times.length; i++) {
                        var a = "11/23/2014 " + ctime;
                        var b = "11/23/2014 " + element[indx].times[i].open;
                        var c = "11/23/2014 " + element[indx].times[i].close;
                        var aDate = new Date(a).getTime();
                        var bDate = new Date(b).getTime();
                        var cDate = new Date(c).getTime();
                        if (aDate > bDate && aDate < cDate) {
                            this.kitchen.openclose = 'open';
                            break;
                        } else {
                            this.kitchen.openclose = 'close';
                        }
                    }
                }
            }else {
                this.kitchen.openclose = 'close';
            }*/

            for (const key in element) {
                if (element[key].name == daylist[day]) {
                    if (!element[key].status) {
                        for (const key2 in element[key].times) {
                            var a = "11/23/2014 " + ctime;
                            var b = "11/23/2014 " + element[key].times[key2].open;
                            var c = "11/23/2014 " + element[key].times[key2].close;
                            var aDate = new Date(a).getTime();
                            var bDate = new Date(b).getTime();
                            var cDate = new Date(c).getTime();
                            if (aDate > bDate && aDate < cDate) {
                                this.kitchen.openclose = 'open';
                                break;
                            } else {
                                this.kitchen.openclose = 'close';
                            }
                        }
                    } else {
                        this.kitchen.openclose = 'close';
                    }
                }
            }
        } else {
            this.kitchen.openclose = 'open';
        }
    }

    checkDisable(){
        if (this.minConditionSatisfy) {
            return false;
        }else{
            return true;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CartPage');
    }
	
    checkoutPage(){

        console.log("Calling CheckoutPage",this.orderdetails)
        // if (typeof this.specialInstruction != 'undefined' && this.specialInstruction != '') {
        //     this.orderdetails['note'] = this.specialInstruction;
        // }
        if (this.orderdetails['customerid'] != '' && localStorage.getItem("Mealdaay_customer") != undefined && localStorage.getItem("Mealdaay_customer") != null) {
            
        }else{
            this.getToast('Login before proceeding to checkout');
            this.navCtrl.push(LoginPage,{
                pop : 'pop'
            });
            return;
        }
         
          let OpenAddOnModel = false ;
        //   let checkerPackage =  this.orderdetails.package[0];
        //   for(let i =0 ; i < this.orderdetails.package.length ; i++){
        //     //	console.log(this.orderDetail.package[i].type.toString() == checkerPackage.type.toString())
        //         if(this.orderdetails.package[i].type.toString() != checkerPackage.type.toString()){
        //             OpenAddOnModel = false;
        //             break;
        //         }
            	
                
        //         if(checkerPackage.type.toString() == 'flexible'){
        //             if(!this.orderdetails.package[i].startDate){
        //                 console.log('328');
        //                 OpenAddOnModel = false;
        //                 break;
        //             }
        //             if(this.orderdetails.package[i].startDate.toString() != checkerPackage.startDate.toString()){
        //                 console.log('332');
        //                 OpenAddOnModel = false;
        //                 break;
        //             }
        //         }else{
        //             if(!this.orderdetails.package[i].startdate){
        //                 console.log('337');
        //                 OpenAddOnModel = false;
        //                 break;
        //             }
        //             if(this.orderdetails.package[i].startdate.toString() != checkerPackage.startdate.toString()){
        //                 console.log('342');
        //                 OpenAddOnModel = false;
        //                 break;
        //             }
        //         }
        //     }
            if(OpenAddOnModel){
                console.log("331 Cart Pga");
                const confirmRemovalModal = this.modalCtrl.create(AddOn, {
                    orderDetail:this.orderdetails,
                    kitchen: this.kitchen,
                    deliveryRate: this.deliveryRate
                });
                confirmRemovalModal.present();
            }else{
                console.log("339 Cart Pga");
        if (this.orderdetails['customerid'] != '') {
            
            localStorage.setItem('cartinfo', JSON.stringify(this.orderdetails));
            this.navCtrl.push(CheckoutPage,{
                orderdetails : this.orderdetails,
                kitchen: this.kitchen,
                deliveryRate: this.deliveryRate
            });  
        }else{
            this.getToast('Login before proceeding to checkout');
            this.navCtrl.push(LoginPage,{
                pop : 'pop'
            });
        }
    }
    }

    delete(i,name,type){
        let confirm = this.alertCtrl.create({
            title: 'Delete ' + type,
            message: 'Remove ' + name + ' from Cart?',
            buttons: [
            {
                text: 'Cancel',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },
            {
                text: 'Ok',
                handler: () => {
                    if (type == 'Item') {
                        this.orderdetails.items.splice(i,1)
                        // this.getDeliveryCharges();
                        /*this.recalculateTotal();*/
                    }
                    if (type == 'Combo') {
                        this.orderdetails.combo.splice(i,1);
                        this.ms1Service.UpdateCart(true);
                        console.log("Observe Hit 424");
                         this.getDeliveryCharges();
                        /*this.recalculateTotal();*/
                    }
                    if (type == 'Package') {
                        this.orderdetails.package.splice(i,1)
                        // this.getDeliveryCharges();
                        /*this.recalculateTotal();*/
                    }
                }
            }
            ]
        });
        confirm.present();
      
    }

    decreaseQuantity(index, type){
        if (type == 'item') {
            if (this.orderdetails['items'][index].qty >1) {
                this.orderdetails['items'][index].qty = this.orderdetails['items'][index].qty - 1;

                this.recalculateTotal();
            }
        }

        if (type == 'combo') {
            if (this.orderdetails['combo'][index].qty >1) {
                this.orderdetails['combo'][index].qty = this.orderdetails['combo'][index].qty - 1;
                this.recalculateTotal();
            }
        }

        if (type == 'pkg') {
            if (this.orderdetails['package'][index].qty >1) {
                this.orderdetails['package'][index].qty = this.orderdetails['package'][index].qty - 1;
                this.recalculateTotal();
            }
        }
    }
    
    increaseQuantity(index, type){
        if (type == 'item') {
            this.orderdetails['items'][index].qty = this.orderdetails['items'][index].qty + 1;
            this.recalculateTotal();
        }

        if (type == 'combo') {
            console.log(this.orderdetails['combo'][index].qty ," i am hitting on +1")
            this.orderdetails['combo'][index].qty = this.orderdetails['combo'][index].qty + 1;
            this.recalculateTotal();
        }

        if (type == 'pkg') {
            this.orderdetails['package'][index].qty = this.orderdetails['package'][index].qty + 1;
            this.recalculateTotal();
        }
    }

    recalculateTotal(){

        this.orderdetails.subtotal = 0;

        // let itemdetail =  this.orderdetails.items;
        // if(itemdetail.length > 0){
        //     for(let i =0 ; i < itemdetail.length; i++){
        //         this.orderdetails.subtotal =  this.orderdetails.subtotal + (itemdetail[i].price * itemdetail[i].qty);
        //     }
        // }

        var combo =  this.orderdetails.combo;
        if (combo.length > 0) {
            for(var j =0 ; j < combo.length; j++){
                this.orderdetails.subtotal =  Number(this.orderdetails.subtotal) + (Number(combo[j].finalcomboprice) * Number(combo[j].qty));
            }
        }

        // var pkg =  this.orderdetails.package;
        // if (pkg.length > 0) {
        //     for(var k =0 ; k < pkg.length; k++){
        //         this.orderdetails.subtotal =  parseFloat(this.orderdetails.subtotal) + (parseFloat(pkg[k].packageprice)* pkg[k]['qty']);
        //     }
        // }
        if( (this.orderdetails.items && this.orderdetails.items.length > 0) || (this.orderdetails.combo && this.orderdetails.combo.length > 0) || (this.orderdetails.package && this.orderdetails.package.length > 0)){

            if (typeof this.orderdetails['discount'] != 'undefined') {
            let totalAmt = this.orderdetails['subtotal'] - parseFloat(this.orderdetails['discount']);
            this.taxAmmount = (totalAmt*this.orderdetails['tax'])/100;
            
            this.orderdetails['total'] = (totalAmt + this.taxAmmount + this.orderdetails['DeliveryCharges']).toFixed(2) ;
            console.log('507',this.orderdetails['total']  );
            

        }else{
            
            let totalAmt = this.orderdetails['subtotal'] + this.orderdetails['DeliveryCharges'] ;
            this.taxAmmount = (totalAmt*this.orderdetails['tax'])/100;
            console.log('514',this.orderdetails  );
           
            console.log(this.orderdetails['DeliveryCharges'])
            this.orderdetails['total'] = (totalAmt + this.taxAmmount).toFixed(2) ;
            console.log('516',this.orderdetails  );
        }
    }else{
        this.orderdetails['total'] = 0;
    }

        localStorage.removeItem('cartinfo');
        localStorage.setItem('cartinfo', JSON.stringify(this.orderdetails));

        this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));
        var combo =  this.orderdetails.combo;
        let num = 0;
        if (combo.length > 0) {
            for(var j =0 ; j < combo.length; j++){
               num+=Number(combo[j].qty);
            }
        }
        if ( this.kitchen.restaurantMin != 'undefined') {
            if (num < Number(this.kitchen.restaurantMin)) {
                this.minConditionSatisfy = true;
            }else{
                this.minConditionSatisfy = false;
            }
        }else{
            this.minConditionSatisfy = true;
        }

        setTimeout(()=>{
            this.events.publish('cart:item',this.orderdetails,Date.now());
        },500)
    }

    showField(){
        this.noCode = false;
        this.typeCode = true;
    }

    hideField(){
        this.noCode = true;
        this.typeCode = false;
    }
    
    applyCode(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        var obj = { "couponcode": this.couponCode, "kitchenId": this.orderdetails['restaurantid']};

        this.ms2Service.redeemCoupanCode(obj).subscribe((data) => {

            /*QGISEX97*/

            console.log(data);

            loading.dismiss();

            if(!data.error){
                this.getToast("Coupon Code Applied.");

                let offer = data.message[0];

                this.orderdetails['coupon'] = data.message[0];

                if (offer.type == 'Price') {
                    this.orderdetails['discount'] = parseFloat(offer.percentorpricevalue);
                    this.recalculateTotal();
                    /*this.orderdetails['total'] = this.orderdetails['subtotal'] - this.orderdetails['discount'];*/
                }else{
                    this.orderdetails['discount'] = this.orderdetails['subtotal'] * ((parseFloat(offer.percentorpricevalue))/100);
                    this.recalculateTotal();
                }
                this.typeCode = false;
                this.haveCode = true;
            }else{
                this.getToast(data.message)
                delete this.couponCode;
                /*this.hideField();*/
            }
        });
    }

    removeCode(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        this.noCode = true;
        this.typeCode = false;
        this.haveCode = false;
        delete this.couponCode;

        delete this.orderdetails['discount'];
        delete this.orderdetails['coupon'];

        this.recalculateTotal();

        loading.dismiss();
    }

    getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }

    checkCouponCode(){
        if (typeof this.couponCode == 'undefined' || this.couponCode == null || this.couponCode == '' || this.couponCode[0] == ' ') {
            return true;
        }else{
            return false;
        }
    }


}
