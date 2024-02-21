import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
// import Navbarcomp from '../Navbarcomp'

const Login = (props) => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")


  const [activeForm, setActiveForm] = useState('login');
  
  const navigate = useNavigate()

  const handleButtonClick = (formType) => {
    console.log(formType)
    setActiveForm(formType);
    props.onFormSwitch(formType);
  }

  // const handleLogin = () => {
  //   setloginValue(true)
  // }

    
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      fetch("http://127.0.0.1:8000/api/login/",{
        method:'POST',
        headers : {
          "Content-Type" : 'application/json'
      },
      body : JSON.stringify({"email": email
      ,"password":pass})
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        const access_token = data.access_token
        const refresh_token = data.refresh_token
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        navigate('/home')
      })
      .catch(error =>{
        console.log(error)
      })
    }

    
  return (
    <>
      <div className='maincontainer'>
        <div className="nav">
          <button className={`btn ${activeForm === 'login' ? 'active' : 'inactive'}`} onClick={() => handleButtonClick('login')}>Sign in</button>
          <button className={`btn ${activeForm === 'register' ? 'active' : 'inactive'}`} onClick={() => handleButtonClick('register')} >Sign up </button>
        </div>
        <form className = "login-form" onSubmit = {handleLoginSubmit}>
            <label htmlFor="email">Email</label>
            <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='youremail@gmail.com' id='email' name='email' autoComplete="off" />
            <label htmlFor="password">Password</label>
            <input value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='********' id='password' name='password' autoComplete="off" />
            <button className= "log-btn" type='submit' >Log in</button>
        </form>
        <button onClick={() => props.onFormSwitch('register')} className='btn2'>Don't have account? Register here</button>
        
          
      </div>
    </>
  )
}

export default Login
