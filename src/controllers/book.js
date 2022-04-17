const fs = require('fs')

const {
    book
} = require('../../models')

const getMonthYear = (dateString) => {
    const month = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]

    const date = new Date(dateString)
    return `${month[date.getMonth()]} ${date.getFullYear()}`
}

exports.getBooks = async (req, res) => {
    try {
        let books = await book.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        books = books.map(book => {
            return {
                ...book.dataValues,
                isbn: parseInt(book.dataValues.isbn),
                publicationDate: getMonthYear(book.dataValues.publicationDate)
            }
        })

        res.send({
            status: 'success',
            data: {
                books
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getBook = async (req, res) => {
    try {
        const data = await book.findOne({
            where: {
                id: req.params.bookId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                book: {
                    ...data.dataValues,
                    isbn: parseInt(data.dataValues.isbn),
                    publicationDate: getMonthYear(data.dataValues.publicationDate),
                    publicationDateYmd: data.dataValues.publicationDate,
                }
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addBook = async (req, res) => {
    try {
        let data = await book.create({
            ...req.body,
            bookFile: req.files['bookFile'][0].filename,
            cover: req.files['cover'][0].filename,
        })
        data = {
            id: data.id,
            title: data.title,
            publicationDate: getMonthYear(data.publicationDate),
            pages: parseInt(data.pages),
            author: data.author,
            isbn: parseInt(data.isbn),
            about: data.about,
            bookFile: data.bookFile,
            cover: data.cover
        }

        res.send({
            status: 'success',
            data: {
                book: data
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateBook = async (req, res) => {
    try {
        if (req.files['bookFile']) {
            req.body.bookFile = req.files['bookFile'][0].filename
        }
        if (req.files['cover']) {
            req.body.cover = req.files['cover'][0].filename
        }

        await book.update(req.body, {
            where: {
                id: req.params.bookId
            }
        })

        const data = await book.findOne({
            where: {
                id: req.params.bookId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                book: {
                    ...data.dataValues,
                    isbn: parseInt(data.dataValues.isbn),
                    publicationDate: getMonthYear(data.dataValues.publicationDate)
                }
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const data = await book.findOne({
            where: {
                id: req.params.bookId
            },
            attributes: ['bookFile']
        })

        fs.unlink('uploads/' + data.bookFile, err => {
            if (err) {
                /* return res.status(500).send({
                    status: 'failed',
                    message: err.message
                }) */
            }
        })

        await book.destroy({
            where: {
                id: req.params.bookId
            }
        })

        res.send({
            status: 'success',
            data: {
                id: parseInt(req.params.bookId)
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
            error
        })
    }
}