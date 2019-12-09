var assert = require('assert')
var supertest = require('supertest')
var should = require('should')

var server = supertest.agent('http://localhost:3001')

// Unit Test begin
describe('MochaTest', function () {
  // Login
  it('should login user', function (done) {
    server
      .get('/ownerdetails')
      .send({ params: {email: 'vishalgadapa86@gmail.com'} })
      .expect(200)
      .end(function (err, res) {
        console.log('Status: ', res.status)
        res.status.should.equal(200)
        done()
      })
  })

  // Signup
  // it("should add new user", function(done) {
  //     server
  //         .post("/createuser")
  //         .send({
  //             username: "test77",
  //             email: "test@gmail.com",
  //             password: "pass",
  //             type: "traveller"
  //         })
  //         .expect(200)
  //         .end(function(err, res) {
  //             console.log("Status: ", res.status);
  //             res.status.should.equal(200);
  //             done();
  //         });
  // });

  // menu details
  it('Should get menu details for a particular menuid', function (done) {
    server
      .get('/menudetails')
      .send({
        id: 3
      })
      .expect(200)
      .end(function (err, res) {
        console.log('Status: ', res.status)
        res.status.should.equal(200)
        done()
      })
  })

  // User Profile
  it('Should fetch user profile details', function (done) {
    server
      .get('/userprofile')
      .query({ email: 'vishalgadapa86@gmail.com' })
      .expect(200)
      .end(function (err, res) {
        console.log('Status: ', res.status)
        res.status.should.equal(200)
        done()
      })
  })

  // Owner Bookings
  it('should update username', function (done) {
    server
      .post('/updateusername')
      .send({ firstname: 'Vishal', lastname: 'Gadapa', email:'vishalgadapa86@gmail.com', password:'Vishal' })
      .expect(200)
      .end(function (err, res) {
        console.log('Status: ', res.status)
        res.status.should.equal(200)
        done()
      })
  })

  //   //
    it('should update phone number', function (done) {
      server
        .get('/restaurantsections')
        .send({ restaurant_name: 'Bawarchi' })
        .expect(200)
        .end(function (err, res) {
          console.log('Status: ', res.status)
          res.status.should.equal(200)
          done()
        })
    })
})
