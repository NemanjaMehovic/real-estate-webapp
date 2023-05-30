import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Grad } from '../models/grad';
import { Korisnik } from '../models/korisnik';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Nekretnina } from '../models/nekretnina';
import { Opstina } from '../models/opstina';
import { Ulica } from '../models/ulica';
import { AgencyService } from '../services/agency.service';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';
import { UlicaService } from '../services/ulica.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-buyer-nekretnina-details',
  templateUrl: './buyer-nekretnina-details.component.html',
  styleUrls: ['./buyer-nekretnina-details.component.css']
})
export class BuyerNekretninaDetailsComponent implements OnInit {

  constructor(private router: Router, private nekretninaService: NekretninaService, private userService: UserService, private agencijaService: AgencyService, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private ulicaService: UlicaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "B" || sessionStorage.getItem("NekretninaDetails") == null) {
      this.router.navigateByUrl("/");
      return;
    }
    let nekretninaId = parseInt(sessionStorage.getItem("NekretninaDetails"));
    this.loggedOutService.getRegisterData().subscribe((tmp: any) => {
      let gradovi: Array<Grad> = tmp.gradovi;
      let opstine: Array<Opstina> = tmp.opstine;
      let agencije: Array<Agencija> = tmp.agencije;
      this.nekretninaService.getAll().subscribe((nekretnine: Array<Nekretnina>) => {
        for (let n of nekretnine)
          if (parseInt(n.id.toString()) == nekretninaId) {
            this.nekretnina = n;
            break;
          }
        for (let g of gradovi)
          if (parseInt(g.id.toString()) == parseInt(this.nekretnina.gradId.toString())) {
            this.nekretninaGrad = g;
            break;
          }
        for (let o of opstine)
          if (parseInt(o.id.toString()) == parseInt(this.nekretnina.opstinaId.toString())) {
            this.nekretninaOpstina = o;
            break;
          }
        this.userService.getAll().subscribe((korisnici: Array<Korisnik>) => {
          for (let k of korisnici) {
            if (k.username == sessionStorage.getItem("Username"))
              this.korisnik = k;
            else if (k.username == this.nekretnina.vlasnikId)
              this.vlasnik = k;
            if (this.korisnik != null && this.vlasnik != null)
              break;
          }
          if (this.vlasnik.agencijaID != null) {
            for (let a of agencije)
              if (parseInt(a.id.toString()) == parseInt(this.vlasnik.agencijaID.toString())) {
                this.agencija = a;
                break;
              }
            for (let g of gradovi)
              if (parseInt(g.id.toString()) == parseInt(this.agencija.gradId.toString())) {
                this.agencijaGrad = g;
                break;
              }
          }
        });
        this.mikrolokacijaService.getAll().subscribe((tmp: Array<Mikrolokacija>) => {
          for (let m of tmp)
            if (parseInt(m.id.toString()) == parseInt(this.nekretnina.mikrolokacijaId.toString())) {
              this.nekretninaMikrolokacija = m;
              break;
            }
          this.mapa = new Map();
          for (let m of tmp) {
            let sum = 0;
            let num = 0;
            for (let n of nekretnine)
              if (n.mikrolokacijaId == m.id) {
                sum += n.cena.valueOf() / n.kvadratura.valueOf();
                num++;
              }
            num = num != 0 ? num : 1;
            this.mapa.set(m.id, sum / num);
          }
        });
        this.ulicaService.getAll().subscribe((tmp: Array<Ulica>) => {
          for (let u of tmp)
            if (parseInt(u.id.toString()) == parseInt(this.nekretnina.ulicaId.toString())) {
              this.nekretninaUlica = u;
              break;
            }
        });
      });
    });
  }

  karakteristike: Array<Array<String>> = [["Terasa", "Podrum", "Internet"], ["Lodja", "Garaza", "Interfon"],
  ["Franc. balkon", "Sa bastom", "Telefon"], ["Lift", "Klima"]];
  korisnik: Korisnik = null;
  nekretnina: Nekretnina = null;
  vlasnik: Korisnik = null;
  agencija: Agencija = null;
  agencijaGrad: Grad = null;
  nekretninaGrad: Grad = null;
  nekretninaOpstina: Opstina = null;
  nekretninaMikrolokacija: Mikrolokacija = null;
  nekretninaUlica: Ulica = null;
  mapa: Map<Number, Number> = null;
  displayPhone: Boolean = false;

  addFavorite() {
    if (this.korisnik.omiljeno.length >= 5) {
      alert("You can only have 5 favorites");
      return;
    }
    if (this.korisnik.omiljeno.indexOf(this.nekretnina.id) != -1) {
      alert("Already in your favorites");
      return;
    }
    this.userService.addFav(this.korisnik.username, this.nekretnina.id).subscribe((tmp: any) => {
      this.korisnik.omiljeno.push(this.nekretnina.id);
    });
  }

  changeProvidan() {
    this.displayPhone = true;
  }
  providan() {
    return this.displayPhone;
  }

  proveraChecked(karakteristika: String) {
    return this.nekretnina.karakteristike.indexOf(karakteristika) != -1;
  }

  ispodProseka() {
    let prosecnaCena = this.mapa.get(parseInt(this.nekretnina.mikrolokacijaId.toString())).valueOf() * this.nekretnina.kvadratura.valueOf();
    return parseInt(this.nekretnina.cena.toString()) < prosecnaCena;
  }

  prosecnaCena() {
    if (this.mapa != null)
      return this.mapa.get(parseInt(this.nekretnina.mikrolokacijaId.toString())).toFixed(2);
    return "Temp text";
  }

  oglasavac() {
    return this.agencija != null ? "agencija" : "vlasnik";
  }

  display() {
    return this.nekretnina && this.vlasnik && this.nekretninaGrad && this.nekretninaOpstina && this.nekretninaMikrolokacija && this.nekretninaUlica
  }

  getLokacija() {
    return this.nekretninaGrad.ime + "-" + this.nekretninaOpstina.ime + "-" + this.nekretninaMikrolokacija.ime + "-" + this.nekretninaUlica.ime;
  }

}
