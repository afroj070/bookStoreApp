
import { Route, Routes, Navigate, useParams } from 'react-router-dom'
import Layout from "./ProfileLayout";

import {
    Profile,
    Books,
    Users
} from './index'
// import Form from './blocks/Form';

export default function ProfileContainer() {
  const id = useParams();
  return (
    <div className="dark:bg-slate-900 dark:text-white"> 
      <Routes >
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
        </Route>
        <Route index element={<Navigate to={`/account/${id}/profile`} />} />
      </Routes>
    </div>
  )
}
