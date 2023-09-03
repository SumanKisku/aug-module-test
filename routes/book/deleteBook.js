const Book = require("../../models/bookSchema");

const deleteBook = async (req, res) => {
    let {bookId} = req.body;
    try {
        const bookDb = await Book.findOneAndDelete({ _id: bookId });
        return res.send({
            status: 200,
            message: "Book deleted successfully",
            data: bookDb
        })
    } catch(error) {
        return res.send({
            status: 400,
            message: "Something went wrong",
            error: error,
        })
    }
}

module.exports = deleteBook;