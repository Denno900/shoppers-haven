import {createContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const token = localStorage.getItem("jwt")

const AuthContext = createContext()

function AuthProvider({children}){

    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState()

    const navigate = useNavigate()

    // fetch the user
    function login(formData){
        fetch('/login',{
            method: 'POST',
            headers: {
              "Accept": 'application/json',
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem("jwt", data.jwt);
            if (data.errors){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.errors,
                  })
            }
            else if(data.user){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logged In Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setLoggedIn(true)
                  navigate('/')
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid Email or Password!',
                  })
            }
          })
    }


    function signup(formData) {
        fetch('/signup',{
            method: 'POST',
            headers: {
              "Accept": 'application/json',
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem("jwt", data.jwt);
            if (data.errors){
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong credentials!',
                    text: data.errors[0],
                  })
                  console.log(data.errors)
            }else if(data.user){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Signup Successful',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/login')
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
          })
    }

    // check if user is logged in
    useEffect(()=>{
        fetch("/me",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }
        )
        .then(res=>res.json())
        .then(response=>{
            setUser(response)
        }
        )
    }, [loggedIn])

      const contextData = {
        login,
        signup,
        user,
        setLoggedIn,
        loggedIn,
      }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider}