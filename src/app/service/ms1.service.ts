import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import * as globalVariable from "../global";
import { Subject } from 'rxjs';


@Injectable()
export class MS1Service {
    private LoginElement = new Subject<any>();
    getLoginElement = this.LoginElement.asObservable();
    constructor(private http: Http) { }
    UpdateCart(ele){

        this.LoginElement.next(ele);
      }
    getAll() {
        return this.http.get(globalVariable.url1+'kitchen/')
        .map(
            (response: Response) => response.json()
            );
    }

    getOne(id) {
        return this.http.get(globalVariable.url1+'kitchen/'+id)
        .map(
            (response: Response) => response.json()
            );
    }
    Owner(id){
        return this.http.get(globalVariable.url1 + "owners/" + id ).map(
            (response: Response) => response.json()
            );
      }
    Notification(data){
        return this.http.post(globalVariable.url1 + "notifications",data).map(
            (response: Response) => response.json()
            );
      }
      editOwner(data){
        return this.http.put(globalVariable.url1 + 'owners/' + data._id, data)
            .map((response: Response) => response.json());
    }
    getOneOwner(id) {
        return this.http.get(globalVariable.url1+'owners/'+id)
        .map(
            (response: Response) => response.json()
            );
    }

    orderCancelMail(data) {
        return this.http.post(globalVariable.url1+'order-cancel-email',data)
        .map(
            (response: Response) => response.json()
        );
    }

    getIntro() {
        return this.http.get(globalVariable.url+'intro')
        .map(
            (response: Response) => response.json()
            );
    }

    filterRestaurants(data){
        return this.http.post(globalVariable.url1+'filterKitchen/' ,data)
        .map((response: Response) => response.json());
    }

    orderMail(data) {
        return this.http.post(globalVariable.url1+'order-email',data)
        .map(
            (response: Response) => response.json()
        );
    }

    getDriver(id) {
        return this.http.get(globalVariable.url1 + 'driver/' + id)
            .map((response: Response) => response.json());
    }
}