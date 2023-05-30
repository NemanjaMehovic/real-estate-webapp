import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { LoggedOutService } from '../services/logged-out.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: LoggedOutService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal == "A")
      this.router.navigateByUrl("admin");
    else if (tmpVal == "S")
      this.router.navigateByUrl("seller");
    else if (tmpVal == "B")
      this.router.navigateByUrl("buyer");
  }

  username: String = "";
  sifra: String = "";

  logIn(): void {
    this.errors = [];
    if (this.username == "" || this.sifra == "") {
      this.errors.push("All fields are mandatory");
      return;
    }
    let korisnikTmp = new Korisnik();
    korisnikTmp.username = this.username;
    korisnikTmp.sifra = this.sifra;
    this.service.logIn(korisnikTmp).subscribe((korisnik: Korisnik) => {
      if (korisnik) {
        if (korisnik.username == "")
          this.errors.push("Username not found");
        else if (korisnik.sifra == "")
          this.errors.push("Wrong password");
        else if(korisnik.odobren == "P")
          this.errors.push("User still not approved");
        else if(korisnik.odobren == "B")
          this.errors.push("User blocked");
      }
      else
        this.errors.push("Server error");
      if (this.errors.length == 0) {
        sessionStorage.setItem("LoggedIn", korisnik.tip.toString());
        sessionStorage.setItem("Username", korisnik.username.toString());
        this.ngOnInit();
      }
    });
  }

  errors: Array<String> = [];

}
