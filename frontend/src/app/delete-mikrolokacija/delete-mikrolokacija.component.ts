import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Nekretnina } from '../models/nekretnina';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-delete-mikrolokacija',
  templateUrl: './delete-mikrolokacija.component.html',
  styleUrls: ['./delete-mikrolokacija.component.css']
})
export class DeleteMikrolokacijaComponent implements OnInit {

  constructor(private router: Router, private mikrolokacijaService: MikrolokacijeService, private nekretninaService: NekretninaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "A") {
      this.router.navigateByUrl("/");
      return;
    }
    this.nekretninaService.getAll().subscribe((nekretnine: Array<Nekretnina>) => {
      this.mikrolokacije = [];
      if (nekretnine != null)
        this.mikrolokacijaService.getAll().subscribe((lokacije: Array<Mikrolokacija>) => {
          if (lokacije != null)
            for (let l of lokacije) {
              let flag = true;
              for (let n of nekretnine)
                if (n.mikrolokacijaId == l.id) {
                  flag = false;
                  break;
                }
              if (flag)
                this.mikrolokacije.push(l);
            }
        });
    })
  }


  mikrolokacije: Array<Mikrolokacija> = [];

  remove(lokacija: Mikrolokacija) {
    this.mikrolokacijaService.remove(lokacija.id).subscribe((tmp) => {
      this.ngOnInit();
    });
  }

}
