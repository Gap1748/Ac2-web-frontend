let clientes = [
    {
        id: "1",
        nome: "Sla quem",
        idade: 28,
        cidade: "São Paulo",
        pedidos: [
            { codigo: "P001", produto: "Mouse Gamer", quantidade: 1 },
            { codigo: "P002", produto: "Teclado Mecânico", quantidade: 5 }
        ]
    },
    {
        id: "2",
        nome: "Ricardo Oliveira",
        idade: 42,
        cidade: "Rio de Janeiro",
        pedidos: [
            { codigo: "P003", produto: "Monitor 24\"", quantidade: 2 }
        ]
    },
    {
        id: "3",
        nome: "Gabriel Augusto",
        idade: 22,
        cidade: "Sorocaba",
        pedidos: []
    }
];


// 1. GET /clientes , como o nome sugere, vai listar todos os clientes
const listarClientes = (req, res) => {
    return res.json(clientes);
};

// 2. GET /clientes/id , vai buscar um cliente pelo id , testar se dois clientes com mesmo id da erro
const buscarClientePorId = (req, res) => {
    const { id } = req.params; // pega o ID enviado na URL
    const cliente = clientes.find(c => c.id === id);// vai procurar o id no array

    return res.json(cliente);
};

// 3. GET /clientes/id/pedidos , vai listar os pedidos de um cliente
const listarPedidosCliente = (req, res) => {
    const { id } = req.params;
    const cliente = clientes.find(c => c.id === id);

    // Retorna a lista de pedidos do cliente
    return res.json(cliente.pedidos);
};

// 4. PUT /clientes/id , vai atualizar os dados de um cliente
const atualizarCliente = (req, res) => {
    const { id } = req.params;
    const { nome, idade, cidade } = req.body; // novos dados enviados no corpo da requisição
    const cliente = clientes.find(c => c.id === id);

    if (!cliente) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    // só atualiza os campos se eles realmente forem atualizados , não sei se pode dar problema com js.
    if (nome) cliente.nome = nome;
    if (idade) cliente.idade = idade;
    if (cidade) cliente.cidade = cidade;

    return res.json({
        mensagem: "Cliente atualizado!",
        cliente
    });
};

// 5. POST /clientes/id/pedidos , vai adicionar um pedido a um cliente
const adicionarPedido = (req, res) => {
    const { id } = req.params;
    const { codigo, produto, quantidade } = req.body; // dados do novo pedido

    const cliente = clientes.find(c => c.id === id);

    if (!cliente) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }
  
    const novoPedido = { codigo, produto, quantidade };

    // Adiciona o pedido no array
    cliente.pedidos.push(novoPedido);

    return res.json({
        mensagem: "Pedido adicionado com sucesso!",
        cliente
    });
};

// 6. GET /clientes/cidade/:cidade , vai listar os clientes de uma determinada cidade
const listarClientesPorCidade = (req, res) => {
    const { cidade } = req.params;

    // Filtra os clientes da cidade infirmada , deixei 
    // ignorando se é maiuscula ou miniscula , mas isso provavelmente não vai ser usado
    const clientesFiltrados = clientes.filter(
        c => c.cidade.toLowerCase() === cidade.toLowerCase()
    );

    return res.json(clientesFiltrados);
};

// 7. DELETE /clientes/id , acredito que o nome ja diz o que faz.
const removerCliente = (req, res) => {
    const { id } = req.params;
    const index = clientes.findIndex(c => c.id === id);
 
    // remove o cliente do array usando splice
    clientes.splice(index, 1);

    return res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
};

module.exports = {
    listarClientes,
    buscarClientePorId,
    listarPedidosCliente,
    atualizarCliente,
    adicionarPedido,
    listarClientesPorCidade,
    removerCliente
};