import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav';

function App() {
  return (
    <>
      {/* Everything need to be inside of the BrowserRouter to function properly */}
      <BrowserRouter>

        {/* Navbar is outside of padding */}
        <Nav />

        {/* Everything else gets default padding */}
        <div className='contentPadding'>

          {/* Define routes */}
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
          
        </div>
      </BrowserRouter>


    </>
  );
}

export default App;
