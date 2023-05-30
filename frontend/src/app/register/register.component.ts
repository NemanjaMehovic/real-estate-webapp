import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Grad } from '../models/grad';
import { Korisnik } from '../models/korisnik';
import { LoggedOutService } from '../services/logged-out.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: LoggedOutService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (this.byAdmin) {
      if (tmpVal != "A") {
        this.router.navigateByUrl("/");
        return;
      }
      this.service.getRegisterData().subscribe((data: any) => {
        this.gradovi = data.gradovi;
        this.agencije = data.agencije;
      });
    }
    else {
      if (tmpVal == "A")
        this.router.navigateByUrl("admin");
      else if (tmpVal == "S")
        this.router.navigateByUrl("seller");
      else if (tmpVal == "B")
        this.router.navigateByUrl("buyer");
      else
        this.service.getRegisterData().subscribe((data: any) => {
          this.gradovi = data.gradovi;
          this.agencije = data.agencije;
        });
    }
  }

  @Input() byAdmin: boolean = false;
  gradovi: Array<Grad> = [];
  agencije: Array<Agencija> = [];
  tip: String = "B";
  success: boolean = false;
  captcha: String = "";
  file: File = null;



  registerButtonPressed(form: NgForm): void {
    this.errors = [];
    this.success = false;
    this.service.register(this, form, this.file);
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

  resolved(captchaResponse: String): void {
    this.captcha = captchaResponse;
  }

  changeEvent(event: any): void {
    this.file = event.target.files[0];
  }

  errors: Array<String> = [];

}
