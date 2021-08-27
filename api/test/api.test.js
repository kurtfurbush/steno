import request from 'supertest';

import app from '../src/app.js';

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        message: 'Try a supported route'
      }, done);
  });
});

describe('GET /api/v1/weather', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/weather')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, {
        message: 'Not Found'
      }, done);
  });
});

describe('GET /api/v1/weather/32223', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/weather/32223')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, {
        message: 'Not Found'
      }, done);
  });
});

describe('GET /api/v1/weather/daily/32223', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/weather/daily/32223')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
