import { Component } from "react";
import { Produto } from "./dados";

type Props = {
    tema: string;
    onSubmit: (produto: Omit<Produto, 'id'>) => void;
}

type State = {
    nome: string;
    preco: string;
    tipo: string;
}

export default class FormularioCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: '',
            preco: '',
            tipo: 'Alimento'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        this.setState({ [e.target.name]: e.target.value } as any);
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { nome, preco, tipo } = this.state;

        if (!nome || !preco) {
            alert("Por favor, preencha o nome e o preço do produto.");
            return;
        }

        const novoProduto = {
            nome: nome,
            preco: parseFloat(preco),
            tipo: tipo
        };

        this.props.onSubmit(novoProduto);
        this.setState({ nome: '', preco: '', tipo: 'Alimento' });
    }

    render() {
        const { tema } = this.props;
        return (
            <div className="card border-0 shadow-sm">
                <div className="card-header py-3" style={{
                    backgroundColor: tema,
                    color: 'white',
                    borderBottom: '2px solid rgba(255,255,255,0.1)'
                }}>
                    <h5 className="mb-0 fw-bold">
                        <i className="bi bi-cart-plus-fill me-2"></i>
                        Cadastro de Produto
                    </h5>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2" style={{ color: tema }}></i>
                                Informações do Produto
                            </h6>

                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label htmlFor="nome" className="form-label small fw-semibold">Nome do Produto*</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-2"
                                        id="nome"
                                        name="nome"
                                        value={this.state.nome}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="preco" className="form-label small fw-semibold">Preço (R$)*</label>
                                    <div className="input-group">
                                        <span className="input-group-text rounded-2">R$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="form-control rounded-2"
                                            id="preco"
                                            name="preco"
                                            value={this.state.preco}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="tipo" className="form-label small fw-semibold">Tipo de Produto*</label>
                                    <select
                                        className="form-select rounded-2"
                                        id="tipo"
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Alimento">Alimento</option>
                                        <option value="Higiene">Higiene</option>
                                        <option value="Brinquedo">Brinquedo</option>
                                        <option value="Acessório">Acessório</option>
                                        <option value="Saúde">Saúde</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button
                                type="submit"
                                className="btn btn-lg rounded-2 fw-bold"
                                style={{ backgroundColor: tema, color: 'white' }}
                                disabled={!this.state.nome || !this.state.preco || !this.state.tipo}
                            >
                                <i className="bi bi-save me-2"></i>
                                Cadastrar Produto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}