import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminAddAgencijaComponent } from './admin-add-agencija/admin-add-agencija.component';
import { AddMikrolokacijaComponent } from './add-mikrolokacija/add-mikrolokacija.component';
import { AddUlicaComponent } from './add-ulica/add-ulica.component';
import { DeleteMikrolokacijaComponent } from './delete-mikrolokacija/delete-mikrolokacija.component';
import { DeleteKorisnikComponent } from './delete-korisnik/delete-korisnik.component';
import { SellerAddNekretninaComponent } from './seller-add-nekretnina/seller-add-nekretnina.component';
import { LoggedOutNekretnineComponent } from './logged-out-nekretnine/logged-out-nekretnine.component';
import { DeleteUlicaComponent } from './delete-ulica/delete-ulica.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SellerUpdateNekretninaComponent } from './seller-update-nekretnina/seller-update-nekretnina.component';
import { SellerAddJsonComponent } from './seller-add-json/seller-add-json.component';
import { NgChartsModule } from 'ng2-charts';
import { SellerUpdateInfoComponent } from './seller-update-info/seller-update-info.component';
import { SellerGraphsComponent } from './seller-graphs/seller-graphs.component';
import { BuyerDisplaySearchComponent } from './buyer-display-search/buyer-display-search.component';
import { BuyerAdvancedSearchComponent } from './buyer-advanced-search/buyer-advanced-search.component';
import { BuyerNekretninaDetailsComponent } from './buyer-nekretnina-details/buyer-nekretnina-details.component';
import { BuyerFavoritesComponent } from './buyer-favorites/buyer-favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    BuyerComponent,
    SellerComponent,
    ChangePasswordComponent,
    AdminAddUserComponent,
    AdminAddAgencijaComponent,
    AddMikrolokacijaComponent,
    AddUlicaComponent,
    DeleteMikrolokacijaComponent,
    DeleteKorisnikComponent,
    SellerAddNekretninaComponent,
    LoggedOutNekretnineComponent,
    DeleteUlicaComponent,
    UpdateUserComponent,
    SellerUpdateNekretninaComponent,
    SellerAddJsonComponent,
    SellerUpdateInfoComponent,
    SellerGraphsComponent,
    BuyerDisplaySearchComponent,
    BuyerAdvancedSearchComponent,
    BuyerNekretninaDetailsComponent,
    BuyerFavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
