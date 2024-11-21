import { BookCard } from "@/components/AddEditCard"
import { Provider } from "@/components/Provider"


const AddEditBook = () => {
  return (
    <Provider>
               <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        {/* Add responsive width */}
        <div className="w-screen max-w-lg">
          <BookCard mode="create" />
        </div>
      </div>

    </Provider>
  )
}

export default AddEditBook