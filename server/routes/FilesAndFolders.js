const router = require('express').Router();
const { FolderModel } = require('../models/Folder')
const { FileModel } = require('../models/File')
const { v4: folderId } = require('uuid');

router.post('/addfolder', async (req, res) => {
    const { folderid, newfoldername, uid } = req.body
    try {
        const findFolder = await FolderModel.findOne({ Folderid: folderid })
        if (!findFolder) return res.status(400)
        const folderiduid = folderId()
        const newFolder = new FolderModel({
            Folderid: folderiduid,
            Name: newfoldername,
            uid: uid
        })
        await newFolder.save()
        await FolderModel.updateOne({ Folderid: folderid }, { $push: { Folders: folderiduid } })
        res.status(200).send({ newFolder: folderiduid });
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/addFile', async (req, res) => {
    const { folderid, filename, storageLink, uid, filetype } = req.body
    try {
        const findFolder = await FolderModel.findOne({ Folderid: folderid })
        if (!findFolder) return res.status(400)
        const newfileid = folderId()
        const newFile = new FileModel({
            filename: filename,
            fileid: newfileid,
            filetype: filetype,
            storageLink: storageLink,
            uid: uid
        })
        await newFile.save()
        await FolderModel.updateOne({ Folderid: folderid }, { $push: { Files: newfileid } })
        res.status(200).send({ newFile: newfileid });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

router.get('/:folderid', async (req, res) => {
    const findFolder = await FolderModel.findOne({ Folderid: req.params.folderid })
    if (!findFolder) return res.status(400)
    const Folders = findFolder.Folders
    const Files = findFolder.Files
    let explorefolder = []
    await Promise.all(Folders.map(async (item) => {
        const texp = await FolderModel.findOne({ Folderid: item }, { Folders: 0, Files: 0, uid: 0 })
        explorefolder.push(texp)
    }))
    let exploreFiles = []
    await Promise.all(Files.map(async (item) => {
        const fexp = await FileModel.findOne({ fileid: item, trash: { $ne: true } })
        exploreFiles.push(fexp)
    }))
    res.send({ folders: explorefolder, files: exploreFiles })
})

router.get('/starred/:uid', async (req, res) => {
    const { uid } = req.params;
    const starred = await FileModel.find({ uid: uid, starred: true, trash: { $ne: true } })
    res.send(starred)
})

router.get('/trash/:uid', async (req, res) => {
    const { uid } = req.params;
    const trash = await FileModel.find({ uid: uid, trash: true })
    res.send(trash)
})

router.get('/recent/:uid', async (req, res) => {
    const { uid } = req.params;
    const recent = await FileModel.find({ uid: uid, trash: { $ne: true } })
    recent.sort((a,b)=>{
        Date.parse(b.timstamp)-Date.parse(a.timstamp)
    })
    res.send(recent)
})

module.exports = router