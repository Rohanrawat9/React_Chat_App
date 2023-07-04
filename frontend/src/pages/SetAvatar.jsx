import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import loader from "../assets/grid.svg";

const SetAvatar = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    theme: "dark",
    pauseOnHover: true,
    draggable: true,
  };
  const navigate = useNavigate();
  const api = "https://api.multiavatar.com";
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select A Avatar", toastOptions);
    }else{
        const user = await JSON.parse(localStorage.getItem("app-user"));
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar]
        });

        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem("app-user",JSON.stringify(user));
            navigate('/');
        }else{
            toast.error("Error while setting avatar, please try again!", toastOptions);
        }
    }
  };

  useEffect(() => {
    if(!localStorage.getItem('app-user')){
      navigate('/login');
    };
  },[]);

  useEffect(() => {
    const call = async () => {
      const data = [];
      for (let i = 0; i < 1; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setLoading(false);
    }
    call();
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <Img src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <Head>Select A Avatar For Profile Pic</Head>
          <ImageContainer>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <Img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </ImageContainer>
          <Button onClick={setProfilePicture}>Set As Profile Picture</Button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = tw.div`flex flex-col h-screen w-screen justify-center items-center bg-[#131324]`;
const Head = tw.div`font-["poppins"] tracking-widest text-white text-center font-bold text-2xl`;
const Img = tw.img`w-[50px] h-[50px]`;
const ImageContainer = tw.div`flex justify-center gap-4 items-center my-8`;
const Button = tw.button`bg-teal-600 py-2 px-4 text-xs rounded-full text-white font-semibold hover:bg-teal-400 duration-300`;
export default SetAvatar;
