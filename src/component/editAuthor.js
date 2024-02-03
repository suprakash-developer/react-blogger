import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
export const EditAuthor = () => {
  const history=useNavigate();
const [authName, setTitle] = useState('');
const [authDesc, setDescription] = useState('');
const [authImg, setImage] = useState(null);
const [disImg, setDisImg]=useState();
const [errorMess,SeterrorMess]=useState()


const {id}=useParams()
    useEffect(()=>{
        loadCat()
    },
    [])

    const loadCat=async()=>{
        const result= await axios.get("http://localhost/blog-react/editauth.php?id="+id)
        setTitle(result.data.authName)
        setDescription(result.data.authDesc)
        setImage(result.data.authImg)
        setDisImg(result.data.authImg)
    }



const handleTitleChange = (e) => {
  setTitle(e.target.value);
};

const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
  previewSelectedImage()
};

const removeImg=()=>{
  document.getElementById('imgFeature').style.display='none';
  document.getElementById('messError').style.display = 'none';
  document.getElementById('formFile').value="";
  setImage('')
}

const imageInput = document.getElementById('formFile');
const previewImage = document.getElementById('featureImg');
function previewSelectedImage() {
   const file = imageInput.files[0];
   if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
            previewImage.src = e.target.result;
            setDisImg(e.target.result);
            document.getElementById('imgFeature').style.display="block";
   }
}
}




const authorAdd = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('authID',id);
  formData.append('authName', authName);
  formData.append('authDesc', authDesc);
  formData.append('authImg', authImg);
  if(authImg!==""){
    formData.append('authImg',authImg);
  }else{
    formData.append('authImg','');
  }
  console.log(formData);

try {
  const response = await axios.post('http://localhost/blog-react/updateauthors.php', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.data.status == 'invalid') {
    SeterrorMess(response.data.message);
    document.getElementById('messError').style.display = 'block';
  } else {
    history(`/allauthor`);
  }
  console.log('Server response:', response.data);
} catch (error) {
  console.error('Error uploading file:', error);
}
}
const handleClearForm = () => {
// Clear the form by resetting the state
setTitle("")
setDescription("")
document.getElementById('imgFeature').style.display='none';
document.getElementById('formFile').value=""
// Reset other fields as needed

};

  return (
    <main id="main" className="main">

    <div className="pagetitle">
      <h1>Add New Author</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item">Posts</li>
          <li className="breadcrumb-item active">Add New Author</li>
        </ol>
      </nav>
    </div>

    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
            <h5 class="card-title">Add Author</h5>
            <form id='catForm' onSubmit={authorAdd}>
                <div className="row mb-3">
                  <div className="col-sm-12">
                  <label for="inputEmail3" className="col-form-label">Name</label>
                    <input onChange={handleTitleChange} name='catName' value={authName} type="text" className="form-control" id="inputText"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                  <label for="inputEmail3" className="col-form-label">Description</label>
                  <textarea onChange={handleDescriptionChange} name='catDesc' value={authDesc} style={{height:'200px'}} className="form-control" id="floatingTextarea"></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                <div className="col-sm-12">
                  <label for="formFile" className="col-form-label">Feature Image</label>
                  {(() => {
        if (authImg!=="") {
          return (<figure id='imgFeature'>
            <img id='featureImg' style={{width:'50px', height:'50px'}} src={disImg} alt=''></img>
            <span onClick={removeImg}>X</span>
            </figure>)
        } else {
          return <img className='hello' id='featureImg' src='' style={{width:'50px', height:'50px', display:'none'}} src="" alt=''></img>
        }
      })()}
                    <input onChange={handleImageChange} name='catImg' className="form-control" type="file" id="formFile"></input>
  </div>
  <p id='messError' style={{display:'none', color:'red'}}>{errorMess}</p>
  </div>
                <div className="text-left">
                  <button type="submit" className="btn btn-primary">Update</button>
                  <button onClick={handleClearForm} type="reset" className="btn btn-secondary mx-3">Reset</button>
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
