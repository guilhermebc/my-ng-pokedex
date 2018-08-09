import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	
	private nextPage;
  	private prevPage;
  	title: string = 'my-ng-pokedex';
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

		this.appService.getPokemons().subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => console.log('error', err));
	}

	toNextPage(url){

		const SELF = this;

		this.appService.requestPage(url).subscribe(response => {
			SELF.setPokemonList(response);
			SELF.setNextPage(response);
			SELF.setPrevPage(response);
		},err => console.log('error', err));
	}
	  
}
