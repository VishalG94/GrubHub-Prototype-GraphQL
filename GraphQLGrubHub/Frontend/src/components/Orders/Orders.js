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
import OrderItems from './OrderItems'
import Draggable from "react-draggable";

// import HTML5Backend from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'
// import flow from 'lodash/flow'

// Define a Login Component
class Orders extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)

    // maintain the state required for this component
    this.state = {
      records: '',
      todos: [],
      currentPage: 1,
      todosPerPage: 3,
      activeDrags: 0,
      deltaPosition: {
          x: 0, y: 0
      },
      controlledPosition: {
          x: -400, y: 200
      },
      messageFlag: false
    }
  }

  componentWillMount () {
    // let temp =
    let data = {
      email: sessionStorage.getItem('email'),
      status: 'new',
      person: 'user_email'
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
          // Object.keys(this.state.records).map(row =>
          //   console.log(this.state.records[row].rating)
          // )
        }
      )
      // sessionStorage.setItem('sections', this.state.sections)

      // alert(sessionStorage.getItem('sections'))
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
        deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
        }
    });
};

onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
};

onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
};

// For controlled component
adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
};

adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
};

onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
};

onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
};

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

  handleMessage = e => {
    e.preventDefault()
    var headers = new Headers()
    // prevent page from refresh
    let data = {
      restaurant_name: sessionStorage.getItem('selectedRestaurant'),
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

  render () {
    // redirect based on successful login
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

    const { todos, currentPage, todosPerPage } = this.state
    const indexOfLastTodo = currentPage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
    console.log(indexOfFirstTodo, indexOfLastTodo)
    console.log(currentTodos)
    // alert('First: ',indexOfFirstTodo,+'last: '+ indexOfLastTodo )
    // const renderTodos = currentTodos.map((todo, index) => {
    //   return <li key={index}>{todo}</li>
    // })

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

    let orderRecords = null
    // let list = JSON.parse(sessionStorage.getItem('records'))
    let list = currentTodos
    if (list !== null) {
      orderRecords = Object.keys(list).map(row => {
        // console.log(list[row])

        // Object.keys(list[row]).map(item => {
        //   console.log(list[row][item])
        // console.log('List',list)
        //   total = total + items[item][1] * items[item][0]
        //   // total = total.toFixed();
        return (
          <Draggable {...dragHandlers}>


          <div>
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
                    {list[row].restaurant_name}
                    {/* {this.props.listItem.restaurant_name} */}
                  </label>
                </div>
                <div className='col-sm-4'>
                  <label
                    style={{
                      fontSize: '13px',
                      color: '#585858'
                    }}
                  >
                    Status: {list[row].order_status}
                  </label>
                </div>
                <label style={{ fontSize: '13px', color: '#585858' }}>
                  $ {list[row].total}
                </label>
                {/* <div className='col-sm-'> */}
                <a
                  href='/message'
                  onClick={this.handleMessage}
                  name={list[row].restaurant_name}
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
            {/* <OrderItems listItem={list[row]} /> */}
          </div>
          </Draggable>
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
            <BuyerOwnerNav />
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
                          <label style={{fontSize: '17px'}}>Item</label>
                        </div>
                        <div style={{fontSize: '17px'}} className='col-sm-3'>
                          <label>Quantity</label>
                        </div>
                        <div style={{fontSize: '17px'}} className='col-sm-3'>
                          <label>Price</label>
                        </div>
                        <div style={{fontSize: '17px'}} className='col-sm-3'>
                          <label>Order Status</label>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  {orderRecords}
                </ul>

                <br />

                <br />
              </div>
              <div style={{ textAlign: 'center' }}>
                {/* <ul>{renderTodos}</ul> */}
                <nav aria-label='Page navigation example'>
                  <ul class='pagination' id='page-numbers'>
                    {renderPageNumbers}
                  </ul>
                </nav>
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

// export default  (Orders)

export default 
// flow(
  connect(
    mapStateToProps,
    { getUserOrder }
  )
//   ,DndProvider(HTML5Backend)
// )
(Orders)
