import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router} from '@angular/router';
import { environment} from '../../environments/environment'

export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
    user=new BehaviorSubject<User>(null);
    expiryTimer:any;

    constructor(private http:HttpClient,
        private router:Router){}

    onSignUp(email:string,password:string){
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +environment.webAPIKey,{
            'email':email,
            'password':password,
            returnSecureToken:true
        }).pipe(catchError(this.errorHandler),
        tap(resData=>{
            
            this.authenticationHandler(
                resData.email,
                resData.localId,
                resData.idToken, 
                +resData.expiresIn)
        }));
    }

    
    onLogin(email:string,password:string){
       return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +environment.webAPIKey,{
            'email':email,
            'password':password,
            returnSecureToken:true
        }).pipe(catchError(this.errorHandler),
        tap(resData=>{
            this.authenticationHandler(
                resData.email,
                resData.localId,
                resData.idToken, 
                +resData.expiresIn)
        }));
    }

    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData)
        return;
        const loadedUser=new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));

            if(loadedUser.token){
                const tokenExpiryTime=(new Date(userData._tokenExpirationDate).getTime()-new Date().getTime());
                this.autoLogOut(tokenExpiryTime);
                this.user.next(loadedUser);
            }
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expiryTimer){
            clearTimeout(this.expiryTimer);
        }
        this.expiryTimer=null;
    }
    autoLogOut(expiryDuration:number){
        this.expiryTimer=setTimeout(()=>{
            this.logOut()},
            expiryDuration);
    }

    private authenticationHandler(email:string,localId:string,idToken:string,expiresIn:number){
        const expiryDate=new Date(new Date().getTime()+ expiresIn*1000);
            const user= new User(email,localId,idToken,expiryDate);
            this.user.next(user);
            this.autoLogOut(expiresIn*1000);
            localStorage.setItem('userData',JSON.stringify(user));
    }
    private errorHandler(errorRes:HttpErrorResponse){
        let errorMessage='An error occured';
            if(!errorRes.error||!errorRes.error.error){
                return throwError(errorMessage);
            }
                switch(errorRes.error.error.message){
                    case 'EMAIL EXISTS':
                        errorMessage='This email already used';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage='Email not found, please sign up';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage='wrong password';
                }
                return throwError(errorMessage);
    }
}
