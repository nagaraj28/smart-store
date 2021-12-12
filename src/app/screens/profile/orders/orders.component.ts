import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService:OrdersService,private loginService:LoginService) { }
  allOrders!:any;
  loggedUser!:any;
  ngOnInit(): void {
  }
  ngDoCheck(){
    if(this.loggedUser!==this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
      if(this.loggedUser?.userid)
      this.getAllOrders(this.loggedUser.userid);
    }
  }
  getAllOrders(userid:string){
    this.ordersService.getAllOrders(userid).subscribe((data:any)=>{
        // console.log(data.data);
        if(data.data!==null)
        this.allOrders = data.data.orderedProducts;
    },
    (err:any)=>{
      console.log("error fetching data");
    });
  }
}
