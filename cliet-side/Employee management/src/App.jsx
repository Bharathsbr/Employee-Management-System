
import './App.css'
import AddEmployee from './components/AddEmployee'
import EmpoyeeList from './components/EmployeeList'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<EmpoyeeList />} />
            <Route path="/employees" element={<EmpoyeeList />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/update-employee/:id" element={<AddEmployee />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App
