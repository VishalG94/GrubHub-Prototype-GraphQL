import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { loginowner } from '../../actions'
import { ownerdetails } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import { graphql, compose } from 'react-apollo'
import { loginOwnerMutation } from '../../mutation/mutations'
// Define a Login Component
class OwnerLogin extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authFailed: false
    }
    // Bind the handlers to this class
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    // this.submitLogin = this.submitLogin.bind(this)
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // submit Login handler to send a request to the node backend
  submitLogin = e => {
    var headers = new Headers()
    // prevent page from refresh
    e.preventDefault()
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    // set the with credentials to true
    axios.defaults.withCredentials = true
    console.log(data)
    // make a post request with the user data
    this.props.loginowner(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data)
        this.setState({
          authFlag: true
        })
        const owner = jwtDecode(res.data.token)
        console.log('owner', owner)
        sessionStorage.setItem('email', owner.email)
        const cookies = new Cookies()
        cookies.set('cookie', res.data.token, {
          maxAge: 900000,
          httpOnly: false,
          path: '/'
        })
        // sessionStorage.setItem('ownerdata', JSON.stringify(owner))
        this.props.ownerdetails({ params: data }, res => {
          if (res.status === 200) {
            console.log('Inside ownerdetails response', res.data)
            sessionStorage.setItem('ownerdata', JSON.stringify(res.data[0]))
            this.props.history.push('/ownerrestaurantmenu')
          } else {
            console.log('Please enter valid credentials')
          }
        })

      } else {
        alert('Please enter valid credentials')
      }
    })

    // axios
    //   .post('http://localhost:3001/ownerlogin', data)
    //   .then(response => {
    //     console.log('Status Code : ', response.status)
    //     if (response.status === 200) {
    //       sessionStorage.setItem('email', data.email);
    //       console.log(response.data[0]);
    //       sessionStorage.setItem('ownerdata', JSON.stringify(response.data[0]));
    //       this.setState({
    //         authFlag: true
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({ authFailed: true })
    //   })
  }
  submitLogin = (e) => {
    e.preventDefault()
    // alert(JSON.stringify(this.state));
    // alert(this.state.email)
    // alert(this.state.password)
    this.props.loginOwnerMutation({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
      // refetchQueries: [{ query: getBooksQuery }]
    }).then((res) => {
      console.log('Response signup user: ', res.data);
      const cookies = new Cookies()
      cookies.set('cookie', res.data.token, {
        maxAge: 900000,
        httpOnly: false,
        path: '/'
      })
      sessionStorage.setItem('ownerDtls', JSON.stringify(res.data.loginOwner))
      window.location.replace('/ownerrestaurantmenu');
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
      redirectVar = <Redirect to='/ownerrestaurantmenu' />
      // redirectVar = <Redirect to='/ownerlogin' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    return (
      <div>
        {redirectVar}
        <div class='container'>
          <div class='login-form'>
            <div class='main-div'>
              <div class='panel'>
                <h2 style={{ color: "red", fontWeight: "normal", fontSize: "23px", fontFamily: "Impact" }}>GRUBHUB <span style={{ color: "BLACK", fontWeight: "normal", fontSize: "23px", fontFamily: "Impact" }}>FOR RESTAURANT</span></h2>

                {invalidtag}
              </div>

              <div class='form-group'>
                <div htmlFor="email" style={{ color: "#6b6b83" }}>Email</div>
                <input
                  onChange={this.inputChangeHandler}
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  class='form-control'
                  name='email'
                />
              </div>
              <br />
              <div class='form-group'>
                <div>Password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='password'
                  class='form-control'
                  name='password'
                />
              </div>
              <br />
              <div class='form-group'>
                <button onClick={this.submitLogin} class='btn btn-secondary'>
                  Sign in
                </button>
              </div>
              <br />

              <div class='form-group' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '17px' }}>
                <a href='#'>
                  Forgot Username
                </a>
              </div>

              <div class='form-group' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '17px' }}>
                <a href='#'>
                  Forgot Password
                </a>
              </div>
              <div style={{ textAlign: 'center' }} class='form-group'>
                <Link to='/ownersignup'>Create an account</Link>
              </div>



            </div>
          </div>
        </div>
      </div>
    )
  }
}
// export Login Component
// export default OwnerLogin

// const validate = formValues => {
//   const error = {}
//   if (!formValues.email) {
//     error.email = 'Enter a valid email'
//   }
//   if (!formValues.password) {
//     error.password = 'Enter a valid Password'
//   }
//   return error
// }

// const mapStateToProps = state => {
//   return { owner: state.owner }
// }

// export default connect(
//   mapStateToProps,
//   { loginowner, ownerdetails }
// )(
//   reduxForm({
//     form: 'streamOwnerLogin',
//     validate: validate
//   })(OwnerLogin)
// )


export default compose(
  graphql(loginOwnerMutation, { name: "loginOwnerMutation" }),
  // graphql(loginUserMutation, { name: "loginUserMutation" })
)(OwnerLogin)