const express = require('express')
const router = express.Router()
const { v4: folderId } = require('uuid');

const { UserModel } = require('../models/User')
const { FolderModel } = require('../models/Folder')

router.post('/auth', async (req, res) => {
    try {
        const ifUser = await UserModel.findOne({ uid: req.body.uid })
        if (!ifUser) {
            const folderiduid = folderId()
            const newfolder = new FolderModel({
                Folderid: folderiduid,
                Name: 'My Drive',
                uid: req.body.uid
            })
            await newfolder.save()
            const newuser = new UserModel({
                uid: req.body.uid,
                image: req.body.img,
                mainFolder: folderiduid
            })
            await newuser.save()
            return res.status(200).send({ mainFolder: folderiduid })
        }
        res.status(200).send({ mainFolder: ifUser.mainFolder })
    } catch (err) {
        res.status(400)
    }
})

module.exports = router