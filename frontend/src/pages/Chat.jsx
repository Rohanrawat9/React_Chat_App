import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    (async function () {
      if (!localStorage.getItem("app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("app-user")));
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);
  
  useEffect(() => {
    (async function () {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <>
        <Container>
          <ContainerWrapper>
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
            )}
          </ContainerWrapper>
        </Container>
    </>
  );
};


const Container = tw.div`flex flex-col h-screen w-screen justify-center items-center bg-[#131324]`;
const ContainerWrapper = tw.div`grid grid-cols-[35%_65%] sm:grid-cols-[35%_65%] md:grid-cols-[25%_75%] h-[85vh] w-[85vw]  bg-[#00000076] rounded-lg`;


export default Chat;
