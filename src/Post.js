import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({ username, caption, imageUrl }) {
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

      <img className='post__image' src={imageUrl} alt='riceuniversity' />

      <h4 className='post__text'>
        <strong>{username}</strong>
        {caption}
      </h4>
    </div>
  )
}

export default Post
