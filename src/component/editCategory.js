import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const EditCategory = () => {
    const history=useNavigate();
    const {id}=useParams()
    useEffect(()=>{
        loadCat()
    },
    [])
    const loadCat=async()=>{
        const result= await axios.get("http://localhost/blog-react/editCat.php?id="+id)
        Setcatagori(result.data)
    }
    //---------Add Category
  const [addCat, Setcatagori]=useState({
    catid:'',
    catName:'',
    catDesc:'',
    catImg:''
  })
const {catid,catName,catDesc,catImg}=addCat
const handleChange=(e)=>{
  Setcatagori({...addCat,[e.target.name]:e.target.value})
}

const catAdd=(e)=>{
  e.preventDefault()
axios.post('http://localhost/blog-react/updatecategori.php',addCat)
.then((result)=>{
  if(result.data.status=='invalid'){
    alert("Somthing went wrong")
  } else {
    history(`/categories`);
  }
})
}
  return (
    <main id="main" className="main">

    <div className="pagetitle">
      <h1>Add New Category</h1>
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
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-body">
            <h5 class="card-title">Add Category</h5>
            <form id='catForm' onSubmit={e=>catAdd(e)}>
                <div className="row mb-3">
                  <div className="col-sm-12">
                  <label for="inputEmail3" className="col-form-label">Name</label>
                    <input onChange={handleChange} name='catName' value={addCat.catName} type="text" className="form-control" id="inputText"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                  <label for="inputEmail3" className="col-form-label">Description</label>
                  <textarea onChange={handleChange} name='catDesc' value={addCat.catDesc} style={{height:'200px'}} className="form-control" id="floatingTextarea"></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                <div className="col-sm-12">
                <label for="formFile" className="col-form-label">Feature Image</label>
                    <input onChange={handleChange} name='catImg' value={addCat.catImg} className="form-control" type="file" id="formFile"></input>
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
