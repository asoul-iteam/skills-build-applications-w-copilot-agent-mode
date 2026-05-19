import React from 'react';
import ResourceTablePage from './ResourceTablePage';

const Users = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'First Name', accessor: 'first_name' },
    { header: 'Last Name', accessor: 'last_name' },
  ];

  return <ResourceTablePage title="Users" endpoint="/api/users/" columns={columns} />;
};

export default Users;
