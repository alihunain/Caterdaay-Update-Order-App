import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import * as globalVariable from "../global";


@Injectable()
export class MS2Service {

    constructor(private http: Http) { }

    getAllMenu(id) {
        return this.http.get(globalVariable.url2+'menu-list/'+id)
        .map(
            (response: Response) => response.json()
        );
    }

    getAllItem(id) {
        return this.http.get(globalVariable.url2+'item-list/'+id)
        .map(
            (response: Response) => response.json()
        );
    }

    getEntireItems() {
        return this.http.get(globalVariable.url2+'item')
        .map(
            (response: Response) => response.json()
        );
    }

    getActiveItems(id) {
      return this.http.get(globalVariable.url2+'active-items/'+id)
        .map(
          (response: Response) => response.json()
        );
    }

    getActiveMealPackages(id){
        return this.http.get(globalVariable.url2+'active-mealpackages/'+id)
        .map((response: Response) => response.json());
    }

    getMonthlyMenu(id){
        return this.http.get(globalVariable.url2+'monthly-list/'+id)
        .map((response: Response) => response.json());
    }

    getOffersforRestro(id){
        return this.http.get(globalVariable.url2+'offer-list/'+id)
        .map((response: Response) => response.json());
    }

    redeemCoupanCode(data) {
        return this.http.post(globalVariable.url2+'offer/redeem', data)
        .map(
            (response: Response) => response.json()
        );
    }

    getActiveCombos(id) {
        return this.http.get(globalVariable.url2+'active-combos/'+id)
        .map(
            (response: Response) => response.json()
        );
    }
}