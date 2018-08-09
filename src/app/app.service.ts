import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiURL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemons(){
	return this.http.get(this.apiURL);
  }

  requestPage(url){
	return this.http.get(url);
  }
}