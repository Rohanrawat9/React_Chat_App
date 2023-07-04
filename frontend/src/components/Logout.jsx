import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiPowerOff } from 'react-icons/bi'
import tw from 'tailwind-styled-components'

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
        <BiPowerOff size={25}/>
    </Button>
  )
}

const Button = tw.button`
    flex justify-center items-center bg-purple-600 rounded-full hover:bg-purple-800 duration-150
    `

export default Logout