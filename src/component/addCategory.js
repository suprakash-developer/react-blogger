import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const AddCategory = () => {
  const history=useNavigate();

const [catName, setTitle] = useState('');
const [catDesc, setDescription] = useState('');
const [catImg, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const catAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('catName', catName);
    formData.append('catDesc', catDesc);
    formData.append('catImg', catImg);

console.log(formData.catImg);
  try {
    const response = await axios.post('http://localhost/blog-react/addcategori.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    handleClearForm();
    loadCatagory();
    console.log('Server response:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}


//-----------End Add Category

  // ------Clear the form by resetting the state
  const handleClearForm = () => {

    setTitle("")
    setDescription("")
  document.getElementById('formFile').value=""
    // Reset other fields as needed
    };
    
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
  const confirm=window.confirm("Are you sure to delete Category?")
  if (confirm==true){
    axios.delete('http://localhost/blog-react/deleteCat.php',{data:{id:id}})
    .then(()=>{
     loadCatagory();
    }).catch(()=>{
     alert("Somthing went wrong")
    })
  } else {
    history(`/categories`);
  }

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
                    <input onChange={handleTitleChange} name='catName' value={catName} type="text" className="form-control" id="inputText"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                  <label for="inputEmail3" className="col-form-label">Description</label>
                  <textarea onChange={handleDescriptionChange} name='catDesc' value={catDesc} style={{height:'200px'}} className="form-control" id="floatingTextarea"></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                <div className="col-sm-12">
                <label for="formFile" className="col-form-label">Feature Image</label>
                    <input onChange={handleImageChange} name='catImg' className="form-control" type="file" id="formFile"></input>
  </div></div>
                <div className="text-left">
                  <button type="submit" className="btn btn-primary">Update</button>
                  <button onClick={handleClearForm} type="reset" className="btn btn-secondary mx-3">Reset</button>
                </div>
                </form>
              

            </div>
          </div>

        </div>
        <div className="col-lg-7">
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
                  {viewCat.map((viewCat,index)=>(
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td width={'120px'}>{viewCat.catName}
                    <div className="modify">
                    <Link to={`/editcategories/${viewCat.catID}`}>Edit</Link> | <Link onClick={()=>deleteCat(viewCat.catID)}>Delete</Link>
                  </div>
                    </td>
                    <td>{viewCat.catDesc}</td>
                    {(()=>{
                      if(viewCat.catImg!==""){
                        return <td><img width={'50px'} height={'50px'} src={viewCat.catImg} alt=''></img></td>
                      } else {
                        return <td></td>
                      }
                    })()
                    }
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
