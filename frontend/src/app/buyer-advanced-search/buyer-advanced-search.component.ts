import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Korisnik } from '../models/korisnik';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Nekretnina } from '../models/nekretnina';
import { Opstina } from '../models/opstina';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-buyer-advanced-search',
  templateUrl: './buyer-advanced-search.component.html',
  styleUrls: ['./buyer-advanced-search.component.css']
})
export class BuyerAdvancedSearchComponent implements OnInit {

  constructor(private router: Router, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private nekretninaService: NekretninaService, private userService: UserService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "B") {
      this.router.navigateByUrl("/");
      return;
    }
    this.nekretninaService.getAll().subscribe((tmp: Array<Nekretnina>) => {
      for (let n of tmp)
        if (!n.prodato)
          this.sveNekretnine.push(n);
    });
    this.userService.getAll().subscribe((tmp: Array<Korisnik>) => {
      for (let k of tmp)
        if (k.tip == "S")
          this.sviKorisnici.push(k);
    });
  }

  karakteristike: Array<Array<String>> = [["Terasa", "Podrum", "Internet"], ["Lodja", "Garaza", "Interfon"],
  ["Franc. balkon", "Sa bastom", "Telefon"], ["Lift", "Klima"]];
  stanje: Array<String> = ["Izvorno", "Renovirano", "LUX"];
  grejanje: Array<String> = ["Cg", "Eg", "Ta", "Gas", "Podno", "Toplotne pumpe"];

  sviKorisnici: Array<Korisnik> = [];
  stikliraneKarakteristike: Array<String> = [];
  sveNekretnine: Array<Nekretnina> = [];
  filtriraneNekretnine: Array<Nekretnina> = [];
  errors: Array<String> = [];

  currPageNum: Number = 0;
  maxPages: Number = 0;
  displayNekretnine: Array<Nekretnina> = [];


  search(form: NgForm) {
    this.errors = [];
    let cenaMin = parseInt(form.value.cenaMin);
    let cenaMax = parseInt(form.value.cenaMax);
    let kvadraturaMin = parseInt(form.value.kvadraturaMin);
    let kvadraturaMax = parseInt(form.value.kvadraturaMax);
    let sobeMin = parseInt(form.value.sobeMin);
    let sobeMax = parseInt(form.value.sobeMax);
    let godinaMin = parseInt(form.value.godinaMin);
    let godinaMax = parseInt(form.value.godinaMax);
    let spratMin = parseInt(form.value.spratMin);
    let spratMax = parseInt(form.value.spratMax);
    let mesecnoMin = parseInt(form.value.mesecnoMin);
    let mesecnoMax = parseInt(form.value.mesecnoMax);
    if (cenaMin < 0 || cenaMax < 0 || kvadraturaMin < 0 || kvadraturaMax < 0 || sobeMin < 0 || sobeMax < 0 ||
      godinaMin < 0 || godinaMax < 0 || spratMin < 0 || spratMax < 0 || mesecnoMin < 0 || mesecnoMax < 0)
      this.errors.push("All number inpit fields must be positive if they are not empty");

    if (this.errors.length > 0)
      return;

    this.filtriraneNekretnine = [];
    for (let n of this.sveNekretnine) {
      let flag = true;
      flag = flag && !(form.value.cenaMin !== "" && parseInt(form.value.cenaMin) > parseInt(n.cena.toString()));
      flag = flag && !(form.value.cenaMax !== "" && parseInt(form.value.cenaMax) < parseInt(n.cena.toString()));
      flag = flag && !(form.value.kvadraturaMin !== "" && parseInt(form.value.kvadraturaMin) > parseInt(n.kvadratura.toString()));
      flag = flag && !(form.value.kvadraturaMax !== "" && parseInt(form.value.kvadraturaMax) < parseInt(n.kvadratura.toString()));
      flag = flag && !(form.value.sobeMin !== "" && parseInt(form.value.sobeMin) > parseInt(n.brojSoba.toString()));
      flag = flag && !(form.value.sobeMax !== "" && parseInt(form.value.sobeMax) < parseInt(n.brojSoba.toString()));
      flag = flag && !(form.value.godinaMin !== "" && parseInt(form.value.godinaMin) > parseInt(n.godinaIzd.toString()));
      flag = flag && !(form.value.godinaMax !== "" && parseInt(form.value.godinaMax) < parseInt(n.godinaIzd.toString()));
      flag = flag && !(form.value.spratMin !== "" && parseInt(form.value.spratMin) > parseInt(n.sprat.toString()));
      flag = flag && !(form.value.spratMax !== "" && parseInt(form.value.spratMax) < parseInt(n.sprat.toString()));
      flag = flag && !(form.value.mesecnoMin !== "" && parseInt(form.value.mesecnoMin) > parseInt(n.mesecnaCena.toString()));
      flag = flag && !(form.value.mesecnoMax !== "" && parseInt(form.value.mesecnoMax) < parseInt(n.mesecnaCena.toString()));
      if (flag && form.value.oglasavac.length != 0) {
        let user = null;
        for (let u of this.sviKorisnici)
          if (u.username == n.vlasnikId) {
            user = u;
            break;
          }
        let flagA = false;
        let flagO = false;
        if (form.value.oglasavac.indexOf("agencija") != -1)
          flagA = user.agencijaID != null;
        if (form.value.oglasavac.indexOf("vlasnik") != -1)
          flagO = user.agencijaID == null;
        flag = flagA || flagO;
      }
      flag = flag && !(form.value.stanje.length != 0 && form.value.stanje.indexOf(n.stanje) == -1);
      flag = flag && !(form.value.tipGrejanja.length != 0 && form.value.tipGrejanja.indexOf(n.tipGrejanja) == -1);
      if (flag) {
        for (let k of this.stikliraneKarakteristike) {
          flag = n.karakteristike.indexOf(k) != -1;
          if (!flag)
            break;
        }
      }
      if (flag)
        this.filtriraneNekretnine.push(n);
    }

    this.maxPages = Math.ceil(this.filtriraneNekretnine.length / 10);
    this.currPageNum = 1;
    this.maxPages = this.maxPages == 0 ? 1 : this.maxPages;
    this.loadDisplayNekretnine();
  }


  checkBoxClicked(value: String) {
    if (this.stikliraneKarakteristike.indexOf(value) == -1)
      this.stikliraneKarakteristike.push(value);
    else
      this.stikliraneKarakteristike.splice(this.stikliraneKarakteristike.indexOf(value), 1);
    console.log(this.stikliraneKarakteristike);
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
