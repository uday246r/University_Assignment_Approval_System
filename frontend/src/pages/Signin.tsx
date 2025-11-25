import { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
// import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE;


export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("userId", response.data.user.id);

      if (response.data.user.role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (response.data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (response.data.user.role === "PROFESSOR") {
        navigate("/professor/dashboard");
      } else if (response.data.user.role === "HOD") {
        navigate("/hod/dashboard");
      }

    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

    return(
         <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your details to Sign in"}/>
                    <InputBox onChange={e=>{
                        setEmail(e.target.value)
                    }} placeholder= {"uday@gmail.com"} label={"Email"}
                    />
                    <InputBox onChange={e=>{
                        setPassword(e.target.value)
                    }} placeholder={"Uday@123"} label={"Password"}
                     />

                    <div>
                        <Button onClick={handleSignin} label={"Sign in"}
                        />
                    </div>
                    {/* <div>
                        <BottomWarning label={"Don't have an Account?"} buttonText={"Sign up"} to={"/signup"}/>
                    </div> */}
                </div>
            </div>

        </div>
    )
}