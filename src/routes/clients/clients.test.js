process.env.NODE_ENV = 'test';

//region Import libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
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

  describe('GET /api/clients', () => {
    it('it should return all clients', done => {
      this.timeout(10000);

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
});
//endregion
