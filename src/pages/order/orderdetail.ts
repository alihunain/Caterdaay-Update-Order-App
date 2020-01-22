import { Component } from '@angular/core';
import { Events, NavController, NavParams, ToastController, AlertController, LoadingController, ModalController } from 'ionic-angular';

import { MS1Service, MS4Service } from '../../app/service/index';

import * as globalVariable from "../../app/global";

import { CartPage } from '../cart/cart';

import { GiveReviewPage } from '../review/give-review';
import moment from 'moment';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/
import 'rxjs/add/operator/map';

import firebase from 'firebase';

import { DatePipe } from '@angular/common';

declare var google: any;

@Component({
    selector: 'page-orderdetail',
    templateUrl: 'orderdetail.html',
})
export class OrderDetailPage {
    fromNoti: any;
    displayPkg : any;
    loading : any;

    resId : any;
    stage : number;

    selectedOrder : any = {};
    /*tempSelectedOrder : any = {};*/
    kitchen : any;
    kitchenOwner : any;
    driver : any;
    
    rating : any;
    avgRating : any;
    taxAmmount : any;
    imageURL : string = globalVariable.imageUrl;

    firestore = firebase.database().ref('/orders');

    datesArray = [];

    firebaseOrders = [];

    constructor(
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public ms1Service: MS1Service,
        public ms4Service: MS4Service,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public events: Events,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public afd: AngularFireDatabase
        ) {

        /*this.tempSelectedOrder = navParams.get('item');*/
        this.selectedOrder = navParams.get('item');
        if(this.selectedOrder.deliveryCharges && this.selectedOrder.ordertype == 'pick'){
            delete this.selectedOrder['deliveryCharges'];
        }
        this.getPreviousRating('onload');
        console.log("this is called");
        this.getTaxAmmount();

        // this.getStage();

        if (typeof this.selectedOrder['driverDetail'] != 'undefined') {
            this.getDriver(this.selectedOrder['driverDetail']['_id'])
        }

        /*if (this.selectedOrder.package && this.selectedOrder.package.length > 0) {
            this.minDate(this.selectedOrder.package);
        }*/
        this.resId = this.selectedOrder['restaurantid'];

        this.getKitchen();
    }

    getPreviousRating(type){

        var obj = {"orderId": this.selectedOrder._id,"customerId" : this.selectedOrder['customerid']};
        this.ms4Service.checkRestroRating(obj).subscribe((presetRating) => {
            if (!presetRating.error) {
                if(presetRating.message.length > 0){
                    this.rating = presetRating.message[0];
                    this.avgRating = this.rating['average'];


                    if (type == 'whenrated') {
                        this.changeFirebaseOrderStatus('rated','any');
                    }
                }
            }
        },(err)=>{
            this.getToast('Unable to load rating. Please check your Internet connection.')
        });
    }

    getTaxAmmount(){
        if (typeof this.selectedOrder['discount'] != 'undefined') {
            this.taxAmmount = (this.selectedOrder['subtotal'] + this.selectedOrder['deliveryCharges'] - this.selectedOrder['discount'])*(this.selectedOrder['tax']/100);
        }else{
            console.log("i am here");
            if( this.selectedOrder['deliveryCharges']){
            this.taxAmmount = (this.selectedOrder['subtotal'] + this.selectedOrder['deliveryCharges']) * (this.selectedOrder['tax']/100);
            console.log(this.taxAmmount,(this.selectedOrder['subtotal'] + this.selectedOrder['deliveryCharges']),this.selectedOrder['deliveryCharges'])
            }else{
                this.taxAmmount = (this.selectedOrder['subtotal']) * (this.selectedOrder['tax']/100);   
            }
        }
    }

