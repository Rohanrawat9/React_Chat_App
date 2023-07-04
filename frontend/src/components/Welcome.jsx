import React from 'react'
import tw from 'tailwind-styled-components';

const Welcome = ({currentUser}) => {
  return (
    <Container>
        <h1 className='text-xl font-bold'>Welcome,<span className='text-purple-400 text-md font-mono'>{currentUser.username}</span>!</h1>
        <h3>Select a chat to start</h3>
    </Container>
  )
}

const Container = tw.div`flex flex-col justify-center items-center text-white`;

export default Welcome