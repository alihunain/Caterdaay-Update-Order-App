import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CartPage } from '../cart/cart';

/**
* Generated class for the ReferPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-refer',
	templateUrl: 'refer.html',
})
export class ReferPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
		) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ReferPage');
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

	cartPage(){
		this.navCtrl.push(CartPage)
	}

}
