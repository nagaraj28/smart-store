import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private loginService:LoginService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }
  login():void{
    this.loginService.login(this.loginForm.value).subscribe(
      (data:any)=>{
        if(data.status==="success"){
          localStorage.setItem("x-auth-token",data.token);
        }
      },
      (err:any)=>{
        console.log("error logging in",err);
      }
    );
  }
}
