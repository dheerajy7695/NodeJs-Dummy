const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller');

router.post('/item/save', itemController.saveItem);
router.patch('/item/update/:id', itemController.updateItem);
router.delete('/item/delete/:id', itemController.deleteItem);

router.get('/item/get', itemController.getItems);
router.get('/item/getById/:id', itemController.getItemById);

router.get('/item/serach/:itemName', itemController.searchItem);

router.get('/item/getCount', itemController.getItemCounts);

module.exports = router;