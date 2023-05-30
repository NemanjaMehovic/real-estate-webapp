import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Korisnik } from '../models/korisnik';
import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutService {

  constructor(private http: HttpClient) { }

  uri: String = 'http://localhost:4000/loggedOut';
  passwordValidator: RegExp = new RegExp("^(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z\\d])[A-Za-z].{7,}$");
  emailVailidator: RegExp = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  telValidator: RegExp = new RegExp("^\\+\\d{2,3} \\d{2} \\d{7}$");

  logIn(korisnik: Korisnik) {
    return this.http.post(`${this.uri}/login`, korisnik);
  }

  getRegisterData() {
    return this.http.get(`${this.uri}/data`);
  }

  getOpstine(id: Number) {
    return this.http.post(`${this.uri}/opstine`, { "gradId": id });
  }

  register(component: RegisterComponent, form: NgForm, file: File) {
    if (!form.valid || component.captcha == "")
      component.errors.push("All fields with * are mandatory")
    let passwordTmp = form.value.sifra;
    if (!this.passwordValidator.test(passwordTmp))
      component.errors.push("Password must contain 8 characters at least one uppercase letter, one number, one special character and start with a letter.");
    if (passwordTmp != form.value.sifraP)
      component.errors.push("Passwords do not match.");
    if (!this.emailVailidator.test(form.value.email))
      component.errors.push("Not an email entered");
    if (!this.telValidator.test(form.value.tel))
      component.errors.push("Phone number must be in +11{1} 11 1111111 format");

    let fr = new FileReader();
    fr.onload = () => {
      var img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width < 100 || width > 300 || height < 100 || height > 300)
          component.errors.push("Picture must be between 100x100 and 300x300 px");

        if (component.errors.length > 0)
          return;

        const formData = new FormData();
        let objTmp: any = form.value;
        objTmp.odobren = component.byAdmin ? "A" : "P";
        formData.append('data', JSON.stringify(objTmp));
        formData.append('image', file);

        component.callBack(this.http.post(`${this.uri}/register`, formData));
      };

      img.src = <string>fr.result;
    };

    fr.readAsDataURL(file);
  }
}
