const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index');

chai.use(chaiHttp);
const expect = chai.expect;

// let userLogin = {
//     "userName": "testing1",
//     "password": "12345678",
// }

// This test is for registeration form:-
describe('POST /register', () => {
    it('1. should successfully register a new user', (done) => {
        const userRegistration = {
          fullName: 'Testingss',
          userName: 'testing123',
          emailId: 'testing123@gmail.com',
          password: '12345678',
          newsPreferences: { categories: 'sports', sources: 'bbc-news' },
        };
    
        chai.request(server).post('/api/register').send(userRegistration).end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status').to.equal(true);
            expect(res.body).to.have.property('response').to.equal('Successfully registered!!');
            done();
          });
      });

    it("2. Validating the User Registeration Controller - Validates the User Info Invalid", (done) => {
      const userRegistration = {
        fullName: 'Testingss',
        userName:'',
        emailId: 'testing123@gmail.com',
        password: '12345678',
        newsPreferences: { categories: 'sports', sources: 'bbc-news' },
      };
  
      chai.request(server).post('/api/register').send(userRegistration).end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status').to.equal(false);
          done();
        });
    });
})


// This test is for login form:-

describe("'POST /login'", function(){

    it("1. Validating the User Login Credentials - Validates the User Controller Credentials Succefully", (done) => {
      const userRegistration = {
        userName:'Testing',
        password: '123445678',
      };
  
      chai.request(server).post('/api/login').send(userRegistration).end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status').to.equal(false);
          done();
        });
    });

    it("2. Validating the User Login Credentials - Validates the User Controller Credentials is Invalid", (done) => {
        userLogin["password"] = "123";
        let response =  Validator.validateLoginForm(userLogin);
        expect(response.status).equal(false);
        expect(response.message).to.include("Invalid:");
        done();
    });
});