import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import logo from "../../assets/pakam-logo.svg";
import axios from "axios";
import { BaseUrl } from "../../config/url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const [checkpass, setcheckpass] = useState(true);

  const [uCase, setuCase] = useState(false);
  const [passLength, setpassLength] = useState(false);

  useEffect(() => {
    // check uppercase
    if (password.match(/[A-Z]/)) {
      setuCase(true);
    } else {
      setuCase(false);
    }
    //check password length
    if (password.length >= 8) {
      setpassLength(true);
    } else {
      setpassLength(false);
    }
  }, [password]);

  useEffect(() => {
    if (uCase && passLength) {
      setcheckpass(false);
    } else {
      setcheckpass(true);
    }
  }, [uCase, passLength]);

  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkpass) {
      setloading(true);
      try {
        const res = await axios.post(`${BaseUrl}/api/auth/signup`, {
          firstName,
          lastName,
          userName,
          password,
        });
        console.log(res);
        toast.success("sign up successful");
        navigate("/login");
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((error as any).message);
        console.log(error);
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <section className="bg-[#F7F7F4] h-100% flex flex-col items-center justify-center py-10">
      <div className="bg-white px-10 py-10 flex flex-col items-center justify-center rounded-[15px]">
        <div className="flex items-center">
          <img src={logo} alt="" />
          <p className="text-green font-medium text-xl">Pakam</p>
        </div>
        <form
          className=" mt-4 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h4 className="text-2xl font-bold text-black text-center mb-9">
            Create Account
          </h4>
          <div>
            <div className="flex items-center gap-10 flex-col md:flex-row">
              <Input
                textLabel="First name"
                placeholder="Enter your First name"
                hasEye={false}
                value={firstName}
                setValue={setfirstName}
                checkPass={false}
              />
              <Input
                textLabel="Last name"
                placeholder="Enter your Last name"
                hasEye={false}
                value={lastName}
                setValue={setlastName}
                checkPass={false}
              />
            </div>
            <div className="flex items-start gap-10 mt-10  flex-col md:flex-row">
              <Input
                textLabel="Username"
                placeholder="Enter your Username"
                hasEye={false}
                value={userName}
                setValue={setuserName}
                checkPass={false}
              />
              <Input
                textLabel="Password"
                placeholder="Enter your Password"
                hasEye={true}
                value={password}
                setValue={setpassword}
                checkPass={checkpass}
              />
            </div>
          </div>
          <button
            className={`bg-green text-white text-[16px]  w-[280px] sm:w-[420px] py-[14px] rounded-xl mt-14 text-center flex justify-center items-center
           ${checkpass ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {loading ? <Loader /> : "Sign up"}
          </button>
        </form>

        <div className="mt-5">
          <p className="text-gray text-sm ">
            Forgot Password?{" "}
            <span className="text-green font-medium  ">Retrieve Now</span>
          </p>
        </div>
        <div className="mt-3">
          <p className="text-gray text-sm ">
            Do you have an account?{" "}
            <span
              className={`text-green font-medium  cursor-pointer`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
      <div className="mt-10 ">
        <p className="text-green font-bold text-[16px]">
          Powered by Pakam Technology
        </p>
      </div>
    </section>
  );
};

export default SignUp;

//const specialCharacterRegex = match(/([!,%,&,@,#,&,^,*,?,_,~])/);
//const specialCharacterRegex = /[^a-zA-Z0-9\s]/;
//const specialCharacterRegex = match(/([!,%,&,@,#,&,^,*,?,_,~])/);
//const specialCharacterRegex = /[^a-zA-Z0-9\s]/;
//const uppercaseRegex = match(/([a-z].*[A-Z])|([A-Z].*[a-z])/);
//const checkNumbers = match(/([0.9])/)
