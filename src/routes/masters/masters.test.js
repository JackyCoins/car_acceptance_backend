process.env.NODE_ENV = 'test';

//region Import libraries
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
//endregion

//region Import models
const Master = require('../../mongoose/master/index');
//endregion

//region Import routes
const server = require('../../server');
//endregion

chai.use(chaiHttp);

describe('routes: masters', () => {
  beforeEach(done => {
    Master.remove({}, err => {
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('GET /api/masters', () => {
    it('it should return all masters', done => {
      chai
        .request(server)
        .get('/api/masters')
        .end((err, res) => {
          should.not.exist(err);

          res.should.have.status(200);

          res.type.should.eql('application/json');
          res.body.should.eql({ results: [] });

          done();
        });
    });
  });

  describe('POST /api/masters', () => {
    it('it should return error if send data without "firstName"', done => {
      const master = {
        lastName: 'Petrov',
      };

      chai
        .request(server)
        .post('/api/masters')
        .send(master)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('firstName');
          res.body.errors.firstName.message.should.eql('Path `firstName` is required.');

          done();
        });
    });

    it('it should return error if send data without "lastName"', done => {
      const master = {
        firstName: 'Ivan',
      };

      chai
        .request(server)
        .post('/api/masters')
        .send(master)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('lastName');
          res.body.errors.lastName.message.should.eql('Path `lastName` is required.');

          done();
        });
    });

    it('it should create a new master and return him', done => {
      const master = {
        firstName: 'Ivan',
        lastName: 'Petrov',
      };

      chai
        .request(server)
        .post('/api/masters/')
        .send(master)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');

          const newMaster = res.body;

          newMaster.should.have.property('firstName');
          newMaster.should.have.property('lastName');

          done();
        });
    });
  });

  describe('GET /api/masters/:id', () => {
    it('it should return a master by id', done => {
      const master = new Master({ firstName: 'Ivan', lastName: 'Petrov' });

      master.save((err, master) => {
        chai
          .request(server)
          .get(`/api/masters/${master.id}`)
          .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('_id').eql(master.id);

            done();
          })
      })
    })
  });

  describe('PUT /api/masters/:id', () => {
    it('it should update a master by id', done => {
      const dataForMaster = { firstName: 'Ivan', lastName: 'Petrov'};
      const master = new Master(dataForMaster);

      master.save((err, master) => {
        chai
          .request(server)
          .put(`/api/masters/${master.id}`)
          .send(Object.assign(dataForMaster, { firstName: 'Paul' }))
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

  describe('DELETE /api/masters/:id', () => {
    it('it should delete a master by id', done => {
      const dataForMaster = { firstName: 'Ivan', lastName: 'Petrov'};
      const master = new Master(dataForMaster);

      master.save((err, master) => {
        chai
          .request(server)
          .delete(`/api/masters/${master.id}`)
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
