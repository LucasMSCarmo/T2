import { Component } from "react";
import { Cliente } from "./dados";

type Props = {
    tema: string;
    clientes: Cliente[];
    onClienteSelect: (cliente: Cliente) => void;
}

type ClienteConsumo = {
    cliente: Cliente;
    quantidade: number;
    valor: number;
}

export default class RelatorioTopConsumidores extends Component<Props> {
    render() {
        const { tema, clientes, onClienteSelect } = this.props;

        const consumoProdutos: ClienteConsumo[] = clientes.map(cliente => {
            let quantidadeTotal = 0;
            let valorTotal = 0;
            cliente.pets.forEach(pet => {
                pet.produtosConsumidos.forEach(consumo => {
                    quantidadeTotal += consumo.quantidade;
                    valorTotal += consumo.produto.preco * consumo.quantidade;
                });
            });
            return { cliente, quantidade: quantidadeTotal, valor: valorTotal };
        });
        const top10Produtos = consumoProdutos.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);

        const consumoServicos: ClienteConsumo[] = clientes.map(cliente => {
            let quantidadeTotal = 0;
            let valorTotal = 0;
            cliente.pets.forEach(pet => {
                pet.servicosConsumidos.forEach(consumo => {
                    quantidadeTotal += 1;
                    valorTotal += consumo.servico.preco;
                });
            });
            return { cliente, quantidade: quantidadeTotal, valor: valorTotal };
        });
        const top10Servicos = consumoServicos.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);

        const consumoGeral: ClienteConsumo[] = clientes.map(cliente => {
            const dadosProdutos = consumoProdutos.find(c => c.cliente.email === cliente.email);
            const dadosServicos = consumoServicos.find(c => c.cliente.email === cliente.email);

            return {
                cliente,
                quantidade: (dadosProdutos?.quantidade || 0) + (dadosServicos?.quantidade || 0),
                valor: (dadosProdutos?.valor || 0) + (dadosServicos?.valor || 0)
            };
        });
        const top10GeralQuantidade = consumoGeral.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);

        return (
            <div className="card border-0 shadow-sm">
                <div className="card-header py-3" style={{
                    backgroundColor: tema,
                    color: 'white',
                    borderBottom: '2px solid rgba(255,255,255,0.1)'
                }}>
                    <h5 className="mb-0 fw-bold">
                        <i className="bi bi-people-fill me-2"></i>
                        Top Consumidores
                    </h5>
                </div>

                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0">
                                        <i className="bi bi-cart3 me-2"></i>
                                        Top Produtos
                                    </h6>
                                </div>
                                <div className="card-body p-0">
                                    {top10Produtos.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {top10Produtos.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
                                                    onClick={() => onClienteSelect(item.cliente)}
                                                >
                                                    <div>
                                                        <span className="fw-bold">{index + 1}. {item.cliente.nome}</span>
                                                        <div className="text-success small">
                                                            R$ {item.valor.toFixed(2).replace('.', ',')}
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-primary rounded-pill">
                                                        {item.quantidade} un
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-muted">
                                            <i className="bi bi-cart-x" style={{ fontSize: '1.5rem' }}></i>
                                            <p className="mt-2 mb-0">Nenhum consumo registrado</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0">
                                        <i className="bi bi-wrench me-2"></i>
                                        Top Serviços
                                    </h6>
                                </div>
                                <div className="card-body p-0">
                                    {top10Servicos.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {top10Servicos.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
                                                    onClick={() => onClienteSelect(item.cliente)}
                                                >
                                                    <div>
                                                        <span className="fw-bold">{index + 1}. {item.cliente.nome}</span>
                                                        <div className="text-success small">
                                                            R$ {item.valor.toFixed(2).replace('.', ',')}
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-info text-dark rounded-pill">
                                                        {item.quantidade} un
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-muted">
                                            <i className="bi bi-wrench" style={{ fontSize: '1.5rem' }}></i>
                                            <p className="mt-2 mb-0">Nenhum consumo registrado</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0">
                                        <i className="bi bi-trophy me-2"></i>
                                        Top Geral
                                    </h6>
                                </div>
                                <div className="card-body p-0">
                                    {top10GeralQuantidade.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {top10GeralQuantidade.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
                                                    onClick={() => onClienteSelect(item.cliente)}
                                                >
                                                    <div>
                                                        <span className="fw-bold">{index + 1}. {item.cliente.nome}</span>
                                                        <div className="text-success small">
                                                            R$ {item.valor.toFixed(2).replace('.', ',')}
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-success rounded-pill">
                                                        {item.quantidade} un
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-muted">
                                            <i className="bi bi-emoji-frown" style={{ fontSize: '1.5rem' }}></i>
                                            <p className="mt-2 mb-0">Nenhum consumo registrado</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}