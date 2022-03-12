const {
    user
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
        const id = await user.destroy({
            where: {
                id: req.params.id_user
            }
        })

        res.send({
            status: 'success',
            data: {
                id
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })

    }
}