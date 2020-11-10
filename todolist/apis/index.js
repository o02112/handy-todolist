const { Router } = require('express')
const router = Router()
const {
  insertItem,
  updateItem,
  deleteItem,
  listItem,
  toggleItem,
} = require('./mongoDB'); // postgreSQL, mongoDB


router.post('/listItem', (req, res) => {

  listItem((err, response) => {
    if(err) {
      res.status(500).json({ err: true, msg: '列表加载失败' })
      return
    }

    res.json({ err, data: response.data });
  })
})


router.post('/addItem', (req, res) => {
  const title = req.body.title || ''
  if(!title) {
    res.status(406).json({ err: true, msg: '添加的项标题不能为空' })
    return
  }

  insertItem(title, (err, response) => {
    console.log(err, response)
    res.status(200).json({ err, data: { rowCount: response.rowCount }})
  })
})


router.post('/updateItem', (req, res) => {
  const { title = '', itemId = 0 } = req.body;
  if(!title) {
    res.status(406).json({ err: true, msg: '更新的项标题不能为空' })
    return
  } else if(!itemId) {
    res.status(406).json({ err: true, msg: '更新失败' })
    return
  }

  updateItem({ title, itemId }, (err, response) => {
    console.log(err, response)
    res.status(200).json({ err, data: { rowCount: response.rowCount }})
  })
})


router.post('/finishItem', (req, res) => {
  const { itemId = 0 } = req.body;

  toggleItem({ itemId }, (err, response) => {
    console.log(err, response)
    res.json({ err, data: { rowCount: response.rowCount }})
  })

})


router.post('/deleteItem', (req, res) => {
  const { itemId = 0 } = req.body;

  deleteItem(itemId , (err, response) => {
    console.log(err, response)
    res.status(200).json({ err, data: { rowCount: response.rowCount }})
  })
})



module.exports = router;
