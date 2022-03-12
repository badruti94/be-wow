const multer = require('multer')

exports.uploadFile = (imageFile) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ""))
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.fieldname == imageFile) {
            if (!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG)$/)) {
                req.fileValidationError = {
                    message: 'only image file are allowed'
                }
                return cb(new Error('only image file are allowed'), false)
            }
        }
        cb(null, true)
    }

    const sizeInMB = 10
    const maxSize = sizeInMB * 1000 * 1000

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fieldSize: maxSize
        }
    }).single(imageFile)

    return (req, res, next) => {
        upload(req, res, (err) => {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError)
            }

            if (!req.file && !err) {
                return res.status(400).send({
                    message: 'Please select file to upload'
                })
            }

            if (err) {
                if (err.code == 'LIMIT_FILE_SIZE') {
                    return res.status(400).send({
                        message: 'Max file size 10 MB'
                    })
                }
                return res.status(400).send(err)
            }

            return next()
        })
    }


}



exports.uploadFileEpub = (epubFile) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ""))
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.fieldname == epubFile) {
            if (!file.originalname.match(/\.(epub|EPUB)$/)) {
                req.fileValidationError = {
                    message: 'only epub file are allowed'
                }
                return cb(new Error('only epub file are allowed'), false)
            }
        }
        cb(null, true)
    }

    const sizeInMB = 100
    const maxSize = sizeInMB * 1000 * 1000

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fieldSize: maxSize
        }
    }).single(epubFile)

    return (req, res, next) => {
        upload(req, res, (err) => {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError)
            }

            if (!req.file && !err) {
                return res.status(400).send({
                    message: 'Please select file to upload'
                })
            }

            if (err) {
                if (err.code == 'LIMIT_FILE_SIZE') {
                    return res.status(400).send({
                        message: 'Max file size 100 MB'
                    })
                }
                return res.status(400).send(err)
            }

            return next()
        })
    }


}