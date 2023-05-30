import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Korisnik } from '../models/korisnik';
import { SellerUpdateInfoComponent } from '../seller-update-info/seller-update-info.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri: String = 'http://localhost:4000/user';
  passwordValidator: RegExp = new RegExp("^(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z\\d])[A-Za-z].{7,}$");
  emailVailidator: RegExp = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  telValidator: RegExp = new RegExp("^\\+\\d{2,3} \\d{2} \\d{7}$");

  changePassword(component: ChangePasswordComponent, form: NgForm) {
    if (!form.valid)
      component.errors.push("All fields with * are mandatory");
    if (!this.passwordValidator.test(form.value.sifraNew))
      component.errors.push("Password must contain 8 characters at least one uppercase letter, one number, one special character and start with a letter.");
    if (form.value.sifraNew != form.value.sifraNewP)
      component.errors.push("Passwords do not match.");

    if (component.errors.length > 0)
      return null;


    let values = {
      username: sessionStorage.getItem("Username"),
      sifraCurr: form.value.sifraCurr,
      sifraNew: form.value.sifraNew,
      sifraNewP: form.value.sifraNewP
    }

    return this.http.post(`${this.uri}/changePassword`, values);
  }

  getAllUnapprovedUsers() {
    return this.http.get(`${this.uri}/UnapprovedUsers`);
  }

  updateUserStatus(user: Korisnik, status: String) {
    let objectTmp = {
      username: user.username,
      odobren: status
    };
    return this.http.post(`${this.uri}/UpdateStatus`, objectTmp);
  }

  getAll() {
    return this.http.get(`${this.uri}/users`);
  }


  updateUser(component: UpdateUserComponent, form: NgForm) {
    if (!form.valid)
      component.errors.push("All fields are mandatory")
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
        formData.append('data', JSON.stringify(objTmp));
        formData.append('image', component.file);

        component.callBack(this.http.post(`${this.uri}/updateAdmin`, formData));
      };

      img.src = <string>fr.result;
    };

    fr.readAsDataURL(component.file);
  }


  updateSeller(component: SellerUpdateInfoComponent, form: NgForm) {
    if (!form.valid)
      component.errors.push("All fields with * are mandatory");
    if (!this.emailVailidator.test(form.value.email))
      component.errors.push("Not an email entered");
    if (!this.telValidator.test(form.value.tel))
      component.errors.push("Phone number must be in +11{1} 11 1111111 format");

    if (component.errors.length > 0)
      return null;

      let tmpObject = form.value;
      tmpObject.oldEmail = component.oldEmail;
      return this.http.post(`${this.uri}/updateSeller`, tmpObject); 
  }

  remove(username: String) {
    return this.http.post(`${this.uri}/remove`, { "username": username });
  }

  addFav(username:String, nekretnina:Number){
    return this.http.post(`${this.uri}/addFav`, { "username": username, "nekretnina":nekretnina});
  }

  removeFav(username:String, nekretnina:Number){
    return this.http.post(`${this.uri}/removeFav`, { "username": username, "nekretnina":nekretnina});
  }
}
