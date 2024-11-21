import { Cards } from "@/components/Card";
import { useEffect, useState } from "react";
import { getBooks } from "@/services/bookService";
import { Provider } from "@/components/Provider";
import { decodeJwt } from "@/hooks/decoder";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Home = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [genreFilter, setGenreFilter] = useState<string>("All");
  const [sortCriteria, setSortCriteria] = useState<string>("title");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const booksPerPage = 6;
  const recommendationsPerPage = 3;
  const [recommendationPage, setRecommendationPage] = useState(1);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
    setCurrentPage(1); // Reset pagination on filter or search change
  }, [books, genreFilter, sortCriteria, searchTerm]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksData = await getBooks();
      setBooks(booksData);
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to fetch books:", error.message);
      setLoading(false);
    }
  };

  const calculateAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  const applyFiltersAndSorting = () => {
    let updatedBooks = [...books];

    // Filter by genre
    if (genreFilter !== "All") {
      updatedBooks = updatedBooks.filter((book) => book.genre === genreFilter);
    }

    // Filter by search term
    if (searchTerm) {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.includes(searchTerm)
      );
    }

    // Sort books
    updatedBooks.sort((a, b) => {
      if (sortCriteria === "rating") {
        const ratingA = calculateAverageRating(a.reviews);
        const ratingB = calculateAverageRating(b.reviews);
        return ratingB - ratingA;
      }
      return a[sortCriteria].localeCompare(b[sortCriteria]);
    });

    setFilteredBooks(updatedBooks);
  };

  const handlePagination = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);
  
    // Ensure at least 3 books are displayed on the last page
    if (paginatedBooks.length < 3 && filteredBooks.length > 0) {
      return filteredBooks.slice(-3);
    }
    return paginatedBooks;
  };

  const getRecommendations = (book: any) => {
    return books.filter(
      (b) =>
        b.id !== book.id &&
        (b.genre === book.genre || b.author === book.author)
    );
  };


  // Remove duplicate recommendations in all books (to display unique recommendations only)
  const getAllRecommendations = () => {
    const allRecommendations = new Set();
    return books.reduce((acc: any[], book: any) => {
      const recommendations = getRecommendations(book);
      recommendations.forEach((rec: any) => {
        if (!allRecommendations.has(rec.id)) {
          acc.push(rec);
          allRecommendations.add(rec.id);
        }
      });
      return acc;
    }, []);
  };
  const getPaginatedRecommendations = () => {
    const allRecommendations = getAllRecommendations();
    const startIndex = (recommendationPage - 1) * recommendationsPerPage;
    return allRecommendations.slice(startIndex, startIndex + recommendationsPerPage);
  };
  
  

  return (
    <Provider>
      <main className="p-6 space-y-6">
        {/* Search */}
        <div className="flex justify-between items-center gap-4">
          <Input
            placeholder="Search by title, author, or ISBN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setGenreFilter("All");
            setSortCriteria("title");
          }}>
            Clear Filters and Search
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <Select onValueChange={setGenreFilter} defaultValue="All">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Genres</SelectItem>
              <SelectItem value="Fiction">Fiction</SelectItem>
              <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSortCriteria} defaultValue="title">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

      
{/* Recommendations Section */}
<div className="mt-6">
          <h4 className="font-semibold text-3xl">You might also like:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-20">
            {getPaginatedRecommendations().map((recBook) => (
              <Cards
                key={recBook.id}
                title={recBook.title}
                author={recBook.author}
                isbn={recBook.isbn}
                genre={recBook.genre}
                rating={calculateAverageRating(recBook.reviews)}
                image={recBook.coverImage}
                bookId={recBook.id}
                owner={userId === recBook.userId}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4">
            {/* Previous Button */}
            {recommendationPage > 1 && (
              <Button
                variant="outline"
                onClick={() => setRecommendationPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
            )}

            {/* Next Button */}
            {getAllRecommendations().length > recommendationPage * recommendationsPerPage && (
              <Button
                variant="outline"
                onClick={() => setRecommendationPage((prev) => prev + 1)}
              >
                Load More
              </Button>
            )}
          </div>
        </div>

        {/* Book Cards */}
        <div className="mt-6">
        <h4 className="font-semibold text-3xl">Books:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-20">
       
          {filteredBooks.length > 0 ? (
            handlePagination().map((book) => (
              <div key={book.id}>
                
                <Cards
                  title={book.title}
                  author={book.author}
                  isbn={book.isbn}
                  genre={book.genre}
                  rating={calculateAverageRating(book.reviews)}
                  image={book.coverImage}
                  bookId={book.id}
                  owner={userId === book.userId}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No books found.</p>
          )}
        </div>
        </div>

        {/* Pagination */}
        {!loading && filteredBooks.length > 0 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {currentPage} of {Math.max(1, Math.ceil(filteredBooks.length / booksPerPage))}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(filteredBooks.length / booksPerPage) ? prev + 1 : prev
                )
              }
              disabled={currentPage >= Math.ceil(filteredBooks.length / booksPerPage)}
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </Provider>
  );
};

