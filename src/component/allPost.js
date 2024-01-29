import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export const AllPost = () => {
  const [postList, SetPostlist]=useState([]);
  const loadArticle=async()=>{
    const listPost= await axios.get('http://localhost/blog-react/viewarticle.php')
    SetPostlist(listPost.data.records);
  }
useEffect(()=>{
  loadArticle()
},[])

const deletePost=(id)=>{
axios.delete('http://localhost/blog-react/deleteArticle.php',{data:{id:id}});
loadArticle();
}
  return (
    <main id="main" className="main">

    <div className="pagetitle">
      <h1>All Posts</h1>
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
          <div className="card">
            <div className="card-body">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>
                      Title
                    </th>
                    <th>Author</th>
                    <th>Catagories</th>
                    <th>Image</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {postList.map((postList, index)=>(
                  <tr>
                    <td style={{width:"300px"}}>{postList.postTitle}<br/>
                    <Link to={`/editpost/${postList.ArticleID}`}>Edit</Link> | <Link onClick={()=>deletePost(postList.ArticleID)}>Delete</Link>
                    </td>
                    <td>{postList.postauthName}</td>
                    <td>{postList.postcatName}</td>
                    {(() => {
        if (postList.postImage!=="") {
          return <img style={{width:'50px', height:'50px'}} src={postList.postImage} alt=''></img>
        } else {
          return <td></td>
        }
      })()}
                    <td>
                      
                      </td>

                    <td>5</td>
                  </tr>
                  ))
                }
                </tbody>
              </table>
              

            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
  )
}
