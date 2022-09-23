import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path='/' exact />
        <Route element={<Home/>} path='/home' exact />
      </Routes>
    </Router>
  )
}

export default App;
