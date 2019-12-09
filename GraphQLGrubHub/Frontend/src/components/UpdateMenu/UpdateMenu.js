import React, { Component } from 'react'
import '../../App.css'
import './UpdateMenu.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getProfile } from '../../actions'
import { loginuser } from '../../actions'
import { updaterestaurantmenu } from '../../actions'
import { menudetails } from '../../actions'

import { getUserImage } from '../../actions'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../../constants.js'

// Define a Login Component
class Menu extends Component {
  // call the constructor method
  constructor (props) {
    super(props)
    this.state = {
      authFlag: false,
      menudtls: '',
      menuimg: ''
    }
  }

  componentWillMount () {
    let path = process.env.PUBLIC_URL
    path = path + '/profilepics/Menu.png'
    
    this.setState({
      authFlag: false,
      menuimg: path
    })
    let temp = sessionStorage.getItem('menuid')
    // alert(temp)
    this.props.menudetails({ params: { id: temp } }, response => {
      // console.log( this.props.user[1])
      console.log(response.data)
      this.setState({
        menudtls: response.data
      })
    })

    let data = { id: temp }
    axios.post(`${ROOT_URL}/menuimage`, data).then(response => {
      // update the state with the response data
      console.log('Axios get:', response.data)
      this.setState({
        menuimg: 'data:image/png;base64, ' + response.data
      },()=>{
        console.log('image'+this.state.menuimg)
      })

    }).catch(err=>{
      console.log('Axios get err:', err)
      console.log('image'+this.state.menuimg)
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

    let menuid = sessionStorage.getItem('menuid')
    // this.setState({file.name:email})
    // var imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append('myImage', this.state.file, menuid)
    // formData.append('myImage', this.state.file, email )
    // formData.append('email', email)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post(`${ROOT_URL}/menuimageform`, formData, config)
      .then(response => {
        window.location.reload()
        console.log('The file is successfully uploaded')
      })
      .catch(error => {})
    // prevent page from refresh
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
  
  onSubmit = formValues => {
    // let val = JSON.parse(sessionStorage.getItem('ownerdata'))
    let menuid = sessionStorage.getItem('menuid')
    // console.log('temp : ' +val.email)
    let data = {
      dishname: formValues.dishname,
      description: formValues.description,
      price: formValues.baseprice,
      section: formValues.section,
      id: menuid
    }
    axios.defaults.withCredentials = true

    this.props.updaterestaurantmenu(data, res => {
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

  renderInput = ({ input, label, text, meta, className = { className } }) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}: {text}
        </div>
        <input
          className='form-control'
          // style={{ marginRight: '10px' }}
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
    let updatePic = null

    if (this.state.file !== '') {
      updatePic = (
        <button
          style={{ marginLeft: '537px' }}
          className='btn btn-link'
          type='submit'
        >
                    Update
        </button>
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
            <div class='container' >
              <div class='login-form' >
                {/* <div class='main-div'> */}

                <div className='row'>
                  <div className='col-sm-6'>
                    <ul class='list-group'>
                      <li class='list-group-item'>
                        <br />
                        <h2>Edit menu</h2>
                        <form
                          onSubmit={this.uploadImage}
                          enctype='multipart/form-data'
                        >
                          <div class='preview text-center'>
                            <div style={{ fontWeight: 'bold' }}>
                              Menu pic
                            </div>
                            <img
                              class='preview-restaurant-img'
                              // src='http://simpleicon.com/wp-content/uploads/account.png'
                              src={this.state.menuimg}
                              alt='Menu pic'
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
                          className='ui form error'
                          onSubmit={this.props.handleSubmit(this.onSubmit)}
                        >
                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              class='form-control'
                              name='dishname'
                              component={this.renderInput}
                              label=' Name'
                              text={this.state.menudtls.dish_name}
                            />
                          </div>
                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              name='description'
                              type='text'
                              component={this.renderInput}
                              label='Description'
                              text={this.state.menudtls.description}
                            />
                          </div>

                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              name='section'
                              component={this.renderInput}
                              label='Menu Section'
                              text={this.state.menudtls.section}
                            />
                          </div>
                          <br />
                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              name='baseprice'
                              type='text'
                              component={this.renderInput}
                              label='Base Price'
                              text={this.state.menudtls.price}
                            />
                          </div>
                          <br />
                          <button type='submit' class='btn btn-info'>
                            Edit Menu
                          </button>
                          <br />
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  { updaterestaurantmenu, menudetails }
)(
  reduxForm({
    form: 'streamUpdateMenu',
    validate: validate
  })(Menu)
)

// import React, { Component } from 'react'
// import '../../App.css'
// import './Menu.css'
// import axios from 'axios'
// import cookie from 'react-cookies'
// import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'
// import { getProfile } from '../../actions'

// import { loginuser } from '../../actions'
// import { restaurantmenu } from '../../actions'
// import { getUserImage } from '../../actions'
// import { connect } from 'react-redux'
// import DisplayOwnerNav from '../Display/DisplayOwnerNav'
// import { Field, reduxForm } from 'redux-form'

// class UpdateMenu extends React.Component {

//     onSubmit = (formValues) => {
//         // console.log('OnSubmit' + formValues)
//         if(this.state.file!==''){
//           this.uploadImage()
//         }
//         let val = JSON.parse(sessionStorage.getItem('ownerdata'));
//         // console.log('temp : ' +val.email)
//         let data = {
//           dishname: formValues.dishname,
//           description: formValues.description,
//           price: formValues.baseprice,
//           section: formValues.section,
//           zipcode: val.restaurant_zipcode,
//           restaurantname: val.restaurant_name,
//           id:
//         }
//         axios.defaults.withCredentials = true // console.log(data) // axios //   .post('http://localhost:3001/login', data) //   .then(response => { //     console.log('Status Code : ', response.status) //     if (response.status === 200) { //       sessionStorage.setItem('email', data.email) //       this.setState({ //         authFlag: true //       }) //     } //   }) //   .catch(err => { //     this.setState({ authFailed: true }) //   })
//         this.props.updaterestaurantmenu(data, res => {
//           if (res.status === 200) {
//             console.log('Inside response', res.data[0])
//             this.setState({
//               authFlag: true
//             })

//             this.props.history.push('/restaurantmenu')
//           } else {
//             alert('Please enter valid credentials')
//           }
//         }) // ,(response)=>{ //   console.log('Redux test: ' + this.props.user); //   console.log('Redux response: ' + response); // }) // console.log(data); // this.props.login(data, (response)=>{ //   console.log('Redux test: ' + this.props.user) //   this.setState({ //     img: 'data:image/png;base64, ' + response.image //   }) // });
//       }

//     inputChangeHandler = e => {
//         this.setState({
//           [e.target.name]: e.target.value
//         })
//       }
//   render () {
//     console.log(this.props)
//     return (
//       <div>
//         <div className='row'>
//           <div class='form-group'>
//             <div className='col-sm-4'>
//               <div>Name</div>
//               <input
//                 onChange={this.inputChangeHandler}
//                 type='text'
//                 class='form-control'
//                 name='firstname'
//                 value={this.state.firstname}
//               />
//             </div>

//             <div className='col-sm-4'>
//               <div>Description</div>
//               <input
//                 onChange={this.inputChangeHandler}
//                 type='text'
//                 class='form-control'
//                 name='lastname'
//                 value={this.state.lastname}
//               />
//             </div>
//           </div>
//         </div>
//         <br />
//         <div className='row'>
//           <div class='form-group'>
//             <div className='col-sm-4'>
//               <div>Menu Section</div>
//               <input
//                 onChange={this.inputChangeHandler}
//                 type='text'
//                 class='form-control'
//                 name='pswd'
//               />
//             </div>
//             <div className='col-sm-4'>
//               <div>Base Price</div>
//               <input
//                 onChange={this.inputChangeHandler}
//                 type='text'
//                 class='form-control'
//                 name='pswd'
//               />
//             </div>
//           </div>
//         </div>
//         <br />
//         <div className='row'>
//           <div class='form-group'>
//             <div className='col-sm-3'>
//               <button
//                 onClick={this.updateUserName}
//                 style={{ backgroundColor: '#0070eb' }}
//                 class='btn btn-info'
//               >
//                 Update name
//               </button>
//             </div>
//             <div className='col-sm-3'>
//               <button
//                 onClick={this.nameflageChange}
//                 style={{ backgroundColor: 'white', color: '#0070eb' }}
//                 class='btn btn-info'
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// // console.log("Inside search: ",this.props);

// export default UpdateMenu
