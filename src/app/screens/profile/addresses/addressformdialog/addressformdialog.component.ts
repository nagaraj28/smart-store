import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';

@Component({
  selector: 'app-addressformdialog',
  templateUrl: './addressformdialog.component.html',
  styleUrls: ['./addressformdialog.component.css']
})
export class AddressformdialogComponent implements OnInit {

  isDialogOpen:boolean=false;
  constructor(private addressesService:AddressesService) { }
  title!:string;
  ngOnInit(): void {
    this.isDialogOpen = this.addressesService.isDialogOpen;
    this.title = this.addressesService.dialogBoxTitle;
  }
  ngDoCheck():void{
    this.isDialogOpen = this.addressesService.isDialogOpen;
    this.title = this.addressesService.dialogBoxTitle;
  }
  closeDialog(){
    this.addressesService.closeDialog();
  }
}
