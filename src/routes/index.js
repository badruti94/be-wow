const express = require('express')
const router = express.Router()

const {
    authAdmin
} = require('../middleware/auth')
const {
    uploadFileEpub
} = require('../middleware/uploadFile')

const {
    login,
    register
} = require('../controllers/auth')
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/book')
const {
    getUsers,
    deleteUser
} = require('../controllers/user')

router.post('/login', login)
router.post('/register', register)

router.get('/users', getUsers)
router.delete('/user/:id_user', deleteUser)

router.get('/books', getBooks)
router.get('/book/:bookId', getBook)
router.post('/book', authAdmin, uploadFileEpub("bookFile"), addBook)
router.put('/book/:bookId', authAdmin, updateBook)
router.delete('/book/:bookId', authAdmin, deleteBook)

module.exports = router