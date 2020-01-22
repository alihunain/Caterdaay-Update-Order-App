import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Http, Response } from "@angular/http";
import "rxjs";

import * as globalVariable from "../global";

declare var google: any;

import { MS6Service } from "./ms6.service";

import { Geolocation } from "@ionic-native/geolocation";
import { Platform } from "ionic-angular";
import { Diagnostic } from "@ionic-native/diagnostic";

@Injectable()
export class LocationService {
  subscription: any;

  constructor(
    private http: Http,
    public alertCtrl: AlertController,
    public ms6Service: MS6Service,
    public geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private platform: Platform
  ) {
    this.platform = platform;
  }

  getLocation() {
    let location = "";
    console.log("get lcoation ");
    location = localStorage.getItem("currentCountry_Mealday");

    if (location == null || location == "") {
      console.log("get lcoation 312");
      this.subscription = this.geolocation
        .watchPosition()
        .filter(p => p.coords !== undefined) //Filter Out Errors
        .subscribe(
          position => {
            console.log("get loc subscriber", position);
            if (typeof position["coords"] != "undefined") {
              console.log("getgeo");
              this.getgeo(position.coords.latitude, position.coords.longitude);
              localStorage.setItem(
                "Mealday_currentCustomer_lat",
                JSON.stringify(position.coords.latitude)
              );
              localStorage.setItem(
                "Mealday_currentCustomer_lng",
                JSON.stringify(position.coords.longitude)
              );
            }
          },
          err => console.log(err, "watchPosition")
        );
      console.log("get lcoation");
      /*setTimeout(()=>{
                this.subscription.unsubscribe();
            },60000);*/
            //  let options  =  {timeout: 30000, enableHighAccuracy: false, maximumAge: 3600};
            // this.geolocation.getCurrentPosition(options).then(position=>{
            //   console.log("get loc subscriber", position);
            //         if (typeof position["coords"] != "undefined") {
            //           console.log("getgeo");
            //           this.getgeo(position.coords.latitude, position.coords.longitude);
            //           localStorage.setItem(
            //             "Mealday_currentCustomer_lat",
            //             JSON.stringify(position.coords.latitude)
            //           );
            //           localStorage.setItem(
            //             "Mealday_currentCustomer_lng",
            //             JSON.stringify(position.coords.longitude)
            //           );
            //         }
            // }).catch(err=>{
            //   console.log(err, "watchPosition")
            // })
    } else {
      this.setonheader();
    }
  }
  successCallback(isAvailable) {
    console.log("sccuessCallBack");
    return new Promise((resolved, reject) => {
      if (!isAvailable) {
        let prompt = this.alertCtrl.create({
          message:
            "To detect your current location, Please turn your device location ON.",
          buttons: [
            {
              text: "Cancel",
              handler: data => {
                console.log("Cancel clicked");
                this.platform.exitApp();
              }
            },
            {
              text: "oK",
              handler: data => {
                this.diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        prompt.present();
        resolved(false);
      } else {
        this.diagnostic.requestLocationAuthorization().then(status => {
          if (status == "GRANTED") {
            console.log("GRANTED");
            this.getLocation();
            resolved(true);
          } else {
            let prompt = this.alertCtrl.create({
              message:
                "To detect your current location, Please turn your device location ON and authorized the apllication to use location.",
              buttons: [
                {
                  text: "Cancel",
                  handler: data => {
                    console.log("Cancel clicked");
                    this.platform.exitApp();
                  }
                },
                {
                  text: "oK",
                  handler: data => {
                    this.diagnostic.switchToLocationSettings();
                  }
                }
              ]
            });
            prompt.present();
            resolved(false);
          }
        });
      }
    });
  }
  getlocationPermission() {
    let errorCallback = e => console.error(e);
    return new Promise((resolved, reject) => {
      this.diagnostic
        .isLocationEnabled()
        .then(success => {
          console.log(success);
          this.successCallback(success).then(status => {
            if (status) {
              resolved(true);
            } else {
              reject();
            }
          });
        })
        .catch(errorCallback);
    });
  }

  public getgeo(lat, long) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, long);
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      console.log("geocoder");
      /*this.subscription.unsubscribe();*/
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let obj = {};
          if (results[0].address_components.length > 0) {
            results[0].address_components.forEach(comp => {
              if (comp.types.length > 0) {
                for (var i = 0; i < comp.types.length; i++) {
                  if (comp.types[0] == "country") {
                    obj = { countryname: comp.long_name };
                      console.log(comp.long_name);
                    this.ms6Service.getIdByCountry(obj).subscribe(item => {
                      console.log(item)
                      if (item.message.length > 0) {
                        var obj1 = {
                          country: comp.long_name,
                          countryid: item.message[0]._id
                        };
                        console.log("currentCOuntry");
                        localStorage.setItem(
                          "currentCountry_Mealday",
                          JSON.stringify(obj1)
                        );
                        if (this.subscription) {
                          this.subscription.unsubscribe();
                        }
                        return;
                      } else {
                        var obj2 = {
                          country: 'canada',
                          countryid: "5aab1ae9da02ff5ec535e0095aab1ae9da02ff5ec535e009"
                        };
                        localStorage.setItem(
                          "currentCountry_Mealday",
                          JSON.stringify(obj2)
                        );
                        if (this.subscription) {
                          this.subscription.unsubscribe();
                        }
                        return;
                      }
                    },(err =>{
                      console.log(err,'Error in getting LOCation')
                    }));
                  }
                }
              }
            });
          }
        } else {
          alert("address not found");
        }
      } else {
        // alert("Geocoder failed due to: " + status);
      }
    });
  }

  setonheader() {
    let cntry = localStorage.getItem("currentCountry_Mealday");
    if (cntry != null) {
      let ctry = JSON.parse(localStorage.getItem("currentCountry_Mealday"));

      if (ctry.countryid == "sdf") {
        var obj = { countryname: ctry.country };
        this.ms6Service.getCountryName().subscribe(data => {
          obj.countryname = data.country_name;

          this.ms6Service.getIdByCountry(obj).subscribe(item => {
            if (!item.error) {
              if (item.message.length > 0) {
                var cntry = {
                  country: item.message[0].countryName,
                  countryid: item.message[0]._id
                };
                localStorage.setItem(
                  "currentCountry_Mealday",
                  JSON.stringify(cntry)
                );
              } else {
                if ("geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition(position => {
                    this.getgeo(
                      position.coords.latitude,
                      position.coords.longitude
                    );
                  });
                }
              }
            } else {
              if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                  this.getgeo(
                    position.coords.latitude,
                    position.coords.longitude
                  );
                });
              }
            }
          });
        });
      }
    }
  }
}
