import { useEffect, useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="bg-gray-400 h-screen flex justify-center items-center">
      <div className="bg-white text-center rounded-md p-2">
        <Header value={"Sign-In"} />
        <SubHeading text={"Enter your email and password to signin"} />
        <InputBox
          label={"Email"}
          placeholder={"rakshit@gmail.com"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputBox
          label={"Password"}
          placeholder={"123456"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          buttonName={"Sign-In"}
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/signin",
              {
                username: email,
                password: password,
              }
            );
            console.log(response);
            if (response.statusText == "OK") {
              console.log("Login success");
              navigate("/dashboard");
            }
            localStorage.setItem("token", response.data.token);
          }}
        />
        <BottomWarning label={"New user?"} buttonText={"Sign-up"} to={"/"} />
      </div>
    </div>
  );
}
