import { Component } from "react";
import { Cliente, Pet, Produto, Servico } from "../dados";

type Props = {
    clientes: Cliente[],
    produtos: Produto[],
    servicos: Servico[],
    seletorView: (novaTela: string) => void,
    // A assinatura desta função foi corrigida para incluir petId
    registrarConsumo: (clienteId: number, petId: number, produtosIds: number[], servicosIds: number[]) => void
}

type State = {
    clienteSelecionadoId: string,
    petSelecionadoId: string,
    produtosSelecionados: string[],
    servicosSelecionados: string[],
    petsDoCliente: Pet[]
}

export default class FormularioRegistroConsumo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clienteSelecionadoId: '',
            petSelecionadoId: '',
            produtosSelecionados: [],
            servicosSelecionados: [],
            petsDoCliente: []
        }
    }

    handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clienteId = e.target.value;
        if (!clienteId) {
            this.setState({
                clienteSelecionadoId: '',
                petsDoCliente: [],
                petSelecionadoId: ''
            });
            return;
        }
        const cliente = this.props.clientes.find(c => c.id === parseInt(clienteId));
        this.setState({
            clienteSelecionadoId: clienteId,
            petsDoCliente: cliente ? cliente.pets : [],
            petSelecionadoId: '' // Reseta a seleção de pet ao trocar de cliente
        });
    }

    handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, tipo: 'produtos' | 'servicos') => {
        const { value, checked } = e.target;
        const stateKey = tipo === 'produtos' ? 'produtosSelecionados' : 'servicosSelecionados';

        if (checked) {
            this.setState(prev => ({
                ...prev,
                [stateKey]: [...(prev[stateKey] as string[]), value]
            }));
        } else {
            this.setState(prev => ({
                ...prev,
                [stateKey]: (prev[stateKey] as string[]).filter(id => id !== value)
            }));
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { clienteSelecionadoId, petSelecionadoId, produtosSelecionados, servicosSelecionados } = this.state;
        
        if (clienteSelecionadoId && petSelecionadoId) {
            this.props.registrarConsumo(
                parseInt(clienteSelecionadoId),
                parseInt(petSelecionadoId),
                produtosSelecionados.map(id => parseInt(id)),
                servicosSelecionados.map(id => parseInt(id))
            );
            this.props.seletorView('Clientes');
        } else {
            alert('Por favor, selecione um cliente e um pet.');
        }
    }

    render() {
        const { clienteSelecionadoId, petsDoCliente } = this.state;

        return (
            <div className="container-fluid">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="m-0"><i className="bi bi-cart-plus-fill me-2"></i>Registrar Consumo</h5>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cliente" className="form-label">Cliente</label>
                                    <select 
                                        id="cliente"
                                        className="form-select"
                                        value={this.state.clienteSelecionadoId}
                                        onChange={this.handleClienteChange}
                                        required
                                    >
                                        <option value="">Selecione um cliente...</option>
                                        {this.props.clientes.map(cliente => (
                                            <option key={cliente.id} value={cliente.id}>
                                                {cliente.nome} (CPF: {cliente.cpf.valor})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="pet" className="form-label">Pet</label>
                                    <select 
                                        id="pet"
                                        className="form-select"
                                        value={this.state.petSelecionadoId}
                                        onChange={(e) => this.setState({ petSelecionadoId: e.target.value })}
                                        required
                                        disabled={!clienteSelecionadoId || petsDoCliente.length === 0}
                                    >
                                        <option value="">
                                            {
                                                !clienteSelecionadoId 
                                                ? "Selecione um cliente primeiro" 
                                                : petsDoCliente.length === 0 
                                                ? "Cliente não possui pets" 
                                                : "Selecione um pet..."
                                            }
                                        </option>
                                        {petsDoCliente.map(pet => (
                                            <option key={pet.id} value={pet.id}>
                                                {pet.nome} ({pet.raca})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Produtos</label>
                                <div className="row row-cols-1 row-cols-md-2 g-3">
                                    {this.props.produtos.map(produto => (
                                        <div key={produto.id} className="col">
                                            <div className="form-check card h-100">
                                                <div className="card-body">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`produto-${produto.id}`}
                                                        value={produto.id}
                                                        checked={this.state.produtosSelecionados.includes(produto.id.toString())}
                                                        onChange={(e) => this.handleCheckboxChange(e, 'produtos')}
                                                    />
                                                    <label className="form-check-label ms-2" htmlFor={`produto-${produto.id}`}>
                                                        <strong>{produto.nome}</strong> - R$ {produto.preco.toFixed(2)}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Serviços</label>
                                <div className="row row-cols-1 row-cols-md-2 g-3">
                                    {this.props.servicos.map(servico => (
                                        <div key={servico.id} className="col">
                                            <div className="form-check card h-100">
                                                <div className="card-body">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`servico-${servico.id}`}
                                                        value={servico.id}
                                                        checked={this.state.servicosSelecionados.includes(servico.id.toString())}
                                                        onChange={(e) => this.handleCheckboxChange(e, 'servicos')}
                                                    />
                                                    <label className="form-check-label ms-2" htmlFor={`servico-${servico.id}`}>
                                                        <strong>{servico.nome}</strong> - R$ {servico.preco.toFixed(2)}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary" 
                                    onClick={() => this.props.seletorView('Clientes')}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <i className="bi bi-check-circle me-2"></i>Registrar Consumo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}