import { UserlistComponent } from './components/userlist/userlist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './components/login/login.service';


const routes: Routes = [
  {path:'',component:ShopSearchComponent},
  {path:'userlist',component:UserlistComponent, canActivate: [LoginService]},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
