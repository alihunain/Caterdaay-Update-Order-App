import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MS3Service } from '../../app/service/index';

import { Geolocation } from '@ionic-native/geolocation';

declare var google : any;

/**
* Generated class for the AddressPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-addaddress',
	templateUrl: 'addaddress.html',
})
export class AddAddressPage {

	addressForm :FormGroup;

	currentCustomer : any = {};
	currentAddress:any;
	dataParam:any;
	indexParam:any;
	loading:any;

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

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public ms3Service: MS3Service,
		public alertCtrl: AlertController,
		private geolocation: Geolocation,
		private lf: FormBuilder
		) {
		this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'))
		let patternq = /^[+]?\d+(\.\d+)?$/; 
		this.addressForm = this.lf.group({
            phoneno : ['',[Validators.required,Validators.pattern(patternq)]],
            landline  : ['',[Validators.pattern(patternq)]],
            address :  ['',Validators.required],
            landmark : [''],
            default : [],
            city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            zipcode : ['',Validators.required],
            country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            _id : ['',Validators.required],
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
			this.addressForm.patchValue(this.dataParam)
		}

		this.addressForm.controls['_id'].setValue(this.currentCustomer._id);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddressPage');
	}

	ionViewDidEnter(){
        let x = document.getElementsByClassName('cartBottomRow');
        if (typeof x !== 'undefined' && x.length > 0) {
        	x[0].setAttribute("style", "display:none");
        }
        let y = document.getElementsByClassName('cartBadge');
        if (typeof y !== 'undefined' && y.length > 0) {
        	y[0].setAttribute("style", "display:none");
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

	addAddress(){
		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

		if (typeof this.dataParam == 'undefined' || this.dataParam == null) {
			this.ms3Service.updateCustomerAddress(this.addressForm.value).subscribe((data)=>{
				this.loading.dismiss();
				if (data.error) {
					if (typeof data.message['isOperational'] != 'undefined') {
						this.getToast('Unable to add Address! Please try again.')
					}else{
						this.getToast(data.message);
					}
				}else{
					this.getToast('Address Detail Added!');
				}
				this.navCtrl.pop();
			},(err)=>{
				this.getToast('Unable to add Address! Please check your Internet connection');
			})
		}

		if (typeof this.indexParam != 'undefined' && this.indexParam != null) {
			this.currentCustomer.customeraddresses.splice(this.indexParam,1)
			this.updateCustomer();
		}
	}

	updateCustomer(){
		this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data)=>{
			if (!data.error) {
				this.ms3Service.updateCustomerAddress(this.addressForm.value).subscribe((data)=>{
					console.log("data => ", data);
					this.loading.dismiss();
					this.getToast('Address Detail Updated!');
					this.navCtrl.pop();
				})
			}else{
				this.getToast('Unable to Update');
			}
		},(err)=>{
			this.getToast('Unable to Update Address! Please check your Internet connection');
		})
	}

	initMap(){

		var lat = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lat'));
        var lng = JSON.parse(localStorage.getItem('Mealday_currentCustomer_lng'));

        if (lat != null && lng != null) {
            this.currentCustomer['lat'] = lat;
            this.currentCustomer['lng'] = lng;
            setTimeout(()=>{
            	this.mapRun();
            },500)
            	
        }else{
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition((position) => {
					this.currentCustomer['lat'] = position.coords.latitude;
					this.currentCustomer['lng'] = position.coords.longitude;
					setTimeout(()=>{
			        	this.mapRun();
			        },500)
				},
				(error) => {
					this.getToast('Unable to detect Address')
				});
			}else {
				this.getToast("Your Phone don't support Geolocation");
			}
        }

	}

	mapRun(){
		let _that = this;
		var input = (<HTMLInputElement>document.getElementById('pac-input'));
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: parseFloat(this.currentCustomer.lat), lng: parseFloat(this.currentCustomer.lng)},
			zoom: 15
		});
		var autocomplete = new google.maps.places.Autocomplete(input, {types: []});
		autocomplete.bindTo('bounds', map);
		var marker = new google.maps.Marker({
			map: map,
			anchorPoint: new google.maps.Point(0, -29),
			position: {lat: parseFloat(this.currentCustomer.lat), lng: parseFloat(this.currentCustomer.lng)},
			visible: true,
			draggable: true
		});

		google.maps.event.addListener(
			marker,
			'dragend',
			() => {
				var mlat = marker.position.lat();
				var mlng = marker.position.lng();
				this.getgeo(mlat, mlng);
			}
		);
		autocomplete.addListener('place_changed', () => {
			marker.setVisible(true);
			var place = autocomplete.getPlace();
			if (!place.geometry) {
				window.alert("No details available for input: '" + place.name + "'");
				return;
			} 
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(15);  
			}
			marker.setPosition(place.geometry.location);
			marker.setVisible(true);

			if (place.address_components) {
				let houseNo : any;
				let area : any;
				let city : any;
				let country : any;
				let zipcode : any;

				for (var i = 0; i < place.address_components.length; i++) {
					var addressType = place.address_components[i].types[0];

					if (addressType == 'premise' || addressType == 'route') {
						if (typeof houseNo == 'undefined') {
							houseNo = place.address_components[i]['long_name']
						}else{
							houseNo = houseNo + ' ' + place.address_components[i]['long_name']
						}
					}

					if (addressType == 'political' || addressType == 'sublocality' || addressType == 'sublocality_level_1') {
						if (typeof area == 'undefined') {
							area = place.address_components[i]['long_name']
						}else{
							area = area + ' ' + place.address_components[i]['long_name']
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

					setTimeout(()=>{
					if(place.name != place.vicinity){
						var inputValues = place.name + " " + city + " , " + country;
					}else{
						var inputValues = place.name + "  " + city + " , " + country;
					}
					console.log(inputValues,'949');
					_that.addressForm.controls['address'].setValue(inputValues);
					_that.addressForm.controls['city'].setValue(city);
					_that.addressForm.controls['country'].setValue(country);
					_that.addressForm.controls['zipcode'].setValue(zipcode);
					console.log(houseNo,area,'939');
				},1000)
			}
		});
	}

	public getgeo(lat, long){
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, long);
		let _that = this;
		geocoder.geocode({ 'latLng': latlng }, (results, status) => {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					let houseNo : any;
					let area : any;
					let city : any;
					let country : any;
					let zipcode : any;

					for (var i = 0; i < results[0].address_components.length; i++) {
						var addressType = results[0].address_components[i].types[0];

						if (addressType == 'premise' || addressType == 'route') {
							if (typeof houseNo == 'undefined') {
								houseNo = results[0].address_components[i]['long_name']
							}else{
								houseNo = houseNo + ' ' + results[0].address_components[i]['long_name']
							}
						}

						if (addressType == 'political' || addressType == 'sublocality' || addressType == 'sublocality_level_1') {
							if (typeof area == 'undefined') {
								area = results[0].address_components[i]['long_name']
							}else{
								area = area + ' ' + results[0].address_components[i]['long_name']
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

					setTimeout(()=>{

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
					},1000)
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
			} else {
			}
		});
	}


	/*getCurrentLocation(){
		let prompt = this.alertCtrl.create({
            title: 'Auto Detect?',
            message: "We will automatically detect your current location",
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
                	console.log("resp");
                	this.geolocation.getCurrentPosition().then((resp) => {
                		console.log("resp");
                		console.log(resp);
					}).catch((error) => {
					  console.log('Error getting location', error);
					});

                }
            }
            ]
        });
        prompt.present();
	}*/
}
