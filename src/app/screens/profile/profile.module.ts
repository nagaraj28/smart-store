import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressComponent } from './addresses/address/address.component';
import { AddressformdialogComponent } from './addresses/addressformdialog/addressformdialog.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileComponent,
    AddressesComponent,
    ProfileDetailsComponent,
    AddressComponent,
    AddressformdialogComponent,
    OrdersComponent,
    OrderComponent,
  ],
  imports: [
    
    ProfileRoutingModule,
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
