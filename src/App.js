import logo from './logo.svg';
import './App.css';
import { Header } from './component/header';
import { Sidebar } from './component/sidebar';
import { Dashboard } from './component/dashboard';
import { AllPost } from './component/allPost';
import { NewPost } from './component/newPost';
import { AddCategory } from './component/addCategory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EditCategory } from './component/editCategory';

function App() {
  return (
    <div className="App">
      <Router>
     <Header/>
     <Sidebar/>
     <Routes>
     <Route path='/' element={<Dashboard/>}></Route>
     <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/postnew' element={<NewPost/>}></Route>
      <Route path='/allpost' element={<AllPost/>}></Route>
      <Route path='/categories' element={<AddCategory/>}></Route>
      <Route path='/editcategories/:id' element={<EditCategory/>}></Route>
     </Routes>
     </Router>
     
    </div>
  );
}

export default App;
