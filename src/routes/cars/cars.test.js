process.env.NODE_ENV = 'test';

//region Import libraries
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
//endregion

//region Import models
const Car = require('../../mongoose/car');
//endregion

//region Import routes
const server = require('../../server');
//endregion

chai.use(chaiHttp);

describe('routes: cars', () => {
  beforeEach(done => {
    Car.remove({}, err => {
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('GET /api/cars', () => {
    it('it should return all cars', done => {
      chai
        .request(server)
        .get('/api/cars')
        .end((err, res) => {
          should.not.exist(err);

          res.should.have.status(200);

          res.type.should.eql('application/json');
          res.body.should.eql({ results: [] });

          done();
        });
    });
  });

  describe('POST /api/cars', () => {
    it('it should return error if send data without "number"', done => {
      const car = {
        VIN: '12345678901234567'
      };

      chai
        .request(server)
        .post('/api/cars')
        .send(car)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('number');
          res.body.errors.number.message.should.eql('Path `number` is required.');

          done();
        });
    });

    it('it should return error if send data without "VIN"', done => {
      const car = {
        number: 'АВ123Г',
      };

      chai
        .request(server)
        .post('/api/cars')
        .send(car)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('VIN');
          res.body.errors.VIN.message.should.eql('Path `VIN` is required.');

          done();
        });
    });

    it('it should create a new car and return him', done => {
      const car = {
        number: 'АВ123Г',
        VIN: '12345678901234567'
      };

      chai
        .request(server)
        .post('/api/cars/')
        .send(car)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');

          const newCar = res.body;

          newCar.should.have.property('number');
          newCar.should.have.property('VIN');

          done();
        });
    });
  });

  describe('GET /api/cars/:id', () => {
    it('it should return a car by id', done => {
      const car = new Car({
        number: 'АВ123Г',
        VIN: '12345678901234567'
      });

      car.save((err, car) => {
        chai
          .request(server)
          .get(`/api/cars/${car.id}`)
          .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('number');
            res.body.should.have.property('VIN');
            res.body.should.have.property('_id').eql(car.id);

            done();
          })
      })
    })
  });

  describe('PUT /api/cars/:id', () => {
    it('it should update a car by id', done => {
      const dataForCar = {
        number: 'АВ123Г',
        VIN: '12345678901234567'
      };
      const car = new Car(dataForCar);

      car.save((err, car) => {
        chai
          .request(server)
          .put(`/api/cars/${car.id}`)
          .send(Object.assign(dataForCar, { number: 'ГО123А' }))
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('number').eql('ГО123А');
            res.body.should.have.property('VIN').eql('12345678901234567');

            done();
          })
      })
    })
  })

  describe('DELETE /api/cars/:id', () => {
    it('it should delete a car by id', done => {
      const dataForCar = {
        number: 'АВ123Г',
        VIN: '12345678901234567'
      };
      const car = new Car(dataForCar);

      car.save((err, car) => {
        chai
          .request(server)
          .delete(`/api/cars/${car.id}`)
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