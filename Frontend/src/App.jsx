
import { Route, Routes } from "react-router-dom";

import Home from "./home/Home";
import Courses from "./Courses/Courses";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfileContainer from "./profile/ProfileContainer";
import Layout from "./Layout";

export default function App() {
  return (
    <div className="dark:bg-slate-900 dark:text-white"> 
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/:id/*" element={<ProfileContainer />} />
        </Route>
      </Routes>
    </div>
  )
}
