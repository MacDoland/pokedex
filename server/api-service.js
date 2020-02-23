const axios = require('axios');
const queue = require('./queue');
const throttledQueue = require('throttled-queue');
var throttle = throttledQueue(80, 60000, true)

class APIService {
    constructor(callLimit, refreshRate) {
        this.currentRequestCount = 0;
        this.callLimit = callLimit;
        this.refreshRate = refreshRate;
        this.pendingRequestQueue = new queue.Queue();
        this.requestHistoryQueue = new queue.Queue();
        this.queueProcessingComplete = true;
        //  this._checkQueue();

    }

    _makeRequest(request) {
        throttle(() => {
            axios(request.requestUrl)
                .then(
                    request.resolveCallBack,
                    request.rejectCallBack
                );
        });
        // this.requestHistoryQueue.enqueue(new Date());
    }

    _processRequest(request) {
        this._makeRequest(request);
        // if (this.requestHistoryQueue.size < this.callLimit) {
        //     this._makeRequest(request);
        // }
        // else {
        //     this.pendingRequestQueue.enqueue(request);
        // }
    }

    _checkQueue() {
        console.log("_checkQueue", "rqs:", this.requestHistoryQueue.size, "prq:", this.pendingRequestQueue.size);
        // if (this.requestHistoryQueue.size > 0) {
        //     // let elapsedTime = new Date() - this.requestHistoryQueue.first.value;

        //     // if (elapsedTime > this.refreshRate) {
        //     //     this.requestHistoryQueue.dequeue();

        //     //     if (this.pendingRequestQueue.size > 0) {
        //     //         this._makeRequest(this.pendingRequestQueue.dequeue());
        //     //     }
        //     // }

        //     // if (this.queueProcessingComplete) {
        //     //     //begin queue processing

        //     //     this.queueProcessingComplete = false;
        //     // }
        // }
        // else {
        //     //end queue processing
        //     this.queueProcessingComplete = true;
        // }

        if (this.pendingRequestQueue.size > 0) {
            this._processRequest(this.pendingRequestQueue.dequeue());
        }


        setTimeout(this._checkQueue.bind(this), 5000);
    }

    get(url) {
        return new Promise((resolve, reject) => {
            this._processRequest({
                requestUrl: url,
                resolveCallBack: resolve,
                rejectCallBack: reject
            });
        });
    }
}

module.exports.APIService = APIService;

