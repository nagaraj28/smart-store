import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CartlistService } from '../cart/cartcontainer/cartlist/cartlist.service';
import { ProductsService } from '../products/productcard/products.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  error!:string;
  constructor(private formBuilder:FormBuilder,private loginService:LoginService,private router:Router,private cartListService:CartlistService,
    private wishListService:WishlistService,private productsService:ProductsService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }
  login():void{
    this.error = "";
    this.loginService.login(this.loginForm.value).subscribe(
      (data:any)=>{
        console.log(this.error);
        if(data.status==="success"){
          localStorage.setItem("x-auth-token",data.token);
          let appComponent = new AppComponent(this.cartListService,this.wishListService,this.productsService,this.router,this.loginService);
          appComponent.performTokenValidation(data.token);
          this.router.navigate(['/']);
        }
        else{
          if(data.message)
          this.error = data.message;
          else
          this.error = data.errorMessage;
        }
      },
      (err:any)=>{
        this.error = "some error occured,please try again!"
        console.log("error logging in",err);
      }
    );
  }
}
