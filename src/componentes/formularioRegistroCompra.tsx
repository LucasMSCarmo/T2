import { Component } from "react";
import { Cliente, Produto, Servico } from "./dados";

type Props = {
    tema: string;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    onSubmit: (cliente: Cliente, petNome: string, produtos: {produto: Produto, quantidade: number}[], servicos: Servico[]) => void;
    onCancelar: () => void;
}

type State = {
    clienteSelecionado: Cliente | null;
    petSelecionado: string;
    produtosSelecionados: {produto: Produto, quantidade: number}[];
    servicosSelecionados: Servico[];
}

export default class FormularioRegistroCompra extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clienteSelecionado: null,
            petSelecionado: '',
            produtosSelecionados: [],
            servicosSelecionados: []
        };
    }

    handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cliente = this.props.clientes.find(c => c.email === e.target.value);
        this.setState({
            clienteSelecionado: cliente || null,
            petSelecionado: '',
            produtosSelecionados: [],
            servicosSelecionados: []
        });
    }

    handlePetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            petSelecionado: e.target.value,
            produtosSelecionados: [],
            servicosSelecionados: []
        });
    }

    handleProdutoChange = (produto: Produto, e: React.ChangeEvent<HTMLInputElement>) => {
        const quantidade = parseInt(e.target.value) || 0;
        
        this.setState(prevState => {
            const produtosAtualizados = [...prevState.produtosSelecionados];
            const index = produtosAtualizados.findIndex(p => p.produto.nome === produto.nome);
            
            if (quantidade > 0) {
                if (index >= 0) {
                    produtosAtualizados[index] = { produto, quantidade };
                } else {
                    produtosAtualizados.push({ produto, quantidade });
                }
            } else if (index >= 0) {
                produtosAtualizados.splice(index, 1);
            }
            
            return { produtosSelecionados: produtosAtualizados };
        });
    }

    handleServicoChange = (servico: Servico, e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        
        this.setState(prevState => {
            const servicosAtualizados = [...prevState.servicosSelecionados];
            const index = servicosAtualizados.findIndex(s => s.nome === servico.nome);
            
            if (isChecked && index === -1) {
                servicosAtualizados.push(servico);
            } else if (!isChecked && index >= 0) {
                servicosAtualizados.splice(index, 1);
            }
            
            return { servicosSelecionados: servicosAtualizados };
        });
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { clienteSelecionado, petSelecionado, produtosSelecionados, servicosSelecionados } = this.state;
        
        if (!clienteSelecionado || !petSelecionado || 
            (produtosSelecionados.length === 0 && servicosSelecionados.length === 0)) {
            alert("Por favor, selecione um cliente, um pet e pelo menos um produto ou serviço.");
            return;
        }
        
        this.props.onSubmit(
            clienteSelecionado,
            petSelecionado,
            produtosSelecionados,
            servicosSelecionados
        );
        
        this.setState({
            clienteSelecionado: null,
            petSelecionado: '',
            produtosSelecionados: [],
            servicosSelecionados: []
        });
    }

    render() {
        const { tema, clientes, produtos, servicos, onCancelar } = this.props;
        const { clienteSelecionado, petSelecionado, produtosSelecionados, servicosSelecionados } = this.state;

        return (
            <div className="card border-0 shadow-sm">
                <div className="card-header py-3" style={{
                    backgroundColor: tema,
                    color: 'white',
                    borderBottom: '2px solid rgba(255,255,255,0.1)'
                }}>
                    <h5 className="mb-0 fw-bold">
                        <i className="bi bi-cart-plus me-2"></i>
                        Registrar Compra/Serviço
                    </h5>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                <i className="bi bi-person me-2" style={{ color: tema }}></i>
                                Seleção do Cliente e Pet
                            </h6>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Cliente*</label>
                                    <select
                                        className="form-select rounded-2"
                                        value={clienteSelecionado?.email || ''}
                                        onChange={this.handleClienteChange}
                                        required
                                    >
                                        <option value="">Selecione um cliente...</option>
                                        {clientes.map(cliente => (
                                            <option key={cliente.email} value={cliente.email}>
                                                {cliente.nome} ({cliente.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Pet*</label>
                                    <select
                                        className="form-select rounded-2"
                                        value={petSelecionado}
                                        onChange={this.handlePetChange}
                                        disabled={!clienteSelecionado}
                                        required
                                    >
                                        <option value="">Selecione um pet...</option>
                                        {clienteSelecionado?.pets.map(pet => (
                                            <option key={pet.nome} value={pet.nome}>
                                                {pet.nome} ({pet.tipo} - {pet.raca})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                <i className="bi bi-cart3 me-2" style={{ color: tema }}></i>
                                Produtos
                            </h6>

                            {produtos.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-sm table-hover">
                                        <thead>
                                            <tr>
                                                <th>Produto</th>
                                                <th>Preço</th>
                                                <th>Quantidade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produtos.map(produto => (
                                                <tr key={produto.nome}>
                                                    <td>{produto.nome}</td>
                                                    <td>R$ {produto.preco.toFixed(2).replace('.', ',')}</td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            className="form-control form-control-sm"
                                                            style={{ width: '80px' }}
                                                            onChange={(e) => this.handleProdutoChange(produto, e)}
                                                            value={
                                                                produtosSelecionados.find(p => p.produto.nome === produto.nome)?.quantidade || 0
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="alert alert-info">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Nenhum produto cadastrado
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                <i className="bi bi-wrench me-2" style={{ color: tema }}></i>
                                Serviços
                            </h6>

                            {servicos.length > 0 ? (
                                <div className="row g-3">
                                    {servicos.map(servico => (
                                        <div key={servico.nome} className="col-md-4">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`servico-${servico.nome}`}
                                                    checked={servicosSelecionados.some(s => s.nome === servico.nome)}
                                                    onChange={(e) => this.handleServicoChange(servico, e)}
                                                />
                                                <label className="form-check-label" htmlFor={`servico-${servico.nome}`}>
                                                    {servico.nome} (R$ {servico.preco.toFixed(2).replace('.', ',')})
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="alert alert-info">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Nenhum serviço cadastrado
                                </div>
                            )}
                        </div>

                        <div className="d-flex justify-content-end gap-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary rounded-2"
                                onClick={onCancelar}
                            >
                                <i className="bi bi-x-circle me-2"></i>
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn rounded-2 fw-bold"
                                style={{
                                    backgroundColor: tema,
                                    color: 'white',
                                    opacity: (!clienteSelecionado || !petSelecionado || 
                                        (produtosSelecionados.length === 0 && servicosSelecionados.length === 0)) ? 0.65 : 1
                                }}
                                disabled={!clienteSelecionado || !petSelecionado || 
                                    (produtosSelecionados.length === 0 && servicosSelecionados.length === 0)}
                            >
                                <i className="bi bi-check-circle me-2"></i>
                                Registrar Compra
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}