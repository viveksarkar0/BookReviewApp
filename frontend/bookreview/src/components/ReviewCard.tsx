import { deleteReview, updateReview } from '@/services/reviewService';
import React, { useState } from 'react';

interface ReviewCardProps {
  id: number;
  reviewerName: string;
  rating: number;
  content: string;
  date: string;
  isOwner: boolean;
  onDeleteSuccess?: (id: number) => void;
  onUpdateSuccess?: (id: number, updatedReview: { content: string; rating: number }) => void; // Added prop for updating review
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  reviewerName,
  rating,
  content,
  date,
  isOwner,
  onDeleteSuccess,
  onUpdateSuccess, // New prop for updating review
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedRating, setEditedRating] = useState(rating);

  const handleDelete = async () => {
    try {
      await deleteReview(id);
      if (onDeleteSuccess) {
        onDeleteSuccess(id); // Notify parent component about the deletion
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedReview = { content: editedContent, rating: editedRating };
      await updateReview(id, updatedReview);
      if (onUpdateSuccess) {
        onUpdateSuccess(id, updatedReview); // Notify parent component about the update
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update review:', error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      {isEditing ? (
        <div>
          <textarea
            className="w-full border border-gray-300 rounded p-2 mb-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2 mb-2"
            min={1}
            max={5}
            value={editedRating}
            onChange={(e) => setEditedRating(Number(e.target.value))}
          />
          <button
            onClick={handleUpdate}
            className="text-green-500 hover:underline mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-red-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-lg">{reviewerName}</div>
            <div className="text-yellow-500">
              {Array.from({ length: rating }, (_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-2">{content}</p>
          <div className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</div>
          {isOwner && (
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:underline"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
