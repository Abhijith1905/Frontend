import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function ProjectCount({ count, error }) {
  return (
    <Card className="mb-8">
      <h3 className="text-2xl font-semibold text-indigo-900 mb-4">Projects Dashboard</h3>
      <p className="text-xl text-indigo-800">
        Total Projects: <strong>{count}</strong>
      </p>
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
    </Card>
  );
}

ProjectCount.propTypes = {
  count: PropTypes.number.isRequired,
  error: PropTypes.string,
};

export default ProjectCount;