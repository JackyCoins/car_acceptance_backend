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

  describe('GET /api/clients', () => {
    it('it should return all clients', done => {
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

  describe('POST /api/clients', () => {
    it('it should return error if send data without "firstName"', done => {
      const client = {
        lastName: 'Petrov',
      };

      chai
        .request(server)
        .post('/api/clients')
        .send(client)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('firstName');
          res.body.errors.firstName.message.should.eql('Path `firstName` is required.');

          done();
        });
    });

    it('it should return error if send data without "lastName"', done => {
      const client = {
        firstName: 'Ivan',
      };

      chai
        .request(server)
        .post('/api/clients')
        .send(client)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('lastName');
          res.body.errors.lastName.message.should.eql('Path `lastName` is required.');

          done();
        });
    });

    it('it should create a new client and return him', done => {
      const client = {
        firstName: 'Ivan',
        lastName: 'Petrov',
      };

      chai
        .request(server)
        .post('/api/clients/')
        .send(client)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');

          const newClient = res.body;

          newClient.should.have.property('firstName');
          newClient.should.have.property('lastName');

          done();
        });
    });
  });

  describe('GET /api/clients/:id', () => {
    it('it should return a client by id', done => {
      const client = new Client({ firstName: 'Ivan', lastName: 'Petrov' });

      client.save((err, client) => {
        chai
          .request(server)
          .get(`/api/clients/${client.id}`)
          .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('_id').eql(client.id);

            done();
          })
      })
    })
  });

  describe('PUT /api/clients/:id', () => {
    it('it should update a client by id', done => {
      const dataForClient = { firstName: 'Ivan', lastName: 'Petrov'};
      const client = new Client(dataForClient);

      client.save((err, client) => {
        chai
          .request(server)
          .put(`/api/clients/${client.id}`)
          .send(Object.assign(dataForClient, { firstName: 'Paul' }))
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName').eql('Paul');
            res.body.should.have.property('lastName').eql('Petrov');

            done();
          })
      })
    })
  })

  describe('DELETE /api/clients/:id', () => {
    it('it should delete a client by id', done => {
      const dataForClient = { firstName: 'Ivan', lastName: 'Petrov'};
      const client = new Client(dataForClient);

      client.save((err, client) => {
        chai
          .request(server)
          .delete(`/api/clients/${client.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ok').eql(1);
            res.body.should.have.property('n').eql(1);

            done();
          })
      })
    })
  })
});
//endregion
