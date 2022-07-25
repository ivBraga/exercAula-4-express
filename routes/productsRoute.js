const express = require('express');

const router = express.Router();

let productsList = require('../products');

router.get('/products', (_req, res) => res.status(200).json(productsList));

router.get('/products/:id/', (req, res) => {
	const { id } = req.params;
	const filteredId = productsList.filter((produto) => Number(id) === produto.id);
	if (filteredId) {
		return res.status(200).json(filteredId);
	}
	return res.status(400).json({ message: 'Product not found' });
});

router.post('/products', (req, res) => {
	const content = req.body;
	productsList = [...productsList, content];
	return res.status(201).json(productsList);
});

router.put('/products/:id', (req, res) => {
	const { id } = req.params;
	const content = req.body;
	const filteredProduct = productsList.find((produto) => produto.id === Number(id));
	if (!filteredProduct) return res.status(400).json({ message: 'Product not found' });

	const updatedProduct = productsList.map((produto) => {
		if (produto.id === Number(id)) return content;
		return produto;
	});
	console.log(updatedProduct);

	productsList = updatedProduct;
	return res.status(200).json(productsList);
});

router.delete('/products/:id', (req, res) => {
	const { id } = req.params;
	const filteredProduct = productsList.find((produto) => produto.id === Number(id));
	if (!filteredProduct) return res.status(400).json({ message: 'Product not found' });
	const deletedProduct = productsList.filter((produto) => produto.id !== Number(id));
	return res.status(200).json(deletedProduct);
});

module.exports = router;