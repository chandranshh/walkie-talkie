import { useState } from "react";
import { register } from "../../controllers/userAuth/register";
import { useDispatch, useSelector } from "react-redux";
import { setSenderData } from "../../features/slices/senderDataSlice";
import { setToken } from "../../features/slices/getTokenSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    email: "",
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
    const registerData = await register(
      user.email,
      user.username,
      user.password
    );
    if (registerData) {
      dispatch(setSenderData(registerData?.user));
      dispatch(setToken(registerData));
      navigate("/chat");
    }
  };

  const senderData = useSelector((state) => state.senderData);
  console.log(senderData);

  return (
    <>
      <div className="h-screen w-screen text-white flex justify-center items-center">
        <div className="h-full w-[50%] flex items-center ">
          <div className=" w-full h-[70%] flex flex-col">
            <div className="w-full h-[30%] flex flex-col justify-center items-center">
              <div>
                <span className="text-3xl">Welcome to walkie-talkie</span>
              </div>
              <div className="text-xl">
                Register yourself today since you do not have friends in real
                life.
              </div>
            </div>
            <form
              className="flex flex-col w-full h-[70%] justify-start items-center"
              onSubmit={handleRegister}
            >
              <div className="h-[30%] w-[80%] flex flex-col items-center">
                <div className="w-full h-12 text-center">
                  <span className="text-2xl">Email</span>
                </div>
                <input
                  className="h-[30px] rounded-lg text-gray-800 px-2 py-1"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
