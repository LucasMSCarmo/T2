import { Component } from "react";
import { Produto } from "../dados";

type Props = {
    itemSelecionado: Produto | null,
    seletorView: (novaTela: string) => void,
    onSubmit: (produto: Produto) => void
}

type State = {
    nome: string,
    preco: string
}

export default class FormularioCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.itemSelecionado?.nome || '',
            preco: props.itemSelecionado?.preco.toString() || ''
        };
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { nome, preco } = this.state;
        const precoNumber = parseFloat(preco) || 0;
        
        const produto: Produto = {
            id: this.props.itemSelecionado?.id || 0, // ID é placeholder, será definido no Roteador
            nome,
            preco: precoNumber
        };

        this.props.onSubmit(produto);
        this.props.seletorView('Produtos');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="m-0">{this.props.itemSelecionado ? `Editando: ${this.props.itemSelecionado.nome}` : 'Cadastro de Produto'}</h5>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome do Produto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nome" 
                                    value={this.state.nome}
                                    onChange={(e) => this.setState({ nome: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="preco" className="form-label">Preço (R$)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="preco" 
                                    value={this.state.preco}
                                    onChange={(e) => this.setState({ preco: e.target.value })}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-secondary me-2" type="button" onClick={() => this.props.seletorView('Produtos')}>
                                    Voltar
                                </button>
                                <button className="btn btn-success" type="submit">
                                    <i className="bi bi-save-fill me-2"></i>Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}