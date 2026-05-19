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

  return (
    <ResourceTablePage
      title="Users"
      endpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`}
      columns={columns}
    />
  );
};

export default Users;
