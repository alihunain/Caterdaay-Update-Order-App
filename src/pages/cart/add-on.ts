import { Component, ViewChild} from '@angular/core';
import { ViewController, NavParams, NavController, ToastController, App } from 'ionic-angular';
import {MS4Service}  from '../../app/service/index';
import * as globalVariable from "../../app/global";
import { CheckoutPage } from './checkout';
import { LoginPage } from '../login/login';

@Component({
  selector: 'add-on',
  templateUrl: './add-on.html'
})
export class AddOn {
    // @ViewChild('content') navCtrl: NavController ;
    imageUrl : any = globalVariable.imageUrl;
    orderDetail:any;
    addOns: any = [];
    addOnTotal  = 0 ;
    kitchen: any;
    deliveryRate: any;
    total:any = 0 ;
    totalWithAddOns = 0 ; 
  constructor(public appCtrl: App,public toastCtrl: ToastController,private viewCtrl: ViewController, private param: NavParams,private MS4Service:MS4Service) {
    this.orderDetail=this.param.get('orderDetail');
    this.kitchen=this.param.get('kitchen');
    this.deliveryRate=this.param.get('deliveryRate');
    console.log(this.orderDetail,'16-addon');
    this.total = this.orderDetail.total;
    this.totalWithAddOns  = this.orderDetail.total;
    this.MS4Service.getAllAddonKitchen(this.orderDetail.restaurantid).subscribe((res)=>{
        console.log(res,'ADD-ONs');
        this.addOns = res.message;
        this.addQuntity();
    })
  }
  addQuntity(){
    for(let i =0 ; i < this.addOns.length ; i++){
        console.log("ADD ON QTY")
        this.addOns[i].qty = 1 ;
    }
  }
  confirm () {
    const confirmed = true;
    this.viewCtrl.dismiss({ confirmed })
  }

  cancel () {
    this.viewCtrl.dismiss();
  }
  changeAddOns(e,addOn,addOns){
    console.log(addOn,addOns);
    addOns.qty  = addOn; 
    this.addcalculation();
}
public addToCart(addOn){
    addOn.add = true ;
    addOn.perItemImpression = addOn.perItemImpression + 1 ;  
    this.MS4Service.addAddonEdit(addOn._id,{
        perItemImpression:addOn.perItemImpression
    } ).subscribe((res)=>{
        console.log(res);
    });
    this.addcalculation();
}
public addcalculation(){
    this.addOnTotal =  0 ;
    for(let i = 0 ; i < this.addOns.length ; i++){
        if(this.addOns[i].add){
            
            this.addOnTotal += parseFloat(this.addOns[i].finalprice) * this.addOns[i].qty;
        //	console.log(this.addOnTotal);
        }
    }
    this.totalWithAddOns = this.total + this.addOnTotal;
    console.log(this.addOnTotal);
}
public removeToCart(addOn){
    addOn.add = false ;
    addOn.perItemImpression = addOn.perItemImpression - 1 ;
    this.MS4Service.addAddonEdit(addOn._id,{
        perItemImpression:addOn.perItemImpression
    } ).subscribe((res)=>{
        console.log(res);
    });
    this.addcalculation();
}
addOnCart(){
    let addOnsItem = [] ;
		let  addOnTotal = this.addOnTotal;
		for(let i = 0 ; i < this.addOns.length ; i++){
			if(this.addOns[i].add){
			addOnsItem.push(this.addOns[i]);
			}
		}
		
		this.orderDetail.addOnItem  = addOnsItem;
		this.orderDetail.addOnTotal = this.addOnTotal;
		if(this.orderDetail.addOnTotal) {
                this.orderDetail.total = this.orderDetail.total + this.orderDetail.addOnTotal;
            }
		// localStorage.setItem('cartinfo', JSON.stringify(this.orderDetail));
		// this.orderDetail = JSON.parse(localStorage.getItem('cartinfo'));
		console.log('DEATIL ORDER ',this.orderDetail);
		// localStorage.setItem('cartinfo', JSON.stringify(this.orderDetail));
			// this.orderDetail = JSON.parse(localStorage.getItem('cartinfo'));
        // this.checkoutOrder();
        

         if (this.orderDetail['customerid'] != '') {
            localStorage.setItem('cartinfo', JSON.stringify(this.orderDetail));
            console.log("Nav is no Provider");
            this.appCtrl.getRootNav().push(CheckoutPage,{
                orderdetails : this.orderDetail,
                kitchen: this.kitchen,
                deliveryRate: this.deliveryRate
            });
            console.log("View Dismiss")
            this.viewCtrl.dismiss();
        }else{
            this.getToast('Login before proceeding to checkout');
            this.appCtrl.getRootNav().push(LoginPage,{
                pop : 'pop'
            });
            this.viewCtrl.dismiss();
        }
}
truck(text){
    if(text.length < 30) {
        return text
    }else{
       return text.slice(0,27).concat("...") ;
    }
}
truckDesc(text){
    if(text.length < 110) {
        return text
    }else{
       return text.slice(0,107).concat("...") ;
    }
}
getToast(msg){
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position:'top' //top,middle,bottom
    });
    toast.present();
}
  getOrderImage(img){
    let imgPath: any;
    if (typeof img == 'undefined' || img == null || img == '') {
        imgPath = "assets/imgs/res1.jpg";
    }else{
        imgPath = this.imageUrl + img;
    }
    return imgPath;
}

}
