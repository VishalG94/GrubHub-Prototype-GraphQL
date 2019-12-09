import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { loginuser } from '../../actions'
// import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { graphql, compose } from 'react-apollo'
import Cookies from 'universal-cookie'
import { getBooksQuery } from '../../queries/queries'
import { loginUserMutation } from '../../mutation/mutations'

// Define a Login Component
class Login extends Component {
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
  // renderError = ({ error, touched }) => {
  //   if (touched && error) {
  //     return (
  //       <div>
  //         <label style={{ color: 'red' }}>{error}</label>
  //       </div>
  //     )
  //   }
  // }

  // renderInput = ({ input, type, label, meta }) => {
  //   return (
  //     <div>
  //       <div htmlFor='email' style={{ color: '#6b6b83' }}>
  //         {label}
  //       </div>
  //       <div class='form-group'>
  //         <input class='form-control' type={type} {...input} />
  //         {this.renderError(meta)}
  //       </div>
  //     </div>
  //   )
  // }
  submitLogin = (e) => {
    e.preventDefault()
    // alert(JSON.stringify(this.state));
    // alert(this.state.email)
    // alert(this.state.password)
    this.props.loginUserMutation({
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
      sessionStorage.setItem('userDtls', JSON.stringify(res.data.loginUser))
      window.location.replace('/home');
    }).catch((err) => {
      console.log("Failed")
      this.setState({ authFailed: true })
    });

  }
  // onSubmit = formValues => {
  //   console.log('OnSubmit' + formValues)
  //   let data = {
  //     email: formValues.email,
  //     password: formValues.password
  //   }
  //   axios.defaults.withCredentials = true
  //   // console.log(data)
  //   // axios
  //   //   .post('http://localhost:3001/login', data)
  //   //   .then(response => {
  //   //     console.log('Status Code : ', response.status)
  //   //     if (response.status === 200) {
  //   //       sessionStorage.setItem('email', data.email)
  //   //       this.setState({
  //   //         authFlag: true
  //   //       })
  //   //     }
  //   //   })
  //   //   .catch(err => {
  //   //     this.setState({ authFailed: true })
  //   //   })
  //   this.props.loginuser(data, res => {
  //     if (res.status === 200) {
  //       console.log('Inside response', res.data)
  //       this.setState({
  //         authFlag: true
  //       })

  //       const user = jwtDecode(res.data.token)
  //       console.log(user)
  //       sessionStorage.setItem('email', user.email)

  //       const cookies = new Cookies()
  //       cookies.set('cookie', res.data.token, {
  //         maxAge: 900000,
  //         httpOnly: false,
  //         path: '/'
  //       })
  //       console.log(cookies.get('myCat'))
  //       // sessionStorage.setItem('JWT_TOKEN', res.data.token)
  //       // cookies.save('cookie', res.data.token, {maxAge: 900000, httpOnly: false, path: '/'});
  //       // sessionStorage.setItem('username', res.data[0].username)
  //       // sessionStorage.setItem('cookie', res.data[0].type)
  //       // cookies.save('cookie', res.data[0].type, {maxAge: 900000, httpOnly: false, path: '/'});
  //       // cookies.save('userid', res.data[0]._id, {maxAge: 900000, httpOnly: false, path: '/'});
  //       // cookies.save('username', res.data[0].username, {maxAge: 900000, httpOnly: false, path: '/'});
  //       this.props.history.push('/home')
  //     } else {
  //       alert('Please enter valid credentials')
  //     }
  //   })

  //   // ,(response)=>{
  //   //   console.log('Redux test: ' + this.props.user);
  //   //   console.log('Redux response: ' + response);
  //   // })

