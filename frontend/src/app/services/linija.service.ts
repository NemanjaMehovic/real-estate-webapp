import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinijaService {

  constructor(private http:HttpClient) { }

  uri: String = 'http://localhost:4000/linija';

  getAll(){
    return this.http.get(`${this.uri}/get`);
  }
}
