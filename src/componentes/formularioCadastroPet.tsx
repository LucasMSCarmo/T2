import { Component } from "react";
import { Cliente } from "./dados";

type Props = {
    tema: string;
    cliente: Cliente | null;
    clientes: Cliente[];
    onSubmit: (cliente: Cliente | null, pet: {
        nome: string;
        tipo: string;
        raca: string;
        genero: string;
        produtosConsumidos: any[];
        servicosConsumidos: any[];
    }) => void;
    onCancelar: () => void;
}

type State = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    clienteSelecionadoId: number | null;
}

export default class FormularioCadastroPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: '',
            tipo: 'Cachorro',
            raca: '',
            genero: 'Macho',
            clienteSelecionadoId: props.cliente
                ? this.props.clientes.indexOf(props.cliente)
                : null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { nome, tipo, raca, genero, clienteSelecionadoId } = this.state;

        const novoPet = {
            nome,
            tipo,
            raca,
            genero,
            produtosConsumidos: [],
            servicosConsumidos: []
        };

        const cliente = clienteSelecionadoId !== null
            ? this.props.clientes[clienteSelecionadoId]
            : this.props.cliente;

        this.props.onSubmit(cliente, novoPet);
    }

    render() {
        const { tema, clientes, cliente, onCancelar } = this.props;
        const { nome, tipo, raca, genero, clienteSelecionadoId } = this.state;

        return (
            <div className="card border-0 shadow-sm">
                <div className="card-header py-3" style={{
                    backgroundColor: tema,
                    color: 'white',
                    borderBottom: '2px solid rgba(255,255,255,0.1)'
                }}>
                    <h5 className="mb-0 fw-bold">
                        <i className="bi bi-heart me-2"></i>
                        {cliente ? `Cadastrar Pet para ${cliente.nome}` : 'Cadastrar Pet'}
                    </h5>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={this.handleSubmit}>
                        {!cliente && (
                            <div className="mb-4">
                                <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                    <i className="bi bi-person me-2" style={{ color: tema }}></i>
                                    Dono do Pet
                                </h6>
                                <select
                                    className="form-select rounded-2"
                                    value={clienteSelecionadoId ?? ''}
                                    onChange={(e) => this.setState({
                                        clienteSelecionadoId: e.target.value ? parseInt(e.target.value) : null
                                    })}
                                    required
                                >
                                    <option value="">Selecione um cliente...</option>
                                    {clientes.map((cliente, index) => (
                                        <option key={index} value={index}>
                                            {cliente.nome} ({cliente.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                <i className="bi bi-heart-fill me-2" style={{ color: tema }}></i>
                                Dados do Pet
                            </h6>

                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label htmlFor="nome" className="form-label small fw-semibold">Nome do Pet*</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-2"
                                        name="nome"
                                        value={nome}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Tipo*</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-2"
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        placeholder="Ex: Cão, Gato, Calopsita..."
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Raça*</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-2"
                                        name="raca"
                                        value={raca}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Gênero*</label>
                                    <select
                                        className="form-select rounded-2"
                                        name="genero"
                                        value={this.state.genero}
                                        onChange={this.handleChange}
                                        required
                                    >
                                        <option value="Macho">Macho</option>
                                        <option value="Fêmea">Fêmea</option>
                                        <option value="Não se aplica">Não se aplica</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-3 mt-4">
                            <button
                                type="button"
                                className="btn btn-outline-secondary rounded-2 fw-semibold"
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
                                    opacity: (!cliente && clienteSelecionadoId === null) ? 0.65 : 1
                                }}
                                disabled={!cliente && clienteSelecionadoId === null}
                            >
                                <i className="bi bi-save me-2"></i>
                                Cadastrar Pet
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}