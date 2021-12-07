import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
     {
      path:"",component:ProfileComponent,
      children:[
          {
              path:'',component:ProfileDetailsComponent
          },
          {
              path:'addresses',component:AddressesComponent
          },
          {
              path:'orders',component:OrdersComponent
          }
      ]
     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
