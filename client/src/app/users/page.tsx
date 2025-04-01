'use client';

import {
  CreateUser,
  useCreateUserMutation,
  useGetUsersQuery,
} from '@/state/api';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import CreateUserModal from './CreateUserModal';

const columns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'ID',
    width: 300,
  },
  {
    field: 'name',
    headerName: 'User Name',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: users, isError, isLoading } = useGetUsersQuery(searchTerm);

  const [createUser] = useCreateUserMutation();
  const handleCreateUser = async (data: CreateUser) => {
    await createUser(data);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Users" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
          Create User
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="my-4">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white "
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE DATA */}
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />

      {/* MODAL */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};

export default Users;
