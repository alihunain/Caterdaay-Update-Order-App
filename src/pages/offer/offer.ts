import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CartPage } from '../cart/cart';
/**
* Generated class for the OfferPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
@Component({
	selector: 'page-offer',
	templateUrl: 'offer.html',
})
export class OfferPage {

	offer : any = [];
	kitchen : any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
		) {

		let offer = navParams.get('offer');
		this.kitchen = navParams.get('kitchen');

		if(typeof offer != 'undefined' && offer.length > 0)
			this.sortOffer(offer);
	}

	sortOffer(offer){

		offer.forEach((item)=>{		
			let expDate = new Date(item['expirydate']);
			let date = new Date();

			if (expDate >= date) {
				item['valid'] = true;
				this.offer.push(item);
			}else{
				item['valid'] = false;
			}
		})
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
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad OfferPage');
	}

	cartPage(){
		this.navCtrl.push(CartPage);
	}

}
