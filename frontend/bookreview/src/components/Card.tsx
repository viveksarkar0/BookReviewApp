import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteBook } from "@/services/bookService";
import { useEffect, useState } from "react";
// Import the BookCard component
 // Import a Modal component (you can use any UI library like Tailwind, Material-UI, or Headless UI)
import { BookCard } from "./AddEditCard";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";

export const Cards = ({
  title,
  author,
  isbn,
  genre,
  rating,
  image,
  bookId,
  owner,
}: {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  rating?: any;
  image?: any;
  bookId: any;
  owner: boolean;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
const navigate =useNavigate()
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteBook(bookId);
      window.location.reload();  
      alert("Book deleted successfully");
      setIsDeleting(false);
    } catch (error) {
      console.error("Failed to delete the book", error);
      setIsDeleting(false);
      alert("Error deleting the book. Please try again.");
    }
  };



  const handleOpenModal = (newMode: "create" | "update") => {
    setMode(newMode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="w-[300px] lg:w-[350px] rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-500 italic">No Image Available</span>
          )}
        </div>
        <CardHeader className="p-4 bg-gray-50">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            by {author}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">ISBN:</span> {isbn}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">Genre:</span> {genre}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">Rating:</span>{" "}
              {rating}/5
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md text-sm"
          onClick={() => navigate(`/book/${bookId}`)}
        >
          View Details
        </Button>
          {owner && (
            <>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md text-sm"
                onClick={() => handleOpenModal("update")}
              >
                Update
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 transition-colors px-4 py-2 rounded-md text-sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <BookCard
            mode={mode}
            initialData={
              mode === "update"
                ? { bookId, title, author, isbn, genre, coverImage: image }
                : undefined
            }
            onClose={handleCloseModal} // Optional callback to close modal after operation
          />
        </Modal>
      )}
    </>
  );
};
