import FetchService from './fetch-service';

class PokemonService {
    static getPokemons(rangeMin, rangeMax) {
        return FetchService.get('http://localhost:8083/api/pokemons/' + rangeMin + '/' + rangeMax);
    }
}

export default PokemonService;