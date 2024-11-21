import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

import { Home } from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddEditBook from './pages/AddEditBook';
import { BookDetails } from './pages/BookDetails';



const App = () => (
  <Router>
    {/* <Navbar /> */}
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <ProtectedRoute>
      <BookDetails/>
          </ProtectedRoute>
        }
      />
      <Route
      path='/addbook'
      element={
        <ProtectedRoute>
          <AddEditBook/>
        </ProtectedRoute>
      }
      />
    </Routes>
  </Router>
);

export default App;
