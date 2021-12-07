import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { ProductlistingcontainerComponent } from './screens/products/productlistingcontainer/productlistingcontainer.component';
import { ProductdetailsComponent } from './screens/product-details/productdetails/productdetails.component';
import { CartcontainerComponent } from './screens/cart/cartcontainer/cartcontainer.component';
import { WishlistComponent } from './screens/wishlist/wishlist.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { ProfileModule } from './screens/profile/profile.module';


const routes: Routes = [
  
  {
    path:"",component:HomeComponent
     },
  {
  path:"products",component:ProductlistingcontainerComponent
   },
  {
    path:"productdetail",component:ProductdetailsComponent
    },
    {
      path:"cart",component:CartcontainerComponent
     },
     {
      path:"wishlist",component:WishlistComponent
     },
     {
      path:"profile",loadChildren:()=>import('./screens/profile/profile.module').then(m=>m.ProfileModule)
     },
     {
      path:"products/:productid",component:ProductdetailsComponent
     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
