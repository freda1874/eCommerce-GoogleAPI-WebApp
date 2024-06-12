import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Home from './Pages/Home';
import Search from './Pages/Search';
import Navbar from './components/navbar';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import AboutUs from './Pages/AboutUs';
import Login from './Pages/Login';  
import { UserProvider } from './contexts/user';
function App() {
 
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/profile" element={<Login />} />  
          </Routes>
        </div>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
