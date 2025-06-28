// formularioCadastroCliente.tsx (atualizado)
import { Component } from "react";
import { Cliente, CPF, RG, Telefone } from "../dados";

type Props = {
    itemSelecionado: Cliente | null,
    seletorView: (novaTela: string) => void,
    onSubmit: (cliente: Cliente) => void
}

type State = {
    nome: string,
    nomeSocial: string,
    cpf: string,
    rgs: RG[],
    telefones: Array<{ ddd: string, numero: string }>,
    novoTelefone: { ddd: string, numero: string }
}

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.itemSelecionado?.nome || '',
            nomeSocial: props.itemSelecionado?.nomeSocial || '',
            cpf: props.itemSelecionado?.cpf.valor || '',
            rgs: props.itemSelecionado?.rgs || [],
            telefones: props.itemSelecionado?.telefones || [],
            novoTelefone: { ddd: '', numero: '' }
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const cpf: CPF = {
            valor: this.state.cpf,
            dataEmissao: this.props.itemSelecionado?.cpf.dataEmissao || new Date()
        };

        const telefones: Telefone[] = this.state.telefones.map(t => ({
            ddd: t.ddd,
            numero: t.numero
        }));
        
        // Dados do formulário
        const clienteData = {
            nome: this.state.nome,
            nomeSocial: this.state.nomeSocial,
            cpf: cpf,
            rgs: this.state.rgs, // Incluído para cumprir o tipo
            telefones: telefones,
        }

        // Se estiver editando, usa o objeto completo do item selecionado
        if (this.props.itemSelecionado) {
            this.props.onSubmit({ ...this.props.itemSelecionado, ...clienteData });
        } else {
            // Para um novo cliente, cria um placeholder com os campos que não estão no formulário
            const clientePlaceholder = {
                id: 0, // ID será definido pelo Roteador
                pets: [],
                produtosConsumidos: [],
                servicosConsumidos: []
            };
            this.props.onSubmit({ ...clientePlaceholder, ...clienteData });
        }
        
        this.props.seletorView('Clientes');
    }

    adicionarTelefone = () => {
        if (this.state.novoTelefone.ddd && this.state.novoTelefone.numero) {
            this.setState(prev => ({
                telefones: [...prev.telefones, prev.novoTelefone],
                novoTelefone: { ddd: '', numero: '' }
            }));
        }
    }

    render() {
        return (
            <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {this.props.itemSelecionado ? `Editando Cliente` : 'Cadastrar Novo Cliente'}
                    </h2>
                    <p className="text-sm text-gray-600">
                        Preencha os dados abaixo para {this.props.itemSelecionado ? 'atualizar' : 'cadastrar'} o cliente
                    </p>
                </div>

                <form onSubmit={this.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                                Nome Completo *
                            </label>
                            <input
                                type="text"
                                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                id="nome"
                                value={this.state.nome}
                                onChange={(e) => this.setState({ nome: e.target.value })}
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="nomeSocial" className="block text-sm font-medium text-gray-700 mb-1">
                                Nome Social
                            </label>
                            <input
                                type="text"
                                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                id="nomeSocial"
                                value={this.state.nomeSocial}
                                onChange={(e) => this.setState({ nomeSocial: e.target.value })}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                                CPF *
                            </label>
                            <input
                                type="text"
                                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                id="cpf"
                                value={this.state.cpf}
                                onChange={(e) => this.setState({ cpf: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                <i className="bi bi-telephone-fill me-2 text-blue-500"></i>
                                Telefones
                            </h3>
                        </div>
                        
                        {this.state.telefones.length > 0 ? (
                            <div className="space-y-2">
                                {this.state.telefones.map((tel, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                        <span className="font-medium">({tel.ddd}) {tel.numero}</span>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => this.setState(prev => ({
                                                telefones: prev.telefones.filter((_, i) => i !== index)
                                            }))}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm">
                                Nenhum telefone cadastrado
                            </div>
                        )}

                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-3">
                                <input
                                    type="text"
                                    className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="DDD"
                                    value={this.state.novoTelefone.ddd}
                                    onChange={(e) => this.setState(prev => ({
                                        novoTelefone: { ...prev.novoTelefone, ddd: e.target.value }
                                    }))}
                                    maxLength={2}
                                />
                            </div>
                            <div className="col-span-7">
                                <input
                                    type="text"
                                    className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Número"
                                    value={this.state.novoTelefone.numero}
                                    onChange={(e) => this.setState(prev => ({
                                        novoTelefone: { ...prev.novoTelefone, numero: e.target.value }
                                    }))}
                                />
                            </div>
                            <div className="col-span-2">
                                <button
                                    type="button"
                                    className="btn btn-primary w-full flex items-center justify-center"
                                    onClick={this.adicionarTelefone}
                                >
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.props.seletorView('Clientes')}
                        >
                            <i className="bi bi-x-circle me-2"></i>Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <i className="bi bi-check-circle me-2"></i>Salvar
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}