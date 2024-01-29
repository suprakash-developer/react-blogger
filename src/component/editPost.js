import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate,Link, useParams } from 'react-router'

export const EditPost = () => {
  let history=useNavigate();
  const [getpostTitle, setPosttitle]=useState();
  const [getpostDesc, setPostdesc]=useState();
  const [addCategori, SetCategori]=useState()
  const [getcatName, setcatname]=useState();
  const [addAuthName, SetAuthName]=useState()
  const [getpostauth, setPostauth]=useState();
  const [getpostimg, setPostimg]=useState(null);
  const [disImg, setDisImg]=useState();

  const {id}=useParams();
  useEffect(()=>{
    loadPost();
  },
  [disImg])
  const loadPost=async()=>{
    const postItem = await axios.get('http://localhost/blog-react/editArticle.php?id='+id);
    setPosttitle(postItem.data.postTitle);
    setPostdesc(postItem.data.postDesc);
    setcatname(postItem.data.postcatName);
    SetCategori(postItem.data.postCategori)
    SetAuthName(postItem.data.postauthName);
    setPostauth(postItem.data.postAuthor);
    setPostimg(postItem.data.postImage);
    setDisImg(postItem.data.postImage)
  }



  const removeImg=()=>{
    document.getElementById('imgFeature').style.display='none';
    document.getElementById('formFile').value="";
    setPostimg('')
  }
  
  
  
  const handleTitleChange=(e)=>{
    setPosttitle(e.target.value)
  }
  const handleDescChange=(e)=>{
    setPostdesc(e.target.value)
  }
  const handleCateChange=(e)=>{
    SetCategori(e.target.value)
    
    const {options, selectedIndex} = e.target;
    var nameCat= options[selectedIndex].innerHTML
  console.log(options[selectedIndex].innerHTML);
  setcatname(nameCat)
  
  }
  const handleAuthorChange=(e)=>{
    setPostauth(e.target.value)
    const {options,selectedIndex}=e.target
    const nameAuth=options[selectedIndex].innerHTML
    SetAuthName(nameAuth)
  }
  const handleImageChange=(e)=>{
    const file=e.target.files[0]
    setPostimg(file)
    previewSelectedImage()
  }

  const imageInput = document.getElementById('formFile');
  const previewImage = document.getElementById('featureImg');
  function previewSelectedImage() {
     const file = imageInput.files[0];
     if (file) {
      
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          document.getElementById('featureImg').src = e.target.result;
              //setDisImg(e.target.result);
              document.getElementById('featureImg').style.display="block";
     }
  }
  }


  const [catetories,Setfeatchcat]=useState([])
  const loadCat=async()=>{
    const catTitle= await axios.get('http://localhost/blog-react/viewcat.php');
    Setfeatchcat(catTitle.data.records)
  }
  useEffect(()=>{
    loadCat()
  },[]
  )
  
  const FormSubmit=async(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append('ArticleID',id)
    formData.append('postTitle',getpostTitle)
    formData.append('postDesc',getpostDesc)
    formData.append('postCategori',addCategori)
    formData.append('postcatName',getcatName)
    formData.append('postAuthor',getpostauth)
    formData.append('postauthName',addAuthName)
    if(getpostimg!==""){
      formData.append('postImage',getpostimg);
    }else{
      
    }
    
    console.log(formData)
  
    try{
     const response= await axios.post('http://localhost/blog-react/updateArticle.php',formData,{
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
      <h1>Edit Posts</h1>
      <nav>
        {/* <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
          <li className="breadcrumb-item">Posts</li>
          <li className="breadcrumb-item active">Edit Post</li>
        </ol> */}
      </nav>
    </div>

    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
            <h5 class="card-title">Edit Post</h5>
            <form onSubmit={FormSubmit}>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Post Title</label>
                  <div className="col-sm-10">
                    <input onChange={handleTitleChange} value={getpostTitle} type="text" className="form-control" id="inputText"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Post Description</label>
                  <div className="col-sm-10">
                  <textarea onChange={handleDescChange} value={getpostDesc} style={{height:'200px'}} className="form-control" id="floatingTextarea"></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Select Catagories</label>
                  <div className="col-sm-10">
                  <select onChange={handleCateChange} id="inputState" class="form-select">
                    { catetories.map((catetories,index)=>(
                      getcatName==catetories.catName
                    ? <option selected value={catetories.catID}>{catetories.catName}</option>
                    : <option value={catetories.catID}>{catetories.catName}</option>
                    ))
                    }
                  </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Select Author</label>
                  <div className="col-sm-10">
                  <select onChange={handleAuthorChange} id="inputState" className="form-select">
                    <option value={'01'}>Sumit</option>
                    <option selected value={'01'}>Ratul</option>
                    <option value={'01'}>Samim</option>
                  </select>
                  </div>
                </div>
                <div className="row mb-3">
                <label for="formFile" className="col-sm-2 col-form-label">Feature Image</label>
                {(() => {
        if (getpostimg!=="") {
          return (<figure id='imgFeature'>
            <img id='featureImg' style={{width:'50px', height:'50px'}} src={disImg} alt=''></img>
            <span onClick={removeImg}>X</span>
            </figure>)
        } else {
          return <img className='hello' id='featureImg' src='' style={{width:'50px', height:'50px', display:'none'}} src="" alt=''></img>
        }
      })()}
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
