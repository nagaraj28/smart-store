import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm!:FormGroup;
  constructor(private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      password1:['',Validators.required]
    });
  }

  register():void{
    console.log(this.registerForm.value);
  }

}
