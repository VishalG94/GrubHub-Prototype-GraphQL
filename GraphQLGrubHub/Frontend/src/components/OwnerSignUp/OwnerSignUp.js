import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { signupOwner } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import grubhub from '../../GrubhubOwner.jpg'
import { graphql, compose } from 'react-apollo'
import { addOwnerMutation } from '../../mutation/mutations'

// Define a Login Component
class OwnerSignUp extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      firstname: '',
      cuisine: '',
      lastname: '',
      email: '',
      password: '',
      restaurantname: '',
      zipcode: '',
      authFlag: false,
      authFailed: false
    }
    // Bind the handlers to this class
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
  }

  // Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
  }

  // username change handler to update state variable with the text entered by the user
  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // submit Login handler to send a request to the node backend
  submitSignUp = e => {
    var headers = new Headers()
    // prevent page from refresh
    e.preventDefault()
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      restaurantname: this.state.restaurantname,
      zipcode: this.state.zipcode,
      cuisine: this.state.cuisine
    }
    console.log(data);
    // set the with credentials to true
    axios.defaults.withCredentials = true
    // make a post request with the user data
    this.props.signupOwner(data, (res) => {
      if (res.status === 200) {
        console.log('Response signup user: ', res.data);
        sessionStorage.setItem('selectedRestaurant', data.restaurantname)
        sessionStorage.setItem('email', data.email)
        this.props.history.push('/ownerlogin');
      } else {
        console.log('Response signup failed');
        this.setState({ authFailed: true })
      }
    })
    // axios
    //   .post('http://localhost:3001/ownersignup', data)
    //   .then(response => {
    //     console.log('Status Code : ', response.status)
    //     if (response.status === 200) {
    //       // console.log(response);
    //       sessionStorage.setItem('selectedRestaurant', data.restaurantname )
    //       sessionStorage.setItem('email', data.email )
    //       this.setState({
    //         authFlag: true
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({ authFailed: true })
    //     console.log(err);
    //   })
  }

  submitOwnerSignup = (e) => {
    e.preventDefault()
    // alert(JSON.stringify(this.state));
    this.props.addOwnerMutation({
      variables: {
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        restaurant_name: this.state.restaurantname,
        restaurant_zipcode: parseInt(this.state.zipcode),
        cuisine: this.state.cuisine
      }
      // refetchQueries: [{ query: getBooksQuery }]
    }).then((res) => {
      console.log('Response signup user: ', res);
      window.location.replace('/login');
    }).catch((err) => {
      console.log("Failed")
      this.setState({ authFailed: true })
    });

  }

  render() {
    // redirect based on successful login
    let redirectVar = null
    let invalidtag = null
    if (cookie.load('cookie')) {
      redirectVar = <Redirect to='/ownerdetails' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Error encountered while signing up!</label>
      )
    }

    if (this.state.authFlag) {
      invalidtag = (
        redirectVar = <Redirect to='/ownerdetails' />
      )
    }
    // else{
    //   <label style={{ color: 'green' }}>User Create Successfully! Please login!</label>
    // }

    return (
      <div style={{ backgroundImage: `url(${grubhub})` }}>

        {redirectVar}
        <div class='container'>
          <div class='login-form'>
            <div class='main-div'>
              <div class='panel'>
                <h2>Create your restaurant account</h2>
                {invalidtag}
              </div>

              <div class='form-group'>
                <div class='row'>
                  <div style={{ color: "#6b6b83" }} class='col-sm-6'>First name</div>
                  <div style={{ color: "#6b6b83" }} class='col-sm-6'>Last name</div>
                </div>
              </div>
              <div class='form-group'>
                <div class='row'>
                  <div class='col-sm-6'>
                    <input
                      onChange={this.inputChangeHandler}
                      type='text'
                      class='form-control'
                      name='firstname'
                    />
                  </div>
                  <div class='col-sm-6'>
                    <input
                      onChange={this.inputChangeHandler}
                      type='text'
                      class='form-control'
                      name='lastname'
                    />
                  </div>
                </div>
              </div>

              <div class='form-group'>
                <div htmlFor="email" style={{ color: "#6b6b83" }}>Email</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='email'
                  pattern="/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/"
                  class='form-control'
                  name='email'
                />
              </div>
              <div class='form-group'>
                <div style={{ color: "#6b6b83" }}>Password (8 character minimum)</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='password'
                  class='form-control'
                  name='password'
                />
              </div>
              <div class='form-group'>
                <div style={{ color: "#6b6b83" }}>Restaurant name</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='restaurantname'
                />
              </div>
              <div class='form-group'>
                <div style={{ color: "#6b6b83" }}>Restaurant Zip Code</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='number'
                  class='form-control'
                  name='zipcode'
                />
              </div>
              <div class='form-group'>
                <div style={{ color: "#6b6b83" }}>Cuisine</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='cuisine'
                />
              </div>
              <div class='form-group'>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='gridCheck'
                  />
                  <label style={{ color: "#6b6b83", margin: "5px", fontWeight: "normal" }} class='form-check-label' for='gridCheck'>
                    Keep me signed in
                 </label>
                </div>
              </div>

              <div class='form-group'>
                <button type="submit" onClick={this.submitOwnerSignup} class='btn btn-warning'>
                  Create an account
               </button>
              </div>
              <div class='form-group'>
                <div style={{ textAlign: 'center' }}>or</div>
              </div>
              <div class='form-group'>
                <button class='btn btn-secondary'>
                  Continue with Facebook
               </button>
              </div>

              <div class='form-group'>
                <button class='btn btn-info'>
                  Continue with Google
               </button>
              </div>

              <div style={{ textAlign: 'center' }} class='form-group'>
                Have an account?  <Link to='/ownerlogin'>Sign in</Link>
              </div>

              <div style={{ fontSize: "12px", textAlign: 'center' }} class='form-group'>
                By creating your Grubhub account, you agree to the <span style={{ color: "#0070eb" }}>Terms of Use</span> and <span style={{ color: "#0070eb" }}>  Privacy Policy.</span>
              </div>


            </div>
          </div>
        </div>
      </div>
      // <div style={{backgroundImage:`url(${grubhub})` }}>

      //   {redirectVar}
      //   <div class='container'>
      //     <div class='login-form'>
      //       <div class='main-div'>
      //         <div class='panel'>
      //           <h2>Create your restaurant account</h2>
      //           {invalidtag}
      //         </div>

      //         <div class='form-group'>
      //           <div class='row'>
      //             <div style={{color:"#6b6b83"}} class='col-sm-6'>First name</div>
      //             <div style={{color:"#6b6b83"}} class='col-sm-6'>Last name</div>
      //           </div>
      //         </div>
      //         <div class='form-group'>
      //           <div class='row'>
      //             <div class='col-sm-6'>
      //               <input
      //                 onChange={this.inputChangeHandler}
      //                 type='text'
      //                 class='form-control'
      //                 name='firstname'
      //               />
      //             </div>
      //             <div class='col-sm-6'>
      //               <input
      //                 onChange={this.inputChangeHandler}
      //                 type='text'
      //                 class='form-control'
      //                 name='lastname'
      //               />
      //             </div>
      //           </div>
      //         </div>

      //         <div class='form-group'>
      //           <div htmlFor="email" style={{color:"#6b6b83"}}>Email</div>
      //           <input
      //             onChange={this.inputChangeHandler}
      //             type='email'
      //             pattern="/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/"
      //             class='form-control'
      //             name='email'
      //           />
      //         </div>
      //         <div class='form-group'>
      //           <div style={{color:"#6b6b83"}}>Password (8 character minimum)</div>
      //           <input
      //             onChange={this.inputChangeHandler}
      //             type='password'
      //             class='form-control'
      //             name='password'
      //           />
      //         </div>
      //         <div class='form-group'>
      //           <div style={{color:"#6b6b83"}}>Restaurant name</div>
      //           <input
      //             onChange={this.inputChangeHandler}
      //             type='text'
      //             class='form-control'
      //             name='restaurantname'
      //           />
      //         </div>
      //         <div class='form-group'>
      //           <div style={{color:"#6b6b83"}}>Cuisine</div>
      //           <input
      //             onChange={this.inputChangeHandler}
      //             type='text'
      //             class='form-control'
      //             name='cuisine'
      //           />
      //         </div>
      //         <div class='form-group'>
      //           <div style={{color:"#6b6b83"}}>Restaurant Zip Code</div>
      //           <input
      //             onChange={this.inputChangeHandler}
      //             type='number'
      //             class='form-control'
      //             name='zipcode'
      //           />
      //         </div>
      //         <div class='form-group'>
      //           <div class='form-check'>
      //             <input
      //               class='form-check-input'
      //               type='checkbox'
      //               id='gridCheck'
      //             />
      //             <label style={{color:"#6b6b83", margin:"5px", fontWeight:"normal" }} class='form-check-label' for='gridCheck'>
      //             Keep me signed in
      //             </label>
      //           </div>
      //         </div>

      //         <div class='form-group'>
      //           <button type="submit" onClick={this.submitSignUp}  class='btn btn-warning'>
      //             Create an account
      //           </button>
      //         </div>
      //         <div class='form-group'>
      //           <div style={{ textAlign: 'center' }}>or</div>
      //         </div>
      //         <div class='form-group'>
      //           <button  class='btn btn-secondary'>
      //             Continue with Facebook
      //           </button>
      //         </div>

      //         <div class='form-group'>
      //           <button  class='btn btn-info'>
      //             Continue with Google
      //           </button>
      //         </div>

      //         <div style={{ textAlign: 'center' }} class='form-group'>
      //         Have an account?  <Link to='/ownerlogin'>Sign in</Link>
      //         </div>

      //         <div style={{ fontSize: "12px", textAlign: 'center' }} class='form-group'>
      //         By creating your Grubhub account, you agree to the <span style={{color:"#0070eb"}}>Terms of Use</span> and <span style={{color:"#0070eb"}}>  Privacy Policy.</span>
      //         </div>


      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
  }
}
// export Login Component
// const validate = formValues => {
//   const error = {}
//   if (!formValues.email) {
//     error.email = 'Enter a valid email'
//   }
//   if (!formValues.password) {
//     error.password = 'Enter a valid Password'
//   }
//   if (!formValues.firstname) {
//     error.firstname = 'Enter a valid first name'
//   }
//   if (!formValues.lastname) {
//     error.lastname = 'Enter a valid last name'
//   }
//   return error
// }

// const mapStoreToProps = (state) => {
//   return { owner: state.owner }
// }
// export default connect(mapStoreToProps, { signupOwner: signupOwner })(reduxForm({
//   form: 'streamOwnerSignup',
//   validate: validate
// })(OwnerSignUp)
// )


export default compose(
  // graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(addOwnerMutation, { name: "addOwnerMutation" })
)(OwnerSignUp)

// export default OwnerSignUp
