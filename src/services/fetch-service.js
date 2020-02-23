class FetchService {
    static get(url) {
        let config = {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };

        return new Promise((resolve, reject) => {
            fetch(url, config)
            .then((response) => {
                resolve(response.json());
            })
        });
    }
}

export default FetchService;