process.env.NODE_ENV = 'test';

//region Import libraries
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
//endregion

//region Import routes
const server = require('../../server');
//endregion

chai.use(chaiHttp);

describe('routes: index', () => {
  describe('GET /api/orders/', () => {
    after(done => {
      server.close();
      done();
    });

    it('it should return text "Orders"', done => {
      chai
        .request(server)
        .get('/api/orders/')
        .end((error, response) => {
          should.not.exist(error);

          response.status.should.eql(200);
          response.type.should.eql('text/plain');
          response.text.should.eql('Orders');
          // response.body.status.should.equal('success');
          // response.body.message.should.eql('Orders');

          done();
        });
    });
  });
});
