import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretninaService } from '../services/nekretnina.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-buyer-favorites',
  templateUrl: './buyer-favorites.component.html',
  styleUrls: ['./buyer-favorites.component.css']
})
export class BuyerFavoritesComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,private nekretnineService:NekretninaService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "B") {
      this.router.navigateByUrl("/");
      return;
    }
    this.userService.getAll().subscribe((tmp: Array<Korisnik>) => {
      this.displayNekretnine = [];
      for (let u of tmp)
        if (u.username == sessionStorage.getItem("Username")) {
          this.user = u;
          break;
        }
      this.nekretnineService.getAll().subscribe((tmp:Array<Nekretnina>)=>{
        for(let n of tmp)
          if(this.user.omiljeno.indexOf(n.id) != -1)
            this.displayNekretnine.push(n);
      });
    });
  }

  user:Korisnik = null;
  displayNekretnine: Array<Nekretnina> = [];

  remove(nekretnina:Nekretnina){
    this.userService.removeFav(this.user.username, nekretnina.id).subscribe((tmp:Korisnik)=>{
      this.ngOnInit();
    });
  }
}
