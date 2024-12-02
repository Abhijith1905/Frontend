import React from 'react';
import PropTypes from 'prop-types';

function ProjectMedia({ mediaUrl, mediaType, onClick }) {
  return (
    <div
      className="m-4 cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      {mediaType.includes('image') ? (
        <img
          src={mediaUrl}
          alt="Project Media"
          className="w-full h-48 object-cover"
        />
      ) : (mediaType === 'pdf' || mediaType.includes('text')) ? (
        <iframe
          src={mediaUrl}
          className="w-full h-48"
          title="Document Preview"
        />
      ) : null}
      
      <div className="p-4 text-center">
        <p className="text-indigo-700 font-medium">
          Click to view {mediaType === 'pdf' ? 'PDF' : mediaType.includes('text') ? 'text' : 'image'}
        </p>
      </div>
    </div>
  );
}

ProjectMedia.propTypes = {
  mediaUrl: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProjectMedia;