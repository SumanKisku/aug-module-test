const Book = require("../../models/bookSchema");

const addBook = async (req, res) => {
    const { title, author, price, category } = req.body;
    try {
        if (!title || !author || !price || !category) {
            return res.send({
                status: 400,
                message: "Please fill in all the details of the book",
                code: "bookDetailsMissing"
            })
        }

        const book = new Book({
            title: title,
            author: author,
            price: price,
            category: category,
            userId: req.session.user.username
        })

        try {
            const bookDb = await book.save();

            return res.send({
                status: 200,
                message: "Book created successfully",
            })
        } catch (error) {
            return res.send({
                status: 500,
                message: "Database error",
                data: error
            })
        }



    } catch (error) {
        return res.send({
            stauts: 400,
            message: "Adding book failed",
            error: error,
        })
    }
}

module.exports = addBook;