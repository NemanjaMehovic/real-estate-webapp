import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("LoggedIn") == null)
      this.router.navigateByUrl("/");
  }

  changePasswordButtonPressed(form: NgForm): void {
    this.errors = [];
    let request = this.service.changePassword(this, form);
    if (request != null)
      request.subscribe((korisnik: any) => {
        if (korisnik) {
          if (korisnik.errors != null)
            this.errors.push(korisnik.errors);
        }
        else
          this.errors.push("Server error");
        if (this.errors.length == 0) {
            sessionStorage.clear();
            this.ngOnInit();
        }
      });
  }

  errors: Array<String> = [];
}
