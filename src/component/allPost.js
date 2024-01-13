import React from 'react'
import { Table } from 'react-bootstrap'
export const AllPost = () => {
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
                  <tr>
                    <td>Unity Pugh</td>
                    <td>9958</td>
                    <td>Curicó</td>
                    <td>2005/02/11</td>
                    <td>37%</td>
                  </tr>
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
