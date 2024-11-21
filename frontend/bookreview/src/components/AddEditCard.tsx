import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addBook, updateBook } from "@/services/bookService";
import { decodeJwt } from "@/hooks/decoder";
import { useToast } from "@/hooks/use-toast";


interface BookCardProps {
  mode: "create" | "update";
  initialData?: {
    bookId: any;
    title: string;
    author: string;
    isbn: string;
    genre: string;
    coverImage: any;
  };
  onClose?: () => void; // To close the modal
}

export function BookCard({ mode, initialData, onClose }: BookCardProps) {
  const { toast } = useToast()
  const [userIdS, setUserId] = useState<string>("");
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    isbn: initialData?.isbn || "",
    genre: initialData?.genre || "",
    coverImage: initialData?.coverImage || "",
    userId: "",
  });

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
    if (userIdS) {
      setFormData((prev) => ({ ...prev, userId: userIdS }));
    }
  }, [userIdS]);

  const handleSaveBook = async () => {
    if (!formData.title || !formData.author || !formData.isbn || !formData.genre || !formData.coverImage) {
      alert("All fields are required");
      return;
    }
  
    try {
      if (mode === "create") {
        const newBook = await addBook(formData);
        if (newBook.status === 201) {
          alert("Book has been added successfully!");
  
          // Clear the form inputs after successful create
          setFormData({
            title: "",
            author: "",
            isbn: "",
            genre: "",
            coverImage: "",
            userId: "",  // Reset userId as well
          });
        }
        console.log("Book added:", newBook);
      } else if (mode === "update" && initialData?.bookId) {
        const updatedBook = await updateBook(initialData.bookId, formData);
        console.log("Book updated:", updatedBook);
      }
  
      // Close modal on success
      if (onClose) onClose();
    } catch (error: any) {
      console.error(`${mode === "create" ? "Add" : "Update"} failed:`, error.message);
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds the 5MB limit. Please choose a smaller file.");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-[350px] mx-auto my-8">
      <CardHeader>
        <CardTitle>{mode === "create" ? "Create Book" : "Update Book"}</CardTitle>
        <CardDescription>
          {mode === "create" ? "Provide details for the new book." : "Update the book details below."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col items-center space-y-4">
          <div className="flex flex-col w-full space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title of your Book"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="flex flex-col w-full space-y-1.5">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Name of your Author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="flex flex-col w-full space-y-1.5">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              placeholder="Enter ISBN"
              value={formData.isbn}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="flex flex-col w-full space-y-1.5">
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              placeholder="Enter the Genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="flex flex-col w-full space-y-1.5">
            <Label htmlFor="coverImage">Upload Cover Image</Label>
            <Input
              type="file"
              id="coverImage"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {formData.coverImage && (
            <div className="flex flex-col w-full space-y-1.5">
              <Label>Preview</Label>
              <img
                src={formData.coverImage}
                alt="Cover Preview"
                className="w-full h-auto rounded-md shadow-md"
              />
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={onClose} // Trigger onClose on Cancel
        >
          Cancel
        </Button>
        <Button onClick={handleSaveBook} className="w-full md:w-auto">
          {mode === "create" ? "Add" : "Update"}
        </Button>
       
      </CardFooter>
    </Card>
  );
}
