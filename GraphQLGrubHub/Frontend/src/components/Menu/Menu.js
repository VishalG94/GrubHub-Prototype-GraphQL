import React, { Component } from 'react'
import '../../App.css'
import './Menu.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getProfile } from '../../actions'

import { loginuser } from '../../actions'
import { restaurantmenu } from '../../actions'
import { getUserImage } from '../../actions'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../../constants.js'

// Define a Login Component
class Menu extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props) // maintain the state required for this component
    this.state = {
      email: '',
      file: '',
      img: '',
      authFlag: false,
      authFailed: false
    } // Bind the handlers to this class // this.usernameChangeHandler = this.usernameChangeHandler.bind(this) // this.passwordChangeHandler = this.passwordChangeHandler.bind(this) // this.submitLogin = this.submitLogin.bind(this)
  } // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    let path = process.env.PUBLIC_URL
    path = path + '/profilepics/Biryani.png'

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
    console.log('Inside will mount: data value is: ' + data.email) // this.props.getProfile({ params: data }, (data)=>{ //   console.log('Redu test: ' + this.props.user) //   this.setState({ //     email: data.email, //     phonenumber: data.phone, //     password: data.password, //     firstname: data.first_name, //     lastname: data.last_name //   }) // });
    axios.post(`${ROOT_URL}/menuimage`, data).then(response => {
      // update the state with the response data
      console.log('Axios get:', response.data)
      this.setState({
        restaurantimg: 'data:image/png;base64, ' + response.data
      })
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  uploadImage = e => {
    e.preventDefault()
    // var headers = new Headers();
    const formData = new FormData()
    // console.log(this.state.file.name)

    let email = sessionStorage.getItem('email')
    // this.setState({file.name:email})
    // var imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append('myImage', this.state.file, email)
    // formData.append('myImage', this.state.file, email )
    // formData.append('email', email)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post('/ownerimageform', formData, config)
      .then(response => {
        window.location.reload()
        console.log('The file is successfully uploaded')
      })
      .catch(error => {})
    // prevent page from refresh
  }

  imageChangeHandler = e => {
    // console.log('image change handle name: ' + e.target.name)
    // console.log('image change handle value: ' + e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  } // submit Login handler to send a request to the node backend

  uploadImage = e => {
    e.preventDefault() // var headers = new Headers();
    const formData = new FormData() // console.log(this.state.file.name)
    let email = sessionStorage.getItem('email') // this.setState({file.name:email}) // var imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append('myImage', this.state.file, email) // formData.append('myImage', this.state.file, email ) // formData.append('email', email)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post('/menuimage', formData, config)
      .then(response => {
        let data = { email: email }
        axios.post(`${ROOT_URL}/userimage`, data).then(response => {
          // update the state with the response data
          console.log('Axios get:', response.data)
          this.setState({
            img: 'data:image/png;base64, ' + response.data
          })
        })
        console.log('The file is successfully uploaded')
      })
      .catch(error => {}) // prevent page from refresh
  }
  imageChangeHandler = e => {
    // console.log('image change handle name: ' + e.target.name)
    // console.log('image change handle value: ' + e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  }
  onSubmit = formValues => {
    // console.log('OnSubmit' + formValues)
    if (this.state.file !== '') {
      this.uploadImage()
    }
    let val = JSON.parse(sessionStorage.getItem('ownerdata'))
    // console.log('temp : ' +val.email)
    let data = {
      dishname: formValues.dishname,
      description: formValues.description,
      price: formValues.baseprice,
      section: formValues.section,
      zipcode: val.restaurant_zipcode,
      restaurantname: val.restaurant_name
    }
    console.log(data)
    axios.defaults.withCredentials = true // console.log(data) // axios //   .post('http://localhost:3001/login', data) //   .then(response => { //     console.log('Status Code : ', response.status) //     if (response.status === 200) { //       sessionStorage.setItem('email', data.email) //       this.setState({ //         authFlag: true //       }) //     } //   }) //   .catch(err => { //     this.setState({ authFailed: true }) //   })
    this.props.restaurantmenu(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data[0])
        this.setState({
          authFlag: true
        })

        this.props.history.push('/ownerrestaurantmenu')
      } else {
        alert('Please enter valid credentials')
      }
    }) // ,(response)=>{ //   console.log('Redux test: ' + this.props.user); //   console.log('Redux response: ' + response); // }) // console.log(data); // this.props.login(data, (response)=>{ //   console.log('Redux test: ' + this.props.user) //   this.setState({ //     img: 'data:image/png;base64, ' + response.image //   }) // });
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <label style={{ color: 'red' }}>{error}</label>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta, className = { className } }) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}
        </div>
        <input
          className='form-control'
          style={{ marginRight: '10px' }}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  render () {
    // redirect based on successful login
    let redirectVar = null
    let invalidtag = null
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    return (
      <div>
        {redirectVar}

        <div className='row'>
          <div className='col-sm-2'>
            <DisplayOwnerNav />
          </div>

          <div className='col-sm-10'>
            {/*             <div class='container'> */}

            <div class='login-form'>
              {/* <div class='main-div'> */}

              <div class='panel'>
                <h2>Your account</h2>
                {/* {invalidtag} */}
              </div>
              <div className='row'>
                {/* <div className='col-sm-4'> */}
                {/* <form
                    onSubmit={this.uploadImage}
                    enctype='multipart/form-data'
                  >
                    <div class='preview text-center'>
                      <img // class='preview-img' // src='http://simpleicon.com/wp-content/uploads/account.png'
                        src={this.state.img}
                        alt='Preview Image'
                        width='200'
                        height='200'
                      />

                      <span class='Error' />
                    </div>
                    <br/>
                    <div style={{ marginLeft: '70px' }}>
                      {' '}
                      <input style={{color:'blue'}}
                        type='file'
                        onChange={this.imageChangeHandler}
                        name='myImage'
                        id='myImage'
                      />
                      <br />
                      <button className='btn btn-link' type='submit'>
                    Update
                    </button>
                    </div>

                  </form> */}
                {/* </div> */}
                <div className='col-sm-6'>
                  <form
                    className='ui form error'
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                  >
                    <ul class='list-group'>
                      <li class='list-group-item'>
                        <br />
                        <h2>Add a dish to menu</h2>
                        
                        <div class='form-group'>
                          <Field
                            class='form-control'
                            name='dishname'
                            component={this.renderInput}
                            label=' Name'
                          />
                        </div>
                        <Field
                          name='description'
                          type='text'
                          component={this.renderInput}
                          label='Description'
                        />
                        <div class='form-group'>
                          <Field
                            name='section'
                            component={this.renderInput}
                            label='Menu Section'
                          />
                        </div>
                        <br />
                        <div class='form-group'>
                          <Field
                            name='baseprice'
                            type='text'
                            component={this.renderInput}
                            label='Base Price'
                          />
                        </div>
                        <br />
                        <button type='submit' class='btn btn-info'>
                          Add to Menu
                        </button>
                        <br />
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      //       </div>
    )
  }
}
// export Login Component
// export default BuyerProfile

const validate = formValues => {
  const error = {}
  if (!formValues.dishname) {
    error.dishname = 'Enter a valid dish name'
  }
  if (!formValues.description) {
    error.description = 'Enter a valid description'
  }
  if (!formValues.baseprice) {
    error.baseprice = 'Enter a valid baseprice'
  }
  if (!formValues.section) {
    error.section = 'Enter a valid section'
  }
  return error
}

const mapStateToProps = state => {
  return { owner: state.owner }
}

export default connect(
  mapStateToProps,
  { restaurantmenu: restaurantmenu }
)(
  reduxForm({
    form: 'streamMenu',
    validate: validate
  })(Menu)
)
