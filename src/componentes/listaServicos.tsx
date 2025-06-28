import { Component } from "react";
import { Servico } from "../dados";

type props = {
    servicos: Servico[],
    seletorView: (novaTela: string) => void,
    selecionarItem: (item: Servico | null) => void,
    onDelete: (id: number) => void
}

export default class ListaServicos extends Component<props> {
    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="m-0">Serviços</h4>
                    <button className="btn btn-primary" onClick={() => {
                        this.props.selecionarItem(null);
                        this.props.seletorView('FormularioServico');
                    }}>
                        <i className="bi bi-plus-circle-fill me-2"></i>Novo Serviço
                    </button>
                </div>
                <div className="list-group">
                    {this.props.servicos.map(item => (
                        <div key={item.id} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{item.nome}</h5>
                                <small>Preço: R$ {item.preco.toFixed(2)}</small>
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { this.props.selecionarItem(item); this.props.seletorView('FormularioServico'); }}>
                                    <i className="bi bi-pencil-fill me-1"></i>Editar
                                </button>
                                <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => this.props.onDelete(item.id)}
                                >
                                    <i className="bi bi-trash-fill me-1"></i>Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}