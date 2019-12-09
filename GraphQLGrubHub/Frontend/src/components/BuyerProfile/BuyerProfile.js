import React, { Component } from 'react'
import '../../App.css'
import './BuyerProfile.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import {getProfile} from '../../actions'
import {updateuseremail} from '../../actions'
import {updateuserphone} from '../../actions'
import {loginuser} from '../../actions'
import {getUserImage} from '../../actions'
import { connect } from 'react-redux'
import BuyerOwnerNav from '../Display/BuyerOwnerNav'
import dotenv from 'dotenv'
import {Field, reduxForm} from 'redux-form';
import ROOT_URL from '../../constants.js'
// dotenv.config()
// require('dotenv').config()
// Define a Login Component
class BuyerProfile extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      email: '',
      phonenumber: '',
      password: '',
      pswd: '',
      newpassword: '',
      confirmpassword: '',
      firstname: '',
      lastname: '',
      file: '',
      newEmail: '',
      confirmNewEmail: '',
      newPhone: '',
      confirmNewPhone: '',
      img: '',
      emailflag: false,
      phoneflag: false,
      authFlag: false,
      authFailed: false,
      nameflag: false,
      contactflag: false,
      passwordflag: false
    }
    // Bind the handlers to this class
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    // this.submitLogin = this.submitLogin.bind(this)
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    let path = process.env.PUBLIC_URL
    // alert(process.env.ROOT_URL_LOCAL);
    path = path + '/profilepics/Avatar.png'
    console.log(path)
    // console.log(updateuserphone)
    this.setState({
      authFlag: false,
      authFailed: false,
      nameflag: false,
      contactflag: false,
      img: path,
      passwordflag: false
    })

    let temp = sessionStorage.getItem('email')

    let data = { email: temp }
    console.log('Inside will mount: data value is: ' + data.email)

    this.props.getProfile({ params: data }, (data)=>{
      console.log('Redu test: ' + this.props.user)
      this.setState({
        email: data.email,
        phonenumber: data.phone,
        password: data.password,
        firstname: data.first_name,
        lastname: data.last_name
      })
    });


    // axios
    //   .get('http://localhost:3001/userprofile', { params: data })
    //   .then(response => {
    //     // update the state with the response data
    //     //   console.log("Axios get:",response.data);
    //     this.setState({
    //       email: response.data.email,
    //       phonenumber: response.data.phone,
    //       password: response.data.password,
    //       firstname: response.data.first_name,
    //       lastname: response.data.last_name
    //     })
    //   })
      // console.log('before userimage call'+data);
      // this.props.getUserImage(data, (response)=>{
      //   console.log('Redux test: ' + this.props.user)
      //   this.setState({
          // img: 'data:image/png;base64, ' + response.image
      //   })
      // });
    axios.post(`${ROOT_URL}/userimage`, data).then(response => {
      // update the state with the response data
      console.log('Axios get:', response.data)
      this.setState({
        img: 'data:image/png;base64, ' + response.data
      })
    })
  }

  onSubmitUsername = (formValues)=> {
    console.log('OnSubmit'+formValues)
    let data= {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      password: formValues.password
    }
    axios.defaults.withCredentials = true
    console.log(data);
    axios
      .post(`${ROOT_URL}/updateusername`, data)
      .then(response => {
        console.log('Status Code : ', response.status)
        if (response.status === 200) {
          sessionStorage.setItem('email', data.email)
          this.setState({
            authFlag: true
          })
        }
      })
      .catch(err => {
        this.setState({ authFailed: true })
      })
    this.props.loginuser(data);
  }
  updatePhone = e => {
    let temp = sessionStorage.getItem('email')
    if (this.state.newPhone === this.state.confirmNewPhone) {
      let data = {
        newPhone: this.state.newPhone,
        
        email: temp
      }
      console.log('Inside will mount: data value is: ' + data.email)

      this.props.updateuserphone(data, (res)=>{
        console.log('Redu test: ' + res)
        
      });

      // this.props.updateuserphone(data,(res)=>{
      //   if(res.status===200){
      //     console.log('Response update phone: ',res.data);
      //     // this.props.history.push('/login');
      //   }else{
      //     console.log("Failed to update")
      //     // this.setState({authFailed:true})
      //   }
      // })
      axios
        .post(`${ROOT_URL}/updateuserphone`, data)
        .then(response => {
          // update the state with the response data
          window.location.reload()
          console.log('Axios post:', response.data)
        })
    }
  }

  updateEmail = e => {
    let temp = sessionStorage.getItem('email')
    if (this.state.newEmail === this.state.confirmNewEmail) {
      let data = {
        newEmail: this.state.newEmail,
        password: this.state.pswd,
        email: temp
      }
      console.log('Inside will mount: data value is: ' + data.email)
      axios
        .post(`${ROOT_URL}/updateowneremail`, data)
        .then(response => {
          sessionStorage.setItem('email', data.newEmail)
          // update the state with the response data
          window.location.reload()
          console.log('Axios post:', response.data)
        })
    }
  }

  updateUserName = e => {
    let temp = sessionStorage.getItem('email')

    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.pswd,
      email: temp
    }
    console.log('Inside will mount: data value is: ' + data.email)
    axios.post(`${ROOT_URL}/updateusername`, data).then(response => {
      // update the state with the response data
      window.location.reload()
      console.log('Axios post:', response.data)
    })
  }

  updatePassword = e => {
    let temp = sessionStorage.getItem('email')
    if (this.state.newpassword === this.state.confirmpassword) {
      let data = {
        newpassword: this.state.newpassword,
        password: this.state.pswd,
        email: temp
      }
      console.log('Inside will mount: data value is: ' + data.email)
      axios
        .post(`${ROOT_URL}/updatepassword`, data)
        .then(response => {
          // update the state with the response data
          window.location.reload()
          console.log('Axios post:', response.data)
        })
    }
  }

  updateContact = e => {
    let temp = sessionStorage.getItem('email')

    let tempphone = null
    let tempemail = null
    let data = null
    if (
      this.state.newEmail !== null &&
      this.state.newEmail === this.state.confirmNewEmail
    ) {
      tempemail = this.state.newEmail
    } else {
      tempemail = 'invalid'
    }

    if (
      this.state.newPhone !== null &&
      this.state.newPhone === this.state.confirmNewPhone
    ) {
      tempphone = this.state.newPhone
    } else {
      tempphone = 'invalid'
    }

    if (tempemail !== 'invalid' && tempphone !== 'invalid') {
      data = {
        newPhone: this.state.newPhone,
        newEmail: this.state.newEmail,
        password: this.state.pswd,
        email: temp
      }
    } else if (tempemail === 'invalid' || ('' && tempphone !== 'invalid')) {
      data = {
        newPhone: this.state.newPhone,
        password: this.state.pswd,
        email: temp
      }
    } else if (tempphone === 'invalid' || ('' && tempemail !== 'invalid')) {
      data = {
        newEmail: this.state.newEmail,
        password: this.state.pswd,
        email: temp
      }
    }

    if (data !== null) {
      console.log('Inside will mount: data value is: ' + data.email)
      axios.post(`${ROOT_URL}/updatecontact`, data).then(response => {
        console.log('Axios post:', response.data)
        if (response.data === 'Upated email.') {
          sessionStorage.setItem('email', data.newEmail)
          window.location.reload()
        }
      })
    }
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  imageChangeHandler = e => {
    // console.log('image change handle name: ' + e.target.name)
    // console.log('image change handle value: ' + e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  }

  nameflageChange = e => {
    if (this.state.nameflag) {
      this.setState({
        nameflag: false
      })
    } else {
      this.setState({
        nameflag: true
      })
    }
  }
  phoneflagChange = e => {
    if (this.state.phoneflag) {
      this.setState({
        phoneflag: false
      })
    } else {
      this.setState({
        phoneflag: true
      })
    }
  }
  emailflagChange = e => {
    if (this.state.emailflag) {
      this.setState({
        emailflag: false
      })
    } else {
      this.setState({
        emailflag: true
      })
    }
  }
  contactflagChange = e => {
    if (this.state.contactflag) {
      this.setState({
        contactflag: false
      })
    } else {
      this.setState({
        contactflag: true
      })
    }
  }

  passwordflagChange = e => {
    if (this.state.passwordflag) {
      this.setState({
        passwordflag: false
      })
    } else {
      this.setState({
        passwordflag: true
      })
    }
  }
  // submit Login handler to send a request to the node backend

  uploadImage = e => {
    e.preventDefault()
    const formData = new FormData()
    let email = sessionStorage.getItem('email')
    formData.append('myImage', this.state.file, email)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post(`${ROOT_URL}/buyerprofile`, formData, config)
      .then(response => {
        let data={'email':email}
        axios.post(`${ROOT_URL}/userimage`, data).then(response => {
          // update the state with the response data
          console.log('Axios get:', response.data)
          this.setState({
            img: 'data:image/png;base64, ' + response.data
          })
        })
        console.log('The file is successfully uploaded')
      })
      .catch(error => {})
    // prevent page from refresh
  }

  render () {
    // redirect based on successful login
    let redirectVar = null
    let invalidtag = null
    let editname = null
    let editemail = null
    let editphone = null
    let editpassword = null
    let editcontact = null
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }
    let updatePic = null

    if (this.state.file !== '') {
      updatePic = (
        <button
          style={{ marginLeft: '537px' }}
          className='btn btn-link'
          type='submit'
        >
          Update
        </button>
      )
    }

    if (this.state.nameflag) {
      editname = (
        <div>
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>First name</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='firstname'
                  value={this.state.firstname}
                />
              </div>

              <div className='col-sm-4'>
                <div>Last name</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='lastname'
                  value={this.state.lastname}
                />
              </div>
            </div>
          </div>
          <br />
          {/* <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>Current password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='pswd'
                />
              </div>
            </div>
          </div> */}
          <br />
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-3'>
                <button
                  onClick={this.updateUserName}
                  style={{ backgroundColor: '#0070eb' }}
                  class='btn btn-info'
                >
                  Update name
                </button>
              </div>
              <div className='col-sm-3'>
                <button
                  onClick={this.nameflageChange}
                  style={{ backgroundColor: 'white', color: '#0070eb' }}
                  class='btn btn-info'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      editname = (
        <div>
          <a style={{ float: 'right' }} href='#' onClick={this.nameflageChange}>
            Edit
          </a>
          <div style={{ fontSize: '14px', marginBottom: '10px' }}>Name</div>

          <div>
            {this.props.user.first_name} {this.props.user.last_name}
          </div>
        </div>
      )
    }
    if (this.state.emailflag) {
      editemail = (
        <div>
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>New email</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='newEmail'
                />
              </div>
              <div className='col-sm-4'>
                <div>Confirm email</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='confirmNewEmail'
                />
              </div>
            </div>
          </div>
          <br />
          {/* <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>Current password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='pswd'
                />
              </div>
            </div>
          </div>
          <br /> */}
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-3'>
                <button
                  onClick={this.updateEmail}
                  style={{ backgroundColor: '#0070eb' }}
                  class='btn btn-info'
                >
                  Update email
                </button>
              </div>
              <div className='col-sm-3'>
                <button
                  onClick={this.emailflagChange}
                  style={{ backgroundColor: 'white', color: '#0070eb' }}
                  class='btn btn-info'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      editemail = (
        <div>
          <a
            style={{ float: 'right' }}
            href='#'
            onClick={this.emailflagChange}
          >
            Edit
          </a>
          <div style={{ fontSize: '14px', marginBottom: '10px' }}>
            Email
          </div>

          <div>{this.props.user.email}</div>
        </div>
      )
    }

    if (this.state.phoneflag) {
      editphone = (
        <div>
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>New phone</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='newPhone'
                />
              </div>
              <div className='col-sm-4'>
                <div>Confirm phone</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='confirmNewPhone'
                />
              </div>
            </div>
          </div>
          {/* <br />
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>Current password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='pswd'
                />
              </div>
            </div>
          </div> */}
          <br />
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-3'>
                <button
                  onClick={this.updatePhone}
                  style={{ backgroundColor: '#0070eb' }}
                  class='btn btn-info'
                >
                  Update phone
                </button>
              </div>
              <div className='col-sm-3'>
                <button
                  onClick={this.phoneflagChange}
                  style={{ backgroundColor: 'white', color: '#0070eb' }}
                  class='btn btn-info'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      editphone = (
        <div>
          <a
            style={{ float: 'right' }}
            href='#'
            onClick={this.phoneflagChange}
          >
            Edit
          </a>
          <div style={{ fontSize: '14px', marginBottom: '10px' }}>
            Phone
          </div>

          <div>{this.props.user.phone}</div>
        </div>
      )
    }
    if (this.state.contactflag) {
      editcontact = (
        <div>
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>New email</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='newEmail'
                />
              </div>
              <div className='col-sm-4'>
                <div>Confirm email</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='confirmNewEmail'
                />
              </div>
            </div>
          </div>
          <br />
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>New phone number</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='newPhone'
                />
              </div>

              <div className='col-sm-4'>
                <div>Confirm phone number</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='confirmNewPhone'
                />
              </div>
            </div>
          </div>
          <br />
          {/* <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>Current password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='pswd'
                />
              </div>
            </div>
          </div>
          <br /> */}
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-3'>
                <button
                  onClick={this.updateContact}
                  style={{ backgroundColor: '#0070eb' }}
                  class='btn btn-info'
                >
                  Update contact
                </button>
              </div>
              <div className='col-sm-3'>
                <button
                  onClick={this.contactflagChange}
                  style={{ backgroundColor: 'white', color: '#0070eb' }}
                  class='btn btn-info'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      editcontact = (
        <div>
          <a
            style={{ float: 'right' }}
            href='#'
            onClick={this.contactflagChange}
          >
            Edit
          </a>
          <div style={{ fontSize: '14px', marginBottom: '10px' }}>Email</div>

          <div>{this.props.user.email}</div>
          <br />
          <div style={{ fontSize: '14px', marginBottom: '10px' }}>Phone</div>

          <div>{this.props.user.phone}</div>
        </div>
      )
    }

    if (this.state.passwordflag) {
      editpassword = (
        <div>
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>Current password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='pswd'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-4'>
                <div>New password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='newpassword'
                />
              </div>

              <div className='col-sm-4'>
                <div>Confirm password</div>
                <input
                  onChange={this.inputChangeHandler}
                  type='text'
                  class='form-control'
                  name='confirmpassword'
                />
              </div>
            </div>
          </div>
          <br />

          <br />
          <div className='row'>
            <div class='form-group'>
              <div className='col-sm-3'>
                <button onClick={this.updatePassword} class='btn btn-primary'>
                  Update password
                </button>
              </div>
              <div className='col-sm-3'>
                <button
                  onClick={this.passwordflagChange}
                  style={{ backgroundColor: 'white', color: '#0070eb' }}
                  class='btn btn-info'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      editpassword = (
        <div>
          <a
            style={{ float: 'right' }}
            href='#'
            onClick={this.passwordflagChange}
          >
            Edit
          </a>
          <div style={{ fontSize: '14px', marginBottom: '10px' }}>Password</div>

          <div>********</div>
        </div>
      )
    }

    return (
      <div>
        {redirectVar}
        <div className='row'>
          <div className='col-sm-2'>
            <BuyerOwnerNav />
          </div>

          <div className='col-sm-10'>
            <div class='container'>
              <div class='login-form'>
                {/* <div class='main-div'> */}

                <div class='panel'>
                  <h2>Your account</h2>
                  {/* {invalidtag} */}
                </div>
                <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                  <div class='preview text-center'>
                    <img
                      class='preview-img'
                      // src='http://simpleicon.com/wp-content/uploads/account.png'
                      src={this.state.img}
                      alt='Preview Image'
                      width='200'
                      height='200'
                    />
                    <div className='browse-button'>
                      <i className='fa fa-pencil' />
                      <input
                        class='browse-input'
                        type='file'
                        onChange={this.imageChangeHandler}
                        name='myImage'
                        id='myImage'
                      />
                      <br />
                    </div>
                    <span class='Error' />
                  </div>
                  {updatePic}
                </form>

                <br />
                <ul class='list-group'>
                  <br />
                  <li class='list-group-item'>{editname}</li>
                  <li class='list-group-item'>{editemail}</li>
                  <li class='list-group-item'>{editphone}</li>
                  {/* <li class='list-group-item'>{editcontact}</li> */}
                  {/* <li class='list-group-item'>{editpassword}</li> */}
                  <li class='list-group-item'>
                    <div
                      style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        color: '#0070eb',
                        fontSize: '14px'
                      }}
                    >
                      Continue with Facebook
                    </div>
                  </li>
                  {/* <li class='list-group-item' /> */}
                </ul>

                <br />

                <br />
              </div>
            </div>
          </div>
        </div>
        //{' '}
      </div>
    )
  }
}
// export Login Component
// export default BuyerProfile


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect( mapStateToProps , {getProfile,updateuserphone,updateuseremail, getUserImage})(BuyerProfile);
