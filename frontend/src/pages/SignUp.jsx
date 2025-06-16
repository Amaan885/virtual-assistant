import React, { useContext, useState } from 'react'
import bg from '../assets/authBg.jpeg'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userDataContex } from '../contex/UserContex';
import axios from "axios"

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const { serverUrl, userData, setUserData } = useContext(userDataContex)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        setErr("")
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                name, email, password
            }, { withCredentials: true })
            setUserData(result.data)
            setLoading(false)
            navigate("/customize")
        } catch (error) {
            console.log(error)
            setUserData(null)
            setLoading(false)
            setErr(error.response.data.message)
        }

    }
    return (
        <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{
            backgroundImage: `url(${bg})`
        }}>

            <form onSubmit={handleSignUp} className='w-[90%] h-[500px] max-w-[450px] color-black backdrop-blur rounded-xl shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]'>
                <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'> Virtual Assistant </span></h1>
                <input type='text' placeholder='Enter Your Name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-white px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setName(e.target.value)} value={name} />
                <input type='email' placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-white px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email} />

                <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative' >
                    <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-white px-[20px] py-[10px]' required onChange={(e) => setPassword(e.target.value)} value={password} />
                    {!showPassword && <IoIosEye className='absolute top-[18px] right-[20px] text-white cursor-pointer w-[25px] h-[25px]' onClick={() => setShowPassword(true)} />}
                    {showPassword && <IoIosEyeOff className='absolute top-[18px] right-[20px] text-white cursor-pointer w-[25px] h-[25px]' onClick={() => setShowPassword(false)} />}
                </div>

                {err.length > 0 && <p className='text-red-500 text-[22px]'>
                    *{err}
                </p>}

                <button className='min-w-[150px] h-[60px] mt-[5px] text-black font-semibold bg-white rounded-full text-[19px]' disabled={loading} > {loading ? "loading..." : "Sign Up"} </button>
                <p className='text-white text-[18px] cursor-pointer' onClick={() => navigate("/signin")}>Already have an account ? <span className='text-blue-400'>Sign In</span></p>
            </form>

        </div>
    )
}

export default SignUp
