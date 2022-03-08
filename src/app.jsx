import './app.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/home';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/profile'>Profile</Link>
    </nav>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
      <div>Template</div>
    </BrowserRouter>
  );
}

export default App;
