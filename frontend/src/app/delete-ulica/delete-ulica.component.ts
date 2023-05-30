import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { Ulica } from '../models/ulica';
import { NekretninaService } from '../services/nekretnina.service';
import { UlicaService } from '../services/ulica.service';

@Component({
  selector: 'app-delete-ulica',
  templateUrl: './delete-ulica.component.html',
  styleUrls: ['./delete-ulica.component.css']
})
export class DeleteUlicaComponent implements OnInit {

  constructor(private router: Router, private nekretninaService: NekretninaService, private ulicaService: UlicaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "A") {
      this.router.navigateByUrl("/");
      return;
    }
    this.nekretninaService.getAll().subscribe((nekretnine: Array<Nekretnina>) => {
      this.ulice = [];
      if (nekretnine != null)
        this.ulicaService.getAll().subscribe((lokacije: Array<Ulica>) => {
          if (lokacije != null)
            for (let l of lokacije) {
              let flag = true;
              for (let n of nekretnine)
                if (n.ulicaId == l.id) {
                  flag = false;
                  break;
                }
              if (flag)
                this.ulice.push(l);
            }
        });
    })
  }

  ulice: Array<Ulica> = [];

  remove(ulica:Ulica){
    this.ulicaService.remove(ulica.id).subscribe((tmp)=>{
      this.ngOnInit();
    });
  }

}
