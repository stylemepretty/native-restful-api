var chakram = require('chakram');
var expect = chakram.expect;

var url = 'http://www.stylemepretty.com/api/v2/gallery';
var galleryId = 70287;

describe('Gallery Endpoint', function () {

  before(function () {
    chakram.addProperty('smp', function(){});
    chakram.addMethod('galleriesResponse', function (response, items) {
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
            required: ['perPage', 'page', 'total', 'results'],
            results: {
              type: 'object',
              required: ['id', 'title', 'thumb', 'thumbs', 'images'],
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer'
                  },
                  title: {
                    type: 'string'
                  },
                  thumb: {
                    type: 'string'
                  },
                  thumbs: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  images: {
                    type: 'integer'
                  }
                }
              }
            }
          }
        }
      });
    });
  });

  it('should return a single gallery', function () {
    var response = chakram.get(url + '/' + galleryId);

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
          required: ['id', 'title', 'thumb', 'thumbs', 'post', 'details', 'vendors', 'images'],
          properties: {
            id: {
              type: 'integer'
            },
            title: {
              type: 'string'
            },
            thumb: {
              type: 'string'
            },
            thumbs: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            post: {
              type: 'object',
              required: ['published'],
              properties: {
                published: {
                  type: 'integer'
                },
                title: {
                  type: 'string'
                },
                url: {
                  type: 'string'
                }
              }
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  required: ['taxonomy', 'term', 'id'],
                  taxonomy: {
                    type: 'string'
                  },
                  term: {
                    type: 'string'
                  },
                  id: {
                    type: 'integer'
                  }
                }
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
            },
            images: {
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'gid', 'path', 'width', 'height'],
                properties: {
                  id: {
                    type: 'integer'
                  },
                  gid: {
                    type: 'integer'
                  },
                  path: {
                    type: 'string'
                  },
                  width: {
                    type: 'integer'
                  },
                  height: {
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

  it('should return galleries', function () {
    var response = chakram.get(url);
    return expect(response).to.be.a.smp.galleriesResponse(3);
  });

});
