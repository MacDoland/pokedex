import FetchService from './fetch-service';

class PokemonService {
    static getPokemons(rangeMin, rangeMax) {
        return FetchService.get('https://pokedex-api.azurewebsites.net/api/pokemons/' + rangeMin + '/' + rangeMax);
    }
}

export default PokemonService;