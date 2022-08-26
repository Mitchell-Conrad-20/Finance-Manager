import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav';

function App() {
  return (
    <>
      <div className='contentPadding'>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/' index element={<Home/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
