import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const NewPost = () => {
 const history=useNavigate();
 const [addpost, SetPost]=useState()
 const [addpostDesc, SetPostDesc]=useState()
  const [addCategori, SetCategori]=useState()
  const [addAuthor, SetAuthor]=useState()
  const [addImage, SetImage]=useState()

const handleTitleChange=(e)=>{
  SetPost(e.target.value)
}
const handleDescChange=(e)=>{
  SetPostDesc(e.target.value)
}
const handleCateChange=(e)=>{
  SetCategori(e.target.value)
}
const handleAuthorChange=(e)=>{
  SetAuthor(e.target.value)
}
const handleImageChange=(e)=>{
  const file=e.target.files[0]
  SetAuthor(file)
}

const FormSubmit=async(e)=>{
  e.preventDefault();
  const formData= new FormData();
  formData.append('postTitle',addpost)
  formData.append('postDesc',addpostDesc)
  formData.append('postCategori',addCategori)
  formData.append('postAuthor',addAuthor)
  formData.append('postImage',addImage)
  console.log(formData)

  try{
   const response= await axios.post('http://localhost/blog-react/addarticle.php',formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
   })
   history(`/allpost`)
  } catch(error) {
    console.log("Error to adding Post:",error)
  }
}



  return (
    <main id="main" className="main">

    <div className="pagetitle">
      <h1>Add New Posts</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item">Posts</li>
          <li className="breadcrumb-item active">Add New Post</li>
        </ol>
      </nav>
    </div>

    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
            <h5 class="card-title">Add Post</h5>
            <form onSubmit={FormSubmit}>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Post Title</label>
                  <div className="col-sm-10">
                    <input onChange={handleTitleChange} type="text" className="form-control" id="inputText"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Post Description</label>
                  <div className="col-sm-10">
                  <textarea onChange={handleDescChange} style={{height:'200px'}} className="form-control" id="floatingTextarea"></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Select Catagories</label>
                  <div className="col-sm-10">
                  <select defaultValue={'01'} onChange={handleCateChange} id="inputState" class="form-select">
                    <option value={'01'}>Choose...</option>
                    <option value={'02'}>...</option>
                  </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Select Author</label>
                  <div className="col-sm-10">
                  <select defaultValue={'01'} onChange={handleAuthorChange} id="inputState" className="form-select">
                  <option value={'01'}>Choose...</option>
                    <option value={'02'}>...</option>
                  </select>
                  </div>
                </div>
                <div className="row mb-3">
                <label for="formFile" className="col-sm-2 col-form-label">Feature Image</label>
                <div className="col-sm-10"><input onChange={handleImageChange} className="form-control" type="file" id="formFile"></input>
  </div></div>
                <div className="text-left">
                  <button type="submit" className="btn btn-primary">Update</button>
                  <button type="reset" className="btn btn-secondary mx-3">Reset</button>
                </div>
                </form>
              

            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
  )
}
