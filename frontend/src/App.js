import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Home from './Pages/Home';
import Search from './Pages/Search';
import Navbar from './components/navbar';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import AboutUs from './Pages/AboutUs';
function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
