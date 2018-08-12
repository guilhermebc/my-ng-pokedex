import { Component, OnInit, OnChanges } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit, OnChanges {

	private nextPage;
	private prevPage;
	pokemonUrl: any = '';
	isFavList: boolean = false;
	infoLabel: string = 'Carregando...';
	results = [];
	favorites = [];

	constructor(private appService: AppService) {
	}

	ngOnInit() {
		this.getPokemonList();
		this.getAllFavorites();
	}

	ngOnChanges(){
		console.log("change list component");
	}

	getAllFavorites(){
		this.appService.readFavData().subscribe((response) => {
			if(response != null) {
				this.favorites = [];
				this.favorites = response;
			} else {
				this.favorites = [];
			}
		});
	}

	setFilter(event: any) {

		this.getAllFavorites();

		if(event.target.value == 1){
			this.isFavList = true;
		} else {
			this.infoLabel = 'Carregando todos os pokemons...';
			this.isFavList = false;
		}

		this.favorites.length == 0 ? this.infoLabel = 'Lista favoritos vazia' : '';
	}

	setPokemonList(data) {
		this.results = data.results;
	}

	setNextPage(url) {
		this.nextPage = url.next;
	}

	setPrevPage(url) {
		this.prevPage = url.previous;
	}

	getNextPage() {
		return this.nextPage;
	}

	getPrevPage() {
		return this.prevPage;
	}
  
	getPokemonList() {

		const SELF = this;

		this.appService.getAllPokemons().subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => this.infoLabel = 'Ocorreu um erro inesperado, tente novamente ou volte mais tarde.');
	}
  
	toNextPage(url) {

		const SELF = this;

		this.results = [];
		this.pokemonUrl = '';

		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => this.infoLabel = 'Ocorreu um erro inesperado, tente novamente ou volte mais tarde.');
	}

	setPokemonUrl(url) {
		const SELF = this;

		this.appService.requestUrl(url).subscribe(response => {
			SELF.setPokemonStatus(response, url);
			window.scrollTo(0, 0)
		},err => this.infoLabel = 'Ocorreu um erro inesperado, tente novamente ou volte mais tarde.');
	}

	setPokemonStatus(status, url) {
		this.pokemonUrl = {
			id: status.id,
			url: url,
			name: status.name,
			sprite: status.sprites.front_default,
			weight: status.weight,
			height: status.height,
			base_exp: status.base_experience
		}
	}
}
