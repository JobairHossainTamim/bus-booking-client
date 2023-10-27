import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PublicRouter from './components/PublicRoute/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Loader from './components/Loading/Loader';
import { useSelector } from 'react-redux';
import AdminHome from './pages/AdminPages/AdminHome/AdminHome';
import Bus from './pages/AdminPages/Buses/Bus';
import AdminUser from './pages/AdminPages/AdminUsers/AdminUser';
import AdminBooking from './pages/AdminPages/AdminBooking/AdminBooking';
import BookNow from './pages/Book-Now/BookNow';
import About from './pages/AboutMe/About';
import Bookings from './pages/Bookings/Bookings';
import Profile from './pages/Profile/Profile';

function App() {


  const { loading } = useSelector(state => state.alerts)

  return (
    <div>
      {/*  */}
      {loading && <Loader />}
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/book-now/:id' element={<ProtectedRoute><BookNow /></ProtectedRoute>}></Route>
          <Route path='/login' element={<PublicRouter><Login /></PublicRouter>}></Route>
          <Route path='/register' element={<PublicRouter><Register /></PublicRouter>}></Route>
          <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>}></Route>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route path='/bookings' element={<ProtectedRoute><Bookings /></ProtectedRoute>}></Route>
          <Route path='/admin' element={<ProtectedRoute><AdminHome /></ProtectedRoute>}></Route>
          <Route path='/admin/bus' element={<ProtectedRoute><Bus /></ProtectedRoute>}></Route>
          <Route path='/admin/user' element={<ProtectedRoute><AdminUser /></ProtectedRoute>}></Route>
          <Route path='/admin/booking' element={<ProtectedRoute><AdminBooking /></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
