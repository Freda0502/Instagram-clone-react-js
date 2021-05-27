import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { storage, db } from './firebase'
import firebase from 'firebase'
import './ImageUpload.css'

// function ImageUpload({ username }) {
//   const [image, setImage] = useState(null)
//   const [progress, setProgress] = useState(0)
//   const [caption, setCaption] = useState('')

//   const handleChange = (e) => {
//     //[0] only allow users to pick one file
//     if (e.target.files[0]) {
//       setImage(e.target.files[0])
//     }
//   }

//   const handleUpload = () => {
//     //[0] only allow users to pick one file
//     const uploadTask = storage.ref('images/${image.name}').put(image)
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         )
//         setProgress(progress)
//       },
//       (error) => {
//         //error function...
//         console.log(error)
//         alert(error.message)
//       },
//       () => {
//         //complete function...
//         storage
//           .ref('images')
//           .child(image.name)
//           .getDownloadURL()
//           .then((url) => {
//             //post the image inside the db
//             db.collection('posts').add({
//               timestamp: firebase.firesore.FieldValue.serverTimestamp(),
//               caption: caption,
//               imageUrl: url,
//             })
//             setProgress(0)
//             setCaption('')
//             setImage(null)
//           })
//       }
//     )
//   }

//   return (
//     <div className='ImageUpload'>
//       <progress className='ImageUpload__progress' value={progress} max='100' />
//       <input
//         type='text'
//         placeholder='Enter a caption...'
//         onChange={(event) => setCaption(event.target.value)}
//       />
//       <input type='file' onChange={handleChange} />
//       <Button onClick={handleUpload} variant='contained' color='secondry'>
//         Upload
//       </Button>
//     </div>
//   )
// }

// export default ImageUpload

function ImgUpload({ username }) {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  //const [url, setUrl] = useState(" ");
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        console.log(error)
        alert(error.message)
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imgUrl: url,
              username: username,
            })

            setProgress(0)
            setCaption('')
            setImage(null)
          })
      }
    )
  }
  return (
    <div className='ImageUpload'>
      <progress className='ImageUpload__progress' value={progress} max='100' />
      <input
        type='text'
        placeholder='Enter a Caption'
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type='file' onChange={handleChange} />
      <Button onClick={handleUpload} variant='contained' color='secondry'>
        Upload
      </Button>
    </div>
  )
}

export default ImgUpload
