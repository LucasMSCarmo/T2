import { Component } from "react";
import { Cliente, RG } from "./dados";

type Props = {
    tema: string;
    cliente: Cliente;
    onSalvar: (clienteEditado: Cliente) => void;
    onFechar: () => void;
}

type State = {
    nome: string;
    nomeSocial: string;
    email: string;
    cpf: string;
    telefones: string;
    rgs: { numero: string; dataEmissao: string; }[];
    rgTemp: { numero: string; dataEmissao: string; };
}

export default class FormularioEdicaoCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.cliente.nome,
            nomeSocial: props.cliente.nomeSocial,
            email: props.cliente.email,
            cpf: props.cliente.cpf,
            telefones: props.cliente.telefones.join(', '),
            rgs: props.cliente.rgs.map(rg => ({
                numero: rg.numero,
                dataEmissao: rg.dataEmissao.toISOString().split('T')[0]
            })),
            rgTemp: { numero: '', dataEmissao: '' }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSalvar = this.handleSalvar.bind(this);
        this.handleRgChange = this.handleRgChange.bind(this);
        this.adicionarRg = this.adicionarRg.bind(this);
        this.removerRg = this.removerRg.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as any);
    }

    handleRgChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            rgTemp: { ...prevState.rgTemp, [name]: value }
        }));
    }

    adicionarRg() {
        if (!this.state.rgTemp.numero || !this.state.rgTemp.dataEmissao) {
            alert("Por favor, preencha o número e a data de emissão do RG.");
            return;
        }
        this.setState(prevState => ({
            rgs: [...prevState.rgs, prevState.rgTemp],
            rgTemp: { numero: '', dataEmissao: '' }
        }));
    }

    removerRg(index: number) {
        this.setState(prevState => ({
            rgs: prevState.rgs.filter((_, i) => i !== index)
        }));
    }

    handleSalvar(event: React.FormEvent) {
        event.preventDefault();

        const clienteEditado: Cliente = {
            ...this.props.cliente,
            nome: this.state.nome,
            nomeSocial: this.state.nomeSocial,
            email: this.state.email,
            cpf: this.state.cpf,
            telefones: this.state.telefones.split(',').map(t => t.trim()).filter(t => t),
            rgs: this.state.rgs.map(rg => ({
                numero: rg.numero,
                dataEmissao: new Date(rg.dataEmissao + 'T00:00:00')
            }))
        };

        this.props.onSalvar(clienteEditado);
    }

    render() {
        const { tema, onFechar } = this.props;

        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0 shadow-lg">
                        <div className="modal-header py-3" style={{
                            backgroundColor: tema,
                            color: 'white',
                            borderBottom: '2px solid rgba(255,255,255,0.1)'
                        }}>
                            <h5 className="modal-title fw-bold">
                                <i className="bi bi-pencil-square me-2"></i>
                                Editando Cliente: {this.props.cliente.nome}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onFechar}></button>
                        </div>

                        <form onSubmit={this.handleSalvar}>
                            <div className="modal-body p-4">
                                <div className="mb-4">
                                    <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                        <i className="bi bi-person-lines-fill me-2" style={{ color: tema }}></i>
                                        Dados Pessoais
                                    </h6>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold">Nome Completo*</label>
                                            <input
                                                type="text"
                                                className="form-control rounded-2"
                                                name="nome"
                                                value={this.state.nome}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold">Nome Social</label>
                                            <input
                                                type="text"
                                                className="form-control rounded-2"
                                                name="nomeSocial"
                                                value={this.state.nomeSocial}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold">Email*</label>
                                            <input
                                                type="email"
                                                className="form-control rounded-2"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold">CPF*</label>
                                            <input
                                                type="text"
                                                className="form-control rounded-2"
                                                name="cpf"
                                                value={this.state.cpf}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-semibold">Telefones (separados por vírgula)</label>
                                            <input
                                                type="text"
                                                className="form-control rounded-2"
                                                name="telefones"
                                                value={this.state.telefones}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-body p-4">
                                        <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                            <i className="bi bi-person-badge me-2" style={{ color: tema }}></i>
                                            Documentos de RG
                                        </h6>

                                        {this.state.rgs.length > 0 && (
                                            <div className="mb-3">
                                                {this.state.rgs.map((rg, index) => (
                                                    <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style={{ backgroundColor: '#f8f9fa' }}>
                                                        <div>
                                                            <span className="fw-semibold">{rg.numero}</span>
                                                            <small className="text-muted ms-2">
                                                                <i className="bi bi-calendar me-1"></i>
                                                                {new Date(rg.dataEmissao + 'T00:00:00').toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm rounded-2"
                                                            onClick={() => this.removerRg(index)}
                                                        >
                                                            <i className="bi bi-trash"></i> Remover
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="row g-3">
                                            <div className="col-md-5">
                                                <label className="form-label small fw-semibold">Número do RG</label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-2"
                                                    name="numero"
                                                    value={this.state.rgTemp.numero}
                                                    onChange={this.handleRgChange}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label small fw-semibold">Data de Emissão</label>
                                                <input
                                                    type="date"
                                                    className="form-control rounded-2"
                                                    name="dataEmissao"
                                                    value={this.state.rgTemp.dataEmissao}
                                                    onChange={this.handleRgChange}
                                                />
                                            </div>
                                            <div className="col-md-2 d-flex align-items-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm w-100 rounded-2"
                                                    style={{
                                                        backgroundColor: tema,
                                                        color: 'white',
                                                        opacity: (!this.state.rgTemp.numero || !this.state.rgTemp.dataEmissao) ? 0.65 : 1
                                                    }}
                                                    onClick={this.adicionarRg}
                                                    disabled={!this.state.rgTemp.numero || !this.state.rgTemp.dataEmissao}
                                                >
                                                    <i className="bi bi-plus-lg me-1"></i> Adicionar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer border-top-0">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-2 fw-semibold"
                                    onClick={onFechar}
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
                                        padding: '0.5rem 1.5rem'
                                    }}
                                >
                                    <i className="bi bi-save me-2"></i>
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}