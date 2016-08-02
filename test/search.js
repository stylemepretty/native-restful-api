var _ = require('lodash');
var chakram = require('chakram');
var expect = chakram.expect;

var url = 'http://www.stylemepretty.com/api/v2/search';

describe('Search Endpoint', function () {

  before(function () {
    chakram.addProperty('smp', function(){});
    chakram.addMethod('searchResponse', function (response, items) {
      expect(response).to.have.header('content-type', 'application/json');
      expect(response).to.have.status(200);
      expect(response).to.have.schema({
        properties: {
          status: {
            type: 'integer'
          },
          data: {
            type: 'object',
            properties: {
              vendors: {
                type: 'array',
                maxItems: items,
                uniqueItems: true,
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer'
                    },
                    name: {
                      type: 'object',
                      properties: {
                        value: {
                          type: 'string'
                        },
                        thumb: {
                          type: 'string'
                        },
                        matched: {
                          type: 'array',
                          items: {
                            type: 'string'
                          }
                        }
                      }
                    }
                  }
                }
              },
              images: {
                type: 'array',
                maxItems: items,
                uniqueItems: true,
                items: {
                  type: 'object',
                    properties: {
                    id: {
                      type: 'integer'
                    },
                    thumb: {
                      type: 'string'
                    },
                    gallery: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer'
                        },
                        title: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              },
              galleries: {
                type: 'array',
                maxItems: items,
                uniqueItems: true,
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer'
                    },
                    thumb: {
                      type: 'string'
                    },
                    title: {
                      type: 'object',
                      properties: {
                        value: {
                          type: 'string'
                        },
                        matched: {
                          type: 'array',
                          items: {
                            type: 'string'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    });
  });

  it('should return top queries', function () {
    var response = chakram.get(url + '/top');

    expect(response).to.have.header('content-type', 'application/json');
    expect(response).to.have.status(200);
    expect(response).to.have.schema({
      status: {
        type: 'integer'
      },
      data: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    });

    return chakram.wait();
  });

  it('should return results', function () {
    return chakram.get(url + '/top').then(function (res) {
      return chakram.get(url + '/ios?query=' + _.first(_.shuffle(res.body.data)));
    }).then(function (response) {
      return expect(response).to.be.a.smp.searchResponse(3);
    });
  });

  it('should support max items', function () {
    var items = 5;
    return chakram.get(url + '/top').then(function (res) {
      return chakram.get(url + '/ios?items=' + items + '&query=' + _.first(_.shuffle(res.body.data)));
    }).then(function (response) {
      return expect(response).to.be.a.smp.searchResponse(items);
    });
  });
});
