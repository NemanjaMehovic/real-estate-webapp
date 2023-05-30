import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Korisnik } from '../models/korisnik';
import { LoggedOutService } from '../services/logged-out.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private router: Router, private service: LoggedOutService, private userService: UserService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "A") {
      this.router.navigateByUrl("/");
      return;
    }
    this.service.getRegisterData().subscribe((data: any) => {
      this.gradovi = data.gradovi;
    });
    this.userService.getAll().subscribe((tmp: Array<Korisnik>) => {
      for (let tmpUser of tmp)
        if (tmpUser.tip != "A")
          this.users.push(tmpUser);
    });
  }


  gradovi: Array<Grad> = [];
  users: Array<Korisnik> = [];
  success: Boolean = false;
  file: File = null;

  email: String = "";
  sifra: String = "";
  sifraP: String = "";
  username: String = "";
  ime: String = "";
  prezime: String = "";
  tel: String = "";
  gradId: String = "";

  userIzabran(form: NgForm) {
    let oldUsername = form.value.oldUsername;
    for (let user of this.users)
      if (user.username == oldUsername) {
        this.email = user.email;
        this.sifra = this.sifraP = user.sifra;
        this.username = oldUsername;
        this.ime = user.ime;
        this.prezime = user.prezime;
        this.tel = user.telefon;
        this.gradId = user.gradID.toString();
        break;
      }
  }


  callBack(postRequest: any): void {
    postRequest.subscribe((korisnik: any) => {
      if (korisnik) {
        if (korisnik.errors != null)
          this.errors.push(korisnik.errors);
      }
      else
        this.errors.push("Server error");
      if (this.errors.length == 0) {
        this.success = true;
      }
    });
  }

  updateUser(form: NgForm) {
    this.errors = [];
    this.success = false;
    this.userService.updateUser(this, form);
  }

  changeEvent(event: any): void {
    this.file = event.target.files[0];
  }

  errors: Array<String> = [];
}
