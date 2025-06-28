import { Component } from "react";
import { Cliente, Produto, Servico } from "../dados";

type Props = {
    clientes: Cliente[],
    produtos: Produto[],
    servicos: Servico[]
}

type ItemConsumo = {
    id: number,
    nome: string,
    tipo: 'produto' | 'servico',
    quantidade: number
}

export default class ListagemGeralConsumidos extends Component<Props> {
    calcularItensMaisConsumidos(): ItemConsumo[] {
        const contagemProdutos: Record<number, number> = {};
        const contagemServicos: Record<number, number> = {};

        this.props.clientes.forEach(cliente => {
            cliente.pets.forEach(pet => {
                pet.produtosConsumidos.forEach(produto => {
                    contagemProdutos[produto.id] = (contagemProdutos[produto.id] || 0) + 1;
                });
                pet.servicosConsumidos.forEach(servico => {
                    contagemServicos[servico.id] = (contagemServicos[servico.id] || 0) + 1;
                });
            });
        });

        return [
            ...this.props.produtos.map(p => ({
                id: p.id,
                nome: p.nome,
                tipo: 'produto' as const,
                quantidade: contagemProdutos[p.id] || 0
            })),
            ...this.props.servicos.map(s => ({
                id: s.id,
                nome: s.nome,
                tipo: 'servico' as const,
                quantidade: contagemServicos[s.id] || 0
            }))
        ].sort((a, b) => b.quantidade - a.quantidade);
    }

    render() {
        const itens = this.calcularItensMaisConsumidos();
        const topProdutos = itens.filter(item => item.tipo === 'produto' && item.quantidade > 0);
        const topServicos = itens.filter(item => item.tipo === 'servico' && item.quantidade > 0);

        return (
            <div className="container-fluid">
                {/* Tabela de Produtos */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white">
                        <h5 className="m-0"><i className="bi bi-box-seam-fill me-2"></i>Produtos Mais Consumidos</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Produto</th>
                                        <th scope="col" className="text-center">Quantidade Consumida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProdutos.map((produto, index) => (
                                        <tr key={produto.id}>
                                            <td>{index + 1}º</td>
                                            <td>{produto.nome}</td>
                                            <td className="text-center">
                                                <span className="badge bg-primary rounded-pill">{produto.quantidade}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Tabela de Serviços */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-success text-white">
                        <h5 className="m-0"><i className="bi bi-scissors me-2"></i>Serviços Mais Consumidos</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Serviço</th>
                                        <th scope="col" className="text-center">Quantidade Consumida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topServicos.map((servico, index) => (
                                        <tr key={servico.id}>
                                            <td>{index + 1}º</td>
                                            <td>{servico.nome}</td>
                                            <td className="text-center">
                                                <span className="badge bg-success rounded-pill">{servico.quantidade}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}