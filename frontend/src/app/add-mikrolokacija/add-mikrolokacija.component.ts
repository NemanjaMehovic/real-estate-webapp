import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Opstina } from '../models/opstina';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';

@Component({
  selector: 'app-add-mikrolokacija',
  templateUrl: './add-mikrolokacija.component.html',
  styleUrls: ['./add-mikrolokacija.component.css']
})
export class AddMikrolokacijaComponent implements OnInit {

  constructor(private router: Router, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService) { }

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
  opstine: Array<Opstina> = [];
  success: boolean = false;
  opstinaId: Array<String> = [];

  gradIzabran(form: NgForm) {
    let id = parseInt(form.value.gradId)
    this.opstinaId = [];
    this.loggedOutService.getOpstine(id).subscribe((tmp: Array<Opstina>) => {
      if (tmp != null)
        this.opstine = tmp;
    })
  }

  addButtonPressed(form: NgForm) {
    this.success = false;
    this.errors = [];
    let tmp = this.mikrolokacijaService.add(this, form);
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
