import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete-korisnik',
  templateUrl: './delete-korisnik.component.html',
  styleUrls: ['./delete-korisnik.component.css']
})
export class DeleteKorisnikComponent implements OnInit {

  constructor(private router:Router, private service:UserService) { }

  ngOnInit(): void {
    let tmpVal = sessionStorage.getItem("LoggedIn");
    if (tmpVal != "A") {
      this.router.navigateByUrl("/");
      return;
    }
    this.service.getAll().subscribe((tmp: Array<Korisnik>) => {
      this.users = [];
      for(let kor of tmp)
        if(kor.tip != "A")
          this.users.push(kor);
    });
  }


  users:Array<Korisnik> = [];

  remove(korisnik:Korisnik){
    this.service.remove(korisnik.username).subscribe((tmp)=>{
      this.ngOnInit();
    })
  }

}
