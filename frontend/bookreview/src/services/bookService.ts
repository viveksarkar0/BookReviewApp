import api from './api';

// Get all books
export const getBooks = async (queryParams = '') => {
  try {
    const response = await api.get(`/books${queryParams}`);
    return response.data;
  } catch (error:any) {
    console.error("Error fetching books:", error.message);
    throw new Error("Failed to fetch books");
  }
};

// Get a single book by ID
export const getBookById = async (bookId: any) => {
  try {
    const response = await api.get(`/books/books/${bookId}`);
    return response.data;
  } catch (error:any) {
    console.error("Error fetching book by ID:", error.message);
    throw new Error("Failed to fetch book details");
  }
};

// Add a new book
export const addBook = async (bookData: any) => {
  try {
    const response = await api.post('/books', bookData);
    return response;
  } catch (error:any) {
    console.error("Error adding book:", error.message);
    throw new Error("Failed to add book");
  }
};

// Update an existing book
export const updateBook = async (bookId: any, bookData: any) => {
  try {
    const response = await api.put(`/books/${bookId}`, bookData);
    return response.data;
  } catch (error:any) {
    console.error("Error updating book:", error.message);
    throw new Error("Failed to update book");
  }
};

// Delete a book
export const deleteBook = async (bookId: any) => {
  try {
    const response = await api.delete(`/books/${bookId}`);
    return response.data;
  } catch (error:any) {
    console.error("Error deleting book:", error.message);
    throw new Error("Failed to delete book");
  }
};
