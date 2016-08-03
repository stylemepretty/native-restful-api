var chakram = require('chakram');
var expect = chakram.expect;

var url = 'http://www.stylemepretty.com/api/v2/image';
var imageId = 4474413;

describe('Image Endpoint', function () {

  it('should return a single image', function () {
    var response = chakram.get(url + '/' + imageId);

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
          required: ['id', 'gid', 'width', 'height', 'path', 'tags', 'vendors'],
          properties: {
            id: {
              type: 'integer'
            },
            gid: {
              type: 'integer'
            },
            width: {
              type: 'integer'
            },
            height: {
              type: 'integer'
            },
            path: {
              type: 'string'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            vendors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  required: ['taxonomy', 'name', 'id'],
                  taxonomy: {
                    type: 'string'
                  },
                  name: {
                    type: 'string'
                  },
                  id: {
                    type: 'integer'
                  }
                }
              }
            }
          }
        }
      }
    });

    return chakram.wait();
  });

});
