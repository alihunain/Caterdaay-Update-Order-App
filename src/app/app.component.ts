import { Component, ViewChild } from "@angular/core";
import {
  Nav,
  Platform,
  AlertController,
  Events,
  LoadingController,
  ToastController
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { App } from "ionic-angular";

import { Network } from "@ionic-native/network";

import { LoginPage } from "../pages/login/login";

import { ListPage } from "../pages/list/list";
/*import { FilterPage } from '../pages/list/filter';*/

import { CartPage } from "../pages/cart/cart";

import { ProfilePage } from "../pages/profile/profile";

/*import { ReferPage } from '../pages/refer/refer';*/

import { InfoPage } from "../pages/info/info";

import { OrderPage } from "../pages/order/order";

import { OrderDetailPage } from "../pages/order/orderdetail";

import { WishlistPage } from "../pages/wishlist/wishlist";

import { SnapPage } from "../pages/snap/snap";
import { ReviewPage } from "../pages/review/review";

import { MS4Service, MS6Service, MS3Service } from "./service/index";

import { LocationService } from "./service/location.service";

import { Badge } from "@ionic-native/badge";
import { Diagnostic } from "@ionic-native/diagnostic";
import { count } from "rxjs/operators";

/*import { BackgroundMode } from '@ionic-native/background-mode';*/

declare var FCMPlugin: any;
declare var cordova: any;

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;

  rootPage: any;
  orderdetails: any;
  currentComponentPage: any;
  loading: any;
  noConnection: boolean = false;
  showLocAllowButton: boolean = false;

  pages: Array<{ title: string; component: any }>;
  totalbudgeCount: any;

  constructor(

    public platform: Platform,
    /*public navCtrl: NavController,*/
public threeService:MS3Service,
    private app: App,
    public statusBar: StatusBar,
    public events: Events,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public ms4Service: MS4Service,
    public ms6Service: MS6Service,
    public locationService: LocationService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private badge: Badge,
    private diagnostic: Diagnostic,
    /*private backgroundMode: BackgroundMode,*/
    private network: Network
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      duration: 3000
    });

    document.addEventListener(
      "resume",
      () => {
        this.getLocation("");
      },
      false
    );

    events.subscribe("user:created", (user, time) => {
      this.pages = [];
      this.pages.push(
        { title: "All Caterers", component: ListPage },
        { title: "Cart", component: CartPage },
        { title: "My Profile", component: ProfilePage },
        { title: "My Orders", component: OrderPage },
        { title: "About", component: InfoPage },
        // { title: "My Wishlist", component: WishlistPage },
        { title: "Logout", component: "Logout" }
      );
    });

    events.subscribe("cart:item", (user, time) => {
      this.cartCount();
    });
    this.initializeApp();
  }

  retry(event) {
    this.noConnection = false;
    if (this.network["type"] == "none") {
      this.loading.present();
      this.noConnectionToast();
    } else {
      this.onConnectFunction();
    }
  }

  onConnectFunction() {
    this.loadScript();
    this.getLocation("onConnectFunction");
  }

  public loadScript() {
    let node = document.createElement("script");
    node.src =
      "http://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=places&key=AIzaSyB1IsrsMN22HB_fgAxG0i3Twes60dPF2EA";
    node.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(node);
  }

  noConnectionToast() {
    let toast = this.toastCtrl.create({
      message: "No Internet connection!",
      duration: 2000,
      position: "bottom" //top,middle,bottom
    });
    toast.present();
    this.noConnection = true;
  }

  iconImage() {
    return "assets/imgs/MealDaay-small.png";
  }

  cartCount() {
    if (localStorage.getItem("cartinfo")) {
      if (
        JSON.parse(localStorage.getItem("cartinfo"))["items"].length > 0 ||
        JSON.parse(localStorage.getItem("cartinfo"))["combo"].length > 0 ||
        JSON.parse(localStorage.getItem("cartinfo"))["package"].length > 0
      ) {
        this.orderdetails = JSON.parse(localStorage.getItem("cartinfo"));
      } else {
        delete this.orderdetails;
      }
    } else {
      delete this.orderdetails;
    }
  }
   setBadge(budgeNumber: number) {
    
 
     this.badge.set(budgeNumber);
    console.log("set Badge")
    
  }
   getBadge() {
    console.log('get Badge');
     this.badge.get().then(count => {
      this.totalbudgeCount = count;
    });
  }
   clearBadge() {
    console.log('clearBadge');
     this.badge.clear();
  }
   increaseBadge() {
    console.log('increasing badge by 1');
     this.badge.increase(1);
  }
  async registerRequestPermission() {
    try {
      let isSupported = await this.badge.isSupported();
      console.log("isSupported",isSupported);
      let hasPermission = await this.badge.hasPermission();
      console.log('app188hasPermission',hasPermission);
      if (hasPermission) {
        let permission = await this.badge.requestPermission();
        console.log(permission);
      }
    } catch (e) {
      console.error(e);
    }
  }
  initializeApp() {
    var _that = this;
    // this.clearBadge();
 
    this.pages = [
      { title: "All Caterers", component: ListPage },
      { title: "About", component: InfoPage },
      { title: "Cart", component: CartPage },
      { title: "Login", component: LoginPage }
    ];

    this.platform.ready().then(() => {
      // this.setBadge(5);
      this.registerRequestPermission();
      this.splashScreen.hide();
      this.getLocation("init");
      if (typeof FCMPlugin != "undefined") {
        FCMPlugin.onNotification(data => {
          console.log("HERE");
          if(JSON.parse(localStorage.getItem("Mealdaay_customer")) == undefined){
            return;
          }
          if(JSON.parse(localStorage.getItem("Mealdaay_customer"))._id != data._id){
            return;
          }
         
          if (data.wasTapped) {
            _that.getOrder(data.orderId);
            this.increaseBadge();
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
            let prompt = _that.alertCtrl.create({
              message: data.message,
              buttons: [
                {
                  text: "oK",
                  handler: dataa => {
                    _that.getOrder(data.orderId);
                  }
                }
              ]
            });
            prompt.present();
          }
        });

        FCMPlugin.onTokenRefresh(function(token) {
          console.log(token);
        });
      }

      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.noConnectionToast();
      });

      let connectSubscription = this.network.onConnect().subscribe(() => {
        this.onConnectFunction();
      });

      this.statusBar.styleDefault();
    });
  }

  getLocation(type) {
    if (this.network["type"] == "none") {
      this.noConnectionToast();
      // this.nextFunction(type);
      // this.splashScreen.hide();
    } else {
      this.noConnection = false;
      // this.locationService.getlocationPermission().then((status)=>{
      //     if(status){
      //     this.nextFunction(type)
      //     }else{

      //     }
      // });
      if (type == "init") {
        this.diagnostic.isLocationEnabled().then(success => {
          if (!success) {
            this.showLocAllowButton = true;
          } else {
            if (localStorage.getItem("currentCountry_Mealday")) {
              this.nextFunction(type);
            } else {
              this.locationService.successCallback(true).then(res => {
                if (res) {
                  this.nextFunction(type);
                }
              });
            }
          }
        });
      } else if (type == "onConnectFunction") {
        this.diagnostic.switchToLocationSettings();
      } else {
        // this.locationService.getlocationPermission().then((status)=>{
        //     if(status){
        //     this.nextFunction(type)
        //     }else{

        //     }
        if (!this.currentComponentPage) {
          this.diagnostic.isLocationEnabled().then(success => {
            if (!success) {
              this.showLocAllowButton = true;
            } else {
              if (localStorage.getItem("currentCountry_Mealday")) {
                this.nextFunction(type);
              } else {
                this.locationService.successCallback(true).then(res => {
                  if (res) {
                    this.nextFunction(type);
                  }
                });
              }
            }
          });
        } else {
          this.locationService.getlocationPermission().then(status => {
            if (status) {
              this.nextFunction(type);
            }
          });
        }
      }
      // if(!locAccess){
      //     if (type == 'init') {
      //         this.showLocAllowButton = true;
      //     }
      //     this.nextFunction(type);
      // }else{
      //     this.locationService.getLocation();
      //     this.nextFunction(type);
      // }
    }
  }

  nextFunction(type) {
    console.log("nextFunction");
    let id = setInterval(() => {
      let cntry = localStorage.getItem("currentCountry_Mealday");
      console.log("currentCOuntry nextfunction", cntry);
      // console.log("cntry => " , cntry);
      if (cntry != null && cntry != "") {
        this.loading.present();
        clearInterval(id);

        let cstmr = localStorage.getItem("Mealdaay_customer");

        if (cstmr != null && JSON.parse(cstmr)["accounttype"] == "customer") {
          this.events.publish(
            "user:created",
            JSON.parse(localStorage.getItem("Mealdaay_customer")),
            Date.now()
          );
        }

        /*this.badge.set(9);*/
        console.log(this.currentComponentPage, "CP");
        if (!this.currentComponentPage) {
          this.rootPage = ListPage;
          this.showLocAllowButton = false;
          console.log("ListPage");
        } else {
          // if (this.currentComponentPage == 'ListPage') {
          //     this.nav.setRoot(ListPage);
          // }else if (this.currentComponentPage == 'ProfilePage') {
          //     this.nav.setRoot(ProfilePage);
          // }else if (this.currentComponentPage == 'CartPage') {
          //     this.nav.setRoot(CartPage);
          // }else if (this.currentComponentPage == 'OrderPage') {
          //     this.nav.setRoot(OrderPage);
          // }else if (this.currentComponentPage == 'InfoPage') {
          //     this.nav.setRoot(InfoPage);
          // }else if (this.currentComponentPage == 'WishlistPage') {
          //     this.nav.setRoot(WishlistPage);
          // }else{
          //     this.nav.setRoot(ListPage);
          // }
        }
        this.showLocAllowButton = false;
        this.loading.dismiss();
        this.getCurrentPage();
        this.cartCount();
      }
    }, 1000);
  }

  cartPage() {
    this.app.getActiveNav().push(CartPage);
  }

  getCurrentPage() {
    setTimeout(() => {
      let page = this.app.getActiveNavs();
      if (page.length > 0) {
        this.currentComponentPage = page[0].getViews()[0].name;
      }
    }, 1000);
  }

  openPage(page) {
    if (page.component == "Logout") {
      let prompt = this.alertCtrl.create({
        title: "Logout",
        message: "Are you sure ?",
        buttons: [
          {
            text: "Cancel",
            handler: data => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "oK",
            handler: data => {
              this.UpdateToken().then((res)=>{
                this.threeService.updateCustomer(res).subscribe(()=>{
                  console.log("Updated");
                  localStorage.removeItem("Mealdaay_customer");

                  this.nav.setRoot(ListPage);
    
                  this.pages = [];
                  this.pages.push(
                    { title: "All Caterers", component: ListPage },
                    { title: "Cart", component: CartPage },
                    { title: "About", component: InfoPage },
                    { title: "Login", component: LoginPage }
                  );
    
                  this.getCurrentPage();
                })
              })
              /*let currentCountryObj = JSON.parse(localStorage.getItem('currentCountry_Mealday'));
                        localStorage.clear();
                        localStorage.setItem('currentCountry_Mealday',JSON.stringify(currentCountryObj));
                        if (typeof this.orderdetails != 'undefined') {
                            localStorage.setItem('cartinfo',JSON.stringify(this.orderdetails));
                        }*/

             
            }
          }
        ]
      });
      prompt.present();
    } /* if(page.component == 'Login'){
            this.app.getActiveNav().push(LoginPage);
        }else*/ else {
      this.nav.setRoot(page.component);
    }
    this.getCurrentPage();
  }
  UpdateToken(){
    let that = this;
    return new Promise((resolve,reject)=>{
      FCMPlugin.getToken(function(token){
        let t = token;
        let id = JSON.parse(localStorage.getItem("Mealdaay_customer"))._id;
        that.threeService.getOneCustomer(id).subscribe((res)=>{
          let token = res.message.fcmToken;
          let newToken = [];
          for(let i = 0; i < token.length;i++){
            if(token[i] != t){
              newToken.push(token[i]);
            }
            if(i+1 == token.length){
              let res = {
                _id:id,
                fcmToken:newToken
              }
              resolve(res);
            }
          }
        })
      })
    })
  }
  getOrder(id) {
    this.ms4Service.getOneOrder(id).subscribe(data => {
      if (!data.error) {
        this.nav.setRoot(OrderDetailPage, {
          item: data.message,
          noti: "noti"
        });
      }
    });
  }
}
