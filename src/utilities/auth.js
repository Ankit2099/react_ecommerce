import { jwtDecode } from 'jwt-decode'


//function to decode a JWT token

// atoken = localStorage.getItem(access_token)
// rtoken = localStorage.getItem(refresh_token)

export const decodeToken = (token) =>{
    try {
        return jwtDecode(token)
    } catch (error) {
        return null
    }
};


// Function to check if jwt token is expired

export const isTokenExpired = (token) =>{
    const decodedToken = decodeToken(token)
    // console.log(decodedToken)
    if (decodedToken && decodedToken.exp){
        const currentTime = Date.now()/1000;
        return decodedToken.exp < currentTime
    }

    return true
}

// Function to retrieve access token if refresh token is valid otherwise redirect to login details

export const  getAccessToken = (token)=>{
    
    // Checking if the access token is present in Local Storage and not Expired 
    if(!token || isTokenExpired(token)){
       let rtoken = localStorage.getItem('refresh_token')
       if  (!rtoken || isTokenExpired(rtoken)) {
            console.log("token expired ! please log in again")
        //    window.location='/login';
       }else{
        fetch("http://127.0.0.1:8000/api/token/refresh/",{
            method:'POST',
            headers : {
             "Authorization": `Bearer ${rtoken}`,
              "Content-Type" : 'application/json'
          },
          body : JSON.stringify({'refresh_token': localStorage.getItem('refresh_token')})
        }).then(data =>{
            console.log(data)
            localStorage.setItem('access_token', data.access_token)
            return  data.access_token
        }).catch(error =>{
            console.log(error)
          })  
    }
    }else{
        return token
    }
}
// Function to check if user is loggedin or not

export const isLoggedIn = () =>{
    const token = getAccessToken(localStorage.getItem('access_token'))
    return token
}

export const LoggedIn = () => {
    // console.log("loggedin function called")
    const token = isLoggedIn()
    if (token!= null){
        return true;
    }else{
        return false;
    }
}

