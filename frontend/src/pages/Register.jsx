import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    theme: "dark",
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if(localStorage.getItem('app-user')){
      navigate('/');
    };
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
        const { email, username, password } = values;
        const { data } = await axios.post(registerRoute, {
            username,email,password
        });
        if(data.status === false){
          toast.error(data.msg, toastOptions);
        }
        if(data.status === true){
          localStorage.setItem('app-user',JSON.stringify(data.user));
        }
        navigate("/");
    }
  };
  const handleValidation = () => {
    const { email, username, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("confirm password doesn't match!", toastOptions);
      return false;
    }else if(username.length<4){
        toast.error("username should be more than 4 characters", toastOptions);
        return false;
    }else if(password.length < 8){
        toast.error("password must be more than 8 characters", toastOptions);
        return false;
    }else if(email===""){
        toast.error("email is required", toastOptions);
        return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Head>Secret Chats</Head>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <Button type="submit">Create New User</Button>
          <Span>
            Already have an account ?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-semibold hover:text-teal-400 duration-300"
            >
              Login
            </Link>
          </Span>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = tw.div`flex flex-col h-screen w-screen justify-center items-center bg-[#131324]`;
const Form = tw.form`flex flex-col gap-2 bg-[#00000076] rounded-xl py-12 px-10`;
const Head = tw.div`font-["poppins"] tracking-widest text-white text-center font-bold text-2xl mb-4`;
const Input = tw.input`text-white p-2 rounded-md bg-transparent border-2 border-teal-600 text-sm`;
const Button = tw.button`bg-teal-600 p-2 rounded-md text-white font-semibold hover:bg-teal-400 duration-300 my-4`;
const Span = tw.span`text-white text-md font-thin`;

export default Register;
