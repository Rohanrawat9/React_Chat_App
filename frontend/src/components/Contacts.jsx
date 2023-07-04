import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <Head>Secret Chat</Head>
          <ContactsContainer>
            {contacts.map((contact, index) => {
              return (
                <ContactContainer
                  className={`${
                    index === currentSelected ? "bg-purple-600" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <ImageContainer>
                    <Img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </ImageContainer>
                  <div>
                    <h3 className="text-white text-xs font-bold capitalize">{contact.username}</h3>
                  </div>
                </ContactContainer>
              );
            })}
          </ContactsContainer>
          <Wrapper>
            <ImageContainer>
              <Img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </ImageContainer>
            <Username>
              <h3 className='font-["Poppins"] capitalize font-bold text-center text-xs'>{currentUserName}</h3>
            </Username>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

const Container = tw.div`grid grid-rows-[10%_70%_20%] overflow-hidden bg-[#080420]`;
const Wrapper = tw.div`flex flex-col py-2 bg-[#00000076] text-white`;
const Head = tw.div`font-["poppins"] tracking-widest text-white text-center font-bold text-xl my-2`;
const Img = tw.img`w-[2rem] h-[2rem]`;
const ImageContainer = tw.div`flex justify-center gap-2 items-center my-2`;
const ContactsContainer = tw.div`flex flex-col items-center overflow-auto gap-2 mt-8`;
const ContactContainer = tw.div`bg-[#ffffff39] cursor-pointer px-2 gap-2 items-center flex w-[90%]`;
const Username = tw.div``;

export default Contacts;
