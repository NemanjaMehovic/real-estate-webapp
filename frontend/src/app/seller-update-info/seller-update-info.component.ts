import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Korisnik } from '../models/korisnik';
import { LoggedOutService } from '../services/logged-out.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-seller-update-info',
  templateUrl: './seller-update-info.component.html',
  styleUrls: ['./seller-update-info.component.css']
})
export class SellerUpdateInfoComponent implements OnInit {

  constructor(private router: Router, private service: LoggedOutService, private userService: UserService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "S") {
      this.router.navigateByUrl("/");
      return;
    }
    this.service.getRegisterData().subscribe((data: any) => {
      this.agencije = data.agencije;
    });
    this.userService.getAll().subscribe((tmp: Array<Korisnik>) => {
      for (let k of tmp)
        if (k.username == sessionStorage.getItem("Username")) {
          this.agencijaId = k.agencijaID.toString();
          this.oldEmail = this.email = k.email;
          this.tel = k.telefon;
          break;
        }
    })
  }

  agencije: Array<Agencija> = [];
  email: String = "";
  tel: String = "";
  agencijaId: String = "";
  oldEmail: String = "";
  errors: Array<String> = [];
  success: Boolean = false;

  updateUser(form: NgForm) {
    this.errors = [];
    this.success = false;
    let tmp = this.userService.updateSeller(this, form);
    if (tmp != null)
      tmp.subscribe((tmp: any) => {
        if (tmp) {
          if (tmp.errors != null)
            this.errors.push(tmp.errors);
        }
        else
          this.errors.push("Server error");
        if (this.errors.length == 0)
          this.success = true;
      });
  }
}
