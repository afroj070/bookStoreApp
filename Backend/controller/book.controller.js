import Book from "../model/book.model.js";

export const createBook = async(req, res) => {
    try {
        const { name, title, category, prise, image } = req.body;

        console.log("book data", { name, title, category, prise, image });
        const createNewBook = new Book({
            name: name,
            title: title,
            category: category,
            prise: prise,
            image: image
        });
        await createNewBook.save();
        res.status(201).json({
            message: "Book created successfully",
            user: {
                _id: createNewBook._id,
                title: createNewBook.title,
                category: createNewBook.category,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const updateBook = async(req, res) => {
    try {
        const bookId = req.params.id;
        const updatedData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
        
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteBook = async(req, res) => {
    try {
        const bookId = req.params.id;
        const deleteBook = await Book.findByIdAndDelete(bookId);
        
        if (!deleteBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully", book: deleteBook });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};