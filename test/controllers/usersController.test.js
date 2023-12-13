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
            console.log("resssssss", res.body)
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status').to.equal(true);
            expect(res.body).to.have.property('response').to.equal('Successfully registered!!');
            done();
          });
      });

    it("2. Validating the User Registeration Controller - Validates the User Info Invalid", (done) => {
        // userRegistration["id"] = 1;
        // let response =  Validator.validateRegisterForm(userRegistration);
        // expect(response.status).equal(false);
        // expect(response.message).to.include("Invalid:");
        done();
    });
})

// This test is for login form:-
// describe("Testing the validate Login Form functionality", function(){
//     it("1. Validating the User Login Credentials - Validates the User Credentials Succefully", (done) => {
//        let response =  Validator.validateLoginForm(userLogin);
//        expect(response.status).equal(true);
//        expect(response.message).equal("Valid!");
//        done();
//     });

//     it("2. Validating the User Login Credentials - Validates the User Credentials is Invalid", (done) => {
//         userLogin["password"] = "123";
//         let response =  Validator.validateLoginForm(userLogin);
//         expect(response.status).equal(false);
//         expect(response.message).to.include("Invalid:");
//         done();
//     });
// })