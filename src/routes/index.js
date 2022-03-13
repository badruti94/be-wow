const express = require('express')
const router = express.Router()

const {
    authAdmin,
    auth
} = require('../middleware/auth')
const {
    uploadFileEpub,
    uploadFile
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
const {
    addTransaction,
    updateTransaction,
    getTransaction,
    getTransactions
} = require('../controllers/transaction')

router.post('/login', login)
router.post('/register', register)

router.get('/users', getUsers)
router.delete('/user/:id_user', deleteUser)

router.get('/books', getBooks)
router.get('/book/:bookId', getBook)
router.post('/book', authAdmin, uploadFileEpub("bookFile"), addBook)
router.put('/book/:bookId', authAdmin, updateBook)
router.delete('/book/:bookId', authAdmin, deleteBook)

router.post('/transaction', auth, uploadFile("transferProof"), addTransaction)
router.patch('/transaction/:id', auth, updateTransaction)
router.get('/transaction/:id', getTransaction)
router.get('/transaction', getTransactions)

module.exports = router