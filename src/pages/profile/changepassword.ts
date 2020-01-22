import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MS3Service, MS6Service } from '../../app/service/index';


@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	currentCustomer : any;
	loading : any;

	passwordForm: FormGroup;
	passwordp:any;
	oldmatch: any;
	MutchPassword: any;

	
    formErrors = {
        'password': ''
    };

    validationMessages = {
        'password': {
            'required': 'Password is required.'
        }
    };

	constructor(
		private lf: FormBuilder,
		public navCtrl: NavController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public ms3Service: MS3Service,
		public ms6Service: MS6Service
		){
		this.passwordForm = this.lf.group({
			_id: ['', Validators.required],
			oldpassword: ['', Validators.required],
			password: ['', Validators.required],
			confirmpassword: ['', Validators.required],
			matchpass: ['', Validators.required],
			oldmatch: ['', Validators.required]
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


    public onValueChanged(data?: any) {

        if (!this.passwordForm) { return; }
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

    
	
	restroImage(){
		/*if (img != null) {
			var imgPath = this.imageURL + img;
		}
		if (img == null) {*/
			var imgPath = "assets/imgs/bgImage.jpg";
		/*}*/
		return imgPath;
	}


    public oldpassword() {
    	if (this.currentCustomer.password == this.passwordForm.value.oldpassword) {
    		this.passwordForm.controls["oldmatch"].setValue(true);
    		this.oldmatch = false;
    	} else {
    		this.passwordForm.controls["oldmatch"].setValue("");
    		this.oldmatch = true;
    	}
    }

    public matchpassword(type) {
    	if (type == 'match') {
    		if (this.passwordForm.value.password != '') {
    			if (this.passwordForm.value.password == this.passwordForm.value.confirmpassword) {
    				this.passwordForm.controls["matchpass"].setValue(true);
    				this.MutchPassword = false;
    			} else {
    				this.passwordForm.controls["matchpass"].setValue("");
    				this.MutchPassword = true;
    			}
    		}
    	}else{
    		if (this.passwordForm.value.confirmpassword != '') {
    			if (this.passwordForm.value.password == this.passwordForm.value.confirmpassword) {
    				this.passwordForm.controls["matchpass"].setValue(true);
    				this.MutchPassword = false;
    			} else {
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

	ionViewDidLoad() {
  	}

    passwordUpdate(){
   		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

		let obj4Update = {};
		obj4Update['_id'] = this.passwordForm.value._id;
		obj4Update['newpassword'] = this.passwordForm.value.password;
		obj4Update['confirmpassword'] = this.passwordForm.value.confirmpassword;
		obj4Update['match'] = true;
		obj4Update['oldpassword'] = this.currentCustomer.password;

		this.ms3Service.UpdatePass(obj4Update).subscribe((data:any)=>{
			// if (!data.error) {
			// 	this.getCustomer(this.currentCustomer._id);
				this.getToast('Password Updated Successfully');
			// }else{
				this.loading.dismiss();
			// 	this.getToast('Unable to Update');
			// }
		},(err)=>{
			this.getToast('Unable to Update Password! Please check your Internet connection');
			this.loading.dismiss();
		})
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


    


	/*@Component({
	  selector: 'page-profile-update',
	  templateUrl: 'changepassword.html',
	})
	export class ChangePasswordPage {

		resetForm: FormGroup;

		currentCustomer : any;
		loading : any;

		constructor(
			private lf: FormBuilder,
			public navCtrl: NavController,
			public toastCtrl: ToastController,
			public loadingCtrl: LoadingController,
			public ms3Service: MS3Service
			){
			this.resetForm = this.lf.group({
				_id: ['', Validators.required],
	            oldpassword: ['', Validators.required], 
				newpassword: ['', Validators.required],
			});

			if (localStorage.getItem('Mealdaay_customer')) {
				this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));
				this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
			}
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

		ionViewDidLoad() {
	  	}

	    changePass(){
	   		this.loading = this.loadingCtrl.create({
	            content: 'Please wait...'
	        });
	        this.loading.present();

	    	if (this.currentCustomer.password == this.resetForm.value.oldpassword) {
	    		let obj4Update = {};
	    		obj4Update['_id'] = this.resetForm.value._id;
	    		obj4Update['password'] = this.resetForm.value.newpassword;

				this.ms3Service.updateCustomer(obj4Update).subscribe((data)=>{
					if (!data.error) {
						this.getCustomer(this.currentCustomer._id);
						this.getToast('Pssword Updated Successfully');
					}else{
						this.loading.dismiss();
						this.getToast('Unable to Update');
					}
				})
	    	}else{
	    		this.loading.dismiss();
	    		this.getToast('Wrong Old Password');
	    	}
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
	}*/

}
