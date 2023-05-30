import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { UserService } from '../services/user.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { LoggedOutService } from '../services/logged-out.service';
import { NekretninaService } from '../services/nekretnina.service';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Nekretnina } from '../models/nekretnina';
import { Korisnik } from '../models/korisnik';


@Component({
  selector: 'app-seller-graphs',
  templateUrl: './seller-graphs.component.html',
  styleUrls: ['./seller-graphs.component.css']
})
export class SellerGraphsComponent implements OnInit {

  constructor(private userService: UserService, private mikrolokacijaService: MikrolokacijeService, private nekretnineService: NekretninaService) { }

  ngOnInit(): void {
    this.mikrolokacijaService.getAll().subscribe((tmp: Array<Mikrolokacija>) => {
      this.mikrolokacije = tmp;
    });
    this.nekretnineService.getAll().subscribe((tmp: Array<Nekretnina>) => {
      for (let n of tmp)
        if (n.prodato)
          this.nekretnine.push(n);
      this.userService.getAll().subscribe((tmp: Array<Korisnik>) => {
        let korisnik: Korisnik = null;
        let agencijaId = null;
        for (let k of tmp)
          if (k.username == sessionStorage.getItem("Username")) {
            korisnik = k;
            agencijaId = parseInt(k.agencijaID.toString());
            break;
          }
        this.hasAgency = agencijaId != null;
        if (!this.hasAgency)
          return;
        for (let k of tmp)
          if (k.agencijaID != null && parseInt(k.agencijaID.toString()) == agencijaId)
            this.korisnici.push(k.username);

        let data = [];
        for (let i = 0; i < 12; i++) {
          let count = 0;
          for (let n of this.nekretnine)
            if (new Date(n.datumIzmene).getMonth() == i && this.korisnici.indexOf(n.vlasnikId) >= 0)
              count++;
          data.push(count);
        }
        this.barChartDataA = {
          labels: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
          datasets: [
            { data: data, label: 'Data for agency' }
          ]
        };
      });
    });
  }

  hasAgency: Boolean = false;
  mikrolokacije: Array<Mikrolokacija> = [];
  nekretnine: Array<Nekretnina> = [];
  korisnici: Array<String> = [];
  mikrolokacijaId: String = "";

  mikrolokacijaIzabrana() {
    let data = [];
    let mikrolokacija: Mikrolokacija = null;
    for (let m of this.mikrolokacije)
      if (m.id == parseInt(this.mikrolokacijaId.toString())) {
        mikrolokacija = m;
        break;
      }
    for (let i = 0; i < 12; i++) {
      let count = 0;
      for (let n of this.nekretnine)
        if (new Date(n.datumIzmene).getMonth() == i && n.mikrolokacijaId == parseInt(this.mikrolokacijaId.toString()))
          count++;
      data.push(count);
    }
    this.barChartData = {
      labels: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
      datasets: [
        { data: data, label: 'Data for ' + mikrolokacija.ime }
      ]
    };
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = null;
  public barChartDataA: ChartData<'bar'> = null;
  /*{
    labels: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    ]
  };*/

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40];

    this.chart?.update();
  }
}
