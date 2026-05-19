import React from 'react';
import ResourceTablePage from './ResourceTablePage';

const Leaderboard = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Rank', accessor: 'rank' },
    {
      header: 'User',
      accessor: (row) => {
        if (typeof row.user === 'object' && row.user !== null) {
          return row.user.username || row.user.email || JSON.stringify(row.user);
        }
        return row.user;
      },
    },
    {
      header: 'Team',
      accessor: (row) => {
        if (typeof row.team === 'object' && row.team !== null) {
          return row.team.name || JSON.stringify(row.team);
        }
        return row.team;
      },
    },
    { header: 'Score', accessor: 'score' },
    { header: 'Updated', accessor: 'updated_at' },
  ];

  return <ResourceTablePage title="Leaderboard" endpoint="/api/leaderboard/" columns={columns} />;
};

export default Leaderboard;
