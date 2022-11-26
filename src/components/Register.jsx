import React, {useState} from 'react'
import  {useMain, useMainUpdate} from '../mainContext'
import axio from 'axios'

export const Register = () => {
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [password_confirmaton, setpassword_confirmaton]= useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')

    const {logged,url} = useMain()
    const {setlogged} = useMainUpdate()
    
    const handleSubmit =  (e)=> {
        e.preventDefault()

        axio.post(url+'signup',{ 
        
            user:{
                email: email,
                password: password,
                password_confirmation: password_confirmaton,
                firstname: firstname,
                lastname: lastname
            }


        },{withCredentials: true}
        ).then(response=>{
            console.log(response.data)
            setlogged(response.data.logged_in)
            localStorage.setItem("tkn", response.data.tkn)

        }).catch(error=>{
            console.log(error)
        })
    }

    const HandleEmail = (e) =>{
        setemail(e.target.value)
    }
    const HandlePassword = (e) =>{
        setpassword(e.target.value)
    }
    const HandlePasswordC = (e) =>{
        setpassword_confirmaton(e.target.value)
    }
    const HandleFN = (e) => {
        setfirstname(e.target.value)
    }
    const HandleLN = (e) => {
        setlastname(e.target.value)
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="row"></div>
            <div className="row">
                <div className="col-sm">Sign up</div>
                <div className="col-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-2">
                            <input type="email" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email" onChange={HandleEmail}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="password" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" onChange={HandlePassword}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="password" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password confirmation" onChange={HandlePasswordC}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="text" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First name" onChange={HandleFN}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="text" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last name" onChange={HandleLN}/>
                        </div>
                        <div className="form-group my-2">
                            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit">Register</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
           
        </div>
    )
}
