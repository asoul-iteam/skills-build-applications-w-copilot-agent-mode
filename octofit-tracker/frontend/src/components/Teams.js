import React from 'react';
import ResourceTablePage from './ResourceTablePage';

const Teams = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Members',
      accessor: (row) => (Array.isArray(row.members) ? row.members.length : '-'),
    },
    { header: 'Created', accessor: 'created_at' },
  ];

  return <ResourceTablePage title="Teams" endpoint="/api/teams/" columns={columns} />;
};

export default Teams;
