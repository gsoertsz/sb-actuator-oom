const debug = require("debug")("loadtest.spec");

const Promise = require("bluebird")
const ulid = require("ulid");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");

const chakram = require("chakram");

const { expect } = chakram;

const serviceHost = process.env.SERVICE_HOST || "localhost";

describe("Base load generation suite", () => {
    describe("The hello world service", () => {
	it("should handle large number of requests to an endpoint with variable path elements", (cb) => {

	    const urlFromParam = (param) => `http://${serviceHost}:9000/app/hello-world/${param}`;

	    const requests1 = _.range(0, 50000, 1).map(x => urlFromParam(x));
	    // const requests2 = _.range(50001, 100000, 1).map(x => urlFromParam(x));
	    
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

	    Promise.all([
		doBatch(requests1)
		//,doBatch(requests2)
	    ])
		.then(results => {
		    cb();
		})
		.catch(err => {
		    cb(err);
		});
	});
    });
});
