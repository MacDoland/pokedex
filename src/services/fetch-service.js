class FetchService {
    static get(url) {
        let config = {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };

        return new Promise((resolve, reject) => {
            console.log("FetchService","fetching", url);
            fetch(url, config)
            .then((response) => {
                console.log("FetchService","fetching", url,"complete");
                resolve(response.json());
            },
            (error) => {
                reject(error);
            })
        });
    }
}

export default FetchService;