import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landing';
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import CreateBlogPage from './pages/create_blog';
import MyBlogs from './components/myblogs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {< LandingPage />} />
          <Route path='/signup' element= {< SignupPage />} />
          <Route path='/login' element= {< LoginPage />} />
          <Route path='/home' element= {< HomePage />} />
          <Route path='/create' element= {< CreateBlogPage />} />
          <Route path='/myblogs' element= {< MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
