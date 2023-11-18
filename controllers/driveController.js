const folderModel = require('../models/folder')
const getAllFolder = async (req, res) => {
    try {
        const { userId } = req.body
        let folders = await folderModel.find({ user: userId })
            .populate({
                path: 'parent'
            })
        return res.status(200).json(folders)
    } catch (e) {
        console.log(e)
        return res.status(500).send('Server error')
    }
}
const createFolder = async (req, res) => {
    try {
        const { name, parentId, userId, path } = req.body
        await folderModel.create({
            name: name,
            parent: parentId,
            user: userId,
            dateCreate: Date.now(),
            size: '',
            type: 'folder',
            path: path
        })
        // let folders = await folderModel.find({ user: userId })
        //     .populate({
        //         path: 'parent'
        //     })
        // return res.status(200).json(folders)
        return res.status(200).send('create folder successfully!')
    } catch (e) {
        console.log(e)
        return res.status(500).send('Server error')
    }
}

const saveFile = async (req, res) => {
    try {
        const { name, parentId, userId, path, size } = req.body
        console.log(size)
        await folderModel.create({
            name: name,
            parent: parentId,
            user: userId,
            dateCreate: Date.now(),
            size: size,
            type: 'file',
            path: path
        })
        return res.status(200).send('Upload file successfully!')
    } catch (e) {
        console.log(e)
        return res.status(500).send('Server error')
    }
}

const deleteFolder = async (req, res) => {
    try {
        let { folderId } = req.body
        await folderModel.deleteOne({ _id: folderId })
        return res.status(200).send('Delete successfully!')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Sever error. please try again')
    }
}

module.exports = {
    getAllFolder, createFolder, saveFile, deleteFolder
}