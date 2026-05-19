import React from 'react';
import ResourceTablePage from './ResourceTablePage';

const Activities = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User', accessor: 'user' },
    { header: 'Type', accessor: 'activity_type' },
    { header: 'Duration (min)', accessor: 'duration' },
    { header: 'Distance (km)', accessor: 'distance' },
    { header: 'Calories', accessor: 'calories' },
    { header: 'Date', accessor: 'date' },
  ];

  return <ResourceTablePage title="Activities" endpoint="/api/activities/" columns={columns} />;
};

export default Activities;
