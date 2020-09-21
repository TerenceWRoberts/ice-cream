import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';


const routes: Routes = [
  {path:'',component:ShopSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
