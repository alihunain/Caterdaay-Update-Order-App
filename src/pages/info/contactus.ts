import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MS3Service } from '../../app/service/index';
import { CartPage } from '../cart/cart';

/**
* Generated class for the ContactUsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-contactus',
    templateUrl: 'contactus.html',
})
export class ContactUsPage {

    contactForm :FormGroup;
    emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ms3: MS3Service,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private lf: FormBuilder,
        public alertCtrl: AlertController,
        // public callNumber:CallNumber
        ) {
        this.contactForm = this.lf.group({
            name: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            message: ['', Validators.required]
        });
    }

    ionViewDidLoad() {
    }

    getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }

    addMessage(){
       
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.ms3.sendQuery(this.contactForm.value).subscribe((data)=>{
            loading.dismiss();
            if (!data.error) {
                this.getToast("You message has been sent. Our team will contact you shorlty.");
                this.navCtrl.pop();
            }else{
                this.getToast('Unable to submmit request. Please try later.');
            }
        },(err)=>{
            this.getToast('Unable to submmit request. Please check your Internet connection.');
        });
    }

    cartPage(){
        this.navCtrl.push(CartPage);
    }
    callNow(){
        console.log("here");
        let confirm = this.alertCtrl.create({
            title: 'Call Now ' ,
            message: 'Caterdaay Help no 647-226-7862',
            buttons: [
            {
                text: 'Cancel',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },
            {
                text: 'Ok',
                handler: () => {
                    document.getElementById("hide").click();
                }
            }
            ]
        });
        confirm.present();
    }
}
