import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import { PokemonStatusComponent } from '../pokemon-status/pokemon-status.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {

  	private nextPage;
	private prevPage;
	selectedPokemon: string = 'Escolha um pokemon';
	pokemon;
	name = '--';
	sprite = '/assets/pokeball.png';
	weight = 0.0;
	height = 0.0;
	xp = 0;
  	results = [];

	constructor(private appService: AppService){
	}

  	ngOnInit():void {
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

		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
			SELF.getPokemonStatus(response);
		},err => console.log('error', err));
	}

	getPokemonStatus(url){
		const SELF = this;
		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonStatus(response);
		});
	}

	setPokemonStatus(pokemon){
		this.name = pokemon.name;
		this.sprite = pokemon.sprites.front_default;
		this.weight = pokemon.weight;
		this.height = pokemon.height;
		this.xp = pokemon.base_experience;
	}

	onChangePokemon(name, url){
		this.pokemon = url;
		this.selectedPokemon = name;
		this.	getPokemonStatus(url);
	}

}
