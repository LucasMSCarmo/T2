// listaClientes.tsx (atualizado)
import { Component } from "react";
import { Cliente } from "../dados";

type Props = {
    clientes: Cliente[],
    seletorView: (novaTela: string) => void,
    selecionarItem: (item: Cliente | null) => void,
    onDelete: (id: number) => void
}

export default class ListaCliente extends Component<Props> {
    render() {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Clientes Cadastrados</h2>
                    <button 
                        className="btn btn-primary flex items-center"
                        onClick={() => {
                            this.props.selecionarItem(null);
                            this.props.seletorView('FormularioCliente');
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Novo Cliente
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {this.props.clientes.map(cliente => (
                        <div key={cliente.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{cliente.nome}</h3>
                                        {cliente.nomeSocial && (
                                            <p className="text-sm text-gray-500">Nome social: {cliente.nomeSocial}</p>
                                        )}
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {cliente.pets.length} pet(s)
                                    </span>
                                </div>
                                
                                <div className="mt-3 space-y-2">
                                    <p className="text-sm">
                                        <span className="font-medium">CPF:</span> {cliente.cpf.valor}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Telefones:</span> {cliente.telefones.length > 0 ? 
                                            cliente.telefones.map(t => `(${t.ddd}) ${t.numero}`).join(', ') : 
                                            'Não cadastrado'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
                                <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => {
                                        this.props.selecionarItem(cliente);
                                        this.props.seletorView('FormularioCliente');
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => this.props.onDelete(cliente.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button 
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => {
                                        this.props.selecionarItem(cliente);
                                        this.props.seletorView('RegistroConsumo');
                                    }}
                                >
                                    <i className="bi bi-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}