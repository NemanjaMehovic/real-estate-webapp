import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Nekretnina } from '../models/nekretnina';
import { Opstina } from '../models/opstina';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-buyer-display-search',
  templateUrl: './buyer-display-search.component.html',
  styleUrls: ['./buyer-display-search.component.css']
})
export class BuyerDisplaySearchComponent implements OnInit {

  constructor(private router: Router, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private nekretnineService: NekretninaService) { }

  ngOnInit(): void {
    this.loggedOutService.getRegisterData().subscribe((tmp: any) => {
      this.opstine = tmp.opstine;
      this.gradovi = tmp.gradovi;
    });
    this.mikrolokacijaService.getAll().subscribe((tmp: Array<Mikrolokacija>) => {
      this.mikrolokacije = tmp;
      this.nekretnineService.getAll().subscribe((tmp: Array<Nekretnina>) => {
        this.mapa = new Map();
        for (let m of this.mikrolokacije) {
          let sum = 0;
          let num = 0;
          for (let n of tmp)
            if (n.mikrolokacijaId == m.id) {
              sum += n.cena.valueOf() / n.kvadratura.valueOf();
              num++;
            }
          num = num != 0 ? num : 1;
          this.mapa.set(m.id, sum / num);
        }
      });
    });
  }


  @Input() displayNekretnine: Array<Nekretnina> = [];
  opstine: Array<Opstina> = [];
  gradovi: Array<Grad> = [];
  mikrolokacije: Array<Mikrolokacija> = [];
  mapa: Map<Number, Number> = null;
  newWordTest: RegExp = new RegExp("^[ ,\\.\\?!:;]$");


  location(nekretnina: Nekretnina) {
    let grad = null;
    let opstina = null;
    let mikrolokacija = null;
    for (let g of this.gradovi)
      if (parseInt(g.id.toString()) == parseInt(nekretnina.gradId.toString())) {
        grad = g;
        break;
      }
    for (let o of this.opstine)
      if (parseInt(o.id.toString()) == parseInt(nekretnina.opstinaId.toString())) {
        opstina = o;
        break;
      }
    for (let m of this.mikrolokacije)
      if (parseInt(m.id.toString()) == parseInt(nekretnina.mikrolokacijaId.toString())) {
        mikrolokacija = m;
        break;
      }
    return grad.ime + "-" + opstina.ime + "-" + mikrolokacija.ime;
  }

  about(nekretnina: Nekretnina) {
    let about = nekretnina.opis;
    let niz = about.split("");
    about = "";
    let wordCount = 0;
    let prevTest = false;
    let prevChar = '';
    for (let i = 0; i < niz.length && wordCount < 50; i++) {
      if (this.newWordTest.test(niz[i])) {
        if (!prevTest)
          wordCount++;
        if (prevChar != niz[i])
          about += niz[i];
        prevTest = true;
      }
      else {
        about += niz[i];
        prevChar = niz[i];
        prevTest = false;
      }
    }
    return about;
  }

  prosecnaCena(nekretnina: Nekretnina) {
    if (this.mapa != null)
      return this.mapa.get(parseInt(nekretnina.mikrolokacijaId.toString())).toFixed(2);
    return "Temp text";
  }

  details(nekretnina: Nekretnina) {
    sessionStorage.setItem("NekretninaDetails", nekretnina.id.toString());
    this.router.navigateByUrl("/buyer/details");
  }

}
