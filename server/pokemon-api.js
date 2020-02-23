
const express = require('express')
    , app = express()
    , router = express.Router()
    , pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/'
    , _ = require('lodash')
    , memoryCache = require('memory-cache')
    , cacheKey = "pokemons"
    , cacheDuration = 3600000
    , port = process.env.port || process.env.PORT || 8083
    , rateLimit = require('express-rate-limit')
    , apiLimit = rateLimit({
        max: 100,// max requests
        windowMs: 60 * 60 * 1000, // 1 Hour
        message: 'You have exceeded the API limit, please wait a while before sending another request' // message to send  
    })
    , xss = require('xss-clean')
    , helmet = require('helmet')
    , cors = require('cors')
    , apiServiceExport = require('./api-service')
    , apiService = new apiServiceExport.APIService(5, 6000);

app.use(cors({
    origin: '*'
}));
app.use('/api', router);
app.use(xss());
app.use(helmet());
app.use(apiLimit);

router.use(function (req, res, next) {
    next();
});




router.route('/pokemon/:id')
    .get(async (req, res) => {
        var pokemon = memoryCache.get(cacheKey) || {};

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.params.id && pokemon && pokemon[req.params.id]) {
            console.log("requesting from memory");
            res.json({
                status: 'success',
                message: 'pokemon successfully',
                data: pokemon[req.params.id]
            });
        }
        else if (req.params.id) {
            console.log("requesting from pokemon api - pokemon: ", req.params.id);

            apiService.get(pokemonApiUrl + req.params.id).then((response) => {
                let data = {
                    id: response.data.id,
                    name: response.data.name,
                    imageUrl: response.data.sprites.front_default,
                    type: response.data.types.map((item) => {
                        return item.type.name;
                    })
                }

                apiService.get(response.data.species.url).then((response) => {
                    let textEntries = response.data.flavor_text_entries;
                    let filteredEntries = textEntries.filter((entry) => entry.language.name === 'en');

                    if (filteredEntries.length > 0) {
                        data.description = filteredEntries[0].flavor_text; //maybe do  safe get
                    }

                    pokemon[data.id] = data;

                    memoryCache.put(cacheKey, pokemon, cacheDuration);

                    console.log("Sending back a pokemons");
                    res.json({
                        status: 'success',
                        message: 'pokemon successfully retrieved',
                        data: data
                    });
                });
            });


            // await axios(pokemonApiUrl + req.params.id)
            //     .then(response => {
            //         let data = {
            //             id: response.data.id,
            //             name: response.data.name,
            //             imageUrl: response.data.sprites.front_default,
            //             type: response.data.types.map((item) => {
            //                 return item.type.name;
            //             })
            //         }

            //         pokemon[data.id] = data;

            //         memoryCache.put(cacheKey, pokemon, cacheDuration);

            //         res.json({
            //             status: 'success',
            //             message: 'pokemon successfully retrieved',
            //             data: data
            //         });
            //     });
        }
    });

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("API listening at http://%s:%s", host, port)
});
