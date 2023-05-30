import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Nekretnina } from '../models/nekretnina';
import { Opstina } from '../models/opstina';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';
import { UlicaService } from '../services/ulica.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private router: Router, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private nekretninaService: NekretninaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "B") {
      this.router.navigateByUrl("/");
      return;
    }
    this.loggedOutService.getRegisterData().subscribe((tmp: any) => {
      this.gradovi = tmp.gradovi;
      this.opstine = tmp.opstine;
    });
    this.mikrolokacijaService.getAll().subscribe((tmp: Array<Mikrolokacija>) => {
      this.mikrolokacije = tmp;
    });
    this.nekretninaService.getAll().subscribe((tmp: Array<Nekretnina>) => {
      for (let n of tmp)
        if (!n.prodato)
          this.sveNekretnine.push(n);
    });
  }

  tip: Array<String> = ["Stan", "Kuca", "Vikendica", "Lokal", "Magacin"];
  brojSobaMin: Array<String> = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5+"];
  gradovi: Array<Grad> = [];
  opstine: Array<Opstina> = [];
  mikrolokacije: Array<Mikrolokacija> = [];
  sveNekretnine: Array<Nekretnina> = [];
  filtriraneNekretnine: Array<Nekretnina> = [];
  errors: Array<String> = [];


  currPageNum: Number = 0;
  maxPages: Number = 0;
  displayNekretnine: Array<Nekretnina> = [];


  search(form: NgForm) {
    this.errors = [];
    if (!form.valid)
      this.errors.push("Type is mandatory");
    let kvadratura = parseInt(form.value.kvadratura);
    let cena = parseInt(form.value.cena);
    if (kvadratura < 0 || cena < 0)
      this.errors.push("All number inpit fields must be positive if they are not empty");

    if (this.errors.length > 0)
      return;

    this.filtriraneNekretnine = [];
    for (let n of this.sveNekretnine) {
      let flag = true;
      flag = !(n.tip != form.value.tip);
      if (flag && form.value.gradId.length > 0)
        flag = form.value.gradId.indexOf(n.gradId) != -1;
      if (flag && form.value.opstinaId.length > 0)
        flag = form.value.opstinaId.indexOf(n.opstinaId) != -1;
      if (flag && form.value.mikrolokacijaId.length > 0)
        flag = form.value.mikrolokacijaId.indexOf(n.mikrolokacijaId) != -1;
      if (flag && form.value.brojSoba != "") {
        let broj = 1 + 0.5 * this.brojSobaMin.indexOf(form.value.brojSoba);
        flag = parseInt(n.brojSoba.toString()) >= broj;
      }
      flag = flag && !(form.value.cena !== "" && parseInt(form.value.cena) < parseInt(n.cena.toString()));
      flag = flag && !(form.value.kvadratura !== "" && parseInt(form.value.kvadratura) > parseInt(n.kvadratura.toString()));
      if (flag)
        this.filtriraneNekretnine.push(n);
    }
    this.maxPages = Math.ceil(this.filtriraneNekretnine.length / 10);
    this.currPageNum = 1;
    this.maxPages = this.maxPages == 0 ? 1 : this.maxPages;
    this.loadDisplayNekretnine();
  }


  loadDisplayNekretnine() {
    this.displayNekretnine = [];
    for (let i = 10 * (this.currPageNum.valueOf() - 1); i < (10 * this.currPageNum.valueOf()) && i < this.filtriraneNekretnine.length; i++)
      this.displayNekretnine.push(this.filtriraneNekretnine[i]);
  }

  next() {
    if ((this.currPageNum.valueOf()) + 1 <= this.maxPages)
      this.currPageNum = this.currPageNum.valueOf() + 1;
    this.loadDisplayNekretnine();
  }

  prev() {
    if ((this.currPageNum.valueOf()) - 1 > 0)
      this.currPageNum = this.currPageNum.valueOf() - 1;
    this.loadDisplayNekretnine();
  }
}
