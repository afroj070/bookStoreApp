import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

function Layout() {
  const {id} = useParams();
  const [authUser, setAuthUser] = useAuth()
  const navigate = useNavigate();

  useEffect(()=> {
    if(!authUser) {
      navigate('/')
    }
  },[]);
  
  return (
    <>
    <div className="grid grid-cols-4 gap-1">
        <div className="col-span-1">
            <ul className="p-3">
                <li><Link to={`/account/${id}/profile`} >Account</Link></li>
                <li><Link to={`/account/${id}/books`} >Books</Link></li>
                <li><Link to={`/account/${id}/users`} >Users</Link></li>
            </ul>
        </div>
        <div className="col-span-3">
            <Outlet />
        </div>
    </div>
    </>
  );
}

export default Layout;