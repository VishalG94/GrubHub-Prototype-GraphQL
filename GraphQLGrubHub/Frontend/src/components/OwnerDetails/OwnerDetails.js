import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { restaurantcontact } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import grubhub from '../../GrubhubDetails.jpg'
import ROOT_URL from '../../constants.js'
// Define a Login Component
class OwnerDetails extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      email: '',
      file: '',
      phone: '',
      address1: '',
      address2: '',
      restaurantimg: '',
      password: '',
      authFlag: false,
      authFailed: false
    }
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    let path = process.env.PUBLIC_URL
    console.log('path'+path)
    path = path + '/profilepics/restaurant.png'
    
    this.setState({
      restaurantimg: path,
      authFlag: false,
      authFailed: false
    })

    let temp = sessionStorage.getItem('email')

    let data = { email: temp }
    axios.post(`${ROOT_URL}/ownerimage`, data).then(response => {
      // update the state with the response data
      console.log('Axios get:', response.data)
      this.setState({
        restaurantimg: 'data:image/png;base64, ' + response.data
      },()=>{
        console.log()
      })
    })
  }
  imageChangeHandler = e => {
    // console.log('image change handle name: ' + e.target.name)
    // console.log('image change handle value: ' + e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
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

  renderInput = ({ input, label, meta }) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}
        </div>
        <input class='form-control' {...input} />
        {this.renderError(meta)}
      </div>
    )
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
      .post(`${ROOT_URL}/ownerimageform`, formData, config)
      .then(response => {
        window.location.reload()
        console.log('The file is successfully uploaded')
      })
      .catch(error => {})
    // prevent page from refresh
  }

  onSubmit = formValues => {
    console.log('OnSubmit' + formValues)
    let temp = sessionStorage.getItem('email')
    // this.setState({
    //   email: temp
    // });
    let data = {
      address1: formValues.address1,
      address2: formValues.address2,
      phone: formValues.phone,
      email: temp
    }
    axios.defaults.withCredentials = true

    this.props.restaurantcontact(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data[0])
        this.setState({
          authFlag: true
        })

        this.props.history.push('/ownerprofile')
      } else {
        alert('Please enter valid credentials')
      }
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    // console.log(this.props.user)
    // redirect based on successful login
    // console.log(this.props)

    // renderInput(formProps){
    //   return (<input onChange={...formProps.input.onChange} value={...formProps.input.value} />)
    // }

    let redirectVar = null
    let invalidtag = null
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/ownerlogin' />
    }
    let redirecthome = null
    if (this.state.authFlag) {
      redirecthome = <Redirect to='/ownerlogin' />
    }
    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    return (
      <div className='overlay' style={{ backgroundImage: `url(${grubhub})` }}>
        <div>
          {redirectVar}
          {redirecthome}
          <div class='container'>
            <div class='login-form'>
              <div class='main-div'>
                <div class='panel'>
                  <h2>Restaurant Information</h2>
                  {invalidtag}
                </div>

                <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                  <div class='preview text-center'>
                    <div style={{ fontWeight: 'bold' }}>Restaurant logo</div>
                    <img
                      class='preview-restaurant-img'
                      // src='http://simpleicon.com/wp-content/uploads/account.png'
                      src={this.state.restaurantimg}
                      alt='Restaurant logo'
                      width='300'
                      height='300'
                    />
                    <div>
                      <input
                        // class='browse-input'
                        type='file'
                        onChange={this.imageChangeHandler}
                        name='myImage'
                        id='myImage'
                        className='btn btn-light'
                      />
                      <br />
                      <button
                        // style={{ marginLeft: '537px' }}
                        className='btn btn-link'
                        type='submit'
                      >
                        Update
                      </button>
                    </div>
                    <span class='Error' />
                  </div>
                  {/* {updatePic} */}
                </form>

                <form
                  className='ui form error'
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name='address1'
                    component={this.renderInput}
                    label='Address 1'
                  />
                  <br />
                  <Field
                    name='address2'
                    component={this.renderInput}
                    label='Address 2'
                  />
                  <br />
                  <Field
                    name='phone'
                    component={this.renderInput}
                    label='Phone'
                  />
                  <br />
                  <button type='submit' class='btn btn-info'>
                    Next
                  </button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const validate = formValues => {
  const error = {}
  if (!formValues.address1) {
    error.address1 = 'Enter a valid Address 1'
  }
  if (!formValues.address2) {
    error.address2 = 'Enter a valid Address 2'
  }
  if (!formValues.phone) {
    error.phone = 'Enter a valid Phone'
  }
  return error
}
// export Login Component
// const formWrapped= reduxForm({
//   form: 'streamLogin',
//   validate: validate
// })(Login)

// export default connect(null,{loginuser:loginuser})(formWrapped)
const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { restaurantcontact }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(OwnerDetails)
)

// export default reduxForm({
//       form: 'streamLogin',
//       validate: validate
//     })(Login)
