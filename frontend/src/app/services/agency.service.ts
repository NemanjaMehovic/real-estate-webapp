import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAddAgencijaComponent } from '../admin-add-agencija/admin-add-agencija.component';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  uri: String = 'http://localhost:4000/agency';
  telValidator: RegExp = new RegExp("^\\+\\d{2,3} \\d{2} \\d{7}$");
  pibValidato:RegExp = new RegExp("[1-9]\\d{7}"); 

  addAgency(component: AdminAddAgencijaComponent, form: NgForm) {
    if (!form.valid)
      component.errors.push("All fields with are mandatory");
    if (!this.telValidator.test(form.value.tel))
      component.errors.push("Phone number must be in +11{1} 11 1111111 format");
    if(!this.pibValidato.test(form.value.pib))
      component.errors.push("PIB must be a number between 10000000 and 99999999");

    if (component.errors.length > 0)
      return null;

    return this.http.post(`${this.uri}/add`, form.value);
  }
}
