const request =  require('supertest');
const app =  require('../src/app.js');

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

describe('GET /api/v1/jobs', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/jobs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, {
        message: 'Not Found'
      }, done);
  });
});

describe('GET /api/v1/jobs/upcoming', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/jobs/upcoming')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
