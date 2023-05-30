import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grad } from '../models/grad';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Opstina } from '../models/opstina';
import { Ulica } from '../models/ulica';
import { LoggedOutService } from '../services/logged-out.service';
import { MikrolokacijeService } from '../services/mikrolokacije.service';
import { NekretninaService } from '../services/nekretnina.service';
import { UlicaService } from '../services/ulica.service';

@Component({
  selector: 'app-seller-add-json',
  templateUrl: './seller-add-json.component.html',
  styleUrls: ['./seller-add-json.component.css']
})
export class SellerAddJsonComponent implements OnInit {

  constructor(private router: Router, private loggedOutService: LoggedOutService, private mikrolokacijaService: MikrolokacijeService, private nekretninaService: NekretninaService, private ulicaService: UlicaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "S") {
      this.router.navigateByUrl("/");
      return;
    }
    this.loggedOutService.getRegisterData().subscribe((tmp: any) => {
      this.gradovi = tmp.gradovi;
    });
    this.mikrolokacijaService.getAll().subscribe((tmp: Array<Mikrolokacija>) => {
      this.mikrolokacije = tmp;
    });
    this.ulicaService.getAll().subscribe((tmp: Array<Ulica>) => {
      this.ulice = tmp;
    });
  }


  karakteristike: Array<String> = ["Terasa", "Podrum", "Internet", "Lodja", "Garaza", "Interfon",
    "Franc. balkon", "Sa bastom", "Telefon", "Lift", "Klima"];
  stanje: Array<String> = ["Izvorno", "Renovirano", "LUX"];
  grejanje: Array<String> = ["Cg", "Eg", "Ta", "Gas", "Podno", "Toplotne pumpe"];
  tip: Array<String> = ["Stan", "Kuca", "Vikendica", "Lokal", "Magacin"];
  errors: Array<String> = [];
  stage2: Boolean = false;
  success: Boolean = false;
  fileJ: File = null;
  filesP: Array<File> = [];
  gradovi: Array<Grad> = [];
  opstine: Array<Opstina> = [];
  mikrolokacije: Array<Mikrolokacija> = [];
  ulice: Array<Ulica> = [];

  gradId: Number = -1;
  opstinaId: Number = -1;
  mikrolokacijaId: Number = -1;
  ulicaId: Number = -1;

  nekretninaObject: any = null;


  changeEventJ(event: any): void {
    this.fileJ = event.target.files[0];
  }

  changeEventP(event: any): void {
    this.filesP = [];
    for (let file of event.target.files)
      this.filesP.push(file);
  }

  stage1Function() {
    this.errors = [];
    this.success = false;
    let fr = new FileReader();
    fr.onload = () => {
      let jsonObject = JSON.parse(<string>fr.result);
      let tmpData = jsonObject.Realestate.City;
      let flag = true;
      for (let g of this.gradovi)
        if (g.ime == tmpData) {
          this.gradId = parseInt(g.id.toString());
          flag = false;
          break;
        }
      if (flag) {
        this.errors.push("City " + tmpData + " doesn't exist in database");
        return;
      }
      flag = true;
      this.loggedOutService.getOpstine(this.gradId).subscribe((tmp: Array<Opstina>) => {
        this.opstine = tmp;
        let opstina = jsonObject.Realestate.Municipality;
        for (let o of this.opstine) {
          if (o.ime == opstina) {
            this.opstinaId = parseInt(o.id.toString());
            flag = false;
            break;
          }
        }
        if (flag) {
          this.errors.push("Municipality " + opstina + " doesn't exist in database");
          return;
        }

        tmpData = jsonObject.Realestate.Microlocation;
        flag = true;
        for (let m of this.mikrolokacije)
          if (m.gradId == this.gradId && m.opstinaId.indexOf(this.opstinaId) >= 0 && m.ime == tmpData) {
            this.mikrolokacijaId = m.id;
            flag = false;
            break;
          }
        if (flag) {
          this.errors.push("Microlocation " + tmpData + " doesn't exist in database");
          return;
        }

        tmpData = jsonObject.Realestate.Street;
        flag = true;
        for (let u of this.ulice)
          if (u.gradId == this.gradId && u.mikrolokacijaId.indexOf(this.mikrolokacijaId) >= 0 && u.ime == tmpData) {
            this.ulicaId = u.id;
            flag = false;
            break;
          }
        if (flag) {
          this.errors.push("Street " + tmpData + " doesn't exist in database");
          return;
        }

        tmpData = jsonObject.Realestate.Characteristics;
        for (let c of tmpData)
          if (this.karakteristike.indexOf(c) < 0)
            this.errors.push(c + " is not a characteristics");

        tmpData = jsonObject.Realestate.State;
        if (this.stanje.indexOf(tmpData) < 0)
          this.errors.push(tmpData + " is not a state");

        tmpData = jsonObject.Realestate.Heating;
        if (this.grejanje.indexOf(tmpData) < 0)
          this.errors.push(tmpData + " is not a form of heating");

        tmpData = jsonObject.Realestate.Type;
        if (this.tip.indexOf(tmpData) < 0)
          this.errors.push(tmpData + " is not a type");

        if (this.errors.length != 0)
          return;

        this.nekretninaObject = {
          ime: jsonObject.Realestate.Name,
          ulicaId: this.ulicaId,
          mikrolokacijaId: this.mikrolokacijaId,
          gradId: this.gradId,
          opstinaId: this.opstinaId,
          vlasnikId: sessionStorage.getItem("Username"),
          tip: jsonObject.Realestate.Type,
          kvadratura: parseInt(jsonObject.Realestate.Area),
          brojSoba: parseInt(jsonObject.Realestate.Rooms),
          cena: parseInt(jsonObject.Realestate.Price),
          godinaIzd: jsonObject.Realestate.ConstructionYear,
          stanje: jsonObject.Realestate.State,
          tipGrejanja: jsonObject.Realestate.Heating,
          sprat: jsonObject.Realestate.Floor,
          maxSprat: jsonObject.Realestate.TotalFloors,
          parking: Boolean(jsonObject.Realestate.Parking == "DA"),
          opis: jsonObject.Realestate.About,
          prodato: false,
          datumIzmene: new Date(),
          mesecnaCena: jsonObject.Realestate.MonthlyUtilities,
          karakteristike: jsonObject.Realestate.Characteristics,
          gradskiPrevoz: null
        }

        this.stage2 = true;
      });
    };

    if (this.fileJ)
      fr.readAsText(this.fileJ);
    else
      this.errors.push("No json file uploaded");
  }


  stage2Function() {
    this.errors = [];
    let tmp = this.nekretninaService.addJson(this);
    if (tmp != null)
      tmp.subscribe((tmp: any) => {
        if (tmp.errors != null) {
          this.errors.push(tmp.errors);
          return;
        }
        this.success = true;
        this.stage2 = false;
        this.fileJ = null;
        this.filesP = [];
      })
  }

  add() {
    if (!this.stage2)
      this.stage1Function();
    else
      this.stage2Function();
  }

}
