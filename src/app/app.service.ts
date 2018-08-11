import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiURL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getAllPokemons(){
	  return this.http.get(this.apiURL);
  }

  requestUrl(url){
	  return this.http.get(url);
  }
}