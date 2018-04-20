const debug = require("debug")("loadtest.spec");

const Promise = require("bluebird")
const ulid = require("ulid");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");

const chakram = require("chakram");

const { expect } = chakram;

describe("Base load generation suite", () => {
    describe("The hello world service", () => {
	it("should handle large number of requests to an endpoint with variable path elements", (cb) => {

	    const requests1 = _.range(0, 500000, 1).map(x => `http://localhost:9000/hello-world/${x}`);
	    const requests2 = _.range(500001, 1000000, 1).map(x => `http://localhost:9000/hello-world/${x}`);
	    const requests3 = _.range(1000001, 1500000, 1).map(x => `http://localhost:9000/hello-world/${x}`);
	    
	    const doBatch = (requests) => {
		return Promise.each(requests, (url) => {
		    return new Promise((resolve, reject) => {
			const options = {
			    headers: {
				"Content-Type": "application/json",
			    }
			};

			debug(`Executing request ${url}`);

			chakram.get(url, options)
			    .then(resp => {
				debug(resp.body);
				resolve(resp);
			    })
			    .catch(err => reject(err));
		    });
		});
	    };

	    Promise.all([doBatch(requests1), doBatch(requests2), doBatch(requests3)])
		.then(results => {
		    cb();
		})
		.catch(err => {
		    cb(err);
		});
	});
    });
});
