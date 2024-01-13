import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const AddCategory = () => {
  const history=useNavigate();

  //---------Add Category
  const [addCat, Setcatagori]=useState({
    catid:'',
    catName:'',
    catDesc:'',
    catImg:''
  })
const handleChange=(e)=>{
  Setcatagori({...addCat,[e.target.name]:e.target.value})
}

const catAdd=(e)=>{
  e.preventDefault()
  const formData={
    catName:addCat.catName,
    catDesc:addCat.catDesc
  }

axios.post('http://localhost/blog-react/addcategori.php',formData)
.then((result)=>{
  if(result.data.status=='invalid'){
    alert("Somthing went wrong")
  } else {
    Setcatagori([]);
    document.getElementById('catForm').reset();
    loadCatagory();
    history(`/categories`);
  }
})
}
//-----------End Add Category
//View Catagori-----------
 const [viewCat, getCategory]=useState([])

 useEffect(()=>{
  loadCatagory();
 },
 [])
const loadCatagory=async()=>{
  const saveCat = await axios.get('http://localhost/blog-react/viewcat.php')
  getCategory(saveCat.data.records)
}
// End View Catagori-----------
//Delete Catagori-----------

const deleteCat=(id)=>{
 axios.delete('http://localhost/blog-react/deleteCat.php',{data:{id:id}})
 .then(()=>{
  loadCatagory();
 }).catch(()=>{
  alert("Somthing went wrong")
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
        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
            <h5 class="card-title">Add Category</h5>
            <form id='catForm' onSubmit={catAdd}>
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
        <div className="col-lg-7">
        <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {viewCat.map((viewCat,index)=>(
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{viewCat.catName}
                    <div className="modify">
                      <Link>Edit</Link> | <Link onClick={()=>deleteCat(viewCat.catID)}>Delete</Link>
                      
                    </div>
                    </td>
                    <td>{viewCat.catDesc}</td>
                    <td>28</td>
                  </tr>
                  ))}
                </tbody>
              </table>
        </div>
      </div>
    </section>

  </main>
  )
}
