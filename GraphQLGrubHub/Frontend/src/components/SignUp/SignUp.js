import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { signupUser } from '../../actions'
// import { Field, reduxForm } from 'redux-form'
// import { connect } from 'react-redux'
// import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import { addUserMutation } from '../../mutation/mutations'
import { getBooksQuery } from '../../queries/queries'

// Define a SignUp Component
class SignUp extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
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
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    // alert(JSON.stringify(this.state));
    this.props.addUserMutation({
      variables: {
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      }
      // refetchQueries: [{ query: getBooksQuery }]
    }).then((res) => {
      console.log('Response signup user: ', res);
      this.props.history.push('/login');
    }).catch((err) => {
      console.log("Failed")
      this.setState({ authFailed: true })
    });

  }

  render() {
    // alert(this.props.data)
    // redirect based on successful login
    // console.log(this.props)
    let redirectVar = null
    let invalidtag = null
    if (cookie.load('cookie')) {
      redirectVar = <Redirect to='/home' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Error occured while signing up please provide valid details!</label>
      )
    }
    // else{
    //   <label style={{ color: 'green' }}>User Create Successfully! Please login!</label>
    // }

    return (
      <div>
        {redirectVar}
        <div class='container'>
          <div class='login-form'>
            <div class='main-div'>
              <div class='panel'>
                <h2>Create your account</h2>
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
                <button type="submit" onClick={this.submitForm} class='btn btn-warning'>
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
                Have an account?  <Link to='/login'>Sign in</Link>
              </div>

              <div style={{ fontSize: "12px", textAlign: 'center' }} class='form-group'>
                By creating your Grubhub account, you agree to the <span style={{ color: "#0070eb" }}>Terms of Use</span> and <span style={{ color: "#0070eb" }}>  Privacy Policy.</span>
              </div>


            </div>
          </div>
        </div>
      </div>
      // <form
      //   // className='ui form error'
      //   onSubmit={this.onSubmit}
      // >
      //   <div>
      //     {redirectVar}
      //     <div class='container'>
      //       <div class='login-form'>
      //         <div class='main-div'>
      //           <div class='panel'>
      //             <h2>Create your account</h2>
      //             {invalidtag}
      //           </div>

      //           {/* <div class='form-group'>
      //           <div class='row'>
      //             <div style={{color:"#6b6b83"}} class='col-sm-6'>First name</div>
      //             <div style={{color:"#6b6b83"}} class='col-sm-6'>Last name</div>
      //           </div>
      //         </div> */}
      //           <div class='form-group'>
      //             <div class='row'>
      //               <div class='col-sm-6'>
      //                 {/* <input
      //                 onChange={this.inputChangeHandler}
      //                 type='text'
      //                 class='form-control'
      //                 name='firstname'
      //               /> */}
      //                 {/* <Field
      //                   name='firstname'
      //                   component={this.renderInput}
      //                   label='First name'
      //                 /> */}
      //                 <div>
      //                   <div htmlFor='email' style={{ color: '#6b6b83' }}>
      //                     First name
      //                   </div>
      //                   <input class='form-control' name='firstname' />
      //                   {/* {this.renderError(meta)} */}
      //                 </div>
      //               </div>
      //               <div class='col-sm-6'>
      //                 {/* <input
      //                 onChange={this.inputChangeHandler}
      //                 type='text'
      //                 class='form-control'
      //                 name='lastname'
      //               /> */}
      //                 {/* <Field
      //                   name='lastname'
      //                   component={this.renderInput}
      //                   label='Last name'
      //                 /> */}
      //                 <div>
      //                   <div htmlFor='email' style={{ color: '#6b6b83' }}>
      //                     Last name
      //                   </div>
      //                   <input class='form-control' name='lastname' />
      //                   {/* {this.renderError(meta)} */}
      //                 </div>
      //               </div>
      //             </div>
      //           </div>

      //           <div class='form-group'>
      //             {/* <div htmlFor="email" style={{color:"#6b6b83"}}>Email</div> */}
      //             {/* <input
      //             onChange={this.inputChangeHandler}
      //             type='email'
      //             pattern="/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/"
      //             class='form-control'
      //             name='email'
      //           /> */}
      //             {/* <Field
      //               name='email'
      //               component={this.renderInput}
      //               label='Email'
      //             /> */}
      //             <div>
      //               <div htmlFor='email' style={{ color: '#6b6b83' }}>
      //                 Email
      //                   </div>
      //               <input class='form-control' name='email' />
      //               {/* {this.renderError(meta)} */}
      //             </div>
      //             <br />
      //           </div>
      //           <div class='form-group'>
      //             {/* <div style={{color:"#6b6b83"}}>Password (8 character minimum)</div> */}
      //             {/* <input
      //             onChange={this.inputChangeHandler}
      //             type='password'
      //             class='form-control'
      //             name='password'
      //           /> */}
      //             {/* <Field
      //               name='password'
      //               component={this.renderInput}
      //               label='Password (8 character minimum)'
      //             /> */}
      //             <div>
      //               <div htmlFor='email' style={{ color: '#6b6b83' }}>
      //                 Password
      //                   </div>
      //               <input class='form-control' name='password' />
      //               {/* {this.renderError(meta)} */}
      //             </div>
      //             <br />
      //           </div>
      //           <div class='form-group'>
      //             <div class='form-check'>
      //               <input
      //                 class='form-check-input'
      //                 type='checkbox'
      //                 id='gridCheck'
      //               />
      //               <label
      //                 style={{
      //                   color: '#6b6b83',
      //                   margin: '5px',
      //                   fontWeight: 'normal'
      //                 }}
      //                 class='form-check-label'
      //                 for='gridCheck'
      //               >
      //                 Keep me signed in
      //               </label>
      //             </div>
      //           </div>

      //           <div class='form-group'>
      //             <button
      //               type='submit'
      //               // onClick={this.submitSignUp}
      //               class='btn btn-warning'
      //             >
      //               Create an account
      //             </button>
      //           </div>
      //           <div class='form-group'>
      //             <div style={{ textAlign: 'center' }}>or</div>
      //           </div>
      //           <div class='form-group'>
      //             <button class='btn btn-secondary'>
      //               Continue with Facebook
      //             </button>
      //           </div>

      //           <div class='form-group'>
      //             <button class='btn btn-info'>Continue with Google</button>
      //           </div>

      //           <div style={{ textAlign: 'center' }} class='form-group'>
      //             Have an account? <Link to='/login'>Sign in</Link>
      //           </div>

      //           <div
      //             style={{ fontSize: '12px', textAlign: 'center' }}
      //             class='form-group'
      //           >
      //             By creating your Grubhub account, you agree to the{' '}
      //             <span style={{ color: '#0070eb' }}>Terms of Use</span> and{' '}
      //             <span style={{ color: '#0070eb' }}> Privacy Policy.</span>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </form>
    )
  }
}

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

// export Login Component
// export default SignUp
// const mapStoreToProps = (state) => {
//   return { user: state.user }
// }
// export default connect(mapStoreToProps, { signupUser: signupUser })(reduxForm({
//   form: 'streamSignup',
//   validate: validate
// })(SignUp)
// )


export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(addUserMutation, { name: "addUserMutation" })
)(SignUp)
