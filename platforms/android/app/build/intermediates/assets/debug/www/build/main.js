webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filter__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_minimize__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_service_filter_service__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { BackgroundMode } from '@ionic-native/background-mode';










let ListPage = class ListPage {
    constructor(navCtrl, navParams, modalCtrl, toastCtrl, loadingCtrl, ms1Service, ms4Service, keyboard, platform, 
        // private backgroundMode: BackgroundMode,
        appMinimize, statusBar, filterService) {
        //   this.platform.ready().then(()=>{
        //       this.statusBar.styleDefault();
        //       this.platform.registerBackButtonAction(()=>{
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.ms1Service = ms1Service;
        this.ms4Service = ms4Service;
        this.keyboard = keyboard;
        this.platform = platform;
        this.appMinimize = appMinimize;
        this.statusBar = statusBar;
        this.filterService = filterService;
        this.count = 0;
        this.rateArray = [1, 2, 3, 4, 5];
        this.filterOutput = false;
        this.imageURL = __WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* imageUrl */];
        this.placeHolder = "Search By Restaurant/Chef";
        //       },1);
        //       this.backgroundMode.on('activate').subscribe((res)=>{
        //         console.log('background activate');
        //         this.appMinimize.minimize();
        //        cordova.plugins.backgroundMode.enable();
        //     });
        //     this.backgroundMode.setDefaults({
        //         title:"mealdayy",
        //         text:"",
        //     });
        //     this.backgroundMode.configure({
        //         title:"mealdayy",
        //         text:"",
        //         silent:true
        //     })
        //     cordova.plugins.backgroundMode.enable();
        //   })
        //   this.platform.pause.subscribe(()=>{
        //   })
        // this.platform.resume.subscribe(res=>{
        //     this.count ++; 
        //     console.log('resume',this.count);
        // })
        // this.platform.registerBackButtonAction(() => {
        //     this.appMinimize.minimize();
        //  });
        // this.statusBar.styleDefault();
        this.statusBar.styleLightContent();
        // this.backgroundMode.enable();
        console.log('constructor', this.count);
        //   this.count = this.count ++ ;
        console.log(this.filterService.filterIsApplied);
        if (this.filterService.filterIsApplied) {
            this.filteringKitchen();
        }
        else {
            console.log('get all kitchen');
            this.getAllKitchen();
        }
    }
    ngOnInit() {
        console.log("ng OnIT");
    }
    clearText(event) {
        this.keyboard.close();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad', this.count);
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }
    ionViewWillEnter() {
        console.log(' ionViewWillEnter', this.count);
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }
    ionViewDidEnter() {
        console.log('ionViewDidEnter', this.count);
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:block");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:block");
        }
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }
    getAllKitchen() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.ms1Service.getAll().subscribe((data) => {
            console.log(data);
            if (!data.error) {
                let countryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
                let kitchen;
                if (typeof this.navParams.get('country') != 'undefined' && this.navParams.get('country') != null) {
                    kitchen = data.message.filter((item) => {
                        return item['activestatus'] && (item['country'] == this.navParams.get('country'));
                    });
                }
                else {
                    if (typeof countryObj != 'undefined' && countryObj != null) {
                        kitchen = data.message.filter((item) => {
                            return item['activestatus'] && (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                            /*return item['activestatus'] &&  (item['country'] == 'pakistan');*/
                        });
                    }
                    else {
                        kitchen = data.message.filter((item) => {
                            return item['activestatus'];
                        });
                    }
                }
                if (kitchen && kitchen.length > 0) {
                    this.kitchenList = kitchen;
                }
                else {
                    this.kitchenList = [];
                    this.kitchenListFilter = [];
                }
                if (typeof this.kitchenList != 'undefined' && this.kitchenList.length > 0) {
                    this.kitchenListFilter = [];
                    this.kitchenListFilter = this.kitchenList;
                    this.getRating();
                    this.checkOpenClose();
                }
                else {
                    this.loading.dismiss();
                }
                /*console.log("this.kitchenList");
                console.log(this.kitchenList);*/
            }
            else {
                this.loading.dismiss();
                this.kitchenList = [];
                this.kitchenListFilter = [];
                this.getToast('Unable to load data!');
            }
        }, (error) => {
            this.loading.dismiss();
            this.getToast('Unable to load data. Please check your Internet connection.');
        });
    }
    getRating() {
        this.ms4Service.getAllRestroRating().subscribe((data) => {
            if (!data.error) {
                if (data.message.length == 0) {
                    this.kitchenList.forEach((kitchen) => {
                        kitchen['rating'] = 0;
                    });
                }
                else {
                    for (var i = 0; i < data.message.length; i++) {
                        let indx = this.kitchenList.findIndex((mn) => mn._id == data.message[i]['_id']);
                        if (indx > -1) {
                            this.kitchenList[indx]['rating'] = data.message[i]['averageQuantity'];
                        }
                    }
                }
            }
            else {
                this.kitchenList.forEach((kitchen) => {
                    kitchen['rating'] = 0;
                });
            }
            setTimeout(() => {
                this.kitchenListFilter = [];
                this.kitchenListFilter = this.kitchenList;
                this.filterKitchen();
                this.loading.dismiss();
            }, 1000);
        }, (err) => {
            this.loading.dismiss();
            if (this.kitchenList.length > 0) {
                this.kitchenList.forEach((kitchen) => {
                    kitchen['rating'] = 0;
                });
            }
            setTimeout(() => {
                this.kitchenListFilter = [];
                this.kitchenListFilter = this.kitchenList;
                this.filterKitchen();
                this.loading.dismiss();
            }, 1000);
        });
    }
    filterKitchen() {
        if (typeof this.filterObj != 'undefined' && typeof this.filterObj['rating'] != 'undefined' && this.filterObj['rating'] >= 0) {
            this.kitchenList = this.kitchenList.filter((mn) => {
                return mn['rating'] >= this.filterObj['rating'];
            });
            this.kitchenListFilter = [];
            this.kitchenListFilter = this.kitchenList;
        }
    }
    doRefresh(refresher) {
        if (this.filterService.filterIsApplied) {
            this.filter('else');
        }
        else {
            this.getAllKitchen();
        }
        setTimeout(() => {
            // if (typeof this.filterObj != 'undefined') {
            //    this.getToast('Applied Filter Removed!');
            //    this.filterService.setFilterObj({});
            //    this.filterService.setisApplied(false);
            //    delete this.filterObj;
            // }
            //  this.getAllKitchen();
            refresher.complete();
        }, 2000);
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    checkOpenClose() {
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
        for (let index = 0; index < this.kitchenList.length; index++) {
            var element = this.kitchenList[index].openinghours;
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
                                this.kitchenList[index].openclose = 'open';
                                break;
                            } else {
                                this.kitchenList[index].openclose = 'close';
                            }
                        }
                    }
                }else {
                    this.kitchenList[index].openclose = 'close';
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
                                    this.kitchenList[index].openclose = 'open';
                                    break;
                                }
                                else {
                                    this.kitchenList[index].openclose = 'close';
                                }
                            }
                        }
                        else {
                            this.kitchenList[index].openclose = 'close';
                        }
                    }
                }
            }
            else {
                this.kitchenList[index].openclose = 'open';
            }
        }
    }
    getItems(ev) {
        let filterFrom = this.kitchenListFilter;
        // Reset items back to all of the items
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.kitchenList = filterFrom.filter((item) => {
                return (item.restaurantname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.kitchenList = this.kitchenListFilter;
        }
    }
    restaurantDetail(kitchen) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], {
            kitchen: kitchen
        });
        // move to restaurant detail page
    }
    filteringKitchen() {
        let filterObjFromService = this.filterService.getFilterObj();
        let countryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
        if (filterObjFromService['country'] == 'undefined') {
            filterObjFromService['country'] = countryObj['country'].toLowerCase();
        }
        let filterKitchens = this.filterService.getFilterKitchen();
        console.log(filterKitchens, ' Filter Kitchen');
        if (filterKitchens.length > 0) {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
            this.filterOutput = true;
            this.filterObj = this.filterService.getFilterObj();
            let kitchen;
            if (typeof this.filterObj['country'] == 'undefined') {
                /*kitchen = data.filterResult.filter((item) => {
                    return item['activestatus'] &&  (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                });*/
                if (typeof countryObj != 'undefined' && countryObj != null) {
                    kitchen = filterKitchens.filter((item) => {
                        return item['activestatus'] && (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                    });
                }
                else {
                    kitchen = filterKitchens.filter((item) => {
                        return item['activestatus'];
                    });
                }
                this.kitchenList = kitchen;
                this.kitchenListFilter = [];
                this.kitchenListFilter = this.kitchenList;
                if (this.kitchenList.length > 0) {
                    this.getRating();
                    this.checkOpenClose();
                }
            }
            else {
                kitchen = filterKitchens.filter((item) => {
                    return item['activestatus'];
                });
                this.kitchenList = kitchen;
                this.kitchenListFilter = [];
                this.kitchenListFilter = this.kitchenList;
                if (this.kitchenList.length > 0) {
                    this.getRating();
                    this.checkOpenClose();
                }
            }
        }
        else {
            this.getToast('No Chef!');
            this.kitchenList = [];
            this.kitchenListFilter = [];
            this.filterObj = this.filterService.getFilterObj();
        }
    }
    filterPage() {
        let countryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
        if (typeof this.filterObj == 'undefined') {
            this.filterObj = {};
            this.filterObj['country'] = countryObj['country'].toLowerCase();
        }
        else {
            if (typeof this.filterObj['country'] == 'undefined') {
                this.filterObj['country'] = countryObj['country'].toLowerCase();
            }
        }
        let modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__filter__["a" /* FilterPage */], {
            filterObj: this.filterObj
        });
        modal.onDidDismiss(data => {
            if (typeof data != 'undefined' && data != null) {
                if (typeof data.filterResult != 'undefined') {
                    this.loading = this.loadingCtrl.create({
                        content: 'Please wait...'
                    });
                    this.loading.present();
                    this.filterOutput = true;
                    this.filterObj = data.filterObj;
                    let kitchen;
                    if (typeof this.filterObj['country'] == 'undefined') {
                        /*kitchen = data.filterResult.filter((item) => {
                            return item['activestatus'] &&  (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                        });*/
                        if (typeof countryObj != 'undefined' && countryObj != null) {
                            kitchen = data.filterResult.filter((item) => {
                                return item['activestatus'] && (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                            });
                        }
                        else {
                            kitchen = data.filterResult.filter((item) => {
                                return item['activestatus'];
                            });
                        }
                        this.kitchenList = kitchen;
                        this.kitchenListFilter = [];
                        this.kitchenListFilter = this.kitchenList;
                        if (this.kitchenList.length > 0) {
                            this.getRating();
                            this.checkOpenClose();
                        }
                    }
                    else {
                        kitchen = data.filterResult.filter((item) => {
                            return item['activestatus'];
                        });
                        this.kitchenList = kitchen;
                        this.kitchenListFilter = [];
                        this.kitchenListFilter = this.kitchenList;
                        if (this.kitchenList.length > 0) {
                            this.getRating();
                            this.checkOpenClose();
                        }
                    }
                }
                else {
                    this.getToast('No Chef!');
                    this.kitchenList = [];
                    this.kitchenListFilter = [];
                    this.filterObj = data.filterObj;
                }
            }
            else {
                this.filterOutput = false;
                delete this.filterObj;
                if (this.filterService.filterIsApplied) {
                    this.filteringKitchen();
                }
                else {
                    this.getAllKitchen();
                }
            }
        });
        modal.present();
    }
    filter(type) {
        let filterObj = {};
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //   loading.present();
        if (type == 'back') {
            /*if (typeof this.oldfilterObj != 'undefined') {
                this.viewCtrl.dismiss(this.oldfilterObj);
            }else{*/
            //         loading.dismiss();
            // this.viewCtrl.dismiss();
            /*}*/
        }
        else {
            // let lat = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lat'));
            // let lng = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lng'));
            // console.log(lat,lng, "long and lat")
            // if (lat != null && lng != null) {
            //     filterObj['lat'] = lat;
            //     filterObj['lng'] = lng;
            // }else{
            //     if ("geolocation" in navigator) {
            //         navigator.geolocation.getCurrentPosition((position) => {
            //            filterObj['lat'] = position.coords.latitude;
            //         filterObj['lng'] = position.coords.longitude;
            //         });
            //     }
            // }
            //        this.filterObj['cuisines'] = this.cuisineArray;
            /*let object4Filter = {}
            for (var i in this.filterObj) {
                object4Filter[i] = this.filterObj[i];
            }

            if (typeof object4Filter['country'] != 'undefined') {
                object4Filter['country'] = object4Filter['country'].toLowerCase();
            }

            if (typeof object4Filter['city'] != 'undefined') {
                object4Filter['city'] = object4Filter['city'].toLowerCase();
            }*/
            //  this.filterService.setFilterObj(filterObj);
            //    this.filterService.setisApplied(true);
            filterObj = this.filterService.getFilterObj();
            console.log("filter Kitchen");
            loading.present();
            this.ms1Service.filterRestaurants(filterObj).subscribe((data) => {
                var obj = {
                    filterObj: this.filterObj
                };
                loading.dismiss();
                console.log("all kithcen by filter 321");
                if (!data.error) {
                    if (data.message != null && data.message.length > 0) {
                        obj['filterResult'] = data.message;
                        this.filterService.setFilterKitchen(obj['filterResult']);
                        this.kitchenList = data.message.filter((item) => {
                            return item['activestatus'];
                        });
                        console.log("all kithcen by filter", this.kitchenList);
                        // this.filterService.setFilterObj(this.filterObj);
                        //  loading.dismiss();
                        //this.viewCtrl.dismiss(obj);
                    }
                    else {
                        //    loading.dismiss();
                        //  this.viewCtrl.dismiss(obj);
                    }
                }
                else {
                    //    loading.dismiss();
                    // //  this.viewCtrl.dismiss(obj);
                }
            }, (error) => {
                loading.dismiss();
                this.getToast('Unable to load data. Please check your Internet connection.');
            });
        }
    }
    restroImage(img) {
        let imgPath;
        if (typeof img == 'undefined' || img == null || img == '') {
            imgPath = "assets/imgs/res1.jpg";
        }
        else {
            imgPath = this.imageURL + img;
        }
        return imgPath;
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
    }
};
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-list',template:/*ion-inline-start:"D:\OrderApp\src\pages\list\list.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>All Restaurants/Chefs</ion-title>\n\n        <ion-icon  padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content has-bouncing="true">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n    <ion-row (click)="filterPage()" class = "topSearchRow">\n\n        <!-- <ion-searchbar disabled="true" id="input" style="caret-color: transparent;" [placeholder]="placeHolder"  (click)="filterPage()"></ion-searchbar> -->\n\n        <!-- <ion-icon *ngIf = "!filterOutput" name="funnel" ios="ios-funnel" md="md-funnel" class="funnelIcon funnelLightGray alignSelfCenter" (click)="filterPage()"></ion-icon> -->\n\n        <!-- <ion-icon *ngIf = "filterOutput" class="alignSelfCenter funnelIcon white" name="funnel"  ios="ios-funnel" md="md-funnel" (click)="filterPage()"></ion-icon> -->\n\n        <ion-col no-padding text-center text-uppercase    style="    padding: 9px;\n\n        color: white;\n\n        font-size: 15px;    ">  <ion-icon ios="ios-search" style="margin-right: 10px;" md="md-search"></ion-icon> <span>Search By Restaurants/Chefs</span></ion-col>\n\n    </ion-row>\n\n\n\n    <ion-list>\n\n        <ng-container *ngIf = "kitchenList && kitchenList.length > 0">\n\n            <!-- <ion-item *ngFor = "let kitchen of kitchenList" (click)="restaurantDetail(kitchen)">\n\n                <ion-row>\n\n                    <ion-col col-3 class = "height70px">\n\n                        <ion-row class="white resStatus" *ngIf = "kitchen.openclose &&  kitchen.openclose == \'close\'"><ion-col no-padding text-center>Close</ion-col></ion-row>\n\n                        <img class="width100 height100" [src]="restroImage(kitchen.image[0])">\n\n                    </ion-col>\n\n\n\n                    <ion-col col-9>\n\n                        <h3 text-capitalize class="colorGray whiteSpaceInitial"><strong> {{kitchen.restaurantname}}</strong></h3>\n\n                        <h4 text-capitalize class="colorLightGray whiteSpaceInitial"><ion-icon name="pin" ios="ios-pin" md="md-pin"></ion-icon>  {{kitchen.city}}, {{kitchen.country}}</h4>\n\n                        <p *ngIf = "kitchen.rating">\n\n                            <span *ngFor = "let rate of rateArray; let i = index; ">\n\n                                <ion-icon *ngIf = "kitchen.rating >= rate" color = "danger" name="star" ios="ios-star" md="md-star"></ion-icon>\n\n                                \n\n                                <ion-icon *ngIf = "kitchen.rating < rate && kitchen.rating > i" color = "danger" name="star-half" ios="ios-star-half" md="md-star-half"></ion-icon>\n\n\n\n                                <ion-icon *ngIf = "kitchen.rating < rate && kitchen.rating <= i" name="star-outline" ios="ios-star-outline" md="md-star-outline"></ion-icon>\n\n                            </span>\n\n                        </p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-item> -->\n\n\n\n\n\n\n\n\n\n            <ion-card *ngFor = "let kitchen of kitchenList" (click)="restaurantDetail(kitchen)">\n\n                <ion-row class="white resStatus" *ngIf = "kitchen.openclose" [ngClass] = "kitchen.openclose == \'close\'? \'themeRedBg\' : \'themeGreenBg\' " >\n\n                    <ion-col no-padding text-center text-uppercase><strong>{{kitchen.openclose}}</strong></ion-col>\n\n                </ion-row>\n\n\n\n                <img style="object-fit:cover" [src]="restroImage(kitchen.image[0])"/>\n\n                <ion-card-content no-padding >\n\n                    <span *ngFor="let offer of kitchen.offerings" class="tag-span">{{offer}}</span>\n\n                    <ion-card-title>\n\n                        {{kitchen.restaurantname}}\n\n                        <span *ngIf = "kitchen.rating" float-right class ="font1-5rem">\n\n                            <ion-icon class = "colorGold" *ngIf = "kitchen.rating > 0" name="star" ios="ios-star" md="md-star"></ion-icon>&nbsp;<span class="colorGray"> {{kitchen.rating | number : \'1.1-1\'}}</span>\n\n                        </span> \n\n                    </ion-card-title>\n\n                    <p text-capitalize><ion-icon name="pin" ios="ios-pin" md="md-pin"></ion-icon> &nbsp;{{kitchen.city}}, {{kitchen.country}}</p>\n\n\n\n                </ion-card-content>\n\n            </ion-card>\n\n        </ng-container>\n\n\n\n        <ng-container *ngIf = "kitchenList && kitchenList.length == 0">\n\n            <ion-item text-center class="paddin40-16px">\n\n                <strong>No Restaurants/Chefs Found!</strong>\n\n            </ion-item>\n\n        </ng-container>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\list\list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_minimize__["a" /* AppMinimize */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_7__app_service_filter_service__["a" /* FilterService */]])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ms1_service__ = __webpack_require__(605);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ms1_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ms2_service__ = __webpack_require__(885);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__ms2_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ms3_service__ = __webpack_require__(886);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__ms3_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ms4_service__ = __webpack_require__(887);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__ms4_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ms6_service__ = __webpack_require__(380);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__ms6_service__["a"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ms6_service__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let LocationService = class LocationService {
    constructor(http, alertCtrl, ms6Service, geolocation, diagnostic, platform) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.ms6Service = ms6Service;
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.platform = platform;
        this.platform = platform;
    }
    getLocation() {
        let location = "";
        console.log("get lcoation ");
        location = localStorage.getItem("currentCountry_Mealday");
        if (location == null || location == "") {
            console.log("get lcoation 312");
            this.subscription = this.geolocation
                .watchPosition()
                .filter(p => p.coords !== undefined) //Filter Out Errors
                .subscribe(position => {
                console.log("get loc subscriber", position);
                if (typeof position["coords"] != "undefined") {
                    console.log("getgeo");
                    this.getgeo(position.coords.latitude, position.coords.longitude);
                    localStorage.setItem("Mealday_currentCustomer_lat", JSON.stringify(position.coords.latitude));
                    localStorage.setItem("Mealday_currentCustomer_lng", JSON.stringify(position.coords.longitude));
                }
            }, err => console.log(err, "watchPosition"));
            console.log("get lcoation");
            /*setTimeout(()=>{
                      this.subscription.unsubscribe();
                  },60000);*/
            //  let options  =  {timeout: 30000, enableHighAccuracy: false, maximumAge: 3600};
            // this.geolocation.getCurrentPosition(options).then(position=>{
            //   console.log("get loc subscriber", position);
            //         if (typeof position["coords"] != "undefined") {
            //           console.log("getgeo");
            //           this.getgeo(position.coords.latitude, position.coords.longitude);
            //           localStorage.setItem(
            //             "Mealday_currentCustomer_lat",
            //             JSON.stringify(position.coords.latitude)
            //           );
            //           localStorage.setItem(
            //             "Mealday_currentCustomer_lng",
            //             JSON.stringify(position.coords.longitude)
            //           );
            //         }
            // }).catch(err=>{
            //   console.log(err, "watchPosition")
            // })
        }
        else {
            this.setonheader();
        }
    }
    successCallback(isAvailable) {
        console.log("sccuessCallBack");
        return new Promise((resolved, reject) => {
            if (!isAvailable) {
                let prompt = this.alertCtrl.create({
                    message: "To detect your current location, Please turn your device location ON.",
                    buttons: [
                        {
                            text: "Cancel",
                            handler: data => {
                                console.log("Cancel clicked");
                                this.platform.exitApp();
                            }
                        },
                        {
                            text: "oK",
                            handler: data => {
                                this.diagnostic.switchToLocationSettings();
                            }
                        }
                    ]
                });
                prompt.present();
                resolved(false);
            }
            else {
                this.diagnostic.requestLocationAuthorization().then(status => {
                    if (status == "GRANTED") {
                        console.log("GRANTED");
                        this.getLocation();
                        resolved(true);
                    }
                    else {
                        let prompt = this.alertCtrl.create({
                            message: "To detect your current location, Please turn your device location ON and authorized the apllication to use location.",
                            buttons: [
                                {
                                    text: "Cancel",
                                    handler: data => {
                                        console.log("Cancel clicked");
                                        this.platform.exitApp();
                                    }
                                },
                                {
                                    text: "oK",
                                    handler: data => {
                                        this.diagnostic.switchToLocationSettings();
                                    }
                                }
                            ]
                        });
                        prompt.present();
                        resolved(false);
                    }
                });
            }
        });
    }
    getlocationPermission() {
        let errorCallback = e => console.error(e);
        return new Promise((resolved, reject) => {
            this.diagnostic
                .isLocationEnabled()
                .then(success => {
                console.log(success);
                this.successCallback(success).then(status => {
                    if (status) {
                        resolved(true);
                    }
                    else {
                        reject();
                    }
                });
            })
                .catch(errorCallback);
        });
    }
    getgeo(lat, long) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, long);
        geocoder.geocode({ latLng: latlng }, (results, status) => {
            console.log("geocoder");
            /*this.subscription.unsubscribe();*/
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    let obj = {};
                    if (results[0].address_components.length > 0) {
                        results[0].address_components.forEach(comp => {
                            if (comp.types.length > 0) {
                                for (var i = 0; i < comp.types.length; i++) {
                                    if (comp.types[0] == "country") {
                                        obj = { countryname: comp.long_name };
                                        console.log(comp.long_name);
                                        this.ms6Service.getIdByCountry(obj).subscribe(item => {
                                            console.log(item);
                                            if (item.message.length > 0) {
                                                var obj1 = {
                                                    country: comp.long_name,
                                                    countryid: item.message[0]._id
                                                };
                                                console.log("currentCOuntry");
                                                localStorage.setItem("currentCountry_Mealday", JSON.stringify(obj1));
                                                if (this.subscription) {
                                                    this.subscription.unsubscribe();
                                                }
                                                return;
                                            }
                                            else {
                                                var obj2 = {
                                                    country: 'canada',
                                                    countryid: "5aab1ae9da02ff5ec535e0095aab1ae9da02ff5ec535e009"
                                                };
                                                localStorage.setItem("currentCountry_Mealday", JSON.stringify(obj2));
                                                if (this.subscription) {
                                                    this.subscription.unsubscribe();
                                                }
                                                return;
                                            }
                                        }, (err => {
                                            console.log(err, 'Error in getting LOCation');
                                        }));
                                    }
                                }
                            }
                        });
                    }
                }
                else {
                    alert("address not found");
                }
            }
            else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }
    setonheader() {
        let cntry = localStorage.getItem("currentCountry_Mealday");
        if (cntry != null) {
            let ctry = JSON.parse(localStorage.getItem("currentCountry_Mealday"));
            if (ctry.countryid == "sdf") {
                var obj = { countryname: ctry.country };
                this.ms6Service.getCountryName().subscribe(data => {
                    obj.countryname = data.country_name;
                    this.ms6Service.getIdByCountry(obj).subscribe(item => {
                        if (!item.error) {
                            if (item.message.length > 0) {
                                var cntry = {
                                    country: item.message[0].countryName,
                                    countryid: item.message[0]._id
                                };
                                localStorage.setItem("currentCountry_Mealday", JSON.stringify(cntry));
                            }
                            else {
                                if ("geolocation" in navigator) {
                                    navigator.geolocation.getCurrentPosition(position => {
                                        this.getgeo(position.coords.latitude, position.coords.longitude);
                                    });
                                }
                            }
                        }
                        else {
                            if ("geolocation" in navigator) {
                                navigator.geolocation.getCurrentPosition(position => {
                                    this.getgeo(position.coords.latitude, position.coords.longitude);
                                });
                            }
                        }
                    });
                });
            }
        }
    }
};
LocationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__ms6_service__["a" /* MS6Service */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */]])
], LocationService);

//# sourceMappingURL=location.service.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__thankupage__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';*/
/**
* Generated class for the CartPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let CheckoutPage = class CheckoutPage {
    constructor(nav, navCtrl, navParams, toastCtrl, loadingCtrl, ms1Service, ms3Service, ms4Service, events, lf, modalCtrl) {
        /*this.ms4Service.getStripeKey().subscribe((data)=>{
            if (!data.error && data.message.length > 0) {
                (<any>window).Stripe.setPublishableKey(data.message[0].keypublishable);
            }
        },(err)=>{
            this.getToast('Online Payment could not be processed now! Please Order for CASH');
        })*/
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.ms1Service = ms1Service;
        this.ms3Service = ms3Service;
        this.ms4Service = ms4Service;
        this.events = events;
        this.lf = lf;
        this.modalCtrl = modalCtrl;
        this.weeklyPackages = false;
        this.weekendPackages = false;
        this.delvierySlots = [];
        this.deliverySlotsForWeekly = [];
        this.delvierySlotsWeekly = [];
        this.deliveryCharges = 0;
        this.deliveryRateDetacted = true;
        this.addOnTotal = 0;
        this.TaxPrices = 0;
        this.dayliyItems = false;
        this.address = '0';
        this.chooseCard = '0';
        this.deliveryType = 'pick';
        this.paymentType = 'cash';
        /*cardType = 'master';*/
        this.year = [];
        this.month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.generatingToken = false;
        this.SubTotal = 0;
        this.orderTime = {};
        this.showLater = false;
        this.event = { laterDay: '', laterTime: '' };
        this.formErrors = {
            'cardnumber': '',
            'cvv': '',
            'state': '',
            'city': '',
            'zip': '',
            'address': ''
        };
        this.validationMessages = {
            'cardnumber': {
                'required': 'Card Number is required.',
                'minlength': 'Card Number must be 16 character long.',
                'maxlength': 'Card Number must be 16 character long.',
                'pattern': 'Card Number should contain numeric in pattern xxxx-xxxx-xxxx-xxxx'
            },
            'cvv': {
                'required': 'CVV is required.',
                'pattern': 'CVV should contain numeric only'
            },
            'state': {
                'required': 'State Name is required.',
                'maxlength': 'State Name must be less than 30 character ',
            },
            'city': {
                'required': 'City Name is required.',
                'maxlength': 'City Name must be less than 30 character ',
            },
            'zip': {
                'required': 'Zip is required.',
                'maxlength': 'Zip  must be less than 9 character ',
            },
            'address': {
                'required': 'Addresss is required.',
                'maxlength': 'Address must be less than 30 character ',
            }
        };
        this.convertTime12to24 = (time12h) => {
            const [time, modifier] = time12h.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') {
                hours = '00';
            }
            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }
            return `${hours}:${minutes}`;
        };
        this.orderdetails = navParams.get('orderdetails');
        localStorage.setItem('deliveryMethod', 'pick');
        if (this.orderdetails.subtotal) {
            this.SubTotal = parseFloat(this.orderdetails.subtotal);
        }
        if (this.orderdetails.addOnTotal) {
            this.addOnTotal = parseFloat(this.orderdetails.addOnTotal);
        }
        this.deliveryRate = navParams.get('deliveryRate');
        console.log(this.orderdetails, '134', this.orderdetails.package.length);
        //	this.orderdetails.total = (parseFloat(this.addOnTotal.toString()) + parseFloat(this.SubTotal.toString())).toFixed(2);
        if (this.orderdetails.tax) {
            this.TaxPrices = (parseFloat(this.orderdetails.total) / 100) * parseFloat(this.orderdetails.tax);
        }
        console.log(parseFloat(this.orderdetails.total));
        // console.log()
        this.orderdetails.total = (parseFloat(this.orderdetails.total) + this.TaxPrices + parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
        this.orderdetails.total = parseFloat(this.orderdetails.total);
        console.log("Total ", this.orderdetails.total, "TAX", this.TaxPrices, "ADDON", this.addOnTotal);
        if (this.orderdetails.items.length > 0) {
            this.dayliyItems = true;
        }
        for (let i = 0; i < this.orderdetails.package.length; i++) {
            console.log(this.orderdetails.package[i].type, 'TYpe');
            if (this.orderdetails.package[i].type == "fixed") {
                this.weeklyPackages = true;
            }
            else if (this.orderdetails.package[i].type == "flexible") {
                this.weekendPackages = true;
            }
        }
        if (this.orderdetails.total == 0) {
            this.orderPayment = 'cash';
        }
        let kitchen = navParams.get('kitchen');
        this.kitchen = kitchen;
        for (let i = 0; i < this.kitchen.deliverySlots.length; i++) {
            if (this.kitchen.deliverySlots[i].state) {
                this.delvierySlots.push(this.kitchen.deliverySlots[i]);
            }
        }
        for (let j = 0; j < this.kitchen.deliverySlotsForWeekly.length; j++) {
            if (this.kitchen.deliverySlotsForWeekly[j].state) {
                this.delvierySlotsWeekly.push(this.kitchen.deliverySlotsForWeekly[j]);
            }
        }
        console.log(this.kitchen, 'Kitchen');
        this.resCountry = kitchen['country'];
        this.proOrderBefore = kitchen['preorderforlaterafterdays'];
        this.proOrderTill = kitchen['preorderforlatertodays'];
        this.resStatus = kitchen.openclose;
        this.orderLaterAllowed = kitchen.preorderforlater;
        if (typeof kitchen.mindeliveryime != 'undefined' && kitchen.mindeliveryime != null && kitchen.mindeliveryime != '' && parseInt(kitchen.mindeliveryime) > 0) {
            this.minTime = parseInt(kitchen.mindeliveryime);
        }
        if (this.resStatus != 'close') {
            this.orderTimeSelect = 'now';
            this.orderTimeFunction();
        }
        /*if (typeof kitchen.currency != 'undefined' && kitchen.currency != null && kitchen.currency != '') {
            this.currency = kitchen.currency;
        }*/
        let patternq = /^[+]?\d+(\.\d+)?$/;
        this.addressForm = this.lf.group({
            phoneno: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(patternq)]],
            landline: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(patternq)]],
            address: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            landmark: [''],
            city: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*')]],
            country: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*')]],
            zipcode: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            _id: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        this.cardForm = this.lf.group({
            cardtype: [],
            // nameoncard: ['',Validators.required],
            /*city : ['',Validators.required],
            postalcode : ['',Validators.required],*/
            fname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            lname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            cardnumber: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(16), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(19), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]{4}[ .\-]{0,1}[0-9]{4}[ .\-]{0,1}[0-9]{4}[ .\-]{0,1}[0-9]{4}')]],
            cvv: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(3), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]{3}')]],
            expirymonth: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            expiryyear: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            zip: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(9)]],
            address: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(29)]],
            city: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(29)]],
            state: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(29)]]
        });
        this.cardCvvForm = this.lf.group({
            cvv: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(3), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]{3}')]]
        });
        let currentDate = new Date();
        let currentYr = currentDate.getFullYear().toString().substr(-2);
        this.currentYr = parseInt(currentYr);
        this.cardForm.controls['expirymonth'].setValue(this.month[0]);
        this.cardForm.controls['expiryyear'].setValue(this.currentYr);
        this.yearArray();
        this.cardCvvForm.valueChanges.subscribe(data => this.onChanged(data));
        this.onChanged();
        this.cardForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
            if (typeof this.currentCustomer['customeraddresses'] != 'undefined' && this.currentCustomer['customeraddresses'].length > 0) {
                let indx = this.currentCustomer['customeraddresses'].findIndex((mn) => mn.default == true);
                if (indx > -1) {
                    this.address = indx;
                }
            }
            if (typeof this.currentCustomer['cardinfo'] != 'undefined' && this.currentCustomer['cardinfo'].length > 0) {
                let indx = this.currentCustomer['cardinfo'].findIndex((mn) => mn.default == true);
                if (indx > -1) {
                    this.chooseCard = indx;
                }
            }
            this.addressForm.controls['_id'].setValue(this.currentCustomer._id);
        }
        this.firstCall();
    }
    ngAfterContentInit() {
        this.deliveryType = 'home';
        this.onChangeDeliveryTye();
    }
    CheckingTimeValidationForFirst(init) {
        let FirstStartTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(this.delvierySlotsWeekSeleted.FirstStartTime), 'hh:mm');
        let FirstEndTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(this.delvierySlotsWeekSeleted.FirstEndTime), 'hh:mm');
        let ActualTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(init.value), 'hh:mm');
        console.log("First START TIME ", FirstStartTime, "FIrst END TIME ", ActualTime, FirstStartTime == ActualTime);
        if ((FirstStartTime.isBefore(ActualTime) || FirstStartTime._i == ActualTime._i) && (ActualTime.isBefore(FirstEndTime) || ActualTime._i == FirstEndTime._i)) {
            console.log("False weekly First");
            this.deliveryWeekendErrorFirst = false;
            this.weeklyFirstTime = ActualTime._i;
        }
        else {
            console.log("True weekly First");
            this.deliveryWeekendErrorFirst = true;
        }
    }
    CheckingTimeValidationForSecond(init) {
        console.log("Checking Time Validation", this.delvierySlotsWeekSeleted);
        console.log('Delivery Slot WeekSelected', __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(this.delvierySlotsWeekSeleted.SecondStartTime), 'hh:mm'));
        console.log(__WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(init.value), 'hh:mm'), 'Current TIME');
        let SecondStartTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(this.delvierySlotsWeekSeleted.SecondStartTime), 'hh:mm');
        let SecondEndTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(this.delvierySlotsWeekSeleted.SecondEndTime), 'hh:mm');
        let ActualTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(init.value), 'hh:mm');
        if ((SecondStartTime.isBefore(ActualTime) || SecondStartTime._i == ActualTime._i) && (ActualTime.isBefore(SecondEndTime) || ActualTime._i == SecondEndTime._i)) {
            this.weeklySecondTime = ActualTime._i;
            this.deliveryWeekendErrorSecond = false;
            console.log("Here", this.weeklySecondTime);
        }
        else {
            console.log("true");
            this.deliveryWeekendErrorSecond = true;
        }
    }
    changeMinMaxOfWeekend(deliverySlot, init) {
        console.log(deliverySlot, init, 'deliverySlotSelected');
        let StartTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(this.deliverySlotSelected.StartTime), 'hh:mm ');
        let EndTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(this.deliverySlotSelected.EndTime), 'hh:mm');
        let ActuallTime = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.convertTime12to24(init.value), 'hh:mm');
        console.log(StartTime.isBefore(ActuallTime) && ActuallTime.isBefore(EndTime));
        console.log(StartTime, ActuallTime);
        if ((StartTime.isBefore(ActuallTime) || StartTime._i == ActuallTime._i || StartTime == ActuallTime || this.deliverySlotSelected.StartTime == init.value) && (ActuallTime.isBefore(EndTime) || ActuallTime._i == EndTime._i)) {
            this.deliveryWeeklyError = false;
            this.weekendTime = ActuallTime._i;
            console.log("this.weekendTime", this.weekendTime);
        }
        else {
            this.deliveryWeeklyError = true;
        }
    }
    getMyDay(number) {
        if (number == 1) {
            return 'Monday';
        }
        else if (number == 2) {
            return 'Tuesday';
        }
        else if (number == 3) {
            return 'Wednesday';
        }
        else if (number == 4) {
            return 'Thursday';
        }
        else if (number == 5) {
            return 'Friday';
        }
        else if (number == 6) {
            return 'Saturday';
        }
        else if (number == 0) {
            return 'Sunday';
        }
    }
    tConvert(time) {
        if (time == '') {
            return '';
        }
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    onChangeDeliveryTye() {
        console.log(this.orderdetails, this.deliveryRate);
        if (this.deliveryType == 'home') {
            if (!this.deliverySlotSelected && this.weekendPackages && this.delvierySlots.length > 0) {
                this.deliverySlotSelected = this.delvierySlots[0];
            }
            if (!this.deliverySlotSelected && this.weeklyPackages && this.delvierySlotsWeekly.length > 0) {
                this.delvierySlotsWeekSeleted = this.delvierySlotsWeekly[0];
            }
        }
        if (this.deliveryType == 'pick' && this.deliveryRateDetacted) {
            this.deliveryRateDetacted = false;
            this.orderdetails.total = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
        }
        else if (this.deliveryType == 'home' && !this.deliveryRateDetacted) {
            this.deliveryRateDetacted = true;
            // this.orderdetails.total = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
        }
        else if (this.deliveryType == 'home' && this.deliveryRateDetacted) {
            this.orderdetails.total = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
        }
        let weekendExist = false;
        let weeklyExist = false;
        // this.orderdetails['deliveryCharges'] = 0 ;
        let deliveryCharges = 0;
        console.log(this.orderdetails, '135', 'OrderDetails');
        for (let i = 0; i < this.orderdetails.package.length; i++) {
            if (this.orderdetails.package[i].type == "flexible") {
                deliveryCharges += this.deliveryRate.weekend;
            }
            else {
                console.log("this.delvierySlotsWeekSeleted", this.delvierySlotsWeekSeleted);
                if (this.delvierySlotsWeekSeleted) {
                    if (this.delvierySlotsWeekSeleted.dtype == 'Twice') {
                        deliveryCharges += (this.deliveryRate.weekly * 2);
                    }
                    else {
                        deliveryCharges += this.deliveryRate.weekly;
                    }
                }
            }
        }
        if (this.orderdetails.items.length > 0) {
            deliveryCharges += this.deliveryRate.itemcharge;
        }
        console.log(this.deliveryRate, "DELIVERY RATE");
        this.orderdetails.deliveryCharges = deliveryCharges;
        this.orderdetails.total = 0;
        if (this.deliveryType == 'pick') {
            this.deliveryCharges = 0;
            this.orderdetails.deliveryCharges = 0;
            this.orderdetails.total = (parseFloat(this.addOnTotal.toString()) + parseFloat(this.SubTotal.toString()));
            this.TaxPrices = (parseFloat(this.orderdetails.total) / 100) * parseFloat(this.orderdetails.tax);
            this.orderdetails.total = (this.orderdetails.total + this.TaxPrices + parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
            localStorage.setItem('deliveryMethod', 'pick');
            // this.orderdetails.total  = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2) ;
        }
        else {
            localStorage.setItem('deliveryMethod', 'home');
            this.deliveryCharges = deliveryCharges;
            this.orderdetails.total = (parseFloat(this.addOnTotal.toString()) + parseFloat(this.SubTotal.toString()));
            this.TaxPrices = (parseFloat(this.orderdetails.total) / 100) * parseFloat(this.orderdetails.tax);
            this.orderdetails.total = (this.orderdetails.total + this.TaxPrices + parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
        }
    }
    addSpace(event) {
        if (event.target.value.length > 0) {
            let foo = event.target.value.split('-');
            let foo2 = '';
            if (foo.length > 0) {
                for (var i = 0; i < foo.length; i++) {
                    foo2 += foo[i];
                }
            }
            else {
                foo2 = event.target.value;
            }
            event.target.value = this.format(foo2, [4, 4, 4, 4], "-");
        }
    }
    format(input, format, sep) {
        var output = "";
        var idx = 0;
        for (var i = 0; i < format.length && idx < input.length; i++) {
            output += input.substr(idx, format[i]);
            if (idx + format[i] < input.length)
                output += sep;
            idx += format[i];
        }
        output += input.substr(idx);
        return output;
    }
    onValueChanged(data) {
        console.log(this.cardForm);
        if (!this.cardForm) {
            return;
        }
        const form = this.cardForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                console.log(field);
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    cardImage(cardtype) {
        let imgPath;
        if (cardtype.toLowerCase() == 'visa') {
            imgPath = 'assets/imgs/visa.png';
        }
        if (cardtype.toLowerCase() == 'maestro') {
            imgPath = "assets/imgs/maestro.png";
        }
        if (cardtype.toLowerCase() == 'mastercard') {
            imgPath = "assets/imgs/mastercard.png";
        }
        if (cardtype.toLowerCase() == 'discover') {
            imgPath = "assets/imgs/discover.png";
        }
        if (cardtype.toLowerCase() == 'credit') {
            imgPath = "assets/imgs/credit.png";
        }
        if (cardtype.toLowerCase() == 'dankort') {
            imgPath = "assets/imgs/dankort.png";
        }
        if (cardtype.toLowerCase() == 'diners') {
            imgPath = "assets/imgs/diners.png";
        }
        return imgPath;
    }
    onChanged(data) {
        console.log(this.cardForm);
        if (!this.cardCvvForm) {
            return;
        }
        const form = this.cardCvvForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                console.log(field, 'ERROR FIELD');
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    firstCall() {
        var time = new Date();
        time.setDate(time.getDate());
        var date = this.addZero(time.getDate());
        var month = this.addZero(time.getMonth() + 1);
        var year = time.getFullYear();
        this.currentDate = year + '-' + month + '-' + date;
        var time2 = new Date();
        time2.setDate(time.getDate() + this.proOrderTill - 1);
        var date60 = this.addZero(time2.getDate());
        var month60 = this.addZero(time2.getMonth() + 1);
        var year60 = time2.getFullYear();
        this.currentDatePlus60 = year60 + '-' + month60 + '-' + date60;
    }
    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    laterFunction(type) {
        console.log(type);
        console.log(this.event.laterDay != '' && this.event.laterTime != '', this.event.laterDay != '', this.event.laterTime != '');
        if (this.event.laterDay != '' && this.event.laterTime != '') {
            console.log("HERERERERE");
            let date1 = __WEBPACK_IMPORTED_MODULE_5_moment___default()(this.event.laterDay + ' ' + this.event.laterTime).format('YYYY-MM-DD hh:mm A');
            this.orderTime['datetime'] = date1;
            this.orderdetails['ordertiming'] = this.orderTime;
            console.log(this.orderdetails['ordertiming'], date1);
        }
    }
    ionViewDidLoad() {
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
    orderTimeFunction() {
        var time = this.orderTimeSelect;
        if (time == 'now') {
            delete this.orderdetails['ordertiming'];
            this.event = { laterDay: '', laterTime: '' };
            this.showLater = false;
            this.orderTime = {};
            this.orderTime['type'] = 'now';
            let newDate = __WEBPACK_IMPORTED_MODULE_5_moment___default()(new Date).add(this.minTime, 'minutes').format('YYYY-MM-DD hh:mm A');
            /*if (typeof this.minTime != 'undefined' && this.minTime != null && this.minTime != '') {
                let newDateObj = new Date(newDate.getTime() + this.minTime*60000);
                this.orderTime['datetime'] = this.getFormattedDate(newDateObj);
            }else{
            }*/
            this.orderTime['datetime'] = newDate;
            /*let nowTime = this.orderTime['datetime'].split(' ');
            this.nowTiming = nowTime[1];*/
            this.orderdetails['ordertiming'] = this.orderTime;
        }
        if (time == 'later') {
            delete this.orderdetails['ordertiming'];
            this.showLater = true;
            this.orderTime = {};
            this.orderTime['type'] = 'later';
        }
    }
    getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        let hr = date.getHours().toString();
        hr = hr.length > 1 ? hr : '0' + hr;
        let min = date.getMinutes().toString();
        min = min.length > 1 ? min : '0' + min;
        return year + '-' + month + '-' + day + ' ' + hr + ':' + min;
    }
    yearArray() {
        let yr = this.currentYr;
        for (var i = yr; i < this.currentYr + 15; i++) {
            this.year.push(i);
        }
    }
    deliveryAddress() {
        if (this.address == 'new') {
            delete this.orderAddress;
            this.initMap();
        }
        else {
            if (typeof this.currentCustomer['customeraddresses'] != 'undefined' && this.currentCustomer['customeraddresses'].length > 0) {
                this.orderAddress = this.currentCustomer['customeraddresses'][this.address];
                /*let kitchen = this.navParams.get('kitchen');

                var origin = new google.maps.LatLng( kitchen.lat, kitchen.lng );
                var destination = this.orderAddress.lat + ', ' + this.orderAddress.lng; // using string

                var directionsService = new google.maps.DirectionsService();
                var request = {
                    origin: origin, // LatLng|string
                    destination: destination, // LatLng|string
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route( request, ( response, status )=> {

                    console.log("response");
                    console.log(response);

                    if ( status === 'OK' ) {
                        var point = response.routes[ 0 ].legs[ 0 ];

                        var minTime : number;

                        if (typeof kitchen.mindeliveryime != 'undefined' && kitchen.mindeliveryime != null && kitchen.mindeliveryime != '') {
                            minTime = parseInt(kitchen.mindeliveryime);
                        }else{
                            minTime = 0;
                        }

                        let time = point.duration.text.split(' ');

                        this.nowTiming = parseInt(time[0]) + minTime;

                        this.totalDistance = point.distance.text;
                    }
                } );*/
            }
        }
    }
    addAddress() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        console.log(this.addressForm.value);
        this.ms3Service.updateCustomerAddress(this.addressForm.value).subscribe((data) => {
            if (data.error) {
                if (typeof data.message['isOperational'] != 'undefined') {
                    this.getToast('Unable to add Address! Please try again.');
                }
                else {
                    this.getToast(data.message);
                }
            }
            else {
                this.addressForm.reset();
                this.addressForm.controls['_id'].setValue(this.currentCustomer._id);
                this.getToast('Address Detail Added');
                this.getCurrentCustomer('addaddress');
            }
            this.loading.dismiss();
        }, (err) => {
            this.getToast('Unable to add Address.');
            this.loading.dismiss();
        });
    }
    slotIsChangeInWeekly() {
        let xx = document.getElementById('weeklyFirst');
        let yy = document.getElementById('weeklySecond');
        console.log(xx, yy);
        if (xx) {
            xx.value = '';
            this.deliveryWeekendErrorFirst = true;
        }
        if (yy) {
            yy.value = '';
        }
        this.deliveryWeekendErrorSecond = true;
        //  this.getDeliveryCharges(false);
        this.onChangeDeliveryTye();
    }
    getCurrentCustomer(type) {
        this.ms3Service.getOneCustomer(this.currentCustomer['_id']).subscribe((data) => {
            if (!data.error) {
                this.currentCustomer = data.message;
                if (type == 'cardadd') {
                    this.chooseCard = (this.currentCustomer['cardinfo'].length - 1).toString();
                }
                else {
                    this.address = (this.currentCustomer['customeraddresses'].length - 1).toString();
                }
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
            }
        });
    }
    checkDisabled() {
        console.log('CheckDisabled');
        if (this.weeklyPackages) {
            if (this.delvierySlotsWeekSeleted) {
                if (this.delvierySlotsWeekSeleted.dtype == 'Once') {
                    if (!this.deliveryWeekendErrorFirst && this.weeklyFirstTime) {
                    }
                    else {
                        console.log('702');
                        return true;
                    }
                }
                else {
                    if (!this.deliveryWeekendErrorSecond && this.weeklySecondTime) {
                    }
                    else {
                        console.log('711', this.weeklySecondTime, this.deliveryWeekendErrorSecond);
                        return true;
                    }
                }
            }
            else {
                console.log('716');
                return true;
            }
        }
        if (this.weekendPackages) {
            if (this.deliverySlotSelected) {
                if (!this.deliveryWeeklyError && this.weekendTime) {
                }
                else {
                    console.log('722');
                    return true;
                }
            }
            else {
                console.log('726');
                return true;
            }
        }
        // if(typeof this.orderAddress != 'undefined' && typeof this.orderPayment != 'undefined' && typeof this.orderdetails['ordertiming'] != 'undefined'){
        // 	/*if (this.orderPayment == 'card' && typeof this.orderCardInfo['cvv'] != 'undefined' && this.orderCardInfo['cvv'] != '') {*/
        // 	if (this.orderPayment == 'card') {
        // 		if (this.cardCvvForm.valid) {
        // 			this.canProceed = true;
        // 			return false
        // 		}else{
        // 			this.canProceed = false;
        // 			return true;
        // 		}
        // 	}else{
        // 		this.canProceed = true;
        // 		return false;
        // 	}
        // }else{
        // 	this.canProceed = false;
        // 	return true;
        // }
        //	console.log('Paymentype',this.paymentType,'this.chooseCard',this.chooseCard,'cardFrom',this.cardForm.valid,'this.orderpayment'  )
        console.log("560", this.deliveryType);
        if (this.deliveryType == 'home') {
            if (typeof this.orderAddress == 'undefined') {
                return true;
            }
        }
        if (this.paymentType == 'cash') {
            this.canProceed = true;
            return false;
        }
        else {
            if (this.chooseCard == 'new') {
                if (this.cardForm.valid) {
                    this.canProceed = true;
                    return false;
                }
                else {
                    this.canProceed = false;
                    return true;
                }
            }
            else if (this.chooseCard && this.chooseCard != 'new') {
                this.canProceed = true;
                return false;
            }
            else {
                this.canProceed = false;
                return true;
            }
        }
    }
    pmentType() {
        if (this.paymentType == 'cash') {
            this.orderPayment = 'cash';
        }
        if (this.paymentType == 'card') {
            delete this.orderPayment;
        }
    }
    crdType() {
        this.cardSelected = this.chooseCard;
        this.cardCvvForm.reset();
        // if(typeof this.orderCardInfo != 'undefined' && typeof this.orderCardInfo['cvv'] != 'undefined'){
        // 	delete this.orderCardInfo['cvv'];
        // }
        if (this.chooseCard != 'new') {
            this.orderPayment = 'card';
            this.orderCardInfo = this.currentCustomer['cardinfo'][this.chooseCard];
        }
        if (this.chooseCard == 'new') {
            delete this.orderPayment;
            delete this.orderCardInfo;
        }
    }
    enterCVV(event) {
        this.orderCardInfo['cvv'] = this.cardCvvForm.value['cvv'];
        if (this.cardCvvForm.valid) {
            if ((event.keyCode == 13 || event.key == 'Enter') && this.canProceed) {
                this.proceedToThank();
            }
        }
    }
    choose(type) {
        console.log(this.cardForm.value);
    }
    addCard() {
        let foo = this.cardForm.value.cardnumber.split('-');
        let foo2 = '';
        if (foo.length > 0) {
            for (var i = 0; i < foo.length; i++) {
                foo2 += foo[i];
            }
        }
        let obj = {};
        let abc = this.cardForm.value.cardnumber;
        /*obj['fname'] = this.currentCustomer['firstname'];
        obj['lname'] = this.currentCustomer['lastname'];
        obj['email'] = this.currentCustomer['email'];*/
        obj['cardnumber'] = abc.split("-").join("").trim();
        obj['fname'] = this.cardForm.value.fname;
        obj['lname'] = this.cardForm.value.lname;
        obj['expirymonth'] = this.cardForm.value.expirymonth;
        obj['expiryyear'] = this.cardForm.value.expiryyear;
        obj['cvv'] = this.cardForm.value.cvv;
        obj['cvc'] = this.cardForm.value.cvv;
        obj['zip'] = this.cardForm.value.zip;
        obj['address'] = this.cardForm.value.address;
        obj['email'] = this.currentCustomer.email;
        /*obj['city'] = this.cardForm.value.city;
        obj['postalcode'] = this.cardForm.value.postalcode;*/
        this.generatingToken = true;
        this.ms4Service.verifyCard(obj).subscribe((data) => {
            //	this.generatingToken = false;
            if (!data.error) {
                let dataObj = data.message['txn'];
                if (typeof dataObj['errorCode'] != 'undefined') {
                    this.generatingToken = false;
                    this.getToast(dataObj['errorName']);
                }
                else if (typeof dataObj['ssl_result_message'] != 'undefined' && (dataObj['ssl_result_message'] == 'APPROVED' || dataObj['ssl_result_message'] == 'APPROVAL')) {
                    let index = this.currentCustomer['cardinfo'].findIndex((mn) => {
                        return mn.cardnumber.slice(-4) == abc.slice(-4);
                    });
                    if (index == -1) {
                        this.cardForm.value["cardtype"] = dataObj['ssl_card_short_description'].toLowerCase();
                        let obj2 = this.cardForm.value;
                        obj2['cardnumber'] = foo2;
                        this.ms4Service.tokenGenerate(obj).subscribe((res) => {
                            this.generatingToken = false;
                            let tokenObj = res.message.txn;
                            if (typeof this.currentCustomer['cardinfo'] == 'undefined') {
                                this.currentCustomer['cardinfo'] = [];
                                this.currentCustomer['cardinfo'].push({ token: tokenObj.ssl_token.toString(), cardtype: tokenObj.ssl_card_short_description.toString(), cardnumber: tokenObj.ssl_card_number.toString() });
                            }
                            else {
                                this.currentCustomer['cardinfo'].push({ token: tokenObj.ssl_token.toString(), cardtype: tokenObj.ssl_card_short_description.toString(), cardnumber: tokenObj.ssl_card_number.toString() });
                            }
                            this.updateCustomer();
                        }, (err) => {
                            this.generatingToken = false;
                            this.getToast('Please try later ');
                        });
                    }
                    else {
                        this.generatingToken = false;
                        this.getToast('Card with this Card Number already exist');
                    }
                }
                else {
                    this.generatingToken = false;
                    this.getToast('Please try with another card');
                }
            }
        }, (err) => {
            this.generatingToken = false;
            console.log("err");
            console.log(err);
        });
        /*(<any>window).Stripe.card.createToken({
            number: foo2,
            exp_month: this.cardForm.value.expirymonth,
            exp_year: this.cardForm.value.expiryyear,
            cvc: this.cardForm.value.cvc
        }, (status, response) => {
            
            if (status === 200) {
                this.cardForm.controls["cardtype"].setValue(response.card.brand.toLowerCase());

                let index = this.currentCustomer['cardinfo'].findIndex((mn)=>mn.cardnumber == foo2)

                if (index == -1) {
                    let obj2 = this.cardForm.value;
                    obj2['cardnumber'] = foo2;
                    if (typeof this.currentCustomer['cardinfo'] == 'undefined') {
                        this.currentCustomer['cardinfo'] = [];
                        this.currentCustomer['cardinfo'].push(obj2);
                    }else{
                        this.currentCustomer['cardinfo'].push(obj2);
                    }
                    this.updateCustomer();
                }else{
                    this.getToast('Card with this Card Number already exist');
                }
            }else{
                this.getToast(response.error.message);
            }
        });*/
    }
    updateCustomer() {
        this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data) => {
            if (!data.error) {
                this.getCurrentCustomer('cardadd');
                this.getToast('Card Detail Added');
                this.cardForm.reset();
                /*this.cardForm.controls['cardtype'].setValue('master');*/
            }
            else {
                this.getToast('Unable to Add Card');
            }
        }, (err) => {
            this.getCurrentCustomer('cardadd');
            this.getToast('Unable to Add Card');
        });
    }
    /*stripeResponseHandler(response) {
        var obj = {"id": response.card.id, "amount": Math.round(this.orderdetails['total']), "token": response.id, "currency" : this.orderdetails['currency']}
        this.ms4Service.cardPayment(obj).subscribe((data) => {
            this.orderdetails["cardPaidStatus"] = data;
            this.addNewOrder();
        },(err)=>{
            this.loading.dismiss();
            this.getToast('Request for Online Payment could not be processed now!')
        });
    }*/
    proceedToThank() {
        this.orderdetails.delvierySlot = this.deliverySlotSelected;
        this.orderdetails.delvierySlotsWeek = this.delvierySlotsWeekSeleted;
        //  this.checkoutsummary.delvierySlot.status = 'received' ;
        if (this.orderdetails.delvierySlot) {
            console.log(this.weekendTime, 'WeekTime');
            this.orderdetails.delvierySlot.deliveryTime = this.weekendTime;
        }
        if (this.orderdetails.delvierySlotsWeek) {
            console.log(this.weeklyFirstTime, 'this.weeklyFirstTime');
            this.orderdetails.delvierySlotsWeek.deliveryFirstTime = this.weeklyFirstTime;
            this.orderdetails.delvierySlotsWeek.deliverySecondTime = this.weeklySecondTime;
        }
        console.log(this.orderdetails, 'OrderDetails');
        for (let i = 0; i < this.orderdetails.package.length; i++) {
            this.orderdetails.package[i].orderStatus = 'received';
        }
        for (var i = 0; i < this.orderdetails.items.length; i++) {
            this.orderdetails.items[i].orderStatus = 'received';
        }
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        if (this.orderdetails.items.length < 0 || this.orderdetails.items.length == 0) {
            this.orderdetails['ordertiming'] = { type: 'f' };
        }
        this.orderdetails['ordertype'] = this.deliveryType;
        this.orderdetails['fulladdress'] = this.orderAddress;
        this.orderdetails['paymenttype'] = this.orderPayment;
        this.orderdetails['status'] = 'received';
        console.log(this.orderPayment == 'card' && typeof this.orderCardInfo != 'undefined' && this.chooseCard != "new");
        console.log(this.orderPayment == 'card' && this.chooseCard == 'new');
        console.log(this.orderPayment, this.chooseCard);
        if (this.paymentType == 'card' && typeof this.orderCardInfo != 'undefined' && this.chooseCard != "new") {
            this.orderdetails['cardinfo'] = this.orderCardInfo;
            let obj = {};
            obj['token'] = this.orderCardInfo['token'];
            //      obj['expirymonth'] = this.orderCardInfo['expirymonth'];
            //    obj['expiryyear'] = this.orderCardInfo['expiryyear'];
            //    obj['cvv'] = this.orderCardInfo['cvc'];
            //    obj['fname'] = this.orderCardInfo['fname'];
            //    obj['lname'] = this.orderCardInfo['lname'];
            //   obj['email'] = this.currentCustomer['email'];
            obj['amount'] = Math.round(parseFloat(this.orderdetails.total) * 100) / 100;
            obj['custid'] = this.currentCustomer['_id'];
            //	obj['zip'] = this.orderCardInfo['zip'];
            //	obj['address'] = this.orderCardInfo['address'];
            console.log(obj, 'Select card');
            localStorage.removeItem('deliveryMethod');
            this.ms4Service.paymentByToken(obj).subscribe((data) => {
                if (!data.error) {
                    let dataObj = data.message.txn;
                    if (dataObj['ssl_result_message'] === 'APPROVED' || dataObj['ssl_result_message'] === 'APPROVAL') {
                        this.orderdetails["cardPaidStatus"] = dataObj;
                        this.addNewOrder();
                    }
                    else if (dataObj['ssl_result_message'] == 'DECLINED') {
                        this.loading.dismiss();
                        this.getToast('Payment with this card is declined. Please try another card!');
                    }
                    else {
                        this.loading.dismiss();
                        this.getToast('Unable to Proceed with Online Payment. Please try again!');
                    }
                }
                else {
                    this.loading.dismiss();
                    this.getToast('Unable to Proceed. Please try again!');
                }
            }, (err) => {
                this.loading.dismiss();
                this.getToast('Something went wrong. Please try again!');
            });
            /*(<any>window).Stripe.card.createToken({
                number: this.orderCardInfo['cardnumber'],
                exp_month: this.orderCardInfo['expirymonth'],
                exp_year: this.orderCardInfo['expiryyear'],
                cvc: this.orderCardInfo['cvv']
            },(status, response) => {

                if (status === 200) {
                    this.stripeResponseHandler(response);
                }else{
                    this.loading.dismiss();
                    this.getToast(response.error.message);
                }
            },(err)=>{
                this.loading.dismiss();
                this.getToast('Request for Online Payment could not be processed now!')
            });*/
        }
        else if (this.paymentType && this.chooseCard == 'new') {
            let obj = {};
            obj['cardnumber'] = this.cardForm.value.cardnumber;
            obj['expirymonth'] = this.cardForm.value.expirymonth;
            // obj['expiryyear'] = this.cardForm.value.expiryear;
            obj['expiryyear'] = this.cardForm.value.expiryyear;
            obj['zip'] = this.cardForm.value.zip;
            obj['address'] = this.cardForm.value.address;
            obj['cvv'] = this.cardForm.value.cvv;
            obj['fname'] = this.cardForm.value.fname;
            obj['lname'] = this.cardForm.value.lname;
            obj['email'] = this.currentCustomer['email'];
            obj['amount'] = Math.round(parseFloat(this.orderdetails.total) * 100) / 100;
            obj['custid'] = this.currentCustomer['_id'];
            console.log('Add card ', obj);
            this.ms4Service.makePayment(obj).subscribe((data) => {
                console.log(data);
                if (!data.error) {
                    let dataObj = data.message.txn;
                    if (dataObj['ssl_result_message'] === 'APPROVED' || dataObj['ssl_result_message'] === 'APPROVAL') {
                        this.orderdetails["cardPaidStatus"] = dataObj;
                        this.addNewOrder();
                    }
                    else if (dataObj['ssl_result_message'] == 'DECLINED') {
                        this.loading.dismiss();
                        this.getToast('Payment with this card is declined. Please try another card!');
                    }
                    else {
                        this.loading.dismiss();
                        this.getToast('Unable to Proceed with Online Payment. Please try again!');
                    }
                }
                else {
                    this.loading.dismiss();
                    this.getToast('Unable to Proceed. Please try again!');
                }
            }, (err) => {
                this.loading.dismiss();
                this.getToast('Something went wrong. Please try again!');
            });
        }
        if (this.paymentType == 'cash') {
            console.log('cash on deliveary');
            this.addNewOrder();
        }
    }
    addNewOrder() {
        this.orderdetails["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.orderdetails["created_at"] = new Date();
        this.ms4Service.addOrder(this.orderdetails).subscribe((data) => {
            if (!data.error) {
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__thankupage__["a" /* ThankPage */], {
                    order: data.message,
                    country: this.resCountry
                });
                var obj2 = { "customeremail": this.currentCustomer.email, "order": data.message, "restaurantid": data.message.restaurantid };
                this.ms1Service.orderMail(obj2).subscribe(res => {
                });
                this.loading.dismiss();
                localStorage.removeItem('cartinfo');
                this.events.publish('cart:item', this.orderdetails, Date.now());
                /*this.getToast('Order Placed Successfully');*/
            }
            else {
                this.getToast('Unable to place Order!');
            }
        }, (err) => {
            this.getToast('Something went wrong. Unable to place Order!');
            /*this.events.publish('internet:lost','abc');*/
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    initMap() {
        var lat = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lat'));
        var lng = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lng'));
        if (lat != null && lng != null) {
            this.currentCustomer['lat'] = lat;
            this.currentCustomer['lng'] = lng;
            setTimeout(() => {
                this.mapRun();
            }, 500);
        }
        else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.currentCustomer.lat = position.coords.latitude;
                    this.currentCustomer.lng = position.coords.longitude;
                    this.mapRun();
                }, (error) => {
                    this.getToast('Unable to detect Address');
                });
            }
            else {
                this.getToast("Your Phone don't support Geolocation");
            }
        }
    }
    somethingChanged(value) {
        console.log("helo i am here", value);
    }
    mapRun() {
        let _that = this;
        var input = document.getElementById('pac-input');
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: parseFloat(this.currentCustomer.lat), lng: parseFloat(this.currentCustomer.lng) },
            zoom: 15
        });
        var autocomplete = new google.maps.places.Autocomplete(input, { types: [] });
        autocomplete.bindTo('bounds', map);
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            position: { lat: parseFloat(this.currentCustomer.lat), lng: parseFloat(this.currentCustomer.lng) },
            visible: true,
            draggable: true
        });
        google.maps.event.addListener(marker, 'dragend', () => {
            var mlat = marker.position.lat();
            var mlng = marker.position.lng();
            this.getgeo(mlat, mlng);
        });
        autocomplete.addListener('place_changed', (value) => {
            console.log(value, '874');
            console.log(this.addressForm.value);
            marker.setVisible(true);
            var place = autocomplete.getPlace();
            console.log(place, '877');
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            }
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(15);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            if (place.address_components) {
                let houseNo;
                let area;
                let city;
                let country;
                let zipcode;
                console.log(place.address_components, '895');
                for (var i = 0; i < place.address_components.length; i++) {
                    for (var j = 0; j < place.address_components[i].types.length; j++) {
                        var addressType = place.address_components[i].types[j];
                        if (addressType == 'premise' || addressType == 'route') {
                            if (typeof houseNo == 'undefined') {
                                houseNo = place.address_components[i]['long_name'];
                            }
                            else {
                                houseNo = houseNo + ' ' + place.address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'neighborhood' || addressType == 'sublocality' || addressType == 'sublocality_level_2') {
                            if (typeof area == 'undefined') {
                                area = place.address_components[i]['long_name'];
                            }
                            else {
                                area = area + ' ' + place.address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'locality') {
                            if (typeof city == 'undefined') {
                                city = place.address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'country') {
                            if (typeof country == 'undefined') {
                                country = place.address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'postal_code') {
                            zipcode = place.address_components[i]['long_name'];
                        }
                    }
                }
                setTimeout(() => {
                    if (place.name != place.vicinity) {
                        var inputValues = place.name + " " + city + " , " + country;
                    }
                    else {
                        var inputValues = place.name + "  " + city + " , " + country;
                    }
                    console.log(inputValues, '949');
                    _that.addressForm.controls['address'].setValue(inputValues);
                    _that.addressForm.controls['city'].setValue(city);
                    _that.addressForm.controls['country'].setValue(country);
                    _that.addressForm.controls['zipcode'].setValue(zipcode);
                    console.log(houseNo, area, '939');
                }, 1000);
            }
        });
    }
    getgeo(lat, long) {
        let _that = this;
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, long);
        geocoder.geocode({ 'latLng': latlng }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    let houseNo;
                    let area;
                    let city;
                    let country;
                    let zipcode;
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        var addressType = results[0].address_components[i].types[0];
                        if (addressType == 'premise' || addressType == 'route') {
                            if (typeof houseNo == 'undefined') {
                                houseNo = results[0].address_components[i]['long_name'];
                            }
                            else {
                                houseNo = houseNo + ' ' + results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'political' || addressType == 'sublocality' || addressType == 'sublocality_level_1') {
                            if (typeof area == 'undefined') {
                                area = results[0].address_components[i]['long_name'];
                            }
                            else {
                                area = area + ' ' + results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'locality') {
                            if (typeof city == 'undefined') {
                                city = results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'country') {
                            if (typeof country == 'undefined') {
                                country = results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'postal_code') {
                            zipcode = results[0].address_components[i]['long_name'];
                        }
                    }
                    setTimeout(() => {
                        _that.addressForm.controls['city'].setValue(city);
                        _that.addressForm.controls['country'].setValue(country);
                        _that.addressForm.controls['zipcode'].setValue(zipcode);
                        if (typeof houseNo != 'undefined' && typeof area != 'undefined') {
                            _that.addressForm.controls['address'].setValue(houseNo + ' ' + area);
                        }
                        if (typeof houseNo == 'undefined' && typeof area != 'undefined') {
                            _that.addressForm.controls['address'].setValue(area);
                        }
                        if (typeof houseNo != 'undefined' && typeof area == 'undefined') {
                            _that.addressForm.controls['address'].setValue(houseNo);
                        }
                        if (typeof houseNo == 'undefined' && typeof area == 'undefined') {
                            _that.addressForm.controls['address'].setValue(results[0].formatted_address);
                        }
                    }, 1000);
                }
            }
            else {
            }
        });
    }
};
CheckoutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-checkout',template:/*ion-inline-start:"D:\OrderApp\src\pages\cart\checkout.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Checkout</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding  has-bouncing="true">\n\n\n\n	<ion-list>\n\n			<ion-item no-padding>\n\n					<ion-label>\n\n						<strong>Subtotal : </strong>\n\n						<span float-right>{{orderdetails.currency}} {{SubTotal | number : \'1.2-2\'}}</span>\n\n					</ion-label>\n\n				</ion-item>\n\n				<ion-item no-padding>\n\n					<ion-label>\n\n						<strong>Add-On Total : </strong>\n\n						<span float-right>{{orderdetails.currency}} {{addOnTotal | number : \'1.2-2\'}}</span>\n\n					</ion-label>\n\n				</ion-item>\n\n				<ion-item no-padding>\n\n					<ion-label>\n\n						<strong>Tax Charges : </strong>\n\n						<span float-right>{{orderdetails.currency}} {{TaxPrices | number : \'1.2-2\'}}</span>\n\n					</ion-label>\n\n			</ion-item>\n\n				<ion-item no-padding>\n\n						<ion-label>\n\n							<strong>Delivery Charges : </strong>\n\n							<span float-right>{{orderdetails.currency}} {{deliveryCharges | number : \'1.2-2\'}}</span>\n\n						</ion-label>\n\n				</ion-item>\n\n				\n\n		<ion-item no-padding>\n\n			<ion-label>\n\n				<strong>Amount Payable : </strong>\n\n				<span float-right>{{orderdetails.currency}} {{orderdetails.total }}</span>\n\n			</ion-label>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-list *ngIf="dayliyItems" class="addressRadio" radio-group [(ngModel)]="orderTimeSelect" (ionChange) = "orderTimeFunction()">\n\n		<ion-row><strong>Choose Daily Menu Items Delivery Date And  Time</strong></ion-row>\n\n		<ion-item *ngIf="resStatus == \'close\'">\n\n			<ion-label text-center><strong text-center>Kitchen is Closed! You Can\'t Order for Now</strong></ion-label>\n\n		</ion-item>\n\n\n\n		<ion-item *ngIf="resStatus != \'close\'">\n\n			<ion-label><strong>Now</strong></ion-label>\n\n			<ion-radio item-left value="now"></ion-radio>\n\n		</ion-item>\n\n\n\n		<ion-item *ngIf = "orderLaterAllowed && orderdetails ">\n\n			<ion-label><strong>Pre-order for Later</strong></ion-label>\n\n			<ion-radio item-left value="later"></ion-radio>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-row *ngIf = "orderTimeSelect == \'now\' && minTime && dayliyItems" padding>Expected Fastest Delivery Within : <strong>{{minTime}} min</strong></ion-row>\n\n\n\n	<ion-row *ngIf = "showLater && dayliyItems" class="padding010 marginBottom32px timeBg displayBlock">\n\n		<ion-row class="width100">\n\n			<ion-label><strong>Date</strong></ion-label>\n\n			<ion-datetime placeholder = "Select Date..." displayFormat="DDDD, DD-MMM-YYYY" pickerFormat="DD-MMMM-YYYY" [min]="currentDate" [max]="currentDatePlus60" [(ngModel)]="event.laterDay" (ionChange)="laterFunction(\'date\')"></ion-datetime>\n\n		</ion-row>\n\n		<ion-row class="width100">\n\n			<ion-label><strong>Time</strong></ion-label>\n\n			<ion-datetime placeholder = "Select Time..." displayFormat="hh:mm A" pickerFormat="HH:mm" id="laterTime1" [(ngModel)]="event.laterTime" (ionChange)="laterFunction(\'time\')"></ion-datetime>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-list *ngIf = "currentCustomer && currentCustomer.customeraddresses" class="addressRadio" radio-group [(ngModel)]="address" (ionChange) = "deliveryAddress()">\n\n		<ion-row ><strong>Address</strong></ion-row>\n\n		<ion-row><small>*for take away Address is not mandatory </small></ion-row>\n\n		<ion-item *ngFor = "let adrs of currentCustomer.customeraddresses; let i = index; ">\n\n			<ion-label>\n\n				<p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Address : </strong>{{adrs.address}}</p>\n\n				<p class="whiteSpaceInitial paddingVertical0-5vh" *ngIf = "adrs.landmark != \'\'"><strong>Landmark : </strong>{{adrs.landmark}}</p>\n\n				<p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Zipcode : </strong>{{adrs.zipcode}}</p>\n\n				<p class="whiteSpaceInitial paddingVertical0-5vh" *ngIf = "adrs.landline != \'\'"><strong>Landline : </strong>{{adrs.landline}}</p>\n\n				<p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Phone No : </strong>{{adrs.phoneno}}</p>\n\n			</ion-label>\n\n			<ion-radio item-left [value]="i"></ion-radio>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label><strong>Enter New Address</strong></ion-label>\n\n			<ion-radio item-left value="new"></ion-radio>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-list *ngIf = "address == \'new\'" padding class = "bgLightGreen">\n\n        <form role="form" [formGroup]="addressForm" (ngSubmit)="addAddress()">\n\n            <ion-item>\n\n                <ion-input formControlName="phoneno" type="tel" placeholder="Enter Mobile No"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n                <ion-input formControlName="landline" type="tel" placeholder="Enter Landline No"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item class="diffInput">\n\n                <input id="pac-input" type="text"    placeholder="Enter an Address" autocorrect="off" spellcheck="off" autocapitalize="off" #search class="form-control" formControlName="address" />\n\n            </ion-item>\n\n            \n\n        \n\n            <ion-item>\n\n                <ion-input formControlName="city" type="text" placeholder="City"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n                <ion-input formControlName="country" type="text" placeholder="Country"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n                <ion-input formControlName="zipcode" type="text" placeholder="Postal Code"></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!addressForm.valid">Add Address</button>\n\n        </form>\n\n    	\n\n    	<div id="map" style="height: 300px;"></div>\n\n    </ion-list>\n\n	<ion-list *ngIf = "orderdetails.total" class="paymentRadio margin32-0" radio-group [(ngModel)]="deliveryType" (ngModelChange)="onChangeDeliveryTye()">\n\n		<ion-row ><strong>Delivery Method</strong></ion-row>\n\n		<ion-item>\n\n			<ion-label> Take away  </ion-label>\n\n			<ion-radio item-left value="pick"></ion-radio>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			\n\n			<ion-label> Home delivery </ion-label>\n\n			<ion-radio item-left value="home"></ion-radio>\n\n		</ion-item>\n\n	</ion-list>\n\n	<ion-list *ngIf = "orderdetails.total" class="paymentRadio margin32-0" >\n\n		<ion-row *ngIf=" deliveryType == \'home\' "><strong>Delivery Timing</strong></ion-row>\n\n		<ion-row *ngIf=" deliveryType == \'pick\'"><strong>Pickup Timing</strong></ion-row>\n\n		<ion-item *ngIf="dayliyItems">\n\n			<div>\n\n				<label>Daily Menu Items <span *ngIf="deliveryType == \'home\'">Delivery</span> <span *ngIf="deliveryType == \'pick\'">Pickup </span></label>\n\n				<div>\n\n					<label>\n\n						Date and Time : <strong> {{orderdetails.ordertiming.datetime}} </strong>\n\n					</label>\n\n				</div>\n\n			</div>\n\n		</ion-item>\n\n		<ion-item *ngIf="weekendPackages">\n\n			<div>\n\n				<label>Select the Avalible <span *ngIf="deliveryType == \'home\'">Delivery</span> <span *ngIf="deliveryType == \'pick\'">Pickup</span> Slot For Weekend Packages</label>\n\n		\n\n			</div>\n\n			<div>\n\n				<ul class="list-group" style=" list-style: none !important;">\n\n                       \n\n					<li  *ngFor="let delvierySlot of delvierySlots; let i = index;">\n\n						<input type="radio" name="mealpackageDeliveryType"  [(ngModel)]="deliverySlotSelected" [value]="delvierySlot"  />  {{getMyDay(delvierySlot.day)}}  Timing  {{tConvert(delvierySlot.StartTime)}}   -  {{tConvert(delvierySlot.EndTime)}}\n\n					</li>\n\n					<li *ngIf="delvierySlots.length == 0">\n\n					  Sorry, No delivery Available\n\n					</li>\n\n				\n\n				  </ul>	\n\n				  <div *ngIf="deliverySlotSelected" class=\'input-group date\'>\n\n						* Select Time For Weekend Packages\n\n						<div class=\'input-group date\' id=\'datetimepicker1\'>	\n\n					<input type="time" #weekly id="weekendTime" (change)="changeMinMaxOfWeekend($event,weekly)" (blur)="changeMinMaxOfWeekend($event,weekly)" />\n\n				\n\n				\n\n			\n\n					\n\n							  \n\n						\n\n								   \n\n								 \n\n								  <span id="weeklyFirtClock"   class="input-group-addon">\n\n									  <span  class="glyphicon glyphicon-time"></span>\n\n								  </span>\n\n							 \n\n							  </div>\n\n				\n\n				\n\n				\n\n				\n\n				\n\n				</div>\n\n				<div *ngIf="deliveryWeeklyError && deliverySlotSelected && deliverySlotSelected.StartTime && deliverySlotSelected.EndTime" style="color:red;">\n\n						<span>Please Select Time Between <br> {{tConvert(deliverySlotSelected.StartTime)}} to {{tConvert(deliverySlotSelected.EndTime)}} </span>\n\n				</div>	\n\n			</div>	\n\n		</ion-item>\n\n		<ion-item *ngIf="weeklyPackages">\n\n			<div>\n\n				<label>Select the Avalible <span *ngIf="deliveryType == \'home\'">Delivery</span> <span *ngIf="deliveryType == \'pick\'">Pickup</span> Slot For Weekly Packages</label>\n\n			</div>\n\n			<div>\n\n				<ul class="list-group" style=" list-style: none !important;">\n\n				 \n\n				  <li *ngFor="let delvierySlotsWeek of delvierySlotsWeekly; let i = index" style="margin-bottom: 10px;">\n\n					  <input type="radio" name="mealpackageDelvierySlotsWeek" (change)="slotIsChangeInWeekly()"  [(ngModel)]="delvierySlotsWeekSeleted" [value]="delvierySlotsWeek"  /> Delivery  {{delvierySlotsWeek.dtype}} in a  Week  <br>Day : {{getMyDay(delvierySlotsWeek.Firstday)}} <span *ngIf="delvierySlotsWeek.FirstStartTime"> From  {{tConvert(delvierySlotsWeek.FirstStartTime)}} </span> to  <span *ngIf="delvierySlotsWeek.FirstStartTime">{{tConvert(delvierySlotsWeek.FirstEndTime)}}</span><br> <span *ngIf="delvierySlotsWeek.Secondday">Day 2 : </span> {{getMyDay(delvierySlotsWeek.Secondday)}} <span *ngIf="delvierySlotsWeek.SecondStartTime">From :  {{tConvert(delvierySlotsWeek.SecondStartTime)}}</span> <span *ngIf="delvierySlotsWeek.SecondEndTime">to   {{tConvert(delvierySlotsWeek.SecondEndTime)}} </span>   \n\n				  </li>\n\n			\n\n				 <li *ngIf="delvierySlotsWeekly.length ==0 ">\n\n				   Sorry, No delivery Avaliable \n\n				 </li>\n\n				</ul>\n\n			</div>\n\n\n\n\n\n			<div *ngIf="delvierySlotsWeekSeleted" class=\'input-group date\' >\n\n				  *	Select Time For Weekly Packages\n\n					\n\n					<div class=\'input-group date\' id=\'datetimepicker1\'>\n\n						 \n\n						<input type="time" #weekendFirst id="weeklyFirst" (change)="CheckingTimeValidationForFirst(weekendFirst)" (blur)="CheckingTimeValidationForFirst(weekendFirst)" />\n\n						<span id="weeklyFirtClock"   class="input-group-addon">\n\n							<span  class="glyphicon glyphicon-time"></span>\n\n						</span>\n\n				   \n\n					</div>\n\n			</div>\n\n				  <div *ngIf="deliveryWeekendErrorFirst && delvierySlotsWeekSeleted" style="color:red;">\n\n					<span>Please Select Time Between  {{tConvert(delvierySlotsWeekSeleted.FirstStartTime)}} to {{tConvert(delvierySlotsWeekSeleted.FirstEndTime)}} </span>\n\n				</div>\n\n			\n\n				<div *ngIf="delvierySlotsWeekSeleted && delvierySlotsWeekSeleted.dtype == \'Twice\' ">\n\n\n\n						<div *ngIf="delvierySlotsWeekSeleted" class=\'input-group date\' >\n\n						 * Select Time For Weekly Packages\n\n						  \n\n						  <div class=\'input-group date\' id=\'datetimepicker2\'>\n\n							  <input type=\'time\' id="weeklySecond"  class="form-control"  #weekendSecond (change)="CheckingTimeValidationForSecond(weekendSecond)" (blur)="CheckingTimeValidationForSecond(weekendSecond)"/>\n\n							  <span class="input-group-addon" id="weeklySecondClock">\n\n								  <span class="glyphicon glyphicon-time"></span>\n\n							  </span>\n\n						  </div>\n\n		\n\n		\n\n		\n\n						</div>\n\n						<div *ngIf="deliveryWeekendErrorSecond && delvierySlotsWeekSeleted" style="color:red;">\n\n						  <span>Please Select Time Between  {{tConvert(delvierySlotsWeekSeleted.SecondStartTime)}} to {{tConvert(delvierySlotsWeekSeleted.SecondEndTime)}} </span>\n\n					  </div>\n\n				</div>\n\n\n\n\n\n\n\n		</ion-item>		\n\n	</ion-list>\n\n	<ion-list *ngIf = "orderdetails.total" class="paymentRadio margin32-0" radio-group [(ngModel)]="paymentType" (ionChange) = "pmentType()">\n\n		<ion-row ><strong>Payment Type</strong></ion-row>\n\n		<ion-item>\n\n			<ion-label *ngIf ="deliveryType == \'home\'"> Cash on Delivery</ion-label>\n\n			<ion-label *ngIf ="deliveryType == \'pick\'"> Cash on Pickup</ion-label>\n\n			<ion-radio item-left value="cash"></ion-radio>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label> Pay Online</ion-label>\n\n			<ion-radio item-left value="card"></ion-radio>\n\n		</ion-item>\n\n	</ion-list>\n\n	\n\n\n\n	<div *ngIf = "paymentType == \'card\' ">\n\n		<ion-list *ngIf = "currentCustomer && currentCustomer.cardinfo" class="cardRadio" radio-group [(ngModel)]="chooseCard" (ionChange) = "crdType()">\n\n			<ion-row ><strong>Your Cards</strong></ion-row>\n\n			<ion-row *ngFor = "let card of currentCustomer.cardinfo; let i = index; ">\n\n				<ion-item>\n\n					<ion-label>\n\n						<p text-capitalize col-12 class="whiteSpaceInitial paddingVertical0-5vh"><strong>Card Type : </strong>{{card.cardtype}}<img class="cardImages" [src]="cardImage(card.cardtype)"></p>\n\n                        <p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Card No : </strong>{{card.cardnumber}}</p>\n\n						<!-- <p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Name on Card : </strong>{{card.fname}} {{card.lname}}</p>\n\n						<p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Address : </strong>{{card.address}}</p>\n\n						<p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Zip : </strong>{{card.zip}}</p>\n\n                        <p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Expiry Month : </strong>{{card.expirymonth}}</p>\n\n                        <p class="whiteSpaceInitial paddingVertical0-5vh"><strong>Expiry Year : </strong>{{card.expiryyear}}</p> -->\n\n					</ion-label>\n\n					<ion-radio item-left [value]="i"></ion-radio>\n\n				</ion-item>\n\n				<!-- <form *ngIf = "cardSelected == i" padding-horizontal role="form" [formGroup]="cardCvvForm">\n\n					<ion-row>\n\n						<ion-col col-12 class="cvvRow">\n\n							<strong>Please Enter CVV :</strong> &nbsp;&nbsp;&nbsp;&nbsp;\n\n							<ion-input *ngIf = "currentCustomer.cardinfo.length > 0 && chooseCard != \'new\'" class = "cvvNo" maxlength="3" (keyup)="enterCVV($event)" minlength="3" formControlName="cvv" type="text" placeholder="CVV"></ion-input>\n\n						</ion-col>\n\n					</ion-row>\n\n				</form> -->\n\n			</ion-row>\n\n\n\n\n\n			<ion-row class="width100" *ngIf = "currentCustomer.cardinfo.length == 0">\n\n				<ion-col>No Card Saved!</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-item>\n\n				<ion-label><strong>Enter New Card</strong></ion-label>\n\n				<ion-radio item-left value="new"></ion-radio>\n\n			</ion-item>\n\n		</ion-list>\n\n\n\n		<ion-list *ngIf = "chooseCard == \'new\'" padding class = "bgLightGreen">\n\n	        <form role="form" [formGroup]="cardForm" (ngSubmit)="addCard()" class="addCardForm">\n\n	            <ion-label><strong>Card Number</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input class = "cardNo" (keyup)="addSpace($event)" maxlength="19" formControlName="cardnumber" type="tel" placeholder="Card Number"></ion-input>\n\n	                <ion-input class = "cvvNo" maxlength="3" minlength="3" formControlName="cvv" type="tel" placeholder="CVV"></ion-input>\n\n	            </ion-row>\n\n\n\n	            <ion-row *ngIf="formErrors.cardnumber"  class="cardNoError">\n\n	            	{{ formErrors.cardnumber }}\n\n	            </ion-row>\n\n\n\n	            \n\n	            <ion-label><strong>First Name</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input formControlName="fname" type="text" placeholder="First Name "></ion-input>\n\n				</ion-row>\n\n				\n\n				<ion-label><strong>Last Name</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input formControlName="lname" type="text" placeholder="Last Name "></ion-input>\n\n				</ion-row>\n\n				<ion-label><strong>City </strong> <small>(not Required)</small> </ion-label>\n\n	            <ion-row>\n\n	                <ion-input  formControlName="city" type="text" placeholder="City Name"></ion-input>\n\n				</ion-row>\n\n				<ion-row *ngIf="formErrors.city"  class="cardNoError">\n\n	            	{{ formErrors.city }}\n\n	            </ion-row>\n\n				<ion-label><strong>State</strong> <small>(not Required)</small></ion-label>\n\n	            <ion-row>\n\n	                <ion-input  formControlName="state" type="text" placeholder="State Name"></ion-input>\n\n				</ion-row>\n\n				<ion-row *ngIf="formErrors.state"  class="cardNoError">\n\n	            	{{ formErrors.state }}\n\n	            </ion-row>\n\n				<ion-label><strong>Address</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input  formControlName="address" type="text" placeholder="Address"></ion-input>\n\n				</ion-row>\n\n				<ion-row *ngIf="formErrors.address"  class="cardNoError">\n\n	            	{{ formErrors.address }}\n\n	            </ion-row>\n\n				<ion-label><strong>Zip</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input maxlength="9" formControlName="zip" type="text" placeholder="Zip"></ion-input>\n\n				</ion-row>\n\n				<ion-row *ngIf="formErrors.zip"  class="cardNoError">\n\n	            	{{ formErrors.zip }}\n\n	            </ion-row>\n\n<!-- <ion-label><strong>Name on Card</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input formControlName="nameoncard" type="text" placeholder="Name on Card"></ion-input>\n\n	            </ion-row> -->\n\n	            \n\n	            <ion-row class= "expDateRow">\n\n	                <ion-label no-padding><strong>Expiry Date</strong></ion-label>\n\n	                <ion-select formControlName="expirymonth" (ionChange) = "choose(\'month\')">\n\n	                    <ion-option *ngFor = "let mnth of month" [value] = "mnth">{{mnth}}</ion-option>\n\n	                </ion-select>\n\n	                <ion-select formControlName="expiryyear" (ionChange) = "choose(\'year\')">\n\n	                    <ion-option *ngFor = "let yr of year" [value] = "yr">{{yr}}</ion-option>\n\n	                </ion-select>\n\n	            </ion-row>\n\n	            \n\n	            <!-- <ion-label><strong>City</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input formControlName="city" type="text" placeholder="Enter city"></ion-input>\n\n	            </ion-row>\n\n	            \n\n	            <ion-label><strong>Postalcode</strong></ion-label>\n\n	            <ion-row>\n\n	                <ion-input formControlName="postalcode" type="text" placeholder="Enter Postalcode"></ion-input>\n\n	            </ion-row> -->\n\n\n\n				<button ion-button full [disabled]="!cardForm.valid " *ngIf="!generatingToken"> <span > Add Card </span></button>\n\n	        </form>\n\n			<button ion-button full style="background-color:gray !important"  *ngIf="generatingToken"> <span > Loading !!!</span></button>\n\n	    </ion-list>\n\n	</div>\n\n\n\n	<button ion-button full  [disabled]="checkDisabled()" (click)="proceedToThank()">Proceed</button>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\cart\checkout.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */]])
], CheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let FilterService = class FilterService {
    constructor(http) {
        this.http = http;
        this.allKithcen = [];
        this.filterKitchen = [];
        this.filterObj = {};
        this.filterIsApplied = false;
    }
    getAllKitchen() {
        return this.allKithcen;
    }
    getFilterKitchen() {
        return this.filterKitchen;
    }
    getFilterObj() {
        return this.filterObj;
    }
    setAllKitchen(kitchens) {
        this.allKithcen = kitchens;
    }
    setFilterKitchen(filterKitchen) {
        this.filterKitchen = filterKitchen;
    }
    setisApplied(bool) {
        this.filterIsApplied = bool;
    }
    setFilterObj(filterObj) {
        console.log(filterObj);
        this.filterObj = filterObj;
    }
};
FilterService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], FilterService);

//# sourceMappingURL=filter.service.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__review_give_review__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/


let OrderDetailPage = class OrderDetailPage {
    constructor(navCtrl, toastCtrl, ms1Service, ms4Service, alertCtrl, modalCtrl, events, loadingCtrl, navParams, afd) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.ms1Service = ms1Service;
        this.ms4Service = ms4Service;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.afd = afd;
        this.selectedOrder = {};
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.firestore = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref('/orders');
        this.datesArray = [];
        this.firebaseOrders = [];
        /*this.tempSelectedOrder = navParams.get('item');*/
        this.selectedOrder = navParams.get('item');
        if (this.selectedOrder.deliveryCharges && this.selectedOrder.ordertype == 'pick') {
            delete this.selectedOrder['deliveryCharges'];
        }
        this.getPreviousRating('onload');
        console.log("this is called");
        this.getTaxAmmount();
        // this.getStage();
        if (typeof this.selectedOrder['driverDetail'] != 'undefined') {
            this.getDriver(this.selectedOrder['driverDetail']['_id']);
        }
        /*if (this.selectedOrder.package && this.selectedOrder.package.length > 0) {
            this.minDate(this.selectedOrder.package);
        }*/
        this.resId = this.selectedOrder['restaurantid'];
        this.getKitchen();
    }
    getPreviousRating(type) {
        var obj = { "orderId": this.selectedOrder._id, "customerId": this.selectedOrder['customerid'] };
        this.ms4Service.checkRestroRating(obj).subscribe((presetRating) => {
            if (!presetRating.error) {
                if (presetRating.message.length > 0) {
                    this.rating = presetRating.message[0];
                    this.avgRating = this.rating['average'];
                    if (type == 'whenrated') {
                        this.changeFirebaseOrderStatus('rated', 'any');
                    }
                }
            }
        }, (err) => {
            this.getToast('Unable to load rating. Please check your Internet connection.');
        });
    }
    getTaxAmmount() {
        if (typeof this.selectedOrder['discount'] != 'undefined') {
            this.taxAmmount = (this.selectedOrder['subtotal'] + this.selectedOrder['deliveryCharges'] - this.selectedOrder['discount']) * (this.selectedOrder['tax'] / 100);
        }
        else {
            console.log("i am here");
            if (this.selectedOrder['deliveryCharges']) {
                this.taxAmmount = (this.selectedOrder['subtotal'] + this.selectedOrder['deliveryCharges']) * (this.selectedOrder['tax'] / 100);
                console.log(this.taxAmmount, (this.selectedOrder['subtotal'] + this.selectedOrder['deliveryCharges']), this.selectedOrder['deliveryCharges']);
            }
            else {
                this.taxAmmount = (this.selectedOrder['subtotal']) * (this.selectedOrder['tax'] / 100);
            }
        }
    }
    getStage(orderStatus) {
        //   let orderStatus = this.order.status;
        if (orderStatus == 'received') {
            this.stage = 1;
            return 1;
        }
        if (orderStatus == 'accepted') {
            this.stage = 2;
            return 2;
        }
        if (orderStatus == 'completed' || orderStatus == 'driverrejected') {
            this.stage = 3;
            return 3;
        }
        if (orderStatus == 'driveraccepted') {
            this.stage = 4;
            return 4;
        }
        if (orderStatus == 'OnTheWayForFirstWeek') {
            return 5;
        }
        if (orderStatus == 'deliveryForFirstWeek') {
            return 6;
        }
        if (orderStatus == 'ontheway') {
            return 7;
        }
        if (orderStatus == 'delivered') {
            this.stage = 8;
            return 8;
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
                            status: 'delivered'
                        };
                        /*if (this.orderDetail['package'].length == 0) {
                          obj['status'] = 'delivered';
                        }*/
                        this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
                            if (!data.error) {
                                //  this.getOrder();
                                // this.getStage();
                                this.changeFirebaseOrderStatus('delivered', 'pick');
                                this.presentToast('You have Received !');
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    }
    getDateForDaily(date) {
        if (date) {
            let Dailydate = date.split(" ");
            if (Dailydate.length > 0) {
                return Dailydate[0];
            }
        }
    }
    getTimeForDaily(date) {
        if (date) {
            let Dailydate = date.split(" ");
            if (Dailydate.length > 2) {
                return Dailydate[1] + ' ' + Dailydate[2];
            }
            else {
                return this.tConvert(Dailydate[1]);
            }
        }
    }
    tConvert(time) {
        // Check correct time format and split into components
        let hour = (time.split(':'))[0];
        let min = (time.split(':'))[1];
        let part = hour > 12 ? 'PM' : 'AM';
        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return (`${hour}:${min} ${part}`);
    }
    getMyDay(number) {
        if (number == '') {
            return '';
        }
        if (number == 1) {
            return 'Monday';
        }
        else if (number == 2) {
            return 'Tuesday';
        }
        else if (number == 3) {
            return 'Wednesday';
        }
        else if (number == 4) {
            return 'Thursday';
        }
        else if (number == 5) {
            return 'Friday';
        }
        else if (number == 6) {
            return 'Saturday';
        }
        else if (number == 0) {
            return 'Sunday';
        }
    }
    getTime(time) {
        return __WEBPACK_IMPORTED_MODULE_6_moment___default()(time, 'hh:mm').format('LT');
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
        };
        if (this.selectedOrder['items'].length == 0 && this.selectedOrder['combo'].length == 0) {
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
                            this.presentToast('You are on the way');
                        }
                        this.changeFirebaseOrderStatus(status, 'pick');
                        if (typeof this.fromNoti == 'undefined' || this.fromNoti != 'noti') {
                            //this.navCtrl.pop();
                        }
                    }
                    else {
                        this.presentToast('Unable to update. Please try again!');
                    }
                }, (err) => {
                    this.presentToast('Unable to Update status. Please check your Internet connection!');
                });
            }
            else {
                loading.dismiss();
                this.presentToast('Unable to fetch data. Please try again!');
            }
        }, (err) => {
            this.presentToast('Unable to Update status. Please check your Internet connection!');
        });
    }
    getPkgStatus(detail) {
        let date = new Date(detail.date);
        let currentDate = new Date();
        let dateDate = currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
        if (detail.date == dateDate) {
            if (detail.status) {
                return 0;
            }
            else {
                return 1;
            }
        }
        else {
            var dateTime = date.getTime();
            var currentDateTime = currentDate.getTime();
            let dayDiff;
            if (currentDateTime > dateTime) {
                if (detail.status) {
                    return 0;
                }
                else {
                    return 3;
                }
            }
            else {
                return 2;
            }
        }
    }
    getDriver(id) {
        this.ms1Service.getDriver(id).subscribe((data) => {
            if (!data.error && data.message != null && data.message != '') {
                this.driver = data.message;
                if (this.selectedOrder['status'] != 'delivered') {
                    if (typeof this.driver['lat'] != 'undefined' && this.driver['lat'] != null && typeof this.selectedOrder['fulladdress'].lat != 'undefined' && this.selectedOrder['fulladdress'].lat != '') {
                        setTimeout(() => {
                            this.loadMap();
                        }, 1000);
                    }
                }
            }
        }, (err) => {
            this.getToast('Unable to load driver detail. Please check your Internet connection.');
        });
    }
    getKitchen() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ms1Service.getOne(this.resId).subscribe((data) => {
            if (!data.error && data.message != null && data.message != '') {
                this.kitchen = data.message;
                this.getKitchenOwner(data.message['ownerId']);
                loading.dismiss();
            }
            else {
                loading.dismiss();
                this.getToast('Unable to load Kitchen Detail!');
            }
        });
    }
    getKitchenOwner(id) {
        this.ms1Service.getOneOwner(id).subscribe((data) => {
            if (!data.error) {
                this.kitchenOwner = data.message;
            }
        });
    }
    checkRatingPresent() {
        if (typeof this.rating == 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    minDate(pkg) {
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
        let newStartDate = enddate[2] + '-' + enddate[0] + '-' + enddate[1];
        return newStartDate;
    }
    selectedDate(event, pkg, index) {
        /*{month: 12, day: 1, year: 2017}*/
        /*event.day = event.day > 9 ? event.day : '0' + event.day;
        event.month = event.month > 9 ? event.month : '0' + event.month;*/
        let date = event.month + '/' + event.day + '/' + event.year;
        let obj = { 'pkgId': pkg._id, 'date': date.toString(), 'index': index };
        if (typeof this.displayPkg != 'undefined') {
            let indx = this.displayPkg.findIndex(mn => mn.pkgId == pkg._id && mn.index == index);
            if (indx > -1) {
                this.displayPkg.splice(indx, 1);
                this.displayPkg.push(obj);
            }
            else {
                this.displayPkg.push(obj);
            }
        }
        else {
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
    restroImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res1.jpg";
        }
        return imgPath;
    }
    itemImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res2.jpg";
        }
        return imgPath;
    }
    cancelOrder() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        var obj = {
            id: this.selectedOrder._id,
            status: 'cancelled'
        };
        this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
            console.log("data => ", data);
            if (!data.error) {
                this.changeFirebaseOrderStatus('cancelled', 'any');
                setTimeout(() => {
                    this.loading.dismiss();
                }, 100);
                this.getOrder();
            }
            /*this.navCtrl.pop();*/
        }, (err) => {
            this.getToast('Unable to Cancel order! Please check your Internet connection.');
        });
    }
    changeFirebaseOrderStatus(type, ordertype) {
        let itemRef = this.afd.object('orders');
        var count = 0;
        console.log('afd', '453');
        itemRef.snapshotChanges().subscribe(action => {
            let arr = action.payload.val();
            let pushArr = [];
            for (var k in arr) {
                if (arr.hasOwnProperty(k)) {
                    pushArr.push({ 'key': k, 'orderDetail': arr[k] });
                }
            }
            console.log('465');
            this.firebaseOrders = pushArr;
            console.log('465  FireBAseORder');
        });
        setTimeout(() => {
            if (this.firebaseOrders && this.firebaseOrders.length > 0) {
                let indx = this.firebaseOrders.findIndex((mn) => mn.orderDetail['orderID'] == this.selectedOrder['_id']);
                if (indx > -1) {
                    /*if (typeof this.firebaseOrders[indx]['orderDetail'].count == 'undefined' || this.firebaseOrders[indx]['orderDetail'].count == null) {
                        count = 0
                    }else{
                        count = this.firebaseOrders[indx]['orderDetail'].count + 1;
                    }*/
                    console.log('479', this.firebaseOrders[indx]['key']);
                    this.updateFirebaseOrderStatus(this.firebaseOrders[indx]['key'], type, ordertype);
                }
            }
        }, 5000);
    }
    updateFirebaseOrderStatus(key, type, ordertype) {
        let obj = { orderStatus: type };
        if (type == 'driveraccepted') {
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
        }
        else if (type == 'rated') {
            obj['type'] = 'rated';
            obj['orderID'] = this.selectedOrder._id;
            obj['restaurantid'] = this.kitchen._id;
        }
        else {
            obj['type'] = 'item';
            obj['orderID'] = this.selectedOrder._id;
        }
        console.log('afd', '500', obj);
        this.afd.list(this.firestore).update(key, obj).then(() => {
            console.log('Order Updated');
        });
    }
    getOrder() {
        this.ms4Service.getOneOrder(this.selectedOrder._id).subscribe((data) => {
            //    this.loading.dismiss();
            if (!data.error) {
                let customer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
                if (customer != null && typeof this.kitchenOwner != 'undefined') {
                    var obj1 = { customeremail: customer.email, order: data.message, kitchenemail: this.kitchenOwner.email };
                    this.ms1Service.orderCancelMail(obj1).subscribe((data) => {
                        console.log("data mailsent");
                    });
                }
                this.selectedOrder = data.message;
                // this.getStage();
                this.getTaxAmmount();
            }
        });
    }
    reorder() {
        if (JSON.parse(localStorage.getItem('cartinfo'))) {
            if (JSON.parse(localStorage.getItem('cartinfo'))['items'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['combo'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['package'].length > 0) {
                let prompt = this.alertCtrl.create({
                    title: "Delete Cart?",
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
                                this.addToCart();
                            }
                        }
                    ]
                });
                prompt.present();
            }
            else {
                this.addToCart();
            }
        }
        else {
            this.addToCart();
        }
    }
    calculateSubTotal() {
        let total = 0;
        if (this.selectedOrder.package.length > 0) {
            for (var i = 0; i < this.selectedOrder.package.length; i++) {
                total = this.selectedOrder['subtotal'] - parseFloat(this.selectedOrder.package[i]['packageprice']);
            }
            return total;
        }
        else {
            total = this.selectedOrder['subtotal'];
            return total;
        }
    }
    addToCart() {
        let total = this.calculateSubTotal();
        let obj = {};
        obj = { "customerid": this.selectedOrder.customerid, "subtotal": total, "restaurantid": this.selectedOrder.restaurantid, "name": this.selectedOrder.name, "items": this.selectedOrder.items, "combo": this.selectedOrder.combo, "package": [] };
        if (typeof this.selectedOrder['currency'] != 'undefined') {
            obj['currency'] = this.selectedOrder['currency'];
        }
        else {
            if (typeof this.kitchen['currency'] != 'undefined') {
                obj['currency'] = this.kitchen['currency'];
            }
            else {
                obj['currency'] = '';
            }
        }
        localStorage.removeItem('cartinfo');
        localStorage.setItem('cartinfo', JSON.stringify(obj));
        this.events.publish('cart:item', obj, Date.now());
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
    }
    doReview() {
        this.presentProfileModal();
    }
    presentProfileModal() {
        let profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__review_give_review__["a" /* GiveReviewPage */], {
            kitchenId: this.resId,
            /*rating: this.rating,*/
            order: this.selectedOrder
        });
        profileModal.onDidDismiss(data => {
            this.getPreviousRating('whenrated');
        });
        profileModal.present();
    }
    changeDailyStatus(status, orderid) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        let obj = {
            id: orderid,
        };
        let deliverdAllPackages = true;
        for (let i = 0; i < this.selectedOrder.items.length; i++) {
            this.selectedOrder.items[0].orderStatus = status;
        }
        for (let i = 0; i < this.selectedOrder.package.length; i++) {
            if (this.selectedOrder.package[i].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
                break;
            }
        }
        if (this.selectedOrder.items && this.selectedOrder.items.length > 0) {
            if (this.selectedOrder.items[0].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
            }
        }
        if (deliverdAllPackages) {
            obj.status = 'delivered';
            console.log("Delivery NOtificaiotn ");
            this.changeFirebaseOrderStatus('delivered', 'pick');
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
    changePackageStatus(status, orderid, pkg) {
        pkg.orderStatus = status;
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        let obj = {
            id: orderid,
            package: this.selectedOrder.package
        };
        let deliverdAllPackages = true;
        for (let i = 0; i < this.selectedOrder.package.length; i++) {
            if (this.selectedOrder.package[i].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
                break;
            }
        }
        if (this.selectedOrder.items && this.selectedOrder.items.length > 0) {
            if (this.selectedOrder.items[0].orderStatus == 'delivered') {
            }
            else {
                deliverdAllPackages = false;
            }
        }
        if (deliverdAllPackages) {
            obj.status = 'delivered';
            this.changeFirebaseOrderStatus('delivered', 'pick');
            this.selectedOrder.status = 'delivered';
        }
        this.ms4Service.updateCustomersOrdersStatus(obj).subscribe((data) => {
            loading.dismiss();
            if (!data.error) {
            }
            this.ms4Service.getOneOrder(this.selectedOrder._id).subscribe((data) => {
                //    this.loading.dismiss();
                if (!data.error) {
                    let customer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
                    if (customer != null && typeof this.kitchenOwner != 'undefined') {
                        var obj1 = { customeremail: customer.email, order: data.message, kitchenemail: this.kitchenOwner.email };
                    }
                    this.selectedOrder = data.message;
                    // this.getStage();
                    this.getTaxAmmount();
                }
            });
        });
    }
    checkOnAlter(status, orderid, pkg) {
        let mealPkg = {};
        let mealPkgDate = pkg['dayandmenus'][0]['date'];
        let date = new Date();
        let today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let today2 = new Date(mealPkgDate);
        if (pkg.status == 'delivered') {
            this.presentToast('Already marked Delivered');
        }
        else {
            if (today1 >= today2) {
                let title = '';
                let message = '';
                if (status == 'ontheway') {
                    title = 'On The Way';
                    message = 'Are you going to pick food from chef?';
                }
                else if (status == 'OnTheWayForFirstWeek') {
                    title = 'On The Way';
                    message = 'Are you going to pick food from chef?';
                }
                else {
                    title = 'Food Picked ';
                    message = 'Have you picked your food?';
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
                                this.changePackageStatus(status, orderid, pkg);
                            }
                        }
                    ]
                });
                prompt.present();
            }
            else {
                if (status == 'ontheway') {
                    this.presentToast(`You Cannot On the way items it is for future dates!`);
                }
                else {
                    this.presentToast(`You Cannot Picked  items it is for future dates!`);
                }
            }
        }
    }
    checkOnDaily(status, orderid) {
        console.log();
        let mealPkg = this.selectedOrder.ordertiming.datetime.split(" ");
        //let mealPkgDate = pkg['dayandmenus'][0]['date'];
        let date = __WEBPACK_IMPORTED_MODULE_6_moment___default()(new Date);
        // let today1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let today2 = new Date(mealPkg[0]);
        let today3 = __WEBPACK_IMPORTED_MODULE_6_moment___default()(today2);
        let differenceBetweenDays = __WEBPACK_IMPORTED_MODULE_6_moment___default.a.duration(today3.diff(date));
        console.log(date, today2, this.selectedOrder.items[0], differenceBetweenDays);
        if (this.selectedOrder.items[0].orderStatus == 'delivered') {
            this.presentToast('Already marked Delivered');
        }
        else {
            if (differenceBetweenDays._data.years < 1 && differenceBetweenDays._data.months < 1 && differenceBetweenDays._data.days < 1) {
                let title = '';
                let message = '';
                if (status == 'ontheway') {
                    title = 'On The Way';
                    message = 'Are you going to pick food from chef?';
                }
                else if (status == 'OnTheWayForFirstWeek') {
                    title = 'On The Way';
                    message = 'Are you going to pick food from chef?';
                }
                else {
                    title = 'Food Picked';
                    message = 'Have you picked your food ?';
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
            }
            else {
                if (status == 'ontheway') {
                    this.presentToast(`You Cannot On the way items it is for future dates!`);
                }
                else {
                    this.presentToast(`You Cannot Picked  items it is for future dates!`);
                }
            }
        }
    }
    loadMap() {
        let mapOptions = {
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
            }
            else {
                window.alert('Unable to display Route on Map!');
            }
        });
        /*}*/
    }
};
OrderDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-orderdetail',template:/*ion-inline-start:"D:\OrderApp\src\pages\order\orderdetail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title *ngIf = "selectedOrder._id">\n\n            Order Detail - {{selectedOrder._id.substr(18,6)}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n\n\n    <ion-item class= "padding0 whiteDiv" *ngIf = "kitchen">\n\n        <ion-thumbnail item-start>\n\n            <img style="object-fit:cover" [src]="restroImage(kitchen.image[0])">\n\n        </ion-thumbnail>\n\n        <h3 class="colorGray"><strong>{{kitchen.restaurantname}}</strong></h3>\n\n        <ion-row class="font2vh">{{kitchen.city}}, {{kitchen.country}}</ion-row>\n\n        <ion-row class="font2vh">{{selectedOrder.created_at | date:\'medium\' }}</ion-row>\n\n    </ion-item>\n\n\n\n    <ion-row class= "whiteDiv padding10px" *ngFor = "let package of selectedOrder.package; let i = index ">\n\n        <ion-col col-12 class="padding5-0px">\n\n            <strong>Package Name : {{package.name}} </strong>\n\n        </ion-col>\n\n        \n\n        <ion-row class="width100 colorLightGray" *ngIf = "selectedOrder.status != \'cancelled\' && selectedOrder.status != \'rejected\'">\n\n            <ion-col [ngClass] = "1 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;\n\n                <span *ngIf = "selectedOrder.paymenttype == \'cash\'">Order Placed</span>\n\n                <span *ngIf = "selectedOrder.paymenttype == \'card\'">Payment Received</span>\n\n            </ion-col>\n\n            <ion-col [ngClass] = "2 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Order Accepted</ion-col>\n\n            <ion-col [ngClass] = "2 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Preparing your Order</ion-col>\n\n            <ion-col  *ngIf="selectedOrder.ordertype == \'home\'" [ngClass] = "3 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Send Order Request for Driver</ion-col>\n\n            <ion-col  *ngIf="selectedOrder.ordertype == \'pick\'" [ngClass] = "3 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Order Prepared</ion-col> \n\n            <ion-col *ngIf="selectedOrder.ordertype == \'home\'" [ngClass] = "4 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Driver Accepted Order Request\n\n            </ion-col>\n\n            <ion-col *ngIf="package.type == \'fixed\' && selectedOrder.delvierySlotsWeek.dtype == \'Twice\'" [ngClass] = "5 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;On the Way\n\n            </ion-col>\n\n            <ion-col *ngIf="package.type == \'fixed\' && selectedOrder.delvierySlotsWeek.dtype == \'Twice\' && selectedOrder.ordertype == \'pick\'" [ngClass] = "6 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;1st Week Order Picked\n\n            </ion-col>\n\n            <ion-col *ngIf="package.type == \'fixed\' && selectedOrder.delvierySlotsWeek.dtype == \'Twice\' && selectedOrder.ordertype == \'home\'" [ngClass] = "6 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;1st Week Order Delivered\n\n            </ion-col>\n\n            <ion-col  [ngClass] = "7 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;On the Way\n\n            </ion-col>\n\n\n\n            <ion-col *ngIf=" selectedOrder.ordertype == \'pick\'"  [ngClass] = "8 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Order Picked\n\n            </ion-col>\n\n            <ion-col *ngIf=" selectedOrder.ordertype == \'home\'"  [ngClass] = "8 <= getStage(package.orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Order Delivered\n\n            </ion-col>\n\n\n\n        </ion-row>\n\n        <ion-row *ngIf="selectedOrder.ordertype == \'pick\' &&  selectedOrder.status != \'cancelled\' && selectedOrder.status != \'rejected\'">\n\n            <button class="acceptButton" *ngIf="(package.orderStatus == \'completed\') && (package.type ==\'flexible\') " ion-button (click)="checkOnAlter(\'ontheway\', selectedOrder._id,package)">On The Way</button>\n\n            <button class="acceptButton" *ngIf="(package.orderStatus == \'completed\' && package.type ==\'fixed\'  && selectedOrder.delvierySlotsWeek && selectedOrder.delvierySlotsWeek.dtype == \'Once\') || (package.orderStatus == \'deliveryForFirstWeek\')" ion-button (click)="checkOnAlter(\'ontheway\', selectedOrder._id,package)">On The Way</button>\n\n            <button class="acceptButton" *ngIf="package.orderStatus == \'completed\' && package.type ==\'fixed\'  && selectedOrder.delvierySlotsWeek && selectedOrder.delvierySlotsWeek.dtype == \'Twice\'" ion-button (click)="checkOnAlter(\'OnTheWayForFirstWeek\', selectedOrder._id,package)">On The Way </button>\n\n            <button class="acceptButton" *ngIf="package.orderStatus == \'ontheway\'  "  ion-button (click)="checkOnAlter(\'delivered\', selectedOrder._id,package)">Picked</button>\n\n            <button class="acceptButton" *ngIf="package.orderStatus == \'OnTheWayForFirstWeek\'" ion-button (click)="checkOnAlter(\'deliveryForFirstWeek\', selectedOrder._id,package)">Picked</button>\n\n        </ion-row>\n\n        <ion-col col-12 *ngIf = "selectedOrder.status == \'rejected\' || selectedOrder.status == \'cancelled\'">\n\n            Order <span text-capitalize>{{selectedOrder.status}}</span>\n\n        </ion-col>\n\n    </ion-row>\n\n\n\n\n\n\n\n    <ion-row class= "whiteDiv padding10px" *ngIf= " selectedOrder.items.length > 0 " >\n\n        <ion-col col-12 class="padding5-0px">\n\n            <strong> Daily Menu Items </strong>\n\n        </ion-col>\n\n        \n\n        <ion-row class="width100 colorLightGray" *ngIf = "selectedOrder.status != \'cancelled\' && selectedOrder.status != \'rejected\'">\n\n            <ion-col [ngClass] = "1 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;\n\n                <span *ngIf = "selectedOrder.paymenttype == \'cash\'">Order Placed</span>\n\n                <span *ngIf = "selectedOrder.paymenttype == \'card\'">Payment Received</span>\n\n            </ion-col>\n\n            <ion-col [ngClass] = "2 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Order Accepted</ion-col>\n\n            <ion-col [ngClass] = "2 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Preparing your Order</ion-col>\n\n            <ion-col  *ngIf="selectedOrder.ordertype == \'home\'" [ngClass] = "3 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Send Order Request for Driver</ion-col>\n\n            <ion-col  *ngIf="selectedOrder.ordertype == \'pick\'" [ngClass] = "3 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Order Prepared</ion-col> \n\n            <ion-col *ngIf="selectedOrder.ordertype == \'home\'" [ngClass] = "4 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;Driver Accepted Order Request\n\n            </ion-col>\n\n        \n\n           \n\n            <ion-col  [ngClass] = "7 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' " col-12>&nbsp;On the Way\n\n            </ion-col>\n\n\n\n            <ion-col *ngIf="selectedOrder.ordertype == \'pick\'"  [ngClass] = "8 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' "    col-12>&nbsp;Order Picked\n\n            </ion-col>\n\n\n\n            <ion-col *ngIf="selectedOrder.ordertype == \'home\'"  [ngClass] = "8 <= getStage(selectedOrder.items[0].orderStatus) ? \'greenBorder\' : \'grayBorder\' "    col-12>&nbsp;Order Delivered\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row *ngIf="selectedOrder.ordertype == \'pick\' &&  selectedOrder.status != \'cancelled\' && selectedOrder.status != \'rejected\'">\n\n            <button class="acceptButton" *ngIf="selectedOrder.items[0].orderStatus == \'completed\'" ion-button (click)="checkOnDaily(\'ontheway\', selectedOrder._id)">On The Way</button>\n\n            <button class="acceptButton" *ngIf="selectedOrder.items[0].orderStatus == \'ontheway\'"  ion-button (click)="checkOnDaily(\'delivered\', selectedOrder._id)">Picked</button>\n\n        </ion-row>\n\n        <ion-col col-12 *ngIf = "selectedOrder.status == \'rejected\' || selectedOrder.status == \'cancelled\'">\n\n            Order <span text-capitalize>{{selectedOrder.status}}</span>\n\n        </ion-col>\n\n    </ion-row>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    <ion-row *ngIf = "selectedOrder.status == \'delivered\'" class="whiteDiv">\n\n\n\n        <button *ngIf = "checkRatingPresent()" class="font2vh marginLeftAuto" ion-button full color="danger" (click) = "doReview()">Rate your Order</button>\n\n        \n\n        <ion-row *ngIf = "rating" class= "width100">\n\n            <ion-col col-12 text-center>\n\n                <rating class="orderPacking" [(ngModel)]="avgRating" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star"></rating>\n\n            </ion-col>\n\n            <ion-col *ngIf = "rating.review" col-12>{{rating.review}}</ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <!-- <ion-row class="whiteDiv">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Order Type :</strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><span *ngIf = "selectedOrder.ordertiming && selectedOrder.ordertiming.type == \'now\'">Order for Now</span><span *ngIf = "selectedOrder.ordertiming && selectedOrder.ordertiming.type == \'later\'">Pre Order for Later</span></ion-col>\n\n            <ion-col col-12 *ngIf = "selectedOrder.ordertiming && selectedOrder.ordertiming.datetime"><strong>When to deliver : </strong>{{selectedOrder.ordertiming.datetime | date : \'medium\'}}</ion-col>\n\n        </ion-row>\n\n    </ion-row> -->\n\n    <ion-row class="whiteDiv">\n\n    <ion-row class= "width100">\n\n        <ion-col col-12><strong>Payment Type : </strong>{{selectedOrder.paymenttype}}</ion-col>\n\n    </ion-row>\n\n    <ion-row class= "width100">\n\n        <ion-col col-12><strong>Delivery Type : </strong><span text-capitalize><span text-capitalize *ngIf="selectedOrder.ordertype == \'pick\'">Take away</span><span text-capitalize *ngIf="selectedOrder.ordertype == \'home\'">Home delivery</span></span></ion-col>\n\n    </ion-row>\n\n</ion-row>\n\n    <!-- <hr class="width100 height2px">\n\n    <ion-row padding-horizontal class= "width100">\n\n        <ion-col col-12 text-capitalize>{{orderDetail.paymenttype}}</ion-col>\n\n    </ion-row> -->\n\n    <ion-row class="whiteDiv" *ngIf="(selectedOrder.ordertype == \'pick\') && ( selectedOrder.status == \'completed\' || selectedOrder.status == \'driveraccepted\') && (selectedOrder.status != \'delivered\') ">\n\n        <ion-row class= "width100" *ngIf ="selectedOrder.ordertype == \'pick\' &&  selectedOrder.status == \'completed\'">\n\n            <ion-col col-12 text-capitalize>\n\n                <strong>Order Status : </strong>\n\n                <span *ngIf = "selectedOrder.ordertype == \'pick\' &&  selectedOrder.status == \'completed\'">Order Prepared!&nbsp;(Waiting to pick your food)</span>\n\n              \n\n            </ion-col>\n\n        </ion-row>\n\n\n\n\n\n\n\n        <!-- <ion-row class= "width100" *ngIf="(selectedOrder.ordertype == \'pick\') && ( selectedOrder.status == \'completed\' || selectedOrder.status == \'driveraccepted\') ">\n\n            <hr class="width100 height2px">\n\n            <ion-col col-12>\n\n                <button class="acceptButton" *ngIf="selectedOrder.ordertype == \'pick\' &&  selectedOrder.status == \'completed\'" ion-button (click)="changeStatus(\'driveraccepted\', selectedOrder._id)">On the Way</button>\n\n                <button class="acceptButton" *ngIf="selectedOrder.ordertype == \'pick\' &&  selectedOrder.status == \'driveraccepted\'" ion-button (click)="completeStatus()">Mark as Received</button>\n\n            </ion-col>\n\n        </ion-row> -->\n\n\n\n\n\n\n\n\n\n\n\n    </ion-row>\n\n\n\n\n\n    <ion-row class="whiteDiv" *ngIf = "selectedOrder.driverDetail">\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong>Driver Detail :</strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col *ngIf = "selectedOrder.driverDetail.name" col-12 text-capitalize><strong>Name : </strong>{{selectedOrder.driverDetail.name}}</ion-col>\n\n            <ion-col col-12 *ngIf = "selectedOrder.driverDetail.phone"><strong>Contact No. : </strong>{{selectedOrder.driverDetail.phone}}</ion-col>\n\n            <ion-col *ngIf = "selectedOrder.driverDetail.vehicleType" col-12 text-capitalize><strong>Vehicle Type : </strong>{{selectedOrder.driverDetail.vehicleType}}</ion-col>\n\n            <ion-col *ngIf = "selectedOrder.driverDetail.vehicleName" col-12 text-capitalize><strong>Vehicle Name : </strong>{{selectedOrder.driverDetail.vehicleName}}</ion-col>\n\n            <ion-col col-12 *ngIf = "selectedOrder.driverDetail.vehicleNo"><strong>Vehicle Number : </strong>{{selectedOrder.driverDetail.vehicleNo}}</ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <ion-row *ngIf = "selectedOrder.items && selectedOrder.items.length > 0" class = "whiteDiv">\n\n        <ion-row class = "width100">\n\n            <strong>Daily Menu Items</strong>\n\n            <span *ngIf = "selectedOrder.menuStatus &&  selectedOrder.ordertype == \'pick\'" class="deliveredClass"> Picked</span>\n\n            <span *ngIf = "selectedOrder.menuStatus &&  selectedOrder.ordertype == \'home\'" class="deliveredClass"> Delivered</span>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row *ngFor = "let item of selectedOrder.items let i = index; " class="width100">\n\n            <ion-col class="">\n\n                <strong>{{i+1}})</strong> {{item.name}}\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <strong> X {{item.qty}} </strong>\n\n            </ion-col>\n\n            <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                <span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}}</span> {{item.qty * item.price | number : \'1.2-2\'}}\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <ion-row *ngIf = "selectedOrder.combo && selectedOrder.combo.length > 0" class = "whiteDiv">\n\n        <ion-row class = "width100">\n\n            <strong>Combo Items</strong>\n\n            <span *ngIf = "selectedOrder.menuStatus && selectedOrder.ordertype == \'pick\'" class="deliveredClass"> Picked</span>\n\n            <span *ngIf = "selectedOrder.menuStatus && selectedOrder.ordertype == \'home\'" class="deliveredClass"> Delivered</span>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row *ngFor = "let combo of selectedOrder.combo; let i = index; " class="width100 divHighlighted">\n\n            <ion-row class="width100">\n\n                <ion-col class="">\n\n                    <strong>{{i+1}})</strong> {{combo.name}}\n\n                </ion-col>\n\n                <ion-col col-2>\n\n                    <strong> X {{combo.qty}} </strong>\n\n                </ion-col>\n\n                <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                    <span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}}</span> {{combo.qty * combo.finalcomboprice | number : \'1.2-2\'}}\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row class="width100">\n\n                <ion-col col-4 class="whiteSpaceInitial" *ngFor = "let menus of combo.menuId">\n\n                    <ion-row class="itemImage comboMenuImage width100" [ngStyle]="{\'background-image\': \'url(\' + itemImage(menus.image) + \')\'}"></ion-row>\n\n                    <ion-row text-capitalize class = "font2vh bgWhite colorBlack width100">{{menus.name}}</ion-row>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n\n\n\n\n\n\n    <ion-row *ngIf = "selectedOrder.package && selectedOrder.package.length > 0" class = "whiteDiv">\n\n        <ion-row><strong> Package Items</strong></ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row *ngFor = "let pkg of selectedOrder.package; let i = index " class="width100 divHighlighted">\n\n            <ion-row class="width100">\n\n                <ion-col class="">\n\n                    <strong>{{i+1}})</strong> {{pkg.name}}\n\n                </ion-col>\n\n                <ion-col col-2>\n\n                    <strong> X {{pkg.qty}} </strong>\n\n                </ion-col>\n\n                <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                    <span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}}</span> {{pkg.qty * pkg.packageprice | number : \'1.2-2\'}}\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row class="width100">\n\n                <ion-col col-12>\n\n                    <strong>Package Duration</strong>\n\n                </ion-col>\n\n                <ion-col *ngIf = "pkg.type == \'fixed\'" col-12 padding-left class="colorLightGray">\n\n                    {{pkg.startdate | date : \'fullDate\'}} - {{pkg.enddate | date : \'fullDate\'}}\n\n                </ion-col>\n\n                <ion-col *ngIf = "pkg.type == \'flexible\'" col-12 padding-left class="colorLightGray">\n\n\n\n                    {{pkg.dayandmenus[0].date | date : \'fullDate\'}} - {{pkg.dayandmenus[pkg.dayandmenus.length-1].date | date : \'fullDate\'}}\n\n\n\n\n\n                    <!-- {{pkg.startdate | date : \'mediumDate\'}} - {{pkg.enddate | date : \'mediumDate\'}} -->\n\n                </ion-col>\n\n                <ion-col col-12>\n\n                   \n\n                        <strong *ngIf="pkg.orderStatus == \'delivered\' && selectedOrder.ordertype == \'pick\' ">Package Status : Picked</strong>\n\n                        <strong *ngIf="pkg.orderStatus == \'delivered\' && selectedOrder.ordertype == \'home\' ">Package Status : Delivered</strong>\n\n                        <strong *ngIf="pkg.orderStatus != \'delivered\'">Package Status : In Process</strong>\n\n                    </ion-col>\n\n            </ion-row>\n\n\n\n            <!-- <ion-row class="displayBlock width100">\n\n                <ion-label padding-horizontal class= "width100"><strong>Choose Date to view Items</strong></ion-label>\n\n                <ion-datetime class="maxWidth100 select-wp" [min]="minDate(pkg.dayandmenus[0].date)" [max]="minDate(pkg.dayandmenus[pkg.dayandmenus.length-1].date)" displayFormat="DDDD, MMM DD YYYY" pickerFormat="DD MM YYYY" (ionChange) = "selectedDate($event, pkg, i)"></ion-datetime> -->\n\n\n\n                <!-- <ion-datetime class="maxWidth100 select-wp" [min]="datesArray[i].start" [max]="datesArray[i].end" displayFormat="DDDD, MMM DD YYYY" pickerFormat="DD MM YYYY" (ionChange) = "selectedDate($event, pkg, i)"></ion-datetime> -->\n\n            <!-- </ion-row> -->\n\n\n\n            <div class="width100" *ngFor = "let dates of displayPkg">\n\n                <div *ngIf = "dates.pkgId == pkg._id && dates.index == i" class="width100">\n\n                    <div *ngFor = "let detail of pkg.dayandmenus" class="width100">\n\n                        <ion-row *ngIf = "detail.date == dates.date" class="width100">\n\n                            <ion-col col-12>\n\n                                <strong>Status : \n\n                                <!-- <span class="themeGreen" float-right *ngIf = "detail.status">Delivered</span>\n\n                                <span class="themeRed" float-right *ngIf = "!detail.status">Pending</span> --></strong>\n\n                                <span float-right class="themeGreen" *ngIf = "getPkgStatus(detail) == 0  && selectedOrder.ordertype == \'pick\'"><strong>Picked</strong></span>\n\n                                <span float-right class="themeGreen" *ngIf = "getPkgStatus(detail) == 0  && selectedOrder.ordertype == \'home\'"><strong>Delivered</strong></span>\n\n                                <span float-right class="themeRed" *ngIf = "getPkgStatus(detail) == 1 ">In Process</span>\n\n                                <span float-right class="colorGray" *ngIf = "getPkgStatus(detail) == 2 ">Pending</span>\n\n                                <span float-right class="themeRed" *ngIf = "getPkgStatus(detail) == 3 && selectedOrder.ordertype == \'pick\'"><strong>Not Picked Yet</strong></span>\n\n                                <span float-right class="themeRed" *ngIf = "getPkgStatus(detail) == 3 && selectedOrder.ordertype == \'home\'"><strong>Not Delivered Yet</strong></span>\n\n                            </ion-col>\n\n\n\n                            <ion-col col-4 class="whiteSpaceInitial" *ngFor = "let menus of detail.menuids">\n\n                                <img class="profile-img "  style="object-fit: cover;" width="100px" height="100px" [src]="itemImage(menus.image)">\n\n                                <ion-row text-capitalize class = "font2vh colorBlack bgWhite width100">{{menus.name}}</ion-row>\n\n                            </ion-col>\n\n                        </ion-row>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <ion-row *ngIf = "selectedOrder.addOnItem && selectedOrder.addOnItem.length > 0" class = "whiteDiv">\n\n        <ion-row><strong> Add-On Items</strong></ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row *ngFor = "let addOn of selectedOrder.addOnItem; let i = index " class="width100 divHighlighted">\n\n            <ion-row class="width100">\n\n                <ion-col class="">\n\n                    <strong>{{i+1}})</strong> {{addOn.name}}\n\n                </ion-col>\n\n                <ion-col col-2>\n\n                    <strong> X {{addOn.qty}} </strong>\n\n                </ion-col>\n\n                <ion-col text-right col-4 col-sm-3 class="colorLightGray paddingTop9px">\n\n                    <span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}}</span> {{addOn.qty * addOn.finalprice | number : \'1.2-2\'}}\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n\n\n    <ion-row class="whiteDiv" >\n\n        <ion-row class= "width100">\n\n            <ion-col col-12><strong  *ngIf="selectedOrder.ordertype == \'home\'" >Delivery Timings :</strong> <strong *ngIf="selectedOrder.ordertype == \'pick\'">Pickup Timings  </strong></ion-col>\n\n        </ion-row>\n\n        <hr class="width100 height2px">\n\n        <ion-row class= "width100">\n\n            <ion-col  *ngIf="selectedOrder.ordertiming && selectedOrder.ordertiming.datetime && selectedOrder.ordertiming.type" col-12 text-capitalize><strong>For Daily Items: </strong> Date : {{getDateForDaily(selectedOrder.ordertiming.datetime)}}  Timings : {{getTimeForDaily(selectedOrder.ordertiming.datetime)}}</ion-col>\n\n            <ion-col  *ngIf="selectedOrder.delvierySlot && selectedOrder.delvierySlot.deliveryTime" col-12 text-capitalize><strong>For Weekend Packages: </strong> Day : {{getMyDay(selectedOrder.delvierySlot.day)}}  Timings : {{getTime(selectedOrder.delvierySlot.deliveryTime)}}</ion-col>\n\n          \n\n            <ion-col col-12 *ngIf="selectedOrder.delvierySlotsWeek && selectedOrder.delvierySlotsWeek.deliveryFirstTime"><strong>For Weekly/Monthly Packages : </strong>Day {{getMyDay(selectedOrder.delvierySlotsWeek.Firstday)}} Time :  {{getTime(selectedOrder.delvierySlotsWeek.deliveryFirstTime)}}</ion-col>\n\n            <ion-col col-12 *ngIf="selectedOrder.delvierySlotsWeek && selectedOrder.delvierySlotsWeek.dtype == \'Twice\'  && selectedOrder.delvierySlotsWeek.deliverySecondTime"><strong>Second Delivery : </strong> Day : {{getMyDay(selectedOrder.delvierySlotsWeek.Secondday)}}  Time : {{getTime(selectedOrder.delvierySlotsWeek.deliverySecondTime)}}</ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n\n\n    <ion-row *ngIf = "selectedOrder.note" class = "whiteDiv">\n\n        <strong>Note : </strong> {{selectedOrder.note}}\n\n    </ion-row>\n\n\n\n    <ion-row class= "whiteDiv" *ngIf = "selectedOrder">\n\n        <ion-col *ngIf = "kitchen" col-12 no-padding class="padding5-0px">\n\n            <strong>{{kitchen.restaurantname}},</strong>\n\n        </ion-col>\n\n        <ion-col *ngIf = "kitchen" col-12 no-padding class="padding5-0px">\n\n            <strong>{{kitchen.city}}, {{kitchen.country}}</strong>\n\n        </ion-col>\n\n\n\n        <ion-row class="width100 colorLightGray">\n\n            <ion-col col-6>Total</ion-col>\n\n            <ion-col text-right><span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}} </span> {{selectedOrder.subtotal | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row *ngIf = "selectedOrder.discount" class="width100 colorLightGray">\n\n            <ion-col col-6>Discount &nbsp;<span class="font2vh" *ngIf = "selectedOrder.coupon && selectedOrder.coupon.type == \'Percent\'">({{selectedOrder.coupon.percentorpricevalue}} %)</span></ion-col>\n\n            <ion-col text-right><span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}} </span> {{selectedOrder.discount | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n     \n\n        <ion-row *ngIf = "selectedOrder.deliveryCharges" class="width100 colorLightGray">\n\n            <ion-col col-6>Delivery Charges</ion-col>\n\n            <ion-col text-right><span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}}</span> {{selectedOrder.deliveryCharges | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row class="width100 colorLightGray">\n\n            <ion-col col-6>Tax &nbsp;<span class="font2vh"> ({{selectedOrder.tax}} %) </span></ion-col>\n\n            <ion-col text-right><span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}} </span> {{taxAmmount | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n\n\n        <!-- <ion-row padding-horizontal class="width100 colorLightGray">\n\n            <ion-col col-6>GST</ion-col>\n\n            <ion-col text-right>AED 10</ion-col>\n\n        </ion-row> -->\n\n\n\n        <hr class="width100 height2px">\n\n\n\n        <ion-row class="width100 colorLightGray">\n\n            <ion-col col-6 text-right class="colorGray"><strong>Pay</strong></ion-col>\n\n            <ion-col text-right><span *ngIf = "selectedOrder.currency">{{selectedOrder.currency}} </span>{{selectedOrder.total | number : \'1.2-2\'}}</ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n\n\n    <ion-row class= "whiteDiv padding10px" *ngIf = "selectedOrder.status == \'delivered\'">\n\n        <button ion-button full class="font2vh themeRedBg" (click)="reorder()">Reorder</button>\n\n    </ion-row>\n\n\n\n    <ion-row class= "whiteDiv padding10px" *ngIf = "selectedOrder.status == \'received\'">\n\n        <button ion-button full class="font2vh themeRedBg" (click)="cancelOrder()">Cancel Order</button>\n\n    </ion-row>\n\n\n\n    <ion-row class="whiteDiv" *ngIf = "selectedOrder.driverDetail && selectedOrder.status != \'delivered\'">\n\n        <div id="map" style="width:100%;height:300px;"></div>\n\n    </ion-row>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"D:\OrderApp\src\pages\order\orderdetail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["AngularFireDatabase"]])
], OrderDetailPage);

//# sourceMappingURL=orderdetail.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 197;

/***/ }),

/***/ 242:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 242;

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const imageUrlupload = 'https://www.mealdaay.com:4024/upload';
/* unused harmony export imageUrlupload */

const url2 = 'https://www.mealdaay.com:4024/';
/* harmony export (immutable) */ __webpack_exports__["d"] = url2;

const url3 = 'https://www.mealdaay.com:4034/';
/* harmony export (immutable) */ __webpack_exports__["e"] = url3;

const imageUrl = 'https://www.mealdaay.com:4024/uploads/';
/* harmony export (immutable) */ __webpack_exports__["a"] = imageUrl;

const imageUrl2 = 'https://www.mealdaay.com:4004/uploads/';
/* unused harmony export imageUrl2 */

const url = 'https://www.mealdaay.com:4004/';
/* harmony export (immutable) */ __webpack_exports__["b"] = url;

const url1 = 'https://www.mealdaay.com:4014/';
/* harmony export (immutable) */ __webpack_exports__["c"] = url1;

const url4 = 'https://www.mealdaay.com:4044/';
/* harmony export (immutable) */ __webpack_exports__["f"] = url4;

// export const imageUrlupload: string = 'http://138.197.174.35:4024/uploads/';
// export const url2: string = 'http://138.197.174.35:4024/';
// export const url3: string = 'http://138.197.174.35:4034/';
// export const url: string = 'http://138.197.174.35:4004/';
// export const url1: string = 'http://138.197.174.35:4014/';
// export const imageUrl: string = 'http://138.197.174.35:4024/uploads/';
// export const imageUrl2: string = 'http://138.197.174.35:4004/uploads/';
// export const url4: string = 'http://138.197.174.35:4044/';
// export const imageUrlupload: string = 'http://192.168.0.174:4024/uploads/';
// export const url2: string = 'http://192.168.0.174:4024/';
// export const url3: string = 'http://192.168.0.174:4034/';
// export const url: string = 'http://192.168.0.174:4004/';
// export const url1: string = 'http://192.168.0.174:4014/';
// export const imageUrl: string = 'http://192.168.0.174:4024/uploads/';
// export const imageUrl2: string = 'http://192.168.0.174:4004/uploads/';
// export const url4: string = 'http://192.168.0.174:4044/';
// export const imageUrlupload: string = 'http://localhost:4024/upload';
// export const imageUrl: string = 'http://localhost:4024/uploads/';
// export const imageUrl2: string = 'http://localhost:4004/uploads/';
// export const url: string = 'http://localhost:4004/';
// export const url1: string = 'http://localhost:4014/';
// export const url2: string = 'http://localhost:4024/';
// export const url3: string = 'http://localhost:4034/';
// export const url4: string = 'http://localhost:4044/';
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkout__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_on__ = __webpack_require__(525);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
* Generated class for the CartPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let CartPage = class CartPage {
    constructor(modalCtrl, navCtrl, ms1Service, ms2Service, ms6Service, alertCtrl, events, loadingCtrl, toastCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.ms1Service = ms1Service;
        this.ms2Service = ms2Service;
        this.ms6Service = ms6Service;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.imageURL = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* imageUrl */];
        this.coupons = [];
        this.noCode = true;
        this.typeCode = false;
        this.haveCode = false;
        this.deliveryChargesHide = false;
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
            if (JSON.parse(localStorage.getItem('cartinfo'))['items'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['combo'].length > 0 || JSON.parse(localStorage.getItem('cartinfo'))['package'].length > 0) {
                this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));
                console.log(this.orderdetails, 'ORDERDETAILS');
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
            }
            else {
                this.loading.dismiss();
            }
        }
        else {
            this.loading.dismiss();
        }
    }
    ionViewWillEnter() {
        console.log('works fine');
    }
    ionViewDidEnter() {
        console.log("ionViewEnter", this.orderdetails);
        this.recalculateTotal();
        if (localStorage.getItem('deliveryMethod') == 'pick') {
            this.deliveryChargesHide = true;
        }
        else {
            this.deliveryChargesHide = false;
        }
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
        }
        else {
            delete this.orderdetails;
        }
    }
    getDeliveryCharges() {
        this.ms6Service.getDeliveryCharges().subscribe((data) => {
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
                let weeklyExist = false;
                this.orderdetails['deliveryCharges'] = 0;
                console.log(this.orderdetails, '135', 'OrderDetails');
                this.deliveryRate = data.message[0];
                for (let i = 0; i < this.orderdetails.package.length; i++) {
                    if (this.orderdetails.package[i].type == "flexible") {
                        weekendExist = true;
                    }
                    else {
                        weeklyExist = true;
                    }
                }
                if (weekendExist) {
                    this.orderdetails['deliveryCharges'] += data.message[0].weekend;
                }
                if (weeklyExist) {
                    this.orderdetails['deliveryCharges'] += data.message[0].weekly;
                }
                this.deilveryCharges = this.orderdetails['deliveryCharges'];
                this.recalculateTotal();
            }
            else {
                if (typeof this.orderdetails['deliveryCharges'] == 'undefined') {
                    this.orderdetails['deliveryCharges'] = 0;
                }
                this.deilveryCharges = this.orderdetails['deliveryCharges'];
                this.recalculateTotal();
            }
        }, (err) => {
            /*this.events.publish('internet:lost','abc');*/
            this.getToast('Something went wrong. Unable to load data!');
            if (typeof this.orderdetails['deliveryCharges'] == 'undefined') {
                this.orderdetails['deliveryCharges'] = 0;
            }
            this.recalculateTotal();
        });
    }
    calculatePackageCharge(amount) {
        let totalPkgCharge = 0;
        this.orderdetails['package'].forEach((pkgObj) => {
            totalPkgCharge = totalPkgCharge + (pkgObj['dayandmenus'].length * amount);
        });
        return totalPkgCharge;
    }
    restroImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res1.jpg";
        }
        return imgPath;
    }
    getKitchen(id) {
        this.ms1Service.getOne(id).subscribe((data) => {
            if (!data.error) {
                this.kitchen = data.message;
                this.checkOpenClose();
                if (typeof this.kitchen['tax'] != 'undefined' && this.kitchen['tax']['status'] == true && this.kitchen['tax']['value'] != '') {
                    this.orderdetails['tax'] = parseFloat(this.kitchen['tax']['value']);
                }
                else {
                    this.orderdetails['tax'] = 0;
                }
                if (typeof this.kitchen['currency'] != 'undefined') {
                    if (typeof this.orderdetails['currency'] == 'undefined' || this.orderdetails['currency'] == '') {
                        this.orderdetails['currency'] = this.kitchen['currency'];
                    }
                }
                else {
                    this.orderdetails['currency'] = '';
                }
                this.loading.dismiss();
                this.getDeliveryCharges();
            }
        }, (err) => {
            /*this.events.publish('internet:lost','abc');*/
            this.loading.dismiss();
            this.getToast('Something went wrong. Unable to load data!');
        });
    }
    checkOpenClose() {
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
                            }
                            else {
                                this.kitchen.openclose = 'close';
                            }
                        }
                    }
                    else {
                        this.kitchen.openclose = 'close';
                    }
                }
            }
        }
        else {
            this.kitchen.openclose = 'open';
        }
    }
    checkDisable() {
        if (this.minConditionSatisfy) {
            return false;
        }
        else {
            return true;
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad CartPage');
    }
    checkoutPage() {
        console.log("Calling CheckoutPage", this.orderdetails);
        if (typeof this.specialInstruction != 'undefined' && this.specialInstruction != '') {
            this.orderdetails['note'] = this.specialInstruction;
        }
        if (this.orderdetails['customerid'] != '') {
        }
        else {
            this.getToast('Login before proceeding to checkout');
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], {
                pop: 'pop'
            });
            return;
        }
        let OpenAddOnModel = true;
        let checkerPackage = this.orderdetails.package[0];
        for (let i = 0; i < this.orderdetails.package.length; i++) {
            //	console.log(this.orderDetail.package[i].type.toString() == checkerPackage.type.toString())
            if (this.orderdetails.package[i].type.toString() != checkerPackage.type.toString()) {
                OpenAddOnModel = false;
                break;
            }
            if (checkerPackage.type.toString() == 'flexible') {
                if (!this.orderdetails.package[i].startDate) {
                    console.log('328');
                    OpenAddOnModel = false;
                    break;
                }
                if (this.orderdetails.package[i].startDate.toString() != checkerPackage.startDate.toString()) {
                    console.log('332');
                    OpenAddOnModel = false;
                    break;
                }
            }
            else {
                if (!this.orderdetails.package[i].startdate) {
                    console.log('337');
                    OpenAddOnModel = false;
                    break;
                }
                if (this.orderdetails.package[i].startdate.toString() != checkerPackage.startdate.toString()) {
                    console.log('342');
                    OpenAddOnModel = false;
                    break;
                }
            }
        }
        if (OpenAddOnModel) {
            console.log("331 Cart Pga");
            const confirmRemovalModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__add_on__["a" /* AddOn */], {
                orderDetail: this.orderdetails,
                kitchen: this.kitchen,
                deliveryRate: this.deliveryRate
            });
            confirmRemovalModal.present();
        }
        else {
            console.log("339 Cart Pga");
            if (this.orderdetails['customerid'] != '') {
                localStorage.setItem('cartinfo', JSON.stringify(this.orderdetails));
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__checkout__["a" /* CheckoutPage */], {
                    orderdetails: this.orderdetails,
                    kitchen: this.kitchen,
                    deliveryRate: this.deliveryRate
                });
            }
            else {
                this.getToast('Login before proceeding to checkout');
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], {
                    pop: 'pop'
                });
            }
        }
    }
    delete(i, name, type) {
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
                            this.orderdetails.items.splice(i, 1);
                            this.getDeliveryCharges();
                            /*this.recalculateTotal();*/
                        }
                        if (type == 'Combo') {
                            this.orderdetails.combo.splice(i, 1);
                            this.getDeliveryCharges();
                            /*this.recalculateTotal();*/
                        }
                        if (type == 'Package') {
                            this.orderdetails.package.splice(i, 1);
                            this.getDeliveryCharges();
                            /*this.recalculateTotal();*/
                        }
                    }
                }
            ]
        });
        confirm.present();
    }
    decreaseQuantity(index, type) {
        if (type == 'item') {
            if (this.orderdetails['items'][index].qty > 1) {
                this.orderdetails['items'][index].qty = this.orderdetails['items'][index].qty - 1;
                this.recalculateTotal();
            }
        }
        if (type == 'combo') {
            if (this.orderdetails['combo'][index].qty > 1) {
                this.orderdetails['combo'][index].qty = this.orderdetails['combo'][index].qty - 1;
                this.recalculateTotal();
            }
        }
        if (type == 'pkg') {
            if (this.orderdetails['package'][index].qty > 1) {
                this.orderdetails['package'][index].qty = this.orderdetails['package'][index].qty - 1;
                this.recalculateTotal();
            }
        }
    }
    increaseQuantity(index, type) {
        if (type == 'item') {
            this.orderdetails['items'][index].qty = this.orderdetails['items'][index].qty + 1;
            this.recalculateTotal();
        }
        if (type == 'combo') {
            this.orderdetails['combo'][index].qty = this.orderdetails['combo'][index].qty + 1;
            this.recalculateTotal();
        }
        if (type == 'pkg') {
            this.orderdetails['package'][index].qty = this.orderdetails['package'][index].qty + 1;
            this.recalculateTotal();
        }
    }
    recalculateTotal() {
        this.orderdetails.subtotal = 0;
        let itemdetail = this.orderdetails.items;
        if (itemdetail.length > 0) {
            for (let i = 0; i < itemdetail.length; i++) {
                this.orderdetails.subtotal = this.orderdetails.subtotal + (itemdetail[i].price * itemdetail[i].qty);
            }
        }
        var combo = this.orderdetails.combo;
        if (combo.length > 0) {
            for (var j = 0; j < combo.length; j++) {
                this.orderdetails.subtotal = parseFloat(this.orderdetails.subtotal) + (parseFloat(combo[j].finalcomboprice) * parseFloat(combo[j].qty));
            }
        }
        var pkg = this.orderdetails.package;
        if (pkg.length > 0) {
            for (var k = 0; k < pkg.length; k++) {
                this.orderdetails.subtotal = parseFloat(this.orderdetails.subtotal) + (parseFloat(pkg[k].packageprice) * pkg[k]['qty']);
            }
        }
        if ((this.orderdetails.items && this.orderdetails.items.length > 0) || (this.orderdetails.combo && this.orderdetails.combo.length > 0) || (this.orderdetails.package && this.orderdetails.package.length > 0)) {
            if (typeof this.orderdetails['discount'] != 'undefined') {
                let totalAmt = this.orderdetails['subtotal'] - parseFloat(this.orderdetails['discount']);
                this.taxAmmount = (totalAmt * this.orderdetails['tax']) / 100;
                console.log('502', this.orderdetails['total']);
                this.orderdetails['total'] = totalAmt + this.taxAmmount;
            }
            else {
                let totalAmt = this.orderdetails['subtotal'];
                this.taxAmmount = (totalAmt * this.orderdetails['tax']) / 100;
                console.log('508', this.orderdetails['total']);
                this.orderdetails['total'] = totalAmt + this.taxAmmount;
            }
        }
        else {
            this.orderdetails['total'] = 0;
        }
        localStorage.removeItem('cartinfo');
        localStorage.setItem('cartinfo', JSON.stringify(this.orderdetails));
        this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));
        if (typeof this.kitchen.minimumorder != 'undefined') {
            if (parseFloat(this.kitchen.minimumorder) <= this.orderdetails['subtotal']) {
                this.minConditionSatisfy = true;
            }
            else {
                this.minConditionSatisfy = false;
            }
        }
        else {
            this.minConditionSatisfy = true;
        }
        setTimeout(() => {
            this.events.publish('cart:item', this.orderdetails, Date.now());
        }, 500);
    }
    showField() {
        this.noCode = false;
        this.typeCode = true;
    }
    hideField() {
        this.noCode = true;
        this.typeCode = false;
    }
    applyCode() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var obj = { "couponcode": this.couponCode, "kitchenId": this.orderdetails['restaurantid'] };
        this.ms2Service.redeemCoupanCode(obj).subscribe((data) => {
            /*QGISEX97*/
            console.log(data);
            loading.dismiss();
            if (!data.error) {
                this.getToast("Coupon Code Applied.");
                let offer = data.message[0];
                this.orderdetails['coupon'] = data.message[0];
                if (offer.type == 'Price') {
                    this.orderdetails['discount'] = parseFloat(offer.percentorpricevalue);
                    this.recalculateTotal();
                    /*this.orderdetails['total'] = this.orderdetails['subtotal'] - this.orderdetails['discount'];*/
                }
                else {
                    this.orderdetails['discount'] = this.orderdetails['subtotal'] * ((parseFloat(offer.percentorpricevalue)) / 100);
                    this.recalculateTotal();
                }
                this.typeCode = false;
                this.haveCode = true;
            }
            else {
                this.getToast(data.message);
                delete this.couponCode;
                /*this.hideField();*/
            }
        });
    }
    removeCode() {
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
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    checkCouponCode() {
        if (typeof this.couponCode == 'undefined' || this.couponCode == null || this.couponCode == '' || this.couponCode[0] == ' ') {
            return true;
        }
        else {
            return false;
        }
    }
};
CartPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-cart',template:/*ion-inline-start:"D:\OrderApp\src\pages\cart\cart.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Cart</ion-title>\n\n        <!-- <ion-icon padding-horizontal class = "white" float-right end name="cart" ios="ios-cart" md="md-cart"></ion-icon> -->\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content has-bouncing="true">\n\n\n\n	<ion-row *ngIf = "!orderdetails || (orderdetails.items && orderdetails.items.length == 0 && orderdetails.combo && orderdetails.combo.length == 0 && orderdetails.package && orderdetails.package.length == 0 )" padding class = "bgWhite colorLightGray">\n\n		<ion-col padding><strong>Cart is Empty!</strong></ion-col>\n\n	</ion-row>\n\n\n\n	<!-- kitchen &&  -->\n\n	\n\n	<ion-row *ngIf = "kitchen"><!-- orderdetails && ((orderdetails.items && orderdetails.items.length > 0) || (orderdetails.combo && orderdetails.combo.length > 0) || (orderdetails.package && orderdetails.package.length > 0)) -->\n\n        <ion-col col-4 style="background-position: center;background-repeat: no-repeat;background-size: cover;" [ngStyle]="{\'background-image\': \'url(\' + restroImage(kitchen.image[0]) + \')\'}">\n\n            <!-- <img [src]="restroImage(kitchen.image[0])"> -->\n\n        </ion-col>\n\n        <ion-col col-8>\n\n	        <h5 class="colorGray"><strong>{{kitchen.restaurantname}}</strong></h5>\n\n	        <div class="colorLightGray">{{kitchen.city}}, {{kitchen.country}}</div>\n\n	    </ion-col>\n\n    </ion-row>\n\n\n\n    <!-- kitchen &&  -->\n\n\n\n    <ion-row *ngIf = "orderdetails &&( (orderdetails.items && orderdetails.items.length > 0) || (orderdetails.combo && orderdetails.combo.length > 0) || (orderdetails.package && orderdetails.package.length > 0))" padding-top padding-left class = "bgWhite">\n\n	    <ion-row *ngIf = "orderdetails.items.length > 0" class="width100">\n\n	    	<ion-row><strong>Daily Menu Items</strong></ion-row>\n\n		    <ion-row *ngFor = "let item of orderdetails.items; let i = index; " padding-horizontal class="width100">\n\n		    	<ion-col col-5 col-sm-7>\n\n		    		{{item.name}}\n\n		    	</ion-col>\n\n		    	<ion-col col-3 col-sm-2 class="qtyDiv font2vh colorBlack">\n\n					<ion-icon class="fontWeight700" name="remove" ios="ios-remove" md="md-remove" (click)="decreaseQuantity(i,\'item\')"></ion-icon>\n\n					<ion-label no-margin class="quantity width100 height100">{{item.qty}}</ion-label>\n\n					<ion-icon class="fontWeight700" name="add" ios="ios-add" md="md-add" (click)="increaseQuantity(i,\'item\')"></ion-icon>\n\n		    	</ion-col>\n\n		    	<ion-col text-right col-4 col-sm-3 class="colorLightGray font2vh colorBlack paddingLeft10px">\n\n		    		<span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{item.qty * item.price | number : \'1.2-2\'}}\n\n		    	</ion-col>\n\n		    	<ion-icon (click)="delete(i,item.name,\'Item\')" class="deleteItemIcon" color = "danger" name="trash" ios="ios-trash" md="md-trash"></ion-icon>\n\n		    </ion-row>\n\n	    </ion-row>\n\n	    <ion-row *ngIf = "orderdetails.combo.length > 0" class="width100">\n\n	    	<ion-row><strong>Combo Items</strong></ion-row>\n\n		    <ion-row *ngFor = "let combo of orderdetails.combo; let i = index; " padding-horizontal class="width100">\n\n		    	<ion-col col-5>\n\n		    		{{combo.name}}\n\n		    	</ion-col>\n\n		    	<ion-col col-3 class="qtyDiv font2vh colorBlack">\n\n					<ion-icon class="fontWeight700" name="remove" ios="ios-remove" md="md-remove" (click)="decreaseQuantity(i,\'combo\')"></ion-icon>\n\n					<ion-label no-margin class="quantity width100 height100">{{combo.qty}}</ion-label>\n\n					<ion-icon class="fontWeight700" name="add" ios="ios-add" md="md-add" (click)="increaseQuantity(i,\'combo\')"></ion-icon>\n\n		    	</ion-col>\n\n		    	<ion-col text-right col-4 class="colorLightGray font2vh colorBlack paddingLeft10px">\n\n		    		<span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{combo.qty * combo.finalcomboprice | number : \'1.2-2\'}}\n\n		    	</ion-col>\n\n\n\n		    	<ion-icon (click)="delete(i,combo.name,\'Combo\')" class="deleteItemIcon" color = "danger" name="trash" ios="ios-trash" md="md-trash"></ion-icon>\n\n		    </ion-row>\n\n	    </ion-row>\n\n	    <ion-row *ngIf = "orderdetails.package.length > 0" class="width100">\n\n	    	<ion-row><strong>Weekly Package(s)</strong></ion-row>\n\n		    <ion-row *ngFor = "let pkg of orderdetails.package; let i = index; " padding-horizontal class="width100">\n\n		    	<ion-col col-5>\n\n		    		{{pkg.name}} <!-- <small>&nbsp; X {{pkg.qty}}</small> -->\n\n		    	</ion-col>\n\n		    	<ion-col col-3 class="qtyDiv font2vh colorBlack">\n\n					<ion-icon class="fontWeight700" name="remove" ios="ios-remove" md="md-remove" (click)="decreaseQuantity(i,\'pkg\')"></ion-icon>\n\n					<ion-label no-margin class="quantity width100 height100">{{pkg.qty}}</ion-label>\n\n					<ion-icon class="fontWeight700" name="add" ios="ios-add" md="md-add" (click)="increaseQuantity(i,\'pkg\')"></ion-icon>\n\n		    	</ion-col>\n\n		    	<ion-col text-right col-4 class="colorLightGray font2vh colorBlack paddingLeft10px">\n\n		    		<span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{pkg.qty * pkg.packageprice | number : \'1.2-2\'}}\n\n		    	</ion-col>\n\n\n\n		    	<ion-icon (click)="delete(i,pkg.name,\'Package\')" class="deleteItemIcon" color = "danger" name="trash" ios="ios-trash" md="md-trash"></ion-icon>\n\n		    </ion-row>\n\n	    </ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf = "kitchen && orderdetails" padding class= " bgWhite">\n\n		<!--  && ((orderdetails.items && orderdetails.items.length > 0) || (orderdetails.combo && orderdetails.combo.length > 0) || (orderdetails.package && orderdetails.package.length > 0)) -->\n\n		<ion-col *ngIf = "kitchen" col-12 no-padding padding-horizontal>\n\n			<strong>{{kitchen.restaurantname}},</strong>\n\n		</ion-col>\n\n		<ion-col *ngIf = "kitchen" col-12 no-padding padding-horizontal>\n\n			<strong>{{kitchen.city}}, {{kitchen.country}}</strong>\n\n		</ion-col>\n\n\n\n		<ion-row *ngIf = "orderdetails" padding-horizontal class="width100 colorLightGray">\n\n			<ion-col col-7>Total</ion-col>\n\n			<ion-col text-right><span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{orderdetails.subtotal | number : \'1.2-2\'}}</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row *ngIf = "orderdetails.discount" padding-horizontal class="width100 colorLightGray">\n\n			<ion-col col-7>Discount &nbsp;<span class="font2vh" *ngIf = "orderdetails.coupon && orderdetails.coupon.type == \'Percent\'">({{orderdetails.coupon.percentorpricevalue}} %)</span></ion-col>\n\n			<ion-col text-right><span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{orderdetails.discount | number : \'1.2-2\'}}</ion-col>\n\n		</ion-row>\n\n		\n\n		<!-- <ion-row *ngIf = "!deliveryChargesHide && orderdetails.deliveryCharges && ((orderdetails.items && orderdetails.items.length > 0) || (orderdetails.combo && orderdetails.combo.length > 0) || (orderdetails.package && orderdetails.package.length > 0))" padding-horizontal class="width100 colorLightGray">\n\n			<ion-col col-7>Delivery Charges </ion-col>\n\n			<ion-col text-right><span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{orderdetails.deliveryCharges | number : \'1.2-2\'}}</ion-col>\n\n		</ion-row> -->\n\n\n\n		<ion-row *ngIf = "orderdetails.tax && ((orderdetails.items && orderdetails.items.length > 0) || (orderdetails.combo && orderdetails.combo.length > 0) || (orderdetails.package && orderdetails.package.length > 0))" padding-horizontal class="width100 colorLightGray">\n\n			<ion-col col-7>Tax &nbsp;<span class="font2vh">({{orderdetails.tax}} %)</span></ion-col>\n\n			<ion-col text-right><span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{taxAmmount | number : \'1.2-2\'}}</ion-col>\n\n		</ion-row>\n\n\n\n\n\n\n\n		<hr class="width100 height2px">\n\n		<ion-row padding-horizontal class="width100 colorLightGray">\n\n			<ion-col col-7 text-right class="colorGray"><strong>Pay</strong></ion-col>\n\n\n\n			<ion-col text-right><span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{orderdetails.total | number : \'1.2-2\'}}</ion-col>\n\n			\n\n			<!-- <ion-col text-right *ngIf = "!orderdetails.discount"><span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{orderdetails.subtotal + (orderdetails.subtotal*(orderdetails.tax/100)) | number : \'1.2-2\'}}</ion-col>\n\n			\n\n			<ion-col text-right *ngIf = "orderdetails.discount"><span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span> {{orderdetails.subtotal - orderdetails.discount + ((orderdetails.subtotal - orderdetails.discount)*(orderdetails.tax/100)) | number : \'1.2-2\'}}</ion-col> -->\n\n		</ion-row>\n\n\n\n		<ion-row class="width100 couponCode" *ngIf = "orderdetails && ((orderdetails.items && orderdetails.items.length > 0) || (orderdetails.combo && orderdetails.combo.length > 0) || (orderdetails.package && orderdetails.package.length > 0))">\n\n\n\n			<ion-row class="width100" *ngIf = "noCode && (orderdetails.coupon == \'undefined\' || orderdetails.coupon == null || orderdetails.coupon == \'\') ">\n\n				<ion-col class="textUnderline font2vh" (click)="showField()">Apply Coupon Code?</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row padding-horizontal padding-top class="width100" *ngIf = "typeCode">\n\n				<ion-input class="bgWhite" type="text" maxlength="10" value="" [(ngModel)]="couponCode"></ion-input>\n\n				<button class="applyButton" [disabled] = "checkCouponCode()" (click)="applyCode()">Apply</button>\n\n				<button class="cancelButton" (click)="hideField()">Cancel</button>\n\n			</ion-row>\n\n\n\n			<ion-row padding-horizontal padding-top class="width100" *ngIf = "haveCode || (orderdetails.coupon)">\n\n				<label>{{couponCode}}\n\n				</label>\n\n				<!-- <button class="cancelButton" (click)="removeCode()">Remove</button> -->\n\n				<ion-row class="removeCouponButton" *ngIf = "haveCode || (orderdetails.coupon)">Coupon Code Applied <span class="" (click)="removeCode()"> x </span></ion-row>\n\n			</ion-row>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n\n\n	<ion-row *ngIf = "kitchen && orderdetails && ((orderdetails.items && orderdetails.items.length > 0) || (orderdetails.combo && orderdetails.combo.length > 0) || (orderdetails.package && orderdetails.package.length > 0))" padding class="bgWhite">\n\n		<ion-item>\n\n			<ion-label stacked>Leave a note for the chef...</ion-label>\n\n			<ion-textarea [(ngModel)] = "specialInstruction" rows="3" type="text"></ion-textarea>\n\n		</ion-item>\n\n\n\n		<ion-row class = "width100 minOrderRow" *ngIf = "!minConditionSatisfy">\n\n			Minimum Order Amount is&nbsp;<span *ngIf = "orderdetails.currency">{{orderdetails.currency}}</span>&nbsp;{{kitchen.minimumorder | number : \'1.2-2\'}}\n\n		</ion-row>\n\n\n\n		<button ion-button full (click)="checkoutPage()" [disabled]="checkDisable()">Checkout</button>\n\n	</ion-row>\n\n\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\cart\cart.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_5__app_service_index__["b" /* MS2Service */],
        __WEBPACK_IMPORTED_MODULE_5__app_service_index__["e" /* MS6Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
], CartPage);

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*import { LoginPage } from './login';*/
let ForgetPasswordPage = class ForgetPasswordPage {
    constructor(lf, navCtrl, loadingCtrl, toastCtrl, ms3Service) {
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.ms3Service = ms3Service;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.forgetForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(this.emailp)]],
        });
    }
    ionViewDidLoad() {
    }
    iconImage() {
        return 'assets/imgs/MealDaay-small.png';
    }
    loginPage() {
        this.navCtrl.pop();
    }
    forgetPass() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ms3Service.forgetPasswordCustomer(this.forgetForm.value).subscribe((data) => {
            console.log("data => ", data);
            if (!data.error) {
                loading.dismiss();
                this.getToast('Email sent Successfully. Please check your Email ID');
                this.loginPage();
            }
            else {
                loading.dismiss();
                this.getToast(data.message);
            }
        }, (err) => {
            loading.dismiss();
            this.getToast('Error Occured! Please check your Internet connection.');
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
};
ForgetPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"D:\OrderApp\src\pages\login\forgetpassword.html"*/'<!-- <ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Forget Password</ion-title>\n\n    </ion-navbar>\n\n</ion-header> -->\n\n\n\n\n\n\n\n<ion-content has-bouncing="true" padding text-center class="white backgroundImage" [ngStyle]="{\'background-image\': \'url(assets/imgs/login-bgImage.jpg)\'}">\n\n	<ion-avatar class="marginBottom4">\n\n        <img class="iconImage" [src]="iconImage()">\n\n    </ion-avatar>\n\n\n\n	<form role="form" [formGroup]="forgetForm" (ngSubmit)="forgetPass()" >	\n\n		<ion-item>\n\n			<ion-input formControlName="email" placeholder="Enter Email Address" type="text"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-row *ngIf="forgetForm.controls[\'email\'].touched && forgetForm.controls[\'email\'].dirty && forgetForm.controls[\'email\'].invalid " class="white padding8-16px">\n\n			Please enter a valid Email ID.\n\n		</ion-row>\n\n\n\n		<button ion-button class="themeRedBg" full [disabled]="!forgetForm.valid">Reset Password</button>\n\n		\n\n		<ion-row>\n\n			<ion-col padding-top text-center col-12>\n\n				<span class="themeGreen" (click)="loginPage()">\n\n					<strong>Sign In</strong>\n\n				</span>\n\n			</ion-col>\n\n		</ion-row>\n\n	</form>\n\n\n\n\n\n\n\n	<!-- <button ion-button class="themeGreenBg" full (click)="loginPage()">Login</button> -->\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\login\forgetpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */]])
], ForgetPasswordPage);

//# sourceMappingURL=forgetpassword.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MS6Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let MS6Service = class MS6Service {
    constructor(http) {
        this.http = http;
    }
    getAllCuisines() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'cuisines/')
            .map((response) => response.json());
    }
    getIdByCountry(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'getcountryid', data)
            .map((response) => response.json());
    }
    getCountryName() {
        return this.http.get("http://freegeoip.net/json/").map((response) => response.json());
    }
    getCountrylist() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'countrylist')
            .map((response) => response.json());
    }
    getDeliveryCharges() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'deliverycharges')
            .map((response) => response.json());
    }
    getcitylist(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'getcitylist', data)
            .map((response) => response.json());
    }
    getComplexity() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'users/complexity')
            .map((response) => response.json());
    }
    getOneUrl(url) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'pages/' + url)
            .map((response) => response.json());
    }
};
MS6Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MS6Service);

//# sourceMappingURL=ms6.service.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*import { LoginPage } from './login';*/
/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let SignupPage = class SignupPage {
    constructor(lf, navCtrl, ms3Service, ms6Service, loadingCtrl, toastCtrl) {
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.ms3Service = ms3Service;
        this.ms6Service = ms6Service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.passMatch = true;
        this.formErrors = {
            'password': ''
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.'
            }
        };
        this.signupForm = this.lf.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            username: [''],
            email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(this.emailp)]],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            confirmpassword: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
        });
        this.ms6Service.getComplexity().subscribe(data => {
            if (!data.error) {
                this.passwordp = data.message[0].ownerpasscomplexity.regex;
                this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);
                this.signupForm.valueChanges.subscribe(data => this.onValueChanged(data));
                this.onValueChanged();
            }
        });
    }
    onValueChanged(data) {
        if (!this.signupForm) {
            return;
        }
        const form = this.signupForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    setpasswordmessage(name) {
        if (name == 'simplepassword') {
            this.validationMessages.password['pattern'] = 'Password must contain min 8 Digits alphanumeric only';
        }
        if (name == 'medium') {
            this.validationMessages.password['pattern'] = 'TBD';
        }
        if (name == 'complex') {
            this.validationMessages.password['pattern'] = 'TBD';
        }
        if (name == 'none') {
            this.validationMessages.password['pattern'] = '';
        }
    }
    ionViewDidLoad() {
    }
    iconImage() {
        return 'assets/imgs/MealDaay-small.png';
    }
    signup() {
        this.signupForm.controls['username'].setValue(this.signupForm.controls['email'].value);
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmpassword'].value) {
            this.passMatch = false;
            loading.dismiss();
        }
        else {
            this.passMatch = true;
            this.ms3Service.addCustomer(this.signupForm.value).subscribe((data) => {
                console.log("data => ", data);
                if (!data.error) {
                    loading.dismiss();
                    this.getToast(data.message + '\n . Please Activate your Account.');
                    this.loginPage();
                }
                else {
                    loading.dismiss();
                    this.getToast('Email ID already in use');
                }
            }, (err) => {
                loading.dismiss();
                this.getToast('Error Occured! Please check your Internet connection.');
            });
        }
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    loginPage() {
        this.navCtrl.pop();
    }
};
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"D:\OrderApp\src\pages\login\signup.html"*/'<!-- <ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Sign up</ion-title>\n\n    </ion-navbar>\n\n</ion-header> -->\n\n<style>\n\n.red{\n\n	color: red;\n\n}\n\n.bottom-margin{\n\n	margin-bottom: 0px !important;\n\n}\n\n</style>\n\n\n\n\n\n<ion-content has-bouncing="true" padding text-center class="white backgroundImage" [ngStyle]="{\'background-image\': \'url(assets/imgs/login-bgImage.jpg)\'}">\n\n	<ion-avatar class="marginBottom4">\n\n        <img class="iconImage" [src]="iconImage()">\n\n    </ion-avatar>\n\n	<form role="form" [formGroup]="signupForm" (ngSubmit)="signup()" >\n\n		<ion-item>\n\n			<ion-input formControlName="firstname" placeholder="First Name" type="text"></ion-input>\n\n		</ion-item>\n\n		\n\n		<ion-item>\n\n			<ion-input formControlName="lastname" placeholder="Last Name" type="text"></ion-input>\n\n		</ion-item>\n\n		\n\n		<ion-item [ngClass]="{\'bottom-margin\': signupForm.controls[\'email\'].touched && signupForm.controls[\'email\'].dirty && signupForm.controls[\'email\'].invalid }">\n\n			<ion-input formControlName="email" placeholder="E-mail" type="text"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-row *ngIf="signupForm.controls[\'email\'].touched && signupForm.controls[\'email\'].dirty && signupForm.controls[\'email\'].invalid " class="red padding8-16px">\n\n			Please enter a valid Email ID.\n\n		</ion-row>\n\n\n\n		<!-- <ion-input formControlName="username" placeholder="Username" type="text"></ion-input>\n\n\n\n		<ion-row *ngIf="signupForm.controls[\'username\'].touched && signupForm.controls[\'username\'].dirty && signupForm.controls[\'username\'].invalid " class="white">\n\n			Please enter a valid Username.\n\n		</ion-row> -->\n\n\n\n		<ion-item [ngClass]="{\'bottom-margin\':formErrors.password}">\n\n			<ion-input formControlName="password" placeholder="Password" type="password" [pattern] = "passwordp"></ion-input>\n\n		</ion-item>\n\n		<div *ngIf="formErrors.password" class="red alert alert-danger mt-3 padding8-16px" text-left> \n\n            {{ formErrors.password }}\n\n        </div>\n\n\n\n		<ion-item [ngClass]="{\'bottom-margin\':!passMatch}">\n\n			<ion-input formControlName="confirmpassword" placeholder="Confirm Password" type="password" [pattern] = "passwordp"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-row *ngIf="!passMatch" class="red padding8-16px">\n\n			Password didn\'t Match!\n\n		</ion-row>\n\n\n\n\n\n		<button ion-button class="themeRedBg" full [disabled]="!signupForm.valid">Sign up</button>\n\n\n\n		<ion-row>\n\n			<ion-col padding-top text-center col-12>\n\n				<span class="themeGreen" (click)="loginPage()">\n\n					<strong>Sign In</strong>\n\n				</span>\n\n			</ion-col>\n\n		</ion-row>\n\n		\n\n	</form>\n\n	<!-- <button ion-button class="themeGreenBg" full (click)="loginPage()">Login</button> -->\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\login\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* MS6Service */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* ToastController */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuestModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service_location_service__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let GuestModalPage = class GuestModalPage {
    constructor(viewCtrl, loadingCtrl, toastCtrl, lf, navCtrl, ms3Service, locationService) {
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.ms3Service = ms3Service;
        this.locationService = locationService;
        this.emailp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        this.guestLoginForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(this.emailp)]]
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
    iconImage() {
        return 'assets/imgs/MealDaay-small.png';
    }
    login() {
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
        this.ms3Service.addCustomer(obj).subscribe((data) => {
            loading.dismiss();
            if (data.error) {
                this.getToast('Email ID already in use');
            }
            else {
                console.log("guest data");
                console.log(data);
                this.viewCtrl.dismiss(obj);
            }
        }, (err) => {
            loading.dismiss();
            this.getToast('Error Occured! Please check your Internet Connection');
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    loginPage() {
        this.viewCtrl.dismiss();
    }
};
GuestModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"D:\OrderApp\src\pages\login\guestlogin.html"*/'<ion-content padding text-center class="white backgroundImage" [ngStyle]="{\'background-image\': \'url(assets/imgs/login-bgImage.jpg)\'}">\n\n	<ion-avatar class="marginBottom4">\n\n        <img class="iconImage" [src]="iconImage()">\n\n    </ion-avatar>\n\n\n\n	<form role="form" [formGroup]="guestLoginForm" (ngSubmit)="login()" >	\n\n		<ion-item>\n\n			<ion-input formControlName="email" placeholder="Enter Email Address" type="text"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-row *ngIf="guestLoginForm.controls[\'email\'].touched && guestLoginForm.controls[\'email\'].dirty && guestLoginForm.controls[\'email\'].invalid " class="white padding8-16px">\n\n			Please enter a valid Email ID.\n\n		</ion-row>\n\n\n\n		<button ion-button class="themeRedBg" full [disabled]="!guestLoginForm.valid">Continue</button>\n\n\n\n\n\n		<ion-row>\n\n			<ion-col padding-top text-center col-12>\n\n				<span class="themeGreen" (click)="loginPage()">\n\n					<strong>Sign In</strong>\n\n				</span>\n\n			</ion-col>\n\n		</ion-row>\n\n	</form>\n\n	<!-- <button ion-button class="themeGreenBg" full (click)="loginPage()">Login</button> -->\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\login\guestlogin.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["u" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_location_service__["a" /* LocationService */]])
], GuestModalPage);

//# sourceMappingURL=guestlogin.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_pop_over__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__offer_offer__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__review_review__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let HomePage = class HomePage {
    // ngAfterViewInit(){
    //     console.log("i am here");
    //     $(document).ready(function(){
    //         alert('JQuery is working!!');
    //     });
    // }
    constructor(navCtrl, events, navParams, 
        /*public popoverCtrl: PopoverController,*/
        loadingCtrl, menuCtrl, toastCtrl, alertCtrl, ms1Service, ms2Service, ms4Service, ms3Service, ms6Service) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.ms1Service = ms1Service;
        this.ms2Service = ms2Service;
        this.ms4Service = ms4Service;
        this.ms3Service = ms3Service;
        this.ms6Service = ms6Service;
        this.slidesMoving = true;
        // minDate = moment().format('YYYY MM DD');
        // maxDate = moment().add(6, 'M').format('YYYY MM DD');
        this.minDate = new Date();
        this.maxDate = new Date();
        this.disabledDateToday = new Date();
        this.disabledDateArray = [];
        this.slideOpts = {
            initialSlide: 1,
            speed: 400
        };
        this.weekendRestaurantCount = false;
        this.weeklyRestaurantCount = false;
        this.itemsRatingIndex = [];
        this.comboRatingIndex = [];
        this.packageRatingIndex = [];
        this.itemsRating = [];
        this.comboRating = [];
        this.packageRating = [];
        this.selectedSegment = '0';
        this.imageURL = __WEBPACK_IMPORTED_MODULE_6__app_global__["a" /* imageUrl */];
        this.kitchen = {};
        this.data = [];
        this.cartItem = [];
        this.items = [];
        this.activeitems = [];
        this.cuisines = [];
        this.itemObj = {};
        this.checkRevise = false;
        this.selectItem = false;
        this.flexiTotal = {};
        this.flexiRepeatTotal = {};
        this.datesArray = [];
        this.tempDatesArray = [];
        this.event = {};
        this.rateArray = [1, 2, 3, 4, 5];
        this.detailpop = true;
        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        }
        this.maxDate.setMonth(this.minDate.getMonth() + 6);
        let maxDateChecker = new Date(this.maxDate);
        let maxDateMonth = this.maxDate.getMonth();
        for (let i = 0; i < 31; i++) {
            maxDateChecker.setDate(maxDateChecker.getDate() + 1);
            if (maxDateMonth == maxDateChecker.getMonth()) {
                this.maxDate.setDate(this.maxDate.getDate() + 1);
            }
        }
        this.kitchen = navParams.get('kitchen');
        this.kitchenId = this.kitchen._id;
        console.log(this.kitchenId, "109");
        this.priorDays = this.kitchen['mealpackageallowdays'];
        this.refresh(null);
        this.getActiveItems('constructor');
        this.getItemComboPackageRating();
        var time = new Date();
        var time2 = new Date();
        time.setDate(time.getDate() + this.priorDays);
        time2.setDate(time2.getDate() + this.priorDays + 1);
        this.currentDate = this.formatTime(time);
        this.pkgEndStartDate = this.formatTime(time2);
        this.disabledDate();
    }
    getDayFromDate(date) {
        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        return weekday[new Date(date).getDay()];
    }
    disabledDate() {
        for (let i = 0; i < 250; i++) {
            // console.log(this.disabledDateToday.getDay());
            // console.log(this.disabledDateToday);
            let checkDate = new Date(this.disabledDateToday);
            // console.log(checkDate,moment(new Date()));
            if (checkDate.getDay() != 6) {
                console.log(checkDate);
                this.disabledDateArray.push(checkDate);
            }
            else {
                if (!this.localDate) {
                    this.localDate = new Date(checkDate);
                    var x = document.getElementById('endDate');
                    // x.readOnly = false;
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    this.EndDate = new Date(checkDate);
                    this.EndDate.setDate(this.disabledDateToday.getDate() + 1);
                    this.formatted_date = months[this.EndDate.getMonth()] + " " + this.EndDate.getDate() + ", " + this.EndDate.getFullYear();
                    // x.readOnly  = true ;
                }
            }
            this.disabledDateToday.setDate(this.disabledDateToday.getDate() + 1);
        }
        console.log(this.disabledDateArray);
        return;
    }
    truck(text) {
        if (text.length < 20) {
            return text;
        }
        else {
            return text.slice(0, 17).concat("...");
        }
    }
    addToCartWeekend(weekend) {
        let saturday = {
            date: __WEBPACK_IMPORTED_MODULE_7_moment___default()(this.localDate).format('MM/DD/YYYY'),
            status: false,
            menuids: weekend.dayandmenus[0].menuids
        };
        let sunday = {
            date: __WEBPACK_IMPORTED_MODULE_7_moment___default()(this.formatted_date).format('MM/DD/YYYY'),
            status: false,
            menuids: weekend.dayandmenus[1].menuids
        };
        let tempwmenu = Object.assign({}, weekend);
        tempwmenu.startDate = __WEBPACK_IMPORTED_MODULE_7_moment___default()(this.localDate).format('YYYY-MM-DD');
        tempwmenu.endDate = __WEBPACK_IMPORTED_MODULE_7_moment___default()(this.formatted_date).format('YYYY-MM-DD');
        tempwmenu.dayandmenus = [];
        tempwmenu.dayandmenus.push(saturday);
        tempwmenu.dayandmenus.push(sunday);
        console.log("MealPackage", weekend);
        // this.addToCartWeekend( tempwmenu);
        this.addPackage(tempwmenu, 'weekend');
        console.log(tempwmenu, 'First Time');
        // this.removeFlexibleSlides();
    }
    getDateForWeeklyPackges(date) {
        return __WEBPACK_IMPORTED_MODULE_7_moment___default()(date).format('LL');
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
        if (this.pageSlider) {
            this.pageSlider.slideTo(index);
        }
        else {
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
    released() {
        console.log(this.detailpop, 'released');
        this.detailpop = true;
    }
    detailMeal() {
        console.log(this.detailpop);
        if (this.detailpop == true) {
            this.detailpop = false;
            console.log('MealPackage is press long', this.detailpop);
            let alert = this.alertCtrl.create({
                title: 'Meal Plan',
                subTitle: 'Meal plan is only pre-schedule either daily, weekly and monthly. Delivery charges apply. Please refer delivery schedule',
                buttons: ['Cancel']
            });
            alert.present();
        }
    }
    detailCombo() {
        if (this.detailpop == true) {
            this.detailpop = false;
            let alert = this.alertCtrl.create({
                title: 'Combo',
                subTitle: 'If the Chef offered Combo, that can be order same day or pre-schedule for later date. Delivery charges apply',
                buttons: ['Cancel']
            });
            alert.present();
        }
    }
    getCaptitalLetter(letters) {
        if (letters == 'saturday') {
            return 'Saturday';
        }
        else if (letters == 'sunday') {
            return 'Sunday';
        }
        return letters;
    }
    detailMenu() {
        if (this.detailpop == true) {
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
            this.getCombos('slideChange');
        }
        if (event._snapIndex == 2) {
            this.getWeekly('slideChange');
        }
    }
    formatTime(time) {
        var date = this.addZero(time.getDate());
        var month = this.addZero(time.getMonth() + 1);
        var year = time.getFullYear();
        if (typeof this.currentDateAfterTenYrs == 'undefined') {
            this.currentDateAfterTenYrs = year + 2 + '-' + month + '-' + date;
        }
        return (year + '-' + month + '-' + date);
    }
    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    checkFlexiDisable() {
        if (typeof this.event['startDate'] == 'undefined' || typeof this.event['endDate'] == 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }
    addMenuToFlexiDate(event, item, i) {
        if (typeof this.reviseFlexi != 'undefined' && this.reviseFlexi) {
            if (event.value) {
                this.datesArray[i]['menuids'].push(item);
                this.tempDatesArray[i]['menuids'].push(item);
                let indx = i + 7;
                for (var y = indx; y < this.tempDatesArray.length;) {
                    if (typeof this.tempDatesArray[y] != 'undefined') {
                        this.tempDatesArray[y]['menuids'].push(item);
                    }
                    y = y + 7;
                }
            }
            else {
                let indx = this.datesArray[i]['menuids'].findIndex((mn) => mn._id == item._id);
                this.datesArray[i]['menuids'].splice(indx, 1);
                this.tempDatesArray[i]['menuids'].splice(indx, 1);
                let index = i + 7;
                for (var z = index; z < this.tempDatesArray.length;) {
                    if (typeof this.tempDatesArray[z] != 'undefined') {
                        this.tempDatesArray[z]['menuids'].splice(indx, 1);
                    }
                    z = z + 7;
                }
            }
        }
        if (typeof this.reviseFlexi == 'undefined' || !this.reviseFlexi) {
            if (event.value) {
                this.datesArray[i]['menuids'].push(item);
                this.tempDatesArray[i]['menuids'].push(item);
            }
            else {
                let indx = this.datesArray[i]['menuids'].findIndex((mn) => mn._id == item._id);
                this.datesArray[i]['menuids'].splice(indx, 1);
                this.tempDatesArray[i]['menuids'].splice(indx, 1);
            }
        }
        this.updateFlexiPackagePrice();
    }
    updateFlexiPackagePrice() {
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
    getPrice(total, discount, type) {
        let amnt;
        if (typeof total != 'undefined' && typeof discount != 'undefined') {
            amnt = total - (total * parseInt(discount) / 100);
        }
        else {
            amnt = total;
        }
        if (type == 'noRepeat') {
            this.flexiTotal['total'] = amnt;
        }
        else {
            this.flexiRepeatTotal['total'] = amnt;
        }
        return amnt;
    }
    checkMaxDate() {
        if (typeof this.event['endDate'] != 'undefined') {
            let date = new Date(this.event['endDate']);
            date.setDate(date.getDate() - 1);
            let returnDate = this.formatTime(date);
            return returnDate;
        }
        else {
            return this.currentDateAfterTenYrs;
        }
    }
    startDateSelected(event, date) {
        console.log(event);
        // this.localDate = new Date(checkDate);
        //   var x :any = document.getElementById('endDate');
        // x.readOnly = false;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.EndDate = new Date(event);
        this.EndDate.setDate(this.EndDate.getDate() + 1);
        this.formatted_date = months[this.EndDate.getMonth()] + " " + this.EndDate.getDate() + ", " + this.EndDate.getFullYear();
    }
    dateFunction(type) {
        if (typeof this.event['startDate'] != 'undefined') {
            let date = new Date(this.event['startDate']);
            date.setDate(date.getDate() + 1);
            this.pkgEndStartDate = this.formatTime(date);
        }
        if (typeof this.event['startDate'] != 'undefined' && typeof this.event['endDate'] != 'undefined') {
            let val1 = this.event['startDate'].split('-');
            let val2 = this.event['endDate'].split('-'); /*YMD*/
            var date1 = new Date(val1[1] + '-' + val1[2] + '-' + val1[0]);
            var date2 = new Date(val2[1] + '-' + val2[2] + '-' + val2[0]);
            var timeDiff = date2.getTime() - date1.getTime();
            let dayDiff;
            dayDiff = timeDiff / (1000 * 3600 * 24);
            this.dayDif = parseInt(dayDiff);
            if (this.dayDif >= 7) {
                this.checkRevise = true;
            }
            else {
                this.checkRevise = false;
                delete this.reviseFlexi;
            }
        }
    }
    formatPkgDate(time) {
        var date = time.getDate();
        var month = time.getMonth() + 1;
        var year = time.getFullYear();
        return (month + '/' + date + '/' + year);
    }
    selectItemNow() {
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
            var indexs = this.flexiData.dayandmenus.findIndex((indexitem) => { return indexitem.day == dayName; });
            if (indexs > -1) {
                if (typeof this.reviseFlexi != 'undefined' && this.reviseFlexi && this.datesArray.length < 7) {
                    this.datesArray.push({ "date": dateDay, "status": false, "menuids": [], "tempmenuids": this.flexiData.dayandmenus[indexs].menuids });
                }
                if (typeof this.reviseFlexi == 'undefined' || !this.reviseFlexi) {
                    this.datesArray.push({ "date": dateDay, "status": false, "menuids": [], "tempmenuids": this.flexiData.dayandmenus[indexs].menuids });
                }
                this.tempDatesArray.push({ "date": dateDay, "status": false, "menuids": [], "tempmenuids": this.flexiData.dayandmenus[indexs].menuids });
            }
            else {
                if (typeof this.reviseFlexi != 'undefined' && this.reviseFlexi && this.datesArray.length < 7) {
                    this.datesArray.push({ "date": dateDay, "status": false, "menuids": [], "tempmenuids": [] });
                }
                if (typeof this.reviseFlexi == 'undefined' || !this.reviseFlexi) {
                    this.datesArray.push({ "date": dateDay, "status": false, "menuids": [], "tempmenuids": [] });
                }
                this.tempDatesArray.push({ "date": dateDay, "status": false, "menuids": [], "tempmenuids": [] });
            }
            startDate.setDate(startDate.getDate() + 1);
        }
    }
    checkReviseFunction() {
        console.log("this.reviseFlexi");
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
        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        }
        if (localStorage.getItem('cartinfo')) {
            if (JSON.parse(localStorage.getItem('cartinfo')).items.length > 0 || JSON.parse(localStorage.getItem('cartinfo')).combo.length > 0 || JSON.parse(localStorage.getItem('cartinfo')).package.length > 0) {
                this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));
                this.setorderDetails();
            }
            else {
                if (typeof this.currentCustomer != 'undefined' && typeof this.currentCustomer['_id'] != 'undefined') {
                    this.orderdetails = { "customerid": this.currentCustomer['_id'], "subtotal": 0, "restaurantid": "", "name": "", "items": [], "combo": [], "package": [], "currency": "" };
                }
                else {
                    this.orderdetails = { "customerid": "", "subtotal": 0, "restaurantid": "", "name": "", "items": [], "combo": [], "package": [], "currency": "" };
                }
            }
        }
        else {
            if (typeof this.currentCustomer != 'undefined' && typeof this.currentCustomer['_id'] != 'undefined') {
                this.orderdetails = { "customerid": this.currentCustomer['_id'], "subtotal": 0, "restaurantid": "", "name": "", "items": [], "combo": [], "package": [], "currency": "" };
            }
            else {
                this.orderdetails = { "customerid": "", "subtotal": 0, "restaurantid": "", "name": "", "items": [], "combo": [], "package": [], "currency": "" };
            }
        }
    }
    showSlides(data) {
        this.dayAndMenuData = data;
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }
    removeSlides() {
        delete this.dayAndMenuData;
        /*this.getWeekly();*/
        setTimeout(() => {
            this.selectTab(2);
            let backButn = document.getElementsByClassName('back-button');
            if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
                for (var i = 0; i < backButn.length; i++) {
                    backButn[i].setAttribute("style", "display:block");
                }
            }
        }, 1000);
    }
    showFlexibleSlides(data) {
        this.flexiData = data;
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }
    removeFlexibleSlides() {
        delete this.flexiData;
        delete this.flexiTotal;
        delete this.flexiRepeatTotal;
        delete this.dayDif;
        delete this.reviseFlexi;
        this.datesArray = [];
        this.event = {};
        this.selectItem = false;
        this.checkRevise = false;
        setTimeout(() => {
            this.selectTab(1);
            let backButn = document.getElementsByClassName('back-button');
            if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
                for (var i = 0; i < backButn.length; i++) {
                    backButn[i].setAttribute("style", "display:block");
                }
            }
        }, 500);
        /*this.getWeekly();*/
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
    }
    offerPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__offer_offer__["a" /* OfferPage */], {
            offer: this.availoffer,
            kitchen: this.kitchen
        });
    }
    reviewPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__review_review__["a" /* ReviewPage */], {
            kitchenId: this.kitchenId
        });
    }
    presentPopover(event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__my_pop_over__["a" /* MyPopOverPage */], {
            kitchen: this.kitchen, cuisines: this.cuisines
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    restroImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (typeof img == 'undefined' || img == null) {
            imgPath = "assets/imgs/res1.jpg";
        }
        return imgPath;
    }
    menuImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res1.jpg";
        }
        return imgPath;
    }
    itemImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res2.jpg";
        }
        return imgPath;
    }
    truckDesc(desc) {
        if (desc.length < 27) {
            return desc;
        }
        else {
            return desc.substring(0, 24).concat("...");
        }
    }
    comboImage(img) {
        let imgPath;
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
    refresh(ref) {
        /*this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();*/
        this.getKitchen(ref);
    }
    checkOpenClose() {
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
                            }
                            else {
                                this.kitchen.openclose = 'close';
                            }
                        }
                    }
                    else {
                        this.kitchen.openclose = 'close';
                    }
                }
            }
        }
        else {
            this.kitchen.openclose = 'open';
        }
        console.log("this.kitchen");
        this.getActiveItems('refresh');
        this.getCombos('refresh');
        this.getWeekly('refresh');
        console.log(this.kitchen);
    }
    getKitchen(ref) {
        this.ms1Service.getOne(this.kitchenId).subscribe((data) => {
            if (!data.error) {
                data.message['rating'] = this.kitchen['rating'];
                this.kitchen = data.message;
                this.checkOpenClose();
                /*this.getActiveItems();*/
                this.getcuisines(ref);
            }
            else {
                this.loading.dismiss();
                this.getToast('Unable to load Kitchen!');
            }
        }, (error) => {
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }
    getcuisines(ref) {
        this.ms6Service.getAllCuisines().subscribe((data) => {
            if (!data.error) {
                if (this.kitchen['cuisines'] && this.kitchen['cuisines'].length > 0) {
                    this.cuisines = [];
                    for (let index = 0; index < this.kitchen['cuisines'].length; index++) {
                        let indx = data.message.findIndex((mn) => mn._id == this.kitchen['cuisines'][index]);
                        if (indx > -1) {
                            this.cuisines.push(data.message[indx]);
                        }
                    }
                }
                /*this.getWeekly();*/
                this.getOffers(ref);
            }
            else {
                this.loading.dismiss();
                this.getToast('Unable to load Cuisines!');
            }
        }, (error) => {
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }
    getOffers(ref) {
        this.ms2Service.getOffersforRestro(this.kitchenId).subscribe(data => {
            if (!data.error) {
                this.availoffer = [];
                this.availoffer = data.message;
                /*this.getCombos();*/
                /*this.loading.dismiss();*/
                if (ref != null) {
                    ref.complete();
                }
            }
            else {
                if (ref != null) {
                    ref.complete();
                }
                /*this.loading.dismiss();*/
                this.getToast('Unable to load Data!');
            }
        }, (error) => {
            if (ref != null) {
                ref.complete();
            }
            /*this.loading.dismiss();*/
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }
    getActiveItems(type) {
        if (this.menus && type != 'refresh') {
            return;
        }
        this.ms2Service.getActiveItems(this.kitchenId).subscribe(data => {
            if (!data.error) {
                this.activeitems = [];
                this.activeitems = data.message;
                this.getMenu();
            }
            else {
                this.activeitems = [];
                this.loading.dismiss();
                this.getToast('Unable to load Data!');
            }
        }, (error) => {
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }
    getMenu() {
        this.ms2Service.getAllMenu(this.kitchenId).subscribe((data) => {
            if (!data.error) {
                let menusItems = data.message;
                this.menus = [];
                menusItems.forEach((menu) => {
                    var index = this.activeitems.findIndex((item) => { return item.menuId._id == menu._id; });
                    if (index != -1) {
                        let indx = this.menus.findIndex((menuId) => {
                            return menuId._id == menu._id;
                        });
                        if (indx == -1) {
                            menu['icon'] = 'arrow-dropdown',
                                menu['showDetails'] = false;
                            this.menus.push(menu);
                        }
                    }
                });
                // delete this.availcombo;
                //  delete this.weeklyrestaurants;
                /*this.getcuisines();*/
            }
            else {
                this.menus = [];
                this.loading.dismiss();
                this.getToast('Unable to load Menu!');
            }
        }, (error) => {
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }
    getWeekly(type) {
        if (this.weeklyrestaurants && type != 'refresh') {
            return;
        }
        this.ms2Service.getActiveMealPackages(this.kitchenId).subscribe((data) => {
            if (!data.error) {
                this.weeklyrestaurants = this.splicePackage(data.message);
                for (let i = 0; i < this.weeklyrestaurants.length; i++) {
                    if (this.weeklyrestaurants[i].type == 'flexible') {
                        this.weekendRestaurantCount = true;
                    }
                    else if (this.weeklyrestaurants[i].type == 'fixed') {
                        this.weeklyRestaurantCount = true;
                    }
                }
                /*this.getOffers();*/
                //  delete this.activeitems;
                //      delete this.menus;
                //   delete this.availcombo;
            }
            else {
                this.loading.dismiss();
                this.getToast('Unable to load Data!');
            }
        }, (error) => {
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
    }
    splicePackage(data) {
        let packages = [];
        console.log(data, '966');
        data.forEach((pkg, index) => {
            if (pkg.type == 'fixed') {
                let date = new Date();
                let startDate = new Date(pkg['startdate']);
                console.log(date, 'NOW DATE');
                console.log(startDate, 'THis Prioir dAys', this.priorDays);
                startDate.setDate(startDate.getDate() - 2);
                console.log(startDate, 'Start Date ');
                let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                let newStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                console.log(newStartDate, newDate, '975');
                if (newStartDate >= newDate) {
                    pkg.icon = 'arrow-dropdown';
                    pkg.showDetails = false;
                    packages.push(pkg);
                }
            }
            else {
                pkg.icon = 'arrow-dropdown';
                pkg.showDetails = false;
                packages.push(pkg);
            }
        });
        console.log(packages, "PACKAGES");
        /*setTimeout(()=>{*/
        return packages;
        /*},1500)*/
    }
    getCombos(type) {
        if (this.availcombo && type != 'refresh') {
            return;
        }
        this.ms2Service.getActiveCombos(this.kitchenId).subscribe(data => {
            if (!data.error) {
                this.availcombo = data.message;
                if (this.availcombo.length > 0) {
                    for (let i = 0; i < this.availcombo.length; i++) {
                        this.availcombo[i]['showDetails'] = false;
                    }
                }
                //     delete this.activeitems;
                //   delete this.menus;
                //     delete this.weeklyrestaurants;
            }
            else {
                this.loading.dismiss();
                this.getToast('Unable to load Data!');
            }
        }, (error) => {
            this.loading.dismiss();
            this.getToast('Server Issue! Sorry for Inconvenience. Please Try Later.');
        });
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
    viewComboDetail(combo) {
        if (combo.showDetails) {
            combo.showDetails = false;
        }
        else {
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
        }
        else {
            data.showDetails = true;
            data.icon = 'arrow-dropup';
        }
    }
    toggleDetailsweekend(data) {
        if (data.showDetails) {
            data.showDetails = false;
            data.icon = 'arrow-dropdown';
        }
        else {
            data.showDetails = true;
            data.icon = 'arrow-dropup';
        }
    }
    showItems() {
        console.log("Show Items Clicked");
    }
    decreaseQuantity(id) {
        let ids = 'item_' + id;
        var x = document.getElementById(ids);
        var y = parseInt(x.innerHTML);
        var z;
        if (y > 1) {
            z = y - 1;
            var p = z.toString();
            x.innerHTML = p;
        }
    }
    increaseQuantity(id) {
        let ids = 'item_' + id;
        var x = document.getElementById(ids);
        var y = parseInt(x.innerHTML);
        var z;
        z = y + 1;
        var p = z.toString();
        x.innerHTML = p;
    }
    addToCart(item, type) {
        if (type == 'mealpackage') {
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
        if (type == 'combo' || type == 'menu') {
            this.addItemOrderDetail(item, type);
        }
    }
    addFlexiMealPkg(wmenu, index) {
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
                if (this.orderdetails['restaurantid'] != '' && this.kitchen._id != this.orderdetails['restaurantid']) {
                    if (confirm('Remove previously added Items from another Chef?')) {
                        localStorage.removeItem('cartinfo');
                        this.orderdetails = { "customerid": "", "total": 0, "restaurantid": "", "name": "", "items": [], "combo": [], "package": [], "ordertiming": { "type": "" }, "note": "", "coupon": "", "tax": "", "discount": "", "subtotal": "" };
                        this.addPackage(wmenu, 'flexi');
                        break;
                    }
                }
                else {
                    for (let ii = 0; ii < this.weeklyrestaurants[i].length; ii++) {
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
    updateArr(arr, cb) {
        let cusArr = [];
        arr.forEach((item, i) => {
            if (item['menuids'].length > 0) {
                delete item['tempmenuids'];
                cusArr.push(item);
            }
        });
        cb(cusArr);
    }
    addSameResCombo(itemToAdd, x) {
        if (this.orderdetails.combo.length == 0) {
            itemToAdd.qty = parseInt(x.innerHTML);
            this.orderdetails.combo.push(itemToAdd);
            x.innerHTML = 1;
            this.setorderDetails();
        }
        else {
            var index1 = this.orderdetails.combo.findIndex(itemget => { return itemget._id == itemToAdd._id; });
            if (index1 != -1) {
                this.orderdetails.combo[index1].qty += parseInt(x.innerHTML);
                x.innerHTML = 1;
                this.setorderDetails();
            }
            else {
                itemToAdd.qty = parseInt(x.innerHTML);
                this.orderdetails.combo.push(itemToAdd);
                x.innerHTML = 1;
                this.setorderDetails();
            }
        }
    }
    addPackage(pkg, type) {
        let kitchenName = this.kitchen.restaurantname;
        if (this.orderdetails.restaurantid == '' || this.orderdetails.restaurantid == pkg.kitchenId) {
            this.orderdetails.restaurantid = pkg.kitchenId;
            if (typeof this.kitchen['currency'] != 'undefined') {
                this.orderdetails.currency = this.kitchen['currency'];
            }
            this.orderdetails.name = kitchenName;
            let indx = this.orderdetails['package'].findIndex((mn) => {
                return (mn._id == pkg._id && mn.type == 'fixed');
            });
            if (indx > -1) {
                this.orderdetails['package'][indx].qty += 1;
            }
            else {
                pkg['qty'] = 1;
                this.orderdetails['package'].push(pkg);
            }
            this.setorderDetails();
            if (type == 'mealpackage') {
                this.loading.dismiss();
                this.removeSlides();
            }
            else if (type == 'flexi') {
                console.log("Here ", type);
                this.selectTab(2);
                // this.removeFlexibleSlides();
                let backButn = document.getElementsByClassName('back-button');
                if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
                    for (var i = 0; i < backButn.length; i++) {
                        backButn[i].setAttribute("style", "display:block");
                    }
                }
            }
            else {
                this.removeFlexibleSlides();
            }
        }
        else {
            /*if(this.orderdetails.restaurantid != pkg.kitchenId){*/
            let prompt = this.alertCtrl.create({
                title: "Delete Cart?",
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
                                this.orderdetails = { "customerid": this.currentCustomer['_id'], "subtotal": 0, "restaurantid": pkg.kitchenId, "name": kitchenName, "items": [], "combo": [], "package": [], "currency": this.kitchen['currency'] };
                            }
                            else {
                                this.orderdetails = { "customerid": "", "subtotal": 0, "restaurantid": "", "name": "", "items": [], "combo": [], "package": [], "currency": "" };
                            }
                            this.orderdetails['package'].push(pkg);
                            this.setorderDetails();
                            if (type == 'mealpackage') {
                                this.loading.dismiss();
                                this.removeSlides();
                            }
                            else {
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
    addItemOrderDetail(item, type) {
        let itemToAdd = item;
        let kitchenName = this.kitchen.restaurantname;
        let ids = 'item_' + item._id;
        var x = document.getElementById(ids);
        if (this.orderdetails.restaurantid == '') {
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
        }
        else {
            if (this.orderdetails.restaurantid != itemToAdd.kitchenId) {
                let prompt = this.alertCtrl.create({
                    title: "Delete Cart?",
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
                                    this.orderdetails = { "customerid": this.currentCustomer['_id'], "subtotal": 0, "restaurantid": itemToAdd.kitchenId, "name": kitchenName, "items": [], "combo": [], "package": [], "currency": this.kitchen['currency'] };
                                }
                                else {
                                    this.orderdetails = { "customerid": "", "subtotal": 0, "restaurantid": "", "name": "", "items": [], "combo": [], "package": [], "currency": "" };
                                }
                                if (type == 'menu') {
                                    this.orderdetails.items.push(itemToAdd);
                                    this.setorderDetails();
                                }
                                if (type == 'combo') {
                                    this.orderdetails.combo.push(itemToAdd);
                                    this.setorderDetails();
                                }
                            }
                        }
                    ]
                });
                prompt.present();
            }
            else {
                if (type == 'menu') {
                    this.addSameResItem(itemToAdd, x);
                }
                if (type == 'combo') {
                    this.addSameResCombo(itemToAdd, x);
                }
            }
        }
    }
    addSameResItem(itemToAdd, qty) {
        if (this.orderdetails.items.length == 0) {
            itemToAdd.qty = parseInt(qty.innerHTML);
            this.orderdetails.items.push(itemToAdd);
            qty.innerHTML = 1;
            this.setorderDetails();
        }
        else {
            var index1 = this.orderdetails.items.findIndex(itemget => { return itemget._id == itemToAdd._id; });
            if (index1 != -1) {
                this.orderdetails.items[index1].qty += parseInt(qty.innerHTML);
                qty.innerHTML = 1;
                this.setorderDetails();
            }
            else {
                itemToAdd.qty = parseInt(qty.innerHTML);
                this.orderdetails.items.push(itemToAdd);
                qty.innerHTML = 1;
                this.setorderDetails();
            }
        }
    }
    setorderDetails() {
        this.orderdetails['subtotal'] = 0;
        let itemdetail = this.orderdetails['items'];
        if (typeof itemdetail != 'undefined' && itemdetail.length > 0) {
            for (let i = 0; i < itemdetail.length; i++) {
                this.orderdetails['subtotal'] = this.orderdetails['subtotal'] + (itemdetail[i].price * itemdetail[i].qty);
            }
        }
        var combo = this.orderdetails['combo'];
        if (typeof combo != 'undefined' && combo.length > 0) {
            for (var j = 0; j < combo.length; j++) {
                this.orderdetails['subtotal'] = parseInt(this.orderdetails['subtotal']) + (parseInt(combo[j].finalcomboprice) * parseInt(combo[j].qty));
            }
        }
        var pkg = this.orderdetails['package'];
        if (typeof pkg != 'undefined' && pkg.length > 0) {
            for (var k = 0; k < pkg.length; k++) {
                this.orderdetails['subtotal'] = parseInt(this.orderdetails['subtotal']) + (parseInt(pkg[k].packageprice) * pkg[k]['qty']);
            }
        }
        localStorage.setItem('cartinfo', JSON.stringify(this.orderdetails));
        this.orderdetails = JSON.parse(localStorage.getItem('cartinfo'));
        this.events.publish('cart:item', this.orderdetails, Date.now());
    }
    makeFav(id, type) {
        if (typeof this.currentCustomer.customerfavrestro != 'undefined') {
            let indx = this.currentCustomer.customerfavrestro.findIndex((mn) => mn.id == this.kitchenId);
            if (indx == -1) {
                let obj = { 'id': this.kitchenId, 'items': [] };
                obj.items.push(id);
                this.currentCustomer['customerfavrestro'].push(obj);
                this.updateCustomer();
            }
            else {
                if (type == 'add') {
                    this.currentCustomer.customerfavrestro[indx]['items'].push(id);
                }
                else {
                    this.currentCustomer.customerfavrestro[indx]['items'].splice(this.currentCustomer.customerfavrestro[indx]['items'].indexOf(id), 1);
                    if (this.currentCustomer.customerfavrestro[indx]['items'].length == 0) {
                        this.currentCustomer.customerfavrestro.splice(indx, 1);
                    }
                }
                this.updateCustomer();
            }
        }
        else {
            this.currentCustomer['customerfavrestro'] = [];
            let obj = { 'id': this.kitchenId, 'items': [] };
            obj.items.push(id);
            this.currentCustomer['customerfavrestro'].push(obj);
            this.updateCustomer();
        }
    }
    updateCustomer() {
        this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data) => {
            if (!data.error) {
                this.getCustomer(this.currentCustomer._id);
            }
        });
    }
    getCustomer(id) {
        this.ms3Service.getOneCustomer(id).subscribe((data) => {
            if (!data.error) {
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
                this.currentCustomer = data.message;
            }
        });
    }
    checkIfResFav() {
        if (typeof this.currentCustomer != 'undefined') {
            if (typeof this.currentCustomer.customerfavrestro != 'undefined') {
                if (this.currentCustomer['customerfavrestro'].length > 0) {
                    let indx = this.currentCustomer['customerfavrestro'].findIndex((mn) => mn.id == this.kitchenId);
                    if (indx > -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    checkFav(id) {
        if (typeof this.currentCustomer == 'undefined') {
            return true;
        }
        else {
            if (typeof this.currentCustomer.customerfavrestro == 'undefined') {
                return true;
            }
            else {
                if (this.currentCustomer['customerfavrestro'].length > 0) {
                    let indx = this.currentCustomer['customerfavrestro'].findIndex((mn) => mn.id == this.kitchenId);
                    if (indx > -1) {
                        let index = this.currentCustomer['customerfavrestro'][indx].items.findIndex((pq) => pq == id);
                        if (index > -1) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
    }
    getItemComboPackageRating() {
        this.ms4Service.getICPRating(this.kitchenId).subscribe((data) => {
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
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('pageSlider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Slides */])
], HomePage.prototype, "pageSlider", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"D:\OrderApp\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title text-capitalize>{{kitchen.restaurantname}}</ion-title>\n\n        <ion-icon  padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="card-background-page" has-bouncing="true">\n\n    <ion-row class = "displayBlock width100">\n\n	    <ion-row *ngIf = "!dayAndMenuData && !flexiData" class="topRow width100" [ngStyle]="{\'background-image\': \'url(\' + restroImage(kitchen.image[0]) +\')\'}">\n\n	    	<div class="topIcon white">\n\n	    		<ion-icon name="text" ios="ios-text" md="md-text" class="font1-75em marginRight5vw" (click) = "reviewPage()"></ion-icon>\n\n	    		<ion-icon name="information-circle" ios="ios-information-circle" md="md-information-circle" class="font1-75em marginRight5vw" (click)="presentPopover($event)"></ion-icon>\n\n	    	</div>\n\n	        <p text-capitalize class="card-title fontWeight500 white">{{kitchen.restaurantname}}, {{kitchen.city}}, {{kitchen.country}}</p>\n\n\n\n	        <p class="card-description white">\n\n	            <span *ngFor = "let rate of rateArray; let i = index; ">\n\n	                <ion-icon *ngIf = "kitchen.rating >= rate" class = "white font1-75em" name="star" ios="ios-star" md="md-star"></ion-icon>\n\n	                \n\n	                <ion-icon *ngIf = "kitchen.rating < rate && kitchen.rating > i" class = "white font1-75em" name="star-half" ios="ios-star-half" md="md-star-half"></ion-icon>\n\n\n\n	                <ion-icon *ngIf = "kitchen.rating < rate && kitchen.rating <= i" class = "white font1-75em" name="star-outline" ios="ios-star-outline" md="md-star-outline"></ion-icon>\n\n	            </span>\n\n	        </p>\n\n\n\n	        <ion-row *ngIf = "kitchen.openclose == \'close\' " class="card-allowed white" text-center>\n\n	        	<ion-col col-12 text-center> ** {{kitchen.openclose}} **</ion-col>\n\n	        	<ion-col col-12 text-center>Your can Pre-order for later</ion-col>\n\n	        </ion-row>\n\n\n\n	        <div class="width100"><button ion-button class="offerBtn" (click) = "offerPage()">OFFER</button></div>\n\n\n\n	        <ion-icon class="favIcon" *ngIf = "checkIfResFav()" color = "danger" float-right name="heart" ios="ios-heart" md="md-heart"></ion-icon>\n\n\n\n	    </ion-row>\n\n\n\n	    <ion-segment *ngIf = "!dayAndMenuData && !flexiData" [(ngModel)]="selectedSegment"> <!-- (ionChange)="onSegmentChanged($event)"> -->\n\n	        <ion-segment-button value="0" ion-long-press [interval]="1000" (onPressing)="detailMenu()" (onPressEnd)="released()" (click)="selectTab(0)">\n\n	           DAILY MENU\n\n	        </ion-segment-button>\n\n	        <ion-segment-button value="1" ion-long-press [interval]="1000" (onPressing)="detailCombo()" (onPressEnd)="released()" (click)="selectTab(1)"><!--  (click)="selectTab(1)" -->\n\n	            WEEKEND PACKAGE\n\n	        </ion-segment-button>\n\n	        <ion-segment-button value="2" ion-long-press [interval]="1000" (onPressing)="detailMeal()" (onPressEnd)="released()"  (click)="selectTab(2)"><!--  (click)="selectTab(2)" -->\n\n	            WEEKLY PACKAGE\n\n	        </ion-segment-button>\n\n	    </ion-segment>\n\n	    {{slidesHeight}}\n\n	</ion-row>\n\n\n\n\n\n	<ion-content>\n\n		\n\n		<ion-refresher class="homePageRefresher" *ngIf = "!dayAndMenuData && !flexiData" (ionRefresh)="doRefresh($event)">\n\n	        <ion-refresher-content></ion-refresher-content>\n\n	    </ion-refresher>\n\n\n\n		<!-- (ionSlideWillChange)="changeWillSlide($event)" -->\n\n		<ion-slides *ngIf = "!dayAndMenuData && !flexiData" #pageSlider  class="menuSlides">\n\n\n\n			<!-- [ngStyle]="{ \'height\': slidesMoving ? (slidesHeight + \'px\') : \'auto\' }" (ionSlideDidChange)="slideDidChange()"  -->\n\n\n\n			<ion-slide *ngIf="selectedSegment == 0">\n\n			    <ion-row *ngIf = "!menus">\n\n			    	<ion-col col-12 text-center>\n\n				    	<ion-spinner name="dots"></ion-spinner>\n\n				    </ion-col>\n\n			    </ion-row>\n\n				\n\n				<ion-item class="padding0 menuList noItemInnerBorder ">\n\n\n\n				    <ng-container style=" margin: 0 !important;" *ngIf = "menus && menus.length > 0 ">\n\n					\n\n				    	<div *ngFor="let menu of menus" class="singleMenuDiv">\n\n					    	<button text-capitalize ion-item (click)="toggleDetails(menu)">\n\n					    		<ion-thumbnail item-start>\n\n						        	<img style="object-fit:cover" [src]="menuImage(menu.image)">\n\n						        </ion-thumbnail>\n\n					    		{{menu.name}}\n\n					    		<ion-icon class="fontWeight700 font1-5em" [name]="menu.icon" item-end></ion-icon>\n\n					    	</button>\n\n					    	<div *ngIf="menu.showDetails" class="displayGrid itemList">\n\n					    		<div class="padding0" *ngFor = "let item of activeitems">\n\n						    		<ion-row class="padding0" *ngIf="menu._id == item.menuId._id">\n\n							        	<ion-col class="itemImage" col-3 no-padding [ngStyle]="{\'background-image\': \'url(\' + itemImage(item.image) + \')\'}"></ion-col>\n\n							    		<ion-col col-5>\n\n							    			<p text-capitalize class = "font2vh colorBlack whiteSpaceInitial">{{item.name}}\n\n												<ion-icon *ngIf = "currentCustomer && checkFav(item._id)" class="colorLightGray font1-5em" float-right name="heart" ios="ios-heart" md="md-heart" (click)="makeFav(item._id,\'add\')"></ion-icon>\n\n\n\n							    				<ion-icon *ngIf = "currentCustomer && !checkFav(item._id)" color = "danger" class="font1-5em" float-right name="heart" ios="ios-heart" md="md-heart" (click)="makeFav(item._id,\'remove\')"></ion-icon>\n\n							    			</p>\n\n							    			<p>\n\n							    				{{truckDesc(item.description)}}\n\n							    			</p>\n\n							    			<p class="colorLightGray font2vh colorBlack"><span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{item.price | number : \'1.2-2\'}}</p>\n\n							    			<p class = "font2vh">\n\n\n\n							    				<span *ngIf="itemsRatingIndex.indexOf(item._id) != -1">\n\n							    					<ng-container *ngFor = "let ratingg of itemsRatingIndex">\n\n							    						<ng-container *ngIf = "ratingg.id == item._id">\n\n							    							<span *ngFor = "let rate of rateArray; let i = index; ">\n\n												                <ion-icon *ngIf = "ratingg.average >= rate" class = "font1-75em" name="star" ios="ios-star" md="md-star"></ion-icon>\n\n												                \n\n												                <ion-icon *ngIf = "ratingg.average < rate && ratingg.average > i" class = "font1-75em" name="star-half" ios="ios-star-half" md="md-star-half"></ion-icon>\n\n\n\n												                <ion-icon *ngIf = "ratingg.average < rate && ratingg.average <= i" class = "font1-75em" name="star-outline" ios="ios-star-outline" md="md-star-outline"></ion-icon>\n\n												            </span>\n\n							    						</ng-container>\n\n							    						\n\n							    					</ng-container>\n\n							    				</span> \n\n							    				<span *ngIf="itemsRatingIndex.indexOf(item._id) == -1">\n\n							    					<ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n										            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n										            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n										            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n										            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n							    				</span>\n\n							    			</p>\n\n							    		</ion-col>\n\n							    		<ion-col col-4 class="addToCartCol" no-padding>\n\n							    			<ion-row no-margin class="qtyDiv font2vh width100 colorBlack">\n\n							    				<ion-icon class="fontWeight700" name="remove" ios="ios-remove" md="md-remove" (click)="decreaseQuantity(item._id)"></ion-icon>\n\n							    				<label id="item_{{item._id}}" no-margin class="quantity">1</label>\n\n							    				<ion-icon class="fontWeight700" name="add" ios="ios-add" md="md-add" (click)="increaseQuantity(item._id)"></ion-icon>\n\n							    			</ion-row>\n\n\n\n						    				<button no-margin ion-button class="addToCartBtn" (click) = "addToCart(item, \'menu\')">Add to Cart</button>\n\n							    		</ion-col>\n\n						    		</ion-row>\n\n					    		</div>\n\n					    	</div>\n\n				    	</div>\n\n				    </ng-container>\n\n\n\n				    <ng-container *ngIf = "menus && menus.length == 0 ">\n\n				    	<ion-item text-center class="paddin40-16px">\n\n			                <strong>No Menu Available!</strong>\n\n			            </ion-item>\n\n				    </ng-container>\n\n\n\n			    </ion-item>\n\n			</ion-slide>\n\n\n\n			<ion-slide *ngIf="selectedSegment == 1">\n\n				<ion-row *ngIf = "!weeklyrestaurants">\n\n			    	<ion-col col-12 text-center>\n\n				    	<ion-spinner name="dots"></ion-spinner>\n\n				    </ion-col>\n\n			    </ion-row>\n\n				<ion-item class="padding0 menuList">\n\n			    	<ng-container *ngIf = "weeklyrestaurants && weeklyrestaurants.length > 0 ">\n\n						\n\n				    	<div *ngFor="let wmenu of weeklyrestaurants" class="pkgMenu">\n\n					   \n\n					    	<button class="pkgImage" text-capitalize ion-item *ngIf = "wmenu.type == \'flexible\'" (click)="toggleDetailsweekend(wmenu)" [ngStyle]="{\'background-image\': \'url(\' + menuImage(wmenu.image) +\')\'}">\n\n					    		<ion-thumbnail item-start style="min-width:80px !important; min-height:80px !important">\n\n						        	<img style="object-fit:cover; min-width:80px !important; min-height:80px !important" [src]="menuImage(wmenu.image)">\n\n						        </ion-thumbnail>\n\n					    		{{truck(wmenu.name)}}  <small>{{wmenu.discount}} % OFF</small>\n\n								<div style="font-weight: 100 !important;font-size: 1.7vh !important">{{truckDesc(wmenu.description)}} </div>\n\n								<div style="font-weight: 100 !important;font-size: 1.7vh !important">  Price <strong> : {{wmenu.packageprice}} {{kitchen.currency}}</strong></div>\n\n								<!--  -->\n\n								<!-- -->\n\n								<ion-icon class="fontWeight700 font1-5em" [name]="wmenu.icon" item-end></ion-icon>\n\n							</button>\n\n							<div *ngIf="wmenu.showDetails && wmenu.type == \'flexible\'" class="displayGrid itemList">\n\n								<div class="padding0" *ngFor = "let day of wmenu.dayandmenus">\n\n									<ion-row  class="padding0" >\n\n										<ion-row col-12>\n\n										Day	<strong>: {{getCaptitalLetter(day.day)}}</strong>\n\n									</ion-row> \n\n										<ion-row col-12 *ngFor = "let mid of day.menuids">	\n\n												<ion-thumbnail item-start  col-4>\n\n						\n\n											<img style="object-fit:cover" [src]="itemImage(mid.image)">			\n\n										\n\n											</ion-thumbnail>\n\n											<ion-col  col-6>\n\n												<p text-capitalize class = "font2vh colorBlack whiteSpaceInitial">\n\n													Name <strong> : {{mid.name}}</strong>\n\n												</p>\n\n												<p item-end>\n\n													Qty	<strong> : {{mid.qty}}</strong>\n\n												</p>\n\n												<!-- <p class="colorLightGray font2vh colorBlack"><span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{mid.price | number : \'1.2-2\'}}</p> -->\n\n									\n\n											</ion-col>\n\n										\n\n										\n\n										\n\n										</ion-row>\n\n										\n\n									</ion-row>\n\n								</div>\n\n								<div text-center>\n\n									<button (click)="showFlexibleSlides(wmenu)" no-margin ion-button text-capitalize text-center style="background-color: #449d44; color:white;padding: 5px !important;" > Add </button>\n\n								</div>\n\n							</div>\n\n						</div>\n\n						\n\n					</ng-container>\n\n\n\n				    <ng-container *ngIf = "!weekendRestaurantCount">\n\n				    	<ion-item text-center class="paddin40-16px">\n\n			                <strong>No Weekend Package Available!</strong>\n\n			            </ion-item>\n\n				    </ng-container>\n\n			    </ion-item>\n\n			</ion-slide>\n\n\n\n			<ion-slide *ngIf="selectedSegment == 2">\n\n				<ion-row *ngIf = "!weeklyrestaurants">\n\n			    	<ion-col col-12 text-center>\n\n				    	<ion-spinner name="dots"></ion-spinner>\n\n				    </ion-col>\n\n			    </ion-row>\n\n				<ion-item class="padding0 menuList">\n\n			    	<ng-container *ngIf = "weeklyrestaurants && weeklyrestaurants.length > 0 ">\n\n				    	<div *ngFor="let wmenu of weeklyrestaurants; let i = index" class="pkgMenu">\n\n					    	<button class="pkgImage" text-capitalize ion-item *ngIf = "wmenu.type == \'fixed\'" (click)="toggleDetailsweekend(wmenu)" [ngStyle]="{\'background-image\': \'url(\' + menuImage(wmenu.image) +\')\'}">\n\n					    		<ion-thumbnail item-start style="min-width:80px !important; min-height:80px !important">\n\n						        	<img style="object-fit:cover; min-width:80px !important; min-height:80px !important" [src]="menuImage(wmenu.image)">\n\n						        </ion-thumbnail>\n\n					    		{{truck(wmenu.name)}}  \n\n								<div style="font-weight: 100 !important;font-size: 1.7vh !important">{{truckDesc(wmenu.description)}} </div>\n\n								<div style="font-weight: 100 !important;font-size: 1.7vh !important">  Price <strong> : {{wmenu.packageprice}} {{kitchen.currency}}</strong></div>\n\n								<!--  -->\n\n								<!-- -->\n\n								<ion-icon class="fontWeight700 font1-5em" [name]="wmenu.icon" item-end></ion-icon>\n\n							</button>\n\n					 \n\n\n\n\n\n							<div *ngIf="wmenu.showDetails && wmenu.type == \'fixed\'" class="displayGrid itemList">\n\n								<div class="padding0" *ngFor = "let day of wmenu.dayandmenus">\n\n									<ion-row  class="padding0" >\n\n										<ion-row col-12>\n\n										Date	<strong>: {{getDateForWeeklyPackges(day.date)}}</strong>\n\n									</ion-row> \n\n										<ion-row col-12 *ngFor = "let mid of day.menuids">	\n\n												<ion-thumbnail item-start  col-4>\n\n						\n\n											<img style="object-fit:cover" [src]="itemImage(mid.image)">			\n\n										\n\n											</ion-thumbnail>\n\n											<ion-col  col-6>\n\n												<p text-capitalize class = "font2vh colorBlack whiteSpaceInitial">\n\n													Name <strong> : {{mid.name}}</strong>\n\n												</p>\n\n												<p item-end>\n\n													Qty	<strong> : {{mid.qty}}</strong>\n\n												</p>\n\n												<!-- <p class="colorLightGray font2vh colorBlack"><span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{mid.price | number : \'1.2-2\'}}</p> -->\n\n									\n\n											</ion-col>\n\n										\n\n										\n\n										\n\n										</ion-row>\n\n										\n\n									</ion-row>\n\n								</div>\n\n								<div text-center>\n\n									<button (click) = "addFlexiMealPkg(wmenu,i)" no-margin ion-button text-capitalize text-center style="background-color: #449d44; color:white;padding: 5px !important;" > Add To Cart </button>\n\n								</div>\n\n							</div>\n\n\n\n\n\n\n\n					    </div>\n\n					</ng-container>\n\n\n\n				    <ng-container *ngIf = "!weeklyRestaurantCount" >\n\n				    	<ion-item text-center class="paddin40-16px">\n\n			                <strong>No Weekly Package Available!</strong>\n\n			            </ion-item>\n\n				    </ng-container>\n\n			    </ion-item>\n\n			</ion-slide>\n\n		</ion-slides>\n\n	</ion-content>\n\n\n\n	<ion-slides class = "homeSlides" pager *ngIf = "dayAndMenuData">\n\n		<ion-slide *ngFor="let slide of dayAndMenuData.dayandmenus">\n\n			<ion-row class="pkgCancelRow">\n\n				<ion-col text-right (click)="removeSlides()">Cancel</ion-col>\n\n			</ion-row>\n\n			<ion-toolbar padding-horizontal class="white">\n\n				{{slide.date | date : \'fullDate\'}}\n\n			</ion-toolbar>\n\n\n\n    		<ion-row class="padding0 slideItemRow" *ngFor = "let item of slide.menuids">\n\n	        	<ion-col class="itemImage" col-3 no-padding [ngStyle]="{\'background-image\': \'url(\' + itemImage(item.image) + \')\'}"></ion-col>\n\n	    		<ion-col>\n\n	    			<ion-row text-capitalize class = "colorBlack width100">{{truck(item.name)}}</ion-row>\n\n	    			<!-- <ion-row class="colorLightGray font3vw width100"><span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{item.price | number : \'1.2-2\'}}</ion-row> -->\n\n	    			<ion-row *ngIf = "item.qty" class="colorLightGray font3vw width100"> \n\n	    				<ion-col col-6 text-left><strong>Qty :</strong>&nbsp;{{item.qty}}</ion-col>\n\n	    				<ion-col col-6 text-right><strong><span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{item.price * item.qty | number : \'1.2-2\'}}</strong></ion-col>\n\n	    			</ion-row>\n\n\n\n	    		</ion-col>\n\n    		</ion-row>\n\n		</ion-slide>\n\n\n\n		<ion-slide>\n\n			<ion-row class="pkgCancelRow">\n\n				<ion-col text-right (click)="removeSlides()">Cancel</ion-col>\n\n			</ion-row>\n\n			<ion-list>\n\n				<ion-item class="font1-5em">\n\n					<ion-thumbnail item-start>\n\n			        	<img style="object-fit:cover" [src]="menuImage(dayAndMenuData.image)">\n\n			        </ion-thumbnail>\n\n			        <strong>{{truck(dayAndMenuData.name)}}</strong>\n\n				</ion-item>\n\n			</ion-list>\n\n\n\n			<ion-row padding-bottom class="font1-5em">\n\n				<ion-col col-3 col-sm-2 text-left>\n\n					Package Duration :\n\n				</ion-col>\n\n\n\n				<ion-col text-left>\n\n					{{dayAndMenuData.startdate | date : \'mediumDate\'}} - {{dayAndMenuData.enddate | date : \'mediumDate\'}}\n\n				</ion-col>\n\n			</ion-row>\n\n			<ion-row padding-bottom class="font1-5em">\n\n				<ion-col col-5 col-sm-4 text-left>\n\n					Package Price :\n\n				</ion-col>\n\n\n\n				<ion-col text-left>\n\n					<span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{dayAndMenuData.packageprice | number : \'1.2-2\'}}\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-col class="addToCartCol">\n\n    				<button full no-margin ion-button class="addPkgToCartBtn" (click) = "addToCart(dayAndMenuData, \'mealpackage\')">Add Weekly Package to Cart</button>\n\n	    		</ion-col>\n\n			</ion-row>\n\n		</ion-slide>\n\n	</ion-slides>\n\n\n\n	<ion-slides class = "homeSlides" *ngIf = "flexiData">\n\n		<ion-slide>\n\n			<ion-row class="pkgCancelRow">\n\n				<ion-col text-right (click)="removeFlexibleSlides()">Cancel</ion-col>\n\n			</ion-row>\n\n			<ion-list>\n\n				<ion-item text-capitalize class="font1-5em">\n\n					<ion-thumbnail item-start>\n\n			        	<img style="object-fit:cover" [src]="menuImage(flexiData.image)">\n\n			        </ion-thumbnail>\n\n			        <strong>{{truck(flexiData.name)}}</strong>\n\n				</ion-item>\n\n			</ion-list>\n\n\n\n			<ion-row>\n\n				<ion-col col-12 class="paddingHorizontal0"><strong>Select Date : </strong></ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row class="borderNone">\n\n				<ion-col col-12 text-left><strong>Start Date : </strong></ion-col>\n\n				\n\n				<ion-col col-12 text-left>\n\n					<!-- <ion-datetime placeholder = "Select Start Dat1e" [min]="currentDate" [max] = "checkMaxDate()" displayFormat="DDDD " pickerFormat="DDDD " [(ngModel)]="event.startDate"  (ionChange)="dateFunction($event)"></ion-datetime> -->\n\n						<span ion-datepicker  [(value)]="localDate" [disabledDates]="disabledDateArray" [min]="minDate" (ionChanged)="startDateSelected($event , localDate)"  [max]="maxDate" clear class="ScheduleDate">\n\n									<span>{{localDate | date}} <ion-icon name="clipboard" item-left ></ion-icon>  </span>\n\n						</span>\n\n						<!-- <label  ion-datepicker  [(value)]="localDate" [disabledDates]="disabledDateArray" [min]="minDate"  [max]="maxDate" clear class="ScheduleDate"> Select Start Date</label> -->\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row class="borderNone">\n\n				<ion-col col-12 text-left><strong>End Date : </strong></ion-col>\n\n				\n\n				<ion-col col-12 text-left>\n\n					<!-- <ion-datetime placeholder = "Select End Date" [min]="pkgEndStartDate" [max] = "currentDateAfterTenYrs" displayFormat="MMM DDDD, YYYY" pickerFormat="DD MMM YYYY" [(ngModel)]="event.endDate" (ionChange)="dateFunction($event)"></ion-datetime> -->\n\n					<ion-input disabled  placeholder="Select End Date" [value]="formatted_date"   id="endDate" ></ion-input>\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<!-- <ion-col *ngIf = "checkRevise" col-12 class="addToCartCol paddingHorizontal0">\n\n					<ion-item class="borderNone">\n\n						<ion-label>Repeat Weekly Menu</ion-label>\n\n						<ion-checkbox (ionChange)="checkReviseFunction()" [(ngModel)]="reviseFlexi"></ion-checkbox>\n\n					</ion-item>\n\n				</ion-col> -->\n\n\n\n				<ion-col col-12 class="addToCartCol">\n\n    				<button  full no-margin ion-button class="addPkgToCartBtn" (click) = "addToCartWeekend(flexiData)">Add to Cart</button>\n\n	    		</ion-col>\n\n			</ion-row>\n\n		</ion-slide>\n\n	</ion-slides>\n\n\n\n	<ion-slides class = "homeSlides" pager *ngIf = "selectItem && flexiData">\n\n\n\n		<ion-slide *ngFor="let slide of datesArray; let i = index; ">\n\n\n\n			<ion-row class="width100 pkgCancelRow">\n\n				<ion-col *ngIf = "flexiTotal && flexiTotal.subTotal" text-left>Total : <span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{flexiTotal.subTotal}}</ion-col>\n\n				<ion-col text-right (click)="removeFlexibleSlides()">Cancel</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-toolbar padding-horizontal text-left class="white" text-capitalize>\n\n				{{slide.date | date : \'fullDate\'}}\n\n			</ion-toolbar>\n\n\n\n    		<ion-list *ngIf = "slide.tempmenuids && slide.tempmenuids.length > 0">\n\n	    		<ion-item class="flexiIonItem" *ngFor = "let item of slide.tempmenuids;">\n\n		        	<ion-label>\n\n			        	<ion-thumbnail><!--  item-start [ngStyle]="{\'background-image\': \'url(\' + itemImage(item.image) + \')\'}" -->\n\n			        		<img style="object-fit:cover" [src]="itemImage(item.image)">\n\n			        	</ion-thumbnail>\n\n		    			<div>\n\n		    				<h2 text-capitalize>{{item.name}}</h2>\n\n		    				<p><span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{item.price | number : \'1.2-2\'}}</p>\n\n		    			</div>\n\n		        	</ion-label>\n\n		        	<ion-checkbox (ionChange)="addMenuToFlexiDate($event,item, i)"></ion-checkbox>\n\n	    		</ion-item>\n\n    		</ion-list>\n\n\n\n    		<ion-list class="" *ngIf = "slide.tempmenuids && slide.tempmenuids.length == 0">\n\n    			<ion-item>\n\n    				No Item this day!\n\n    			</ion-item>\n\n    		</ion-list>\n\n		</ion-slide>\n\n\n\n		<ion-slide>\n\n\n\n			<ion-row class="width100 pkgCancelRow">\n\n				<ion-col text-right (click)="removeFlexibleSlides()">Cancel</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-list>\n\n				<ion-item text-capitalize class="font1-5em">\n\n					<ion-thumbnail item-start>\n\n			        	<img style="object-fit:cover" [src]="menuImage(flexiData.image)">\n\n			        </ion-thumbnail>\n\n			        <strong>{{flexiData.name}}</strong>\n\n				</ion-item>\n\n			</ion-list>\n\n\n\n			<ion-row padding-bottom class="font1-5em">\n\n				<ion-col col-12 text-left>\n\n					<strong>Duration :</strong>\n\n				</ion-col>\n\n\n\n				<ion-col col-12 text-left>\n\n					{{event.startDate | date : \'mediumDate\'}} - {{event.endDate | date : \'mediumDate\'}} ({{dayDif +1}} days)\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row *ngIf = "flexiTotal && flexiTotal.subTotal" padding-bottom class="font1-5em">\n\n				<ion-col col-7 col-sm-5 text-left>\n\n					Package Price :\n\n				</ion-col>\n\n				<ion-col *ngIf = "!reviseFlexi" text-left>\n\n					<span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{flexiTotal.subTotal | number : \'1.2-2\'}}\n\n				</ion-col>\n\n				<ion-col *ngIf = "reviseFlexi" text-left>\n\n					<span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{flexiRepeatTotal.subTotal | number : \'1.2-2\'}}\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row *ngIf = "flexiTotal && flexiTotal.subTotal" padding-bottom class="font1-5em">\n\n				<ion-col col-7 col-sm-5 text-left>\n\n					Discount &nbsp;( {{flexiData.discount}} % ) :\n\n				</ion-col>\n\n				<ion-col *ngIf = "!reviseFlexi" text-left>\n\n					<span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{(flexiTotal.subTotal * flexiData.discount)/100 | number : \'1.2-2\'}}\n\n				</ion-col>\n\n				<ion-col *ngIf = "reviseFlexi" text-left>\n\n					<span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{(flexiRepeatTotal.subTotal * flexiData.discount)/100 | number : \'1.2-2\'}}\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row *ngIf = "flexiTotal && flexiTotal.subTotal" padding-bottom class="font1-5em">\n\n				<ion-col col-7 col-sm-5 text-left>\n\n					Total :\n\n				</ion-col>\n\n				<ion-col *ngIf = "!reviseFlexi" text-left>\n\n					<span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{getPrice(flexiTotal.subTotal,flexiData.discount,\'noRepeat\') | number : \'1.2-2\'}}\n\n				</ion-col>\n\n				<ion-col *ngIf = "reviseFlexi" text-left>\n\n					<span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span> {{getPrice(flexiRepeatTotal.subTotal,flexiData.discount,\'repeat\') | number : \'1.2-2\'}}\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-col class="addToCartCol">\n\n    				<button full no-margin ion-button class="addPkgToCartBtn" (click) = "addFlexiMealPkg()" [disabled] = "flexiTotal && flexiTotal.subTotal ? false : true ">Add Weekly Package to Cart</button>\n\n	    		</ion-col>\n\n			</ion-row>\n\n		</ion-slide>\n\n	</ion-slides>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["b" /* MS2Service */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["e" /* MS6Service */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyPopOverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*import { MS6Service } from '../../app/service/index';*/
let MyPopOverPage = class MyPopOverPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.kitchen = {};
        this.kitchen = navParams.get('kitchen');
        this.cuisines = navParams.get('cuisines');
        if (this.kitchen.openinghours.length > 0) {
            this.kitchen.openinghours = this.checkTimeFormat(this.kitchen['openinghours']);
        }
    }
    ionViewDidLoad() {
        console.log("popover page");
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
    }
    checkTimeFormat(timeObj) {
        timeObj.forEach((time) => {
            time.times.forEach((obj) => {
                let open = obj.open.split(':');
                let close = obj.close.split(':');
                open[0] = open[0].length == 1 ? '0' + open[0] : open[0];
                close[0] = close[0].length == 1 ? '0' + close[0] : close[0];
                obj.open = open[0] + ' : ' + open[1];
                obj.close = close[0] + ' : ' + close[1];
            });
        });
        return timeObj;
    }
};
MyPopOverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-my-pop-over',template:/*ion-inline-start:"D:\OrderApp\src\pages\home\my-pop-over.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Basic Detail</ion-title>\n\n        <ion-icon  padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true" >\n\n	<!-- <ion-item> --><!--  class="popover-page" -->\n\n\n\n		<ion-row *ngIf = "kitchen.openclose == \'close\' " class="openCloseDiv" text-center>\n\n        	<ion-col col-12 text-center text-uppercase> ** {{kitchen.openclose}} **</ion-col>\n\n        	<ion-col col-12 text-center>Your can Pre-order for later</ion-col>\n\n        </ion-row>\n\n\n\n		<ion-row class="whiteDiv" *ngIf = "kitchen.openinghours && kitchen.openinghours.length > 0">\n\n	        <ion-row class= "width100">\n\n	            <ion-col col-12><strong>Working Hours : </strong></ion-col>\n\n	        </ion-row>\n\n	        <hr class="width100 height2px">\n\n	        <ion-row padding-horizontal class= "width100">\n\n	        	<ion-col col-6><strong>Days</strong></ion-col>\n\n	        	<ion-col col-6><strong>Opening Hours</strong></ion-col>\n\n	        </ion-row>\n\n	        <ion-row *ngFor = "let eachday of kitchen.openinghours" class= "width100 paddingHorizontal6px">\n\n            	<ion-col col-5 text-capitalize><strong>{{eachday.name}}</strong></ion-col>\n\n	            <ion-col col-7>\n\n	            	<ion-row class = "width100" *ngFor = "let timeArr of eachday.times">\n\n	            		{{timeArr.open}} - {{timeArr.close}}\n\n	            	</ion-row>\n\n	            </ion-col>\n\n	        </ion-row>\n\n	    </ion-row>\n\n\n\n\n\n		<ion-row class="whiteDiv" *ngIf = "kitchen.minimumorder && kitchen.minimumorder != \'null\'"><strong>Min Order Amount : &nbsp; </strong><span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}} &nbsp;</span> {{kitchen.minimumorder}}</ion-row>\n\n\n\n		<ion-row class="whiteDiv" *ngIf = "kitchen.mindeliveryime && kitchen.mindeliveryime != \'null\'"><strong>Delivery Time : &nbsp; </strong>{{kitchen.mindeliveryime}} min</ion-row>\n\n\n\n		<ion-row class="whiteDiv" *ngIf = "kitchen.preorderforlater"><strong>Pre-Order for Later : &nbsp; </strong>Yes <span *ngIf = "kitchen.preorderforlaterafterdays"> &nbsp; (after {{kitchen.preorderforlaterafterdays}} days) </span></ion-row>\n\n		\n\n		<ion-row class="whiteDiv" *ngIf = "!kitchen.preorderforlater"><strong>Pre-Order for Later : &nbsp; </strong>No</ion-row>\n\n\n\n		<ion-row class="whiteDiv" *ngIf = "kitchen.cateringcapacity"><strong>Catering Capacity : &nbsp; </strong>{{kitchen.cateringcapacity}}</ion-row>\n\n\n\n		<ion-row class="whiteDiv" *ngIf="cuisines && cuisines.length > 0"><strong>Cuisines : &nbsp; </strong><span *ngFor = "let cuisine of cuisines" text-capitalize> {{cuisine.name}}, </span></ion-row>\n\n		\n\n		<ion-row class="whiteDiv" *ngIf="kitchen.offerings && kitchen.offerings.length > 0"><strong>Offerings : &nbsp; </strong><span *ngFor = "let offering of kitchen.offerings" text-capitalize> {{offering}}, </span></ion-row>\n\n    <!-- </ion-item> -->\n\n</ion-content>'/*ion-inline-end:"D:\OrderApp\src\pages\home\my-pop-over.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
], MyPopOverPage);

//# sourceMappingURL=my-pop-over.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThankPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_list__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/


/*declare var FCMPlugin : any;*/
/*import { AngularFirestore } from 'angularfire2/firestore';*/
/*import { Observable } from 'rxjs/Observable';*/
/**
* Generated class for the CartPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let ThankPage = class ThankPage {
    constructor(navCtrl, nav, navParams, afd) {
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.afd = afd;
        this.orderEntry = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/orders');
        this.order = navParams.get('order');
        this.country = navParams.get('country');
        console.log("SENDING NOTIFICATION");
        this.afd.list(this.orderEntry).push({
            orderID: this.order['_id'],
            orderStatus: this.order['status'],
            restaurantid: this.order['restaurantid'],
            customerid: this.order['customerid'],
            type: 'item',
            badge: 1
        }).then(() => {
            console.log('Order Pushed');
            /*alert('Order Pushed');*/
        });
        // console.log("NEW CODE")
        // this.orderEntry.once("value").then(snapshot=>{
        // 	console.log("DATA GETTED");
        // 	let data = snapshot.val();
        // 	Object.keys(data).forEach(key=>{
        // 		firebase.database().ref(`/orders/${key}`).remove().then(()=>console.log("delete"))
        // 	})
        // })
    }
    ionViewDidLoad() {
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
    homePage() {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__list_list__["a" /* ListPage */], {
            country: this.country
        });
    }
};
ThankPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-thankpage',template:/*ion-inline-start:"D:\OrderApp\src\pages\cart\thankupage.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Completed</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding has-bouncing="true">\n\n	<!-- <ion-row text-center> -->\n\n	<div class="thnkDiv">\n\n		<h3  text-center>Thank You</h3>\n\n		<ion-row>\n\n			<ion-col text-center><strong>Order Successfull</strong></ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col text-center><strong>Order Id : #{{order._id.substr(18,6)}}</strong></ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col text-center><ion-icon name="happy" ios="ios-happy" md="md-happy"></ion-icon></ion-col>\n\n		</ion-row>\n\n	</div>\n\n	<!-- </ion-row> -->\n\n	<button ion-button full (click)="homePage()">Go To Home</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\cart\thankupage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"]])
], ThankPage);

//# sourceMappingURL=thankupage.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddOn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__checkout__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let AddOn = class AddOn {
    constructor(appCtrl, toastCtrl, viewCtrl, param, MS4Service) {
        this.appCtrl = appCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.param = param;
        this.MS4Service = MS4Service;
        // @ViewChild('content') navCtrl: NavController ;
        this.imageUrl = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.addOns = [];
        this.addOnTotal = 0;
        this.total = 0;
        this.totalWithAddOns = 0;
        this.orderDetail = this.param.get('orderDetail');
        this.kitchen = this.param.get('kitchen');
        this.deliveryRate = this.param.get('deliveryRate');
        console.log(this.orderDetail, '16-addon');
        this.total = this.orderDetail.total;
        this.totalWithAddOns = this.orderDetail.total;
        this.MS4Service.getAllAddonKitchen(this.orderDetail.restaurantid).subscribe((res) => {
            console.log(res, 'ADD-ONs');
            this.addOns = res.message;
            this.addQuntity();
        });
    }
    addQuntity() {
        for (let i = 0; i < this.addOns.length; i++) {
            console.log("ADD ON QTY");
            this.addOns[i].qty = 1;
        }
    }
    confirm() {
        const confirmed = true;
        this.viewCtrl.dismiss({ confirmed });
    }
    cancel() {
        this.viewCtrl.dismiss();
    }
    changeAddOns(e, addOn, addOns) {
        console.log(addOn, addOns);
        addOns.qty = addOn;
        this.addcalculation();
    }
    addToCart(addOn) {
        addOn.add = true;
        addOn.perItemImpression = addOn.perItemImpression + 1;
        this.MS4Service.addAddonEdit(addOn._id, {
            perItemImpression: addOn.perItemImpression
        }).subscribe((res) => {
            console.log(res);
        });
        this.addcalculation();
    }
    addcalculation() {
        this.addOnTotal = 0;
        for (let i = 0; i < this.addOns.length; i++) {
            if (this.addOns[i].add) {
                this.addOnTotal += parseFloat(this.addOns[i].finalprice) * this.addOns[i].qty;
                //	console.log(this.addOnTotal);
            }
        }
        this.totalWithAddOns = this.total + this.addOnTotal;
        console.log(this.addOnTotal);
    }
    removeToCart(addOn) {
        addOn.add = false;
        addOn.perItemImpression = addOn.perItemImpression - 1;
        this.MS4Service.addAddonEdit(addOn._id, {
            perItemImpression: addOn.perItemImpression
        }).subscribe((res) => {
            console.log(res);
        });
        this.addcalculation();
    }
    addOnCart() {
        let addOnsItem = [];
        let addOnTotal = this.addOnTotal;
        for (let i = 0; i < this.addOns.length; i++) {
            if (this.addOns[i].add) {
                addOnsItem.push(this.addOns[i]);
            }
        }
        this.orderDetail.addOnItem = addOnsItem;
        this.orderDetail.addOnTotal = this.addOnTotal;
        if (this.orderDetail.addOnTotal) {
            this.orderDetail.total = this.orderDetail.total + this.orderDetail.addOnTotal;
        }
        // localStorage.setItem('cartinfo', JSON.stringify(this.orderDetail));
        // this.orderDetail = JSON.parse(localStorage.getItem('cartinfo'));
        console.log('DEATIL ORDER ', this.orderDetail);
        // localStorage.setItem('cartinfo', JSON.stringify(this.orderDetail));
        // this.orderDetail = JSON.parse(localStorage.getItem('cartinfo'));
        // this.checkoutOrder();
        if (this.orderDetail['customerid'] != '') {
            localStorage.setItem('cartinfo', JSON.stringify(this.orderDetail));
            console.log("Nav is no Provider");
            this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__checkout__["a" /* CheckoutPage */], {
                orderdetails: this.orderDetail,
                kitchen: this.kitchen,
                deliveryRate: this.deliveryRate
            });
            console.log("View Dismiss");
            this.viewCtrl.dismiss();
        }
        else {
            this.getToast('Login before proceeding to checkout');
            this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */], {
                pop: 'pop'
            });
            this.viewCtrl.dismiss();
        }
    }
    truck(text) {
        if (text.length < 30) {
            return text;
        }
        else {
            return text.slice(0, 27).concat("...");
        }
    }
    truckDesc(text) {
        if (text.length < 110) {
            return text;
        }
        else {
            return text.slice(0, 107).concat("...");
        }
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    getOrderImage(img) {
        let imgPath;
        if (typeof img == 'undefined' || img == null || img == '') {
            imgPath = "assets/imgs/res1.jpg";
        }
        else {
            imgPath = this.imageUrl + img;
        }
        return imgPath;
    }
};
AddOn = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'add-on',template:/*ion-inline-start:"D:\OrderApp\src\pages\cart\add-on.html"*/'<ion-header>\n\n     \n\n    <ion-navbar>\n\n        \n\n        <ion-title>Add-On</ion-title>\n\n        <ion-buttons end>\n\n                <button ion-button icon-only (click)="cancel()">\n\n                    <ion-icon item-right name="ios-close-outline"></ion-icon>\n\n                </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    <div class="content-grid;" style="margin-bottom: 10px;display: flex;padding: 10px;  border-bottom: 1px solid #d9d9d9;  align-items: center;" *ngFor="let addOn of addOns">\n\n     \n\n     <div class="obit-img" style="    object-fit: cover;\n\n      width: 20vw;\n\n      height: 20vw;\n\n      overflow: hidden;\n\n      border-radius: 50%;\n\n      display: inline-flex;\n\n      justify-content: center;\n\n      align-items: stretch;\n\n      margin: 0 10px;">\n\n       \n\n        <img *ngIf="addOn.image" class="orderThumbnails" src="{{imageUrl}}/{{addOn.image}}" />\n\n      </div>\n\n      <div style="width: 80%">\n\n    <div >\n\n      <h2 style="\n\n      text-align: left;">{{truck(addOn.name) }}</h2>\n\n    </div>\n\n      <div style="text-align: left;">{{truckDesc(addOn.description) }}</div>\n\n      <div  style="    display: flex;\n\n      justify-content: space-between;">\n\n          <div>\n\n           <div style="text-align: left;">Price :  {{addOn.finalprice  | number : \'1.1-2\'}} <b style="font-size: 9px;"> {{orderDetail.currency}} </b>\n\n           </div>\n\n      \n\n      <div  class="input-group" style="text-align: left;">Quantity : <input class="menuQty" type="number" name="" [value]="addOn.qty" min="0" #addOnQty (change) = "changeAddOns($event,addOnQty.value,addOn)" (keyup) = "changeAddOns($event,addOnQty.value,addOn)" style="width: 35px;border: 0;">\n\n         \n\n      </div>\n\n    </div>\n\n        <div> \n\n          <button [ngClass]="{\'display\':addOn.add}" ion-button class="green" style="min-width: 20vw;" (click)="addToCart(addOn)">  Add To Cart </button>\n\n          <button [ngClass]="{\'display\':!addOn.add}" class="red" ion-button style="min-width: 30vw;" (click)="removeToCart(addOn)">  Remove From Cart </button>\n\n        </div>\n\n    </div>\n\n    </div>\n\n    <hr> \n\n    \n\n    \n\n    </div>\n\n \n\n</ion-content>\n\n<ion-footer style="bottom: -5px !important;">\n\n        <div style="text-align: center;\n\n        background: white;\n\n        width: 100%;">\n\n            <div style="display: flex;padding: 10px;\n\n            justify-content: space-between;">\n\n               <span> Sub Total :</span> <span>{{total | number : \'1.2-2\'}}</span>\n\n            </div>\n\n            <hr style="background: #d9d9d9;">\n\n            <div style="display: flex;padding: 10px;\n\n            justify-content: space-between;">\n\n                <span> Add-On Total :</span> <span>{{addOnTotal | number : \'1.2-2\'}}</span>\n\n             </div>\n\n             <hr style="background: #d9d9d9;">\n\n             <div style="display: flex;padding: 10px;\n\n             justify-content: space-between;">\n\n                <span> Total :</span> <span>{{totalWithAddOns| number : \'1.2-2\'}}</span>\n\n             </div>\n\n            <ion-row>\n\n            <button ion-button class="green" full style="width: 100%;padding: 5px;" (click)="addOnCart()">\n\n                Checkout \n\n            </button>\n\n        </ion-row>\n\n        </div>\n\n    </ion-footer>'/*ion-inline-end:"D:\OrderApp\src\pages\cart\add-on.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["d" /* MS4Service */]])
], AddOn);

//# sourceMappingURL=add-on.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
* Generated class for the OfferPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let OfferPage = class OfferPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.offer = [];
        let offer = navParams.get('offer');
        this.kitchen = navParams.get('kitchen');
        if (typeof offer != 'undefined' && offer.length > 0)
            this.sortOffer(offer);
    }
    sortOffer(offer) {
        offer.forEach((item) => {
            let expDate = new Date(item['expirydate']);
            let date = new Date();
            if (expDate >= date) {
                item['valid'] = true;
                this.offer.push(item);
            }
            else {
                item['valid'] = false;
            }
        });
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
    ionViewDidLoad() {
        console.log('ionViewDidLoad OfferPage');
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
    }
};
OfferPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-offer',template:/*ion-inline-start:"D:\OrderApp\src\pages\offer\offer.html"*/'<!--\n\nGenerated template for the OfferPage page.\n\n\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\n\nIonic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n	<ion-navbar>\n\n		<ion-title>Offer</ion-title>\n\n        <ion-icon padding-top padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n	<ion-list *ngIf = "offer && offer.length > 0">\n\n        <ng-container *ngFor = "let ofr of offer">\n\n            <ion-item *ngIf = "ofr.valid" no-padding>\n\n                <ion-row>\n\n                    <ion-col col-3 class="displayGrid font4vw" text-center>\n\n                        <!-- <ion-icon name="thumbs-up" ios="ios-thumbs-up" md="md-thumbs-up"></ion-icon> -->\n\n                        <div class="width100 fontWeight700" *ngIf="ofr.type == \'Price\'">\n\n                            <span *ngIf = "kitchen && kitchen.currency">{{kitchen.currency}}</span><br>{{ofr.percentorpricevalue}}<br>OFF\n\n                        </div>\n\n                        <div class="width100 fontWeight700" *ngIf="ofr.type == \'Percent\'">\n\n                            {{ofr.percentorpricevalue}}<br>%<br>OFF\n\n                        </div>\n\n                    </ion-col>\n\n\n\n                    <ion-col>\n\n                        <!-- <ion-row class= "width100">Title : <strong>{{ofr.name}}</strong></ion-row> -->\n\n                        <p><strong>{{ofr.name}}</strong></p>\n\n                        <ion-row class= "width100">Coupon Code : <strong>{{ofr.couponcode}}</strong></ion-row>\n\n                        <ion-row class= "width100">In Date : <strong>{{ofr.indate | date : \'mediumDate\'}}</strong></ion-row>\n\n                        <ion-row class= "width100">Expiry Date : <strong>{{ofr.expirydate | date : \'mediumDate\'}}</strong></ion-row>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-item>\n\n        </ng-container>\n\n    </ion-list>\n\n\n\n    <ion-list *ngIf = "offer && offer.length == 0">\n\n        <ion-item no-padding>\n\n            <ion-row>\n\n                No Offer Available!\n\n            </ion-row>\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\offer\offer.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
], OfferPage);

//# sourceMappingURL=offer.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
* Generated class for the ReviewPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let ReviewPage = class ReviewPage {
    constructor(navCtrl, navParams, ms4Service, toastCtrl, events, ms3service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ms4Service = ms4Service;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.ms3service = ms3service;
        this.imageURL = __WEBPACK_IMPORTED_MODULE_4__app_global__["c" /* url1 */] + "uploads/";
        this.kitchenId = navParams.get('kitchenId');
        this.getReviewRating();
    }
    getReviewRating() {
        this.ms4Service.getReviewRating(this.kitchenId).subscribe((data) => {
            if (!data.error) {
                this.reviewRating = data.message;
                if (this.reviewRating['deliveryTimeRating'] == 'NaN') {
                    this.rateDeliveryTime = 0;
                }
                else {
                    this.rateDeliveryTime = this.reviewRating['deliveryTimeRating'];
                }
                if (this.reviewRating['orderPackagingRating'] == 'NaN') {
                    this.rateOrderPacking = 0;
                }
                else {
                    this.rateOrderPacking = this.reviewRating['orderPackagingRating'];
                }
                if (this.reviewRating['valueOfTimeRating'] == 'NaN') {
                    this.rateValueOfMoney = 0;
                }
                else {
                    this.rateValueOfMoney = this.reviewRating['valueOfTimeRating'];
                }
                /*this.reviewRating = data.message;*/
                var temparr = [];
                if (this.reviewRating['review'].length > 0) {
                    this.reviewRating['review'].forEach((item) => {
                        var index = temparr.indexOf(item.customerId);
                        if (index == -1) {
                            temparr.push(item.customerId);
                        }
                    });
                }
                var obj = { "ids": temparr };
                this.ms3service.getMultipleCust(obj).subscribe((customers) => {
                    this.customerObj = customers.message;
                    if (this.reviewRating['review'].length > 0) {
                        this.reviewRating['review'].forEach((item) => {
                            var index = this.customerObj.findIndex((mn) => item.customerId == mn._id);
                            if (index > -1) {
                                item.customerId = this.customerObj[index];
                            }
                        });
                    }
                    /*this.reviewRating = datai;*/
                    console.log("this.customerObj, this.reviewRating");
                    console.log(this.customerObj, this.reviewRating);
                });
            }
        }, (error) => {
            this.getToast('Something went wrong. Unable to load data!');
            /*this.events.publish('internet:lost','abc');*/
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
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
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
    }
    customerImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        else {
            imgPath = "assets/imgs/profile.png";
        }
        return imgPath;
    }
};
ReviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-review',template:/*ion-inline-start:"D:\OrderApp\src\pages\review\review.html"*/'<!--\n\n  Generated template for the ReviewPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n	<ion-navbar>\n\n		<ion-title>Review</ion-title>\n\n		<ion-icon  padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content has-bouncing="true" padding>\n\n\n\n	<ion-list>\n\n		<ion-row>\n\n			<ion-col text-center>\n\n				<strong>Order Packing Rating</strong>\n\n			</ion-col>\n\n		</ion-row>\n\n		<rating class="orderPacking" [(ngModel)]="rateOrderPacking" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n\n		 starIconName="star"></rating>\n\n\n\n		<ion-row>\n\n			<ion-col text-center>\n\n				<strong>Delivery Time Rating</strong>\n\n			</ion-col>\n\n		</ion-row>\n\n		<rating class="deliveryTime" [(ngModel)]="rateDeliveryTime" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n\n		 starIconName="star"></rating>\n\n\n\n		<ion-row>\n\n			<ion-col text-center>\n\n				<strong>Money Value Rating</strong>\n\n			</ion-col>\n\n		</ion-row>\n\n		<rating class="valueOfMoney" [(ngModel)]="rateValueOfMoney" readOnly="true" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n\n		 starIconName="star"></rating>\n\n	</ion-list>\n\n\n\n\n\n	<ion-list *ngIf="reviewRating && customerObj" class="colorBlack">\n\n		<ng-container *ngFor="let rvw of reviewRating.review">\n\n			<ion-row *ngIf="rvw.customerId && rvw.review != \'\' && rvw.review != null ">\n\n				<ion-col  col-3 no-padding>\n\n					<ion-avatar item-start>\n\n						<img style="object-fit:cover" [src]="customerImage(rvw.customerId.profilePic)">\n\n					</ion-avatar>\n\n				</ion-col>\n\n				<ion-col no-padding>\n\n					<div>\n\n						<strong *ngIf="rvw.customerId.firstname">{{rvw.customerId.firstname}} {{rvw.customerId.lastname}}</strong>\n\n						<strong *ngIf="!rvw.customerId.firstname">Anonymous</strong>\n\n						<!-- <span class="fontWeight400" float-right><ion-icon class="themeGreen" name="star" ios="ios-star" md="md-star"></ion-icon>4.5</span> -->\n\n					</div>\n\n					<p class="fontWeight400 font2vh">{{rvw.review}}</p>\n\n				</ion-col>\n\n			</ion-row>\n\n		</ng-container>\n\n	</ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\OrderApp\src\pages\review\review.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */]])
], ReviewPage);

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_filter_service__ = __webpack_require__(176);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let FilterPage = class FilterPage {
    constructor(navCtrl, navParams, ms6Service, ms1Service, loadingCtrl, viewCtrl, filterService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ms6Service = ms6Service;
        this.ms1Service = ms1Service;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.filterService = filterService;
        this.milesRange = 0;
        this.resType = 'all';
        this.cuisineArray = [];
        this.countryAlertOpts = { title: 'Country', subTitle: 'Select your favorite country' };
        this.cityAlertOpts = { title: 'City', subTitle: 'Select your favorite city' };
        this.filterObj = {};
        this.oldfilterObj = {};
        this.filterObj = this.filterService.getFilterObj();
        if (this.filterObj.country) {
            this.country = this.filterObj.country;
        }
        this.oldfilterObj = navParams.get('filterObj');
        if (typeof this.oldfilterObj != 'undefined') {
            if (typeof this.oldfilterObj['restaurant'] != 'undefined') {
                this.resType = this.oldfilterObj['restaurant'];
                this.chooseType('res');
            }
            if (typeof this.oldfilterObj['rating'] != 'undefined') {
                this.ratingType = this.oldfilterObj['rating'];
                this.chooseType('rating');
            }
            if (typeof this.oldfilterObj['range'] != 'undefined') {
                this.milesRange = this.oldfilterObj['range'];
                this.chooseType('miles');
            }
        }
        /*if (localStorage.getItem('currentCountry_Mealday')) {
            let countryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
            this.currentCountry = countryObj['country'];
            this.countryId = countryObj['countryid'];
        }*/
        this.getCountry();
        this.getCuisines();
    }
    filter(type) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        if (type == 'back') {
            /*if (typeof this.oldfilterObj != 'undefined') {
                this.viewCtrl.dismiss(this.oldfilterObj);
            }else{*/
            loading.dismiss();
            this.viewCtrl.dismiss();
            /*}*/
        }
        else {
            var lat = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lat'));
            var lng = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lng'));
            if (lat != null && lng != null) {
                this.filterObj['lat'] = lat;
                this.filterObj['lng'] = lng;
            }
            else {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.filterObj['lat'] = position.coords.latitude;
                        this.filterObj['lng'] = position.coords.longitude;
                    });
                }
            }
            this.filterObj['cuisines'] = this.cuisineArray;
            /*let object4Filter = {}
            for (var i in this.filterObj) {
                object4Filter[i] = this.filterObj[i];
            }

            if (typeof object4Filter['country'] != 'undefined') {
                object4Filter['country'] = object4Filter['country'].toLowerCase();
            }

            if (typeof object4Filter['city'] != 'undefined') {
                object4Filter['city'] = object4Filter['city'].toLowerCase();
            }*/
            this.filterService.setFilterObj(this.filterObj);
            this.filterService.setisApplied(true);
            this.ms1Service.filterRestaurants(this.filterObj).subscribe((data) => {
                var obj = {
                    filterObj: this.filterObj
                };
                if (!data.error) {
                    if (data.message != null && data.message.length > 0) {
                        obj['filterResult'] = data.message;
                        this.filterService.setFilterKitchen(obj['filterResult']);
                        // this.filterService.setFilterObj(this.filterObj);
                        loading.dismiss();
                        this.viewCtrl.dismiss(obj);
                    }
                    else {
                        loading.dismiss();
                        this.viewCtrl.dismiss(obj);
                    }
                }
                else {
                    loading.dismiss();
                    this.viewCtrl.dismiss(obj);
                }
            });
        }
    }
    reset() {
        this.filterObj = {};
        this.cuisineType = false;
        this.milesRange = 0;
        this.resType = 'all';
        delete this.ratingType;
        this.cuisineArray = [];
        this.filterService.setFilterObj({});
        this.filterService.setisApplied(false);
        this.filterService.setFilterKitchen([]);
        let countryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
        console.log(this.countryList, 'filter.ts 155');
        let cntry = this.countryList.filter((data) => {
            return data.countryName == countryObj['country'].toLowerCase();
        });
        this.country = cntry[0];
        this.chooseType('country');
    }
    chooseType(type) {
        if (type == 'miles') {
            this.filterObj['range'] = this.milesRange;
        }
        if (type == 'country') {
            delete this.cityList;
            this.filterObj['country'] = this.country['countryName'];
            this.getCity(this.country['_id']);
        }
        if (type == 'city') {
            this.filterObj['city'] = this.city['cityName'];
        }
        if (type == 'res') {
            this.filterObj['restaurant'] = this.resType;
        }
        if (type == 'rating') {
            this.filterObj['rating'] = this.ratingType;
        }
    }
    chooseCuisine(event, type, val) {
        if (type == 'any') {
            if (event['checked']) {
                for (var i = 0; i < this.cuisineList.length; i++) {
                    let indx = this.cuisineArray.findIndex((mn) => mn == this.cuisineList[i]['_id']);
                    if (indx == -1) {
                        this.cuisineArray.push(this.cuisineList[i]['_id']);
                    }
                }
                this.cuisineType = true;
            }
            if (!event['checked']) {
                this.cuisineType = false;
                /*this.cuisineArray = [];*/
            }
        }
        if (type == 'cuisine') {
            if (event['checked']) {
                let index = this.cuisineArray.findIndex((mn) => mn == val._id);
                if (index == -1) {
                    this.cuisineArray.push(val._id);
                    if (this.cuisineArray.length == this.cuisineList.length) {
                        this.cuisineType = true;
                    }
                }
            }
            else {
                this.cuisineType = false;
                let indx = this.cuisineArray.findIndex((mn) => mn == val._id);
                if (indx > -1) {
                    this.cuisineArray.splice(indx, 1);
                }
            }
        }
    }
    checkCuisineArray(id) {
        if (this.cuisineArray.length > 0) {
            if (this.cuisineArray.findIndex((mn) => mn == id) > -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    getCountry() {
        this.ms6Service.getCountrylist().subscribe(country => {
            this.countryList = country.message;
            console.log(this.countryList, 'filter.ts 239');
            if (typeof this.oldfilterObj != 'undefined' && typeof this.oldfilterObj['country'] != 'undefined') {
                let cntry = this.countryList.filter((data) => {
                    return data.countryName == this.oldfilterObj['country'].toLowerCase();
                });
                this.country = cntry[0];
                this.chooseType('country');
            }
        });
    }
    getCity(id) {
        var obj = { countryid: id };
        this.ms6Service.getcitylist(obj).subscribe(city => {
            this.cityList = city.message;
            if (this.cityList.length > 0) {
                if (typeof this.oldfilterObj != 'undefined' && typeof this.oldfilterObj['city'] != 'undefined') {
                    let cityy = this.cityList.filter((data) => {
                        return data.cityName == this.oldfilterObj['city'].toLowerCase();
                    });
                    this.city = cityy[0];
                    this.chooseType('city');
                }
            }
        });
    }
    getCuisines() {
        this.ms6Service.getAllCuisines().subscribe(cuisine => {
            this.cuisineList = cuisine.message;
            if (typeof this.oldfilterObj != 'undefined' && typeof this.oldfilterObj['cuisines'] != 'undefined' && this.oldfilterObj['cuisines'] != []) {
                this.cuisineArray = [];
                this.oldfilterObj['cuisines'].forEach(element => {
                    this.cuisineArray.push(element);
                });
            }
        });
    }
};
FilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-filter',template:/*ion-inline-start:"D:\OrderApp\src\pages\list\filter.html"*/'<ion-header>\n\n    <ion-navbar>\n\n    	<button ion-button clear float-left class="white heightAuto" (click)="reset()">\n\n            Reset\n\n        </button>\n\n        <!-- <span padding-horizontal float-left start ion-text class="white fontWeight700" (click)="reset()">Reset</span> -->\n\n        <ion-title>Filter</ion-title>\n\n\n\n        <button ion-button clear float-right class="white heightAuto" (click)="filter(\'back\')">\n\n            Cancel\n\n        </button>\n\n        <!-- <span padding-horizontal float-right end ion-text class="white fontWeight700" (click)="filter(\'back\')">Cancel</span> -->\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding has-bouncing="true">\n\n	\n\n	<ion-list>\n\n		<ion-list-header><strong>Near by in Kilometers</strong></ion-list-header>\n\n	\n\n		<ion-range min="0" max="100" pin="true" [(ngModel)]="milesRange" color="primary" (ionChange)="chooseType(\'miles\')">\n\n			<ion-icon range-left small name="pin" ios="ios-pin" md="md-pin"></ion-icon>\n\n			<ion-icon range-right name="pin" ios="ios-pin" md="md-pin"></ion-icon>\n\n		</ion-range>\n\n	</ion-list>\n\n\n\n	<ion-list class="chooseCountry" *ngIf = "countryList && countryList.length > 0">\n\n		<ion-item>\n\n			<ion-label>Select Country</ion-label>\n\n			<ion-select class="select-wp" [(ngModel)]="country" [placeholder]="\'Select Country....\'" [selectOptions]="countryAlertOpts" (ionChange)="chooseType(\'country\')">\n\n				<ion-option *ngFor = "let cntry of countryList" [value] = "cntry">{{cntry.countryName}}</ion-option>\n\n			</ion-select>\n\n		</ion-item>\n\n		<ion-item *ngIf = "cityList && cityList.length > 0">\n\n			<ion-label>Select City</ion-label>\n\n			<ion-select class="select-wp" [(ngModel)]="city" [placeholder]="\'Select City....\'" [selectOptions]="cityAlertOpts" (ionChange)="chooseType(\'city\')">\n\n				<ion-option *ngFor = "let city of cityList" [value] = "city">{{city.cityName}}</ion-option>\n\n			</ion-select>\n\n		</ion-item>\n\n		<ion-item *ngIf = "cityList && cityList.length == 0">\n\n			<ion-row class="fontSize1-2rem">No Chef in this Country</ion-row>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n\n\n	<ion-list radio-group [(ngModel)]="resType" (ionChange)="chooseType(\'res\')">\n\n		<ion-list-header><strong>Filters</strong></ion-list-header>\n\n\n\n		<ion-item>\n\n			<ion-label>All</ion-label>\n\n			<ion-radio value="all"></ion-radio>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>New Restaurants/Chefs</ion-label>\n\n			<ion-radio value="new"></ion-radio>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>Instant Delivery</ion-label>\n\n			<ion-radio value="fastDelivery"></ion-radio>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-list>\n\n		<ion-list-header><strong>Cuisine</strong></ion-list-header>\n\n\n\n		<ion-item>\n\n			<ion-label>All</ion-label>\n\n			<ion-checkbox  (ionChange)="chooseCuisine($event,\'any\')" [checked]="cuisineType"></ion-checkbox>\n\n		</ion-item>\n\n\n\n		<ion-item *ngFor = "let cuisine of cuisineList">\n\n			<ion-label>{{cuisine.name}}</ion-label>\n\n			<ion-checkbox [checked]="checkCuisineArray(cuisine._id)" (ionChange)="chooseCuisine($event,\'cuisine\',cuisine)">{{cuisine.name}}</ion-checkbox>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-list>\n\n		<ion-list-header><strong>Choose Rating</strong></ion-list-header>\n\n		<rating class="ratingStar" [(ngModel)]="ratingType"  max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false" (ngModelChange)="chooseType(\'rating\')"> </rating>\n\n	</ion-list>\n\n\n\n	<!-- <ion-row>\n\n		<ion-col class = "displayFlex">\n\n			<strong>Choose Rating</strong>\n\n			<rating class="ratingStar" [(ngModel)]="ratingType" readOnly="false" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false" (ngModelChange)="chooseType(\'rating\')"> </rating>\n\n		</ion-col>\n\n	</ion-row> -->\n\n\n\n	<button ion-button full class="themeRedBg" round (click) = "filter(\'apply\')">Apply Filter</button>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\list\filter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["e" /* MS6Service */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_filter_service__["a" /* FilterService */]])
], FilterPage);

//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseFunctionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let FirebaseFunctionService = class FirebaseFunctionService {
    constructor(http, afd) {
        this.http = http;
        this.afd = afd;
        this.firestore = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/customers');
        this.pushtokens = [];
        this.currentCustomer = {};
    }
    getTokenForCustomer() {
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        let itemRef = this.afd.object('customers');
        itemRef.snapshotChanges().subscribe(action => {
            let arr = action.payload.val();
            let pushArr = [];
            for (var k in arr) {
                if (arr.hasOwnProperty(k)) {
                    pushArr.push({ 'key': k, 'customerId': arr[k].customerId });
                }
            }
            this.pushtokens = pushArr;
        });
        setTimeout(() => {
            this.tokensetup().then((token) => {
                console.log("token");
                console.log(token);
                if (token != null) {
                    if (this.pushtokens && this.pushtokens.length > 0) {
                        let indx = this.pushtokens.findIndex((mn) => mn.customerId == this.currentCustomer['_id']);
                        if (indx > -1) {
                            this.updateToken(this.pushtokens[indx]['key'], token);
                        }
                        else {
                            this.addToken(token);
                        }
                    }
                    else {
                        this.addToken(token);
                    }
                }
            });
        }, 5000);
    }
    tokensetup() {
        var promise = new Promise((resolve, reject) => {
            if (typeof FCMPlugin != 'undefined' && FCMPlugin != null) {
                FCMPlugin.getToken(function (token) {
                    resolve(token);
                }, (err) => {
                    reject(err);
                });
            }
        });
        return promise;
    }
    addToken(t) {
        this.afd.list(this.firestore).push({
            customerId: this.currentCustomer['_id'],
            devtoken: t
        }).then(() => {
            console.log("Token Added");
        });
    }
    updateToken(key, t) {
        this.afd.list(this.firestore).update(key, { devtoken: t }).then(() => {
            console.log("Token Updated");
        });
    }
};
FirebaseFunctionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"]])
], FirebaseFunctionService);

//# sourceMappingURL=firebase-function.service.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__changepassword__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profileupdate__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__addaddress__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__addcards__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_path__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(543);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














/**
* Generated class for the ProfilePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let ProfilePage = class ProfilePage {
    /*public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload'});*/
    constructor(navCtrl, navParams, toastCtrl, alertCtrl, loadingCtrl, ms3Service, actionSheetCtrl, camera, transfer, file, filePath, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.ms3Service = ms3Service;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.platform = platform;
        this.currentCustomer = {};
        this.selectedSegment = 'basic';
        this.lastImage = null;
        this.URL = __WEBPACK_IMPORTED_MODULE_8__app_global__["c" /* url1 */] + "upload/";
        this.ImageURL = __WEBPACK_IMPORTED_MODULE_8__app_global__["c" /* url1 */] + "uploads/";
        /*componentForm :any = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };*/
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__["FileUploader"]({
            url: this.URL,
            itemAlias: "file"
        });
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
    }
    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: "Select Image Source",
            buttons: [
                {
                    text: "Load from Library",
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: "Use Camera",
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });
        actionSheet.present();
    }
    cardImage(cardtype) {
        let imgPath;
        if (cardtype == 'visa') {
            imgPath = 'assets/imgs/visa.png';
        }
        if (cardtype == 'maestro') {
            imgPath = "assets/imgs/maestro.png";
        }
        if (cardtype == 'mastercard') {
            imgPath = "assets/imgs/mastercard.png";
        }
        if (cardtype == 'discover') {
            imgPath = "assets/imgs/discover.png";
        }
        if (cardtype == 'credit') {
            imgPath = "assets/imgs/credit.png";
        }
        if (cardtype == 'dankort') {
            imgPath = "assets/imgs/dankort.png";
        }
        if (cardtype == 'diners') {
            imgPath = "assets/imgs/diners.png";
        }
        return imgPath;
    }
    takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(imagePath => {
            // Special handling for Android library
            if (this.platform.is("android") && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath).then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf("/") + 1, imagePath.lastIndexOf("?"));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    delete this.currentCustomer['profilePic'];
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                delete this.currentCustomer['profilePic'];
            }
        }, err => {
            this.currentCustomer['profilePic'] = this.oldProfilePic;
            this.presentToast("Error while selecting image.");
        });
    }
    // Create a new name for the image
    createFileName() {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    }
    // Copy the image to a local folder
    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
            .then(success => {
            this.lastImage = newFileName;
            this.uploadImage();
        }, error => {
            this.currentCustomer['profilePic'] = this.oldProfilePic;
            this.presentToast("Error while storing file.");
        });
    }
    uploadImage() {
        let loading = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loading.present();
        // Destination URL
        var url = this.URL;
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { fileName: filename }
        };
        const fileTransfer = this.transfer.create();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.currentCustomer['profilePic'] = JSON.parse(data.response).filename;
            this.updateCustomer('profilePic');
            loading.dismiss();
            this.lastImage = null;
            this.presentToast("Image succesful uploaded.");
        }, err => {
            this.currentCustomer['profilePic'] = this.oldProfilePic;
            loading.dismiss();
            this.presentToast("Error while uploading file.");
        });
    }
    // Always get the accurate path to your apps folder
    pathForImage(img) {
        if (img === null) {
            return "";
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    }
    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: "top"
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
        this.getCustomer(this.currentCustomer._id);
    }
    getCustomer(id) {
        this.ms3Service.getOneCustomer(id).subscribe((data) => {
            if (!data.error) {
                this.currentCustomer = data.message;
                this.oldProfilePic = this.currentCustomer['profilePic'];
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
            }
        });
    }
    /*addMedia(event) {

        let loading = this.loadingCtrl.create({
            content : 'Uploading...'
        });

        loading.present();

        var files = event.srcElement.files;
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.currentCustomer['profilePic'] = responsePath.filename;
            loading.dismiss();
        };
    }*/
    makeDefault(index, type) {
        if (type == 'address') {
            if (typeof this.currentCustomer.customeraddresses != 'undefined' && this.currentCustomer.customeraddresses.length > 0) {
                let adresses = this.currentCustomer.customeraddresses;
                for (var i = 0; i < adresses.length; i++) {
                    if (i == index) {
                        adresses[i]['default'] = true;
                    }
                    else {
                        adresses[i]['default'] = false;
                    }
                }
                this.updateCustomer('AddressDefault');
            }
        }
        if (type == 'card') {
            if (typeof this.currentCustomer.cardinfo != 'undefined' && this.currentCustomer.cardinfo.length > 0) {
                let cards = this.currentCustomer.cardinfo;
                console.log(cards, 'CUSTOMERS CARDS');
                for (let i = 0; i < cards.length; i++) {
                    if (i == index) {
                        cards[i]['default'] = true;
                    }
                    else {
                        cards[i]['default'] = false;
                    }
                }
                this.updateCustomer('CardDefault');
            }
        }
    }
    restroImage() {
        /*if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {*/
        var imgPath = "assets/imgs/bgImage.jpg";
        /*}*/
        return imgPath;
    }
    getCurrentLocation() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.currentCustomer.lat = position.coords.latitude;
                this.currentCustomer.lng = position.coords.longitude;
                this.getgeo(this.currentCustomer.lat, this.currentCustomer.lng);
            }, (error) => {
                this.loading.dismiss();
                this.getToast('Unable to detect Address');
            });
        }
        else {
            this.loading.dismiss();
            this.getToast("Your Phone don't support Geolocation");
        }
    }
    getgeo(lat, long) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, long);
        geocoder.geocode({ 'latLng': latlng }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    this.addressForm = {};
                    /*var addresss =results[0].formatted_address; */
                    let address;
                    let houseNo;
                    let area;
                    let city;
                    let country;
                    let zipcode;
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        var addressType = results[0].address_components[i].types[0];
                        if (addressType == 'premise') {
                            if (typeof houseNo == 'undefined') {
                                houseNo = results[0].address_components[i]['long_name'];
                            }
                            else {
                                houseNo = houseNo + ' ' + results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'political' || addressType == 'sublocality') {
                            if (typeof area == 'undefined') {
                                area = results[0].address_components[i]['long_name'];
                            }
                            else {
                                area = area + ' ' + results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'locality') {
                            if (typeof city == 'undefined') {
                                this.addressForm['city'] = results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'country') {
                            if (typeof country == 'undefined') {
                                this.addressForm['country'] = results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'postal_code') {
                            this.addressForm['zipcode'] = results[0].address_components[i]['long_name'];
                        }
                        /*if (this.componentForm[addressType]) {*/
                        /*var val = results[0].address_components[i][this.componentForm[addressType]]; */
                        /*if(addressType == 'locality'){
                            this.addressForm["city"] = val;
                        }
                        if(addressType == 'postal_code'){
                            this.addressForm["zipcode"] = val;
                        }
                        if(addressType == 'country'){
                            this.addressForm["country"] = val;
                        }
                        this.addressForm["address"] = addresss;*/
                        /*}*/
                    }
                    setTimeout(() => {
                        // if (typeof houseNo != 'undefined' && typeof area != 'undefined') {
                        // 	this.addressForm['address'] = houseNo + ' ' + area;
                        // }
                        // if (typeof houseNo == 'undefined' && typeof area != 'undefined') {
                        // 	this.addressForm['address'] = area;
                        // }
                        // if (typeof houseNo != 'undefined' && typeof area == 'undefined') {
                        // 	this.addressForm['address'] = houseNo;
                        // }
                        // if (typeof houseNo == 'undefined' && typeof area == 'undefined') {
                        // 	this.addressForm['address'] = results[0].formatted_address;
                        // }
                        this.loading.dismiss();
                        /*if (typeof this.addressForm['country'] != 'undefined') {*/
                        let prompt = this.alertCtrl.create({
                            title: 'Current Location Detected',
                            message: "Add your current location to addresses?",
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
                                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__addaddress__["a" /* AddAddressPage */], {
                                            currentAddress: this.addressForm
                                        });
                                    }
                                }
                            ]
                        });
                        prompt.present();
                        /*}*/
                    }, 2000);
                }
                else {
                    this.loading.dismiss();
                    this.getToast('Unable to detect Address');
                }
            }
            else {
                this.loading.dismiss();
                this.getToast('Unable to detect Address');
            }
        });
    }
    goToChangePassword() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__changepassword__["a" /* ChangePasswordPage */]);
    }
    goToUpdateProfile() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profileupdate__["a" /* ProfileUpdatePage */]);
    }
    customerImage(img) {
        let imgPath;
        if (typeof img != 'undefined' && img != null) {
            imgPath = this.ImageURL + img;
            /*imgPath = 'assets/imgs/profile.png';*/
        }
        if (typeof img == 'undefined' || img == null) {
            imgPath = "assets/imgs/profile.png";
        }
        return imgPath;
    }
    onSegmentChanged() {
        console.log("this.selectedSegment => ", this.selectedSegment);
    }
    addAddressPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__addaddress__["a" /* AddAddressPage */]);
    }
    addCardsPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__addcards__["a" /* AddCardsPage */]);
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__cart_cart__["a" /* CartPage */]);
    }
    editAddress(data, index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__addaddress__["a" /* AddAddressPage */], {
            editAddress: data, index: index
        });
    }
    editCard(data, index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__addcards__["a" /* AddCardsPage */], {
            editCard: data, index: index
        });
    }
    spliceCard(index) {
        this.currentCustomer.cardinfo.splice(index, 1);
        this.updateCustomer('CardSplice');
    }
    spliceAddress(index) {
        let prompt = this.alertCtrl.create({
            title: 'Delete Address',
            message: "Are you sure?",
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
                        this.currentCustomer.customeraddresses.splice(index, 1);
                        this.updateCustomer('AddressSplice');
                    }
                }
            ]
        });
        prompt.present();
    }
    updateCustomer(type) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data) => {
            loading.dismiss();
            if (!data.error) {
                this.getCustomer(this.currentCustomer._id);
                if (type == 'AddressSplice') {
                    this.getToast('Address Detail Deleted!');
                }
                if (type == 'CardSplice') {
                    this.getToast('Card Detail Deleted!');
                }
            }
            else {
                this.getToast('Unable to Update');
            }
        }, (error) => {
            loading.dismiss();
            this.getToast('Unable to Update');
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
};
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile',template:/*ion-inline-start:"D:\OrderApp\src\pages\profile\profile.html"*/'<!--\n\n  Generated template for the ProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>My Profile</ion-title>\n\n        <ion-icon padding-top padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content has-bouncing="true" padding [ngStyle]="{\'background-image\': \'url(\' + restroImage() + \')\'}">\n\n\n\n    <ion-segment [(ngModel)]="selectedSegment" (ionChange)="onSegmentChanged($event)">\n\n        <ion-segment-button value="basic">\n\n            Basic\n\n        </ion-segment-button>\n\n        <ion-segment-button value="address">\n\n            My Addresses\n\n        </ion-segment-button>\n\n        <ion-segment-button value="cards">\n\n            My Cards\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n\n\n    <div [ngSwitch]="selectedSegment">\n\n        <ion-row *ngSwitchCase="\'basic\'" class="basicSegment">\n\n            <ion-row *ngIf = "currentCustomer"  class="width100 white">\n\n                <ion-item class="profileImageIonItem" no-padding>\n\n                    <!-- <ion-avatar class="marginBottom4">\n\n                        <span class="profileCam"><ion-icon name="camera" ios="ios-camera" md="md-camera"></ion-icon></span>\n\n                    </ion-avatar> -->\n\n\n\n                    <ion-avatar item-start [ngStyle]="{\'background-image\': \'url(\' + customerImage(currentCustomer.profilePic) + \')\'}"> \n\n                        <!-- <img [src]="customerImage(currentCustomer.profilePic)"> -->\n\n                        <ion-row class="profileContainer" text-center>\n\n                            <ion-icon (click)="presentActionSheet()" class="paddingTop50" name="camera" ios="ios-camera" md="md-camera"></ion-icon>\n\n                            <!-- <input type="file" accept="image/*" name="single" ng2FileSelect [uploader]="uploader" (change)="addMedia($event,\'profilePic\')"/> -->\n\n                        </ion-row>\n\n\n\n                        <!-- <ion-buttons> --><!-- -->\n\n                        <!-- </ion-buttons> -->\n\n                    </ion-avatar>\n\n                    <!-- <button *ngIf="lastImage !== null" ion-button (click)="uploadImage()"> Upload </button> -->\n\n                    <h2 class="white fontWeight600">{{currentCustomer.username}}</h2>\n\n                    <!-- <p class="white">{{currentCustomer.email}}</p> -->\n\n                    <span class="editProfile" (click)="goToUpdateProfile()">\n\n                    	<ion-icon class="white" name="create" ios="ios-create" md="md-create"></ion-icon>\n\n                    </span>\n\n                </ion-item>\n\n\n\n                <ion-row class="font14 width100">\n\n                    <ion-col col-1>\n\n                        <ion-icon name="person" ios="ios-person" md="md-person" item-start></ion-icon>\n\n                    </ion-col>\n\n                    <ion-col col-4 class="fontWeight600">Name:</ion-col>\n\n                    <ion-col col-7 text-capitalize>{{currentCustomer.firstname}} {{currentCustomer.lastname}}</ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf = "currentCustomer.homephone" class="font14 width100">\n\n                    <ion-col col-1>\n\n                        <ion-icon name="call" ios="ios-call" md="md-call" item-start></ion-icon>\n\n                    </ion-col>\n\n                    <ion-col col-4 class="fontWeight600">Contact No :</ion-col>\n\n                    <ion-col col-7>{{currentCustomer.homephone}}</ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf = "currentCustomer.cellphone" class="font14 width100">\n\n                    <ion-col col-1>\n\n                        <ion-icon name="call" ios="ios-call" md="md-call" item-start></ion-icon>\n\n                    </ion-col>\n\n                    <ion-col col-4 class="fontWeight600">Mobile No :</ion-col>\n\n                    <ion-col col-7>{{currentCustomer.cellphone}}</ion-col>\n\n                </ion-row>\n\n                \n\n                <ion-label text-right>\n\n                    <span class="changePass" (click)="goToChangePassword()">Change Password?</span>\n\n                </ion-label>\n\n            </ion-row>\n\n        </ion-row>\n\n\n\n        <ion-row *ngSwitchCase="\'address\'" class="addressSegment">\n\n            \n\n            <ion-row class= "topButtons width100">\n\n                <button ion-button (click) = "getCurrentLocation()">Current Location</button>\n\n            </ion-row>\n\n\n\n            <ion-list class="width100" *ngIf = "currentCustomer.customeraddresses && currentCustomer.customeraddresses.length > 0">\n\n                <ion-item *ngFor = "let adrs of currentCustomer.customeraddresses; let i = index; " [ngClass] = "adrs.default?\'greenBorder\':\'grayBorder\'">\n\n                    <ion-row class="width100">\n\n                        <ion-col col-11 no-padding class="whiteSpaceInitial">\n\n                            <ion-row class= "width100"><strong>Address : </strong>{{adrs.address}}, {{adrs.city}}, {{adrs.country}}</ion-row>\n\n                            <ion-row *ngIf = "adrs.landmark" class= "width100"><strong>Landmark : </strong>{{adrs.landmark}}</ion-row>\n\n                            <ion-row class= "width100"><strong>City : </strong>{{adrs.city}}</ion-row>\n\n                            <ion-row class= "width100"><strong>Country : </strong>{{adrs.country}}</ion-row>\n\n                            <ion-row class= "width100"><strong>Postal Code : </strong>{{adrs.zipcode}}</ion-row>\n\n                            <ion-row *ngIf = "adrs.landline" class= "width100"><strong>Landline : </strong>{{adrs.landline}}</ion-row>\n\n                            <ion-row *ngIf = "adrs.phoneno" class= "width100"><strong>Phone No : </strong>{{adrs.phoneno}}</ion-row>\n\n                        </ion-col>\n\n\n\n                        <ion-col col-1 no-padding class="displayGrid font4vw">\n\n                            <ion-icon name="create" ios="ios-create" md="md-create" class= "themeGreen" (click)="editAddress(adrs,i)"></ion-icon>\n\n                            <ion-icon name="trash" ios="ios-trash" md="md-trash" color = "danger" (click)="spliceAddress(i)"></ion-icon>\n\n                        </ion-col>\n\n    \n\n                        <ion-col col-12 no-padding>\n\n                            <button float-right class= "defaultMakingButton" *ngIf = "!adrs.default" ion-button (click)="makeDefault(i,\'address\')">Mark as Default</button>\n\n                            <strong float-right *ngIf = "adrs.default">Default Address</strong>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n\n\n                </ion-item>\n\n            </ion-list>\n\n\n\n            <ion-list class="width100" *ngIf = "currentCustomer.customeraddresses && currentCustomer.customeraddresses.length == 0">\n\n                <ion-row padding-vertical class = "white">\n\n                    <ion-col text-center class = "white">No Record Found</ion-col>\n\n                </ion-row>\n\n            </ion-list>\n\n\n\n            <ion-row class= "topButtons width100">\n\n                <button ion-button full (click)="addAddressPage()">Add Address</button>\n\n            </ion-row>\n\n        </ion-row>\n\n\n\n        <ion-row *ngSwitchCase="\'cards\'" class="addressSegment">\n\n\n\n            <ion-list class="width100 marginTop2vh" *ngIf = "currentCustomer.cardinfo && currentCustomer.cardinfo.length > 0">\n\n                <ion-item *ngFor = "let card of currentCustomer.cardinfo; let i=index " [ngClass] = "card.default?\'greenBorder\':\'grayBorder\'">\n\n                    <ion-row class="width100">\n\n                        <ion-col col-11 no-padding class="whiteSpaceInitial">\n\n                            <ion-row text-capitalize class= "width100 paddingVertical0-5vh"><strong>Card Type : </strong>&nbsp;{{card.cardtype}}<img class="cardImages" [src]="cardImage(card.cardtype)">\n\n                            </ion-row>\n\n                            <ion-row class= "width100 paddingVertical0-5vh"><strong>Card No : </strong>&nbsp;{{card.cardnumber}}</ion-row>\n\n            \n\n                        </ion-col>\n\n\n\n                        <ion-col col-1 no-padding class="displayGrid font4vw">\n\n                         \n\n\n\n                            <ion-icon name="trash" ios="ios-trash" md="md-trash" color = "danger" (click)="spliceCard(i)"></ion-icon>\n\n                        </ion-col>\n\n\n\n                        <ion-col col-12>\n\n                            <button float-right class= "defaultMakingButton" *ngIf = "!card.default" ion-button (click)="makeDefault(i,\'card\')">Mark as Default</button>\n\n                            <strong float-right *ngIf = "card.default">Default Card</strong>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n\n\n                </ion-item>\n\n            </ion-list>\n\n\n\n            <ion-list padding class="width100" *ngIf = "currentCustomer.cardinfo && currentCustomer.cardinfo.length == 0">\n\n                <ion-row padding-vertical class = "white">\n\n                    <ion-col text-center class = "white">No Record Found</ion-col>\n\n                </ion-row>\n\n            </ion-list>\n\n\n\n            <ion-row class= "topButtons width100">\n\n                <button ion-button full (click)="addCardsPage()">Add Cards</button>\n\n            </ion-row>\n\n        </ion-row>\n\n\n\n    </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\profile\profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_9__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__["a" /* Transfer */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_path__["a" /* FilePath */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ChangePasswordPage = class ChangePasswordPage {
    constructor(lf, navCtrl, toastCtrl, loadingCtrl, ms3Service, ms6Service) {
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.ms3Service = ms3Service;
        this.ms6Service = ms6Service;
        this.formErrors = {
            'password': ''
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.'
            }
        };
        this.passwordForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            oldpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            confirmpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            matchpass: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            oldmatch: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.ms6Service.getComplexity().subscribe(data => {
            if (!data.error) {
                this.passwordp = data.message[0].ownerpasscomplexity.regex;
                this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);
                this.passwordForm.valueChanges.subscribe(data => this.onValueChanged(data));
                this.onValueChanged();
            }
        });
        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
            this.passwordForm.controls['_id'].setValue(this.currentCustomer['_id']);
        }
    }
    onValueChanged(data) {
        if (!this.passwordForm) {
            return;
        }
        const form = this.passwordForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    restroImage() {
        /*if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {*/
        var imgPath = "assets/imgs/bgImage.jpg";
        /*}*/
        return imgPath;
    }
    oldpassword() {
        if (this.currentCustomer.password == this.passwordForm.value.oldpassword) {
            this.passwordForm.controls["oldmatch"].setValue(true);
            this.oldmatch = false;
        }
        else {
            this.passwordForm.controls["oldmatch"].setValue("");
            this.oldmatch = true;
        }
    }
    matchpassword(type) {
        if (type == 'match') {
            if (this.passwordForm.value.password != '') {
                if (this.passwordForm.value.password == this.passwordForm.value.confirmpassword) {
                    this.passwordForm.controls["matchpass"].setValue(true);
                    this.MutchPassword = false;
                }
                else {
                    this.passwordForm.controls["matchpass"].setValue("");
                    this.MutchPassword = true;
                }
            }
        }
        else {
            if (this.passwordForm.value.confirmpassword != '') {
                if (this.passwordForm.value.password == this.passwordForm.value.confirmpassword) {
                    this.passwordForm.controls["matchpass"].setValue(true);
                    this.MutchPassword = false;
                }
                else {
                    this.passwordForm.controls["matchpass"].setValue("");
                    this.MutchPassword = true;
                }
            }
        }
    }
    setpasswordmessage(name) {
        if (name == 'simplepassword') {
            this.validationMessages.password['pattern'] = 'Password must contain min 8 Digits alphanumeric only';
        }
        if (name == 'medium') {
            this.validationMessages.password['pattern'] = 'TBD';
        }
        if (name == 'complex') {
            this.validationMessages.password['pattern'] = 'TBD';
        }
        if (name == 'none') {
            this.validationMessages.password['pattern'] = '';
        }
    }
    ionViewDidEnter() {
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }
    ionViewDidLoad() {
    }
    passwordUpdate() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        let obj4Update = {};
        obj4Update['_id'] = this.passwordForm.value._id;
        obj4Update['password'] = this.passwordForm.value.password;
        this.ms3Service.updateCustomer(obj4Update).subscribe((data) => {
            if (!data.error) {
                this.getCustomer(this.currentCustomer._id);
                this.getToast('Pssword Updated Successfully');
            }
            else {
                this.loading.dismiss();
                this.getToast('Unable to Update');
            }
        }, (err) => {
            this.getToast('Unable to Update Password! Please check your Internet connection');
        });
    }
    getCustomer(id) {
        this.ms3Service.getOneCustomer(id).subscribe((data) => {
            if (!data.error) {
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
                this.loading.dismiss();
                this.navCtrl.pop();
            }
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
};
ChangePasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-change-password',template:/*ion-inline-start:"D:\OrderApp\src\pages\profile\change-password.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Change Password</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content has-bouncing="true" no-padding> <!-- [ngStyle]="{\'background-image\': \'url(\' + restroImage() + \')\'}"> -->\n\n    <!-- <ion-list *ngIf="passwordp"> -->\n\n        <form [formGroup]="passwordForm" (ngSubmit)="passwordUpdate()">\n\n            <ion-item>\n\n                <ion-label floating>Old Password</ion-label>\n\n                <ion-input type="text" formControlName="oldpassword" (change)="oldpassword()"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="oldmatch" class="alert alert-danger mt-3" margin-horizontal>\n\n                Old Password not matching!\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>New Password</ion-label>\n\n                <ion-input type="password" formControlName="password" [pattern]="passwordp" (keyup)="matchpassword(\'pass\')"></ion-input>\n\n            </ion-item>\n\n            <div *ngIf="formErrors.password" class="alert alert-danger mt-3" margin-horizontal > \n\n                {{ formErrors.password }}\n\n            </div>\n\n            <ion-item>\n\n                <ion-label floating>Confirm Password</ion-label>\n\n                <ion-input type="password" [pattern]="passwordp" formControlName="confirmpassword" (keyup)="matchpassword(\'match\')"></ion-input>\n\n            </ion-item>\n\n                \n\n            <div class="alert alert-danger mt-3" margin-horizontal *ngIf="MutchPassword">Password not match</div>\n\n            <button ion-button color="secondary" full [disabled]="!passwordForm.valid">Change Password</button>\n\n        </form>\n\n    <!-- </ion-list> -->\n\n</ion-content>'/*ion-inline-end:"D:\OrderApp\src\pages\profile\change-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* MS6Service */]])
], ChangePasswordPage);

//# sourceMappingURL=changepassword.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileUpdatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ProfileUpdatePage = class ProfileUpdatePage {
    constructor(nav, navCtrl, toastCtrl, navParams, loadingCtrl, ms3Service, lf) {
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.ms3Service = ms3Service;
        this.lf = lf;
        let date = new Date();
        var dateP = this.addZero(date.getDate());
        var monthP = this.addZero(date.getMonth() + 1);
        var yearP = date.getFullYear();
        this.currentDate = yearP + '-' + monthP + '-' + dateP;
        this.profileForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: [{ value: '', disabled: true }, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            /*username: ['', Validators.required],*/
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            homephone: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            cellphone: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            gender: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            dob: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        this.profileForm.patchValue(this.currentCustomer);
    }
    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    ionViewDidLoad() { }
    ionViewDidEnter() {
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }
    update() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.ms3Service.updateCustomer(this.profileForm.value).subscribe((data) => {
            if (!data.error) {
                this.getCustomer(this.currentCustomer._id);
                this.getToast('Profile Updated Successfully');
            }
            else {
                this.getToast('Unable to Update');
            }
        }, (err) => {
            this.getToast('Unable to Update Profile! Please check your Internet connection');
        });
        /*console.log("this.profileForm.value");
        console.log(this.profileForm.value);*/
        /*localStorage.removeItem('abc');*/
    }
    getCustomer(id) {
        this.ms3Service.getOneCustomer(id).subscribe((data) => {
            if (!data.error) {
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
                this.loading.dismiss();
                this.navCtrl.pop();
            }
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    customerImage() {
        /*if (typeof img != 'undefined' && img != null) {
            var imgPath = this.imageURL + img;
        }
        if (typeof img == 'undefined' || img == null) {*/
        var imgPath = "assets/imgs/profile.png";
        /*}*/
        return imgPath;
    }
    restroImage() {
        /*if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {*/
        var imgPath = "assets/imgs/bgImage.jpg";
        /*}*/
        return imgPath;
    }
};
ProfileUpdatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile-update',template:/*ion-inline-start:"D:\OrderApp\src\pages\profile\profileupdate.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Edit Profile</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content has-bouncing="true" padding> <!-- [ngStyle]="{\'background-image\': \'url(\' + restroImage() + \')\'}"> -->\n\n    <ion-list>\n\n        <form role="form" [formGroup]="profileForm" (ngSubmit)="update()">\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="email" type="text" placeholder="Email"></ion-input>\n\n            </ion-item>\n\n            <!-- <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="username" type="text" disabled="true" placeholder="Username"></ion-input>\n\n            </ion-item> -->\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="firstname" type="text" placeholder="First Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="lastname" type="text" placeholder="Last Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="call" ios="ios-call" md="md-call"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="homephone" type="tel" placeholder="Home Phone No."></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="call" ios="ios-call" md="md-call"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="cellphone" type="tel" placeholder="Mobile No."></ion-input>\n\n            </ion-item>\n\n            <!-- <ion-item> -->\n\n                <ion-row class="genderRadio" radio-group formControlName = "gender" padding-left>\n\n                    <ion-col col-3 class="genderLabel">Gender</ion-col>\n\n                    <ion-col class="displayFlex">\n\n                        <ion-item no-padding>\n\n                            <ion-label>Male</ion-label>\n\n                            <ion-radio item-left value="male"></ion-radio>\n\n                        </ion-item>\n\n\n\n                        <ion-item no-padding>\n\n                            <ion-label>Female</ion-label>\n\n                            <ion-radio item-left value="female"></ion-radio>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                </ion-row>\n\n            <!-- </ion-item> -->\n\n            <ion-item class="calendarLabel">\n\n                <ion-label>\n\n                    <ion-icon name="calendar" ios="ios-calendar" md="md-calendar"></ion-icon> &nbsp;Date of Birth\n\n                </ion-label>\n\n                <ion-datetime displayFormat="MMMM DD, YYYY" formControlName="dob" [max]="currentDate"></ion-datetime>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!profileForm.valid">Submit</button>\n\n        </form>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\OrderApp\src\pages\profile\profileupdate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], ProfileUpdatePage);

//# sourceMappingURL=profileupdate.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
* Generated class for the AddressPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let AddAddressPage = class AddAddressPage {
    /*userinfo: any = {lat: "", lng: ""};

    addresspart:any;

    componentForm :any = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    addressLat : any;
    addressLng : any;*/
    constructor(navCtrl, navParams, toastCtrl, loadingCtrl, ms3Service, alertCtrl, geolocation, lf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.ms3Service = ms3Service;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.lf = lf;
        this.currentCustomer = {};
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        let patternq = /^[+]?\d+(\.\d+)?$/;
        this.addressForm = this.lf.group({
            phoneno: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(patternq)]],
            landline: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(patternq)]],
            address: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            landmark: [''],
            default: [],
            city: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*')]],
            zipcode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            country: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*')]],
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
        this.dataParam = navParams.get('editAddress');
        this.indexParam = navParams.get('index');
        this.currentAddress = navParams.get('currentAddress');
        /*alert("this.currentAddress => " + this.currentAddress);

        alert("this.dataParam => " + this.dataParam);*/
        if (typeof this.currentAddress != 'undefined') {
            this.addressForm.patchValue(this.currentAddress);
        }
        /*this.getCurrentLocation();*/
        this.initMap();
        if (typeof this.dataParam != 'undefined' && this.dataParam != null) {
            this.addressForm.patchValue(this.dataParam);
        }
        this.addressForm.controls['_id'].setValue(this.currentCustomer._id);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AddressPage');
    }
    ionViewDidEnter() {
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    addAddress() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        if (typeof this.dataParam == 'undefined' || this.dataParam == null) {
            this.ms3Service.updateCustomerAddress(this.addressForm.value).subscribe((data) => {
                this.loading.dismiss();
                if (data.error) {
                    if (typeof data.message['isOperational'] != 'undefined') {
                        this.getToast('Unable to add Address! Please try again.');
                    }
                    else {
                        this.getToast(data.message);
                    }
                }
                else {
                    this.getToast('Address Detail Added!');
                }
                this.navCtrl.pop();
            }, (err) => {
                this.getToast('Unable to add Address! Please check your Internet connection');
            });
        }
        if (typeof this.indexParam != 'undefined' && this.indexParam != null) {
            this.currentCustomer.customeraddresses.splice(this.indexParam, 1);
            this.updateCustomer();
        }
    }
    updateCustomer() {
        this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data) => {
            if (!data.error) {
                this.ms3Service.updateCustomerAddress(this.addressForm.value).subscribe((data) => {
                    console.log("data => ", data);
                    this.loading.dismiss();
                    this.getToast('Address Detail Updated!');
                    this.navCtrl.pop();
                });
            }
            else {
                this.getToast('Unable to Update');
            }
        }, (err) => {
            this.getToast('Unable to Update Address! Please check your Internet connection');
        });
    }
    initMap() {
        var lat = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lat'));
        var lng = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lng'));
        if (lat != null && lng != null) {
            this.currentCustomer['lat'] = lat;
            this.currentCustomer['lng'] = lng;
            setTimeout(() => {
                this.mapRun();
            }, 500);
        }
        else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.currentCustomer['lat'] = position.coords.latitude;
                    this.currentCustomer['lng'] = position.coords.longitude;
                    setTimeout(() => {
                        this.mapRun();
                    }, 500);
                }, (error) => {
                    this.getToast('Unable to detect Address');
                });
            }
            else {
                this.getToast("Your Phone don't support Geolocation");
            }
        }
    }
    mapRun() {
        let _that = this;
        var input = document.getElementById('pac-input');
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: parseFloat(this.currentCustomer.lat), lng: parseFloat(this.currentCustomer.lng) },
            zoom: 15
        });
        var autocomplete = new google.maps.places.Autocomplete(input, { types: [] });
        autocomplete.bindTo('bounds', map);
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            position: { lat: parseFloat(this.currentCustomer.lat), lng: parseFloat(this.currentCustomer.lng) },
            visible: true,
            draggable: true
        });
        google.maps.event.addListener(marker, 'dragend', () => {
            var mlat = marker.position.lat();
            var mlng = marker.position.lng();
            this.getgeo(mlat, mlng);
        });
        autocomplete.addListener('place_changed', () => {
            marker.setVisible(true);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            }
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(15);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            if (place.address_components) {
                let houseNo;
                let area;
                let city;
                let country;
                let zipcode;
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (addressType == 'premise' || addressType == 'route') {
                        if (typeof houseNo == 'undefined') {
                            houseNo = place.address_components[i]['long_name'];
                        }
                        else {
                            houseNo = houseNo + ' ' + place.address_components[i]['long_name'];
                        }
                    }
                    if (addressType == 'political' || addressType == 'sublocality' || addressType == 'sublocality_level_1') {
                        if (typeof area == 'undefined') {
                            area = place.address_components[i]['long_name'];
                        }
                        else {
                            area = area + ' ' + place.address_components[i]['long_name'];
                        }
                    }
                    if (addressType == 'locality') {
                        if (typeof city == 'undefined') {
                            city = place.address_components[i]['long_name'];
                        }
                    }
                    if (addressType == 'country') {
                        if (typeof country == 'undefined') {
                            country = place.address_components[i]['long_name'];
                        }
                    }
                    if (addressType == 'postal_code') {
                        zipcode = place.address_components[i]['long_name'];
                    }
                }
                setTimeout(() => {
                    if (place.name != place.vicinity) {
                        var inputValues = place.name + " " + city + " , " + country;
                    }
                    else {
                        var inputValues = place.name + "  " + city + " , " + country;
                    }
                    console.log(inputValues, '949');
                    _that.addressForm.controls['address'].setValue(inputValues);
                    _that.addressForm.controls['city'].setValue(city);
                    _that.addressForm.controls['country'].setValue(country);
                    _that.addressForm.controls['zipcode'].setValue(zipcode);
                    console.log(houseNo, area, '939');
                }, 1000);
            }
        });
    }
    getgeo(lat, long) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, long);
        let _that = this;
        geocoder.geocode({ 'latLng': latlng }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    let houseNo;
                    let area;
                    let city;
                    let country;
                    let zipcode;
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        var addressType = results[0].address_components[i].types[0];
                        if (addressType == 'premise' || addressType == 'route') {
                            if (typeof houseNo == 'undefined') {
                                houseNo = results[0].address_components[i]['long_name'];
                            }
                            else {
                                houseNo = houseNo + ' ' + results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'political' || addressType == 'sublocality' || addressType == 'sublocality_level_1') {
                            if (typeof area == 'undefined') {
                                area = results[0].address_components[i]['long_name'];
                            }
                            else {
                                area = area + ' ' + results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'locality') {
                            if (typeof city == 'undefined') {
                                city = results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'country') {
                            if (typeof country == 'undefined') {
                                country = results[0].address_components[i]['long_name'];
                            }
                        }
                        if (addressType == 'postal_code') {
                            zipcode = results[0].address_components[i]['long_name'];
                        }
                    }
                    setTimeout(() => {
                        _that.addressForm.controls['city'].setValue(city);
                        _that.addressForm.controls['country'].setValue(country);
                        _that.addressForm.controls['zipcode'].setValue(zipcode);
                        if (typeof houseNo != 'undefined' && typeof area != 'undefined') {
                            _that.addressForm.controls['address'].setValue(houseNo + ' ' + area);
                        }
                        if (typeof houseNo == 'undefined' && typeof area != 'undefined') {
                            _that.addressForm.controls['address'].setValue(area);
                        }
                        if (typeof houseNo != 'undefined' && typeof area == 'undefined') {
                            _that.addressForm.controls['address'].setValue(houseNo);
                        }
                        if (typeof houseNo == 'undefined' && typeof area == 'undefined') {
                            _that.addressForm.controls['address'].setValue(results[0].formatted_address);
                        }
                    }, 1000);
                }
                /*if (results[1]) {
                    var addresss =results[1].formatted_address;
                    for (var i = 0; i < results[1].address_components.length; i++) {
                        var addressType = results[1].address_components[i].types[0];

                        if (this.componentForm[addressType]) {
                            var val = results[1].address_components[i][this.componentForm[addressType]];
                            if(addressType == 'locality'){
                                this.addressForm.controls["city"].setValue(val);
                            }
                            if(addressType == 'postal_code'){
                                this.addressForm.controls["zipcode"].setValue(val);
                            }
                            if(addressType == 'country'){
                                this.addressForm.controls["country"].setValue(val);
                            }
                            this.addressForm.controls["address"].setValue(addresss);
                        }
                    }
                 } else {}*/
            }
            else {
            }
        });
    }
};
AddAddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-addaddress',template:/*ion-inline-start:"D:\OrderApp\src\pages\profile\addaddress.html"*/'<!--\n\nGenerated template for the AddressPage page.\n\n\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\n\nIonic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n	<ion-navbar>\n\n		<ion-title>Add Address</ion-title>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n	<ion-list>\n\n        <form role="form" [formGroup]="addressForm" (ngSubmit)="addAddress()">\n\n            <ion-item>\n\n                <ion-input formControlName="phoneno" type="tel" placeholder="Enter Mobile No"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n                <ion-input formControlName="landline" type="tel" placeholder="Enter Landline No"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item class="diffInput">\n\n                <!-- <ion-input formControlName="address" type="text" placeholder="Enter a location"></ion-input> -->\n\n                <input id="pac-input" type="text" placeholder="Enter an Address" autocorrect="off" spellcheck="off" autocapitalize="off" #search class="form-control" formControlName="address" />\n\n            </ion-item>\n\n            \n\n       \n\n\n\n            <ion-item>\n\n                <ion-input formControlName="city" type="text" placeholder="City"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n                <ion-input formControlName="country" type="text" placeholder="Country"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n                <ion-input formControlName="zipcode" type="tel" placeholder="Postal Code"></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!addressForm.valid">Add Address</button>\n\n        </form>\n\n    </ion-list>\n\n    <div id="map" style="height: 500px;"></div>\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n            <!-- <div class="form-group">\n\n                <div class="col-sm-6">\n\n                    <input type="text" class="form-control"  formControlName="phoneno" placeholder="Phone No">\n\n                    <p style="padding:3px" *ngIf="formErrors.phoneno" class="alert alert-danger">\n\n                        {{ formErrors.phoneno }}\n\n                    </p>   \n\n                </div>     \n\n                <div class="col-sm-6 class-sm-model">\n\n                    <input type="text" class="form-control" formControlName="landline" placeholder="Landline">\n\n                    <p style="padding:3px" *ngIf="formErrors.landline" class="alert alert-danger">\n\n                        {{ formErrors.landline }}\n\n                    </p> \n\n                </div>\n\n            </div>\n\n\n\n            <div class="form-group">\n\n                <div class="col-sm-12">\n\n                    <input id="pac-input" type="text"\n\n                    placeholder="Enter a location" autocorrect="off" spellcheck="off" autocapitalize="off" #search class="form-control" formControlName="address" /> \n\n                </div>\n\n            </div>\n\n            <div class="form-group">\n\n                <div class="col-sm-12">\n\n                    <input type="text" class="form-control" formControlName="landmark" placeholder="Landmark">\n\n                </div>\n\n            </div>  \n\n            <div class="form-group">\n\n                <div class="col-sm-6">\n\n                    <input type="text" class="form-control" formControlName="city" placeholder="City">\n\n                    <div style="padding:3px" *ngIf="formErrors.city" class="alert alert-danger">\n\n                        {{ formErrors.city }}\n\n                    </div>\n\n                </div>\n\n                <div class="col-sm-6 class-sm-model">\n\n                    <input type="text" class="form-control" formControlName="zipcode" placeholder="ZipCode">\n\n                </div>\n\n            </div>\n\n            <div class="form-group">\n\n                <div class="col-sm-12">\n\n                    <input type="text" class="form-control" formControlName="country" placeholder="Country">\n\n                </div>\n\n            </div>\n\n            <div class="form-group">\n\n                <div class="col-sm-offset-8 col-sm-4"> \n\n                    <p>  \n\n                        <button type="submit" class="btn btn-success" [disabled]="!addressForm.valid">Save Address</button>\n\n                    </p>\n\n                </div>\n\n            </div>\n\n        </form> -->\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\profile\addaddress.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], AddAddressPage);

//# sourceMappingURL=addaddress.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
* Generated class for the AddressPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let AddCardsPage = class AddCardsPage {
    constructor(navCtrl, navParams, toastCtrl, loadingCtrl, ms3Service, ms4Service, lf) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.ms3Service = ms3Service;
        this.ms4Service = ms4Service;
        this.lf = lf;
        this.currentCustomer = {};
        this.year = [];
        this.month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.formErrors = {
            'cardnumber': '',
            'cvv': ''
        };
        this.validationMessages = {
            'cardnumber': {
                'required': 'Card Number is required.',
                'minlength': 'Card Number must be 16 character long.',
                'maxlength': 'Card Number must be 16 character long.',
                'pattern': 'Card Number should contain numeric in pattern xxxx-xxxx-xxxx-xxxx'
            },
            'cvv': {
                'required': 'CVV is required.',
                'pattern': 'CVV should contain numeric only'
            }
        };
        this.editCard = navParams.get('editCard');
        this.editCardIndex = navParams.get('index');
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        /*this.ms4Service.getStripeKey().subscribe((data)=>{
            if (!data.error && data.message.length > 0) {
                (<any>window).Stripe.setPublishableKey(data.message[0].keypublishable);
            }
        })*/
        this.cardForm = this.lf.group({
            cardtype: [],
            // nameoncard: ['',Validators.required],
            /*city : ['',Validators.required],
            postalcode : ['',Validators.required],*/
            fname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            cardnumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(16), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(19), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]{4}[ .\-]{0,1}[0-9]{4}[ .\-]{0,1}[0-9]{4}[ .\-]{0,1}[0-9]{4}')]],
            cvv: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(3), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]{3}')]],
            expirymonth: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            expiryyear: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            zip: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(9)]],
            address: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(29)]],
            city: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(29)]],
            state: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(29)]]
        });
        /*this.cardForm.controls['cardtype'].setValue(this.cardType);*/
        if (typeof this.editCardIndex != 'undefined') {
            this.cardForm.patchValue(this.editCard);
            /*this.cardType = this.cardForm.value['cardtype'];*/
            let num = this.format(this.cardForm.value['cardnumber'], [4, 4, 4, 4], "-");
            this.cardForm.controls['cardnumber'].setValue(num);
        }
        this.cardForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        let currentDate = new Date();
        let currentYr = currentDate.getFullYear().toString().substr(-2);
        this.currentYr = parseInt(currentYr);
        this.cardForm.controls['expirymonth'].setValue(this.month[0]);
        this.cardForm.controls['expiryyear'].setValue(this.currentYr);
        this.yearArray();
    }
    cardImage() {
        let imgPath;
        let cardType = this.cardForm.controls['cardtype'].value;
        imgPath = 'assets/imgs/' + cardType + '.png';
        return imgPath;
    }
    addSpace(event) {
        if (event.target.value[0] == 4) {
            this.cardForm.controls["cardtype"].setValue('visa');
        }
        if (event.target.value[0] == 3 && (event.target.value[1] == 4 || event.target.value[1] == 7)) {
            this.cardForm.controls["cardtype"].setValue('amex');
        }
        if ((event.target.value[0] == 3 && event.target.value[1] == 5 && event.target.value[2] == 2 && event.target.value[3] == 8) || (event.target.value[0] == 3 && event.target.value[1] == 5 && event.target.value[2] == 8 && event.target.value[3] == 9)) {
            this.cardForm.controls["cardtype"].setValue('jcb');
        }
        if (event.target.value[0] == 5 && (event.target.value[1] == 1 || event.target.value[1] == 5)) {
            this.cardForm.controls["cardtype"].setValue('mastercard');
        }
        if (event.target.value[0] == 5 && event.target.value[1] == 4) {
            this.cardForm.controls["cardtype"].setValue('diners');
        }
        if (event.target.value[0] == 5 && (event.target.value[1] == 6 || event.target.value[1] == 8)) {
            this.cardForm.controls["cardtype"].setValue('maestro');
        }
        if ((event.target.value[0] == 6 && event.target.value[1] == 0) || (event.target.value[0] == 6 && event.target.value[1] == 5 && event.target.value[2] == 2 && event.target.value[3] == 1)) {
            this.cardForm.controls["cardtype"].setValue('rupay');
        }
        if ((event.target.value[0] == 6 && event.target.value[1] == 4) || (event.target.value[0] == 6 && event.target.value[1] == 5) || (event.target.value[0] == 6 && event.target.value[1] == 0 && event.target.value[2] == 1 && event.target.value[3] == 1)) {
            this.cardForm.controls["cardtype"].setValue('discover');
        }
        if ((event.target.value[0] == 5 && event.target.value[1] == 0 && event.target.value[2] == 1 && event.target.value[3] == 9) || (event.target.value[0] == 4 && event.target.value[1] == 1 && event.target.value[2] == 7 && event.target.value[3] == 5) || (event.target.value[0] == 4 && event.target.value[1] == 5 && event.target.value[2] == 7 && event.target.value[3] == 1)) {
            this.cardForm.controls["cardtype"].setValue('dankort');
        }
        if (event.target.value.length > 0) {
            let foo = event.target.value.split('-');
            let foo2 = '';
            if (foo.length > 0) {
                for (var i = 0; i < foo.length; i++) {
                    foo2 += foo[i];
                }
            }
            else {
                foo2 = event.target.value;
            }
            event.target.value = this.format(foo2, [4, 4, 4, 4], "-");
        }
    }
    format(input, format, sep) {
        var output = "";
        var idx = 0;
        for (var i = 0; i < format.length && idx < input.length; i++) {
            output += input.substr(idx, format[i]);
            if (idx + format[i] < input.length)
                output += sep;
            idx += format[i];
        }
        output += input.substr(idx);
        return output;
    }
    onValueChanged(data) {
        if (!this.cardForm) {
            return;
        }
        const form = this.cardForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    yearArray() {
        let yr = this.currentYr;
        for (var i = yr; i < this.currentYr + 15; i++) {
            this.year.push(i);
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AddressPage');
    }
    ionViewDidEnter() {
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }
    addCard() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        let foo = this.cardForm.value.cardnumber.split('-');
        let foo2 = '';
        if (foo.length > 0) {
            for (var i = 0; i < foo.length; i++) {
                foo2 += foo[i];
            }
        }
        let obj = {};
        let abc = this.cardForm.value.cardnumber;
        /*obj['fname'] = this.currentCustomer['firstname'];
        obj['lname'] = this.currentCustomer['lastname'];
        obj['email'] = this.currentCustomer['email'];*/
        obj['cardnumber'] = abc.split("-").join("").trim();
        obj['fname'] = this.cardForm.value.fname;
        obj['lname'] = this.cardForm.value.lname;
        obj['expirymonth'] = this.cardForm.value.expirymonth;
        obj['expiryyear'] = this.cardForm.value.expiryyear;
        obj['cvv'] = this.cardForm.value.cvv;
        obj['cvc'] = this.cardForm.value.cvv;
        obj['zip'] = this.cardForm.value.zip;
        obj['address'] = this.cardForm.value.address;
        obj['email'] = this.currentCustomer.email;
        /*obj['city'] = this.cardForm.value.city;
        obj['postalcode'] = this.cardForm.value.postalcode;*/
        this.generatingToken = true;
        this.ms4Service.verifyCard(obj).subscribe((data) => {
            //	this.generatingToken = false;
            if (!data.error) {
                let dataObj = data.message['txn'];
                if (typeof dataObj['errorCode'] != 'undefined') {
                    this.generatingToken = false;
                    this.getToast(dataObj['errorName']);
                }
                else if (typeof dataObj['ssl_result_message'] != 'undefined' && (dataObj['ssl_result_message'] == 'APPROVED' || dataObj['ssl_result_message'] == 'APPROVAL')) {
                    let index = this.currentCustomer['cardinfo'].findIndex((mn) => {
                        return mn.cardnumber.slice(-4) == abc.slice(-4);
                    });
                    if (index == -1) {
                        this.cardForm.value["cardtype"] = dataObj['ssl_card_short_description'].toLowerCase();
                        let obj2 = this.cardForm.value;
                        obj2['cardnumber'] = foo2;
                        this.ms4Service.tokenGenerate(obj).subscribe((res) => {
                            this.generatingToken = false;
                            let tokenObj = res.message.txn;
                            if (typeof this.currentCustomer['cardinfo'] == 'undefined') {
                                this.currentCustomer['cardinfo'] = [];
                                this.currentCustomer['cardinfo'].push({ token: tokenObj.ssl_token.toString(), cardtype: tokenObj.ssl_card_short_description.toString(), cardnumber: tokenObj.ssl_card_number.toString() });
                            }
                            else {
                                this.currentCustomer['cardinfo'].push({ token: tokenObj.ssl_token.toString(), cardtype: tokenObj.ssl_card_short_description.toString(), cardnumber: tokenObj.ssl_card_number.toString() });
                            }
                            loading.dismiss();
                            this.updateCustomer();
                        }, (err) => {
                            loading.dismiss();
                            this.generatingToken = false;
                            this.getToast('Please try later ');
                        });
                    }
                    else {
                        loading.dismiss();
                        this.generatingToken = false;
                        this.getToast('Card with this Card Number already exist');
                    }
                }
                else {
                    loading.dismiss();
                    this.generatingToken = false;
                    this.getToast('Please try with another card');
                }
            }
        }, (err) => {
            this.generatingToken = false;
            console.log("err");
            console.log(err);
        });
        /*(<any>window).Stripe.card.createToken({
            number: foo2,
            exp_month: this.cardForm.value.expirymonth,
            exp_year: this.cardForm.value.expiryyear,
            cvc: this.cardForm.value.cvc
        }, (status, response) => {
            
            if (status === 200) {
                this.cardForm.controls["cardtype"].setValue(response.card.brand.toLowerCase());

                let index = this.currentCustomer['cardinfo'].findIndex((mn)=>mn.cardnumber == foo2)

                if (index == -1) {
                    let obj2 = this.cardForm.value;
                    obj2['cardnumber'] = foo2;
                    if (typeof this.currentCustomer['cardinfo'] == 'undefined') {
                        this.currentCustomer['cardinfo'] = [];
                        this.currentCustomer['cardinfo'].push(obj2);
                    }else{
                        this.currentCustomer['cardinfo'].push(obj2);
                    }
                    this.updateCustomer();
                }else{
                    this.getToast('Card with this Card Number already exist');
                }
            }else{
                this.getToast(response.error.message);
            }
        });*/
    }
    getCurrentCustomer(type) {
        this.ms3Service.getOneCustomer(this.currentCustomer['_id']).subscribe((data) => {
            if (!data.error) {
                this.currentCustomer = data.message;
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
            }
        });
    }
    updateCustomer() {
        this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data) => {
            if (!data.error) {
                this.getCurrentCustomer('cardadd');
                this.getToast('Card Detail Added');
                this.navCtrl.pop();
                this.cardForm.reset();
                /*this.cardForm.controls['cardtype'].setValue('master');*/
            }
            else {
                this.getToast('Unable to Add Card');
            }
        }, (err) => {
            this.getCurrentCustomer('cardadd');
            this.getToast('Unable to Add Card');
        });
    }
    choose(type) {
        console.log(this.cardForm.value);
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
};
AddCardsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-addcards',template:/*ion-inline-start:"D:\OrderApp\src\pages\profile\addcards.html"*/'<!--\n\nGenerated template for the AddressPage page.\n\n\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\n\nIonic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n	<ion-navbar>\n\n        <ion-title *ngIf = "!editCard">Add Card</ion-title>\n\n		<ion-title *ngIf = "editCard">Update Card</ion-title>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n	<ion-list>\n\n        <!-- <ion-list class="cardRadio" radio-group [(ngModel)]="cardType" (ionChange) = "choose(\'card\')">\n\n            <ion-row ><strong>Card Type</strong></ion-row>\n\n            <ion-item>\n\n                <ion-label>Master</ion-label>\n\n                <ion-radio item-left value="master"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-label>Maestro</ion-label>\n\n                <ion-radio item-left value="maestro"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-label>Debit</ion-label>\n\n                <ion-radio item-left value="debit"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-label>Credit</ion-label>\n\n                <ion-radio item-left value="credit"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-label>Visa</ion-label>\n\n                <ion-radio item-left value="visa"></ion-radio>\n\n            </ion-item>\n\n        </ion-list> -->\n\n\n\n        <!-- <form role="form" [formGroup]="cardForm" (ngSubmit)="addCard()">\n\n            \n\n            <ion-row class="marginBottom1rem width100">\n\n                <ion-label>\n\n                    <strong>Enter Card Number</strong>\n\n                    <img *ngIf = "cardForm.value.cardtype" class="cardImages" [src]="cardImage()">\n\n                </ion-label>\n\n                <ion-row>\n\n                    <ion-input class = "cardNo" (keyup)="addSpace($event)" maxlength="19" formControlName="cardnumber" type="tel" placeholder="Card Number"></ion-input>\n\n                </ion-row>\n\n                <ion-row *ngIf="formErrors.cardnumber" class="cardNoError">\n\n                    {{ formErrors.cardnumber }}\n\n                </ion-row>\n\n            </ion-row>\n\n            \n\n            \n\n\n\n            <ion-row class="marginBottom1rem width100">\n\n                <ion-label><strong>Enter CVV</strong></ion-label>\n\n                <ion-row>\n\n                    <ion-input class = "cvvNo" maxlength="3" minlength="3" formControlName="cvv" type="tel" placeholder="CVV"></ion-input>\n\n                </ion-row>\n\n                <ion-row *ngIf="formErrors.cvv" class="cardNoError">\n\n                    {{ formErrors.cvv }}\n\n                </ion-row>\n\n            </ion-row>\n\n            \n\n            <ion-row class="marginBottom1rem width100">\n\n                <ion-label><strong>Name on Card</strong></ion-label>\n\n                <ion-row>\n\n                    <ion-input formControlName="nameoncard" type="text" placeholder="Name on Card"></ion-input>\n\n                </ion-row>\n\n            </ion-row>\n\n            \n\n            <ion-row class="marginBottom1rem width100">\n\n                <ion-row class= "expDateRow">\n\n                    <ion-label no-margin><strong>Expiry Date</strong></ion-label>\n\n                    <ion-select formControlName="expirymonth" (ionChange) = "choose(\'month\')">\n\n                        <ion-option *ngFor = "let mnth of month" [value] = "mnth">{{mnth}}</ion-option>\n\n                    </ion-select>\n\n                    <ion-select formControlName="expiryyear" (ionChange) = "choose(\'year\')">\n\n                        <ion-option *ngFor = "let yr of year" [value] = "yr">{{yr}}</ion-option>\n\n                    </ion-select>\n\n                </ion-row>\n\n            </ion-row> -->\n\n\n\n            <!-- <ion-label><strong>City</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input formControlName="city" type="text" placeholder="Enter city"></ion-input>\n\n            </ion-row>\n\n            \n\n            <ion-label><strong>Postalcode</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input formControlName="postalcode" type="text" placeholder="Enter Postalcode"></ion-input>\n\n            </ion-row> -->\n\n<!-- \n\n            <button *ngIf = "!editCard" ion-button full [disabled]="!cardForm.valid">Add Card</button>\n\n            <button *ngIf = "editCard" ion-button full [disabled]="!cardForm.valid">Update Card</button>\n\n        </form> -->\n\n\n\n\n\n\n\n        <form role="form" [formGroup]="cardForm" (ngSubmit)="addCard()" class="addCardForm">\n\n            <ion-label><strong>Card Number</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input class = "cardNo" (keyup)="addSpace($event)" maxlength="19" formControlName="cardnumber" type="tel" placeholder="Card Number"></ion-input>\n\n                <ion-input class = "cvvNo" maxlength="3" minlength="3" formControlName="cvv" type="tel" placeholder="CVV"></ion-input>\n\n            </ion-row>\n\n\n\n            <ion-row *ngIf="formErrors.cardnumber"  class="cardNoError">\n\n                {{ formErrors.cardnumber }}\n\n            </ion-row>\n\n\n\n            \n\n            <ion-label><strong>First Name</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input formControlName="fname" type="text" placeholder="First Name "></ion-input>\n\n            </ion-row>\n\n            \n\n            <ion-label><strong>Last Name</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input formControlName="lname" type="text" placeholder="Last Name "></ion-input>\n\n            </ion-row>\n\n            <ion-label><strong>City </strong> <small>(not Required)</small> </ion-label>\n\n            <ion-row>\n\n                <ion-input  formControlName="city" type="text" placeholder="City Name"></ion-input>\n\n            </ion-row>\n\n            <ion-row *ngIf="formErrors.city"  class="cardNoError">\n\n                {{ formErrors.city }}\n\n            </ion-row>\n\n            <ion-label><strong>State</strong> <small>(not Required)</small></ion-label>\n\n            <ion-row>\n\n                <ion-input  formControlName="state" type="text" placeholder="State Name"></ion-input>\n\n            </ion-row>\n\n            <ion-row *ngIf="formErrors.state"  class="cardNoError">\n\n                {{ formErrors.state }}\n\n            </ion-row>\n\n            <ion-label><strong>Address</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input  formControlName="address" type="text" placeholder="Address"></ion-input>\n\n            </ion-row>\n\n            <ion-row *ngIf="formErrors.address"  class="cardNoError">\n\n                {{ formErrors.address }}\n\n            </ion-row>\n\n            <ion-label><strong>Zip</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input maxlength="9" formControlName="zip" type="text" placeholder="Zip"></ion-input>\n\n            </ion-row>\n\n            <ion-row *ngIf="formErrors.zip"  class="cardNoError">\n\n                {{ formErrors.zip }}\n\n            </ion-row>\n\n<!-- <ion-label><strong>Name on Card</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input formControlName="nameoncard" type="text" placeholder="Name on Card"></ion-input>\n\n            </ion-row> -->\n\n            \n\n            <ion-row class= "expDateRow">\n\n                <ion-label no-padding><strong>Expiry Date</strong></ion-label>\n\n                <ion-select formControlName="expirymonth" (ionChange) = "choose(\'month\')">\n\n                    <ion-option *ngFor = "let mnth of month" [value] = "mnth">{{mnth}}</ion-option>\n\n                </ion-select>\n\n                <ion-select formControlName="expiryyear" (ionChange) = "choose(\'year\')">\n\n                    <ion-option *ngFor = "let yr of year" [value] = "yr">{{yr}}</ion-option>\n\n                </ion-select>\n\n            </ion-row>\n\n            \n\n            <!-- <ion-label><strong>City</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input formControlName="city" type="text" placeholder="Enter city"></ion-input>\n\n            </ion-row>\n\n            \n\n            <ion-label><strong>Postalcode</strong></ion-label>\n\n            <ion-row>\n\n                <ion-input formControlName="postalcode" type="text" placeholder="Enter Postalcode"></ion-input>\n\n            </ion-row> -->\n\n\n\n       \n\n            <button *ngIf = "!editCard" ion-button full [disabled]="!cardForm.valid">Add Card</button>\n\n            <button *ngIf = "editCard" ion-button full [disabled]="!cardForm.valid">Update Card</button>\n\n        </form>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\profile\addcards.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], AddCardsPage);

//# sourceMappingURL=addcards.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contactus__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
* Generated class for the InfoPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let InfoPage = class InfoPage {
    constructor(navCtrl, navParams, ms1Service, ms6Service, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ms1Service = ms1Service;
        this.ms6Service = ms6Service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.introList = [];
        this.imageUrl = __WEBPACK_IMPORTED_MODULE_2__app_global__["b" /* url */] + 'uploads/';
    }
    ionViewDidLoad() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ms6Service.getOneUrl('about-us').subscribe(data => {
            document.getElementById('getData').innerHTML = data.message[0]['description'];
            loading.dismiss();
            /*})
            this.ms1Service.getIntro().subscribe((data)=>{
                if (!data.error) {
                    this.introList = data.message;
                }*/
        }, (err) => {
            loading.dismiss();
            this.getToast('Unable to load data. Please check your Internet connection.');
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
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
    contactUsPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__contactus__["a" /* ContactUsPage */]);
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
    }
};
InfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-info',template:/*ion-inline-start:"D:\OrderApp\src\pages\info\info.html"*/'<!--\n\nGenerated template for the InfoPage page.\n\n\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\n\nIonic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>About</ion-title>\n\n        <ion-icon padding-top padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n    <ion-row class="desc" id = "getData">\n\n        <!-- <ion-card *ngFor="let intro of introList">\n\n            <img src="{{imageUrl}}/{{intro.image}}">\n\n              <ion-card-content>\n\n                <ion-card-title>{{intro.name}}</ion-card-title>\n\n                    <p>{{intro.description}}</p>\n\n              </ion-card-content>\n\n        </ion-card> -->\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n        <button ion-button full class = "contactUsButton" (click)="contactUsPage()">Contact us?</button>\n\n    </ion-row>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\info\info.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_5__app_service_index__["e" /* MS6Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */]])
], InfoPage);

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactUsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
* Generated class for the ContactUsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let ContactUsPage = class ContactUsPage {
    constructor(navCtrl, navParams, ms3, loadingCtrl, toastCtrl, lf, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ms3 = ms3;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.lf = lf;
        this.alertCtrl = alertCtrl;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.contactForm = this.lf.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phone: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]*')]],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(this.emailp)]],
            message: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    ionViewDidLoad() {
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    addMessage() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ms3.sendQuery(this.contactForm.value).subscribe((data) => {
            loading.dismiss();
            if (!data.error) {
                this.getToast("You message has been sent. Our team will contact you shorlty.");
                this.navCtrl.pop();
            }
            else {
                this.getToast('Unable to submmit request. Please try later.');
            }
        }, (err) => {
            this.getToast('Unable to submmit request. Please check your Internet connection.');
        });
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
    }
    callNow() {
        console.log("here");
        let confirm = this.alertCtrl.create({
            title: 'Call Now ',
            message: 'Mealdaay Help no 647-226-7862',
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
                        document.getElementById("hide").click();
                    }
                }
            ]
        });
        confirm.present();
    }
};
ContactUsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-contactus',template:/*ion-inline-start:"D:\OrderApp\src\pages\info\contactus.html"*/'<!--\n\nGenerated template for the InfoPage page.\n\n\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\n\nIonic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <ion-title>Contact Us</ion-title>\n\n        <ion-icon  padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n    <ion-row><strong><h5>How may we help you?</h5></strong></ion-row>\n\n\n\n    <ion-row class="marginBottom1vh color-gray" padding-left><strong>Our agents are available 24x7 to make sure that all your issues and inquiries are resolved.</strong></ion-row>\n\n    <!-- <ion-row class="marginBottom1vh" padding-left>abc@gmail.com</ion-row> -->\n\n\n\n    <hr>\n\n\n\n    <ion-row><strong><h5>Contact Form</h5></strong></ion-row>\n\n    <ion-row class="marginBottom1vh color-gray" padding-left><strong>Please fill the below contact form and we make sure to get back to you as soon as possible.</strong></ion-row>\n\n\n\n    <form role="form" [formGroup]="contactForm" (ngSubmit)="addMessage()">\n\n        <ion-row padding-left>\n\n            <ion-input formControlName="name" type="text" placeholder="Full Name"></ion-input>\n\n        </ion-row>\n\n        <ion-row padding-left>\n\n            <ion-input formControlName="email" type="email" placeholder="Email ID"></ion-input>\n\n        </ion-row>\n\n        <ion-row padding-left>\n\n            <ion-input formControlName="phone" type="tel" placeholder="Phone Number"></ion-input>\n\n        </ion-row>\n\n        <ion-row padding-left>\n\n            <ion-textarea rows="3" formControlName="message" type="text" placeholder="Message"></ion-textarea>\n\n        </ion-row>\n\n\n\n        <button ion-button full [disabled]="!contactForm.valid">Send</button>\n\n    </form>\n\n\n\n    <ion-row class="marginBottom1vh color-gray"><strong>To get the quickest response in case you need to:</strong></ion-row>\n\n\n\n    <ion-row class="marginBottom1vh alignItemsCenter"><ion-icon name="checkmark" ios="ios-checkmark" md="md-checkmark" color = "secondary"></ion-icon> &nbsp; &nbsp; <strong>Modify your order</strong></ion-row>\n\n    <ion-row class="marginBottom1vh alignItemsCenter"><ion-icon name="checkmark" ios="ios-checkmark" md="md-checkmark" color = "secondary"></ion-icon> &nbsp; &nbsp; <strong>General inquiries</strong></ion-row>\n\n\n\n    <ion-row class="marginBottom1vh">You may contact us through our Call Center number : </ion-row>\n\n\n\n    <ion-row class="marginBottom1vh" (click)="callNow()">\n\n        <ion-col padding text-center>\n\n         \n\n            <span class="verticalAlignMiddle callSpan"><ion-icon name="call" ios="ios-call" md="md-call" ></ion-icon> &nbsp;647-226-7862</span>\n\n        </ion-col>\n\n    </ion-row>\n\n    <a href="tel:647-226-7862" id="hide" style="display:none"> </a>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\info\contactus.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ContactUsPage);

//# sourceMappingURL=contactus.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orderdetail__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
* Generated class for the OrderPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let OrderPage = class OrderPage {
    constructor(navCtrl, loadingCtrl, toastCtrl, ms4Service, ms1Service) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.ms4Service = ms4Service;
        this.ms1Service = ms1Service;
        this.orders = [];
        this.imageURL = __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* imageUrl */];
        if (localStorage.getItem('Mealdaay_customer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        }
        /*this.orders = JSON.parse(localStorage.getItem('order'))*/
    }
    ionViewDidEnter() {
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
    getOrderImage(img) {
        let imgPath;
        if (typeof img == 'undefined' || img == null || img == '') {
            imgPath = "assets/imgs/res1.jpg";
        }
        else {
            imgPath = this.imageURL + img;
        }
        return imgPath;
    }
    getAllResaurants() {
        this.ms1Service.getAll().subscribe((data) => {
            if (!data.error && data.message != null && data.message.length > 0) {
                let kitchens = data.message;
                for (var i = 0; i < this.orders.length; i++) {
                    let indx = kitchens.findIndex((mn) => {
                        return mn['_id'] == this.orders[i]['restaurantid'];
                    });
                    if (indx > -1 && kitchens[indx]['image'].length > 0) {
                        this.orders[i]['resImage'] = kitchens[indx]['image'][0];
                        this.orders[i]['resName'] = kitchens[indx]['restaurantname'];
                    }
                    else {
                        this.orders[i]['resImage'] = null;
                    }
                }
            }
        });
    }
    getOrders() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        if (this.currentCustomer) {
            this.ms4Service.getCustomerOrders(this.currentCustomer._id).subscribe((data) => {
                loading.dismiss();
                if (!data.error) {
                    this.orders = data.message;
                    this.getAllResaurants();
                }
                else {
                    let toast = this.toastCtrl.create({
                        message: 'Unable to load Data. Please try later!',
                        duration: 3000,
                        position: 'top' //top,middle,bottom
                    });
                    toast.present();
                }
            }, (err) => {
                loading.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Unable to load Data. Please check your Internet connection.',
                    duration: 3000,
                    position: 'top' //top,middle,bottom
                });
                toast.present();
            });
        }
        else {
            loading.dismiss();
        }
    }
    showDetail(order) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__orderdetail__["a" /* OrderDetailPage */], {
            'item': order
        });
    }
};
OrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-order',template:/*ion-inline-start:"D:\OrderApp\src\pages\order\order.html"*/'<!--\n\n  Generated template for the OrderPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title>\n\n            <ion-icon class = "font1-2em" name="cart" item-start></ion-icon> &nbsp;Orders\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <ion-list>\n\n        <ion-item *ngFor="let order of orders" (click)="showDetail(order)">\n\n\n\n        	<ion-icon class="showDetail" name="arrow-dropright-circle" ios="ios-arrow-dropright-circle" md="md-arrow-dropright-circle"></ion-icon>\n\n\n\n\n\n            <ion-thumbnail class="orderThumbnail" item-start [ngStyle]="{\'background-image\': \'url(\' + getOrderImage(order.resImage) +\')\'}">\n\n                <!-- <img [src]="getOrderImage(order.resImage)"> -->\n\n            </ion-thumbnail>\n\n            <ion-row *ngIf = "order.resName"><strong text-capitalize>{{order.resName}}</strong></ion-row>\n\n            <ion-row><strong>Order ID : {{order._id.substr(18,6)}} </strong></ion-row>\n\n            <!-- <ion-row class="whiteSpaceInitial">Restaurant Name </ion-row> -->\n\n            <ion-row class="whiteSpaceInitial">Total Amount : <strong><span *ngIf = "order.currency">{{order.currency}} </span>{{order.total | number : \'1.2-2\'}}</strong> </ion-row>\n\n            <ion-row>{{order.created_at | date:\'medium\' }}</ion-row>\n\n            \n\n            <ion-row *ngIf="order.status == \'received\' && order.paymenttype == \'cash\' "><strong> Order Placed </strong></ion-row>\n\n            \n\n            <ion-row *ngIf="order.status == \'received\' && order.paymenttype == \'card\' "><strong> Payment Received </strong></ion-row>\n\n\n\n            <ion-row *ngIf="order.status == \'accepted\'"><strong>Preparing your Order</strong></ion-row>\n\n            \n\n            <ion-row *ngIf="order.status == \'rejected\'"><strong>Order Rejected</strong></ion-row>\n\n\n\n            <ion-row *ngIf="(order.status == \'completed\' || order.status == \'driverrejected\') && (order.ordertype == \'home\')"><strong>Order Prepared</strong>&nbsp;(Waiting for Driver!)\n\n            </ion-row>\n\n            <ion-row *ngIf="(order.status == \'completed\' || order.status == \'driverrejected\') && (order.ordertype == \'pick\')"><strong>Order Prepared</strong>&nbsp;(Waiting for you!)\n\n            </ion-row>\n\n            <ion-row *ngIf="(order.status == \'driveraccepted\') && (order.ordertype == \'home\')"><strong>Order is on the Way</strong></ion-row>\n\n            <ion-row *ngIf="(order.status == \'driveraccepted\') && (order.ordertype == \'pick\')"><strong>You are on the Way to pick food</strong></ion-row>\n\n            <ion-row *ngIf="order.status == \'delivered\'"><strong>Delivered</strong></ion-row>\n\n\n\n            <ion-row *ngIf="order.status == \'cancelled\'"><strong>Order Cancelled</strong></ion-row>\n\n\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\OrderApp\src\pages\order\order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["a" /* MS1Service */]])
], OrderPage);

//# sourceMappingURL=order.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GiveReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let GiveReviewPage = class GiveReviewPage {
    constructor(viewCtrl, lf, modalCtrl, ms4service, toastCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.lf = lf;
        this.modalCtrl = modalCtrl;
        this.ms4service = ms4service;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.kitchenId = navParams.get('kitchenId');
        this.order = navParams.get('order');
        /*let rating = navParams.get('rating');*/
        this.ratingForm = this.lf.group({
            orderId: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            restaurantId: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            customerId: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            review: [],
            average: [],
            orderPackagingRating: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            deliveryTimeRating: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            valueOfTimeRating: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            items: [],
            combo: [],
            package: []
        });
        let items = [];
        let combo = [];
        let packagee = [];
        this.order.items.forEach((item) => {
            var objindex = items.indexOf(item._id);
            if (objindex == -1) {
                items.push(item._id);
            }
        });
        this.order.combo.forEach((item) => {
            var objindex = combo.indexOf(item._id);
            if (objindex == -1) {
                combo.push(item._id);
            }
        });
        this.order.package.forEach((item) => {
            var objindex = packagee.indexOf(item._id);
            if (objindex == -1) {
                packagee.push(item._id);
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
    onModelChange(event, type) {
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
    addReview() {
        if (typeof this.review != 'undefined' && this.review != '') {
            this.ratingForm.controls['review'].setValue(this.review);
        }
        let avg = ((this.rateOrderPacking + this.rateDeliveryTime + this.rateValueOfMoney) / 3).toFixed(2);
        this.ratingForm.controls['average'].setValue(parseFloat(avg));
        this.ms4service.add(this.ratingForm.value).subscribe((data) => {
            if (!data.error) {
                this.getToast("Thanks for rating!");
                this.dismiss();
            }
            else {
                this.getToast("Unable to add your review! Please Try again.");
            }
        }, (err) => {
            this.getToast('Unable to add Rating! Please check your Internet connection');
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
};
GiveReviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-give-review',template:/*ion-inline-start:"D:\OrderApp\src\pages\review\give-review.html"*/'<ion-header>\n\n\n\n    <ion-toolbar>\n\n        <ion-title>\n\n            Give Review\n\n        </ion-title>\n\n        <ion-buttons start>\n\n            <button ion-button (click)="dismiss()">\n\n                <span ion-text showWhen="ios,android,windows">Cancel</span>\n\n                <!-- <ion-icon name="md-close" showWhen=""></ion-icon> -->\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content has-bouncing="true" padding class="pt-100">\n\n\n\n    <ion-row><ion-col text-center><strong>Order Packing Rating</strong></ion-col></ion-row>\n\n    <rating class="orderPacking" [(ngModel)]="rateOrderPacking" readOnly="false" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false" (ngModelChange)="onModelChange($event,\'order\')"> </rating>\n\n    \n\n    <ion-row><ion-col text-center><strong>Delivery Time Rating</strong></ion-col></ion-row>\n\n    <rating class="deliveryTime" [(ngModel)]="rateDeliveryTime" readOnly="false" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false" (ngModelChange)="onModelChange($event,\'delivery\')"> </rating>\n\n\n\n    <ion-row><ion-col text-center><strong>Money Value Rating</strong></ion-col></ion-row>\n\n    <rating class="valueOfMoney" [(ngModel)]="rateValueOfMoney" readOnly="false" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false" (ngModelChange)="onModelChange($event,\'money\')"> </rating>\n\n\n\n    <ion-row><ion-col col-12><textarea [(ngModel)]="review" class="form-control width100" rows="2" placeholder="Your review help to other learn about your order experience from this chef"></textarea></ion-col></ion-row>\n\n\n\n    <button [disabled]="!ratingForm.valid" ion-button full color = "danger" class="font2vh marginLeftAuto" (click)="addReview()">Rate</button>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\OrderApp\src\pages\review\give-review.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
], GiveReviewPage);

//# sourceMappingURL=give-review.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WishlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service_index__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
* Generated class for the WishlistPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let WishlistPage = class WishlistPage {
    constructor(navCtrl, loadingCtrl, navParams, ms1Service, ms2Service, ms3Service) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.ms1Service = ms1Service;
        this.ms2Service = ms2Service;
        this.ms3Service = ms3Service;
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.kitchenList = [];
        this.allItems = [];
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
        this.getLoader();
        this.getAllKitchen();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad WishlistPage');
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
    getLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }
    getAllKitchen() {
        this.ms1Service.getAll().subscribe((data) => {
            if (!data.error) {
                let kitchen = data.message.filter((item) => {
                    return item['activestatus'] == true;
                });
                this.kitchenList = kitchen;
                this.getAllItems();
            }
        }, (err) => {
            this.loading.dismiss();
            /*this.getToast('Unable to load data! Please check your Internet connection');*/
        });
    }
    getAllItems() {
        this.ms2Service.getEntireItems().subscribe((data) => {
            if (!data.error) {
                this.allItems = data.message;
                if (typeof this.currentCustomer.customerfavrestro != 'undefined') {
                    if (this.currentCustomer.customerfavrestro.length > 0) {
                        let wArray = [];
                        wArray = this.currentCustomer.customerfavrestro;
                        /*this.wishlistArray = this.currentCustomer.customerfavrestro;*/
                        for (var i = 0; i < wArray.length; i++) {
                            let indx = this.kitchenList.findIndex((mn) => mn._id == wArray[i]['id']);
                            if (indx > -1) {
                                wArray[i]['resDetail'] = this.kitchenList[indx];
                            }
                        }
                        for (var j = 0; j < wArray.length; j++) {
                            wArray[j]['itemDetail'] = [];
                            if (wArray[j]['items'].length > 0) {
                                for (var k = 0; k < wArray[j]['items'].length; k++) {
                                    let index = this.allItems.findIndex((mn) => mn._id == wArray[j]['items'][k]);
                                    if (index > -1) {
                                        wArray[j]['itemDetail'].push(this.allItems[index]);
                                    }
                                }
                            }
                        }
                        setTimeout(() => {
                            this.setWishlistArray(wArray);
                        }, 1000);
                    }
                    else {
                        this.loading.dismiss();
                        this.wishlistArray = [];
                    }
                }
                else {
                    this.loading.dismiss();
                    this.wishlistArray = [];
                }
            }
        }, (err) => {
            this.loading.dismiss();
            /*this.getToast('Unable to add Address! Please check your Internet connection');*/
        });
    }
    setWishlistArray(wArray) {
        this.wishlistArray = [];
        wArray.forEach((obj) => {
            if (obj['itemDetail'].length > 0 && typeof obj['resDetail'] != 'undefined' && obj['resDetail'] != null) {
                this.wishlistArray.push(obj);
            }
        });
        this.loading.dismiss();
    }
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
    }
    restroImage(img) {
        let imgPath;
        if (img != null) {
            imgPath = this.imageURL + img;
        }
        if (img == null) {
            imgPath = "assets/imgs/res1.jpg";
        }
        return imgPath;
    }
    itemImage(img) {
        let imgPath;
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
    removeFav(resid, itemid) {
        this.getLoader();
        let index = this.currentCustomer['customerfavrestro'].findIndex((mn) => mn.id == resid);
        this.currentCustomer['customerfavrestro'][index]['items'].splice(this.currentCustomer['customerfavrestro'][index]['items'].indexOf(itemid), 1);
        if (this.currentCustomer['customerfavrestro'][index]['items'].length == 0) {
            this.currentCustomer.customerfavrestro.splice(index, 1);
        }
        this.updateCustomer();
    }
    updateCustomer() {
        this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data) => {
            if (!data.error) {
                this.getCustomer(this.currentCustomer._id);
            }
        });
    }
    getCustomer(id) {
        this.ms3Service.getOneCustomer(id).subscribe((data) => {
            if (!data.error) {
                localStorage.removeItem('Mealdaay_customer');
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
                this.currentCustomer = data.message;
                this.getAllKitchen();
            }
        });
    }
};
WishlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-wishlist',template:/*ion-inline-start:"D:\OrderApp\src\pages\wishlist\wishlist.html"*/'<!--\n\n  Generated template for the WishlistPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n  	<button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>My Wishlist</ion-title>\n\n    <ion-icon padding-top padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding has-bouncing="true">\n\n	\n\n	<ng-container *ngIf = "wishlistArray && wishlistArray.length > 0">\n\n		<!-- <div *ngFor = "let data of wishlistArray"> -->\n\n			<ion-list *ngFor = "let data of wishlistArray">\n\n				<ion-item *ngIf = "data.resDetail">\n\n			        <ion-thumbnail item-start>\n\n			            <img style="object-fit:cover" [src]="restroImage(data.resDetail.image[0])">\n\n			        </ion-thumbnail>\n\n			        <h3 class="colorGray customMargin"><strong>{{data.resDetail.restaurantname}}</strong></h3>\n\n			        <h4 class="colorLightGray customMargin">{{data.resDetail.city}}, {{data.resDetail.country}}</h4>\n\n			    </ion-item>\n\n\n\n			    <hr>\n\n\n\n			    <ng-container *ngIf="data.itemDetail" class="displayGrid itemList">\n\n		    		<ion-row class="padding0 marginTop1vh" *ngFor = "let item of data.itemDetail">\n\n			        	<ion-col class="itemImage" col-3 no-padding [ngStyle]="{\'background-image\': \'url(\' + itemImage(item.image) + \')\'}"></ion-col>\n\n			    		<ion-col>\n\n			    			<ion-row text-capitalize class = "width100 colorBlack whiteSpaceInitial">\n\n			    				<ion-col col-12>\n\n			    					{{item.name}}\n\n			    					<ion-icon color = "danger" float-right name="heart" ios="ios-heart" md="md-heart" (click)="removeFav(data.id, item._id)"></ion-icon>\n\n			    				</ion-col>\n\n			    			</ion-row>\n\n			    			<ion-row class="colorLightGray width100 font2vh colorBlack">\n\n			    				<ion-col col-12 class="noVerticalPadding"><span *ngIf = "data.resDetail && data.resDetail.currency">{{data.resDetail.currency}}</span> {{item.price}}</ion-col>\n\n			    			</ion-row>\n\n			    			\n\n			    			<ion-row class = "font2vh width100">\n\n			    				<ion-col col-12 class="noVerticalPadding">\n\n				    				<ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n						            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n						            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n						            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n						            <ion-icon name="star" ios="ios-star" md="md-star"></ion-icon>\n\n						        </ion-col>\n\n			    			</ion-row>\n\n			    		</ion-col>\n\n		    		</ion-row>\n\n		    	</ng-container>\n\n			</ion-list>\n\n		<!-- </div> -->\n\n	</ng-container>\n\n\n\n	<!-- <div> -->\n\n		<ion-list *ngIf = "wishlistArray && wishlistArray.length == 0">\n\n			<ion-item text-center class="paddin40-16px">\n\n		        <strong>No Items in Wishlist!</strong>\n\n		    </ion-item>\n\n		</ion-list>\n\n	<!-- </div> -->\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\wishlist\wishlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["a" /* MS1Service */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["b" /* MS2Service */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["c" /* MS3Service */]])
], WishlistPage);

//# sourceMappingURL=wishlist.js.map

/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(563);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_long_press__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_my_pop_over__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_forgetpassword__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_signup__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_guestlogin__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ion_datepicker__ = __webpack_require__(908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_list_list__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_list_filter__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_service_filter_service__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_cart_checkout__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_cart_thankupage__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_app_minimize__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_profile_profile__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_profile_changepassword__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_profile_profileupdate__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_profile_addaddress__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_profile_addcards__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_order_order__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_order_orderdetail__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_refer_refer__ = __webpack_require__(913);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_diagnostic__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_review_review__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_review_give_review__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_info_info__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_info_contactus__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_wishlist_wishlist__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_offer_offer__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_snap_snap__ = __webpack_require__(914);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_network__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ionic2_rating__ = __webpack_require__(915);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ng2_file_upload__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_39_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__service_location_service__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__service_firebase_function_service__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_file__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_transfer__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_file_path__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_camera__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_status_bar__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_splash_screen__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_geolocation__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_angularfire2__ = __webpack_require__(917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_50_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_angularfire2_database__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_51_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_angularfire2_firestore__ = __webpack_require__(918);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_52_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_angularfire2_auth__ = __webpack_require__(923);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_53_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_native_badge__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_firebase__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_55_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_ion2_datetime_picker__ = __webpack_require__(928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_cart_add_on__ = __webpack_require__(525);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































/*Services*/









/*import { NativeGeocoder } from '@ionic-native/native-geocoder';*/




/*import { AngularFireModule } from 'angularfire2';*/
// for AngularFireDatabase

/*import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';*/
// for AngularFireAuth


/*import { BackgroundMode } from '@ionic-native/background-mode';*/

// import{ScreenOrientation} from '@ionic-native/screen-orientation';


var config = {
    apiKey: "AIzaSyB5oue6snCCcEKDTpoX8hRQkP0q2bl1Ojo",
    authDomain: "mealdaay-334ae.firebaseapp.com",
    databaseURL: "https://mealdaay-334ae.firebaseio.com",
    projectId: "mealdaay-334ae",
    storageBucket: "mealdaay-334ae.appspot.com",
    messagingSenderId: "202055895804"
};
__WEBPACK_IMPORTED_MODULE_55_firebase__["initializeApp"](config);
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_57__pages_cart_add_on__["a" /* AddOn */],
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_8__pages_home_my_pop_over__["a" /* MyPopOverPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_10__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_11__pages_login_signup__["a" /* SignupPage */], __WEBPACK_IMPORTED_MODULE_12__pages_login_guestlogin__["a" /* GuestModalPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */], __WEBPACK_IMPORTED_MODULE_15__pages_list_filter__["a" /* FilterPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_cart_cart__["a" /* CartPage */], __WEBPACK_IMPORTED_MODULE_18__pages_cart_checkout__["a" /* CheckoutPage */], __WEBPACK_IMPORTED_MODULE_19__pages_cart_thankupage__["a" /* ThankPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_profile_profile__["a" /* ProfilePage */], __WEBPACK_IMPORTED_MODULE_22__pages_profile_changepassword__["a" /* ChangePasswordPage */], __WEBPACK_IMPORTED_MODULE_23__pages_profile_profileupdate__["a" /* ProfileUpdatePage */], __WEBPACK_IMPORTED_MODULE_24__pages_profile_addaddress__["a" /* AddAddressPage */], __WEBPACK_IMPORTED_MODULE_25__pages_profile_addcards__["a" /* AddCardsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_order_order__["a" /* OrderPage */], __WEBPACK_IMPORTED_MODULE_27__pages_order_orderdetail__["a" /* OrderDetailPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_refer_refer__["a" /* ReferPage */], __WEBPACK_IMPORTED_MODULE_30__pages_review_review__["a" /* ReviewPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_info_info__["a" /* InfoPage */], __WEBPACK_IMPORTED_MODULE_33__pages_info_contactus__["a" /* ContactUsPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_wishlist_wishlist__["a" /* WishlistPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_offer_offer__["a" /* OfferPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_snap_snap__["a" /* SnapPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_review_give_review__["a" /* GiveReviewPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_56_ion2_datetime_picker__["a" /* MultiPickerModule */],
            __WEBPACK_IMPORTED_MODULE_13_ion_datepicker__["a" /* DatePickerModule */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_long_press__["a" /* LongPressModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_39_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_38_ionic2_rating__["a" /* Ionic2RatingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_50_angularfire2__["AngularFireModule"].initializeApp(config),
            __WEBPACK_IMPORTED_MODULE_51_angularfire2_database__["AngularFireDatabaseModule"],
            __WEBPACK_IMPORTED_MODULE_52_angularfire2_firestore__["AngularFirestoreModule"],
            __WEBPACK_IMPORTED_MODULE_53_angularfire2_auth__["AngularFireAuthModule"]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_8__pages_home_my_pop_over__["a" /* MyPopOverPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_10__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_11__pages_login_signup__["a" /* SignupPage */], __WEBPACK_IMPORTED_MODULE_12__pages_login_guestlogin__["a" /* GuestModalPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_list_list__["a" /* ListPage */], __WEBPACK_IMPORTED_MODULE_15__pages_list_filter__["a" /* FilterPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_cart_cart__["a" /* CartPage */], __WEBPACK_IMPORTED_MODULE_18__pages_cart_checkout__["a" /* CheckoutPage */], __WEBPACK_IMPORTED_MODULE_19__pages_cart_thankupage__["a" /* ThankPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_profile_profile__["a" /* ProfilePage */], __WEBPACK_IMPORTED_MODULE_22__pages_profile_changepassword__["a" /* ChangePasswordPage */], __WEBPACK_IMPORTED_MODULE_23__pages_profile_profileupdate__["a" /* ProfileUpdatePage */], __WEBPACK_IMPORTED_MODULE_24__pages_profile_addaddress__["a" /* AddAddressPage */], __WEBPACK_IMPORTED_MODULE_25__pages_profile_addcards__["a" /* AddCardsPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_order_order__["a" /* OrderPage */], __WEBPACK_IMPORTED_MODULE_27__pages_order_orderdetail__["a" /* OrderDetailPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_refer_refer__["a" /* ReferPage */], __WEBPACK_IMPORTED_MODULE_30__pages_review_review__["a" /* ReviewPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_info_info__["a" /* InfoPage */], __WEBPACK_IMPORTED_MODULE_33__pages_info_contactus__["a" /* ContactUsPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_wishlist_wishlist__["a" /* WishlistPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_offer_offer__["a" /* OfferPage */],
            __WEBPACK_IMPORTED_MODULE_57__pages_cart_add_on__["a" /* AddOn */],
            __WEBPACK_IMPORTED_MODULE_36__pages_snap_snap__["a" /* SnapPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_review_give_review__["a" /* GiveReviewPage */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_39_ng2_file_upload__["FileUploadModule"]],
        providers: [
            // CallNumber,
            __WEBPACK_IMPORTED_MODULE_54__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_app_minimize__["a" /* AppMinimize */],
            // BackgroundMode,
            __WEBPACK_IMPORTED_MODULE_41__service_location_service__["a" /* LocationService */],
            __WEBPACK_IMPORTED_MODULE_16__app_service_filter_service__["a" /* FilterService */],
            __WEBPACK_IMPORTED_MODULE_40__service_index__["a" /* MS1Service */], __WEBPACK_IMPORTED_MODULE_40__service_index__["b" /* MS2Service */], __WEBPACK_IMPORTED_MODULE_40__service_index__["c" /* MS3Service */], __WEBPACK_IMPORTED_MODULE_40__service_index__["d" /* MS4Service */], __WEBPACK_IMPORTED_MODULE_40__service_index__["e" /* MS6Service */], __WEBPACK_IMPORTED_MODULE_42__service_firebase_function_service__["a" /* FirebaseFunctionService */],
            __WEBPACK_IMPORTED_MODULE_47__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_48__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_43__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_44__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_46__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_45__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_diagnostic__["a" /* Diagnostic */],
            /*NativeGeocoder,*/
            __WEBPACK_IMPORTED_MODULE_49__ionic_native_geolocation__["a" /* Geolocation */],
            /*BackgroundMode,*/
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_51_angularfire2_database__["AngularFireDatabase"],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_cart_cart__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_info_info__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_order_order__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_order_orderdetail__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_wishlist_wishlist__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__service_location_service__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_badge__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_diagnostic__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








/*import { FilterPage } from '../pages/list/filter';*/


/*import { ReferPage } from '../pages/refer/refer';*/








let MyApp = class MyApp {
    constructor(platform, 
        /*public navCtrl: NavController,*/
        app, statusBar, events, splashScreen, alertCtrl, ms4Service, ms6Service, locationService, loadingCtrl, toastCtrl, badge, diagnostic, 
        /*private backgroundMode: BackgroundMode,*/
        network) {
        this.platform = platform;
        this.app = app;
        this.statusBar = statusBar;
        this.events = events;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.ms4Service = ms4Service;
        this.ms6Service = ms6Service;
        this.locationService = locationService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.badge = badge;
        this.diagnostic = diagnostic;
        this.network = network;
        this.noConnection = false;
        this.showLocAllowButton = false;
        this.loading = this.loadingCtrl.create({
            spinner: "bubbles",
            duration: 3000
        });
        document.addEventListener("resume", () => {
            this.getLocation("");
        }, false);
        events.subscribe("user:created", (user, time) => {
            this.pages = [];
            this.pages.push({ title: "All Restaurants/Chefs", component: __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */] }, { title: "Cart", component: __WEBPACK_IMPORTED_MODULE_7__pages_cart_cart__["a" /* CartPage */] }, { title: "My Profile", component: __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */] }, { title: "My Orders", component: __WEBPACK_IMPORTED_MODULE_10__pages_order_order__["a" /* OrderPage */] }, { title: "About", component: __WEBPACK_IMPORTED_MODULE_9__pages_info_info__["a" /* InfoPage */] }, { title: "My Wishlist", component: __WEBPACK_IMPORTED_MODULE_12__pages_wishlist_wishlist__["a" /* WishlistPage */] }, { title: "Logout", component: "Logout" });
        });
        events.subscribe("cart:item", (user, time) => {
            this.cartCount();
        });
        this.initializeApp();
    }
    retry(event) {
        this.noConnection = false;
        if (this.network["type"] == "none") {
            this.loading.present();
            this.noConnectionToast();
        }
        else {
            this.onConnectFunction();
        }
    }
    onConnectFunction() {
        this.loadScript();
        this.getLocation("onConnectFunction");
    }
    loadScript() {
        let node = document.createElement("script");
        node.src =
            "http://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=places&key=AIzaSyB1IsrsMN22HB_fgAxG0i3Twes60dPF2EA";
        node.type = "text/javascript";
        document.getElementsByTagName("body")[0].appendChild(node);
    }
    noConnectionToast() {
        let toast = this.toastCtrl.create({
            message: "No Internet connection!",
            duration: 2000,
            position: "bottom" //top,middle,bottom
        });
        toast.present();
        this.noConnection = true;
    }
    iconImage() {
        return "assets/imgs/MealDaay-small.png";
    }
    cartCount() {
        if (localStorage.getItem("cartinfo")) {
            if (JSON.parse(localStorage.getItem("cartinfo"))["items"].length > 0 ||
                JSON.parse(localStorage.getItem("cartinfo"))["combo"].length > 0 ||
                JSON.parse(localStorage.getItem("cartinfo"))["package"].length > 0) {
                this.orderdetails = JSON.parse(localStorage.getItem("cartinfo"));
            }
            else {
                delete this.orderdetails;
            }
        }
        else {
            delete this.orderdetails;
        }
    }
    setBadge(budgeNumber) {
        this.badge.set(budgeNumber);
        console.log("set Badge");
    }
    getBadge() {
        console.log('get Badge');
        this.badge.get().then(count => {
            this.totalbudgeCount = count;
        });
    }
    clearBadge() {
        console.log('clearBadge');
        this.badge.clear();
    }
    increaseBadge() {
        console.log('increasing badge by 1');
        this.badge.increase(1);
    }
    registerRequestPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isSupported = yield this.badge.isSupported();
                console.log("isSupported", isSupported);
                let hasPermission = yield this.badge.hasPermission();
                console.log('app188hasPermission', hasPermission);
                if (hasPermission) {
                    let permission = yield this.badge.requestPermission();
                    console.log(permission);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    initializeApp() {
        var _that = this;
        // this.clearBadge();
        this.pages = [
            { title: "All Restaurants/Chefs", component: __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */] },
            { title: "About", component: __WEBPACK_IMPORTED_MODULE_9__pages_info_info__["a" /* InfoPage */] },
            { title: "Cart", component: __WEBPACK_IMPORTED_MODULE_7__pages_cart_cart__["a" /* CartPage */] },
            { title: "Login", component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] }
        ];
        this.platform.ready().then(() => {
            // this.setBadge(5);
            this.registerRequestPermission();
            this.splashScreen.hide();
            this.getLocation("init");
            if (typeof FCMPlugin != "undefined") {
                FCMPlugin.onNotification(data => {
                    console.log("HERE");
                    if (data.wasTapped) {
                        _that.getOrder(data.orderId);
                        this.increaseBadge();
                        console.log("Received in background");
                    }
                    else {
                        console.log("Received in foreground");
                        let prompt = _that.alertCtrl.create({
                            message: data.message,
                            buttons: [
                                {
                                    text: "oK",
                                    handler: dataa => {
                                        _that.getOrder(data.orderId);
                                    }
                                }
                            ]
                        });
                        prompt.present();
                    }
                });
                FCMPlugin.onTokenRefresh(function (token) {
                    console.log(token);
                });
            }
            let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
                this.noConnectionToast();
            });
            let connectSubscription = this.network.onConnect().subscribe(() => {
                this.onConnectFunction();
            });
            this.statusBar.styleDefault();
        });
    }
    getLocation(type) {
        if (this.network["type"] == "none") {
            this.noConnectionToast();
            // this.nextFunction(type);
            // this.splashScreen.hide();
        }
        else {
            this.noConnection = false;
            // this.locationService.getlocationPermission().then((status)=>{
            //     if(status){
            //     this.nextFunction(type)
            //     }else{
            //     }
            // });
            if (type == "init") {
                this.diagnostic.isLocationEnabled().then(success => {
                    if (!success) {
                        this.showLocAllowButton = true;
                    }
                    else {
                        if (localStorage.getItem("currentCountry_Mealday")) {
                            this.nextFunction(type);
                        }
                        else {
                            this.locationService.successCallback(true).then(res => {
                                if (res) {
                                    this.nextFunction(type);
                                }
                            });
                        }
                    }
                });
            }
            else if (type == "onConnectFunction") {
                this.diagnostic.switchToLocationSettings();
            }
            else {
                // this.locationService.getlocationPermission().then((status)=>{
                //     if(status){
                //     this.nextFunction(type)
                //     }else{
                //     }
                if (!this.currentComponentPage) {
                    this.diagnostic.isLocationEnabled().then(success => {
                        if (!success) {
                            this.showLocAllowButton = true;
                        }
                        else {
                            if (localStorage.getItem("currentCountry_Mealday")) {
                                this.nextFunction(type);
                            }
                            else {
                                this.locationService.successCallback(true).then(res => {
                                    if (res) {
                                        this.nextFunction(type);
                                    }
                                });
                            }
                        }
                    });
                }
                else {
                    this.locationService.getlocationPermission().then(status => {
                        if (status) {
                            this.nextFunction(type);
                        }
                    });
                }
            }
            // if(!locAccess){
            //     if (type == 'init') {
            //         this.showLocAllowButton = true;
            //     }
            //     this.nextFunction(type);
            // }else{
            //     this.locationService.getLocation();
            //     this.nextFunction(type);
            // }
        }
    }
    nextFunction(type) {
        console.log("nextFunction");
        let id = setInterval(() => {
            let cntry = localStorage.getItem("currentCountry_Mealday");
            console.log("currentCOuntry nextfunction", cntry);
            // console.log("cntry => " , cntry);
            if (cntry != null && cntry != "") {
                this.loading.present();
                clearInterval(id);
                let cstmr = localStorage.getItem("Mealdaay_customer");
                if (cstmr != null && JSON.parse(cstmr)["accounttype"] == "customer") {
                    this.events.publish("user:created", JSON.parse(localStorage.getItem("Mealdaay_customer")), Date.now());
                }
                /*this.badge.set(9);*/
                console.log(this.currentComponentPage, "CP");
                if (!this.currentComponentPage) {
                    this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */];
                    this.showLocAllowButton = false;
                    console.log("ListPage");
                }
                else {
                    // if (this.currentComponentPage == 'ListPage') {
                    //     this.nav.setRoot(ListPage);
                    // }else if (this.currentComponentPage == 'ProfilePage') {
                    //     this.nav.setRoot(ProfilePage);
                    // }else if (this.currentComponentPage == 'CartPage') {
                    //     this.nav.setRoot(CartPage);
                    // }else if (this.currentComponentPage == 'OrderPage') {
                    //     this.nav.setRoot(OrderPage);
                    // }else if (this.currentComponentPage == 'InfoPage') {
                    //     this.nav.setRoot(InfoPage);
                    // }else if (this.currentComponentPage == 'WishlistPage') {
                    //     this.nav.setRoot(WishlistPage);
                    // }else{
                    //     this.nav.setRoot(ListPage);
                    // }
                }
                this.showLocAllowButton = false;
                this.loading.dismiss();
                this.getCurrentPage();
                this.cartCount();
            }
        }, 1000);
    }
    cartPage() {
        this.app.getActiveNav().push(__WEBPACK_IMPORTED_MODULE_7__pages_cart_cart__["a" /* CartPage */]);
    }
    getCurrentPage() {
        setTimeout(() => {
            let page = this.app.getActiveNavs();
            if (page.length > 0) {
                this.currentComponentPage = page[0].getViews()[0].name;
            }
        }, 1000);
    }
    openPage(page) {
        if (page.component == "Logout") {
            let prompt = this.alertCtrl.create({
                title: "Logout",
                message: "Are you sure ?",
                buttons: [
                    {
                        text: "Cancel",
                        handler: data => {
                            console.log("Cancel clicked");
                        }
                    },
                    {
                        text: "oK",
                        handler: data => {
                            /*let currentCountryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
                                      localStorage.clear();
                                      localStorage.setItem('currentCountry_Mealday',JSON.stringify(currentCountryObj));
                                      if (typeof this.orderdetails != 'undefined') {
                                          localStorage.setItem('cartinfo',JSON.stringify(this.orderdetails));
                                      }*/
                            localStorage.removeItem("Mealdaay_customer");
                            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */]);
                            this.pages = [];
                            this.pages.push({ title: "All Restaurants/Chefs", component: __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */] }, { title: "Cart", component: __WEBPACK_IMPORTED_MODULE_7__pages_cart_cart__["a" /* CartPage */] }, { title: "About", component: __WEBPACK_IMPORTED_MODULE_9__pages_info_info__["a" /* InfoPage */] }, { title: "Login", component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] });
                            this.getCurrentPage();
                        }
                    }
                ]
            });
            prompt.present();
        } /* if(page.component == 'Login'){
                this.app.getActiveNav().push(LoginPage);
            }else*/
        else {
            this.nav.setRoot(page.component);
        }
        this.getCurrentPage();
    }
    getOrder(id) {
        this.ms4Service.getOneOrder(id).subscribe(data => {
            if (!data.error) {
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_order_orderdetail__["a" /* OrderDetailPage */], {
                    item: data.message,
                    noti: "noti"
                });
            }
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\OrderApp\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-title>Menu</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n\n\n        <ion-list class="logoList">\n\n            <img [src]="iconImage()">\n\n        </ion-list>\n\n\n\n\n\n        <ion-list>\n\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n                {{p.title}}\n\n            </button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n\n\n\n\n<ion-row *ngIf = "orderdetails" class = "cartBottomRow" (click)="cartPage()">\n\n    <div style="width: 75vw;">{{orderdetails.items.length + orderdetails.combo.length + orderdetails.package.length}} Items |&nbsp;<span *ngIf = "orderdetails.currency">&nbsp;{{orderdetails.currency}} </span> {{orderdetails.subtotal | number : \'1.2-2\'}}</div>\n\n    <div style="width: 25vw;">CART</div>\n\n</ion-row>\n\n\n\n<ion-badge class="cartBadge" *ngIf = "orderdetails" item-end (click)="cartPage()"> {{orderdetails.items.length + orderdetails.combo.length + orderdetails.package.length}} </ion-badge>\n\n\n\n\n\n<ion-row *ngIf = "noConnection" class="noconnection" (tap)="retry($event)">\n\n  <ion-col no-padding col-12 text-center>\n\n    <ion-icon name ="refresh" ios="ios-refresh" md="md-refresh"></ion-icon>\n\n  </ion-col>\n\n  <ion-col no-padding col-12 text-center>Tap to Reload</ion-col>\n\n</ion-row>\n\n\n\n\n\n\n\n<div *ngIf = "showLocAllowButton" class="whiteLocationButtonDiv">\n\n    <div text-center>\n\n        <img [src]="iconImage()">\n\n        <button class="themeRedBg" ion-button (click) = "getLocation(\'onConnectFunction\')">Allow Device location</button>\n\n        <p>**Need to access your location to show result. Please turn your device location ON</p>\n\n    </div>\n\n</div>\n\n<!-- <div *ngIf = "loadingContent" class="whiteLocationButtonDiv">\n\n    <div text-center>\n\n        <img [src]="iconImage()">\n\n        <p>**Fetching your location. please wait for a while</p>\n\n        <button class="themeRedBg" ion-button (click) = "getLocation(\'init\')">Retry</button>\n\n    </div>\n\n</div> -->'/*ion-inline-end:"D:\OrderApp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_13__service_index__["d" /* MS4Service */],
        __WEBPACK_IMPORTED_MODULE_13__service_index__["e" /* MS6Service */],
        __WEBPACK_IMPORTED_MODULE_14__service_location_service__["a" /* LocationService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_15__ionic_native_badge__["a" /* Badge */],
        __WEBPACK_IMPORTED_MODULE_16__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MS1Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let MS1Service = class MS1Service {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url1 */] + 'kitchen/')
            .map((response) => response.json());
    }
    getOne(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url1 */] + 'kitchen/' + id)
            .map((response) => response.json());
    }
    getOneOwner(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url1 */] + 'owners/' + id)
            .map((response) => response.json());
    }
    orderCancelMail(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url1 */] + 'order-cancel-email', data)
            .map((response) => response.json());
    }
    getIntro() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'intro')
            .map((response) => response.json());
    }
    filterRestaurants(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url1 */] + 'filterKitchen/', data)
            .map((response) => response.json());
    }
    orderMail(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url1 */] + 'order-email', data)
            .map((response) => response.json());
    }
    getDriver(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["c" /* url1 */] + 'driver/' + id)
            .map((response) => response.json());
    }
};
MS1Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MS1Service);

//# sourceMappingURL=ms1.service.js.map

/***/ }),

/***/ 885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MS2Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let MS2Service = class MS2Service {
    constructor(http) {
        this.http = http;
    }
    getAllMenu(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'menu-list/' + id)
            .map((response) => response.json());
    }
    getAllItem(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'item-list/' + id)
            .map((response) => response.json());
    }
    getEntireItems() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'item')
            .map((response) => response.json());
    }
    getActiveItems(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'active-items/' + id)
            .map((response) => response.json());
    }
    getActiveMealPackages(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'active-mealpackages/' + id)
            .map((response) => response.json());
    }
    getMonthlyMenu(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'monthly-list/' + id)
            .map((response) => response.json());
    }
    getOffersforRestro(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'offer-list/' + id)
            .map((response) => response.json());
    }
    redeemCoupanCode(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'offer/redeem', data)
            .map((response) => response.json());
    }
    getActiveCombos(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'active-combos/' + id)
            .map((response) => response.json());
    }
};
MS2Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MS2Service);

//# sourceMappingURL=ms2.service.js.map

/***/ }),

/***/ 886:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MS3Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let MS3Service = class MS3Service {
    constructor(http) {
        this.http = http;
    }
    sendQuery(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'contactus/', data)
            .map((response) => response.json());
    }
    getOneCustomer(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'customers/' + id)
            .map((response) => response.json());
    }
    getCustomer(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'customers/login', data)
            .map((response) => {
            let user = response.json();
            return user;
        });
    }
    addCustomer(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'customers/signup/', data)
            .map((response) => response.json());
    }
    updateCustomer(data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'customers/' + data._id, data)
            .map((response) => response.json());
    }
    forgetPasswordCustomer(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'customers/forget-password', data)
            .map((response) => {
            let user = response.json();
            return user;
        });
    }
    updateCustomerAddress(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'customer-address/' + data._id, data)
            .map((response) => response.json());
    }
    getMultipleCust(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["e" /* url3 */] + 'customers/multiple', data)
            .map((response) => response.json());
    }
};
MS3Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MS3Service);

//# sourceMappingURL=ms3.service.js.map

/***/ }),

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MS4Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let MS4Service = class MS4Service {
    constructor(http) {
        this.http = http;
    }
    getCustomerOrders(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'customerorder/' + id)
            .map((response) => response.json());
    }
    cardPayment(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'charge/', data)
            .map((response) => response.json());
    }
    getAllAddonKitchen(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'addon/kitchen/' + id)
            .map((response) => response.json());
    }
    addAddonEdit(id, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["d" /* url2 */] + 'addon/' + id, data)
            .map((response) => response.json());
    }
    addOrder(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'order', data)
            .map((response) => {
            let user = response.json();
            return user;
        });
    }
    paymentByToken(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'collectpaymentbytoken', data)
            .map((response) => response.json());
    }
    updateCustomersOrdersStatus(data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'order/' + data.id, data)
            .map((response) => response.json());
    }
    getOneOrder(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'order/' + id)
            .map((response) => response.json());
    }
    /*getReviewRating(id) {
        return this.http.get(globalVariable.url4+'rating/restaurant-rating-review/'+id)
        .map((response: Response) => response.json());
    }*/
    add(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/', data)
            .map((response) => response.json());
    }
    update(data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/' + data._id, data)
            .map((response) => response.json());
    }
    getAll(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/' + id)
            .map((response) => response.json());
    }
    getOne(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/' + id)
            .map((response) => response.json());
    }
    deleteOne(id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/' + id)
            .map((response) => response.json());
    }
    checkRestroRating(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/checkrating', data)
            .map((response) => response.json());
    }
    getAllRestroRating() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/restroavg')
            .map((response) => response.json());
    }
    getICPRating(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/restaurant-rating/' + id)
            .map((response) => response.json());
    }
    getReviewRating(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/restaurant-rating-review/' + id)
            .map((response) => response.json());
    }
    getCustomerRating(id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'rating/customer-rating/' + id)
            .map((response) => response.json());
    }
    getStripeKey() {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'stripeconfig/')
            .map((response) => response.json());
    }
    verifyCard(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'verify-card/', data)
            .map((response) => response.json());
    }
    tokenGenerate(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'generate-card-token', data)
            .map((response) => response.json());
    }
    makePayment(data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["f" /* url4 */] + 'collect-payment/', data)
            .map((response) => response.json());
    }
};
MS4Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MS4Service);

//# sourceMappingURL=ms4.service.js.map

/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 398,
	"./af.js": 398,
	"./ar": 399,
	"./ar-dz": 400,
	"./ar-dz.js": 400,
	"./ar-kw": 401,
	"./ar-kw.js": 401,
	"./ar-ly": 402,
	"./ar-ly.js": 402,
	"./ar-ma": 403,
	"./ar-ma.js": 403,
	"./ar-sa": 404,
	"./ar-sa.js": 404,
	"./ar-tn": 405,
	"./ar-tn.js": 405,
	"./ar.js": 399,
	"./az": 406,
	"./az.js": 406,
	"./be": 407,
	"./be.js": 407,
	"./bg": 408,
	"./bg.js": 408,
	"./bm": 409,
	"./bm.js": 409,
	"./bn": 410,
	"./bn.js": 410,
	"./bo": 411,
	"./bo.js": 411,
	"./br": 412,
	"./br.js": 412,
	"./bs": 413,
	"./bs.js": 413,
	"./ca": 414,
	"./ca.js": 414,
	"./cs": 415,
	"./cs.js": 415,
	"./cv": 416,
	"./cv.js": 416,
	"./cy": 417,
	"./cy.js": 417,
	"./da": 418,
	"./da.js": 418,
	"./de": 419,
	"./de-at": 420,
	"./de-at.js": 420,
	"./de-ch": 421,
	"./de-ch.js": 421,
	"./de.js": 419,
	"./dv": 422,
	"./dv.js": 422,
	"./el": 423,
	"./el.js": 423,
	"./en-SG": 424,
	"./en-SG.js": 424,
	"./en-au": 425,
	"./en-au.js": 425,
	"./en-ca": 426,
	"./en-ca.js": 426,
	"./en-gb": 427,
	"./en-gb.js": 427,
	"./en-ie": 428,
	"./en-ie.js": 428,
	"./en-il": 429,
	"./en-il.js": 429,
	"./en-nz": 430,
	"./en-nz.js": 430,
	"./eo": 431,
	"./eo.js": 431,
	"./es": 432,
	"./es-do": 433,
	"./es-do.js": 433,
	"./es-us": 434,
	"./es-us.js": 434,
	"./es.js": 432,
	"./et": 435,
	"./et.js": 435,
	"./eu": 436,
	"./eu.js": 436,
	"./fa": 437,
	"./fa.js": 437,
	"./fi": 438,
	"./fi.js": 438,
	"./fo": 439,
	"./fo.js": 439,
	"./fr": 440,
	"./fr-ca": 441,
	"./fr-ca.js": 441,
	"./fr-ch": 442,
	"./fr-ch.js": 442,
	"./fr.js": 440,
	"./fy": 443,
	"./fy.js": 443,
	"./ga": 444,
	"./ga.js": 444,
	"./gd": 445,
	"./gd.js": 445,
	"./gl": 446,
	"./gl.js": 446,
	"./gom-latn": 447,
	"./gom-latn.js": 447,
	"./gu": 448,
	"./gu.js": 448,
	"./he": 449,
	"./he.js": 449,
	"./hi": 450,
	"./hi.js": 450,
	"./hr": 451,
	"./hr.js": 451,
	"./hu": 452,
	"./hu.js": 452,
	"./hy-am": 453,
	"./hy-am.js": 453,
	"./id": 454,
	"./id.js": 454,
	"./is": 455,
	"./is.js": 455,
	"./it": 456,
	"./it-ch": 457,
	"./it-ch.js": 457,
	"./it.js": 456,
	"./ja": 458,
	"./ja.js": 458,
	"./jv": 459,
	"./jv.js": 459,
	"./ka": 460,
	"./ka.js": 460,
	"./kk": 461,
	"./kk.js": 461,
	"./km": 462,
	"./km.js": 462,
	"./kn": 463,
	"./kn.js": 463,
	"./ko": 464,
	"./ko.js": 464,
	"./ku": 465,
	"./ku.js": 465,
	"./ky": 466,
	"./ky.js": 466,
	"./lb": 467,
	"./lb.js": 467,
	"./lo": 468,
	"./lo.js": 468,
	"./lt": 469,
	"./lt.js": 469,
	"./lv": 470,
	"./lv.js": 470,
	"./me": 471,
	"./me.js": 471,
	"./mi": 472,
	"./mi.js": 472,
	"./mk": 473,
	"./mk.js": 473,
	"./ml": 474,
	"./ml.js": 474,
	"./mn": 475,
	"./mn.js": 475,
	"./mr": 476,
	"./mr.js": 476,
	"./ms": 477,
	"./ms-my": 478,
	"./ms-my.js": 478,
	"./ms.js": 477,
	"./mt": 479,
	"./mt.js": 479,
	"./my": 480,
	"./my.js": 480,
	"./nb": 481,
	"./nb.js": 481,
	"./ne": 482,
	"./ne.js": 482,
	"./nl": 483,
	"./nl-be": 484,
	"./nl-be.js": 484,
	"./nl.js": 483,
	"./nn": 485,
	"./nn.js": 485,
	"./pa-in": 486,
	"./pa-in.js": 486,
	"./pl": 487,
	"./pl.js": 487,
	"./pt": 488,
	"./pt-br": 489,
	"./pt-br.js": 489,
	"./pt.js": 488,
	"./ro": 490,
	"./ro.js": 490,
	"./ru": 491,
	"./ru.js": 491,
	"./sd": 492,
	"./sd.js": 492,
	"./se": 493,
	"./se.js": 493,
	"./si": 494,
	"./si.js": 494,
	"./sk": 495,
	"./sk.js": 495,
	"./sl": 496,
	"./sl.js": 496,
	"./sq": 497,
	"./sq.js": 497,
	"./sr": 498,
	"./sr-cyrl": 499,
	"./sr-cyrl.js": 499,
	"./sr.js": 498,
	"./ss": 500,
	"./ss.js": 500,
	"./sv": 501,
	"./sv.js": 501,
	"./sw": 502,
	"./sw.js": 502,
	"./ta": 503,
	"./ta.js": 503,
	"./te": 504,
	"./te.js": 504,
	"./tet": 505,
	"./tet.js": 505,
	"./tg": 506,
	"./tg.js": 506,
	"./th": 507,
	"./th.js": 507,
	"./tl-ph": 508,
	"./tl-ph.js": 508,
	"./tlh": 509,
	"./tlh.js": 509,
	"./tr": 510,
	"./tr.js": 510,
	"./tzl": 511,
	"./tzl.js": 511,
	"./tzm": 512,
	"./tzm-latn": 513,
	"./tzm-latn.js": 513,
	"./tzm.js": 512,
	"./ug-cn": 514,
	"./ug-cn.js": 514,
	"./uk": 515,
	"./uk.js": 515,
	"./ur": 516,
	"./ur.js": 516,
	"./uz": 517,
	"./uz-latn": 518,
	"./uz-latn.js": 518,
	"./uz.js": 517,
	"./vi": 519,
	"./vi.js": 519,
	"./x-pseudo": 520,
	"./x-pseudo.js": 520,
	"./yo": 521,
	"./yo.js": 521,
	"./zh-cn": 522,
	"./zh-cn.js": 522,
	"./zh-hk": 523,
	"./zh-hk.js": 523,
	"./zh-tw": 524,
	"./zh-tw.js": 524
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 905;

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReferPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
* Generated class for the ReferPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let ReferPage = class ReferPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ReferPage');
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
    cartPage() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
    }
};
ReferPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-refer',template:/*ion-inline-start:"D:\OrderApp\src\pages\refer\refer.html"*/'<!--\n\n  Generated template for the ReferPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n	<ion-navbar>\n\n		<button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n		<ion-title>Refer</ion-title>\n\n        <ion-icon padding-top padding-horizontal margin-right class = "white" float-right end name="cart" ios="ios-cart" md="md-cart" (click)="cartPage()"></ion-icon>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content has-bouncing="true" padding>\n\n	<ion-row class="marginBottom5vh" text-center><h3><strong>Invite your friends to Mealday</strong></h3></ion-row>\n\n\n\n	<ion-row class="marginBottom5vh" text-center><h5>Get upto 25,000 points per Friend, plus 100 points per Invite</h5></ion-row>\n\n\n\n	<ion-row class="marginBottom5vh desc">\n\n		Get upto 25,000 points per Friend, plus 100 points per Invite. Get upto 25,000 points per Friend, plus 100 points per Invite. Get upto 25,000 points per Friend, plus 100 points per Invite.\n\n	</ion-row>\n\n\n\n	<ion-row padding-horizontal><ion-input type="text" placeholder = "Invite by email"></ion-input></ion-row>\n\n\n\n	<ion-row padding-horizontal><button  ion-button full>Send</button></ion-row>\n\n\n\n	<h5 text-center class="marginTop0">OR</h5>\n\n\n\n	<ion-row padding-horizontal><strong>Use this link with friends...</strong></ion-row>\n\n\n\n	<ion-row padding-horizontal><ion-input type="text" placeholder = "www.mealdaay.com/" disabled></ion-input></ion-row>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\refer\refer.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
], ReferPage);

//# sourceMappingURL=refer.js.map

/***/ }),

/***/ 914:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SnapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let SnapPage = class SnapPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SnapPage');
    }
    ionViewDidEnter() {
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }
};
SnapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-snap',template:/*ion-inline-start:"D:\OrderApp\src\pages\snap\snap.html"*/'<!--\n\n  Generated template for the SnapPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!-- <ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>snap</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header> -->\n\n\n\n\n\n<ion-content padding>\n\n\n\n	<ion-row>\n\n		\n\n    <ion-col text-center col-12>\n\n      <img src="../assets/imgs/sad.png">\n\n    </ion-col>\n\n		\n\n    <ion-col padding text-center col-12><strong>Connection Lost</strong></ion-col>\n\n	</ion-row>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\snap\snap.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
], SnapPage);

//# sourceMappingURL=snap.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgetpassword__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guestlogin__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__list_list__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_service_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_service_firebase_function_service__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/

/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
let LoginPage = class LoginPage {
    constructor(nav, loadingCtrl, toastCtrl, menuCtrl, lf, navCtrl, navParams, ms3Service, events, modalCtrl, fcmService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ms3Service = ms3Service;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.fcmService = fcmService;
        this.guestObj = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.popOrRoot = navParams.get('pop');
        this.loginForm = this.lf.group({
            username: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(this.emailp)]],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
        });
        /*this.menuCtrl.enable(false);*/
    }
    ionViewDidEnter() {
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
            x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
            y[0].setAttribute("style", "display:none");
        }
    }
    iconImage() {
        return 'assets/imgs/MealDaay-small.png';
    }
    login(type) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        let obj = {};
        if (type == 'customer') {
            obj['username'] = this.loginForm.value['username'];
            obj['password'] = this.loginForm.value['password'];
        }
        else {
            obj['username'] = this.guestObj['username'];
            obj['password'] = this.guestObj['password'];
        }
        this.ms3Service.getCustomer(obj).subscribe((data) => {
            loading.dismiss();
            if (data.error) {
                this.getToast(data.data);
            }
            else {
                localStorage.setItem('Mealdaay_customer', JSON.stringify(data.data));
                if (typeof this.popOrRoot != 'undefined' && this.popOrRoot != null) {
                    this.navCtrl.pop();
                }
                else {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__list_list__["a" /* ListPage */]);
                }
                let cartItem = localStorage.getItem('cartinfo');
                if (type == 'customer') {
                    this.getToast('Login Successfully');
                    this.events.publish('user:created', data.data, Date.now());
                }
                else {
                    this.getToast('Guest Login Successfully');
                }
                if (cartItem != null) {
                    if (JSON.parse(cartItem)['customerid'] != '' && JSON.parse(cartItem)['customerid'] != data.data['_id']) {
                        localStorage.removeItem('cartinfo');
                    }
                    this.events.publish('cart:item', 'abc', Date.now());
                }
                this.fcmService.getTokenForCustomer();
                /*this.menuCtrl.enable(true);*/
            }
        }, (err) => {
            loading.dismiss();
            this.getToast('Error Occured! Please check your Internet Connection');
        });
    }
    getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    }
    forgetPass() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__forgetpassword__["a" /* ForgetPasswordPage */]);
    }
    signup() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup__["a" /* SignupPage */]);
    }
    loginAsGuest() {
        let modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__guestlogin__["a" /* GuestModalPage */]);
        modal.onDidDismiss(data => {
            if (typeof data != 'undefined' && data != null) {
                this.guestObj = data;
                this.login('guest');
            }
        });
        modal.present();
        /*this.menuCtrl.enable(true);
        this.navCtrl.setRoot(ListPage);*/
    }
};
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"D:\OrderApp\src\pages\login\login.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Login</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content has-bouncing="true" padding text-center class="white backgroundImage" [ngStyle]="{\'background-image\': \'url(assets/imgs/login-bgImage.jpg)\'}">\n\n	<ion-avatar class="marginBottom4">\n\n        <img class="iconImage" [src]="iconImage()">\n\n    </ion-avatar>\n\n	<form role="form" [formGroup]="loginForm" (ngSubmit)="login(\'customer\')" >\n\n		<ion-list>\n\n			<ion-item>\n\n				<ion-input autocapitalize="off" formControlName="username" type="text" placeholder = "Email"></ion-input>\n\n			</ion-item>\n\n			<ion-item>\n\n				<ion-input autocapitalize="off" formControlName="password" type="password" placeholder = "Password"></ion-input>\n\n			</ion-item>\n\n		</ion-list>\n\n		<button ion-button class="themeRedBg" full [disabled]="!loginForm.valid">Sign In</button>\n\n\n\n		<ion-row>\n\n			<ion-col padding-top text-center col-12>\n\n				<span class="themeGreen" (click)="forgetPass()">\n\n					<strong>FORGOT PASSWORD?</strong>\n\n				</span>\n\n			</ion-col>\n\n		</ion-row>\n\n	</form>\n\n\n\n	<ion-row margin-top padding-top>\n\n		<ion-col col-12 text-center no-padding>\n\n			<button full no-margin ion-button (click)="signup()">Sign up</button>\n\n		</ion-col>\n\n		<hr>\n\n		<ion-col col-12 text-center no-padding>\n\n			<button full no-margin ion-button (click)="loginAsGuest()">Login as Guest</button>\n\n		</ion-col>\n\n	</ion-row>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\OrderApp\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7__app_service_index__["c" /* MS3Service */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_firebase_function_service__["a" /* FirebaseFunctionService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

},[558]);
//# sourceMappingURL=main.js.map