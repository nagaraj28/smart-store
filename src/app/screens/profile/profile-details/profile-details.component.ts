import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  loggedUser !: any;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  ngDoCheck(){
    if(this.loggedUser!==this.loginService.loggedUserDetails){
      this.loggedUser = this.loginService.loggedUserDetails;
    }
  }
}
