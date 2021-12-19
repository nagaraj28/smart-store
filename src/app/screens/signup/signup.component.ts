import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm!:FormGroup;
  error!:string;
  succMessage!:string;
  constructor(private formBuilder:FormBuilder,private loginService:LoginService) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      password1:['',Validators.required]
    });
  }

  register():void{
    this.succMessage="";
    this.error="";
    this.loginService.register(this.registerForm).subscribe(
      (data:any)=>{
        console.log("registration success");
        if(data.status==="success"){
          this.succMessage = "registration success!"
        }
        else{
          if(data.message)
          this.error = data.message;
        }
      },
      (err:any)=>{
        console.log("error in registering",err);
      }
    );
  }
}
