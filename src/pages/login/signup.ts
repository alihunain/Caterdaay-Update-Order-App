import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { MS3Service, MS6Service } from '../../app/service/index';

/*import { LoginPage } from './login';*/

/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'page-login',
    templateUrl: 'signup.html',
})

export class SignupPage {

    signupForm: FormGroup;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passMatch : boolean = true;
    passwordp : any;


    formErrors = {
        'password': ''
    };

    validationMessages = {
        'password': {
            'required': 'Password is required.'
        }
    };


    constructor(
        private lf: FormBuilder,
        public navCtrl: NavController,
        public ms3Service: MS3Service,
        public ms6Service: MS6Service,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController
        ) {
        this.signupForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: [''],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', Validators.required],
            confirmpassword: ['', Validators.required],
        });

        this.ms6Service.getComplexity().subscribe(data => {
            if (!data.error) {
                this.passwordp = data.message[0].ownerpasscomplexity.regex;
                this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);
                this.signupForm.valueChanges.subscribe(data => this.onValueChanged(data));
                this.onValueChanged();
            }
        });
    }


    public onValueChanged(data?: any) {

        if (!this.signupForm) { return; }
        const form = this.signupForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    setpasswordmessage(name) {
        if (name == 'simplepassword') {
            this.validationMessages.password['pattern'] = 'Password must contain min 8 Digits alphanumeric only';
        }

        if (name == 'medium') {
            this.validationMessages.password['pattern'] = 'TBD';
        }

        if (name == 'complex') {
            this.validationMessages.password['pattern'] = 'TBD';
        }

        if (name == 'none') {
            this.validationMessages.password['pattern'] = '';
        }
    }

    ionViewDidLoad() {
    }

    iconImage(){
        return 'assets/imgs/MealDaay-small.png'
    }

    signup(){

        this.signupForm.controls['username'].setValue(this.signupForm.controls['email'].value);

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();

        if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmpassword'].value) {
            this.passMatch = false;
            loading.dismiss();
        }else{
            this.passMatch = true;
            this.ms3Service.addCustomer(this.signupForm.value).subscribe((data)=>{
                console.log("data => ",data);
                if (!data.error) {
                    loading.dismiss();
                    this.getToast(data.message + '\n . Please Activate your Account.')
                    this.loginPage();
                }else {
                    loading.dismiss();
                    this.getToast('Email ID already in use')
                }
            },(err)=>{
                loading.dismiss();
                this.getToast('Error Occured! Please check your Internet connection.')
            });
        }
    }

    private getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }

    loginPage(){
        this.navCtrl.pop();
    }
}
