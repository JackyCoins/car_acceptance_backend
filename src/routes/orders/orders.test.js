process.env.NODE_ENV = 'test';

//region Import libraries
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
//endregion

//region Import models
const Order = require('../../mongoose/order');
//endregion

//region Import routes
const server = require('../../server');
//endregion

chai.use(chaiHttp);

describe('routes: orders', () => {
  beforeEach(done => {
    Order.remove({}, err => {
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  it('GET /api/orders/', done => {
    chai
      .request(server)
      .get('/api/orders/')
      .end((error, response) => {
        should.not.exist(error);

        response.status.should.eql(200);
        response.type.should.eql('application/json');

        response.body.should.eql({ results: [] });

        done();
      });
  });
});
