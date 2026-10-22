const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');//importar as funções do controller

router.get('/', clienteController.listarClientes);
router.get('/cidade/:cidade', clienteController.listarClientesPorCidade);
router.get('/:id', clienteController.buscarClientePorId);
router.get('/:id/pedidos', clienteController.listarPedidosCliente);
router.put('/:id', clienteController.atualizarCliente);
router.post('/:id/pedidos', clienteController.adicionarPedido);
router.delete('/:id', clienteController.removerCliente);

module.exports = exports = router;