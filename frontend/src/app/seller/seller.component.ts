import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private router: Router, private service: NekretninaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "S") {
      this.router.navigateByUrl("/");
      return;
    }
    this.service.getAll().subscribe((tmp: Array<Nekretnina>) => {
      this.nekretnine = [];
      let username = sessionStorage.getItem("Username");
      for (let nekretnina of tmp)
        if (nekretnina.vlasnikId == username)
          this.nekretnine.push(nekretnina);
    });
  }


  nekretnine: Array<Nekretnina> = [];

  update(nekretnina: Nekretnina) {
    if (nekretnina.prodato) {
      alert(nekretnina.ime + " je vec prodata");
      return;
    }
    let tmp = new Date(nekretnina.datumIzmene);
    let nowTmp = new Date();
    if (((nowTmp.getTime() - tmp.getTime()) / 3.6e6) < 1) {
      alert("Moze samo 1 promena u sat vremena");
      return;
    }
    sessionStorage.setItem("Seller", sessionStorage.getItem("Username"));
    sessionStorage.setItem("Nekretnina", nekretnina.id.toString());
    this.router.navigateByUrl("/seller/updateNekretnina");
  }

  sold(nekretnina: Nekretnina) {
    this.service.soldUpdate(nekretnina).subscribe((tmp) => {
      this.ngOnInit();
    });
  }

}
