import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Cards } from "@/components/Card";
import { getBookById } from "@/services/bookService"; // Import the getBookById API function
import { ReviewCard } from "@/components/ReviewCard"; // Assuming you have a ReviewCard component for displaying reviews
import { addReview } from "@/services/reviewService";
import { Provider } from "@/components/Provider";
import { decodeJwt } from "@/hooks/decoder";

// interface JwtPayload {
//   id: string; // Change to `id` from `userId`
//   exp: number; // Token expiration time
// }
export const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null); // State to store book details
  const [reviews, setReviews] = useState<any[]>([]); // State to store reviews
  const [newReviewContent, setNewReviewContent] = useState<string>(""); // State for new review content input
  const [newRating, setNewRating] = useState<number>(0); // State for new review rating
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId,setUserId] = useState<string>(""); // Assuming a static userId, replace with actual logic for logged-in user

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("JWT Token:", token); // Log the token to ensure it's present
    if (token) {
      try {
        const decoded = decodeJwt(token); // Decode the JWT manually
        setUserId(decoded.id); // Assuming `id` is the user ID in the payload
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.log("No token found in localStorage.");
    }
  }, []);
  const handleDeleteSuccess = (id: number) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };

  const handleUpdateSuccess = (id: number, updatedReview: { content: string; rating: number }) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, content: updatedReview.content, rating: updatedReview.rating } : review
      )
    );
  };
  
  // Fetch book details and reviews
  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookData = await getBookById(id); // Fetch book by id
      setBook(bookData);
      setReviews(bookData.reviews || []); // Set reviews from book data
    } catch (error: any) {
      setError("Failed to fetch book details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Use `useEffect` to fetch book details when the bookId changes
  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);


  const handleAddReview = async () => {
  if (!newReviewContent || newRating === 0) {
    alert("Please enter a review and rating.");
    return;
  }

  const reviewData = {
    bookId: id, // The current book's ID
    rating: newRating, // Rating provided by the user
    userId: userId, // User ID (use dynamic userId in a real app)
    content: newReviewContent, // Review content
  };

  try {
    // Assuming `addReview` is an API function that adds a review to the book
    const addedReview = await addReview(reviewData);
    
    // Update reviews by adding the new review to the current list
    setReviews((prevReviews) => [...prevReviews, addedReview]); 

    // Clear the review content and reset rating
    setNewReviewContent(""); 
    setNewRating(0);
  } catch (error: any) {
    console.error("Failed to add review:", error);
    setError("Failed to add review");
  }
};




  // Loading and error handling
  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>No book found.</p>;
  }

  return (
    <Provider>
    <div className="p-6">
  
      <Cards
          key={book.id}
          title={book.title}
          author={book.author}
          isbn={book.isbn}
          genre={book.genre}
          rating={book.rating || 0}
          image={book.coverImage}
          bookId={book.id} owner={false}      />

      <div>
        <h2 className="text-2xl mt-8">Reviews</h2>
        <div className="space-y-4 mt-4">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              
            
              <ReviewCard 
              
                key={review.id}
                reviewerName={review.userName} // assuming reviewer name is stored in `userName`
                rating={review.rating}
                content={review.content}
                date={review.createdAt} 
                isOwner={userId === review.userId}
                // Compare userId to determine ownership
                id={review.id} //
                onDeleteSuccess={handleDeleteSuccess}
                onUpdateSuccess={handleUpdateSuccess}
      
                />
              
            ))
            
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-xl">Add a Review</h3>
          <div className="mt-2">
            <label htmlFor="rating" className="text-lg">
              Rating:
            </label>
            <select
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            >
              <option value={0}>Select rating</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div className="mt-4">
            <textarea
              value={newReviewContent}
              onChange={(e) => setNewReviewContent(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
              placeholder="Write your review here..."
              rows={4}
            />
          </div>

          <button
            onClick={handleAddReview}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
    </Provider>
  );
};
