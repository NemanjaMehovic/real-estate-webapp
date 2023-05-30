import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal == null) {
      this.adminLoggedIn = this.buyerLoggedIn = this.sellerLoggedIn = false;
      return;
    }
    this.adminLoggedIn = tmpVal == "A";
    this.buyerLoggedIn = tmpVal == "B";
    this.sellerLoggedIn = tmpVal == "S";
  }

  registerButtonPressed(): void {
    this.router.navigateByUrl("register");
  }

  logInButtonPressed(): void {
    this.router.navigateByUrl("");
  }

  logOutButtonPressed(): void {
    sessionStorage.clear();
    this.router.navigateByUrl("");
  }

  adminLoggedIn: boolean = false;
  buyerLoggedIn: boolean = false;
  sellerLoggedIn: boolean = false;

}
