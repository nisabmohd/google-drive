const router = require("express").Router();
const { FolderModel } = require("../models/Folder");
const { FileModel } = require("../models/File");
const { v4: folderId } = require("uuid");

router.post("/addfolder", async (req, res) => {
  const { folderid, newfoldername, uid } = req.body;
  try {
    const findFolder = await FolderModel.findOne({ Folderid: folderid });
    if (!findFolder) return res.status(400);
    const folderiduid = folderId();
    const newFolder = new FolderModel({
      Folderid: folderiduid,
      Name: newfoldername,
      uid: uid,
    });
    await newFolder.save();
    await FolderModel.updateOne(
      { Folderid: folderid },
      { $push: { Folders: folderiduid } }
    );
    res.status(200).send({ newFolder: folderiduid });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addFile", async (req, res) => {
  const { folderid, filename, storageLink, uid, filetype } = req.body;
  try {
    const findFolder = await FolderModel.findOne({ Folderid: folderid });
    if (!findFolder) return res.status(400);
    const newfileid = folderId();
    const newFile = new FileModel({
      filename: filename,
      fileid: newfileid,
      filetype: filetype,
      storageLink: storageLink,
      uid: uid,
      parentFolder: folderid,
    });
    await newFile.save();
    await FolderModel.updateOne(
      { Folderid: folderid },
      { $push: { Files: newfileid } }
    );
    res.status(200).send({ newFile: newfileid });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/:folderid", async (req, res) => {
  const findFolder = await FolderModel.findOne({
    Folderid: req.params.folderid,
  }).sort({ _id: 1 });
  if (!findFolder) return res.status(400);
  const Folders = findFolder.Folders;
  const Files = findFolder.Files;
  let explorefolder = [];
  await Promise.all(
    Folders.map(async (item) => {
      const texp = await FolderModel.findOne(
        { Folderid: item },
        { Folders: 0, Files: 0, uid: 0 }
      );
      explorefolder.push(texp);
    })
  );
  let exploreFiles = [];
  await Promise.all(
    Files.map(async (item) => {
      const fexp = await FileModel.findOne({ fileid: item });
      if (fexp.trash !== true) exploreFiles.push(fexp);
    })
  );
  res.send({ folders: explorefolder, files: exploreFiles });
});

router.get("/starred/:uid", async (req, res) => {
  const { uid } = req.params;
  const starred = await FileModel.find({
    uid: uid,
    starred: true,
    trash: { $ne: true },
  });
  res.send(starred);
});

router.get("/trash/:uid", async (req, res) => {
  const { uid } = req.params;
  const trash = await FileModel.find({ uid: uid, trash: true });
  res.send(trash);
});

router.get("/recent/:uid", async (req, res) => {
  const { uid } = req.params;
  const recent = await FileModel.find({ uid: uid, trash: { $ne: true } });
  recent.sort((a, b) => {
    -1 * (Date.parse(b) - Date.parse(a));
  });
  res.send(recent);
});

router.put("/starhandle", async (req, res) => {
  const { fileid, uid } = req.body;
  const fileSearch = await FileModel.findOne({ fileid: fileid });
  if (fileSearch.uid === uid) {
    return res.send(
      await FileModel.updateOne(
        { fileid: fileid },
        { starred: !fileSearch.starred }
      )
    );
  } else {
    return res.status(401).send("Unauthorized");
  }
});

router.put("/trashhandle", async (req, res) => {
  const { fileid, uid } = req.body;
  const fileSearch = await FileModel.findOne({ fileid: fileid });
  if (fileSearch.uid === uid) {
    if (fileSearch.trash == true) {
      await FileModel.deleteOne({ fileid: fileid });
      await FolderModel.updateOne(
        { Folderid: fileSearch.parentFolder },
        { $pull: { Files: fileid } }
      );
    }
    return res.send(
      await FileModel.updateOne({ fileid: fileid }, { trash: true })
    );
  } else {
    return res.status(401).send("Unauthorized");
  }
});

router.post("/search", async (req, res) => {
  const { query } = req.body;
  const files = await FileModel.find({
    filename: { $regex: new RegExp(query.toLowerCase()) },
  });
  const folders = await FolderModel.find({
    Name: { $regex: new RegExp(query.toLowerCase()) },
  });
  res.send({ files, folders });
});

module.exports = router;
