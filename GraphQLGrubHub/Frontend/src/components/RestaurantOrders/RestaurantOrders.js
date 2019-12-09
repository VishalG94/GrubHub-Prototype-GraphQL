import React, { Component } from 'react'
import '../../App.css'
// import './Orders.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getUserOrder } from '../../actions'
import { orderStatus } from '../../actions'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'
import { Field, reduxForm } from 'redux-form'

// Define a Login Component
class RestaurantOrders extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      records: '',
      todos: [],
      currentPage: 1,
      todosPerPage: 5
    }
  }

  componentWillMount () {
    // let temp =
    let restaurant_name = JSON.parse(sessionStorage.getItem('ownerdata'))
      .restaurant_name
    // alert(restaurant_name)
    let data = {
      email: restaurant_name,
      status: 'new',
      person: 'restaurant_name'
    }
    axios.defaults.withCredentials = true

    this.props.getUserOrder({ params: data }, response => {
      // console.log( this.props.user[1])
      console.log(response)
      this.setState(
        {
          records: response.data,
          todos: response.data
        },
        () => {
          // sessionStorage.setItem('records', JSON.stringify(this.state.records))
          // console.log(this.state.restaurantdetails)
          Object.keys(this.state.records).map(row =>
            console.log(this.state.records[row].rating)
          )
        }
      )
      // sessionStorage.setItem('sections', this.state.sections)

      // alert(sessionStorage.getItem('sections'))
    })
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
  
  
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleMessage = e => {
    e.preventDefault()
    var headers = new Headers()
    // prevent page from refresh
    let data = {
      restaurant_name: JSON.parse(sessionStorage.getItem('ownerdata'))
        .restaurant_name,
      order_id: e.target.id,
      user_email: sessionStorage.getItem('email'),
      is_user: false
    }
    console.log(data)
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

  chageStatus = e => {
    e.preventDefault()
    // alert(e.target.getAttribute('id'))
    // let x = sessionStorage.getItem('selectedRestaurant')
    let data = {
      order_status: e.target.getAttribute('name'),
      order_id: e.target.id
    }
    // alert(data)
    axios.defaults.withCredentials = true

    this.props.orderStatus(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data[0])
        this.setState({
          authFlag: true
        })
        // sessionStorage.setItem('email', res.data[0].email)
        // sessionStorage.setItem('username', res.data[0].username)
        // sessionStorage.setItem('cookie', res.data[0].type) // cookies.save('cookie', res.data[0].type, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('userid', res.data[0]._id, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('username', res.data[0].username, {maxAge: 900000, httpOnly: false, path: '/'});
        // this.props.history.push('/home')
        window.location.reload()
      } else {
        alert('Please enter valid credentials')
      }
    })
  }

  render () {
    // redirect based on successful login
    let redirectVar = null
    let invalidtag = null
    // let itemslist = null
    let items = null
    let total = 0

    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }
    if (this.state.messageFlag) {
      redirectVar = <Redirect to='/message' />
    }

    const { todos, currentPage, todosPerPage } = this.state
    const indexOfLastTodo = currentPage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
    console.log(indexOfFirstTodo, indexOfLastTodo)
    console.log(currentTodos)
    // let list = this.state.restaurantdetails
    let list = currentTodos

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          class='page-item'
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          <a
            class='page-link'
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </a>
        </li>
      )
    })

    let itemslist = (items, status) => {
      // console.log('item, status'+ items + status)
      return Object.keys(items).map(item => {
        console.log('List', item)
        total = total + items[item][1] * items[item][0]
        // total = total.toFixed();
        return (
          <div>
            <div className='row'>
              <div className='col-sm-3'>
                <div>
                  {items[item][0]} * {item}
                </div>
              </div>
              <div className='col-sm-3'>
                <div />
              </div>
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

    let orderRecords = null
    // let list = JSON.parse(sessionStorage.getItem('records'))
    // let list = this.state.records
    if (list !== null) {
      orderRecords = Object.keys(list).map(row => {
        console.log(list[row])

        // Object.keys(list[row]).map(item => {
        //   console.log(list[row][item])
        // console.log('List',list)
        //   total = total + items[item][1] * items[item][0]
        //   // total = total.toFixed();
        return (
          <a href='#' style={{ marginTop: '20px' }} class='list-group-item'>
            <div>
              <div>
                <div className='row'>
                  <div className='col-sm-3'>
                    <label
                      style={{
                        marginLeft: '10px',
                        fontSize: '17px',
                        color: 'black'
                      }}
                    >
                      {list[row].user_email}
                    </label>
                  </div>
                  <div className='col-sm-3'>
                    <label
                      style={{
                        marginLeft: '10px',
                        fontSize: '13px',
                        float: 'right',
                        color: '#585858'
                      }}
                    >
                      Status: {list[row].order_status}
                    </label>
                  </div>
                  <div className='col-sm-3'>
                    <label
                      style={{
                        fontSize: '13px',
                        float: 'right',
                        color: '#585858'
                      }}
                    >
                      $ {list[row].total}
                    </label>
                  </div>

                  <div className='col-sm-3'>
                    <div class='dropdown'>
                      <button
                        class='btn btn-success dropdown-toggle'
                        style={{ float: 'right' }}
                        type='button'
                        id='dropdownMenu2'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        Update Status
                      </button>
                      <div
                        class='dropdown-menu'
                        aria-labelledby='dropdownMenu2'
                      >
                        <button
                          name='New'
                          id={list[row].order_id}
                          class='btn btn-light'
                          type='button'
                          onClick={this.chageStatus}
                        >
                          New
                        </button>
                        <br />
                        <button
                          name='Preparing'
                          id={list[row].order_id}
                          class='btn btn-light'
                          type='button'
                          onClick={this.chageStatus}
                        >
                          Preparing
                        </button>
                        <br />
                        <button
                          name='Ready'
                          id={list[row].order_id}
                          class='btn btn-light'
                          type='button'
                          onClick={this.chageStatus}
                        >
                          Ready
                        </button>
                        <br />
                        <button
                          name='Delivered'
                          id={list[row].order_id}
                          class='btn btn-light'
                          type='button'
                          onClick={this.chageStatus}
                        >
                          Delivered
                        </button>
                        <br />
                        <button
                          name='Cancel'
                          id={list[row].order_id}
                          class='btn btn-light'
                          type='button'
                          onClick={this.chageStatus}
                        >
                          Cancel
                        </button>
                        <br />
                      </div>
                    </div>
                    <a
                      onClick={this.handleMessage}
                      id={list[row].order_id}
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
                </div>
                {/* <br /> */}
                <div style={{ marginLeft: '10px' }} className='row'>
                  {itemslist(
                    JSON.parse(list[row].orderlist),
                    list[row].order_status
                  )}
                </div>
                {/* <br /> */}
                {/* <div className='row'>
                  <div className='col-sm-6'>
                    <label style={{ fontSize: '17px', color: 'PURPLE' }}>
                      Total
                    </label>
                  </div>
                  <div className='col-sm-3'>
                    <div>*{items[item][0]}</div>
                  </div>
                  <div className='col-sm-3'>

                  </div>
                </div> */}
                {/* <br /> */}
              </div>
            </div>
          </a>
        )
      })
      // })
    }

    // let orderRecords =

    return (
      <div>
        {redirectVar}
        <div className='row'>
          <div className='col-sm-2'>
            <DisplayOwnerNav />
          </div>

          <div className='col-sm-10'>
            <div class='container'>
              <div class='login-form'>
                {/* <div class='main-div'> */}

                <div class='panel'>
                  <h2>Upcoming Orders</h2>
                  {/* {invalidtag} */}
                </div>

                {/* <br /> */}
                <ul class='list-group'>
                  {/* <br /> */}

                  {/* <li class='list-group-item'>{editname}</li> */}
                  {/* <li class='list-group-item'>
                    <div>
                      <div className='row'>
                        <div className='col-sm-3'>
                          <label style={{ fontSize: '17px' }}>Item</label>
                        </div>
                        <div style={{ fontSize: '17px' }} className='col-sm-3'>
                          <label>Quantity</label>
                        </div>
                        <div style={{ fontSize: '17px' }} className='col-sm-3'>
                          <label>Price</label>
                        </div>
                        <div style={{ fontSize: '17px' }} className='col-sm-3'>
                          <label>Order Status</label>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  {orderRecords}
                </ul>

                <br />
                <div style={{ textAlign: 'center' }}>
                  {/* <ul>{renderTodos}</ul> */}
                  <nav aria-label='Page navigation example'>
                    <ul class='pagination' id='page-numbers'>
                      {renderPageNumbers}
                    </ul>
                  </nav>
                </div>
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

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { getUserOrder, orderStatus }
)(RestaurantOrders)
