process.env.NODE_ENV = 'test';

//region Import libraries
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
//endregion

//region Import routes
const server = require('./server');
//endregion

chai.use(chaiHttp);

describe('routes: index', () => {
  describe('GET /', () => {
    after(done => {
      server.close();
      done();
    });

    it('it should return text "Car acceptance backend"', done => {
      chai
        .request(server)
        .get('/')
        .end((error, response) => {
          should.not.exist(error);

          response.status.should.eql(200);
          response.type.should.eql('text/plain');
          response.text.should.eql('Car acceptance backend');

          done();
        });
    });
  });
});