import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import * as globalVariable from "../global";


@Injectable()
export class MS4Service {

    constructor(private http: Http) { }
    getCaterdaayCharges(){
        return this.http.get(globalVariable.url+'mealdaaycharges').map((response:Response)=>response.json())
    }
    getCustomerOrders(id){
        return this.http.get(globalVariable.url4+'customerorder/'+id)
        .map(
            (response: Response) => response.json()
        );
    }

    cardPayment(data) {
        return this.http.post(globalVariable.url4+'charge/', data)
        .map(
            (response: Response) => response.json()
        );
    }


    getAllAddonKitchen(id){
        return this.http.get(globalVariable.url2+'addon/kitchen/'+id)
  			.map(
  				(response: Response) => response.json()
  			);
    }

    addAddonEdit(id,data){
        return this.http.put(globalVariable.url2+'addon/'+id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    addOrder(data) {
        return this.http.post(globalVariable.url4+'order',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    paymentByToken(data){
        return this.http.post(globalVariable.url4+ 'collectpaymentbytoken',data)
        .map(
          (response: Response) => response.json()
        );
      }
    updateCustomersOrdersStatus(data) {
        return this.http.put(globalVariable.url4 + 'order/' + data.id, data)
        .map(
            (response: Response) => response.json()
        );
    }

    getOneOrder(id) {
        return this.http.get(globalVariable.url4 + 'order/' + id)
        .map((response: Response) => response.json());
    }


    /*getReviewRating(id) {
        return this.http.get(globalVariable.url4+'rating/restaurant-rating-review/'+id)
        .map((response: Response) => response.json());
    }*/

    add(data) {
        return this.http.post(globalVariable.url4+'rating/',data)
        .map(
        (response: Response) => response.json()
        );
    }
    update(data) {      
        return this.http.put(globalVariable.url4+'rating/'+data._id,data)
        .map(
        (response: Response) => response.json()
        );
    }
    
    getAll(id) {
        return this.http.get(globalVariable.url4+'rating/'+id)
        .map(
        (response: Response) => response.json()
        );
        }

    getOne(id) {
        return this.http.get(globalVariable.url4+'rating/'+id)
        .map(
        (response: Response) => response.json()
        );
    }

    deleteOne(id) {
        return this.http.delete(globalVariable.url4+'rating/'+id)
        .map(
        (response: Response) => response.json()
        );
    }

    checkRestroRating(data) {
        return this.http.post(globalVariable.url4+'rating/checkrating', data)
        .map(
        (response: Response) => response.json()
        );
    } 

    getAllRestroRating() {
        return this.http.get(globalVariable.url4+'rating/restroavg')
        .map(
        (response: Response) => response.json()
        );
    }

    getICPRating(id) {
        return this.http.get(globalVariable.url4+'rating/restaurant-rating/'+id)
        .map((response: Response) => response.json());
    }

    getReviewRating(id) {
        return this.http.get(globalVariable.url4+'rating/restaurant-rating-review/'+id)
        .map((response: Response) => response.json());
    }

    getCustomerRating(id) {
        return this.http.get(globalVariable.url4+'rating/customer-rating/'+id)
        .map((response: Response) => response.json());
    }

    getStripeKey(){
        return this.http.get(globalVariable.url4+'stripeconfig/')
        .map(
            (response: Response) => response.json()
        );
    }

    
    verifyCard(data){
      return this.http.post(globalVariable.url4+ 'verify-card/',data)
      /*return this.http.post('http://localhost:4044/generate-card-token/',data)*/
      /*return this.http.post('http://localhost:4044/verify-card/',data)*/
      .map(
        (response: Response) => response.json()
      );
    }
    tokenGenerate(data){
        return this.http.post(globalVariable.url4+ 'generate-card-token',data)
        /*return this.http.post('http://localhost:4044/collect-payment/',data)*/
        .map(
          (response: Response) => response.json()
        );
      }
    makePayment(data){
      return this.http.post(globalVariable.url4+ 'collect-payment/',data)
      /*return this.http.post('http://localhost:4044/collect-payment/',data)*/
      .map(
        (response: Response) => response.json()
      );
    }
}