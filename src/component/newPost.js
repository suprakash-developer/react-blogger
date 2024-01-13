import React from 'react'

export const NewPost = () => {
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
            <form>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Post Title</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputText"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Post Description</label>
                  <div className="col-sm-10">
                  <textarea style={{height:'200px'}} className="form-control" id="floatingTextarea"></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Select Catagories</label>
                  <div className="col-sm-10">
                  <select id="inputState" class="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">Select Author</label>
                  <div className="col-sm-10">
                  <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                  </div>
                </div>
                <div className="row mb-3">
                <label for="formFile" className="col-sm-2 col-form-label">Feature Image</label>
                <div className="col-sm-10"><input className="form-control" type="file" id="formFile"></input>
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
