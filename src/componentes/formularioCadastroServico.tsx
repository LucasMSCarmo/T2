import { Component } from "react";
import { Servico } from "../dados";

type Props = {
    itemSelecionado: Servico | null,
    seletorView: (novaTela: string) => void,
    onSubmit: (servico: Servico) => void
}

type State = {
    nome: string,
    preco: string
}

export default class FormularioCadastroServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.itemSelecionado?.nome || '',
            preco: props.itemSelecionado?.preco.toString() || ''
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { nome, preco } = this.state;
        const precoNumber = parseFloat(preco) || 0;
        
        const servico: Servico = {
            id: this.props.itemSelecionado?.id || 0, // ID é placeholder, será definido no Roteador
            nome,
            preco: precoNumber
        };

        this.props.onSubmit(servico);
        this.props.seletorView('Servicos');
    }

    render() {
        const { itemSelecionado } = this.props;
        return (
            <div className="container-fluid">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="m-0">{itemSelecionado ? `Editando: ${itemSelecionado.nome}` : 'Cadastro de Serviço'}</h5>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome do Serviço</label>
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
                                <button className="btn btn-secondary me-2" type="button" onClick={() => this.props.seletorView('Servicos')}>
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