import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Linija } from '../models/linija';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Nekretnina } from '../models/nekretnina';
import { Opstina } from '../models/opstina';
import { Ulica } from '../models/ulica';
import { LinijaService } from '../services/linija.service';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';
import { UlicaService } from '../services/ulica.service';

@Component({
  selector: 'app-seller-update-nekretnina',
  templateUrl: './seller-update-nekretnina.component.html',
  styleUrls: ['./seller-update-nekretnina.component.css']
})
export class SellerUpdateNekretninaComponent implements OnInit {

  constructor(private router: Router, private linijaService: LinijaService, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private nekretninaService: NekretninaService, private ulicaService: UlicaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    let seller = sessionStorage.getItem("Seller");
    if (tmpVal != "S" || seller != sessionStorage.getItem("Username")) {
      this.router.navigateByUrl("/");
      return;
    }
    this.linijaService.getAll().subscribe((tmp: Array<Linija>) => {
      this.linije = tmp;
    });
    this.loggedOutService.getRegisterData().subscribe((tmp: any) => {
      this.gradovi = tmp.gradovi;
    });
    let id = parseInt(sessionStorage.getItem("Nekretnina"));
    this.nekretninaService.getAll().subscribe((tmp: Array<Nekretnina>) => {
      let nekretnina: Nekretnina = null;
      for (let tmpN of tmp)
        if (tmpN.id == id) {
          nekretnina = tmpN;
          break;
        }
      this.name = nekretnina.ime;
      this.karakteristikeI = nekretnina.karakteristike;
      this.gradskiPrevoz = nekretnina.gradskiPrevoz;
      this.tip = nekretnina.tip;
      this.kvadratura = nekretnina.kvadratura;
      this.brojSoba = nekretnina.brojSoba;
      this.cena = nekretnina.cena;
      this.godinaIzd = nekretnina.godinaIzd.toString() + "-01-01";
      this.stanjeI = nekretnina.stanje;
      this.tipGrejanja = nekretnina.tipGrejanja;
      this.sprat = nekretnina.sprat;
      this.maxSprat = nekretnina.maxSprat;
      this.parking = nekretnina.parking;
      this.opis = nekretnina.opis;
      this.mesecnaCena = nekretnina.mesecnaCena;
      this.gradId = nekretnina.gradId.toString();
      this.opstinaId = nekretnina.opstinaId.toString();
      this.mikrolokacijaId = nekretnina.mikrolokacijaId.toString();
      this.ulicaId = nekretnina.ulicaId.toString();

      this.loggedOutService.getOpstine(parseInt(this.gradId.toString())).subscribe((tmp: Array<Opstina>) => {
        this.opstine = tmp;
        this.mikrolokacijaService.getFromCity(parseInt(this.gradId.toString())).subscribe((tmp: Array<Mikrolokacija>) => {
          this.mikrolokacije = [];
          for (let mikrolokacija of tmp)
            if (mikrolokacija.opstinaId.indexOf(parseInt(this.opstinaId.toString())) != -1)
              this.mikrolokacije.push(mikrolokacija);
          this.ulicaService.getAll().subscribe((tmp: Array<Ulica>) => {
            this.ulice = [];
            for (let ulica of tmp)
              if (ulica.mikrolokacijaId.indexOf(parseInt(this.mikrolokacijaId.toString())) != -1)
                this.ulice.push(ulica);
          });
        });
      });
    });
  }

  karakteristike: Array<String> = ["Terasa", "Podrum", "Internet", "Lodja", "Garaza", "Interfon",
    "Franc. balkon", "Sa bastom", "Telefon", "Lift", "Klima"];
  stanje: Array<String> = ["Izvorno", "Renovirano", "LUX"];
  grejanje: Array<String> = ["Cg", "Eg", "Ta", "Gas", "Podno", "Toplotne pumpe"];
  tipN:Array<String> = ["Stan","Kuca","Vikendica","Lokal","Magacin"];
  linije: Array<Linija> = [];
  errors: Array<String> = [];
  files: Array<File> = [];
  gradovi: Array<Grad> = [];
  opstine: Array<Opstina> = [];
  mikrolokacije: Array<Mikrolokacija> = [];
  ulice: Array<Ulica> = [];

  name: String = "";
  gradId: String = "";
  opstinaId: String = "";
  mikrolokacijaId: String = "";
  ulicaId: String = "";
  karakteristikeI: Array<String> = [];
  gradskiPrevoz: Array<String> = [];
  tip: String = "";
  kvadratura: Number = null;
  brojSoba: Number = null;
  cena: Number = null;
  godinaIzd: String = "";
  stanjeI: String = "";
  tipGrejanja: String = "";
  sprat: Number = null;
  maxSprat: Number = null;
  parking: Boolean = false;
  opis: String = "";
  mesecnaCena: Number = null;

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
    this.mikrolokacijaId = "";
    this.ulicaId = "";
    this.ulice = [];
    this.mikrolokacijaService.getFromCity(gradId).subscribe((tmp: Array<Mikrolokacija>) => {
      this.mikrolokacije = [];
      for (let mikrolokacija of tmp)
        if (mikrolokacija.opstinaId.indexOf(opstinaId) != -1)
          this.mikrolokacije.push(mikrolokacija);
    });
  }

  mikrolokacijaIzabrana(form: NgForm) {
    let mikrolokacijaId = parseInt(form.value.mikrolokacijaId);
    this.ulicaId = "";
    this.ulicaService.getAll().subscribe((tmp: Array<Ulica>) => {
      this.ulice = [];
      for (let ulica of tmp)
        if (ulica.mikrolokacijaId.indexOf(mikrolokacijaId) != -1)
          this.ulice.push(ulica);
    });
  }

  update(form: NgForm) {
    this.errors = [];
    let tmp = this.nekretninaService.update(this, form, parseInt(sessionStorage.getItem("Nekretnina")));
    if (tmp != null)
      tmp.subscribe((tmp: any) => {
        if (tmp.errors != null) {
          this.errors.push(tmp.errors);
          return;
        }
        this.router.navigateByUrl("/");
      });
  }
}
