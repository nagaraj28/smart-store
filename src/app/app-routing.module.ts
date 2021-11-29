import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductdetailsComponent } from './screens/product-details/productdetails/productdetails.component';
import { HomeComponent } from './screens/home/home.component';
import { ProductlistingcontainerComponent } from './screens/products/productlistingcontainer/productlistingcontainer.component';
const routes: Routes = [
  
  {
    path:"",component:HomeComponent
  },
  {
  path:"products",component:ProductlistingcontainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
