import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';

import { Favorites } from './Favorites';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiURL = 'https://pokeapi.co/api/v2/pokemon/';
  listFilter = [];

  constructor(private http: HttpClient, protected localStorage: LocalStorage) { }

  getAllPokemons(){
	  return this.http.get(this.apiURL);
  }

  requestUrl(url){
	  return this.http.get(url);
  }

  writeFavData(pokemon){
    const SELF = this;
    let isValid: boolean = false;

    let tempArr = [];

    this.localStorage.getItem('pokemonList').subscribe((response) => {
      if(response != null){
        response.forEach(element => {

          tempArr.push(element);

          if(element.id == pokemon.id){
            isValid = true;
          } else {
            isValid = false;
          }

        });

        isValid ? '' : tempArr.push(pokemon);
          
        this.localStorage.setItem('pokemonList', tempArr).subscribe(() => {})

      } else {
        console.log("first time");
        tempArr.push(pokemon);
        SELF.localStorage.setItem('pokemonList', tempArr).subscribe(() => {}); 
      }
    });
  }

  readFavData(){
    const SELF = this;
    this.localStorage.getItem('pokemonList').subscribe((response) => {
      
      if(response != null) {
        SELF.listFilter = [];
        SELF.listFilter = response;
      } else {
        SELF.listFilter = [];
      }
    });
  }

  clearFavData(){
    this.localStorage.clear().subscribe(() => {});
  }
}