const {
    transaction,
    user
} = require('../../models')

const getDistance = (startDate, endDate) => {
    const distance = new Date(startDate) - new Date(endDate);

    const miliseconds = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const secondsInHour = secondsInMinute * minutesInHour;
    const hoursInDay = 24;
    const secondsInDay = secondsInHour * hoursInDay;

    const dayDistance = distance / (miliseconds * secondsInDay)
    return Math.floor(dayDistance)
}

const dataFormat = data => {
    let remainingStatus = getDistance(data.expiredDate, new Date().toISOString().split('T')[0])
    remainingStatus = remainingStatus > 0 ? remainingStatus : 0

    return {
        id: data.id,
        users: data.user,
        transferProof: data.transferProof,
        remainingStatus,
        userStatus: remainingStatus > 0 ? 'Active' : 'Not Active',
        paymentStatus: data.paymentStatus
    }
}

exports.addTransaction = async (req, res) => {
    try {
        let data = await transaction.create({
            ...req.body,
            transferProof: req.file.filename
        })
        data = await transaction.findOne({
            where: {
                id: data.id
            },
            include: {
                model: user,
                as: 'user',
                attributes: ['id', 'name']
            },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        })

        data = dataFormat(data)

        res.send({
            status: 'success',
            data: {
                transaction: data
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateTransaction = async (req, res) => {
    try {
        let expiredDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        expiredDate = expiredDate.toISOString().split('T')[0]

        let dataUpdate
        if (req.body.paymentStatus == 'Approved') {
            dataUpdate = {
                ...req.body,
                expiredDate
            }
        } else {
            dataUpdate = req.body
        }

        let data = await transaction.update(dataUpdate, {
            where: {
                id: req.params.id
            }
        })

        data = await transaction.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: user,
                as: 'user',
                attributes: ['id', 'name']
            },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        })

        data = dataFormat(data)

        res.send({
            status: 'success',
            data: {
                transaction: data
            }
        })


    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransaction = async (req, res) => {
    try {
        data = await transaction.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: user,
                as: 'user',
                attributes: ['id', 'name']
            },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        })

        data = dataFormat(data)

        res.send({
            status: 'success',
            data: {
                transaction: data
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransactions = async (req, res) => {
    try {
        let transactions = await transaction.findAll({
            include: {
                model: user,
                as: 'user',
                attributes: ['id', 'name']
            },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        })


        transactions = transactions.map(data => {
            return dataFormat(data)
        })

        res.send({
            status: 'success',
            data: {
                transactions
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.isSubcribed = async (req, res) => {
    try {
        let data = await transaction.findOne({
            where: {
                userId: req.params.userId
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        if (!data) {
            return res.send({
                status: 'success',
                data: {
                    isSubcribed: false
                }
            })
        }
        data = dataFormat(data)
        data = data.userStatus == 'Active' ? true : false
        res.send({
            status: 'success',
            data: {
                isSubcribed: data
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}