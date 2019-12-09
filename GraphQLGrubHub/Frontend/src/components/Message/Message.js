import React, { Component } from 'react'
import '../../App.css'
import './Message.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { messagedetails } from '../../actions'
import { postmessage } from '../../actions'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'
import BuyerOwnerNav from '../Display/BuyerOwnerNav'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../../constants.js'
// Define a Login Component
class Message extends Component {
  // call the constructor method
  constructor (props) {
    super(props)
    this.state = {
      authFlag: false,
      messagedtls: '',
      isUser: false
    }
  }

  componentWillMount () {
    this.setState({
      authFlag: false
    })
    let temp = JSON.parse(sessionStorage.getItem('messageDetails'))
    // alert(JSON.stringify(temp))
    if (temp.is_user) {
      this.setState({ isUser: true })
    } else {
      this.setState({ isUser: false })
    }
    axios
      .get(`${ROOT_URL}/messagedetails`, { params: { orderId: temp.order_id } })
      .then(res => {
        // update the state with the response data
        console.log('Axios get:', res.data)
        if (res.status === 200) {
          console.log('Inside response', res.data)
          this.setState({ messagedtls: res.data })
        } else {
          console.log('Error occured while sending the message!')
        }
      })
      .catch(err => {
        console.log('Error occured while sending the message!' + err)
      })

    // let temp = sessionStorage.getItem('menuid')

    // alert(temp)
    // this.props.messagedetails({ params: {order_id: orderId} }, response => {
    //   // console.log( this.props.user[1])
    //   console.log(response.data)
    //   this.setState({
    //     menudtls: response.data
    //   })
    // })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = formValues => {
    // let val = JSON.parse(sessionStorage.getItem('ownerdata'))
    let messageDetails = JSON.parse(sessionStorage.getItem('messageDetails'))
    // console.log('temp : ' +val.email)

    let data = {
      restaurant_name: messageDetails.restaurant_name,
      order_id: messageDetails.order_id,
      user_email: messageDetails.user_email,
      mesg: formValues.mesg,
      is_user: messageDetails.is_user
    }
    console.log(data)
    axios.defaults.withCredentials = true

    axios
      .post(`${ROOT_URL}/postmessage`, data)
      .then(res => {
        // update the state with the response data
        console.log('Axios get:', res.data)
        if (res.status === 200) {
          console.log('Inside response', res.data)
          window.location.reload()
        } else {
          console.log('Error occured while sending the message!')
        }
      })
      .catch(err => {
        console.log('Error occured while sending the message!' + err)
      })
    // })
  }
  // this.props.postmessage(data, res => {

  //     if (res.status === 200) {
  //       console.log('Inside response', res.data[0])
  //       this.setState({
  //         authFlag: true
  //       })

  //       this.props.history.push('/ownerrestaurantmenu')
  //     } else {
  //       alert('Please enter valid credentials')
  //     }
  //   }) // ,(response)=>{ //   console.log('Redux test: ' + this.props.user); //   console.log('Redux response: ' + response); // }) // console.log(data); // this.props.login(data, (response)=>{ //   console.log('Redux test: ' + this.props.user) //   this.setState({ //     img: 'data:image/png;base64, ' + response.image //   }) // });
  // }

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
    let nav = null

    if (this.state.isUser) {
      nav = <BuyerOwnerNav />
    } else {
      nav = <DisplayOwnerNav />
    }
    // alert(JSON.stringify(nav))

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
    let temp = this.state.messagedtls
    let messagelist = null
    if (typeof temp !== 'undefined' && temp != null && temp != '') {
      messagelist = Object.keys(temp).map(menu => {
        if (temp[menu].is_user) {
          var person = temp[menu].user_email
          var style = {
            marginLeft: '5px',
            color: '#606060',
            fontWeight: 'bold'
          }
        } else {
          var person = temp[menu].restaurant_name
          var style = {
            marginLeft: '5px',
            color: '#606060',
            fontWeight: 'bold'
          }
        }
        // console.log(JSON.parse(temp[menu]))
        return (
          <div class='row' style={style}>
            {/* <br/> */}
            <div>&nbsp;</div>
            {person}:{' '}
            <span style={{ fontWeight: 'normal' }}>{temp[menu].text}</span>
            {/* <br/> */}
          </div>
          // <a href='#' class='list-group-item list-group-item-action'>
          //   <div className='row'>
          //     <div className='col-sm-7'>
          //       <h4 style={{ color: 'black' }}>{temp[menu].dish_name}</h4>
          //       <div>{temp[menu].description}</div>
          //     </div>
          //     <div className='col-sm-3'>
          //       <label style={{ color: 'black' }}>Price</label>
          //       <br />
          //       <div>${temp[menu].price}</div>
          //       <br />
          //     </div>
          //     <div className='col-sm-1'>
          //       <div id={temp[menu].dish_name} />
          //     </div>
          //     <div className='col-sm-1'>
          //       <button
          //         id={temp[menu]._id}
          //         className='btn btn-danger'
          //         onClick={this.deleteDish}
          //       >
          //         Delete
          //       </button>
          //       <br />
          //       <br />

        //       <a
        //         onClick={this.setSessionStorage}
        //         href='/updatemenu'
        //         id={temp[menu]._id}
        //         style={{ float: 'right' }}
        //       >
        //         Edit
        //       </a>
        //     </div>
        //   </div>
        // </a>
        )
      })
    } else {
      ;<a href='#' class='list-group-item list-group-item-action'>
        <div className='row'>No records found</div>
      </a>
    }

    return (
      <div>
        {redirectVar}
        <div className='row'>
          <div className='col-sm-2'>
            {/* <DisplayOwnerNav /> */}
            {nav}
          </div>

          <div className='col-sm-10'>
            <div class='container'>
              <div class='login-form'>
                {/* <div class='main-div'> */}

                <div className='row'>
                  <div className='col-sm-6'>
                    <form
                      className='ui form error'
                      onSubmit={this.props.handleSubmit(this.onSubmit)}
                    >
                      <ul class='list-group'>
                        <li class='list-group-item'>
                          <br />
                          <h2>Chat Box</h2>
                          <label>
                            Order Id:{' '}
                            {
                              JSON.parse(
                                sessionStorage.getItem('messageDetails')
                              ).order_id
                            }
                          </label>
                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            {messagelist}
                            <div>&nbsp;</div>
                            <br />
                            <Field
                              class='form-control'
                              name='mesg'
                              component={this.renderInput}
                              label='Message'
                              // text= {this.state.menudtls.dish_name}
                            />
                          </div>
                          <br />
                          <button type='submit' class='btn btn-info'>
                            Send
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
  { postmessage, messagedetails }
)(
  reduxForm({
    form: 'streamUpdateMenu',
    validate: validate
  })(Message)
)
