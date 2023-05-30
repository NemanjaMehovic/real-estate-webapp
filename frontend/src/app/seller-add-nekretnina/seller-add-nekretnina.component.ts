import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Linija } from '../models/linija';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Opstina } from '../models/opstina';
import { Ulica } from '../models/ulica';
import { LinijaService } from '../services/linija.service';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';
import { UlicaService } from '../services/ulica.service';

@Component({
  selector: 'app-seller-add-nekretnina',
  templateUrl: './seller-add-nekretnina.component.html',
  styleUrls: ['./seller-add-nekretnina.component.css']
})
export class SellerAddNekretninaComponent implements OnInit {

  constructor(private router: Router, private linijaService: LinijaService, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private nekretninaService: NekretninaService, private ulicaService: UlicaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "S") {
      this.router.navigateByUrl("/");
      return;
    }
    this.linijaService.getAll().subscribe((tmp: Array<Linija>) => {
      this.linije = tmp;
    });
    this.loggedOutService.getRegisterData().subscribe((tmp: any) => {
      this.gradovi = tmp.gradovi;
    })
  }

  karakteristike: Array<String> = ["Terasa", "Podrum", "Internet", "Lodja", "Garaza", "Interfon",
    "Franc. balkon", "Sa bastom", "Telefon", "Lift", "Klima"];
  stanje: Array<String> = ["Izvorno", "Renovirano", "LUX"];
  grejanje: Array<String> = ["Cg", "Eg", "Ta", "Gas", "Podno", "Toplotne pumpe"];
  tip:Array<String> = ["Stan","Kuca","Vikendica","Lokal","Magacin"];
  linije: Array<Linija> = [];
  success: boolean = false;
  errors: Array<String> = [];
  files: Array<File> = [];
  gradovi: Array<Grad> = [];
  opstine: Array<Opstina> = [];
  mikrolokacije: Array<Mikrolokacija> = [];
  ulice: Array<Ulica> = [];

  gradId: String = "";
  opstinaId: String = "";
  mikrolokacijaId: String = "";
  ulicaId: String = "";

  changeEvent(event: any): void {
    this.files = [];
    for (let file of event.target.files)
      this.files.push(file);
  }

  gradIzabran(form: NgForm) {
    let gradId = parseInt(form.value.gradId);
    this.opstinaId = "";
    this.mikrolokacijaId = "";
    this.ulicaId = "";
    this.mikrolokacije = [];
    this.ulice = [];
    this.loggedOutService.getOpstine(gradId).subscribe((tmp: Array<Opstina>) => {
      this.opstine = tmp;
    });
  }

  opstinaIzabrana(form: NgForm) {
    let gradId = parseInt(form.value.gradId);
    let opstinaId = parseInt(form.value.opstinaId);
    this.mikrolokacijaId="";
    this.ulicaId="";
    this.ulice=[];
    this.mikrolokacijaService.getFromCity(gradId).subscribe((tmp: Array<Mikrolokacija>) => {
      this.mikrolokacije = [];
      for (let mikrolokacija of tmp)
        if (mikrolokacija.opstinaId.indexOf(opstinaId) != -1)
          this.mikrolokacije.push(mikrolokacija);
    });
  }

  mikrolokacijaIzabrana(form: NgForm) {
    let mikrolokacijaId = parseInt(form.value.mikrolokacijaId);
    this.ulicaId="";
    this.ulicaService.getAll().subscribe((tmp: Array<Ulica>) => {
      this.ulice = [];
      for (let ulica of tmp)
        if (ulica.mikrolokacijaId.indexOf(mikrolokacijaId) != -1)
          this.ulice.push(ulica);
    });
  }

  add(form: NgForm) {
    this.errors = [];
    this.success = false;
    let tmp = this.nekretninaService.add(this, form);
    if (tmp != null)
      tmp.subscribe((tmp: any) => {
        if (tmp.errors != null) {
          this.errors.push(tmp.errors);
          return;
        }
        this.success = true;
      });
  }

}
