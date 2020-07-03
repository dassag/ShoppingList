import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate{

    constructor(
        private auth:AuthService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('In canActivate:')
        return this.auth.user.pipe(map(userData=>{
            return !!userData;
        }))
    }
    
}