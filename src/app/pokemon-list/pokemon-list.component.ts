import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  private nextPage;
	private prevPage;
	pokemonUrl: any = '';
  results = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getPokemonList();
  }

  setPokemonList(data){
		this.results = data.results;
	}

	setNextPage(url){
		this.nextPage = url.next;
	}

	setPrevPage(url) {
		this.prevPage = url.previous;
	}

	getNextPage() {
		return this.nextPage;
	}

	getPrevPage(){
		return this.prevPage;
  }
  
  getPokemonList(){

		const SELF = this;

		this.appService.getAllPokemons().subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => console.log('error', err));
  }
  
	toNextPage(url){

		const SELF = this;

		this.results = [];

		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => console.log('error', err));
	}

	setPokemonUrl(url){
		const SELF = this;

		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonStatus(response);
		},err => console.log('error', err));
	}

	setPokemonStatus(status){
		this.pokemonUrl = {
			id: status.id,
			url: status.url,
			name: status.name,
			sprite: status.sprites.front_default,
			weight: status.weight,
			height: status.height,
			base_exp: status.base_experience
		}
	}
}
