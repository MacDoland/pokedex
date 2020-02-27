
const express = require('express')
    , app = express()
    , router = express.Router()
    , port = process.env.port || process.env.PORT || 8083
    , rateLimit = require('express-rate-limit')
    , apiLimit = rateLimit({
        max: 1000,// max requests
        windowMs: 60 * 60 * 1000, // 1 Hour
        message: 'You have exceeded the API limit, please wait a while before sending another request' // message to send  
    })
    , xss = require('xss-clean')
    , helmet = require('helmet')
    , cors = require('cors')
    , APIService = require('./api-service')
    , PokeService = require('./poke-service')
    , pokeService = new PokeService();

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

router.route('/pokemons/:min/:max')
    .get(async (req, res) => {
        console.log("range min", req.params.min, "range max", req.params.max);
        let rangeMin = parseInt(req.params.min) || 1;
        let rangeMax = parseInt(req.params.max) || 20;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        pokeService.getPokemons(rangeMin, rangeMax + 1, true).then((pokemons) => {
            
            res.json({
                status: 'success',
                message: 'pokemon successfully retrieved',
                data: pokemons
            }),
                (error) => {
                    console.error(error);
                };
        });
    });

    app.get('/hello', function (req, res) {
        res.json("Hello World!");
    });
    

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("API listening at http://%s:%s", host, port)
});
