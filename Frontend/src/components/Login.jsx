// import { Link } from "react-rou
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth()
  const defaultValues = {
    email: "",
    password: ""
  };
  const [userData, setUserData] = useState(defaultValues)
  const [errors, setErrors] = useState(null)

  // parmeters, arguments
  const onSubmit = async (data) => {
    await axios.post("http://localhost:4001/user/login", data)
      .then((res) => {
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        document.getElementById("my_modal_3").close();
        setAuthUser(res.data.user);
        navigate(`/account/${res.data.user._id}/profile`);
      })
      .catch((err) => {
        console.log("error : ", err);
        setErrors("Invalid credential !");
      });
  };

  const handleSubmitForm  = (e) => {
    e.preventDefault();
    onSubmit(userData)
    
  }
  const handleCloseModal = (e) => {
    e.preventDefault();
    document.getElementById("my_modal_3").close();    
  }
  return (
    <>
      {/* ================ */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {errors ? <p className="text-red-600">{errors}</p> : "" }
          
          <form onSubmit={handleSubmitForm}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
             onClick={handleCloseModal}>✕</button>
            <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={(e) =>  setUserData(prevValues => ({
                    ...prevValues,
                    email: e.target.value
                  }))}
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                />
                <br />               
              </div>
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={userData.password}
                  onChange={(e) => setUserData(prevValues => ({
                    ...prevValues,
                    password: e.target.value
                  }))}
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                />               
              </div>
              <div className="flex justify-around mt-6">
                <button type="submit" 
                  className="bg-pink-500 text-white rounded-md px-3 py-1
                 hover:bg-pink-700 duration-200">
                  Login
                </button>
              </div>           
          </form>
        </div>
      </dialog>

    </>
  );
}

export default Login;