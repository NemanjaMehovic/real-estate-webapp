import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "A") {
      this.router.navigateByUrl("/");
      return;
    }
    this.service.getAllUnapprovedUsers().subscribe((tmp: Array<Korisnik>) => {
      this.users = tmp;
    });
  }


  users: Array<Korisnik> = [];

  updateUserStatus(tmpUser:Korisnik,value:String){
      this.service.updateUserStatus(tmpUser,value).subscribe((tmp)=>{
        this.ngOnInit();
      });
  }

}
