import React, {useState} from 'react'

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confirm_pass, setConfirm_pass] = useState("")

    const [activeForm, setActiveForm] = useState('register');
    const [error, setError] = useState("")
    const [field_error, setField_Error] = useState("")

    const handleButtonClick = (formType) => {
      console.log(formType)
      setActiveForm(formType);
      props.onFormSwitch(formType);
    }

    // const handlesignupSubmit = (event) => {
    //   event.preventDefault()
    //   fetch("http://127.0.0.1:8000/api/register/", {
    //     method: 'POST',
    //     headers : {
    //       "content-type" : 'application/json'
    //   },
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   }).catch(error =>{
    //     console.log(error);
    //   } )
    // }


    const handleSubmit = (e) => {
        var flag = false
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/register/", {
          method: 'POST',
          headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify({"email": email
      ,"password":pass,"confirm_password": confirm_pass})
      }).then(response => {
        if (response.status === 400) {
            flag = true
            return response.json(); // Handle validation errors
        } else if (!response.ok) {
            throw new Error('Registration failed'); // Handle other errors
        }
        return response.json(); // Successfully registered
    })
        .then(data => {
          if (flag === true) {
            if (data.non_field_errors && data.non_field_errors.length > 0){
              setField_Error(data.non_field_errors[0]);
              setError("");
            }else{
              setError(data.email[0]);
              setField_Error("");
            }
          }else{
            setError("")
            setEmail("")
            setPass("")
            setConfirm_pass("")
            console.log("Successfully registered")
          }
        }).catch(error =>{
          console.log(error);
        } )
      }

  return (
    <>
    <div className='maincontainer'>
      <div className="nav">
          <button className={`btn ${activeForm === 'login' ? 'active' : 'inactive'}`} onClick={() => handleButtonClick('login')}>Sign in</button>
          <button className={`btn ${activeForm === 'register' ? 'active' : 'inactive'} `}onClick={() => handleButtonClick('register')} >Sign up </button>
      </div>
      <form className = "register-form" id='register-form' onSubmit = {handleSubmit}>
          <label htmlFor="email">Email</label>
          <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='youremail@gmail.com' id='email' name='email' autoComplete="off" />
          <small> {error}</small>
          <label htmlFor="password1">Password</label>
          <input value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='********' id='password1' name='password' autoComplete="off" />
          <label htmlFor="password2">Confirm Password</label>
          <input value = {confirm_pass} onChange={(e) => setConfirm_pass(e.target.value)} type="password" placeholder='********' id='password2' name='password' autoComplete="off" />
          <small>{field_error}</small>
          <button className = "log-btn" type='submit'>Sign Up</button>
      </form>
      <button onClick={() => props.onFormSwitch('login')} className='btn2'>Already Have account? Login here</button>
    
    </div>
  </>
  )
}

export default Register
