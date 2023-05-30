import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMikrolokacijaComponent } from './add-mikrolokacija/add-mikrolokacija.component';
import { AddUlicaComponent } from './add-ulica/add-ulica.component';
import { AdminAddAgencijaComponent } from './admin-add-agencija/admin-add-agencija.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminComponent } from './admin/admin.component';
import { BuyerAdvancedSearchComponent } from './buyer-advanced-search/buyer-advanced-search.component';
import { BuyerFavoritesComponent } from './buyer-favorites/buyer-favorites.component';
import { BuyerNekretninaDetailsComponent } from './buyer-nekretnina-details/buyer-nekretnina-details.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteKorisnikComponent } from './delete-korisnik/delete-korisnik.component';
import { DeleteMikrolokacijaComponent } from './delete-mikrolokacija/delete-mikrolokacija.component';
import { DeleteUlicaComponent } from './delete-ulica/delete-ulica.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SellerAddJsonComponent } from './seller-add-json/seller-add-json.component';
import { SellerAddNekretninaComponent } from './seller-add-nekretnina/seller-add-nekretnina.component';
import { SellerUpdateInfoComponent } from './seller-update-info/seller-update-info.component';
import { SellerUpdateNekretninaComponent } from './seller-update-nekretnina/seller-update-nekretnina.component';
import { SellerComponent } from './seller/seller.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin", component: AdminComponent },
  { path: "buyer", component: BuyerComponent },
  { path: "seller", component: SellerComponent },
  { path: "user/changePassword", component: ChangePasswordComponent },
  { path: "admin/addUser", component: AdminAddUserComponent },
  { path: "admin/addAgencija", component: AdminAddAgencijaComponent },
  { path: "admin/addMikrolokacija", component: AddMikrolokacijaComponent },
  { path: "admin/addUlica", component: AddUlicaComponent },
  { path: "admin/deleteMikrolokacija", component: DeleteMikrolokacijaComponent },
  { path: "admin/deleteKorisnik", component: DeleteKorisnikComponent },
  { path: "admin/deleteUlica", component: DeleteUlicaComponent },
  { path: "admin/updateUser", component: UpdateUserComponent },
  { path: "seller/add", component: SellerAddNekretninaComponent },
  { path: "seller/addJson", component: SellerAddJsonComponent },
  { path: "seller/updateNekretnina", component: SellerUpdateNekretninaComponent },
  { path: "seller/updateSelf", component: SellerUpdateInfoComponent },
  { path: "buyer/search", component: BuyerAdvancedSearchComponent },
  { path: "buyer/favorites", component: BuyerFavoritesComponent },
  { path: "buyer/details", component: BuyerNekretninaDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
