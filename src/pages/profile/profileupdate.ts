import { Component } from '@angular/core';
import { Nav, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MS3Service } from '../../app/service/index';

@Component({
  selector: 'page-profile-update',
  templateUrl: 'profileupdate.html',
})
export class ProfileUpdatePage {

	currentCustomer : any;
	loading : any;
	currentDate : any;

	profileForm :FormGroup;

	constructor(
		public nav: Nav,
	    public navCtrl: NavController,
	    public toastCtrl: ToastController,
	    public navParams: NavParams,
	    public loadingCtrl: LoadingController,
	    public ms3Service: MS3Service,
	    private lf: FormBuilder
		) {

		let date = new Date();

		var dateP = this.addZero(date.getDate());
        var monthP = this.addZero(date.getMonth()+1);
        var yearP = date.getFullYear();

        this.currentDate = yearP+'-'+monthP+'-'+dateP;

		this.profileForm = this.lf.group({
	        _id: ['', Validators.required],
	        email: [{value :'',disabled: true}, Validators.required],
	        /*username: ['', Validators.required],*/
	        firstname: ['', Validators.required],
	        lastname: ['', Validators.required],
	        homephone: ['', Validators.required],
	        cellphone: ['', Validators.required],
	        gender: ['', Validators.required],
	        dob: ['', Validators.required]
	    });

		this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
		this.profileForm.patchValue(this.currentCustomer);
	}

	private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

	ionViewDidLoad() {}

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

	update(){
		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

		this.ms3Service.updateCustomer(this.profileForm.value).subscribe((data)=>{
			if (!data.error) {
				this.getCustomer(this.currentCustomer._id);
				this.getToast('Profile Updated Successfully');
			}else{
				this.getToast('Unable to Update');
			}
		},(err)=>{
			this.getToast('Unable to Update Profile! Please check your Internet connection');
		})

		/*console.log("this.profileForm.value");
		console.log(this.profileForm.value);*/


		/*localStorage.removeItem('abc');*/
	}

	getCustomer(id){
		this.ms3Service.getOneCustomer(id).subscribe((data)=>{
			if (!data.error) {
				localStorage.removeItem('Mealdaay_customer');
				localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
				this.loading.dismiss();
				this.navCtrl.pop();
			}
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

	customerImage(){
		/*if (typeof img != 'undefined' && img != null) {
			var imgPath = this.imageURL + img;
		}
		if (typeof img == 'undefined' || img == null) {*/
			var imgPath = "assets/imgs/profile.png";
		/*}*/
		return imgPath;
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
}
