import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { MS1Service, MS6Service } from '../../app/service/index';
import { FilterService } from '../../app/service/filter.service';

@Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {

    milesRange: any = 0;
    resType: any = 'all';
    currentCountry: any;
    countryId: any;
    cuisineType: boolean;
    cuisineArray = [];
    ratingType: any;
    countryList: any;
    cuisineList: any;
    cityList: any;
    country: any;
    city: any;
    countryAlertOpts = { title: 'Country', subTitle: 'Select your favorite country' };
    cityAlertOpts = { title: 'City', subTitle: 'Select your favorite city' };
    filterObj:any = {};
    oldfilterObj = {};

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ms6Service: MS6Service,
        public ms1Service: MS1Service,
        public loadingCtrl: LoadingController,
        public viewCtrl: ViewController,
        public filterService:FilterService
    ) {
        this.filterObj = this.filterService.getFilterObj();
        if(this.filterObj.country){
            this.country = this.filterObj.country;
        }
        this.oldfilterObj = navParams.get('filterObj');

        if (typeof this.oldfilterObj != 'undefined'){
            if(typeof this.oldfilterObj['restaurant'] != 'undefined') {
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
        } else {
            var lat = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lat'));
            var lng = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lng'));

            if (lat != null && lng != null) {
                this.filterObj['lat'] = lat;
                this.filterObj['lng'] = lng;
            }else{
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
                    } else {
                        loading.dismiss();
                        this.viewCtrl.dismiss(obj);
                    }
                } else {
                    loading.dismiss();
                    this.viewCtrl.dismiss(obj);
                }
            })
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
        console.log(this.countryList,'filter.ts 155');
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
            } else {
                this.cuisineType = false;
                let indx = this.cuisineArray.findIndex((mn) => mn == val._id)
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
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getCountry() {
        this.ms6Service.getCountrylist().subscribe(country => {
            this.countryList = country.message;
            console.log(this.countryList,'filter.ts 239');
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

}
