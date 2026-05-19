import React from 'react';
import ResourceTablePage from './ResourceTablePage';

const Workouts = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User', accessor: 'user' },
    { header: 'Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    { header: 'Date', accessor: 'date' },
    { header: 'Created', accessor: 'created_at' },
  ];

  return (
    <ResourceTablePage
      title="Workouts"
      endpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`}
      columns={columns}
    />
  );
};

export default Workouts;
