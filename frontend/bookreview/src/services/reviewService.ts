import api from './api';

// Get reviews for a book
export const getReviewsByBook = async (bookId: any) => {
  const response = await api.get(`/books/${bookId}/reviews`);
  return response.data;
};

// Add a review for a book
export const addReview = async (reviewData: any) => {
  const response = await api.post(`/reviews`, reviewData);
  return response.data;
};

// Update a review
export const updateReview = async (reviewId: any, reviewData: any) => {
  const response = await api.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

// Delete a review
export const deleteReview = async (reviewId: any) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};
