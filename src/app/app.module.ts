import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './screens/home/home.component';
import { FeaturedbrandsComponent } from './screens/home/featuredbrands/featuredbrands.component';
import { FeaturedcategoriesComponent } from './screens/home/featuredcategories/featuredcategories.component';
import { TodaydealsComponent } from './screens/home/todaydeals/todaydeals.component';
import { HomepagecoverComponent } from './screens/home/homepagecover/homepagecover.component';
import { ProductdetailsComponent } from './screens/product-details/productdetails/productdetails.component';
import { ProductlistingComponent } from './screens/products/productlisting/productlisting.component';
import { ProductlistingcontainerComponent } from './screens/products/productlistingcontainer/productlistingcontainer.component';
import { ProductcardComponent } from './screens/products/productcard/productcard.component';
import { FiltersComponent } from './screens/products/filters/filters.component';
import { HttpClientModule } from '@angular/common/http';
import { CartcontainerComponent } from './screens/cart/cartcontainer/cartcontainer.component';
import { CartlistComponent } from './screens/cart/cartcontainer/cartlist/cartlist.component';
import { CartitemComponent } from './screens/cart/cartcontainer/cartlist/cartitem/cartitem.component';
import { PricedetailsComponent } from './screens/cart/cartcontainer/pricedetails/pricedetails.component';
import { WishlistComponent } from './screens/wishlist/wishlist.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { ProfileModule } from './screens/profile/profile.module';
import { DeliveryaddressComponent } from './screens/cart/cartcontainer/cartlist/deliveryaddress/deliveryaddress.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeaturedbrandsComponent,
    FeaturedcategoriesComponent,
    TodaydealsComponent,
    HomepagecoverComponent,
    ProductdetailsComponent,
    ProductlistingComponent,
    ProductlistingcontainerComponent,
    ProductcardComponent,
    FiltersComponent,
    CartcontainerComponent,
    CartlistComponent,
    CartitemComponent,
    PricedetailsComponent,
    WishlistComponent,
    DeliveryaddressComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
