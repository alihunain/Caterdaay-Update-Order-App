import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CartPage } from '../cart/cart';

/*import { MS6Service } from '../../app/service/index';*/

@Component({
	selector: 'page-my-pop-over',
	templateUrl: 'my-pop-over.html'
})
export class MyPopOverPage {
	
	kitchen : any = {};
	loading : any;
	cuisines : any;

	openingHours : any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
	){
		this.kitchen = navParams.get('kitchen');
		this.cuisines = navParams.get('cuisines');
		if (this.kitchen.openinghours.length > 0) {
			this.kitchen.openinghours = this.checkTimeFormat(this.kitchen['openinghours']);
		}
	}

	ionViewDidLoad(){
		console.log("popover page");
	}

    cartPage(){
        this.navCtrl.push(CartPage);
    }

    checkTimeFormat(timeObj){
    	timeObj.forEach((time)=>{
    		time.times.forEach((obj)=>{
    			let open = obj.open.split(':')
    			let close = obj.close.split(':')

   				open[0] = open[0].length==1? '0' + open[0] : open[0];
   				close[0] = close[0].length==1? '0' + close[0] : close[0];

   				obj.open = open[0] + ' : ' + open[1];
   				obj.close = close[0] + ' : ' + close[1];
    		})
    	});
    	return timeObj
    }
}
