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

  describe('GET /api/orders', () => {
    it('it should return all orders', done => {
      chai
        .request(server)
        .get('/api/orders')
        .end((err, res) => {
          should.not.exist(err);

          res.should.have.status(200);

          res.type.should.eql('application/json');
          res.body.should.eql({ results: [] });

          done();
        });
    });
  });

  describe('POST /api/orders', () => {
    it('it should return error if send data without "clientId"', done => {
      const order = {
        carId: 1,
        status: 3,
        masterId: 2,
        reason: 'Test',
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      };

      chai
        .request(server)
        .post('/api/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('clientId');
          res.body.errors.clientId.message.should.eql('Path `clientId` is required.');

          done();
        });
    });

    it('it should return error if send data without "carId"', done => {
      const order = {
        clientId: 2,
        status: 3,
        masterId: 2,
        reason: 'Test',
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      };

      chai
        .request(server)
        .post('/api/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('carId');
          res.body.errors.carId.message.should.eql('Path `carId` is required.');

          done();
        });
    });

    it('it should return error if send data without "masterId"', done => {
      const order = {
        clientId: 2,
        carId: 1,
        status: 3,
        reason: 'Test',
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      };

      chai
        .request(server)
        .post('/api/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('masterId');
          res.body.errors.masterId.message.should.eql('Path `masterId` is required.');

          done();
        });
    });

    it('it should return error if send data without "reason"', done => {
      const order = {
        clientId: 2,
        carId: 1,
        status: 3,
        masterId: 2,
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      };

      chai
        .request(server)
        .post('/api/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('reason');
          res.body.errors.reason.message.should.eql('Path `reason` is required.');

          done();
        });
    });

    it('it should create a new order and return him', done => {
      const order = {
        clientId: 2,
        carId: 1,
        status: 3,
        masterId: 2,
        reason: 'Test',
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      };

      chai
        .request(server)
        .post('/api/orders/')
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');

          const newOrder = res.body;

          newOrder.should.have.property('clientId');
          newOrder.should.have.property('carId');
          newOrder.should.have.property('status');
          newOrder.should.have.property('masterId');
          newOrder.should.have.property('reason');
          newOrder.should.have.property('equipment');
          newOrder.should.have.property('damage');
          newOrder.should.have.property('comment');
          newOrder.should.have.property('stocks');
          newOrder.should.have.property('created');
          newOrder.should.have.property('orderId');

          done();
        });
    });
  });

  describe('GET /api/orders/:id', () => {
    it('it should return a order by id', done => {
      const order = new Order({
        clientId: 2,
        carId: 1,
        status: 3,
        masterId: 2,
        reason: 'Test',
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      });

      order.save((err, order) => {
        chai
          .request(server)
          .get(`/api/orders/${order.id}`)
          .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('clientId');
            res.body.should.have.property('carId');
            res.body.should.have.property('status');
            res.body.should.have.property('masterId');
            res.body.should.have.property('reason');
            res.body.should.have.property('equipment');
            res.body.should.have.property('damage');
            res.body.should.have.property('comment');
            res.body.should.have.property('stocks');
            res.body.should.have.property('created');
            res.body.should.have.property('orderId');
            res.body.should.have.property('_id').eql(order.id);

            done();
          });
      });
    });
  });

  describe('PUT /api/orders/:id', () => {
    it('it should update a order by id', done => {
      const dataForOrder = {
        clientId: 2,
        carId: 1,
        status: 3,
        masterId: 2,
        reason: 'Test',
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      };
      const order = new Order(dataForOrder);

      order.save((err, order) => {
        chai
          .request(server)
          .put(`/api/orders/${order.id}`)
          .send(Object.assign(dataForOrder, { carId: 1, reason: 'Test2' }))
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('clientId');
            res.body.should.have.property('carId').eql(1);
            res.body.should.have.property('status');
            res.body.should.have.property('masterId');
            res.body.should.have.property('reason').eql('Test2');
            res.body.should.have.property('equipment');
            res.body.should.have.property('damage');
            res.body.should.have.property('comment');
            res.body.should.have.property('stocks');
            res.body.should.have.property('created');
            res.body.should.have.property('orderId');

            done();
          });
      });
    });
  });

  describe('DELETE /api/orders/:id', () => {
    it('it should delete a order by id', done => {
      const dataForOrder = {
        clientId: 2,
        carId: 1,
        status: 3,
        masterId: 2,
        reason: 'Test',
        equipment: [],
        damage: [],
        comment: 'test',
        stocks: [],
      };
      const order = new Order(dataForOrder);

      order.save((err, order) => {
        chai
          .request(server)
          .delete(`/api/orders/${order.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ok').eql(1);
            res.body.should.have.property('n').eql(1);

            done();
          });
      });
    });
  });
});
