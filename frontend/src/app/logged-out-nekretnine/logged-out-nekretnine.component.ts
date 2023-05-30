import { Component, Input, OnInit } from '@angular/core';
import { Nekretnina } from '../models/nekretnina';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-logged-out-nekretnine',
  templateUrl: './logged-out-nekretnine.component.html',
  styleUrls: ['./logged-out-nekretnine.component.css']
})
export class LoggedOutNekretnineComponent implements OnInit {

  constructor(private service: NekretninaService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((tmp: Array<Nekretnina>) => {
      tmp.sort((a, b) => {
        let dateA = new Date(a.datumIzmene);
        let dateB = new Date(b.datumIzmene);
        return dateB.getTime() - dateA.getTime();
      });
      for (let i = 0; i < 5 && i < tmp.length; i++)
        this.nekretnine.push(tmp[i]);
    })
  }


  randomNumbers: Array<Number> = [];
  nekretnine: Array<Nekretnina> = [];

  getRandomPicture(broj: number, tmp: Nekretnina) {
    while ((broj + 1) > this.randomNumbers.length) {
      this.randomNumbers.push(Math.floor(Math.random() * tmp.slike.length));
    }
    return "http://localhost:4000/nekretnine/" + tmp.slike[this.randomNumbers[broj].valueOf()];
  }

}
