import React, { useContext } from 'react'
import { userDataContex } from '../contex/userContex'

function Card({ image }) {
  const { serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontedImage, selectedImage, setSelectedImage } = useContext(userDataContex)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[120px] lg:h-[220px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage == image ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`} onClick={() => {
      setSelectedImage(image)
      setBackendImage(null)
      setFrontedImage(null)
    }}>
      <img src={image} className='h-full object-cover' />
    </div>
  )
}

export default Card