    getStage(orderStatus){
        //   let orderStatus = this.order.status;
   
           if (orderStatus == 'received') {
               this.stage = 1
               return 1 ;
           }
           if (orderStatus == 'accepted') {
               this.stage = 2
               return 2 ;
           }
           if (orderStatus == 'completed' || orderStatus == 'driverrejected') {
               this.stage = 3
               return 3 ;
           }
           if (orderStatus == 'driveraccepted') {
               this.stage = 4
               return 4 ;
           }
           if(orderStatus == 'OnTheWayForFirstWeek'){
             return 5;
           }
           
           if(orderStatus == 'deliveryForFirstWeek'){
             return 6 ;
           }
           if(orderStatus == 'ontheway'){
             return 7 ;
           }
                 if (orderStatus == 'delivered') {
                     this.stage = 8
                     return 8 ;
                 }
       } 
    presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'top' //top,middle,bottom
        });
        toast.present();
      }
      completeStatus() {

        let prompt = this.alertCtrl.create({
          message: 'Confirm Items Received?',
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
              }
            },
            {
              text: 'Confirm',
              handler: data => {
                this.selectedOrder['status'] = 'delivered';
                var obj = {
                  id: this.selectedOrder['_id'],
                  menuStatus: true,
                  status:'delivered'
                }
    
                /*if (this.orderDetail['package'].length == 0) {
                  obj['status'] = 'delivered';
                }*/
                this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
                  if (!data.error) {
                  //  this.getOrder();
                    // this.getStage();
                    this.changeFirebaseOrderStatus('delivered','pick');
    
                    this.presentToast('You have Received !');
                  }
                });
              }
            }
          ]
        });
        prompt.present();
      }

      getDateForDaily(date){
        if(date){
         let Dailydate =    date.split(" ");
            if(Dailydate.length > 0 ){
              return   Dailydate[0]
            }
        }
    }
    getTimeForDaily(date){
        if(date){
            let Dailydate =    date.split(" ");
               if(Dailydate.length > 2 ){
                  return  Dailydate[1] +' '+Dailydate[2] 
               }else{
                return this.tConvert(Dailydate[1]);
               }
           }
    }
    tConvert (time) {
      // Check correct time format and split into components
      let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'PM' : 'AM';
    
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
  
    return (`${hour}:${min} ${part}`)
    }

    getMyDay(number){
      if(number == ''){
        return ''
      }
      if(number == 1 ){
        return 'Monday'
      }else if (number == 2){
        return 'Tuesday'
      }else if (number == 3  ){
        return 'Wednesday'
      }else if (number == 4){
        return 'Thursday'
      }else if (number == 5){
        return 'Friday'
      }else if (number == 6){
        return 'Saturday'
      }else if (number == 0){
        return 'Sunday'
      }
    }
    getTime(time){
      return moment(time,'hh:mm').format('LT');
    }

    changeStatus(status, id) {
        console.log("status change");
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
    
        var obj = {
          id: id,
          status: status
        }
      
        if (this.selectedOrder['items'].length == 0 && this.selectedOrder['combo'].length == 0 ) {
          obj['menuStatus'] = true;
        }
    
        this.ms4Service.getCustomerOrders(id).subscribe((order) => {
    
          if (!order.error) {
            //this.selectedOrder = order.message;
   
              this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
                loading.dismiss();
                if (!data.error) {
    
             //   this.getOrder();
            //  this.getStage();
                    this.selectedOrder.ordertype = 'driveraccepted';
                  if (status == 'driveraccepted') {
                    this.presentToast('You are on the way')
                  }
                  this.changeFirebaseOrderStatus(status,'pick');
                  if (typeof this.fromNoti == 'undefined' || this.fromNoti != 'noti') {
                    //this.navCtrl.pop();
                  }
                }else {
                  this.presentToast('Unable to update. Please try again!');
                }
              },(err)=>{
                this.presentToast('Unable to Update status. Please check your Internet connection!');
              });
            
          } else {
            loading.dismiss();
            this.presentToast('Unable to fetch data. Please try again!');
          }
        },(err)=>{
          this.presentToast('Unable to Update status. Please check your Internet connection!');
        })
      }
    getPkgStatus(detail){
        let date = new Date(detail.date);

        let currentDate = new Date();
        let dateDate = currentDate.getMonth()+1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

        if (detail.date == dateDate) {
            if (detail.status) {
                return 0;
            }else{
                return 1;
            }
        }else{
            var dateTime = date.getTime();
            var  currentDateTime = currentDate.getTime();

            let dayDiff : any;

            if (currentDateTime > dateTime) {
                if (detail.status) {
                    return 0;
                }else{
                    return 3;
                }
            }else{
                return 2;
            }
        }
    }

    getDriver(id){
        this.ms1Service.getDriver(id).subscribe((data)=>{
            if (!data.error && data.message != null && data.message != '') {
                this.driver = data.message;
                if (this.selectedOrder['status'] != 'delivered') {
                    if (typeof this.driver['lat'] != 'undefined' && this.driver['lat'] != null && typeof this.selectedOrder['fulladdress'].lat != 'undefined' && this.selectedOrder['fulladdress'].lat != '') {
                        setTimeout(()=>{
                            this.loadMap();
                        },1000)
                    }
                }
            }
        },(err)=>{
            this.getToast('Unable to load driver detail. Please check your Internet connection.')
        })
    }

    getKitchen(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        this.ms1Service.getOne(this.resId).subscribe((data)=>{

            if (!data.error && data.message != null && data.message != '') {
                this.kitchen = data.message;

                this.getKitchenOwner(data.message['ownerId']);
                loading.dismiss();
            }else{
                loading.dismiss();
                this.getToast('Unable to load Kitchen Detail!');
            }
        })
    }

    getKitchenOwner(id){
        this.ms1Service.getOneOwner(id).subscribe((data)=>{
            if (!data.error) {
                this.kitchenOwner = data.message;
            }
        })
    }

    checkRatingPresent(){
        if (typeof this.rating == 'undefined') {
            return true;
        }else{
            return false;
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

    minDate(pkg){
        /* datee = m/d/yyyy*/
        /* newDate = yyyy-m-dd*/

        /*for (var i = 0; i < pkg.length; i++) {
            let startdate = pkg[i].dayandmenus[0].date.split('/');
            let enddate = pkg[i].dayandmenus[pkg[i].dayandmenus.length-1].date.split('/');
            startdate[0] = startdate[0].length > 1 ? startdate[0] : '0' + startdate[0];
            startdate[1] = startdate[1].length > 1 ? startdate[1] : '0' + startdate[1];
            enddate[0] = enddate[0].length > 1 ? enddate[0] : '0' + enddate[0];
            enddate[1] = enddate[1].length > 1 ? enddate[1] : '0' + enddate[1];
            let newStartDate = startdate[2] + '-' +  startdate[0] + '-' + startdate[1];
            let newEndDate = enddate[2] + '-' +  enddate[0] + '-' + enddate[1];

            let obj = {'start' : newStartDate.toString(), 'end' : newEndDate.toString()}

            this.datesArray.push(obj);
        }*/

        let enddate = pkg.split('/');

        enddate[0] = enddate[0].length > 1 ? enddate[0] : '0' + enddate[0];
        enddate[1] = enddate[1].length > 1 ? enddate[1] : '0' + enddate[1];
        let newStartDate = enddate[2] + '-' +  enddate[0] + '-' + enddate[1];

        return newStartDate;
    }

    selectedDate(event,pkg, index){

        /*{month: 12, day: 1, year: 2017}*/

        /*event.day = event.day > 9 ? event.day : '0' + event.day;
        event.month = event.month > 9 ? event.month : '0' + event.month;*/

        let date = event.month + '/' + event.day + '/' + event.year

        let obj =  {'pkgId' : pkg._id,'date': date.toString(), 'index' : index};

        if (typeof this.displayPkg != 'undefined') {
            let indx = this.displayPkg.findIndex(mn=> mn.pkgId == pkg._id && mn.index == index);

            if (indx > -1) {
                this.displayPkg.splice(indx,1);
                this.displayPkg.push(obj)
            }else{
                this.displayPkg.push(obj)
            }
        }else{
            this.displayPkg = [];
            this.displayPkg.push(obj);
        }

        /*event.month = event.month > 9 ? event.month : '0' + event.month;

        let date = event.year + '-' + event.month + '-' + event.day

        let obj =  {'pkgId' : pkg._id,'date': date.toString(), 'index' : index};

        if (typeof this.displayPkg != 'undefined') {
            let indx = this.displayPkg.findIndex(mn=> mn.pkgId == pkg._id && mn.index == index);

            if (indx > -1) {
                this.displayPkg.splice(indx,1);
                this.displayPkg.push(obj)
            }else{
                this.displayPkg.push(obj)
            }
        }else{
            this.displayPkg = [];
            this.displayPkg.push(obj);
        }

        console.log("this.displayPkg");
        console.log(this.displayPkg);*/
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrderPage');
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

    cancelOrder(){
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

        var obj = {
            id: this.selectedOrder._id,
            status: 'cancelled'
        }
        this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
            console.log("data => " , data);
            if (!data.error) {
                this.changeFirebaseOrderStatus('cancelled','any');
                setTimeout(() => {
                    
                    this.loading.dismiss();
                }, 100);
                this.getOrder();
            }
            /*this.navCtrl.pop();*/
        },(err)=>{
            this.getToast('Unable to Cancel order! Please check your Internet connection.');
        });
    }

    changeFirebaseOrderStatus(type,ordertype){

        let itemRef = this.afd.object('orders');
        var count = 0;
        console.log('afd','453');
        itemRef.snapshotChanges().subscribe(action => {

            let arr = action.payload.val();

            let pushArr = [];

            for (var k in arr){
                if (arr.hasOwnProperty(k)) {
                    pushArr.push({'key':k,'orderDetail':arr[k]})
                }
            }
            console.log('465');
            this.firebaseOrders = pushArr;
            console.log('465  FireBAseORder');
        });

        setTimeout(()=>{
            if (this.firebaseOrders && this.firebaseOrders.length > 0) {
                let indx = this.firebaseOrders.findIndex((mn)=> mn.orderDetail['orderID'] == this.selectedOrder['_id'])

                if (indx > -1) {
                    /*if (typeof this.firebaseOrders[indx]['orderDetail'].count == 'undefined' || this.firebaseOrders[indx]['orderDetail'].count == null) {
                        count = 0
                    }else{
                        count = this.firebaseOrders[indx]['orderDetail'].count + 1;
                    }*/
                    console.log('479',this.firebaseOrders[indx]['key']);
                    this.updateFirebaseOrderStatus(this.firebaseOrders[indx]['key'],type,ordertype);
                }
            }
        },5000)
    }

    updateFirebaseOrderStatus(key, type,ordertype){
        let obj = { orderStatus: type}
        if (type == 'driveraccepted'){
            obj['type'] = 'item';
            obj['ordertype'] = 'pick';
            obj['orderID'] = this.selectedOrder._id;
        }
       else if (type == 'delivered') {
            obj['type'] = 'item';
           obj['orderStatus'] = 'delivered';
            obj['ordertype'] = 'pick';
            obj['orderID'] = this.selectedOrder._id;
            obj['restaurantid'] = this.kitchen._id;
        }else if (type == 'rated'){
            obj['type'] = 'rated';
            obj['orderID'] = this.selectedOrder._id;
            obj['restaurantid'] = this.kitchen._id;

        }else{
            obj['type'] = 'item';
            obj['orderID'] = this.selectedOrder._id;
        }
        console.log('afd','500',obj);
        this.afd.list(this.firestore).update(key, obj).then(() => {
            console.log('Order Updated');
        });
    }

    getOrder(){
        this.ms4Service.getOneOrder(this.selectedOrder._id).subscribe((data)=>{
        //    this.loading.dismiss();
            if (!data.error) {

                let customer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
                if (customer != null && typeof this.kitchenOwner != 'undefined') {
                    var obj1 = {customeremail: customer.email, order: data.message, kitchenemail : this.kitchenOwner.email};
                   
                    this.ms1Service.orderCancelMail(obj1).subscribe((data) =>{
                        console.log("data mailsent");
                    });
                }
                this.selectedOrder = data.message;
                // this.getStage();
                this.getTaxAmmount();
            }
        });
    }

    reorder(){
        if (JSON.parse(localStorage.getItem('cartinfo'))) {
            if(JSON.parse(localStorage.getItem('cartinfo'))['items'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['combo'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['package'].length > 0){
                let prompt = this.alertCtrl.create({
                    title : "Delete Cart?",
                    message: "Reordering will remove your current cart items!",
                    buttons: [
                    {
                        text: 'Cancel',
                        handler: data => {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'oK',
                        handler: data => {
                            this.addToCart()
                        }
                    }
                    ]
                });
                prompt.present();
            }else{
                this.addToCart()
            }
        }else{
            this.addToCart()
        }
    }

    calculateSubTotal(){
        let total = 0;
        if (this.selectedOrder.package.length > 0) {
            for (var i = 0; i < this.selectedOrder.package.length; i++) {
                total = this.selectedOrder['subtotal'] - parseFloat(this.selectedOrder.package[i]['packageprice']);
            }
            return total;
        }else{
            total = this.selectedOrder['subtotal'];
            return total;
        }
    }

    addToCart(){
        let total = this.calculateSubTotal();
        let obj = {};
        obj = {"customerid" : this.selectedOrder.customerid, "subtotal": total, "restaurantid": this.selectedOrder.restaurantid, "name": this.selectedOrder.name,"items" : this.selectedOrder.items, "combo" : this.selectedOrder.combo, "package" : []};
        if (typeof this.selectedOrder['currency'] != 'undefined') {
            obj['currency'] = this.selectedOrder['currency']
        }else{
            if (typeof this.kitchen['currency'] != 'undefined') {
                obj['currency'] = this.kitchen['currency'];
            }else{
                obj['currency'] = '';
            }
        }

        localStorage.removeItem('cartinfo');
        localStorage.setItem('cartinfo',JSON.stringify(obj));
        this.events.publish('cart:item',obj,Date.now());
        this.navCtrl.push(CartPage);
    }

    doReview(){
        this.presentProfileModal();
    }

    presentProfileModal() {
        let profileModal = this.modalCtrl.create(GiveReviewPage, {
            kitchenId: this.resId,
            /*rating: this.rating,*/
            order : this.selectedOrder
        });

        profileModal.onDidDismiss(data => {
            this.getPreviousRating('whenrated');
        });
        profileModal.present();
    }
    changeDailyStatus(status,orderid){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loading.present();
          let obj :any = {
            id:orderid,
         
          }
          let deliverdAllPackages = true;
          for(let i =0 ; i < this.selectedOrder.items.length ; i++){
              this.selectedOrder.items[0].orderStatus = status;
          }
          for(let i =0 ; i < this.selectedOrder.package.length ; i++){
            if(this.selectedOrder.package[i].orderStatus == 'delivered'){
      
            }else{
              deliverdAllPackages = false;
              break;
            }
          }
          if(this.selectedOrder.items && this.selectedOrder.items.length > 0 ){
              if(this.selectedOrder.items[0].orderStatus == 'delivered'){
  
              }else{
                  deliverdAllPackages = false;
              }
          }
          if(deliverdAllPackages){
            obj.status = 'delivered';
            console.log("Delivery NOtificaiotn ");
            this.changeFirebaseOrderStatus('delivered','pick');
            this.selectedOrder.status = 'delivered';
          }  
          obj.items = this.selectedOrder.items;
         
          this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
            loading.dismiss();
            if (!data.error) {
            }
        //    this.getOrder();
          });
    }
    changePackageStatus(status,orderid,pkg){
        pkg.orderStatus = status;
        
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
    
        let obj :any = {
          id:orderid,
          package: this.selectedOrder.package
        }
        let deliverdAllPackages = true;
        for(let i =0 ; i < this.selectedOrder.package.length ; i++){
          if(this.selectedOrder.package[i].orderStatus == 'delivered'){
    
          }else{
            deliverdAllPackages = false;
            break;
          }
        }
        if(this.selectedOrder.items && this.selectedOrder.items.length > 0 ){
            if(this.selectedOrder.items[0].orderStatus == 'delivered'){

            }else{
                deliverdAllPackages = false;
            }
        }
        if(deliverdAllPackages){
          obj.status = 'delivered';
          this.changeFirebaseOrderStatus('delivered','pick');
          this.selectedOrder.status = 'delivered';
        }  
        this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
          loading.dismiss();
          if (!data.error) {
          }
          this.ms4Service.getOneOrder(this.selectedOrder._id).subscribe((data)=>{
            //    this.loading.dismiss();
                if (!data.error) {
    
                    let customer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
                    if (customer != null && typeof this.kitchenOwner != 'undefined') {
                        var obj1 = {customeremail: customer.email, order: data.message, kitchenemail : this.kitchenOwner.email};
                       
                        
                    }
                    this.selectedOrder = data.message;
                    // this.getStage();
                    this.getTaxAmmount();
                }
            });
        });
    
    
      }
    checkOnAlter(status,orderid,pkg){
   
    let mealPkg = {};
    let mealPkgDate = pkg['dayandmenus'][0]['date'];

    let date = new Date();

    let today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let today2 = new Date(mealPkgDate);

    if (pkg.status == 'delivered') {
      this.presentToast('Already marked Delivered');
    }else{
      if (today1 >= today2) {
        let title = '';
        let message = '';
        if(status == 'ontheway'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }else if (status == 'OnTheWayForFirstWeek'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }
        else
        {
          title = 'Food Picked ';
          message = 'Have you picked your food?'
        }

        let prompt = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: 'No',
              handler: data => {
              }
            },
            {
              text: 'Yes',
              handler: data => {
                this.changePackageStatus(status, orderid,pkg);
              }
            }
          ]
        });
        prompt.present();




      }else{
        if(status == 'ontheway'){
        this.presentToast(`You Cannot On the way items it is for future dates!`);
        }else{
          this.presentToast(`You Cannot Picked  items it is for future dates!`);  
        }
      }
    }
  }



  checkOnDaily(status,orderid){
    console.log();
    let mealPkg = this.selectedOrder.ordertiming.datetime.split(" ");
    //let mealPkgDate = pkg['dayandmenus'][0]['date'];

    let date = moment(new Date)

   // let today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let today2 = new Date(mealPkg[0]);
   let today3 =  moment(today2)
   let differenceBetweenDays :any = moment.duration(today3.diff(date));
    console.log(date,today2,this.selectedOrder.items[0],differenceBetweenDays);

    if ( this.selectedOrder.items[0].orderStatus == 'delivered'  ) {
      this.presentToast('Already marked Delivered');
    }else{
      if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1) {
        let title = '';
        let message = '';
        if(status == 'ontheway'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }else if (status == 'OnTheWayForFirstWeek'){
          title = 'On The Way';
          message = 'Are you going to pick food from chef?';
        }
        else
        {
          title = 'Food Picked';
          message = 'Have you picked your food ?'
        }

        let prompt = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: 'No',
              handler: data => {
              }
            },
            {
              text: 'Yes',
              handler: data => {
                this.changeDailyStatus(status, orderid);
              }
            }
          ]
        });
        prompt.present();




      }else{
        if(status == 'ontheway'){
        this.presentToast(`You Cannot On the way items it is for future dates!`);
        }else{
          this.presentToast(`You Cannot Picked  items it is for future dates!`);  
        }
      }
    }
  }








    loadMap() {
        let mapOptions= {
            center: new google.maps.LatLng(this.selectedOrder['fulladdress'].lat, this.selectedOrder['fulladdress'].lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(document.getElementById("map"), mapOptions);

        let latLng = new google.maps.LatLng(this.selectedOrder['fulladdress'].lat, this.selectedOrder['fulladdress'].lng);
        let marker = new google.maps.Marker({
            position: latLng,
            title: 'demo',
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            map: map,
            draggable: false,
        });

        /*for (var i = 0; i < this.drivers.length; i++) {*/
        if (typeof this.driver.lat != 'undefined' && typeof this.driver.lng != 'undefined') {        
            var infowindow = new google.maps.InfoWindow();
            let latLng = new google.maps.LatLng(this.driver.lat, this.driver.lng);
            let marker = new google.maps.Marker({
                position: latLng,
                map: map,
                draggable: false,
            });
            infowindow = new google.maps.InfoWindow({
              content: this.driver.firstname
            });
            infowindow.open(map, marker);
        }
        /*}*/
        this.showRoute(map);
    }

    showRoute(map) {
        /*for (let i = 0; i < this.drivers.length; i++) {*/
            let directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
            let directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(map);
            let origin = { location: new google.maps.LatLng(this.selectedOrder['fulladdress'].lat, this.selectedOrder['fulladdress'].lng), stopover: true };
            directionsService.route({
                origin: origin['location'],
                destination: new google.maps.LatLng(this.driver.lat, this.driver.lng),
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Unable to display Route on Map!');
                }
            });

        /*}*/
    }
}
