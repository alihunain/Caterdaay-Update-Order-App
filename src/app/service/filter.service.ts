import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import * as globalVariable from "../global";


@Injectable()
export class FilterService {
    allKithcen = [] ;
    filterKitchen = [] ;
    filterObj:any = {};
    filterIsApplied = false;
    constructor(private http: Http) { }
    getAllKitchen(){
        return this.allKithcen;
    }
    getFilterKitchen(){
        return this.filterKitchen;
    }
    getFilterObj(){
        return this.filterObj;
    }
    setAllKitchen(kitchens){
            this.allKithcen = kitchens;
    }
    setFilterKitchen(filterKitchen){
        this.filterKitchen  = filterKitchen;
    }
    setisApplied(bool){
        this.filterIsApplied = bool;
    }
    setFilterObj(filterObj){
        console.log(filterObj);
        this.filterObj = filterObj;
    }
}