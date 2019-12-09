// import React from 'react'

// class Search extends React.Components {
//   render() {
//     console.log("Inside search: ",this.props);
//     return (
//       <div className='row'>
//             Hello!
//       <div className='col-sm-1'>
//       <img
//                   class='preview-restaurant-img'
//                   // src='http://simpleicon.com/wp-content/uploads/account.png'
//                   // src={this.state.restaurantimg}
//                   alt='Preview Image'
//                   width='200'
//                   height='200'
//                 />
//       </div>
//       {/* <div className='col-sm-5'>
//         <div style={{ fontSize: '16px', fontWeight:'bold',marginLeft:'30px', marginBottom: '5px', marginTop: '12px' }}>{this.props.restaurant_name}</div>
//         <div style={{ fontSize: '14px',color:'#6b6b83', marginLeft:'30px', marginBottom: '15px', marginTop: '5px' }}>{this.props.restaurant_secions}</div>
//       </div>
//       <div className='col-sm-3'>
//         <div style={{ fontSize: '14px',color:'#6b6b83', marginLeft:'30px', marginBottom: '15px', marginTop: '12px' }}>{this.props.restaurant_rating}</div>
//       </div>
//       <div className='col-sm-3'>
//         <div style={{ fontSize: '14px',color:'#6b6b83', marginLeft:'30px', marginBottom: '15px', marginTop: '12px' }}>$$$</div>
//       </div> */}
//     </div>
//     )
//     }
//   }

// export default Search;

import React from 'react'
import ROOT_URL from '../../constants.js'
// import './Button.css'

class Display extends React.Component {
  render () {
    let img = `${ROOT_URL}/images/profilepics/`
    
    if (this.props.image) {
      img = img + this.props.image
    } else {
      img = img + 'restaurant.png'
    }

    // alert(img)
    // console.log(this.props)
    return (
      <div id={this.props.id} className='row'>
        <div id={this.props.id} className='col-sm-1'>
          <img
            class='preview-restaurant-img'
            // src='http://simpleicon.com/wp-content/uploads/account.png'
            src={img}
            alt='Preview Image'
            width='200'
            height='200'
            id={this.props.id}
          />
        </div>
        <div id={this.props.id} className='col-sm-5'>
          <div
            id={this.props.id}
            style={{
              fontSize: '16px',
              color: 'black',
              fontWeight: 'bold',
              marginLeft: '30px',
              marginBottom: '5px',
              marginTop: '12px'
            }}
          >
            {this.props.restaurant_name}
          </div>
          <div
            id={this.props.id}
            style={{
              fontSize: '14px',
              color: 'black',
              marginLeft: '30px',
              marginBottom: '15px',
              marginTop: '5px'
            }}
          >
            {this.props.cuisine}
          </div>
        </div>
        <div id={this.props.id} className='col-sm-3'>
          <div
            id={this.props.id}
            style={{
              fontSize: '14px',
              color: 'black',
              marginLeft: '30px',
              marginBottom: '15px',
              marginTop: '12px'
            }}
          >
            Good
          </div>
        </div>
        <div id={this.props.id} className='col-sm-3'>
          <div
            id={this.props.id}
            style={{
              fontSize: '14px',
              color: 'black',
              marginLeft: '30px',
              marginBottom: '15px',
              marginTop: '12px'
            }}
          >
            $$$
          </div>
        </div>
      </div>
    )
  }
}
// console.log("Inside search: ",this.props);

export default Display
