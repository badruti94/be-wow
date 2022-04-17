const express = require('express')
const router = express.Router()

const {
    authAdmin,
    auth
} = require('../middleware/auth')
const {
    uploadFileEpub,
    uploadFile,
    uploadProfilePhoto,
    uploadFileEpubUpdate
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
    deleteUser,
    getProfile,
    updateProfile,
    getFavorites,
    addFavorite,
    isFavorite,
    deleteFavorite
} = require('../controllers/user')
const {
    addTransaction,
    updateTransaction,
    getTransaction,
    getTransactions,
    isSubcribed
} = require('../controllers/transaction')

router.post('/login', login)
router.post('/register', register)

router.get('/users', getUsers)
router.delete('/user/:id_user', authAdmin, deleteUser)
router.get('/user/:userId/profile', getProfile)
router.put('/user/:userId/profile', uploadProfilePhoto("photo"), updateProfile)
router.get('/user/:userId/favorite', getFavorites)
router.post('/user/:userId/favorite', addFavorite)
router.get('/user/:userId/favorite/:bookId', isFavorite)
router.delete('/user/favorite/:userId/:bookId', deleteFavorite)

router.get('/books', getBooks)
router.get('/book/:bookId', getBook)
router.post('/book', authAdmin, uploadFileEpub("bookFile", "cover"), addBook)
router.put('/book/:bookId', authAdmin, uploadFileEpubUpdate("bookFile", "cover"), updateBook)
router.delete('/book/:bookId', authAdmin, deleteBook)

router.post('/transaction', auth, uploadFile("transferProof"), addTransaction)
router.get('/transaction', getTransactions)
router.patch('/transaction/:id', authAdmin, updateTransaction)
router.get('/transaction/:id', getTransaction)
router.get('/is-subcribed/:userId', isSubcribed)

module.exports = router