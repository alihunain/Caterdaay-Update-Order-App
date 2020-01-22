import { Component, AfterContentInit, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, Events, ModalController } from 'ionic-angular';
import { CartPage } from '../cart/cart';


import { ThankPage } from './thankupage';

import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MS1Service, MS3Service, MS4Service } from '../../app/service/index';
import moment, { now } from 'moment';
import { AddOn } from './add-on';
declare var google : any;

/*import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';*/


/**
* Generated class for the CartPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-checkout',
	templateUrl: 'checkout.html',
})
export class CheckoutPage implements AfterContentInit {

	kitchen:any ;
	datechecker = true;
	caterdaaycharge:any;
	weeklyPackages: boolean = false;
	weekendPackages: boolean = false;
	delvierySlots: any= [];
	deliverySlotsForWeekly: any = [] ;
	deliverySlotSelected:any;
	delvierySlotsWeekly: any = [] ;
	delvierySlotsWeekSeleted: any ;
	weekendTime: any;
	deliveryCharges = 0 ; 
	deliveryWeeklyError: boolean;
	deliveryWeekendErrorFirst: boolean;
	deliveryWeekendErrorSecond: boolean;
	weeklySecondTime: moment.Moment;
	weeklyFirstTime: moment.Moment;
	deliveryRateDetacted: boolean  = true;
	addOnTotal: number = 0 ;
	TaxPrices =  0 ; 
	dayliyItems: boolean = false;
	ngAfterContentInit(): void {
		this.deliveryType= 'home';
		this.onChangeDeliveryTye();
		// this.orderdetails['ordertype'] = "";
		// this.orderdetails['fulladdress'] = this.orderAddress;
		// this.orderdetails['paymenttype'] = 'Card';
		// this.orderdetails['subtotal'] = Number(this.orderdetails['subtotal']).toFixed(2);
		// this.orderdetails['tax'] = Number(this.TaxPrices).toFixed(2);
		// this.orderdetails['timezone']= 'America/Los_Angeles';
		// this.orderdetails['discount'] = "0";
		// this.orderdetails['total'] = Number(this.orderdetails['total']).toFixed(2);
	}
	deliveryRate :any;
	orderdetails : any;
	currentCustomer : any;


	orderAddress : any;
	orderPayment : any;
	orderCardInfo : any;
	
	addressForm : FormGroup;
	driverInst : FormGroup;
	formGroup: FormGroup;
	address = '0';
	chooseCard = 'new';
	deliveryType='pick';
	paymentType = 'card';

	loading:any;
	orderLaterAllowed:any;
	/*addresspart:any;
	userinfo: any = {lat: "", lng: ""};
	componentForm :any = {
		street_number: 'short_name',
		route: 'long_name',
		locality: 'long_name',
		administrative_area_level_1: 'short_name',
		country: 'long_name',
		postal_code: 'short_name'
    };*/


    cardForm :FormGroup;
    cardCvvForm :FormGroup;
	/*cardType = 'master';*/
	year = [];
	month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	currentYr : any;
	generatingToken = false;
	SubTotal = 0 ;
	orderTimeSelect : any;
	currentDate : any;
	currentDatePlus60 : any;
	orderTime : any = {};
	showLater : boolean = false;
	canProceed : boolean;
	event = {laterDay : '',laterTime : ''};
	resStatus: any;
	minTime: any;
	/*nowTiming: any;
	totalDistance: any;
	currency: any;*/

	proOrderBefore : number;
	proOrderTill : number;

	cardSelected : any;
	resCountry : any;


    formErrors = {
        'cardnumber': '',
		'cvv': '',
		'state':'',
		'city':'',
		'zip':'',
		'address':''

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
		},
		'state':{
			'required':      'State Name is required.',
            'maxlength':     'State Name must be less than 30 character ',
		},
		'city':{
			'required':      'City Name is required.',
            'maxlength':     'City Name must be less than 30 character ',
		},
		'zip':{
			'required':      'Zip is required.',
            'maxlength':     'Zip  must be less than 9 character ',
		},
		'address':{
			'required':      'Addresss is required.',
            'maxlength':     'Address must be less than 30 character ',
		}
    };


    addressLat : any;
    addressLng : any;

	constructor(
		public nav: Nav,
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public ms1Service: MS1Service,
		public ms3Service: MS3Service,
		public ms4Service: MS4Service,
		public events: Events,
		private lf: FormBuilder,
		public modalCtrl: ModalController,
		public ele: ElementRef
		) {
		/*this.ms4Service.getStripeKey().subscribe((data)=>{
			if (!data.error && data.message.length > 0) {
				(<any>window).Stripe.setPublishableKey(data.message[0].keypublishable);
			}
		},(err)=>{
			this.getToast('Online Payment could not be processed now! Please Order for CASH');
		})*/

		this.orderdetails = navParams.get('orderdetails');
		// this.orderdetails.total = this.orderdetails.toFixed(2)
		
		localStorage.setItem('deliveryMethod','pick');
		if(this.orderdetails.subtotal){
		this.SubTotal = parseFloat(this.orderdetails.subtotal) ;
		}
		if(this.orderdetails.addOnTotal){
		this.addOnTotal = parseFloat(this.orderdetails.addOnTotal) ;
		}
		this.deliveryRate= navParams.get('deliveryRate');
		console.log(this.orderdetails,'134',this.orderdetails.package.length);
	//	this.orderdetails.total = (parseFloat(this.addOnTotal.toString()) + parseFloat(this.SubTotal.toString())).toFixed(2);
		// if(this.orderdetails.tax){
	
		// this.TaxPrices = (parseFloat(this.orderdetails.total) / 100 ) * parseFloat(this.orderdetails.tax) ;
		// }
	
		// console.log()
		// this.orderdetails.total  =  (parseFloat(this.orderdetails.total) + this.TaxPrices + parseFloat(this.orderdetails.deliveryCharges)).toFixed(2) ; 
		// this.orderdetails.total  = this.orderdetails.total.toFixed(2);
		console.log(this.orderdetails.total)
		console.log("Total ",this.orderdetails.total , "TAX",this.TaxPrices,"ADDON",this.addOnTotal)
		if(this.orderdetails.items.length > 0){
			this.dayliyItems = true ; 
		}
		for(let i = 0 ; i < this.orderdetails.package.length ; i++){
			console.log(this.orderdetails.package[i].type,'TYpe');
			if(this.orderdetails.package[i].type == "fixed"){
				this.weeklyPackages = true ;
			}else if (this.orderdetails.package[i].type == "flexible"){
				this.weekendPackages = true ;
			}
		}
		if (this.orderdetails.total == 0) {
			this.orderPayment = 'cash';
		}

		let kitchen = navParams.get('kitchen');
			this.kitchen = kitchen ;
			//  for(let i = 0 ; i < this.kitchen.deliverySlots.length ; i++){
			// 	if(this.kitchen.deliverySlots[i].state){ 
			// 	this.delvierySlots.push(this.kitchen.deliverySlots[i]);
			// 	}
			//  }
			//  for(let j= 0 ; j < this.kitchen.deliverySlotsForWeekly.length ; j++){
			// 	if(this.kitchen.deliverySlotsForWeekly[j].state){ 
			// 		this.delvierySlotsWeekly.push(this.kitchen.deliverySlotsForWeekly[j]);
			// 		}
			//  }
		console.log(this.kitchen,'Kitchen')
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
 			phoneno : ['',[Validators.required,Validators.pattern(patternq)]],
            // landline  : ['',[Validators.pattern(patternq)]],
            address :  ['',Validators.required],
            // landmark : [''],
            city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            zipcode : ['',Validators.required],
            _id : ['',Validators.required]
		 });
		 this.driverInst = this.lf.group({
		   inst :  [''],
		});

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

 		this.cardCvvForm = this.lf.group({
            cvv: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(3), Validators.pattern('[0-9]{3}')]]
	    });

		 let currentDate = new Date();
	
		 let min =	 this.kitchen.preorderforlaterafterdays;
		 let max = 	 this.kitchen.preorderforlatertodays;
	
		 let currentDateUpdate = moment(currentDate, "DD-MM-YYYY").add((Number(min)+1), 'days').format("DD-MM-YYYY");
		 let endDateUpdate = moment(currentDate, "DD-MM-YYYY").add((Number(max)), 'days').format("DD-MM-YYYY");
		 console.log(currentDateUpdate, " this is min date");
		 console.log(endDateUpdate, " this is max date");
		 currentDateUpdate = new Date(currentDateUpdate).toString();
		 endDateUpdate = new Date(endDateUpdate).toString();
		 console.log(currentDateUpdate, " this is min date");
		 console.log(endDateUpdate, " this is max date");
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
				let indx = this.currentCustomer['customeraddresses'].findIndex((mn)=>mn.default == true)
				if (indx > -1) {
					this.address = indx;
				}
			}
			if (typeof this.currentCustomer['cardinfo'] != 'undefined' && this.currentCustomer['cardinfo'].length > 0) {
				let indx = this.currentCustomer['cardinfo'].findIndex((mn)=>mn.default == true)
				if (indx > -1) {
					this.chooseCard = indx;
				}
			}
			this.addressForm.controls['_id'].setValue(this.currentCustomer._id);
		}

	    this.firstCall();
	}
	public CheckingTimeValidationForFirst(init){
       let FirstStartTime :any= moment(this.convertTime12to24(this.delvierySlotsWeekSeleted.FirstStartTime),'hh:mm');
       let FirstEndTime :any= moment(this.convertTime12to24(this.delvierySlotsWeekSeleted.FirstEndTime),'hh:mm');
       let ActualTime :any  = moment(this.convertTime12to24(init.value),'hh:mm');
	   console.log("First START TIME ", FirstStartTime , "FIrst END TIME ", ActualTime,FirstStartTime == ActualTime );
        if( (FirstStartTime.isBefore(ActualTime)  || FirstStartTime._i == ActualTime._i) &&( ActualTime.isBefore(FirstEndTime) || ActualTime._i == FirstEndTime._i)  )
       {
		   console.log("False weekly First");
           this.deliveryWeekendErrorFirst = false;
     
           this.weeklyFirstTime = ActualTime._i ;
       }else{
		console.log("True weekly First");
        this.deliveryWeekendErrorFirst = true;
       }
       
	}
	public CheckingTimeValidationForSecond(init){
		console.log("Checking Time Validation",this.delvierySlotsWeekSeleted);
		console.log('Delivery Slot WeekSelected',moment(this.convertTime12to24(this.delvierySlotsWeekSeleted.SecondStartTime),'hh:mm'));
		console.log( moment(this.convertTime12to24(init.value),'hh:mm'),'Current TIME')
		let SecondStartTime :any = moment(this.convertTime12to24(this.delvierySlotsWeekSeleted.SecondStartTime),'hh:mm');
		let SecondEndTime:any = moment(this.convertTime12to24(this.delvierySlotsWeekSeleted.SecondEndTime),'hh:mm');
		let ActualTime:any  = moment(this.convertTime12to24(init.value),'hh:mm');

		if( (SecondStartTime.isBefore(ActualTime) || SecondStartTime._i == ActualTime._i) && (ActualTime.isBefore(SecondEndTime) || ActualTime._i == SecondEndTime._i) )  
       {
		   this.weeklySecondTime = ActualTime._i ;
           this.deliveryWeekendErrorSecond = false;
		   console.log("Here", this.weeklySecondTime );
       }else{
		console.log("true");
        this.deliveryWeekendErrorSecond = true;
       }
    }
	public changeMinMaxOfWeekend(deliverySlot,init){
		console.log(deliverySlot,init,'deliverySlotSelected') ;
    let StartTime:any = moment(this.convertTime12to24(this.deliverySlotSelected.StartTime),'hh:mm ');
    let EndTime:any = moment(this.convertTime12to24(this.deliverySlotSelected.EndTime),'hh:mm');
    let ActuallTime :any = moment(this.convertTime12to24(init.value),'hh:mm');
		console.log(StartTime.isBefore(ActuallTime) && ActuallTime.isBefore(EndTime));
		console.log(StartTime,ActuallTime);
		
        if( (StartTime.isBefore(ActuallTime) || StartTime._i == ActuallTime._i ||  StartTime == ActuallTime || this.deliverySlotSelected.StartTime == init.value ) && (ActuallTime.isBefore(EndTime) || ActuallTime._i == EndTime._i ))
       {
           this.deliveryWeeklyError = false;
		   this.weekendTime = ActuallTime._i;
		   console.log("this.weekendTime",this.weekendTime);
       }else{
        this.deliveryWeeklyError = true;
       }
	}
	public convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
      
        let [hours, minutes] = time.split(':');
      
        if (hours === '12') {
          hours = '00';
        }
      
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
      
        return `${hours}:${minutes}`;
      }
	public getMyDay(number){
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
	tConvert (time) {
        if(time == ''){
         return ''
        }
       // Check correct time format and split into components
       time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
     
       if (time.length > 1) { // If time format correct
         time = time.slice (1);  // Remove full string match value
         time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
         time[0] = +time[0] % 12 || 12; // Adjust hours
       }
       return time.join (''); // return adjusted time or original string
     }
	onChangeDeliveryTye(){
		console.log(this.orderdetails,this.deliveryRate);

		if(this.deliveryType == 'home'){
			if(!this.deliverySlotSelected && this.weekendPackages && this.delvierySlots.length > 0){
				this.deliverySlotSelected  = this.delvierySlots[0];
			}
			if(!this.deliverySlotSelected && this.weeklyPackages && this.delvierySlotsWeekly.length > 0){
				this.delvierySlotsWeekSeleted = this.delvierySlotsWeekly[0];
			}
		}
		if(this.deliveryType == 'pick' && this.deliveryRateDetacted){
			this.deliveryRateDetacted = false;
			this.orderdetails.total  = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2) ;
		}else if (this.deliveryType == 'home' && !this.deliveryRateDetacted){
			this.deliveryRateDetacted = true;
			// this.orderdetails.total = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
		}else if (this.deliveryType == 'home' && this.deliveryRateDetacted){
			this.orderdetails.total = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2);
		}

		let weekendExist = false; 
		let weeklyExist = false ;
		// this.orderdetails['deliveryCharges'] = 0 ;
		let deliveryCharges = this.orderdetails['DeliveryCharges'] ;
		console.log(this.orderdetails,'135','OrderDetails');

		for(let i =0 ; i < this.orderdetails.package.length ; i++){
			if(this.orderdetails.package[i].type== "flexible"){
				deliveryCharges += this.deliveryRate.weekend ;
			}else{
				console.log("this.delvierySlotsWeekSeleted",this.delvierySlotsWeekSeleted);
				if(this.delvierySlotsWeekSeleted){
				if(this.delvierySlotsWeekSeleted.dtype == 'Twice'){
					deliveryCharges += (this.deliveryRate.weekly * 2) ;
				}
				else{
					deliveryCharges +=  this.deliveryRate.weekly  ;
				}
			}
			}
		}
		if(this.orderdetails.items.length > 0){
			deliveryCharges += this.deliveryRate.itemcharge;
		}
		console.log(this.deliveryRate,"DELIVERY RATE");
		this.orderdetails.deliveryCharges  = deliveryCharges;
		this.orderdetails.total = 0 ;
		if(this.deliveryType == 'pick'){
			this.deliveryCharges = 0 ;
			this.orderdetails.deliveryCharges = 0 ;
			this.orderdetails.total = (parseFloat(this.addOnTotal.toString()) + parseFloat(this.SubTotal.toString()));
			this.TaxPrices = (parseFloat(this.orderdetails.total) / 100 ) * parseFloat(this.orderdetails.tax) ;
			this.orderdetails.total  =  (this.orderdetails.total + this.TaxPrices +  parseFloat(this.orderdetails.deliveryCharges)).toFixed(2) ; 
			localStorage.setItem('deliveryMethod','pick');
			// this.orderdetails.total  = (parseFloat(this.orderdetails.total) - parseFloat(this.orderdetails.deliveryCharges)).toFixed(2) ;
		}else{
			localStorage.setItem('deliveryMethod','home');
			this.deliveryCharges = deliveryCharges;

			this.orderdetails.total = (parseFloat(this.addOnTotal.toString()) + parseFloat(this.SubTotal.toString())+ parseFloat(this.orderdetails.deliveryCharges));
			this.TaxPrices = (parseFloat(this.orderdetails.total) / 100 ) * parseFloat(this.orderdetails.tax) ;
			this.orderdetails.total  =  (this.orderdetails.total + this.TaxPrices ).toFixed(2) ; 
		}


	





	}
	addSpace(event){
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
		console.log(this.cardForm);
        if (!this.cardForm){
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

	cardImage(cardtype){

		let imgPath : any;
		if (cardtype.toLowerCase() == 'visa' ) {
			imgPath = 'assets/imgs/visa.png';
		}

		if (cardtype.toLowerCase()  == 'maestro' ) {
			imgPath = "assets/imgs/maestro.png";
		}
		
		if (cardtype.toLowerCase()  == 'mastercard') {
			imgPath = "assets/imgs/mastercard.png";
		}
		
		if (cardtype.toLowerCase()  == 'discover') {
			imgPath = "assets/imgs/discover.png";
		}
		
		if (cardtype.toLowerCase()  == 'credit') {
			imgPath = "assets/imgs/credit.png";
		}
		
		if (cardtype.toLowerCase()  == 'dankort') {
			imgPath = "assets/imgs/dankort.png";
		}

		if (cardtype.toLowerCase()  == 'diners') {
			imgPath = "assets/imgs/diners.png";
		}
		
		return imgPath;
	}

	private onChanged(data?: any) {
		console.log(this.cardForm);
        if (!this.cardCvvForm){
            return;
        }
        const form = this.cardCvvForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				console.log(field,'ERROR FIELD')
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';          
                }
            }
        }
    }

	firstCall(){
		let min =	 this.kitchen.preorderforlaterafterdays;
		let max = 	 this.kitchen.preorderforlatertodays;
		console.log(min + " " + max , "   609 min and max date");  
		var time = new Date();
		time.setDate(time.getDate() + Number(min+1));
		var date = this.addZero(time.getDate());
        var month = this.addZero(time.getMonth()+1);
        var year = time.getFullYear();
		this.currentDate = year+'-'+month+'-'+date;

		var time2 = new Date();
		time2.setDate(time.getDate() + Number(max));
		var date60 = this.addZero(time2.getDate());
		var month60 = this.addZero(time2.getMonth()+1);
		var year60 = time2.getFullYear();
		this.currentDatePlus60 = year60+'-'+month60+'-'+date60;
		console.log(this.currentDate + " " + this.currentDatePlus60, " fial date output");
	}

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    laterFunction(type){
	
		console.log(type)
		console.log(this.event.laterDay != '' && this.event.laterTime != '' , this.event.laterDay != '' , this.event.laterTime != '')
    	if(this.event.laterDay != '' && this.event.laterTime != ''){
			console.log("HERERERERE") ;
			let date1 = moment(this.event.laterDay + ' ' + this.event.laterTime).format('YYYY-MM-DD hh:mm A');
			this.datechecker = true;
			this.orderTime['datetime'] = date1;

			this.orderdetails['ordertiming'] = this.orderTime;
			console.log(this.orderdetails['ordertiming'],date1);
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

    orderTimeFunction(){
    	var time = this.orderTimeSelect;
    	if (time == 'now') {
    		delete this.orderdetails['ordertiming'];
    		this.event = {laterDay : '',laterTime : ''};
    		this.showLater = false;
    		this.orderTime = {};
    		this.orderTime['type'] = 'now';
			let newDate = moment(new Date).add(this.minTime,'minutes').format('YYYY-MM-DD hh:mm A');
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

        if(time == 'later'){
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

    yearArray(){
		let yr = this.currentYr;
		for (var i = yr; i < this.currentYr+15; i++) {
			this.year.push(i);
		}
	}









	deliveryAddress(){
		if (this.address == 'new') {
			delete this.orderAddress;
			this.initMap();
		}else{
			if (typeof this.currentCustomer['customeraddresses'] != 'undefined' && this.currentCustomer['customeraddresses'].length > 0) {
				this.orderAddress = this.currentCustomer['customeraddresses'][this.address]

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

	addAddress(){
		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
		console.log(this.addressForm.value);
		this.ms3Service.updateCustomerAddress(this.addressForm.value).subscribe((data)=>{
			if (data.error) {
				if (typeof data.message['isOperational'] != 'undefined') {
					this.getToast('Unable to add Address! Please try again.')
				}else{
					this.getToast(data.message);
				}
			}else{
				this.addressForm.reset();
				this.addressForm.controls['_id'].setValue(this.currentCustomer._id);
				this.getToast('Address Detail Added');
				this.getCurrentCustomer('addaddress');
			}
			this.loading.dismiss();
		},(err)=>{
			this.getToast('Unable to add Address.');
			this.loading.dismiss();
		})
	}


	public slotIsChangeInWeekly(){
        let xx : any  = document.getElementById('weeklyFirst');
		let yy : any  = document.getElementById('weeklySecond');
		console.log(xx,yy);
		if(xx){
		xx.value = '';
        this.deliveryWeekendErrorFirst = true
		
		}if(yy){
			yy.value = '';
			
		}
		this.deliveryWeekendErrorSecond = true;
	  //  this.getDeliveryCharges(false);
	  this.onChangeDeliveryTye();
    }

	getCurrentCustomer(type){
		this.ms3Service.getOneCustomer(this.currentCustomer['_id']).subscribe((data)=>{
			if (!data.error) {
				this.currentCustomer = data.message;
				if (type == 'cardadd') {
					this.chooseCard = (this.currentCustomer['cardinfo'].length-1).toString();
				}else{
					this.address = (this.currentCustomer['customeraddresses'].length-1).toString();
				}
				localStorage.removeItem('Mealdaay_customer');
				localStorage.setItem('Mealdaay_customer', JSON.stringify(data.message));
			}
		})
	}

	checkDisabled(){
		// console.log('CheckDisabled');
		if(this.event.laterDay == '' || this.event.laterTime == ''){
			this.canProceed = false;
			return true;
		}
		if(this.weeklyPackages){
			if(this.delvierySlotsWeekSeleted){
				if(this.delvierySlotsWeekSeleted.dtype == 'Once'){
					if(!this.deliveryWeekendErrorFirst && this.weeklyFirstTime ){
					
					}else{
						console.log('702');
						return true;
					}
				}else{
					if(!this.deliveryWeekendErrorSecond && this.weeklySecondTime ){
						
					}else{
						
						console.log('711',this.weeklySecondTime,this.deliveryWeekendErrorSecond);
						return true;
					}
				}
			}else{
				console.log('716');
				return true;
			}
		}
		if(this.weekendPackages){
			if(this.deliverySlotSelected){
				if(!this.deliveryWeeklyError && this.weekendTime){
				
				}else{
					console.log('722')
					return true;
				}
			}else{
				console.log('726')
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

		console.log("560",this.deliveryType);
		if(this.deliveryType == 'home'){
			if(typeof this.orderAddress == 'undefined' ){
				return true;
			}
		}
	if(this.paymentType == 'cash')
		{
			this.canProceed = true;
			return false;
		}else{
			if(this.chooseCard == 'new'){
				if(this.cardForm.valid){
					this.canProceed = true;
					return false;
				}else{
					this.canProceed = false;
					return true;
				}
			}else if (this.chooseCard != 'new' ){
				this.canProceed = true;
				return false;
			}else {
				this.canProceed = false;
				return true;
			}
		}
	




	}

	pmentType(){
		if (this.paymentType == 'cash') {
			this.orderPayment = 'cash';
		}

		if(this.paymentType == 'card'){
			delete this.orderPayment;
		}
	}

	crdType(){
		this.cardSelected = this.chooseCard;

		this.cardCvvForm.reset();
		// if(typeof this.orderCardInfo != 'undefined' && typeof this.orderCardInfo['cvv'] != 'undefined'){
		// 	delete this.orderCardInfo['cvv'];
		// }

		if (this.chooseCard != 'new') {
			this.orderPayment = 'card';
			this.orderCardInfo = this.currentCustomer['cardinfo'][this.chooseCard];
		}

		if(this.chooseCard == 'new'){
			delete this.orderPayment;
			delete this.orderCardInfo;
		}
	}

	enterCVV(event){
		this.orderCardInfo['cvv'] = this.cardCvvForm.value['cvv'];

		if (this.cardCvvForm.valid) {
			if ((event.keyCode == 13 || event.key == 'Enter') && this.canProceed) {
				this.proceedToThank();
			}
		}
	}

	choose(type){
		console.log(this.cardForm.value);
	}

	addCard(){
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
							this.updateCustomer();
						},(err)=>{
							this.generatingToken = false;
							this.getToast('Please try later ');
						});
				
						
			        }else{
						this.generatingToken = false;
				    	this.getToast('Card with this Card Number already exist');
			        }
                }else{
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

	updateCustomer(){
		this.ms3Service.updateCustomer(this.currentCustomer).subscribe((data)=>{
			if (!data.error) {
				this.getCurrentCustomer('cardadd');
				this.getToast('Card Detail Added');
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
	caterdaaycharges(){
		return new Promise((resolve,reject)=>{
			this.ms4Service.getCaterdaayCharges().subscribe((data:any)=>{
				this.caterdaaycharge = data.message[0].combocharge;
				console.log(data.message," 1113");
				resolve();
			},(err)=>{
				console.log(err);
				reject();
			})
		})
	
	}
	showCart(){
		this.navCtrl.push(CartPage);
	}
	proceedToThank(){
		
	 	this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
		});
		this.loading.present();
		// this.orderdetails.delvierySlot = this.deliverySlotSelected;
        // this.orderdetails.delvierySlotsWeek = this.delvierySlotsWeekSeleted;
      //  this.checkoutsummary.delvierySlot.status = 'received' ;
    //   if( this.orderdetails.delvierySlot){
	// 	  console.log(this.weekendTime,'WeekTime');
    //     this.orderdetails.delvierySlot.deliveryTime = this.weekendTime;

    //   }
    //   if(this.orderdetails.delvierySlotsWeek ){
	// 	console.log(this.weeklyFirstTime,'this.weeklyFirstTime');
    //     this.orderdetails.delvierySlotsWeek.deliveryFirstTime = this.weeklyFirstTime;
    //     this.orderdetails.delvierySlotsWeek.deliverySecondTime = this.weeklySecondTime;
	//   }
	//   console.log(this.orderdetails,'OrderDetails')
	//   for(let i =0 ; i < this.orderdetails.package.length ; i++){
	// 	this.orderdetails.package[i].orderStatus = 'received';
	// }
	// for(var i  = 0 ; i < this.orderdetails.items.length ; i++ ){
	// 	this.orderdetails.items[i].orderStatus = 'received';
	// }

		// this.loading = this.loadingCtrl.create({
        //     content: 'Please wait...'
        // });
		// this.loading.present();
		// if(this.orderdetails.items.length < 0  || this.orderdetails.items.length == 0  ){

		// 	this.orderdetails['ordertiming'] = {type:'f'}

		// }
			
		
		this.orderdetails['ordertype'] = "";
		this.orderdetails['fulladdress'] = this.orderAddress;
		this.orderdetails['paymenttype'] = 'Card';
		this.orderdetails['subtotal'] = Number(this.orderdetails['subtotal']).toFixed(2);
		this.orderdetails['tax'] = Number(this.TaxPrices).toFixed(2);
		this.orderdetails['timezone']= 'America/Los_Angeles';
		this.orderdetails['discount'] = "0";
		this.orderdetails['total'] = Number(this.orderdetails['total']).toFixed(2);
		this.orderdetails['driverinst'] = this.driverInst.get('inst').value;
		// alert(this.orderdetails['driverinst']);
		// alert(this.ele.nativeElement.querySelector('#driverinstt'));
		this.orderdetails['status'] = 'received';
	
		let nowDate = moment().format('LLLL');
		let date1 = moment(this.event.laterDay + ' ' + this.event.laterTime).format('YYYY-MM-DD hh:mm A');
		console.log(date1);
		date1 = moment(date1).format('LLLL');
		console.log(date1);
		this.orderdetails['ordertiming'] = {
			"create":nowDate,
			"datetime": date1,
			"type":"later"
		}
		console.log(this.orderPayment == 'card' && typeof this.orderCardInfo != 'undefined' && this.chooseCard !="new");
		console.log(this.orderPayment == 'card' &&  this.chooseCard == 'new');
		console.log(this.orderPayment,this.chooseCard)
		if(this.paymentType == 'card' && typeof this.orderCardInfo != 'undefined' && this.chooseCard !="new"){
			// this.orderdetails['cardinfo'] = this.orderCardInfo;

			let obj = {};

            obj['token'] = this.orderCardInfo['token'];
      //      obj['expirymonth'] = this.orderCardInfo['expirymonth'];
        //    obj['expiryyear'] = this.orderCardInfo['expiryyear'];
        //    obj['cvv'] = this.orderCardInfo['cvc'];
        //    obj['fname'] = this.orderCardInfo['fname'];
        //    obj['lname'] = this.orderCardInfo['lname'];
         //   obj['email'] = this.currentCustomer['email'];
            obj['amount'] = Math.round(parseFloat(this.orderdetails.total)*100)/100;
			obj['custid'] = this.currentCustomer['_id'];
		//	obj['zip'] = this.orderCardInfo['zip'];
		//	obj['address'] = this.orderCardInfo['address'];
		this.caterdaaycharges().then(()=>{
			this.orderdetails['caterdaaycharges']=this.caterdaaycharge;
			console.log(obj,'Select card');
			localStorage.removeItem('deliveryMethod');
			console.log(this.orderdetails);
		
			
		
            this.ms4Service.paymentByToken(obj).subscribe((data)=>{
                if (!data.error) {
					let dataObj = data.message.txn;
					
                    if(dataObj['ssl_result_message'] === 'APPROVED' || dataObj['ssl_result_message'] ==='APPROVAL'){
                        this.orderdetails["cardPaidStatus"] = dataObj;
                        this.addNewOrder();
                    }else if(dataObj['ssl_result_message'] == 'DECLINED'){
                    	this.loading.dismiss();
                        this.getToast('Payment with this card is declined. Please try another card!');
                    }else{
                    	this.loading.dismiss();
                        this.getToast('Unable to Proceed with Online Payment. Please try again!');
                    }
                }else{
               	this.loading.dismiss();
                	this.getToast('Unable to Proceed. Please try again!');
                }
            },(err)=>{
            	this.loading.dismiss();
                this.getToast('Something went wrong. Please try again!');
            })
		
		})

		}
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
		// }else if(this.paymentType &&  this.chooseCard == 'new'){
		// 	let obj = {};

        //     obj['cardnumber'] = this.cardForm.value.cardnumber;
        //     obj['expirymonth'] = this.cardForm.value.expirymonth;
		// 	// obj['expiryyear'] = this.cardForm.value.expiryear;
		// 	obj['expiryyear'] = this.cardForm.value.expiryyear;
		// 	obj['zip'] = this.cardForm.value.zip;
		// 	obj['address'] = this.cardForm.value.address;
        //     obj['cvv'] = this.cardForm.value.cvv;
        //     obj['fname'] = this.cardForm.value.fname;
        //     obj['lname'] = this.cardForm.value.lname;
        //     obj['email'] = this.currentCustomer['email'];
        //     obj['amount'] = Math.round(parseFloat(this.orderdetails.total)*100)/100;
        //     obj['custid'] = this.currentCustomer['_id'];
		// 	console.log('Add card ',obj);
		// 	console.log(this.orderdetails);
        //     this.ms4Service.makePayment(obj).subscribe((data)=>{
		// 		console.log(data);
        //         if (!data.error) {
        //             let dataObj = data.message.txn;
        //             if(dataObj['ssl_result_message'] === 'APPROVED' || dataObj['ssl_result_message'] ==='APPROVAL'){
        //                 this.orderdetails["cardPaidStatus"] = dataObj;
        //                 this.addNewOrder();
        //             }else if(dataObj['ssl_result_message'] == 'DECLINED'){
        //             	this.loading.dismiss();
        //                 this.getToast('Payment with this card is declined. Please try another card!');
        //             }else{
						
        //             	this.loading.dismiss();
        //                 this.getToast('Unable to Proceed with Online Payment. Please try again!');
        //             }
        //         }else{
        //        	this.loading.dismiss();
        //         	this.getToast('Unable to Proceed. Please try again!');
        //         }
        //     },(err)=>{
        //     	this.loading.dismiss();
        //         this.getToast('Something went wrong. Please try again!');
        //     });
		// }


		// if (this.paymentType == 'cash') {
		// 	console.log('cash on deliveary');
		// 	this.addNewOrder();
		// }
	}
	NotificationFunction(orderId,resId){
		return new Promise((resolve,reject)=>{
	    this.ms1Service.getOne(resId).subscribe((data)=>{
			let ownerId = data.message.ownerId;
			this.ms1Service.Owner(data.message.ownerId).subscribe((res:any)=>{
			
				console.log(res.message)
				let token = res.message.fcmToken;
				let data = {
				  type:"user",
				  orderId:orderId,
				  tokens:token,
				  chefid:ownerId
				}
				console.log(data);
				console.log("API Call");
				this.ms1Service.Notification(data).subscribe((response:any)=>{
					let data2 = {
						_id:ownerId,
						fcmToken:response.message.ownertoken
					}
				  this.ms1Service.editOwner(data2).subscribe((res)=>{
					resolve(true);
				  })
				 
				},(error)=>{
				 reject(false);
			   })
			  },(error)=>{
				reject(false);
			  })
					
			 })
		})
		
	 }
	addNewOrder(){
	
		this.orderdetails["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
		this.orderdetails["created_at"] = new Date();
		this.ms4Service.addOrder(this.orderdetails).subscribe((data)=>{
			if (!data.error) {
				console.log(data.message);
				this.NotificationFunction(data.message._id,data.message.restaurantid);
				this.nav.setRoot(ThankPage,{
					order : data.message,
					country : this.resCountry
				});

				var obj2 = {"customeremail": this.currentCustomer.email, "order": data.message, "restaurantid" : data.message.restaurantid}; 
					this.ms1Service.orderMail(obj2).subscribe(res => {
				});


			
				localStorage.removeItem('cartinfo');
				this.events.publish('cart:item',this.orderdetails,Date.now());
				this.getToast('Order Placed Successfully');
				this.loading.dismiss();
			}else{
				this.getToast('Unable to place Order!');
			}
		},(err)=>{
			this.getToast('Something went wrong. Unable to place Order!');
			/*this.events.publish('internet:lost','abc');*/
		})
	}

	getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position:'top' //top,middle,bottom
        });
        toast.present();
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
					this.currentCustomer.lat = position.coords.latitude;
					this.currentCustomer.lng = position.coords.longitude;
					this.mapRun();
				},
				(error) => {
					this.getToast('Unable to detect Address')
				});
			}else {
				this.getToast("Your Phone don't support Geolocation");
			}
		}
	}
	somethingChanged(value){
		console.log("helo i am here",value);
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
		autocomplete.addListener('place_changed', (value) => {
			console.log(value,'874');
			console.log(this.addressForm.value);
			marker.setVisible(true);
			var place = autocomplete.getPlace();
		
			console.log(place,'877');
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
				console.log(place.address_components,'895');
				for (var i = 0; i < place.address_components.length; i++) {
					for(var j = 0; j < place.address_components[i].types.length; j++)
					{
						var addressType = place.address_components[i].types[j];
					if (addressType == 'premise' || addressType == 'route') {
						if (typeof houseNo == 'undefined') {
							houseNo = place.address_components[i]['long_name']
						}else{
							houseNo = houseNo + ' ' + place.address_components[i]['long_name']
						}
					}
					if (addressType == 'neighborhood' || addressType == 'sublocality' || addressType == 'sublocality_level_2') {
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
		let _that = this;
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, long);
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
						// _that.addressForm.controls['address'].setValue(results[0].formatted_address);
						//  _that.addressForm.controls['address'].setValue( this.ele.nativeElement.querySelector('#search').value);
						// // document.getElementById("#search").value


						// if (typeof houseNo != 'undefined' && typeof area != 'undefined') {
						// 	_that.addressForm.controls['address'].setValue(houseNo + ' ' + area);
						// }

						// if (typeof houseNo == 'undefined' && typeof area != 'undefined') {
						// 	_that.addressForm.controls['address'].setValue(area);
						// }

						// if (typeof houseNo != 'undefined' && typeof area == 'undefined') {
						// 	_that.addressForm.controls['address'].setValue(houseNo);
						// }

						// if (typeof houseNo == 'undefined' && typeof area == 'undefined') {
						// 	_that.addressForm.controls['address'].setValue(results[0].formatted_address);
						// }
					},1000)
				}
			} else {
			}
		});
	}

}
