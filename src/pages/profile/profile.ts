import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { FileUploader } from 'ng2-file-upload';

import { ChangePasswordPage } from './changepassword';
import { ProfileUpdatePage } from './profileupdate';

import { AddAddressPage } from './addaddress';

import { AddCardsPage } from './addcards';

import { CartPage } from '../cart/cart';

import * as globalVariable from "../../app/global";

import { MS3Service } from '../../app/service/index';

declare var cordova: any;

declare var google : any;


import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";



/**
* Generated class for the ProfilePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

	currentCustomer : any = {};
	addressForm : any;
	selectedSegment = 'basic';

	loading : any;

	oldProfilePic : any;

	lastImage: string = null;
	URL: any = globalVariable.url1 + "upload/";
	ImageURL: any = globalVariable.url1+ "uploads/";

	/*componentForm :any = {
		street_number: 'short_name',
		route: 'long_name',
		locality: 'long_name',
		administrative_area_level_1: 'short_name',
		country: 'long_name',
		postal_code: 'short_name'
	};*/
	
	public uploader: FileUploader = new FileUploader({
		url: this.URL,
		itemAlias: "file"
	});

	/*public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload'});*/

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public ms3Service: MS3Service,
		public actionSheetCtrl: ActionSheetController,
		private camera: Camera,
		private transfer: Transfer,
		private file: File,
		private filePath: FilePath,
		public platform: Platform
		) {
		this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
	}
	public presentActionSheet() {
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

	cardImage(cardtype){

		let imgPath : any;
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

	public takePicture(sourceType) {
		// Create options for the Camera Dialog
		var options = {
			quality: 100,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};

		// Get the data of an image
		this.camera.getPicture(options).then(
			imagePath => {
				// Special handling for Android library
				if (this.platform.is("android") && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
					this.filePath.resolveNativePath(imagePath).then(filePath => {

						let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
						let currentName = imagePath.substring(
							imagePath.lastIndexOf("/") + 1,
							imagePath.lastIndexOf("?")
						);
						this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
						delete this.currentCustomer['profilePic'];
					});
				} else {
					var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
					var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
					this.copyFileToLocalDir(correctPath,currentName,this.createFileName());
					delete this.currentCustomer['profilePic'];
				}
			},
			err => {
				this.currentCustomer['profilePic'] = this.oldProfilePic; 
				this.presentToast("Error while selecting image.");
			}
		);
	}
	// Create a new name for the image
	private createFileName() {
		var d = new Date(),
			n = d.getTime(),
			newFileName = n + ".jpg";
		return newFileName;
	}

	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
		this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
		.then(
			success => {
				this.lastImage = newFileName;
				this.uploadImage();
			},
			error => {
				this.currentCustomer['profilePic'] = this.oldProfilePic;
				this.presentToast("Error while storing file.");
			}
		);
	}

	public uploadImage() {

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

		const fileTransfer: TransferObject = this.transfer.create();

		// Use the FileTransfer to upload the image
		fileTransfer.upload(targetPath, url, options).then(
			data => {
				this.currentCustomer['profilePic'] = JSON.parse(data.response).filename;
				this.updateCustomer('profilePic');
				loading.dismiss();
				this.lastImage = null;
				this.presentToast("Image succesful uploaded.");
			},
			err => {
				this.currentCustomer['profilePic'] = this.oldProfilePic;
				loading.dismiss();
				this.presentToast("Error while uploading file.");
			}
		);
	}
	// Always get the accurate path to your apps folder
	public pathForImage(img) {
		if (img === null) {
			return "";
		} else {
			return cordova.file.dataDirectory + img;
		}
	}

	private presentToast(text) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: "top"
		});
		toast.present();
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
		this.getCustomer(this.currentCustomer._id);
	}

	getCustomer(id){
		this.ms3Service.getOneCustomer(id).subscribe((data)=>{
			if (!data.error) {
				this.currentCustomer = data.message;

				this.oldProfilePic = this.currentCustomer['profilePic'];

				localStorage.removeItem('Mealdaay_customer');
				localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
			}
		})
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

	makeDefault(index,type){
		if (type == 'address') {
			if (typeof this.currentCustomer.customeraddresses != 'undefined' && this.currentCustomer.customeraddresses.length > 0) {
				let adresses = this.currentCustomer.customeraddresses;
				for (var i = 0; i < adresses.length; i++) {
					if(i == index){
						adresses[i]['default'] = true;
					}else{
						adresses[i]['default'] = false;
					}
				}
				this.updateCustomer('AddressDefault');
			}
		}
		if (type == 'card') {
			if (typeof this.currentCustomer.cardinfo != 'undefined' && this.currentCustomer.cardinfo.length > 0) {
				let cards = this.currentCustomer.cardinfo;
				console.log(cards,'CUSTOMERS CARDS');
				for (let i = 0; i < cards.length; i++) {
					if(i == index){
						cards[i]['default'] = true;
					}else{
						cards[i]['default'] = false;
					}
				}
				this.updateCustomer('CardDefault');
			}
		}

	}

	





	restroImage(){
		/*if (img != null) {
			var imgPath = this.imageURL + img;
		}
		if (img == null) {*/
			var imgPath = "assets/imgs/bgImage.jpg";
		/*}*/
		return imgPath;
	}

	getCurrentLocation(){

		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();


		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((position) => {
				this.currentCustomer.lat = position.coords.latitude;
				this.currentCustomer.lng = position.coords.longitude;

				this.getgeo(this.currentCustomer.lat, this.currentCustomer.lng);
			},
			(error) => {
				this.loading.dismiss();
				this.getToast('Unable to detect Address')
			});
		}else {
			this.loading.dismiss();
			this.getToast("Your Phone don't support Geolocation");
		}
	}


	public getgeo(lat, long){
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, long);
		geocoder.geocode({ 'latLng': latlng }, (results, status) => {

			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {

					this.addressForm = {};
					/*var addresss =results[0].formatted_address; */
					
					let address : any;
					let houseNo : any;
					let area : any;
					let city : any;
					let country : any;
					let zipcode : any;

					for (var i = 0; i < results[0].address_components.length; i++) {
						var addressType = results[0].address_components[i].types[0];

						if (addressType == 'premise') {
							if (typeof houseNo == 'undefined') {
								houseNo = results[0].address_components[i]['long_name']
							}else{
								houseNo = houseNo + ' ' + results[0].address_components[i]['long_name']
							}
						}

						if (addressType == 'political' || addressType == 'sublocality') {
							if (typeof area == 'undefined') {
								area = results[0].address_components[i]['long_name']
							}else{
								area = area + ' ' + results[0].address_components[i]['long_name']
							}
						}

						if (addressType == 'locality') {
							if (typeof city == 'undefined') {
								this.addressForm['city'] = results[0].address_components[i]['long_name']
							}
						}

						if (addressType == 'country') {
							if (typeof country == 'undefined') {
								this.addressForm['country'] = results[0].address_components[i]['long_name']
							}
						}
	
						if (addressType == 'postal_code') {
							this.addressForm['zipcode'] = results[0].address_components[i]['long_name']
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

					setTimeout(()=>{

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
										this.navCtrl.push(AddAddressPage, {
											currentAddress : this.addressForm
										})
									}
								}
								]
							});
							prompt.present();
						/*}*/
					},2000);
				 }else{
					this.loading.dismiss();
					this.getToast('Unable to detect Address')
				}
			}else{
				this.loading.dismiss();
				this.getToast('Unable to detect Address')
			}
		});
	}

	goToChangePassword(){
		this.navCtrl.push(ChangePasswordPage);
	}

	goToUpdateProfile(){
		this.navCtrl.push(ProfileUpdatePage)
	}

	customerImage(img){
		let imgPath : any;
		if (typeof img != 'undefined' && img != null) {
			imgPath = this.ImageURL + img;
			/*imgPath = 'assets/imgs/profile.png';*/
		}
		if (typeof img == 'undefined' || img == null) {
			imgPath = "assets/imgs/profile.png";
		}
		return imgPath;
	}

	onSegmentChanged(){
		console.log("this.selectedSegment => ",this.selectedSegment);
	}

	addAddressPage(){
		this.navCtrl.push(AddAddressPage);
	}

	addCardsPage(){
		this.navCtrl.push(AddCardsPage);
	}

	cartPage(){
		this.navCtrl.push(CartPage);
	}

	editAddress(data,index){
		this.navCtrl.push(AddAddressPage,{
			editAddress : data, index : index
		})
	}

	editCard(data,index){
		this.navCtrl.push(AddCardsPage,{
			editCard : data, index : index
		})
	}

	spliceCard(index){
		this.currentCustomer.cardinfo.splice(index,1);
		this.updateCustomer('CardSplice');
	}

	spliceAddress(index){
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
					this.currentCustomer.customeraddresses.splice(index,1);
					this.updateCustomer('AddressSplice');
				}
			}
			]
		});
		prompt.present();
	}

	updateCustomer(type){
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();

		this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data)=>{
			loading.dismiss();
			if (!data.error) {
				this.getCustomer(this.currentCustomer._id);
				if (type == 'AddressSplice') {
					this.getToast('Address Detail Deleted!');
				}

				if (type == 'CardSplice') {
					this.getToast('Card Detail Deleted!');
				}
			}else{
				this.getToast('Unable to Update');
			}
		},(error)=>{
			loading.dismiss();
			this.getToast('Unable to Update');
		})
	}

	private getToast(msg){
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 2000,
			position:'top' //top,middle,bottom
		});
		toast.present();
	}

}
