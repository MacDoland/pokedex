import FetchService from './fetch-service';

class PokemonService {
    static getPokemons(ids, callback) {
        let promises = [];

        if(Array.isArray(ids)){

            ids.forEach((id) => {
                FetchService.get('http://localhost:8083/api/pokemon/' + id).then(callback);
            });
        }
    }
}

export default PokemonService;