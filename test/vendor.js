var chakram = require('chakram');
var expect = chakram.expect;

var url = 'http://www.stylemepretty.com/api/v2/vendor';
var vendorId = 393564;

describe('Vendor Endpoint', function () {

  it('should return a single vendor', function () {
    var response = chakram.get(url + '/' + vendorId);

    expect(response).to.have.header('content-type', 'application/json');
    expect(response).to.have.status(200);
    expect(response).to.have.schema({
      properties: {
        require: ['status', 'data'],
        status: {
          type: 'integer'
        },
        data: {
          type: 'object',
          required: ['id', 'name', 'taxonomy', 'type', 'is_lbb', 'url', 'thumb', 'description'],
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            taxonomy: {
              type: 'string'
            },
            type: {
              type: 'string'
            },
            is_lbb: {
              type: 'boolean'
            },
            url: {
              type: 'string'
            },
            thumb: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        }
      }
    });

    return chakram.wait();
  });

});
