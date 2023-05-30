import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Grad } from '../models/grad';
import { AgencyService } from '../services/agency.service';
import { LoggedOutService } from '../services/logged-out.service';

@Component({
  selector: 'app-admin-add-agencija',
  templateUrl: './admin-add-agencija.component.html',
  styleUrls: ['./admin-add-agencija.component.css']
})
export class AdminAddAgencijaComponent implements OnInit {

  constructor(private router: Router, private loggedOutService: LoggedOutService, private agencyServes: AgencyService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "A") {
      this.router.navigateByUrl("/");
      return;
    }
    this.loggedOutService.getRegisterData().subscribe((data: any) => {
      this.gradovi = data.gradovi;
    });
  }


  gradovi: Array<Grad> = [];
  success: boolean = false;

  addButtonPressed(form: NgForm): void {
    this.errors = [];
    this.success = false;
    let tmp = this.agencyServes.addAgency(this, form);
    if (tmp != null)
      tmp.subscribe((tmpAnsw: any) => {
        if (tmpAnsw.errors != null) {
          this.errors.push(tmpAnsw.errors);
        }
        else
          this.success = true;
      });
  }

  errors: Array<String> = [];
}
