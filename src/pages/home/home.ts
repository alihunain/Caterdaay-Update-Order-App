import { Component, ViewChild, AfterViewInit,ElementRef } from '@angular/core';
import { Events, NavController,AlertController, NavParams, LoadingController, ToastController, Slides, MenuController  } from 'ionic-angular';

import { DatePipe } from '@angular/common';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { MyPopOverPage } from './my-pop-over';

import { CartPage } from '../cart/cart';
import { OfferPage } from '../offer/offer';
import { ReviewPage } from '../review/review';
import * as $ from "jquery";
import * as globalVariable from "../../app/global";
import moment from 'moment';
import { MS1Service, MS2Service, MS3Service, MS4Service, MS6Service } from '../../app/service/index';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('pageSlider') pageSlider: Slides;

    public slidesHeight: string | number;
    public slidesMoving: boolean = true;
    // minDate = moment().format('YYYY MM DD');
    // maxDate = moment().add(6, 'M').format('YYYY MM DD');
    minDate = new Date();
    maxDate = new Date();
    EndDate ;
    formatted_date ;  
    disabledDateToday  = new Date(); 
    disabledDateArray=[];
    localDate ;
    CartButton = true;
    slideOpts = {
        initialSlide: 1,
        speed: 400
      };
    weekendRestaurantCount: boolean = false;
    weeklyRestaurantCount: boolean =  false;
    getDayFromDate(date){
       let weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[new Date(date).getDay()];
    }
    disabledDate(){
        for(let i =0 ; i < 250 ; i++){
        
        // console.log(this.disabledDateToday.getDay());
        // console.log(this.disabledDateToday);
        let checkDate  = new Date(this.disabledDateToday);
        // console.log(checkDate,moment(new Date()));
        if( checkDate.getDay() != 6){
      
            console.log(checkDate);
            this.disabledDateArray.push(checkDate);
        
        }else{
            if(!this.localDate){
                this.localDate = new Date(checkDate);
                var x :any = document.getElementById('endDate');
                // x.readOnly = false;
                
                const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                this.EndDate =  new Date(checkDate);

                this.EndDate.setDate( this.disabledDateToday.getDate() + 1);
                 this.formatted_date =  months[this.EndDate.getMonth()] + " " +  this.EndDate.getDate() + ", " + this.EndDate.getFullYear()
                // x.readOnly  = true ;
                }
        }
       
        this.disabledDateToday.setDate( this.disabledDateToday.getDate() + 1);

    }
    console.log(this.disabledDateArray);
    return;
    }
    truck(text){
        if(text.length < 20) {
            return text
        }else{
           return text.slice(0,17).concat("...") ;
        }
    }
    addToCartWeekend(weekend){
        let saturday  = {
            date:moment(this.localDate).format('MM/DD/YYYY'),
            status:false,
            menuids:weekend.dayandmenus[0].menuids
        };
        let sunday  = {
            date:moment(this.formatted_date).format('MM/DD/YYYY'),
            status:false,
            menuids:weekend.dayandmenus[1].menuids
        };
        let tempwmenu = {...weekend};
        tempwmenu.startDate = moment(this.localDate).format('YYYY-MM-DD');
        tempwmenu.endDate = moment(this.formatted_date).format('YYYY-MM-DD');
        tempwmenu.dayandmenus = [] ;
        tempwmenu.dayandmenus.push(saturday);
        tempwmenu.dayandmenus.push(sunday);
        console.log("MealPackage", weekend);

        // this.addToCartWeekend( tempwmenu);
        this.addPackage(tempwmenu, 'weekend');
        console.log(tempwmenu,'First Time');

        // this.removeFlexibleSlides();
        
    }
    itemsRatingIndex: any = [];
    comboRatingIndex: any = [];
    packageRatingIndex: any = [];

    itemsRating: any = [];
    comboRating: any = [];
    packageRating: any = [];



    selectedSegment = '0';
	/*selectedSegment = 'menu';*/
    loading : any;
    kitchenId : any;
    dayAndMenuData : any;
    flexiData : any;

    imageURL : any =  globalVariable.imageUrl;

    kitchen : any = {};
	data : any = [];
	cartItem : any = [];
    menus : any;
    slideMenus : any;
    items : any = [];
    activeitems : any = [];
    cuisines : any = [];
    itemObj : any = {};
	currentCustomer : any;



    orderdetails : any;
    weeklyrestaurants : any;
    monthlyrestaurants : any;
    selectedMealPackage : any;
    availoffer : any;
    availcombo : any;
    reviseFlexi : any;
    checkRevise : boolean = false;

    selectItem : boolean = false;

    currentDate : any;
    pkgEndStartDate : any;
    beginFromDay : any;
    currentDateAfterTenYrs : any;
    dayDif : number;
    flexiTotal = {};
    flexiRepeatTotal = {};

    datesArray : any = [];
    tempDatesArray : any = [];

    event : any = {};


    rateArray : any = [1,2,3,4,5];

    priorDays : number;
    detailpop: boolean = true;
    // ngAfterViewInit(){
    //     console.log("i am here");
    //     $(document).ready(function(){
    //         alert('JQuery is working!!');
    //     });
    // }
	constructor(
        public keyboard: Keyboard,
        public navCtrl: NavController,
        public events: Events,
		public navParams: NavParams,
        /*public popoverCtrl: PopoverController,*/
        public loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public ms1Service: MS1Service,
        public ms2Service: MS2Service,
        public ms4Service: MS4Service,
        public ms3Service: MS3Service,
        public ms6Service: MS6Service,
        public html:ElementRef,
	) {
       
        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        }
        this.maxDate.setMonth(this.minDate.getMonth()+6);
        let maxDateChecker = new Date(this.maxDate);
        let maxDateMonth = this.maxDate.getMonth();
        for(let i = 0 ; i < 31 ; i++){
           maxDateChecker.setDate( maxDateChecker.getDate() + 1);
           if(maxDateMonth  == maxDateChecker.getMonth()){
            
            this.maxDate.setDate( this.maxDate.getDate() + 1);
           }
        }
        this.kitchen = navParams.get('kitchen');
        this.kitchenId = this.kitchen._id;
        console.log(this.kitchenId,"109");
        this.priorDays = this.kitchen['mealpackageallowdays'];

 
        this.refresh(null);
        this.getActiveItems('constructor');

        this.getItemComboPackageRating();

        var time = new Date();
        var time2 = new Date();

        time.setDate(time.getDate()+this.priorDays);
        time2.setDate(time2.getDate()+this.priorDays + 1);
        
        this.currentDate = this.formatTime(time);
        this.pkgEndStartDate = this.formatTime(time2);
        this.disabledDate()
	}
    getDateForWeeklyPackges(date){
        return moment(date).format('LL');
    }
    selectTab(index) {

        this.selectedSegment = index.toString();

        if (index == 0) {
            this.getActiveItems('selectTab');
        }
        if (index == 1) {
            this.getCombos('selectTab');
        }
        if (index == 2) {
            this.getWeekly('selectTab');
        }
        if(this.pageSlider){
        this.pageSlider.slideTo(index);
        }else{
            this.removeFlexibleSlides();  
        }
        this.slidesMoving = true;
    }

    /*public slideDidChange(): void {
        let slideIndex: number = this.pageSlider.getActiveIndex();
        let currentSlide: Element = this.pageSlider._slides[slideIndex];
        this.slidesHeight = currentSlide.clientHeight;

        console.log("this.pageSlider._slides");
        
        setTimeout(()=>{
            this.slidesHeight = this.pageSlider._slides[slideIndex]['clientHeight'];
            console.log(this.pageSlider._slides[slideIndex]['clientHeight']);
            this.slidesMoving = false;
        },2000);
    }*/
    released(){
        console.log(this.detailpop,'released');
        this.detailpop = true;
    }
    detailMeal(){
        console.log(this.detailpop);
        if(this.detailpop == true){
            this.detailpop = false;
        console.log('MealPackage is press long',this.detailpop);
        let alert = this.alertCtrl.create({
            title: 'Meal Plan',
            subTitle: 'Meal plan is only pre-schedule either daily, weekly and monthly. Delivery charges apply. Please refer delivery schedule',
            buttons: ['Cancel']
          });
          
          alert.present();
        }
    }
    detailCombo(){
        if(this.detailpop == true){
        this.detailpop = false
        let alert = this.alertCtrl.create({
            title: 'Combo',
            subTitle: 'If the Chef offered Combo, that can be order same day or pre-schedule for later date. Delivery charges apply',
            buttons: ['Cancel']
          });
          alert.present();
        }
    }
    getCaptitalLetter(letters){
        if(letters == 'saturday'){
            return 'Saturday'
        }else if ( letters == 'sunday'){
            return 'Sunday'
        }
        return letters
    }
    detailMenu(){
        if(this.detailpop == true){
            this.detailpop = false;
        let alert = this.alertCtrl.create({
            title: 'Menu',
            subTitle: 'If the Chef offered individual Menu or items, that can be ordered same day or pre-schedule for later date. Delivery Charges apply',
            buttons: ['Cancel']
          });
          alert.present();
        }
    }
    changeWillSlide(event) {
        this.selectedSegment = event._snapIndex.toString();

        if (event._snapIndex == 0) {
            this.getActiveItems('slideChange');
        }
        if (event._snapIndex == 1) {
            console.log("Event Hits");
            this.getCombos('slideChange');
        }
        if (event._snapIndex == 2) {
            this.getWeekly('slideChange');
        }
    }

    formatTime(time){
        var date = this.addZero(time.getDate());
        var month = this.addZero(time.getMonth()+1);
        var year = time.getFullYear();

        if(typeof this.currentDateAfterTenYrs == 'undefined'){
            this.currentDateAfterTenYrs = year+2+'-'+month+'-'+date;
        }

        return(year+'-'+month+'-'+date);
    }

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    checkFlexiDisable(){
        if (typeof this.event['startDate'] == 'undefined' || typeof this.event['endDate'] == 'undefined') {
            return true;
        }else{
            return false;
        }
    }

    addMenuToFlexiDate(event,item, i){
        if (typeof this.reviseFlexi != 'undefined' && this.reviseFlexi) {
            if (event.value) {
                this.datesArray[i]['menuids'].push(item);
                this.tempDatesArray[i]['menuids'].push(item);
                let indx = i+7
                for (var y = indx; y < this.tempDatesArray.length;)  {
                    if (typeof this.tempDatesArray[y] != 'undefined') {
                        this.tempDatesArray[y]['menuids'].push(item);
                    }
                    y = y+7;
                }
            }else{
                let indx = this.datesArray[i]['menuids'].findIndex((mn)=>mn._id == item._id);
                this.datesArray[i]['menuids'].splice(indx,1);
                this.tempDatesArray[i]['menuids'].splice(indx,1);
                let index = i+7;
                for (var z = index; z < this.tempDatesArray.length;)  {
                    if (typeof this.tempDatesArray[z] != 'undefined') {
                        this.tempDatesArray[z]['menuids'].splice(indx,1);
                    }
                    z = z+7;
                }
            }
        }

        if (typeof this.reviseFlexi == 'undefined' || !this.reviseFlexi){
            if (event.value) {
                this.datesArray[i]['menuids'].push(item);
                this.tempDatesArray[i]['menuids'].push(item);
            }else{
                let indx = this.datesArray[i]['menuids'].findIndex((mn)=>mn._id == item._id);
                this.datesArray[i]['menuids'].splice(indx,1);
                this.tempDatesArray[i]['menuids'].splice(indx,1);
            }
        }

        this.updateFlexiPackagePrice();
    }

    updateFlexiPackagePrice(){
        this.flexiTotal = {};
        this.flexiRepeatTotal = {};

        this.flexiTotal['subTotal'] = 0;
        this.flexiRepeatTotal['subTotal'] = 0;
        for (var i = 0; i < this.datesArray.length; i++) {
            if (this.datesArray[i]['menuids'].length > 0) {
                for (var j = 0; j < this.datesArray[i]['menuids'].length; j++) {
                    this.flexiTotal['subTotal'] = this.flexiTotal['subTotal'] + this.datesArray[i]['menuids'][j]['price'];
                }
            }
        }

        for (var k = 0; k < this.tempDatesArray.length; k++) {
            if (this.tempDatesArray[k]['menuids'].length > 0) {
                for (var l = 0; l < this.tempDatesArray[k]['menuids'].length; l++) {
                    this.flexiRepeatTotal['subTotal'] = this.flexiRepeatTotal['subTotal'] + this.tempDatesArray[k]['menuids'][l]['price'];
                }
            }
        }
    }

    getPrice(total,discount, type){
        let amnt : number;
        if (typeof total != 'undefined' && typeof discount != 'undefined') {
            amnt = total - (total*parseInt(discount)/100);
        }else{
            amnt = total
        }

        if (type == 'noRepeat') {
            this.flexiTotal['total'] = amnt;
        }else{
            this.flexiRepeatTotal['total'] = amnt;
        }
        return amnt;
    }

    checkMaxDate(){
        if (typeof this.event['endDate'] != 'undefined') {
            let date = new Date(this.event['endDate']);
            date.setDate(date.getDate()-1);

            let returnDate = this.formatTime(date);

            return returnDate;
        }else{
            return this.currentDateAfterTenYrs;
        }
    }
    startDateSelected(event,date){
        console.log(event)
       // this.localDate = new Date(checkDate);
    //   var x :any = document.getElementById('endDate');
        // x.readOnly = false;
        
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.EndDate =  new Date(event);

        this.EndDate.setDate( this.EndDate.getDate() + 1);
         this.formatted_date =  months[this.EndDate.getMonth()] + " " +  this.EndDate.getDate() + ", " + this.EndDate.getFullYear()
    }
    dateFunction(type){
        if (typeof this.event['startDate'] != 'undefined') {
            let date = new Date(this.event['startDate']);
            date.setDate(date.getDate()+1);
            this.pkgEndStartDate = this.formatTime(date);
        }

        if (typeof this.event['startDate'] != 'undefined' && typeof this.event['endDate'] != 'undefined') {
            let val1 = this.event['startDate'].split('-');
            let val2 = this.event['endDate'].split('-'); /*YMD*/

            var date1 = new Date(val1[1]+'-'+val1[2]+'-'+val1[0]);
            var date2 = new Date(val2[1]+'-'+val2[2]+'-'+val2[0]);

            var timeDiff = date2.getTime() - date1.getTime();
            let dayDiff : any;
            dayDiff = timeDiff / (1000 * 3600 * 24);

            this.dayDif = parseInt(dayDiff);

            if (this.dayDif >= 7) {
                this.checkRevise = true;
            }else{
                this.checkRevise = false;
                delete this.reviseFlexi;
            }
        }
    }

    formatPkgDate(time){
        var date = time.getDate();
        var month = time.getMonth()+1;
        var year = time.getFullYear();

        return(month+'/'+date+'/'+year);
    }

    selectItemNow(){
        this.selectItem = true;

        this.datesArray = [];
        this.tempDatesArray = [];
        
        var startDate = new Date(this.event['startDate']);
        var endDate = new Date(this.event['endDate']);
        
        while (startDate <= endDate) {
            var dateDay1 = new Date(startDate);
            var dateDay = this.formatPkgDate(dateDay1);
            var dayslist = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            var dayName = dayslist[dateDay1.getDay()];
            var indexs = this.flexiData.dayandmenus.findIndex((indexitem) => {return indexitem.day == dayName});

            if(indexs > -1){
                if (typeof this.reviseFlexi != 'undefined' && this.reviseFlexi && this.datesArray.length < 7) {
                    this.datesArray.push({"date":dateDay, "status": false, "menuids": [], "tempmenuids": this.flexiData.dayandmenus[indexs].menuids});
                }
                if (typeof this.reviseFlexi == 'undefined' || !this.reviseFlexi) {
                    this.datesArray.push({"date":dateDay, "status": false, "menuids": [], "tempmenuids": this.flexiData.dayandmenus[indexs].menuids});
                }
                this.tempDatesArray.push({"date":dateDay, "status": false, "menuids": [], "tempmenuids": this.flexiData.dayandmenus[indexs].menuids});
            }else{
                if (typeof this.reviseFlexi != 'undefined' && this.reviseFlexi && this.datesArray.length < 7) {
                    this.datesArray.push({"date": dateDay, "status": false, "menuids": [], "tempmenuids": []});
                }
                if (typeof this.reviseFlexi == 'undefined' || !this.reviseFlexi) {
                    this.datesArray.push({"date": dateDay, "status": false, "menuids": [], "tempmenuids": []});
                }
                this.tempDatesArray.push({"date": dateDay, "status": false, "menuids": [], "tempmenuids": []});
            }
            startDate.setDate(startDate.getDate() + 1);
        }
    }

    checkReviseFunction(){
        console.log("this.reviseFlexi"); 
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

        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        }
        
        if(localStorage.getItem('cartinfo')){
            if(JSON.parse(localStorage.getItem('cartinfo')).items.length > 0 || JSON.parse(localStorage.getItem('cartinfo')).combo.length > 0 || JSON.parse(localStorage.getItem('cartinfo')).package.length > 0){
                this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));
                this.setorderDetails();
            }else{
                if (typeof this.currentCustomer != 'undefined' && typeof this.currentCustomer['_id'] != 'undefined') {
                    this.orderdetails = {"customerid" : this.currentCustomer['_id'], "subtotal": 0, "restaurantid": "", "name": "","items" : [], "combo" : [], "package" : [], "currency" : ""};
                }else{
                    this.orderdetails = {"customerid" : "", "subtotal": 0, "restaurantid": "", "name": "","items" : [], "combo" : [], "package" : [], "currency" : ""};
                }
            }
        }else{
            if (typeof this.currentCustomer != 'undefined' && typeof this.currentCustomer['_id'] != 'undefined') {
                this.orderdetails = {"customerid" : this.currentCustomer['_id'], "subtotal": 0, "restaurantid": "", "name": "","items" : [], "combo" : [], "package" : [], "currency" : ""};
            }else{
                this.orderdetails = {"customerid" : "", "subtotal": 0, "restaurantid": "", "name": "","items" : [], "combo" : [], "package" : [], "currency" : ""};
            }
        }
               
          this.getCombos('refresh'); 
    }

    showSlides(data){
        this.dayAndMenuData = data;
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }

    removeSlides(){
        delete this.dayAndMenuData;
        /*this.getWeekly();*/
        setTimeout(()=>{
            this.selectTab(2);
            let backButn = document.getElementsByClassName('back-button');
            if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
                for (var i = 0; i < backButn.length; i++) {
                    backButn[i].setAttribute("style", "display:block");
                }
            }
        },1000)
    }

    showFlexibleSlides(data){
        this.flexiData = data;
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }

    removeFlexibleSlides(){
        delete this.flexiData;
        delete this.flexiTotal;
        delete this.flexiRepeatTotal;
        delete this.dayDif;
        delete this.reviseFlexi;
        this.datesArray = [];
        this.event = {};
        this.selectItem = false;
        this.checkRevise = false;

        setTimeout(()=>{
            this.selectTab(1);

            let backButn = document.getElementsByClassName('back-button');
            if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
                for (var i = 0; i < backButn.length; i++) {
                    backButn[i].setAttribute("style", "display:block");
                }
            }
        },500)

        /*this.getWeekly();*/
    }

    cartPage(){
        this.navCtrl.push(CartPage);
    }

    offerPage(){
        this.navCtrl.push(OfferPage,{
            offer : this.availoffer,
            kitchen : this.kitchen
        });
    }

    reviewPage(){
        this.navCtrl.push(ReviewPage,{
            kitchenId : this.kitchenId
        });
    }

    presentPopover(event) {
        this.navCtrl.push(MyPopOverPage,{
           kitchen : this.kitchen, cuisines : this.cuisines 
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

    restroImage(img){
        let imgPath : any;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (typeof img == 'undefined' || img == null) {
            imgPath = "assets/imgs/res1.jpg";
        }
        return imgPath;
    }

    menuImage(img){
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
    truckDesc(desc){
        if(desc.length < 27 ){
            return desc;
        }else{
            return desc.substring(0, 24).concat("...");
        }
    }

    comboImage(img){
        let imgPath : any;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res2.jpg";
        }
        return imgPath;
    }

    doRefresh(refresher) {
        this.refresh(refresher);
        /*setTimeout(() => {
            refresher.complete();
        }, 2000);*/
    }

    refresh(ref){
        /*this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();*/

        this.getKitchen(ref);
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

        console.log("this.kitchen");
            this.getActiveItems('refresh');  
            this.getCombos('refresh');
            this.getWeekly('refresh');
        
        console.log(this.kitchen);
    }
    key(){
        this.keyboard.hide();
    }
    private getKitchen(ref){
        this.ms1Service.getOne(this.kitchenId).subscribe((data)=>{
            if (!data.error) {
                data.message['rating'] = this.kitchen['rating'];
                this.kitchen = data.message;
                this.checkOpenClose();
                /*this.getActiveItems();*/
                this.getcuisines(ref);
            }else{
                this.loading.dismiss();
                this.getToast('Unable to load Kitchen!');
            }
        },(error)=>{
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        })
    }

    private getcuisines(ref){
        this.ms6Service.getAllCuisines().subscribe((data)=>{
            if (!data.error) {
                if (this.kitchen['cuisines'] && this.kitchen['cuisines'].length > 0 ) {
                    this.cuisines = [];
                    for (let index = 0; index < this.kitchen['cuisines'].length; index++) {
                        let indx = data.message.findIndex((mn)=> mn._id == this.kitchen['cuisines'][index])
                        if (indx > -1) {
                            this.cuisines.push(data.message[indx]);
                        }       
                    }
                }
                /*this.getWeekly();*/
                this.getOffers(ref);
            }else{
                this.loading.dismiss();
                this.getToast('Unable to load Cuisines!');
            }
        },(error)=>{

            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }

    private getOffers(ref){
        this.ms2Service.getOffersforRestro(this.kitchenId).subscribe(data => {
            if (!data.error) {
                this.availoffer = [];
                this.availoffer = data.message;
                /*this.getCombos();*/
                /*this.loading.dismiss();*/
                if (ref != null) {
                    ref.complete();
                }
            }else{
                if (ref != null) {
                    ref.complete();
                }
                /*this.loading.dismiss();*/
                this.getToast('Unable to load Data!');
            }
        },(error)=>{
            if (ref != null) {
                ref.complete();
            }
            /*this.loading.dismiss();*/
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }

    private getActiveItems(type){
        if(this.menus && type != 'refresh' ){
            return;
        }
        this.ms2Service.getActiveItems(this.kitchenId).subscribe(data => {

            if (!data.error) {
                this.activeitems = [];
                this.activeitems = data.message;
                this.getMenu();
            }else{
                this.activeitems = [];
                this.loading.dismiss();
                this.getToast('Unable to load Data!');
            }
        },(error)=>{
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }

    private getMenu(){
        this.ms2Service.getAllMenu(this.kitchenId).subscribe((data)=>{

            if (!data.error) {
                let menusItems = data.message;

                this.menus = [];
                menusItems.forEach((menu)=>{
                    var index = this.activeitems.findIndex((item) => { return item.menuId._id == menu._id; });
                    if(index != -1){
                        let indx = this.menus.findIndex((menuId)=>{
                            return menuId._id == menu._id
                        })
                        if (indx == -1) {
                            menu['icon'] = 'arrow-dropdown',
                            menu['showDetails'] = false
                            this.menus.push(menu);
                        }
                    }
                })

               // delete this.availcombo;
              //  delete this.weeklyrestaurants;
                /*this.getcuisines();*/
            }else{
                this.menus = [];
                this.loading.dismiss();
                this.getToast('Unable to load Menu!');
            }
        },(error)=>{
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }

    private getWeekly(type){
        if(this.weeklyrestaurants && type != 'refresh'){
            return;
        }
        this.ms2Service.getActiveMealPackages(this.kitchenId).subscribe((data) => {

            if(!data.error){
                
                this.weeklyrestaurants = this.splicePackage(data.message);
                for(let i = 0 ; i < this.weeklyrestaurants.length ; i++ ){
                    if(this.weeklyrestaurants[i].type == 'flexible'){
                        this.weekendRestaurantCount = true ;
                     
                    }else if (this.weeklyrestaurants[i].type == 'fixed'){
                        this.weeklyRestaurantCount = true ;
                       
                    }


                }
                /*this.getOffers();*/
              //  delete this.activeitems;
          //      delete this.menus;
             //   delete this.availcombo;
            }else{
                this.loading.dismiss();
                this.getToast('Unable to load Data!');
            }
        },(error)=>{
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }

    private splicePackage(data){
        let packages = [];
        console.log(data,'966');
        data.forEach((pkg, index)=>{
            if (pkg.type == 'fixed') {

                let date = new Date();
                let startDate = new Date(pkg['startdate']);
                console.log(date,'NOW DATE');
                console.log(startDate,'THis Prioir dAys', this.priorDays)
                startDate.setDate(startDate.getDate() - 2);
                console.log(startDate,'Start Date ');

                let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                let newStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                console.log(newStartDate , newDate , '975')
                if (newStartDate >= newDate) {
                    pkg.icon = 'arrow-dropdown';
                    pkg.showDetails = false;
                    
                    packages.push(pkg);
                }
            }else{
                pkg.icon = 'arrow-dropdown';
                pkg.showDetails = false;
                packages.push(pkg);
            }
        })
        console.log(packages,"PACKAGES");
        /*setTimeout(()=>{*/
            return packages;
        /*},1500)*/
    }
    GetComboMin(comboId){
       let list = this.orderdetails.combo;
       let min = 0;
       let min2 = this.kitchen.restaurantMin;
       for(let i = 0; i < this.availcombo.length;i++){
           if(this.availcombo[i]._id == comboId){
               min = this.availcombo[i].min;
           }
       }
       let totalcount = 0;
       for(let i = 0; i < list.length;i++){
           if(list[i]._id == comboId){
               min = 1;
           }
           if(this.kitchen._id == list[i].kitchenId){
           totalcount+=list[i].qty;
           min2 = 1;
           }
       
        }
        if(totalcount >= Number(this.kitchen.restaurantMax)){
           return 0;
        }
        let max = Number(this.GetComboMax(comboId));
        if(min > max){
            return 0;
        }
        if(min < Number(min2)){
            return min2;
        }
        return min;

    }
    GetComboMax(comboId){
        let list = this.orderdetails.combo;
        let max = Number(this.kitchen.restaurantMax);
        let maxtwo = -1;
   
        for(let i = 0; i < this.availcombo.length;i++){
            if(this.availcombo[i]._id == comboId){
                maxtwo = this.availcombo[i].max;
            }
        }
        let totalcount = 0;
        for(let i = 0; i < list.length;i++){
            if(list[i]._id == comboId){
                maxtwo-= list[i].qty;
            }
            if(this.kitchen._id == list[i].kitchenId){
            totalcount+=list[i].qty;
            }
         }
         max-=totalcount;
         if(max < 0){
             max = 0;
         }
         if(max > maxtwo){
             return maxtwo;
         }
         return max;
    }
    
    CheckAddToCart(comboId){
        let min = this.GetComboMin(comboId);
        let max = this.GetComboMax(comboId);
        if(min == 0 || max == 0 || min > max){
            let ids = 'button_' + comboId;
            var x = document.getElementById(ids);
        
        }
        this.CartButton = true;
    }
    private getCombos(type){
        if(this.availcombo && type != 'refresh'){
            this.updateCombos();
            console.log("Ohh No!")
            return;
        }
        this.ms2Service.getActiveCombos(this.kitchenId).subscribe(data => {

            if (!data.error) {
         
                this.availcombo = data.message;
                this.updateCombos();
                console.log(this.availcombo,"1016")
                if (this.availcombo.length > 0) {
                    for(let i = 0; i < this.availcombo.length; i++ ){
                       // this.availcombo[i]['showDetails'] = false
                    }
                }
           //     delete this.activeitems;
             //   delete this.menus;
           //     delete this.weeklyrestaurants;
            }else{
                this.loading.dismiss();
                this.getToast('Unable to load Data!');
            }
        },(error)=>{
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }
    public updateCombos(){
        for(let i =0;i < this.availcombo.length;i++){
            let min = Number(this.GetComboMin(this.availcombo[i]._id));
            let max = Number(this.GetComboMax(this.availcombo[i]._id));
            console.log(this.availcombo[i].name + "  min is " + min + "  & max is " + max);
            if(min == 0 || max == 0 || min > max){
                this.availcombo[i].disabled = true;
                this.availcombo[i].Minimum = 1;
                this.availcombo[i].Maximum = 1;
            }else{
                this.availcombo[i].disabled = false;
                this.availcombo[i].Minimum = min;
                this.availcombo[i].Maximum = max;
            }
            
        }
    }
    /*daysFind(sd,ed){

        var date1 = new Date('"'+ sd +'"');
        var date2 = new Date('"'+ ed +'"');
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        return diffDays;
    }*/

    /*checkHide(menu){
        
    }*/

    viewComboDetail(combo){
        if (combo.showDetails) {
            combo.showDetails = false;
        }else{
            combo.showDetails = true;
        }
    }








	/*onSegmentChanged(event){
		this.selectedSegment = event.value;
        if (event.value == 0) {
            this.getActiveItems();
        }
        if (event.value == 1) {
            this.getCombos();
        }
        if (event.value == 2) {
            this.getWeekly();
        }
        this.pageSlider.slideTo(event.value);
        this.slidesMoving = true;
	}*/

	toggleDetails(data) {
        if (data.showDetails) {
            data.showDetails = false;
            data.icon = 'arrow-dropdown';
        }else{
            data.showDetails = true;
            data.icon = 'arrow-dropup';
        }
    }
    toggleDetailsweekend(data){
        if (data.showDetails) {
            data.showDetails = false;
            data.icon = 'arrow-dropdown';
        }else{
            data.showDetails = true;
            data.icon = 'arrow-dropup';
        }
    }

	showItems(){
		console.log("Show Items Clicked");
	}

	decreaseQuantity(id){
        let ids = 'item_' + id;
        var x = document.getElementById(ids);
        var y = parseInt(x.innerHTML);
        var z : Number;
        if (y > 1) {
            z = y - 1;
            let min = this.GetComboMin(id);
            let max = this.GetComboMax(id);
            console.log(min  + " " +  max + "   min & max in Decrement " );
           
            if(!(z >= min && z <= max)){
                if(this.CheckAddToCart(id)){
                    x.innerHTML = (0).toString();
                }
            }
            if(z < min){
                return;
            }
            var p = z.toString()
            x.innerHTML = p;
        }
    }

    increaseQuantity(id){
        let ids = 'item_' + id;
        var x = document.getElementById(ids);
        var y = parseInt(x.innerHTML);
        var z : Number;
        z = y + 1;
        let min = this.GetComboMin(id);
        let max = this.GetComboMax(id);
        
        console.log(min  + " " +  max + "   min & max in Increment " );
       
        if(!(z >= min && z <= max)){
            if(this.CheckAddToCart(id)){
                x.innerHTML = (0).toString();
            }
        }
        if(z > max){
            return;
        }
        var p = z.toString();
        x.innerHTML = p;
    }

    addToCart(item, type){
        if(type == 'mealpackage'){

            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();

            for (var i = 0; i < item['dayandmenus'].length; i++) {
                item['dayandmenus'][i]['status'] = false;
            }
            let backButn = document.getElementsByClassName('back-button');
            if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
                for (var i = 0; i < backButn.length; i++) {
                    backButn[i].setAttribute("style", "display:block");
                }
            }
            this.addPackage(item, type);
        }

        if(type == 'combo' || type == 'menu'){
            this.addItemOrderDetail(item,type);
        }
    }

    addFlexiMealPkg(wmenu,index){
        // if (typeof this.reviseFlexi != 'undefined' && this.reviseFlexi) {
        //     this.flexiData['packageprice'] = this.flexiRepeatTotal['total'];
        // }

        // if (typeof this.reviseFlexi == 'undefined' || !this.reviseFlexi){
        //     this.flexiData['packageprice'] = this.flexiTotal['total'];
        // }

        // this.updateArr(this.tempDatesArray,(data)=>{
        //     this.flexiData['dayandmenus'] = data;
        // })

        // let backButn = document.getElementsByClassName('back-button');
        // if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
        //     for (var i = 0; i < backButn.length; i++) {
        //         backButn[i].setAttribute("style", "display:block");
        //     }
        // }
        // this.addPackage(this.flexiData, 'flexi');

        let countMenuId = 0;
        for (let i = 0; i < wmenu['dayandmenus'].length; i++) {
            /*if (wmenu['dayandmenus'][i]['menuids'].length) {*/
                countMenuId += wmenu['dayandmenus'][i]['menuids'].length;

                if (countMenuId > 0) {
                    if(this.orderdetails['restaurantid'] != '' && this.kitchen._id != this.orderdetails['restaurantid']) {
                        if(confirm('Remove previously added Items from another Chef?')){
                            localStorage.removeItem('cartinfo');
                            this.orderdetails = {"customerid" : "", "total": 0, "restaurantid": "", "name": "", "items" : [], "combo" : [], "package" : [], "ordertiming" : {"type" : ""}, "note": "", "coupon":"", "tax": "", "discount": "", "subtotal": ""};
                            this.orderdetails.deliveryCharges = this.kitchen.deliveryCharges;
                            this.addPackage(wmenu, 'flexi');
                            break;
                        }
                    }else{
                        for(let ii =0 ; ii < this.weeklyrestaurants[i].length ; ii++){

                        }
                        this.addPackage(wmenu, 'flexi');
                        break;
                    }
                }

                // if(countMenuId == 0 && i == wmenu['dayandmenus'].length-1){
                //     toastr.warning('Unable to add Meal Package. Please select Item for atleast 1 day!');
                // }
            /*}*/
        }






    }

    updateArr(arr,cb){
        let cusArr = []
        
        arr.forEach((item,i)=>{
            if (item['menuids'].length > 0){
                delete item['tempmenuids'];
                cusArr.push(item);
            }
        });
        cb(cusArr);
    }

    addSameResCombo(itemToAdd, x){
        if(this.orderdetails.combo.length == 0){
            itemToAdd.qty = parseInt(x.innerHTML);
            let ele = this.html.nativeElement.querySelector('#inst' + itemToAdd._id);
            // console.log(document.getElementById('inst'+itemToAdd._id).value);
         console.log(this.kitchen," 1349")
            if(ele != undefined && ele!=null ){
        
                itemToAdd["instructions"] = ele.value;
            } else{
                itemToAdd["instructions"] = "";
            }


        
            this.orderdetails.combo.push(itemToAdd);
            this.orderdetails.DeliveryCharges = this.kitchen.DeliveryCharges;
            x.innerHTML = 1;
            this.setorderDetails();
            this.events.publish('cart:item',this.orderdetails,Date.now());
        }else{
            var index1 = this.orderdetails.combo.findIndex(itemget => { return itemget._id == itemToAdd._id});
            if(index1 != -1){
                let ele = this.html.nativeElement.querySelector('#inst' + this.orderdetails.combo[index1]._id);
                if(ele != undefined && ele != null){
                 
                    this.orderdetails.combo[index1].instructions = ele.value;
                }
                this.orderdetails.combo[index1].qty += parseInt(x.innerHTML);
                x.innerHTML = 1;
                this.setorderDetails();
                this.events.publish('cart:item',this.orderdetails,Date.now());
            }else{
                itemToAdd.qty = parseInt(x.innerHTML);
                this.orderdetails.combo.push(itemToAdd);
                this.orderdetails.DeliveryCharges = this.kitchen.DeliveryCharges;
                x.innerHTML = 1;
                this.setorderDetails();
                this.events.publish('cart:item',this.orderdetails,Date.now());
            }
        }
        
        this.updateCombos();
    }

    addPackage(pkg, type){
        let kitchenName = this.kitchen.restaurantname;
        if(this.orderdetails.restaurantid == '' || this.orderdetails.restaurantid == pkg.kitchenId){
            this.orderdetails.restaurantid = pkg.kitchenId;
            if (typeof this.kitchen['currency'] != 'undefined') {
                this.orderdetails.currency = this.kitchen['currency'];
            }
            this.orderdetails.name = kitchenName;
            this.orderdetails.deliveryCharges = this.kitchen.deliveryCharges;
            let indx = this.orderdetails['package'].findIndex((mn)=>{
                return (mn._id == pkg._id && mn.type == 'fixed')
            })

            if (indx > -1) {
                this.orderdetails['package'][indx].qty += 1
            }else{
                pkg['qty'] = 1;
                this.orderdetails['package'].push(pkg);
            }


            this.setorderDetails();
            if(type == 'mealpackage'){
                this.loading.dismiss();
                this.removeSlides();
            } else if (type == 'flexi'){
                console.log("Here ",type);
                    this.selectTab(2);
                    // this.removeFlexibleSlides();
                    let backButn = document.getElementsByClassName('back-button');
                    if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
                        for (var i = 0; i < backButn.length; i++) {
                            backButn[i].setAttribute("style", "display:block");
                        }
                    }
            }
            else{
                this.removeFlexibleSlides();
            }

        }else{
            /*if(this.orderdetails.restaurantid != pkg.kitchenId){*/
                let prompt = this.alertCtrl.create({
                    title : "Delete Cart?",
                    message: "Adding this kitchen item will remove your previously added items!",
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
                            if (typeof this.currentCustomer != 'undefined' && typeof this.currentCustomer['_id'] != 'undefined') {
                                this.orderdetails = {"customerid" : this.currentCustomer['_id'], "subtotal": 0, "restaurantid": pkg.kitchenId, "name": kitchenName, "items" : [], "combo": [], "package": [], "currency" : this.kitchen['currency']};
                            }else{
                                this.orderdetails = {"customerid" : "", "subtotal": 0, "restaurantid": "", "name": "","items" : [], "combo" : [], "package" : [], "currency" : ""};
                            }
                            this.orderdetails['package'].push(pkg);
                            this.setorderDetails();
                            if(type == 'mealpackage'){
                                this.loading.dismiss();
                                this.removeSlides();
                            }else{
                                this.removeFlexibleSlides();
                            }
                        }
                    }
                    ]
                });
                prompt.present();
            /*}*/
        }
    }

    public addItemOrderDetail(item, type){
        let itemToAdd = item;
        let kitchenName = this.kitchen.restaurantname;
        let ids = 'item_' + item._id;
        var x = document.getElementById(ids);
        if(this.orderdetails.restaurantid == ''){
            this.orderdetails.restaurantid = itemToAdd.kitchenId;
            this.orderdetails.name = kitchenName;
            if (typeof this.kitchen['currency'] != 'undefined') {
                this.orderdetails.currency = this.kitchen['currency'];
            }

            if (type == 'menu') {
                this.addSameResItem(itemToAdd, x);
            }

            if (type == 'combo') {
                this.addSameResCombo(itemToAdd, x);
            }

        }else{
            if(this.orderdetails.restaurantid != itemToAdd.kitchenId){
                let prompt = this.alertCtrl.create({
                    title : "Delete Cart?",
                    message: "Adding this kitchen item will remove your previously added items!",
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
                            itemToAdd.qty = parseInt(x.innerHTML);
                            if (typeof this.currentCustomer != 'undefined' && typeof this.currentCustomer['_id'] != 'undefined') {
                                this.orderdetails = { "customerid": this.currentCustomer['_id'], "subtotal": 0, "restaurantid": itemToAdd.kitchenId, "name": kitchenName, "items": [], "combo": [], "package": [], "currency" : this.kitchen['currency']};
                            }else{
                                this.orderdetails = {"customerid" : "", "subtotal": 0, "restaurantid": "", "name": "","items" : [], "combo" : [], "package" : [], "currency" : ""};
                            }

                            if (type == 'menu') {
                                this.orderdetails.items.push(itemToAdd);
                                this.setorderDetails();
                            }

                            if (type == 'combo') {
                                this.orderdetails.combo.push(itemToAdd);
                                this.setorderDetails();
                                    this.updateCombos();
                            }
                        }
                    }
                    ]
                });
                prompt.present();
            }else{
                if (type == 'menu') {
                    this.addSameResItem(itemToAdd, x);
                }

                if (type == 'combo') {
                    this.addSameResCombo(itemToAdd, x);
                }
                this.updateCombos();
            }
        }
   
    }

    addSameResItem(itemToAdd, qty){
        if(this.orderdetails.items.length == 0){
            itemToAdd.qty = parseInt(qty.innerHTML);
            this.orderdetails.items.push(itemToAdd);
            qty.innerHTML = 1;
            this.setorderDetails();
        }else{
            var index1 =  this.orderdetails.items.findIndex(itemget => { return itemget._id == itemToAdd._id});
            if(index1 != -1){
                this.orderdetails.items[index1].qty += parseInt(qty.innerHTML);
                qty.innerHTML = 1;
                this.setorderDetails();
            }else{
                itemToAdd.qty = parseInt(qty.innerHTML);
                this.orderdetails.items.push(itemToAdd);
                qty.innerHTML = 1;
                this.setorderDetails();
            }
        }
    }

    setorderDetails(){
        this.orderdetails['subtotal'] = 0;
        // this.orderdetails['DeliveryCharges'] = this.kitchen.DeliveryCharges;
        let itemdetail =  this.orderdetails['items'];
        if (typeof itemdetail != 'undefined' && itemdetail.length > 0){
            for(let i =0 ; i < itemdetail.length; i++){
                this.orderdetails['subtotal'] =  this.orderdetails['subtotal'] + (itemdetail[i].price * itemdetail[i].qty);
            }
        }

        var combo =  this.orderdetails['combo'];
        if (typeof combo != 'undefined' && combo.length > 0) {
            for(var j =0 ; j < combo.length; j++){
                this.orderdetails['subtotal'] =  Number(this.orderdetails['subtotal']) + (Number(combo[j].finalcomboprice) * Number(combo[j].qty));
            }
        }

        var pkg =  this.orderdetails['package'];
        if (typeof pkg != 'undefined' && pkg.length > 0) {
            for(var k =0 ; k < pkg.length; k++){
                this.orderdetails['subtotal'] =  parseInt(this.orderdetails['subtotal']) + (parseInt(pkg[k].packageprice)* pkg[k]['qty']);
            }
        }

        localStorage.setItem('cartinfo', JSON.stringify(this.orderdetails));
        this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));

        this.events.publish('cart:item',this.orderdetails,Date.now());
    }








    makeFav(id,type){
        if (typeof this.currentCustomer.customerfavrestro != 'undefined') {
            let indx = this.currentCustomer.customerfavrestro.findIndex((mn)=> mn.id == this.kitchenId);

            if (indx == -1) {
                let obj = {'id' : this.kitchenId, 'items' : []}
                obj.items.push(id);
                this.currentCustomer['customerfavrestro'].push(obj);
                this.updateCustomer();
            }else{
                if (type == 'add') {
                    this.currentCustomer.customerfavrestro[indx]['items'].push(id);
                }else{
                    this.currentCustomer.customerfavrestro[indx]['items'].splice(this.currentCustomer.customerfavrestro[indx]['items'].indexOf(id),1);
                    if (this.currentCustomer.customerfavrestro[indx]['items'].length == 0) {
                        this.currentCustomer.customerfavrestro.splice(indx,1);
                    }
                }
                this.updateCustomer();
            }
        }else{
            this.currentCustomer['customerfavrestro'] = [];
            let obj = {'id' : this.kitchenId, 'items' : []}
            obj.items.push(id);
            this.currentCustomer['customerfavrestro'].push(obj);
            this.updateCustomer();
        }
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
            }
        })
    }

    checkIfResFav(){
        if (typeof this.currentCustomer != 'undefined') {
            if(typeof this.currentCustomer.customerfavrestro != 'undefined'){
                if (this.currentCustomer['customerfavrestro'].length > 0) {
                    let indx = this.currentCustomer['customerfavrestro'].findIndex((mn)=>mn.id == this.kitchenId);
                    if (indx > -1) {
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    checkFav(id){
        if (typeof this.currentCustomer == 'undefined') {
            return true;
        }else{
            if(typeof this.currentCustomer.customerfavrestro == 'undefined'){
                return true;
            }else{
                if (this.currentCustomer['customerfavrestro'].length > 0) {
                    let indx = this.currentCustomer['customerfavrestro'].findIndex((mn)=>mn.id == this.kitchenId);
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
        }
    }






    public getItemComboPackageRating(){
        this.ms4Service.getICPRating(this.kitchenId).subscribe((data)=>{

            var items = data.message.items;
            var combo = data.message.combo;
            var pack = data.message.pack;

            this.itemsRatingIndex = items.map(item => item.id);
            this.itemsRating = items;

            this.comboRatingIndex = combo.map(item => item.id);
            this.comboRating = combo;

            this.packageRatingIndex = pack.map(item => item.id);
            this.packageRating = pack;

        });
    }

    /*public ShowItemRatingStar(index){
        var indexobj = this.itemsRating[index];
        var avg = parseFloat(indexobj.average);
        var count = parseInt(indexobj.count);
        var narr = (avg/count).toFixed(1);
        var arr = narr.toString().split(".");   
        var html = "";    
        var newassing = 0;   
        var arr0 = parseInt(arr[0]);
        var arr1 = parseInt(arr[1]);

        for(var i=0; i<arr0;i++){
            newassing += 1;
            html += '<ion-icon color = "danger" name="star" ios="ios-star" md="md-star"></ion-icon>';
        }  

        if(arr1 <= 5 && arr1 > 0){
            newassing += 1;
            html += '<ion-icon name="star-half" ios="ios-star-half" md="md-star-half" color = "danger"></ion-icon>';
        }

        if(arr1 > 5 && arr1 > 0){
            newassing += 1;
            html += '<ion-icon name="star" ios="ios-star" md="md-star" color = "danger"></ion-icon>';
        }

        var leftstar = (5 - newassing);
        for(var k=0; k<leftstar; k++){
            html += '<ion-icon name="star-outline" ios="ios-star-outline" md="md-star-outline"></ion-icon>';
        }

        console.log("html");
        console.log(html);

        return html;
    }*/
}
