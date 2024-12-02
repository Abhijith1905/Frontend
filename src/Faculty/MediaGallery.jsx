import React from 'react';
import { FileText, Image as ImageIcon } from 'lucide-react';

const MediaGallery = ({ mediaList, mediaUrls, onMediaClick }) => {
  const imageMedia = mediaList.filter(item => item.mediaType.includes('image'));
  const documentMedia = mediaList.filter(item => 
    item.mediaType === 'pdf' || item.mediaType.includes('text')
  );

  const MediaCard = ({ mediaItem, type }) => {
    const mediaUrl = mediaUrls[mediaItem.mediaId]?.mediaUrl;
    if (!mediaUrl) return null;

    return (
      <div
        key={mediaItem.mediaId}
        className="relative group cursor-pointer"
        onClick={() => onMediaClick(mediaUrl, mediaItem.mediaType)}
      >
        {type === 'image' ? (
          <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={mediaUrl}
              alt="Project Media"
              className="object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ImageIcon className="h-8 w-8 text-white" />
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {mediaItem.mediaType === 'pdf' ? 'PDF Document' : 'Text Document'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {imageMedia.length > 0 && (
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Project Images
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {imageMedia.map(mediaItem => (
                <MediaCard key={mediaItem.mediaId} mediaItem={mediaItem} type="image" />
              ))}
            </div>
          </div>
        </div>
      )}

      {documentMedia.length > 0 && (
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Project Documents
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {documentMedia.map(mediaItem => (
                <MediaCard key={mediaItem.mediaId} mediaItem={mediaItem} type="document" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;