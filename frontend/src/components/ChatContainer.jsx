import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import Logout from '../components/Logout.jsx';
import ChatInput from "./ChatInput.jsx";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes.js";
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to:currentChat._id,
      from:currentUser._id,
      message:msg,
    });
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });
    const msgs = [...messages];
    msgs.push({fromSelf:true, message:msg});
    setMessages(msgs);
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({fromSelf:false, message:msg});
      })
    }
  },[]);

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage]);
  },[arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"}); 
  }, [messages]);

  useEffect(() => {
    (async function(){
      if(currentChat){
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id
        })
        setMessages(response.data);
      }
    })();
  }, [currentChat])
  
  return (
    <>
      {currentChat && (
        <Container>
          <Head>
            <Details>
              <Avatar>
                <Img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </Avatar>
              <Username>{currentChat.username}</Username>
            </Details>
              <Logout/>
          </Head>
          <MessagesContainer>
            {
              messages.map((message,index)=>(
                <Message ref={scrollRef} key={uuidv4()}>
                  <Content className={`${message.fromSelf ? 'sended' : 'recieved'}`}>
                    <P className={`${message.fromSelf ? 'bg-purple-500' : 'bg-gray-500'}`}>{message.message}</P>
                  </Content>
                </Message>
              ))
            }
          </MessagesContainer>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};
const P = tw.p`rounded-full text-gray-100 px-4 py-2`
const MessagesContainer = tw.div`
flex flex-col gap-2 overflow-y-auto h-72 w-full items-start p-2
`
const Message = tw.div`
flex items-center w-full 
`
const Content = tw.div`
text-xs max-w-lg 
`
const Head = tw.div`
w-full flex justify-between py-2 px-4 items-center
`;
const Details = tw.div`
flex justify-start items-center w-full gap-2 
`;
const Img = tw.img`w-[2rem] h-[2rem] rounded-full p-1 bg-purple-600`;

const Avatar = tw.div`
flex justify-center gap-2 items-center my-2
`;
const Username = tw.div`
text-xs font-[cursive]
`;
const Container = tw.div`flex flex-col h-full w-full justify-between items-center text-white font-["Poppins"]`;

export default ChatContainer;
