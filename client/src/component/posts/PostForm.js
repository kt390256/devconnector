import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPost } from '../../action/post';

const PostForm = ({ addPost }) => {

    const [text, setText] = useState('');

    function handleSetText(text) {
        setText(text);
    }

    return (
      
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e =>{
            e.preventDefault()
            addPost({ text })
            setText("")
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => handleSetText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}


export default connect(null, { addPost })(PostForm)
