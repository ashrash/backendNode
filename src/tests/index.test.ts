import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp)

describe('Hello API Request', () => {
  it('Health check endpoint test', () => {
    return chai.request('http://localhost:3000').get('/health')
      .then(res => {
        chai.expect(res.body).has.property('data');
      })
  })

  // Below test will fail if there are no users
  it('User get endpoint test', () => {
    return chai.request('http://localhost:3000').get('/users')
      .then(res => {
        chai.expect(res.body?.data).to.have.length.above(0);
      })
  })

})