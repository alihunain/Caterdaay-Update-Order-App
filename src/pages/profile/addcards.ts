import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MS3Service, MS4Service } from '../../app/service/index';

/**
* Generated class for the AddressPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-addcards',
	templateUrl: 'addcards.html',
})
export class AddCardsPage {

	cardForm :FormGroup;
	/*cardType = 'master';*/

	editCard : any;
	loading : any;
	editCardIndex : any;

	currentCustomer : any = {};

	year = [];
	month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	currentYr : any;


    formErrors = {
        'cardnumber': '',
        'cvv': ''    
    };
    
    validationMessages = {
        'cardnumber': {
            'required':      'Card Number is required.',
            'minlength':     'Card Number must be 16 character long.',
            'maxlength':     'Card Number must be 16 character long.',
            'pattern'  :    'Card Number should contain numeric in pattern xxxx-xxxx-xxxx-xxxx'
        },
        'cvv': {
            'required':      'CVV is required.',
            'pattern'  :    'CVV should contain numeric only'
        }
    };
	generatingToken: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public ms3Service: MS3Service,
		public ms4Service: MS4Service,
		private lf: FormBuilder
		) {

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
			fname : ['',Validators.required],
            lname:['',Validators.required],
            cardnumber: ['',[Validators.required, Validators.minLength(16),Validators.maxLength(19), Validators.pattern('[0-9]{4}[ .\-]{0,1}[0-9]{4}[ .\-]{0,1}[0-9]{4}[ .\-]{0,1}[0-9]{4}')]],
            cvv: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(3), Validators.pattern('[0-9]{3}')]],
            expirymonth: ['',Validators.required],
			expiryyear : ['',Validators.required],
			zip:['',[Validators.required,Validators.maxLength(9)]],
			address:['',[Validators.required,Validators.maxLength(29)]],
			city:['',[Validators.maxLength(29)]],
			state:['',[Validators.maxLength(29)]]
	    });

	    /*this.cardForm.controls['cardtype'].setValue(this.cardType);*/

	    if (typeof this.editCardIndex != 'undefined') {
	    	this.cardForm.patchValue(this.editCard);
	    	/*this.cardType = this.cardForm.value['cardtype'];*/

	    	let num = this.format(this.cardForm.value['cardnumber'], [4,4,4,4], "-");

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

	cardImage(){
		let imgPath : any;

		let cardType = this.cardForm.controls['cardtype'].value;

		imgPath = 'assets/imgs/' + cardType + '.png';
		
		return imgPath;
	}

	addSpace(event){

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

		if ((event.target.value[0] == 6 && event.target.value[1] == 0) || (event.target.value[0] == 6 && event.target.value[1] == 5 && event.target.value[2] == 2 && event.target.value[3] == 1) ) {
			this.cardForm.controls["cardtype"].setValue('rupay');
		}

		if ((event.target.value[0] == 6 && event.target.value[1] == 4) || (event.target.value[0] == 6 && event.target.value[1] == 5) || (event.target.value[0] == 6 && event.target.value[1] == 0 && event.target.value[2] == 1 && event.target.value[3] == 1) ) {
			this.cardForm.controls["cardtype"].setValue('discover');
		}

		if ((event.target.value[0] == 5 && event.target.value[1] == 0 && event.target.value[2] == 1 && event.target.value[3] == 9) || (event.target.value[0] == 4 && event.target.value[1] == 1 && event.target.value[2] == 7 && event.target.value[3] == 5) || (event.target.value[0] == 4 && event.target.value[1] == 5 && event.target.value[2] == 7 && event.target.value[3] == 1) ) {
			this.cardForm.controls["cardtype"].setValue('dankort');
		}

		if (event.target.value.length > 0) {
			let foo = event.target.value.split('-');
			let foo2 = '';
			if (foo.length > 0) {
				for (var i = 0; i < foo.length; i++) {
					foo2 += foo[i];
				}
			}else{
				foo2 = event.target.value;
			}
	        event.target.value = this.format(foo2, [4,4,4,4], "-");
		}
	}

	format(input, format, sep) {
	    var output = "";
	    var idx = 0;
	    for (var i = 0; i < format.length && idx < input.length; i++) {
	        output += input.substr(idx, format[i]);
	        if (idx + format[i] < input.length) output += sep;
	        idx += format[i];
	    }

	    output += input.substr(idx);

	    return output;
	}

	private onValueChanged(data?: any) {
        if (!this.cardForm){
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



	yearArray(){
		let yr = this.currentYr;
		for (var i = yr; i < this.currentYr+15; i++) {
			this.year.push(i);
		}
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
	addCard(){
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
		obj['fname']= this.cardForm.value.fname;
		obj['lname']= this.cardForm.value.lname
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
        this.ms4Service.verifyCard(obj).subscribe((data)=>{
		//	this.generatingToken = false;
            if (!data.error) {
                let dataObj = data.message['txn'];

                if (typeof dataObj['errorCode'] != 'undefined') {
					this.generatingToken = false;
                    this.getToast(dataObj['errorName']);
                }else if(typeof dataObj['ssl_result_message'] != 'undefined' && (dataObj['ssl_result_message'] == 'APPROVED' || dataObj['ssl_result_message'] == 'APPROVAL')){
                    let index = this.currentCustomer['cardinfo'].findIndex((mn)=>{

						return mn.cardnumber.slice(-4) == abc.slice(-4) 

					});
			        if (index == -1) {
	                    this.cardForm.value["cardtype"] = dataObj['ssl_card_short_description'].toLowerCase();
						let obj2 = this.cardForm.value;
						obj2['cardnumber'] = foo2;
						this.ms4Service.tokenGenerate(obj).subscribe((res)=>{
							this.generatingToken = false;
							let tokenObj = res.message.txn;
						
							if (typeof this.currentCustomer['cardinfo'] == 'undefined') {
								this.currentCustomer['cardinfo'] = [];
								this.currentCustomer['cardinfo'].push({token:tokenObj.ssl_token.toString(),cardtype:tokenObj.ssl_card_short_description.toString(),cardnumber:tokenObj.ssl_card_number.toString()});
							}else{
								this.currentCustomer['cardinfo'].push({token:tokenObj.ssl_token.toString(),cardtype:tokenObj.ssl_card_short_description.toString(),cardnumber:tokenObj.ssl_card_number.toString()});
							}
							loading.dismiss();
							this.updateCustomer();
						},(err)=>{
							loading.dismiss();
							this.generatingToken = false;
							this.getToast('Please try later ');
						});
				
						
			        }else{
						loading.dismiss();
						this.generatingToken = false;
				    	this.getToast('Card with this Card Number already exist');
			        }
                }else{
					loading.dismiss();
					this.generatingToken = false;
                    this.getToast('Please try with another card');
                }
            }
        },(err)=>{
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
	getCurrentCustomer(type){
		this.ms3Service.getOneCustomer(this.currentCustomer['_id']).subscribe((data)=>{
			if (!data.error) {
				this.currentCustomer = data.message;
		
				localStorage.removeItem('Mealdaay_customer');
				localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
			}
		})
	}

	updateCustomer(){
		this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data)=>{
			if (!data.error) {
				this.getCurrentCustomer('cardadd');
				this.getToast('Card Detail Added');
				this.navCtrl.pop();
				this.cardForm.reset();
				/*this.cardForm.controls['cardtype'].setValue('master');*/
			}else{
				this.getToast('Unable to Add Card');
			}
		},(err)=>{
			this.getCurrentCustomer('cardadd');
			this.getToast('Unable to Add Card');
		});
	}
	choose(type){
		console.log(this.cardForm.value);
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
