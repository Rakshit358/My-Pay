import { useCallback, useEffect, useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-gray-400 h-screen flex justify-center items-center p-2">
      <div className="bg-white text-center rounded-md p-2">
        <Header value={"Sign-Up"} />
        <SubHeading text={"Enter your information to create an account"} />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          label={"First Name"}
          placeholder={"John"}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          label={"Last Name"}
          placeholder={"Doe"}
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"rakshit@gmail.com"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"123456"}
        />
        <div>
          <Button
            buttonName={"Sign-Up"}
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  firstname,
                  lastname,
                  password,
                }
              );
              console.log(response);
              if (response.statusText == "OK") {
                console.log("User created successfully");
                navigate("/dashboard");
              }
              localStorage.setItem("token", response.data.token);
            }}
          />
        </div>
        <BottomWarning
          label={"Already a user?"}
          buttonText={"SignIn"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}
