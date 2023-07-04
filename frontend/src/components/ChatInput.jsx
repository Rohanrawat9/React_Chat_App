import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {FaSmileWink} from 'react-icons/fa'
const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const handleEmojiShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }
  return (
    <Container>
         {
                showEmojiPicker && <div className="absolute top-[-300px] flex w-full h-full"><Picker theme='dark' size="24" emojiStyle='google'  width={300} height={300} previewConfig={{ showPreview: false }} onEmojiClick={(emojiObject)=>setMsg((msg)=>msg+emojiObject.emoji)} disableAutoFocus={true} native/></div>
            }
        <BtnContainer>
            <FaSmileWink size={20} className='text-yellow-300' onClick={handleEmojiShow} /> 
        </BtnContainer>
        <Form onSubmit={(e)=>sendChat(e)}>
            <Input type="text" placeholder='Type your message here...' value={msg} onChange={(e) => setMsg(e.target.value)} onDoubleClick={handleEmojiShow} />
            <Button type='submit'>
                <IoMdSend className='text-purple-400'/>
            </Button>
        </Form>
    </Container>
  )
}

const Container = tw.div`
grid grid-cols-[5%_95%] items-center bg-[#080420] px-4 py-1 w-full gap-2 relative
`
const BtnContainer = tw.div`flex items-center`
const Form = tw.form`flex items-center justify-between gap-2`
const Input = tw.input`w-full px-2 py-4 rounded-sm bg-transparent border-none text-xs text-gray-400`
const Button = tw.button``
export default ChatInput