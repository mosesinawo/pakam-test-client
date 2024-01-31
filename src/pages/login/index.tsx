import React, { useState } from "react";
import Input from "../../components/input";
import logo from "../../assets/pakam-logo.svg";
import axios from "axios";
import { BaseUrl } from "../../config/url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";


const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = React.useState(false)

  const navigate = useNavigate()
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedJsonString = localStorage.getItem("user");
    if (storedJsonString !== null) {
      const userDetails = JSON.parse(storedJsonString);
      setUser(userDetails);
    }
  }, []);

  // React.useEffect(() =>{
  //   if (user!== null) {
  //    navigate('/')
  //   }
  // },[])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true)
    try {
      const res = await axios.post(`${BaseUrl}/api/auth/signin`, {
        userName,
        password,
      });
      const jsonString = JSON.stringify(res.data);
      console.log(jsonString);
      if (jsonString !== undefined) {
        localStorage.setItem("user", jsonString);
        navigate("/");
      }
      toast.success("Login successful 🤗");
      console.log(res.data);
    } catch (error) {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       toast.error((error as any).message);
      console.log(error);
    }finally{
      setloading(false)
    }
  };

  return (
    <section className="bg-[#F7F7F4] h-screen flex flex-col items-center justify-center ">
      <div className="bg-white px-10 py-10 flex flex-col items-center justify-center  sm:min-w-[807px]">
        <div className="flex items-center">
          <img src={logo} alt="" />
          <p className="text-green font-medium text-xl">Pakam</p>
        </div>
        <form
          className=" mt-4 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h4 className="text-2xl font-bold text-black text-center mb-4">
            Login
          </h4>
          <div>
            <div className="flex flex-col items-center gap-3 ">
              <Input
                textLabel="Username"
                placeholder="Enter your Username"
                hasEye={false}
                value={userName}
                setValue={setuserName}
              />
              <Input
                textLabel="Password"
                placeholder="Enter your Password"
                hasEye={true}
                value={password}
                setValue={setpassword}
              />
            </div>
          </div>
          <button className="bg-green text-white text-[16px]  w-[280px] sm:w-[420px] py-[14px] rounded-xl mt-14 text-center flex justify-center items-center">
          {loading ? <Loader /> : "Login"}
          </button>
        </form>

        <div className="mt-5">
          <p className="text-gray text-sm ">
            Forgot Password?{" "}
            <span className="text-green font-medium">Retrieve Now</span>
          </p>
        </div>
        <div className="mt-3">
          <p className="text-gray text-sm ">
            Don't you have an account?{" "}
            <span className="text-green font-medium cursor-pointer" onClick={() => {navigate("/signup")}}>Sign up</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
