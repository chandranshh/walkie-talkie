/* eslint-disable react/no-unescaped-entities */
import { login } from "../controllers/userAuth/login";
import { useDispatch } from "react-redux";
import { setSenderData } from "../features/slices/senderDataSlice";
import { setToken } from "../features/slices/getTokenSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const loginData = await login(user.username, user.password);
    if (loginData) {
      dispatch(setSenderData(loginData?.user));
      dispatch(setToken(loginData));
      navigate("/chat");
    }
  };

  return (
    <div className="bg-gray-500">
      <div className="h-screen w-screen text-white flex justify-center items-center">
        <div className="h-full w-[50%] flex items-center ">
          <div className=" w-full h-[70%] flex flex-col">
            <div className="w-full h-[30%] flex flex-col justify-center items-center">
              <div>
                <span className="text-3xl">Welcome back to walkie-talkie</span>
              </div>
              <div className="text-xl text-center py-2">
                So you didn't find any friends in real life, huh? Don't worry,
                we got you covered.
              </div>
            </div>
            <form
              className="flex flex-col w-full h-[70%] justify-start items-center"
              onSubmit={handleRegister}
            >
              <div className="h-[30%] w-[80%] flex flex-col items-center">
                <div className="w-full h-12 text-center">
                  <span className="text-2xl">Username</span>
                </div>
                <input
                  className="h-[30px] rounded-lg text-gray-800 px-2 py-1"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={handleInput}
                />
              </div>
              <div className="h-[30%] w-[80%] flex flex-col items-center">
                <div className="w-full h-12 text-center">
                  <span className="text-2xl">Password</span>
                </div>
                <input
                  className="h-[30px] rounded-lg text-gray-800 px-2 py-1"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <button
                className="bg-blue-500 text-lg rounded-xl w-[15%] h-[10%]"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
