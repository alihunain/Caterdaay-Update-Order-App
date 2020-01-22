import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import * as globalVariable from "../global";


import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
declare var FCMPlugin : any;
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseFunctionService {

    loading : any;
    items: Observable<any[]>;
    firestore = firebase.database().ref('/customers');
    pushtokens : any = [];
    currentCustomer : any = {};

    constructor(
        private http: Http,
        public afd: AngularFireDatabase
    ) {}

    getTokenForCustomer(){
        this.currentCustomer = JSON.parse(localStorage.getItem('Mealdaay_customer'));

        let itemRef = this.afd.object('customers');

        itemRef.snapshotChanges().subscribe(action => {

            let arr = action.payload.val();

            let pushArr = [];

            for (var k in arr){
                if (arr.hasOwnProperty(k)) {
                    pushArr.push({'key':k,'customerId':arr[k].customerId})
                }
            }
            this.pushtokens = pushArr;
        });

        setTimeout(()=>{
            this.tokensetup().then((token) => {

                console.log("token");
                console.log(token);
                
                if (token != null) {
                    if (this.pushtokens && this.pushtokens.length > 0) {
                        let indx = this.pushtokens.findIndex((mn)=> mn.customerId == this.currentCustomer['_id'])
                        if (indx > -1) {
                            this.updateToken(this.pushtokens[indx]['key'],token);
                        }else{
                            this.addToken(token)
                        }
                    }else{
                        this.addToken(token)
                    }
                }
            })
        },5000)
    }


    tokensetup() {
        var promise = new Promise((resolve, reject) => {
            if (typeof FCMPlugin != 'undefined' && FCMPlugin != null) {
                FCMPlugin.getToken(function(token){
                    resolve(token);
                }, (err) => {
                    reject(err);
                });
            }
        })
        return promise;
    }

    addToken(t){
        this.afd.list(this.firestore).push({
            customerId: this.currentCustomer['_id'],
            devtoken: t
        }).then(() => {
            console.log("Token Added")
        })
    }

    updateToken(key,t){
        this.afd.list(this.firestore).update(key, { devtoken: t }).then(() => {
            console.log("Token Updated")
        });
    }


}