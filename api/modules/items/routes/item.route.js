const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/item.controller');

router.post('/item/save', ItemController.saveItem);
router.patch('/item/update/:id', ItemController.updateItem);
router.delete('/item/delete/:id', ItemController.deleteItem);

router.get('/item/get', ItemController.getItems);
router.get('/item/getById/:id', ItemController.getItemById);

module.exports = router;