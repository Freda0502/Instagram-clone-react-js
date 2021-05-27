import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase'
import { Button } from '@material-ui/core'
import firebase from 'firebase'

function Post({ postId, user, username, caption, imgUrl }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    let unsubscribe
    if (postId) {
      const unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        })
    }
    return () => {
      unsubscribe()
    }
  }, [postId])

  const postComment = (event) => {
    event.preventDefault()
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setComment('')
  }

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          src='https://i.ibb.co/BCCGcsB/Screen-Shot-2021-05-25-at-10-44-36-AM.png'
          alt='riceuniversity'
        />
        <h3> {username} </h3>
      </div>

      <img className='post__image' src={imgUrl} alt='riceuniversity' />

      <h4 className='post__text'>
        <strong>{username}</strong>
        {caption}
      </h4>

      {
        <div className='post__comments'>
          {comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong>
              {comment.text}
            </p>
          ))}
        </div>
      }

      {user && (
        <form className='post__commentBox'>
          <input
            className='post__input'
            type='text'
            placeholder='add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className='post__button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  )
}

export default Post
