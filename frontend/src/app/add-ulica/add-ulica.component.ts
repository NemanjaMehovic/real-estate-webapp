import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Mikrolokacija } from '../models/mikrolokacija';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { UlicaService } from '../services/ulica.service';

@Component({
  selector: 'app-add-ulica',
  templateUrl: './add-ulica.component.html',
  styleUrls: ['./add-ulica.component.css']
})
export class AddUlicaComponent implements OnInit {

  constructor(private router: Router, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private ulicaService: UlicaService) { }

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
  mikrolokacije: Array<Mikrolokacija> = [];
  success: boolean = false;
  mikrolokacijaId: Array<String> = [];

  gradIzabran(form: NgForm) {
    let id = parseInt(form.value.gradId);
    this.mikrolokacijaId = []
    this.mikrolokacijaService.getFromCity(id).subscribe((tmp: Array<Mikrolokacija>) => {
      if (tmp != null)
        this.mikrolokacije = tmp;
    })
  }

  addButtonPressed(form: NgForm) {
    this.success = false;
    this.errors = [];
    let tmp = this.ulicaService.add(this, form);
    if (tmp != null)
      tmp.subscribe((tmp: any) => {
        if (tmp.errors != null)
          this.errors.push(tmp.errors);
        else
          this.success = true;
      });
  }

  errors: Array<String> = [];
}
