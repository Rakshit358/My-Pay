import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { friendsNameAtom } from "../store/atoms";

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [_, setFriendsName] = useRecoilState(friendsNameAtom);
  const [balance, setBalance] = useState(0);
  console.log(users);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk").then((response) => {
      // console.log(response.data);
      setUsers(response.data.user);
    });

    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.balance);
        setBalance(response.data.balance);
      });
  }, []);

  const onClick = (username) => {
    navigate("/send");
  };

  return (
    <div>
      <Appbar />
      <div className="m-2">
        <Balance value={` $ ${balance}`} />
        <div>
          {users.map((user) => {
            return (
              <Users
                key={user._id}
                onClick={(e) => {
                  navigate("/send?id=" + user._id + "&name=" + user.firstname);
                }}
                name={user.username}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
