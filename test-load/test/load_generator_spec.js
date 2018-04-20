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

	    const requests = _.range(0, 10000, 1).map(x => `http://localhost:9000/hello-world/${x}`);

	    Promise.each(requests, (url) => {
		return new Promise((resolve, reject) => {
		    const options = {
			headers: {
			    "Content-Type": "application/json",
			}
		    };

		    debug("Executing request {x}");

		    chakram.get(url, options)
			.then(resp => resolve(resp))
			.catch(err => reject(err));
		});
	    }).then(respArr => {
		cb();
	    }).catch(err => {
		cb(err);
	    });
	});
    });
});
