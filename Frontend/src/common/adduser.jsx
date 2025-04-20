// import { Link } from "react-rout/er-dom";
// import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
// import { useEffect } from "react";
// import { useEffect } from "react";
import { useState } from "react";

function AddUser({ handleUsersData }) {

    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:4001/user/signup", user)
            .then((res) => {
                console.log(res.data);
                document.getElementById('add-user-modal').closeModal()
                handleUsersData();
                if (res.data) {
                    toast.success("User created Successfully");

                }
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                    setTimeout(() => { }, 2000);
                }
            });

          

    }
    return (
        <>
            <dialog id="add-user-modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl tex-a">
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name :</label>
                            <input type="input"
                                name="fullname"
                                value={user.fullname}
                                onChange={handleChange}
                                className="input validator block w-full p-4 ps-10 text-sm 
                                text-gray-900 border
                                border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="Must be 3 to 30"
                                placeholder="Username"
                                title="Only letters, numbers or dash" />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Email</label>
                            <input
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="input validator block w-full p-4 ps-10 text-sm text-gray-900 border 
                              border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                              dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" required
                                placeholder="mail@site.com" />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password</label>
                            <input type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="input validator block w-full p-4 ps-10 text-sm 
                               text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                               focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="Must be more than 8 characters, including At least one number
                            <br/>At least one lowercase letter
                            <br/>At least one uppercase letter" placeholder="Password"

                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                        </div>

                        <button type="submit" className="text-white bg-blue-700 
                        hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Submit
                        </button>
                        {/* <AddUser /> */}
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button type="submit" className="btn">Close</button>
                        </form>
                    </div>
                    <div>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default AddUser;