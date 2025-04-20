import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddUser from "../../common/adduser";

const Users = () => {

  //   const usersList = [{
  //     email: "demo@gmail.com",
  // fullname: "John Doe"
  //   }]
  const [usersData, setUsersData] = useState([]);

  const handleUsersData = async () => {
    await axios.get("http://localhost:4001/user")
      .then((res) => {
        console.log("res : ", res.data.user);

        // setUsersData(res.data.user);
        setUsersData(res.data.user)

      }).catch((err) => {
        console.log("error : ", err.data);
      });
  }

  useEffect(() => {
    handleUsersData();
  }, []);

  const deleteUser = (userId) => {
    axios.delete('http://localhost:4001/user/' + userId + '/delete').then((res) => {
      console.log('res', res);
      handleUsersData();
    });
  }


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th colSpan={3} className="items-end">
              <div>
                <button className="btn" onClick={() => document.getElementById('add-user-modal').showModal()}>add</button>
                <AddUser handleUsersData={handleUsersData} />
              </div>
            </th>
          </tr>
          <tr>
            <th>full name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user._id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>
                <button className="group">
                  <button className="btn btn-sm btn-success mr-1">
                    <Link to={`/account/${user._id}/edit-profile`}>
                      Edit
                    </Link>
                  </button>
                  <button className="btn btn-sm btn-warning" onClick={() => deleteUser(user._id)}>Delete</button>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Users };
