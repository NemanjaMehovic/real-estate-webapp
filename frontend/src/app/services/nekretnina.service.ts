import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Nekretnina } from '../models/nekretnina';
import { SellerAddJsonComponent } from '../seller-add-json/seller-add-json.component';
import { SellerAddNekretninaComponent } from '../seller-add-nekretnina/seller-add-nekretnina.component';
import { SellerUpdateNekretninaComponent } from '../seller-update-nekretnina/seller-update-nekretnina.component';

@Injectable({
  providedIn: 'root'
})
export class NekretninaService {

  constructor(private http: HttpClient) { }


  uri: String = 'http://localhost:4000/nekretnina';

  getAll() {
    return this.http.get(`${this.uri}/nekretnine`);
  }

  add(component: SellerAddNekretninaComponent, form: NgForm) {
    if (!form.valid)
      component.errors.push("All fields with * are mandatory");
    if (component.files.length < 3 || component.files.length > 6)
      component.errors.push("You can upload a maximum of 6 pictures and a minimum of 3");
    let kvadratura = parseInt(form.value.kvadratura);
    let brojSoba = parseInt(form.value.brojSoba);
    let cena = parseInt(form.value.cena);
    let sprat = parseInt(form.value.sprat);
    let maxSprat = parseInt(form.value.maxSprat);
    let mesecnaCena = parseInt(form.value.mesecnaCena);
    if (kvadratura < 0 || brojSoba < 0 || cena < 0 || sprat < 0 || maxSprat < 0 || mesecnaCena < 0)
      component.errors.push("All number inpit fields must be positive");

    if (component.errors.length > 0)
      return null;

    const formData = new FormData();
    for (let tmp of component.files)
      formData.append("slike", tmp);

    let tmpObject = {
      ime: form.value.name,
      ulicaId: parseInt(form.value.ulicaId),
      mikrolokacijaId: parseInt(form.value.mikrolokacijaId),
      gradId: parseInt(form.value.gradId),
      opstinaId: parseInt(form.value.opstinaId),
      vlasnikId: sessionStorage.getItem("Username"),
      tip: form.value.tip,
      kvadratura: kvadratura,
      brojSoba: brojSoba,
      cena: cena,
      godinaIzd: new Date(form.value.godinaIzd).getFullYear(),
      stanje: form.value.stanje,
      tipGrejanja: form.value.tipGrejanja,
      sprat: sprat,
      maxSprat: maxSprat,
      parking: Boolean(form.value.parking),
      opis: form.value.opis,
      prodato: false,
      datumIzmene: new Date(),
      mesecnaCena: mesecnaCena,
      karakteristike: form.value.karakteristike,
      gradskiPrevoz: form.value.gradskiPrevoz
    }

    formData.append("data", JSON.stringify(tmpObject));

    return this.http.post(`${this.uri}/add`, formData);
  }


  addJson(component: SellerAddJsonComponent) {
    if (component.filesP.length < 3 || component.filesP.length > 6)
      component.errors.push("You can upload a maximum of 6 pictures and a minimum of 3");

    let tmp = component.nekretninaObject;
    if (tmp.kvadratura < 0 || tmp.brojSoba < 0 || tmp.cena < 0 || tmp.sprat < 0 || tmp.maxSprat < 0 || tmp.mesecnaCena < 0)
      component.errors.push("All number inpit fields must be positive");

    if (component.errors.length > 0)
      return null;

    const formData = new FormData();
    for (let tmp of component.filesP)
      formData.append("slike", tmp);
    formData.append("data", JSON.stringify(tmp));
    return this.http.post(`${this.uri}/add`, formData);
  }

  soldUpdate(nekretnina: Nekretnina) {
    return this.http.post(`${this.uri}/sold`, nekretnina);
  }

  update(component: SellerUpdateNekretninaComponent, form: NgForm, id: Number) {
    if (!form.valid)
      component.errors.push("All fields with * are mandatory");
    if (component.files.length < 3 || component.files.length > 6)
      component.errors.push("You can upload a maximum of 6 pictures and a minimum of 3");
    let kvadratura = parseInt(form.value.kvadratura);
    let brojSoba = parseInt(form.value.brojSoba);
    let cena = parseInt(form.value.cena);
    let sprat = parseInt(form.value.sprat);
    let maxSprat = parseInt(form.value.maxSprat);
    let mesecnaCena = parseInt(form.value.mesecnaCena);
    if (kvadratura < 0 || brojSoba < 0 || cena < 0 || sprat < 0 || maxSprat < 0 || mesecnaCena < 0)
      component.errors.push("All number inpit fields must be positive");

    if (component.errors.length > 0)
      return null;

    const formData = new FormData();
    for (let tmp of component.files)
      formData.append("slike", tmp);

    let tmpObject = {
      id: id,
      ime: form.value.name,
      ulicaId: parseInt(form.value.ulicaId),
      mikrolokacijaId: parseInt(form.value.mikrolokacijaId),
      gradId: parseInt(form.value.gradId),
      opstinaId: parseInt(form.value.opstinaId),
      vlasnikId: sessionStorage.getItem("Username"),
      tip: form.value.tip,
      kvadratura: kvadratura,
      brojSoba: brojSoba,
      cena: cena,
      godinaIzd: new Date(form.value.godinaIzd).getFullYear(),
      stanje: form.value.stanje,
      tipGrejanja: form.value.tipGrejanja,
      sprat: sprat,
      maxSprat: maxSprat,
      parking: Boolean(form.value.parking),
      opis: form.value.opis,
      prodato: false,
      datumIzmene: new Date(),
      mesecnaCena: mesecnaCena,
      karakteristike: form.value.karakteristike,
      gradskiPrevoz: form.value.gradskiPrevoz
    }

    console.log(tmpObject);
    formData.append("data", JSON.stringify(tmpObject));

    return this.http.post(`${this.uri}/update`, formData);
  }
}
