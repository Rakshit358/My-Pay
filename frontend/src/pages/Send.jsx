import { useRecoilValue } from "recoil";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { friendsNameAtom } from "../store/atoms";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const token = localStorage.getItem("token");
  console.log(id);
  console.log(name);
  const [amount, setAmount] = useState(0);

  const onChange = (e) => {
    setAmount(e.target.value);
  };

  function handleOnClick() {
    axios
      .post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          amount: amount,
          to: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        console.log("success");
      });
  }

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="bg-white rounded-md p-4">
        <div className="pb-8">
          <Header value={"Send Money"} />
        </div>
        <div className="flex ">
          <div className="text-white bg-green-400 flex items-center justify-center mr-2 rounded-full h-[40px] w-[40px] text-center">
            <div>U</div>
          </div>
          <div className="text-left font-bold">{name}</div>
        </div>
        <InputBox
          onChange={onChange}
          label={"Amount (in Rs)"}
          placeholder={"Enter amount"}
        />
        <button
          className="w-full bg-green-400 rounded-md text-white"
          onClick={handleOnClick}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
