const serverUtilities = require('./ServerUtilities.js');
const assert = require('assert');
const MockReq = require('mock-req');
const http = require('http');

describe('ServerUtilities', function() {
    describe('#getPostRequestBody', function() {
        it('should parse body of POST request', function() {
            let request = new MockReq({
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });
            request.write({
                text: 'testing text'
            });
            request.end();

            return serverUtilities.getPostRequestBody(request)
                .then(
                    (body) => {
                        assert.deepEqual(body, {text: 'testing text'});
                    }
                );
        });

        it('should return error if request not a POST method', function() {
            let request = new MockReq();

            return serverUtilities.getPostRequestBody(request)
                .then(
                    () => {},
                    (error) => {
                        assert.equal(error, 'Request object is not POST method');
                    }
                );
        });
    });

    describe('#getQueryParams', function() {
        it('parse query params and return object', function() {

            let request = new http.IncomingMessage;
            request.method = 'GET';
            request.url = '/test?text=testing';

            return serverUtilities.getQueryParams(request)
                .then(
                    (body) => {
                        assert.deepEqual(body, {text: 'testing'});
                    },
                    (error) => {
                        assert.ifError(error);
                    }
                );
        });
        it('must throw Error if request isn\'t instance of http.IncomingMessage', function() {
            let request = new MockReq({
                method: 'GET',
                url: '/test?text=testing'
            });

            return serverUtilities.getQueryParams(request)
                .then(
                    (body) => {
                        assert.fail('request parsed', 'must throw error instead', undefined, '>');
                    },
                    (error) => {
                        assert.ok(error);
                    }
                );
        })
    })
});
