const Book = require("../../models/bookSchema");

const bookList = async (req, res) => {
    let username = req.session.user.username;
    console.log(username);
    try {
        const books = await Book.find({ userId: username })
        return res.send({
            status: 200,
            message: "Read book successful",
            books: books
        })
    }
    catch (error) {
        return res.send({
            status: 400,
            message: "Something went wrong, reading books",
            error: error
        })
    }
}

module.exports = bookList