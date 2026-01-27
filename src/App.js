import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import WomenSection from './pages/WomenSection';
import MenSection from './pages/MenSection';
import ProductDetail from './pages/ProductDetail';
import KidSection from './pages/KidSection';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/womensection' element={<WomenSection/>}/>
        <Route path='/mensection' element={<MenSection/>}/>
        <Route path='/kidsection' element={<KidSection/>}/>
        <Route path='/productdetail/:id' element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
