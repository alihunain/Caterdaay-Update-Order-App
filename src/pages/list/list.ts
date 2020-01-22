// import { BackgroundMode } from '@ionic-native/background-mode';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController, Keyboard, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { FilterPage } from './filter';
import { AppMinimize } from '@ionic-native/app-minimize';
import * as globalVariable from "../../app/global";
import {FilterService} from "../../app/service/filter.service";
import { MS1Service, MS4Service } from '../../app/service/index';
import { StatusBar } from '@ionic-native/status-bar';

declare var cordova:any;
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage implements OnInit {
    ngOnInit(): void {
        console.log("ng OnIT")
    }
    count = 0 ;
    kitchenList: any;
    kitchenListFilter: any; 
    rateArray: any = [1, 2, 3, 4, 5];
    /*items: any;*/
    filterObj: any;
    filterOutput: boolean = false;
    loading: any;
    imageURL: string = globalVariable.imageUrl;
    placeHolder:string = "Search By Restaurant/Chef";
    constructor(
      
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public ms1Service: MS1Service,
        public ms4Service: MS4Service,
        public keyboard: Keyboard,
        public platform:Platform,
        // private backgroundMode: BackgroundMode,
        private appMinimize: AppMinimize,
        private statusBar: StatusBar,
        public filterService : FilterService
    ) {
    //   this.platform.ready().then(()=>{
    //       this.statusBar.styleDefault();
    //       this.platform.registerBackButtonAction(()=>{

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
        this.statusBar.styleLightContent()
        // this.backgroundMode.enable();
        console.log('constructor',this.count);
     //   this.count = this.count ++ ;
        console.log(this.filterService.filterIsApplied);
        if(this.filterService.filterIsApplied ){
            this.filteringKitchen();
        }else{
            console.log('get all kitchen');
        this.getAllKitchen();
        }
    }

    clearText(event){
        this.keyboard.close();
    }
    ionViewDidLoad(){
        console.log('ionViewDidLoad',this.count);
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }
    ionViewWillEnter(){
        console.log(' ionViewWillEnter',this.count);
        let backButn = document.getElementsByClassName('back-button');
        if (typeof backButn != 'undefined' && backButn != null && backButn.length > 0) {
            for (var i = 0; i < backButn.length; i++) {
                backButn[i].setAttribute("style", "display:none");
            }
        }
    }
    ionViewDidEnter() {
        console.log('ionViewDidEnter',this.count);
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
                let kitchen : any;

                if (typeof this.navParams.get('country') != 'undefined' && this.navParams.get('country') != null) {
                    kitchen = data.message.filter((item) => {
                        return item['activestatus'] &&  (item['country'] == this.navParams.get('country'));
                    });
                }else{
                    if (typeof countryObj != 'undefined' && countryObj != null) {
                        kitchen = data.message.filter((item) => {
                            return item['activestatus'] &&  (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                            /*return item['activestatus'] &&  (item['country'] == 'pakistan');*/
                        });
                    }else{
                        kitchen = data.message.filter((item) => {
                            return item['activestatus'];
                        });
                    }
                }

                if (kitchen && kitchen.length > 0) {
                    this.kitchenList = kitchen;
                }else{
                    this.kitchenList = [];
                    this.kitchenListFilter = [];
                }


                if (typeof this.kitchenList != 'undefined' && this.kitchenList.length > 0) {
                    this.kitchenListFilter = [];
                    this.kitchenListFilter = this.kitchenList;
                    this.getRating();
                    this.checkOpenClose();
                }else{
                    this.loading.dismiss();
                }

                /*console.log("this.kitchenList");
                console.log(this.kitchenList);*/
            } else {
                this.loading.dismiss();
                this.kitchenList = [];
                this.kitchenListFilter = [];
                this.getToast('Unable to load data!')
            }
        },(error)=>{
            this.loading.dismiss();
            this.getToast('Unable to load data. Please check your Internet connection.');
        })
    }

    getRating() {
        this.ms4Service.getAllRestroRating().subscribe((data) => {

            if (!data.error) {
                if (data.message.length == 0) {
                    this.kitchenList.forEach((kitchen) => {
                        kitchen['rating'] = 0
                    });
                } else {
                    for (var i = 0; i < data.message.length; i++) {
                        let indx = this.kitchenList.findIndex((mn) => mn._id == data.message[i]['_id']);
                        if (indx > -1) {
                            this.kitchenList[indx]['rating'] = data.message[i]['averageQuantity'];
                        }
                    }
                }
            } else {
                this.kitchenList.forEach((kitchen) => {
                    kitchen['rating'] = 0
                });
            }

            setTimeout(()=>{
                this.kitchenListFilter = [];
                this.kitchenListFilter = this.kitchenList;

                this.filterKitchen();
                this.loading.dismiss();
            },1000)
        }, (err) => {
            this.loading.dismiss();
            if (this.kitchenList.length > 0) {
                this.kitchenList.forEach((kitchen) => {
                    kitchen['rating'] = 0
                });
            }

            setTimeout(()=>{
                this.kitchenListFilter = [];
                this.kitchenListFilter = this.kitchenList;

                this.filterKitchen();
                this.loading.dismiss();
            },1000)

        });
    }

    filterKitchen(){
        if(typeof this.filterObj != 'undefined' && typeof this.filterObj['rating'] != 'undefined' && this.filterObj['rating'] >= 0){
            this.kitchenList = this.kitchenList.filter((mn)=>{
                return mn['rating'] >= this.filterObj['rating']
            });

            this.kitchenListFilter = [];
            this.kitchenListFilter = this.kitchenList;
        }
    }

    doRefresh(refresher) {
        if(this.filterService.filterIsApplied){
        this.filter('else');
        }else{
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

    private getToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
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
                                } else {
                                    this.kitchenList[index].openclose = 'close';
                                }
                            }
                        } else {
                            this.kitchenList[index].openclose = 'close';
                        }
                    }
                }
            } else {
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
            })
        } else {
            this.kitchenList = this.kitchenListFilter;
        }
    }

    restaurantDetail(kitchen) {
        this.navCtrl.push(HomePage, {
            kitchen: kitchen
        });
        // move to restaurant detail page
    }
    filteringKitchen(){
       let filterObjFromService = this.filterService.getFilterObj();
       let countryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
       if(filterObjFromService['country'] == 'undefined'){
        filterObjFromService['country'] = countryObj['country'].toLowerCase();
       }
      let filterKitchens = this.filterService.getFilterKitchen()
      console.log(filterKitchens, ' Filter Kitchen'); 
       if (filterKitchens.length >   0 ) {

        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.filterOutput = true;
        this.filterObj = this.filterService.getFilterObj();

        let kitchen : any;

        if (typeof this.filterObj['country'] == 'undefined') {
            /*kitchen = data.filterResult.filter((item) => {
                return item['activestatus'] &&  (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
            });*/

            if (typeof countryObj != 'undefined' && countryObj != null) {
                kitchen = filterKitchens.filter((item) => {
                    return item['activestatus'] &&  (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                });
            }else{
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

        }else{
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

    } else {
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
        }else{
            if (typeof this.filterObj['country'] == 'undefined') {
                this.filterObj['country'] = countryObj['country'].toLowerCase();
            }
        }
        let modal = this.modalCtrl.create(FilterPage, {
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

                    let kitchen : any;

                    if (typeof this.filterObj['country'] == 'undefined') {
                        /*kitchen = data.filterResult.filter((item) => {
                            return item['activestatus'] &&  (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                        });*/

                        if (typeof countryObj != 'undefined' && countryObj != null) {
                            kitchen = data.filterResult.filter((item) => {
                                return item['activestatus'] &&  (item['country'] == countryObj.country || item['country'] == countryObj.country.toLowerCase());
                            });
                        }else{
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

                    }else{
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

                } else {
                    this.getToast('No Chef!');
                    this.kitchenList = [];
                    this.kitchenListFilter = [];
                    this.filterObj = data.filterObj;
                }

            } else {
                this.filterOutput = false;
                delete this.filterObj;
                if(this.filterService.filterIsApplied){
                    this.filteringKitchen();
                }else{
                this.getAllKitchen();
                }
            }
        });
        modal.present();
    }


    filter(type) {
        let filterObj:any = {}
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
        } else {
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
                        console.log("all kithcen by filter",this.kitchenList);
                        // this.filterService.setFilterObj(this.filterObj);
                      //  loading.dismiss();
                        //this.viewCtrl.dismiss(obj);
                    } else {
                    //    loading.dismiss();
                      //  this.viewCtrl.dismiss(obj);
                    }
                } else {
                //    loading.dismiss();
                 // //  this.viewCtrl.dismiss(obj);
                }
            },(error)=>{
                loading.dismiss();
                this.getToast('Unable to load data. Please check your Internet connection.');
            })
        }
    }



    restroImage(img) {
        let imgPath: any;
        if (typeof img == 'undefined' || img == null || img == '') {
            imgPath = "assets/imgs/res1.jpg";
        }else{
            imgPath = this.imageURL + img;
        }
        return imgPath;
    }

    cartPage() {
        this.navCtrl.push(CartPage);
    }
}
