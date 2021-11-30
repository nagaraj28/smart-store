import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { ProductlistingcontainerComponent } from './screens/products/productlistingcontainer/productlistingcontainer.component';
import { ProductdetailsComponent } from './screens/product-details/productdetails/productdetails.component';
import { CartcontainerComponent } from './screens/cart/cartcontainer/cartcontainer.component';
import { WishlistComponent } from './screens/wishlist/wishlist.component';
import { ProfileComponent } from './screens/profile/profile.component';


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
      path:"profile",component:ProfileComponent
     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
