const axios = require('axios');
const throttledQueue = require('throttled-queue');

class APIService {
    constructor(callLimit, refreshRate) {
        this.callLimit = callLimit;
        this.refreshRate = refreshRate;
        this.throttle = throttledQueue(callLimit, refreshRate);
    }

    _makeRequest(request) {
        this.throttle(() => {
            console.log("APIService","requesting", request.requestUrl);
            axios(request.requestUrl)
                .then(
                    request.resolveCallBack,
                    request.rejectCallBack
                );
        });
    }

    get(url) {
        return new Promise((resolve, reject) => {
            this._makeRequest({
                requestUrl: url,
                resolveCallBack: resolve,
                rejectCallBack: reject
            });
        });
    }
}

module.exports = APIService;

