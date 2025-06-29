import { Component } from "react";
import { Cliente, RG } from "./dados";

type Props = {
    tema: string;
    onSubmit: (cliente: Cliente) => void;
}

type State = {
    nome: string;
    nomeSocial: string;
    email: string;
    telefone: string;
    cpf: string;
    rgs: { numero: string; dataEmissao: string; }[];
    rgTemp: { numero: string; dataEmissao: string; };
    pets: { nome: string; tipo: string; raca: string; genero: string; }[];
    petTemp: { nome: string; tipo: string; raca: string; genero: string; };
}

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: '',
            nomeSocial: '',
            email: '',
            telefone: '',
            cpf: '',
            rgs: [],
            rgTemp: { numero: '', dataEmissao: '' },
            pets: [],
            petTemp: { nome: 'Rex', tipo: 'Cachorro', raca: 'Vira-lata', genero: 'Macho' }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRgChange = this.handleRgChange.bind(this);
        this.adicionarRg = this.adicionarRg.bind(this);
        this.removerRg = this.removerRg.bind(this);
        this.handlePetChange = this.handlePetChange.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);
        this.removerPet = this.removerPet.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [e.target.name]: e.target.value } as any);
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

    handlePetChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            petTemp: { ...prevState.petTemp, [name]: value }
        }));
    }

    adicionarPet() {
        if (!this.state.petTemp.nome || !this.state.petTemp.raca) {
            alert("Por favor, preencha o nome e a raça do pet.");
            return;
        }
        this.setState(prevState => ({
            pets: [...prevState.pets, prevState.petTemp],
            petTemp: { nome: '', tipo: 'Cachorro', raca: '', genero: 'Macho' }
        }));
    }

    removerPet(index: number) {
        this.setState(prevState => ({
            pets: prevState.pets.filter((_, i) => i !== index)
        }));
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { nome, nomeSocial, email, cpf, rgs, telefone, pets } = this.state;

        const novoCliente: Cliente = {
            nome,
            nomeSocial,
            email,
            cpf,
            rgs: rgs.map(rg => ({
                numero: rg.numero,
                dataEmissao: new Date(rg.dataEmissao + 'T00:00:00')
            })),
            telefones: [telefone],
            pets: pets.map(pet => ({ ...pet, produtosConsumidos: [], servicosConsumidos: [] }))
        };

        this.props.onSubmit(novoCliente);
        this.setState({
            nome: '', nomeSocial: '', email: '', telefone: '', cpf: '', rgs: [], rgTemp: { numero: '', dataEmissao: '' }, pets: [], petTemp: { nome: '', tipo: 'Cachorro', raca: '', genero: 'Macho' }
        });
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
                        <i className="bi bi-person-plus me-2"></i>
                        Cadastro de Cliente
                    </h5>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                <i className="bi bi-person-lines-fill me-2" style={{ color: tema }}></i>
                                Dados Pessoais
                            </h6>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="nome" className="form-label small fw-semibold">Nome Completo*</label>
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
                                    <label htmlFor="nomeSocial" className="form-label small fw-semibold">Nome Social</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-2"
                                        name="nomeSocial"
                                        value={this.state.nomeSocial}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label small fw-semibold">Email*</label>
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
                                    <label htmlFor="telefone" className="form-label small fw-semibold">Telefone*</label>
                                    <input
                                        type="tel"
                                        className="form-control rounded-2"
                                        name="telefone"
                                        value={this.state.telefone}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="cpf" className="form-label small fw-semibold">CPF*</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-2"
                                        name="cpf"
                                        value={this.state.cpf}
                                        onChange={this.handleChange}
                                        required
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
                                                    title="Remover RG"
                                                >
                                                    <i className="bi bi-trash"></i>
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
                                            style={{ backgroundColor: tema, color: 'white' }}
                                            onClick={this.adicionarRg}
                                            disabled={!this.state.rgTemp.numero || !this.state.rgTemp.dataEmissao}
                                        >
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h6 className="fw-bold text-muted mb-3 d-flex align-items-center">
                                    <i className="bi bi-heart me-2" style={{ color: tema }}></i>
                                    Pets do Cliente
                                </h6>

                                {this.state.pets.length > 0 && (
                                    <div className="mb-3">
                                        {this.state.pets.map((pet, index) => (
                                            <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style={{ backgroundColor: '#f8f9fa' }}>
                                                <div>
                                                    <span className="fw-semibold">{pet.nome}</span>
                                                    <small className="text-muted ms-2">
                                                        {pet.tipo} • {pet.raca} • {pet.genero}
                                                    </small>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm rounded-2"
                                                    onClick={() => this.removerPet(index)}
                                                    title="Remover Pet"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="row g-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label small fw-semibold">Nome*</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-2"
                                            name="nome"
                                            value={this.state.petTemp.nome}
                                            onChange={this.handlePetChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-semibold">Tipo*</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-2"
                                            name="tipo"
                                            value={this.state.petTemp.tipo}
                                            onChange={this.handlePetChange}
                                            placeholder="Ex: Cão, Gato..."
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label small fw-semibold">Raça*</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-2"
                                            name="raca"
                                            value={this.state.petTemp.raca}
                                            onChange={this.handlePetChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label small fw-semibold">Gênero</label>
                                        <select
                                            className="form-select rounded-2"
                                            name="genero"
                                            value={this.state.petTemp.genero}
                                            onChange={this.handlePetChange}
                                        >
                                            <option value="Macho">Macho</option>
                                            <option value="Fêmea">Fêmea</option>
                                            <option value="Não se aplica">N/A</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-sm rounded-2 w-100"
                                    style={{
                                        backgroundColor: tema,
                                        color: 'white',
                                        opacity: (!this.state.petTemp.nome || !this.state.petTemp.raca) ? 0.65 : 1
                                    }}
                                    onClick={this.adicionarPet}
                                    disabled={!this.state.petTemp.nome || !this.state.petTemp.raca}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Adicionar Pet
                                </button>
                            </div>
                        </div>

                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-lg rounded-2 fw-bold"
                                style={{ backgroundColor: tema, color: 'white' }}
                            >
                                <i className="bi bi-save me-2"></i>
                                Cadastrar Cliente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}