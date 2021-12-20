import { Component, OnInit } from '@angular/core';
import { CartlistService } from '../../cart/cartcontainer/cartlist/cartlist.service';
import { LoginService } from '../../login/login.service';
import { WishlistService } from '../../wishlist/wishlist.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  loggedUser !: any;
  constructor(private loginService:LoginService,private cartListService:CartlistService,private wishListService:WishlistService) { }

  ngOnInit(): void {
  }
  ngDoCheck(){
    if(this.loggedUser!==this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
    }
  }
   logout():void{
    this.loginService.logout();
    this.cartListService.clearCartSize();
    this.wishListService.clearWishlistSize();
  }
}
