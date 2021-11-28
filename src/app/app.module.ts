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
import { ProductlistingComponent } from './screens/productlisting/productlisting.component';
import { ProductlistingcontainerComponent } from './screens/productlistingcontainer/productlistingcontainer.component';




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
    ProductlistingcontainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
