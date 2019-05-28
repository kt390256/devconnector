import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from '../../action/post'


const CommentForm = props => {

    const [text, setText] = useState('');

    const { addComment, postId } = props;

    return (
         
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e =>{
            e.preventDefault()
            addComment(postId, text)
            setText("")
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}


export default connect(null, { addComment })(CommentForm)
