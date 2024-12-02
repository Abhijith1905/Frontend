import React from 'react';
import PropTypes from 'prop-types';

function MediaModal({ mediaUrl, mediaType, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        {mediaType.includes('image') ? (
          <img
            src={mediaUrl}
            alt="Media"
            className="w-full h-auto rounded-lg"
          />
        ) : (
          <iframe
            src={mediaUrl}
            className="w-full h-[70vh] rounded-lg"
            title="Document Viewer"
          />
        )}
        
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

MediaModal.propTypes = {
  mediaUrl: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MediaModal;