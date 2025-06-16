import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const userDataContex = createContext()

function UserContex({ children }) {
    const serverUrl = "http://localhost:8000"
    const [userData, setUserData] = useState(null)
    const [frontendImage, setFrontedImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getGeminiResponse = async (command) => {
        try {
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, { withCredentials: true })
            return result.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])
    const value = {
        serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontedImage, selectedImage, setSelectedImage, getGeminiResponse
    }
    return (

        <div>
            <userDataContex.Provider value={value} >
                {children}
            </userDataContex.Provider>
        </div>
    )
}

export default UserContex
