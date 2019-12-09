import React, { Component } from 'react'
import '../../App.css'
import './Orders.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getUserOrder } from '../../actions'
import { connect } from 'react-redux'
import BuyerOwnerNav from '../Display/BuyerOwnerNav'
import { Field, reduxForm } from 'redux-form'
import HTML5Backend from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'
import flow from 'lodash/flow'

// Define a Login Component
class OrderItems extends Component {
  // call the constructor method
  constructor (props) {
    super(props)
    this.state = {
      records: ''
    }
  }

  componentWillMount () {
    // let temp =
  }

  handleMessage = e => {
    e.preventDefault()
    var headers = new Headers()
    // prevent page from refresh
    let data = {
    //   restaurant_name: sessionStorage.getItem('selectedRestaurant'),
      restaurant_name: e.target.name,
      order_id: e.target.id,
      user_email: sessionStorage.getItem('email'),
      is_user: true
    }
    sessionStorage.setItem('messageDetails', JSON.stringify(data))

    this.setState({ messageFlag: true })
    axios.defaults.withCredentials = true
    // console.log(data)
    // make a post request with the user data
    // this.props.loginowner(data, res => {
    //   if (res.status === 200) {
    //     console.log('Inside response', res.data)
    //     this.setState({
    //       authFlag: true
    //     })
    //     const owner = jwtDecode(res.data.token)
    //     console.log(owner)
    //     sessionStorage.setItem('email', owner.email)
    //     // sessionStorage.setItem('ownerdata', JSON.stringify(owner))
    //     this.props.ownerdetails({ params: data }, res => {
    //       if (res.status === 200) {
    //         console.log('Inside ownerdetails response', res.data)
    //         sessionStorage.setItem('ownerdata', JSON.stringify(res.data[0]))
    //         this.props.history.push('/ownerrestaurantmenu')
    //       } else {
    //         console.log('Please enter valid credentials')
    //       }
    //     })

    //   } else {
    //     alert('Please enter valid credentials')
    //   }
    // })
  }

  handleClick = event => {
    this.setState(
      {
        currentPage: Number(event.target.id)
      },
      () => {
        // alert(this.state.currentPage, )
      }
    )
  }

  render () {
    let items = null
    let total = 0
    let redirectVar = null
    if (this.state.messageFlag) {
        redirectVar = <Redirect to='/message' />
      }
    let itemslist = (items, status) => {
        // console.log('item, status'+ items + status)
        return Object.keys(items).map(item => {
          // console.log('List', item)
          total = total + items[item][1] * items[item][0]
          // total = total.toFixed();
          return (
            <div>
              <div className='row'>
                <div className='col-sm-6'>
                  <div>
                    {items[item][0]} * {item}
                  </div>
                </div>
                {/* <div className='col-sm-3'>
                  <div></div>
                </div> */}
                {/* <div className='col-sm-3'>
                  <div>{status}</div>
                </div> */}
                {/* <div className='col-sm-3'>
                  <div>{items[item][1] * items[item][0]}</div>
                </div> */}
              </div>
            </div>
          )
        })
      }
    // redirect based on successful login
    return (
      <div>
        <a href='#' style={{ marginTop: '20px' }} class='list-group-item'>
          <div class='card' draggable>
            <div>
              <div className='row'>
                <div className='col-sm-5'>
                  <label
                    style={{
                      marginLeft: '10px',
                      fontSize: '17px',
                      color: 'Black'
                    }}
                  >
                    {this.props.listItem.restaurant_name}
                  </label>
                </div>
                <div className='col-sm-4'>
                  <label
                    style={{
                      fontSize: '13px',
                      color: '#585858'
                    }}
                  >
                    Status: {this.props.listItem.order_status}
                  </label>
                </div>
                <label style={{ fontSize: '13px', color: '#585858' }}>
                  $ {this.props.listItem.total}
                </label>
                {/* <div className='col-sm-'> */}
                <a
                  href='/message'
                  onClick={this.handleMessage}
                  name={this.props.listItem.restaurant_name}
                  id={this.props.listItem.order_id}
                  style={{
                    float: 'right',
                    marginRight: '10px',
                    fontSize: '13px'
                    // color: 'Blue'
                  }}
                >
                  Message
                </a>
              </div>
              {/* <br /> */}
              <div style={{ marginLeft: '10px' }} className='row'>
                {itemslist(
                  JSON.parse(this.props.listItem.orderlist),
                  this.props.listItem.order_status
                )}
              </div>
              {/* <br /> */}
              {/* <div className='row'>
              <div className='col-sm-6'>
                <label style={{ fontSize: '17px', color: 'black' }}>
                  Total
                </label>
              </div>
              <div className='col-sm-3'>
                <label style={{ fontSize: '17px', color: 'black' }}>
                  $ {list[row].total}
                </label>
              </div>
            </div> */}
              {/* <br /> */}
            </div>
          </div>
        </a>
      </div>
    )
  }
}
// export Login Component
// export default BuyerProfile

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default  (OrderItems)

// export default flow(
//   connect(
//     mapStateToProps,
//     { getUserOrder }
//   ),
//   DndProvider(HTML5Backend)
// )(Orders)
