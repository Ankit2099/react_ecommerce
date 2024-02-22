import './App.css';
import React, {useState} from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/LoginSignup/Login';
import Register from './Components/LoginSignup/Register';
import Navbarcomp from './Components/Navbarcomp';
import HomePage from './Components/Pages/HomePage';
import About from './Components/Pages/About';
import Footer from './Components/Footer';


function App() {
  const [currentForm, setcurrentForm] = useState("login")
  // const [isLoggedIn,  setIsLoggedin]= useState(false);

  // const handleLogout = () =>{
  //   setIsLoggedin(false);
  // }   

  // const handleLogin = () =>{
  //   setIsLoggedin(true);
  // }

 

  const toggleform = (formName) => {
    setcurrentForm(formName);
  }

  return (

    <BrowserRouter>
    
    <div className='App'  >
      <Navbarcomp />
      <Routes>
            <Route path="/home" element={<HomePage/>} />
            <Route path='/login' element={
                    currentForm === 'login' ? <Login onFormSwitch = {toggleform}/> : <Register onFormSwitch = {toggleform}/>
                  }/>
            <Route path= '/about' element = {<About />}/>
      </Routes>
     
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
