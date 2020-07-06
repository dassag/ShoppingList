import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
{path:'',redirectTo:'/recipes',pathMatch:'full',canActivate:[AuthGuardService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
