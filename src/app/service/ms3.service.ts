import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import * as globalVariable from "../global";


@Injectable()
export class MS3Service {

  	constructor(private http: Http) { }
  	
  	sendQuery(data) {
  		return this.http.post(globalVariable.url3+'contactus/',data)
  		.map(
  			(response: Response) => response.json()
  		);
  	}
    UpdatePass(obj:any){
		return this.http.put(globalVariable.url3+"customers/change-password/"+obj._id,obj).map((response:Response)=>{
			response.json()
		});
	}
  	getOneCustomer(id) {
  		return this.http.get(globalVariable.url3+'customers/'+id)
  		.map(
  			(response: Response) => response.json()
  		);
  	}

	getCustomer(data){
		return this.http.post(globalVariable.url3 + 'customers/login', data)
		.map((response: Response) => {
			let user = response.json();
        	return user;
        });
	}

	addCustomer(data) {
		return this.http.post(globalVariable.url3+'customers/signup/',data)
		.map((response: Response) => response.json());	
	}

	updateCustomer(data) {
		return this.http.put(globalVariable.url3+'customers/' +data._id ,data)
		.map(
			(response: Response) => response.json()
		);
	}

	forgetPasswordCustomer(data){
		return this.http.post(globalVariable.url3+'customers/forget-password', data)
		.map((response: Response) => {
			let user = response.json();
			return user;
		});
	}

	updateCustomerAddress(data){
		return this.http.post(globalVariable.url3+'customer-address/'+data._id,data)
		.map(
			(response: Response) => response.json()
		);
	}

	getMultipleCust(data) {
		return this.http.post(globalVariable.url3+'customers/multiple', data)
		.map(
			(response: Response) => response.json()
			);
	}

}