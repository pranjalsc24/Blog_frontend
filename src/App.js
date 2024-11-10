
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Blogs from './pages/Blogs'
import Login from './pages/login';
import Register from './pages/Register';
import MyBlogs from './pages/MyBlogs';
import CreateBlog from './pages/CreateBlog';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/my-blog' element={<MyBlogs />} />
        <Route path='/create-blog' element={<CreateBlog />} />

  
      </Routes>
    </BrowserRouter>


    </UserProvider>

  );
}

export default App;
