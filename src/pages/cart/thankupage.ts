import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { ListPage } from '../list/list';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
/*import { FirebaseListObservable } from 'angularfire2/database-deprecated';*/
import 'rxjs/add/operator/map';

import firebase from 'firebase';

/*declare var FCMPlugin : any;*/

/*import { AngularFirestore } from 'angularfire2/firestore';*/
/*import { Observable } from 'rxjs/Observable';*/


/**
* Generated class for the CartPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
	selector: 'page-thankpage',
	templateUrl: 'thankupage.html',
})
export class ThankPage {

	order : any;
	country : any;

	orderEntry = firebase.database().ref('/orders');

	constructor(
		public navCtrl: NavController,
		public nav: Nav,
		public navParams: NavParams,
		public afd: AngularFireDatabase
		) {
		this.order = navParams.get('order');
		this.country = navParams.get('country');
			console.log("SENDING NOTIFICATION")
		this.afd.list(this.orderEntry).push({
			orderID: this.order['_id'],
			orderStatus: this.order['status'],
			restaurantid: this.order['restaurantid'],
			customerid: this.order['customerid'],
			type: 'item',
			badge:1
		}).then(() => {
			console.log('Order Pushed');
			/*alert('Order Pushed');*/
		})
		// console.log("NEW CODE")
		// this.orderEntry.once("value").then(snapshot=>{
		// 	console.log("DATA GETTED");
		// 	let data = snapshot.val();
		// 	Object.keys(data).forEach(key=>{
		// 		firebase.database().ref(`/orders/${key}`).remove().then(()=>console.log("delete"))
		// 	})
		// })
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

	homePage(){
		this.nav.setRoot(ListPage,{
			country : this.country
		});
	}
}
