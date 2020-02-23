import FetchService from './fetch-service';

class PokemonService {
    static getPokemons(ids) {
        let promises = [];

        if(Array.isArray(ids)){

            ids.forEach((id) => {
                promises.push(FetchService.get('http://localhost:8083/api/pokemon/' + id));
            });
        }

        return Promise.all(promises);
    }
}

export default PokemonService;