const {
    user,
    profile,
    favorite,
    book
} = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            where: {
                role: 'user'
            },
            attributes: ['id', ['name', 'fullName'], 'email']
        })

        res.send({
            status: 'success',
            data: {
                users
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await user.destroy({
            where: {
                id: req.params.id_user
            }
        })

        res.send({
            status: 'success',
            data: {
                id: parseInt(req.params.id_user)
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })

    }
}

exports.getProfile = async (req, res) => {
    try {
        const data = await profile.findOne({
            where: {
                userId: req.params.userId
            },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                profile: data
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const profileExist = await profile.findOne({
            where: {
                userId: req.params.userId
            }
        })
        if (req.file) {
            req.body.photo = req.file.filename
        }
        if (!profileExist) {
            await profile.create({
                ...req.body,
                userId: req.params.userId
            })
        } else {
            await profile.update(req.body, {
                where: {
                    userId: req.params.userId
                }
            })
        }

        res.send({
            status: 'success'
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await favorite.findAll({
            include: {
                model: book,
                as: 'book',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            where: {
                userId: req.params.userId
            },
            attributes: ['id']
        })
        res.send({
            status: 'success',
            data: {
                favorites
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: error
        })
    }
}

exports.addFavorite = async (req, res) => {
    try {
        await favorite.create({
            ...req.body,
            userId: req.params.userId
        })
        res.send({
            status: 'success'
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.isFavorite = async (req, res) => {
    try {
        const data = await favorite.findOne({
            where: {
                userId: req.params.userId,
                bookId: req.params.bookId
            }
        })

        if (!data) {
            return res.send({
                status: 'success',
                data: false
            })
        }

        res.send({
            status: 'success',
            data: true
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        await favorite.destroy({
            where: {
                userId: req.params.userId,
                bookId: req.params.bookId
            }
        })

        res.send({
            status: 'success'
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}