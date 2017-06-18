const serverUtilities = require('./ServerUtilities.js');
const assert = require('assert');
const MockReq = require('mock-req');

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
    })
});