  //   // console.log(data);
  //   // this.props.login(data, (response)=>{
  //   //   console.log('Redux test: ' + this.props.user)
  //   //   this.setState({
  //   //     img: 'data:image/png;base64, ' + response.image
  //   //   })
  //   // });
  // }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // submit Login handler to send a request to the node backend
  // submitLogin = e => {
  //   var headers = new Headers()
  //   console.log('submit login')
  //   // prevent page from refresh
  //   e.preventDefault()
  //   const data = {
  //     email: this.state.email,
  //     password: this.state.password
  //   }
  //   // set the with credentials to true
  //   axios.defaults.withCredentials = true
  //   console.log(data)
  //   // make a post request with the user data
  //   axios
  //     .post('http://localhost:3001/login', data)
  //     .then(response => {
  //       console.log('Status Code : ', response.status)
  //       if (response.status === 200) {
  //         sessionStorage.setItem('email', data.email)
  //         this.setState({
  //           authFlag: true
  //         })
  //       }
  //     })
  //     .catch(err => {
  //       this.setState({ authFailed: true })
  //     })
  // }

  render() {
    // console.log(this.props.user)
    // redirect based on successful login
    // console.log(this.props)

    // renderInput(formProps){
    //   return (<input onChange={...formProps.input.onChange} value={...formProps.input.value} />)
    // }

    let redirectVar = null
    let invalidtag = null
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }
    let redirecthome = null
    if (this.state.authFlag) {
      redirecthome = <Redirect to='/home' />
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
                <h2>Sign in with your Grubhub account</h2>
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
              <div class='form-group'>
                <div>Password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='password'
                  class='form-control'
                  name='password'
                />
              </div>
              <div class='form-group'>
                <button onClick={this.submitLogin} class='btn btn-primary'>
                  Login
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
                <Link to='/signup'>Create an account</Link>

              </div>
            </div>
          </div>
        </div>
      </div>
      // <form
      //   className='ui form error'
      //   onSubmit={this.props.handleSubmit(this.onSubmit)}
      // >
      //   <div>
      //     {redirectVar}
      //     {redirecthome}
      //     <div class='container'>
      //       <div class='login-form'>
      //         <div class='main-div'>
      //           <div class='panel'>
      //             <h2>Sign in with your Grubhub account</h2>
      //             {invalidtag}
      //           </div>
      //           <Field
      //             name='email'
      //             type='text'
      //             component={this.renderInput}
      //             label='Email'
      //           />
      //           <br />
      //           <Field
      //             name='password'
      //             type='password'
      //             component={this.renderInput}
      //             label='Password'
      //           />
      //           <br />
      //           <button type='submit' class='btn btn-primary'>
      //             Login
      //           </button>
      //           <br />
      //           {/* <Button name='submit'/>  */}
      //           {/* <div class='form-group'>
      //             <div htmlFor='email' style={{ color: '#6b6b83' }}>
      //               Email
      //             </div>
      //             <input
      //               onChange={this.inputChangeHandler}
      //               type='email'
      //               pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      //               class='form-control'
      //               name='email'
      //             />
      //           </div>

      //           <div class='form-group'>
      //             <div>Password</div>
      //             <input
      //               onChange={this.inputChangeHandler}
      //               type='password'
      //               class='form-control'
      //               name='password'
      //             />
      //           </div>
      //           <div class='form-group'>
      //             <button onClick={this.submitLogin} class='btn btn-primary'>
      //               Login
      //             </button>
      //           </div> */}
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
      //             <Link to='/signup'>Create an account</Link>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </form>
    )
  }
}

const validate = formValues => {
  const error = {}
  if (!formValues.email) {
    error.email = 'Enter a valid email'
  }
  if (!formValues.password) {
    error.password = 'Enter a valid Password'
  }
  return error
}
// export Login Component
// const formWrapped= reduxForm({
//   form: 'streamLogin',
//   validate: validate
// })(Login)

// export default connect(null,{loginuser:loginuser})(formWrapped)
// const mapStateToProps = state => {
//   return { user: state.user }
// }

// export default connect(
//   mapStateToProps,
//   { loginuser }
// )(
//   reduxForm({
//     form: 'streamLogin',
//     validate: validate
//   })(Login)
// )


export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(loginUserMutation, { name: "loginUserMutation" })
)(Login)

// export default reduxForm({
//       form: 'streamLogin',
//       validate: validate
//     })(Login)
