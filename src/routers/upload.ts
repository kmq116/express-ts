import path from 'path'
import fs from 'fs'
import multer from 'multer'
import type { Request } from 'express'
import express from 'express'

interface MulterRequest extends Request {
  file: Express.Multer.File
}

const router = express.Router()

const upload = multer({
  dest: path.join(__dirname, '../../public/uploads'),
})

router.post('/upload', upload.single('file'), async(req, res) => {
  const { file } = req as MulterRequest
  console.error(file)
  const {
    originalname,
    filename,

  } = file
  const extname = path.extname(originalname)
  const filePath = path.join(__dirname, '../../public/uploads/', filename)
  const newFilePath = path.join(__dirname, '../../public/uploads/', `${filename}${extname}`)
  fs.rename(filePath, newFilePath, (err) => {
    if (err) {
      res.json({
        code: -1,
        msg: '上传失败',
      })
    }
    else {
      res.json({
        code: 0,
        msg: '上传成功',
        data: {
          url: `http://${req.hostname}:3000/uploads/${filename}${extname}`,
        },
      })
    }
  })
})

export default router
