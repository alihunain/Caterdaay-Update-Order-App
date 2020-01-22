import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { MS3Service } from '../../app/service/index';

/*import { LoginPage } from './login';*/

@Component({
    selector: 'page-login',
    templateUrl: 'forgetpassword.html',
})
export class ForgetPasswordPage {

    forgetForm: FormGroup;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    constructor(
        private lf: FormBuilder,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public ms3Service: MS3Service
        ) {
        this.forgetForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
        });
    }

    ionViewDidLoad() {
    }

    iconImage(){
        return 'assets/imgs/MealDaay-small.png'
    }

    loginPage(){
        this.navCtrl.pop();
    }

    forgetPass(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        
        this.ms3Service.forgetPasswordCustomer(this.forgetForm.value).subscribe((data)=>{
            console.log("data => ",data);
            if (!data.error) {
                loading.dismiss();
                this.getToast('Email sent Successfully. Please check your Email ID');
                this.loginPage();
            }else {
                loading.dismiss();
                this.getToast(data.message)
            }
        },(err)=>{
            loading.dismiss();
            this.getToast('Error Occured! Please check your Internet connection.')
        });
    }

    private getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }
}
