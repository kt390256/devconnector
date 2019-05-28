import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../action/post'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'

const Post = props => {


    const { 
        getPost,
        post: { post, loading },
        match
    } = props;

    useEffect(() => {
        getPost(match.params.id);
    },[getPost])

 


return post === null ? (<Spinner />) :(
    <>
        <Link to="/posts" className="btn">Back To Posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </>
    )
  
}

const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps,{ getPost })(Post);
