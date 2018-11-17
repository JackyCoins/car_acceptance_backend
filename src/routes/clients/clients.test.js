process.env.NODE_ENV = 'test';

//region Import libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
//endregion

//region Import models
const Client = require('../../mongoose/client');
//endregion

//region Import routes
const server = require('../../server');
//endregion

const should = chai.should();
chai.use(chaiHttp);

//region Tests
describe('routes: clients', () => {
  beforeEach(done => {
    Client.remove({}, err => {
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  it('GET /api/clients', done => {
    chai
      .request(server)
      .get('/api/clients')
      .end((err, res) => {
        should.not.exist(err);

        res.should.have.status(200);

        res.type.should.eql('application/json');
        res.body.should.eql({ results: [] });

        done();
      });
  });
});
//endregion
