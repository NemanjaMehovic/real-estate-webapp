import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddMikrolokacijaComponent } from '../add-mikrolokacija/add-mikrolokacija.component';

@Injectable({
  providedIn: 'root'
})
export class MikrolokacijeService {

  constructor(private http: HttpClient) { }


  uri: String = 'http://localhost:4000/mikrolokacije';

  add(component: AddMikrolokacijaComponent, form: NgForm) {
    if (!form.valid)
      component.errors.push("All fields with are mandatory");

    if (component.errors.length > 0)
      return null;

    return this.http.post(`${this.uri}/add`, form.value);
  }

  getFromCity(id: Number) {
    return this.http.post(`${this.uri}/getFromCity`, { "gradId": id });
  }

  getAll() {
    return this.http.get(`${this.uri}/mikrolokacije`);
  }

  remove(id: Number) {
    return this.http.post(`${this.uri}/remove`, { "id": id });
  }
}
