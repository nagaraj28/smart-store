import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService:OrdersService) { }
  allOrders!:any;
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders(){
    this.ordersService.getAllOrders().subscribe((data:any)=>{
        // console.log(data.data);
        if(data.data!==null)
        this.allOrders = data.data.orderedProducts;

    },
    (err:any)=>{
      console.log("error fetching data");
    });
  }

}
