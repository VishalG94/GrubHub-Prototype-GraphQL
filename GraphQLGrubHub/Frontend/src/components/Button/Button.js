import React from 'react'

const Button = props => (
  <div className='row'>
    <div class='form-group'>
      <div className='col-sm-4'>
        <div>{props.children}</div>
        <input
          onChange={this.inputChangeHandler}
          type='text'
          class='form-control'
          name='firstname'
        />
      </div>

      <div className='col-sm-4'>
        <div>Last name</div>
        <input
          onChange={this.inputChangeHandler}
          type='text'
          class='form-control'
          name='lastname'
        />
      </div>
    </div>
  </div>
)

export default Button;