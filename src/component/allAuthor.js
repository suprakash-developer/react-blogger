import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
export const AllAuthor = () => {
    const history=useNavigate
 const [viewAuth, getAuthor]=useState([])
 useEffect(()=>{
  loadAuthor();
 },
 [])
const loadAuthor=async()=>{
  const saveCat = await axios.get('http://localhost/blog-react/viewauth.php')
  getAuthor(saveCat.data.records)
}
// End View Catagori-----------
//Delete Catagori-----------

const deleteCat=(id)=>{
  const confirm=window.confirm("Are you sure to delete Category?")
  if (confirm==true){
    axios.delete('http://localhost/blog-react/deleteAuth.php',{data:{id:id}})
    .then(()=>{
     loadAuthor();
    }).catch(()=>{
     alert("Somthing went wrong")
    })
  } else {
    
  }

}

  return (
    <main id="main" className="main">

    <div className="pagetitle">
      <h1>All Author</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item">Tables</li>
          <li className="breadcrumb-item active">Data</li>
        </ol>
      </nav>
    </div>

    <section className="section">
      <div className="row">
    <div className="col-lg-12">
    <table className="table">
            <thead>
              <tr>
              <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Count</th>
              </tr>
            </thead>
            <tbody>
              {viewAuth.map((viewAuth,index)=>(
              <tr>
                <th scope="row">{index+1}</th>
                <td width={'120px'}>{viewAuth.authName}
                <div className="modify">
                <Link to={`/editauthor/${viewAuth.authID}`}>Edit</Link> | <Link onClick={()=>deleteCat(viewAuth.authID)}>Delete</Link>
              </div>
                </td>
                <td>{viewAuth.authDesc}</td>
                <td>
                {(() => {
    if (viewAuth.authImg!=="") {
                  return <img width={'50px'} height={'50px'} src={viewAuth.authImg} alt=''></img>
    } else {
      return
    }
  })()}
                  </td>
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
