const pokeDataFilePath = './server/poke-data.json'
    , FileService = require('./file-service')
    , pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/'
    , APIService = require('./api-service');

class PokeService {
    constructor() {
        this.pokeData = {};
        this.apiService = new APIService(100, 60000);

        FileService.readFile(pokeDataFilePath).then((parsedJSON) => {
            this.pokeData = parsedJSON;
        });
    }

    _getPokemonFromCache(id) {
        console.log("poke-service", "retrieving pokemon", id, "from cache");
        return this.pokeData[id];
    }

    _getPokemonFromAPI(id) {
        console.log("poke-service", "retrieving pokemon", id, "from api");
        return new Promise((resolve, reject) => {
            this.apiService.get(pokemonApiUrl + id).then((response) => {
                let data = this._map(response.data);

                console.log("poke-service", "retrieving pokemon description", id, "from api");
                this.apiService.get(response.data.species.url).then((response) => {
                    let textEntries = response.data.flavor_text_entries;
                    let filteredEntries = textEntries.filter((entry) => entry.language.name === 'en');

                    if (filteredEntries.length > 0) {
                        data.description = filteredEntries[0].flavor_text; //maybe do  safe get
                    }

                    console.log("poke-service", "retrieving pokemon", id, "from api - complete");
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    _map(fullData) {
        return {
            id: fullData.id,
            name: fullData.name,
            imageUrl: fullData.sprites.front_default,
            type: fullData.types.map((item) => {
                return item.type.name;
            }),
            lastUpdated: new Date().getTime()
        }
    }

    getPokemons(rangeStart, rangeEnd, writeToFile) {
        return new Promise((resolve, reject) => {
            let promises = [];
            for (var i = rangeStart; i < rangeEnd; i++) {
                promises.push(this.getPokemon(i));
            }

            Promise.all(promises).then((pokemons) => {
                if (writeToFile) {
                    console.log("poke-service writing pokemon to file");
                    FileService.writeFile(pokeDataFilePath, this.pokeData);
                }
                resolve(pokemons);
            });

        });
    }

    getPokemon(id, writeToFile) {
        return new Promise((resolve, reject) => {
            if (id && this.pokeData && this.pokeData[id]) {
                resolve(this._getPokemonFromCache(id));
            }
            else {
                this._getPokemonFromAPI(id).then((pokemon) => {
                    if (!this.pokeData[pokemon.id]) {
                        this.pokeData[pokemon.id] = pokemon;

                        if (writeToFile) {
                            FileService.writeFile(pokeDataFilePath, this.pokeData);
                        }
                    }

                    resolve(pokemon);
                },
                    (error) => {
                        reject(error);
                    });
            }
        });
    }
}

module.exports = PokeService;