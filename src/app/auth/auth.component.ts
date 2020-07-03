import { Component } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { ignoreElements } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector:'auth-component',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    isLogin=true;
    isLoading=false;
    error:string=null;

    constructor(private authService:AuthService,
        private route:Router){}

    inSwitchMod(){
        this.isLogin=!this.isLogin;
    }
    onSubmit(form:NgForm){
       const email=form.value.email;
       const password=form.value.password;
       let authObser:Observable<AuthResponseData>;

       this.isLoading=true;
       if(this.isLogin){
       authObser= this.authService.onLogin(email,password);
       }
       else{
       authObser= this.authService.onSignUp(email,password);
       }

       authObser.subscribe(response=>{
        console.log(response)
        this.isLoading=false;
        this.route.navigate(['/recipes']);
    },
    errorMessage=>{
        //not a good practice to put all code in component
        console.log(errorMessage)
        this.isLoading=false;
        this.error=errorMessage;
    });
        form.reset();
    }

}