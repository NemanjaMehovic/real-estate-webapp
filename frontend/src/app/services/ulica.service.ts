import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddUlicaComponent } from '../add-ulica/add-ulica.component';

@Injectable({
  providedIn: 'root'
})
export class UlicaService {

  constructor(private http: HttpClient) { }


  uri: String = 'http://localhost:4000/ulica';

  add(component: AddUlicaComponent, form: NgForm) {
    if (!form.valid)
      component.errors.push("All fields with are mandatory");

    if (component.errors.length > 0)
      return null;

    return this.http.post(`${this.uri}/add`, form.value);
  }

  getAll() {
    return this.http.get(`${this.uri}/get`);
  }

  remove(id: Number) {
    return this.http.post(`${this.uri}/remove`, { "id": id });
  }
}
