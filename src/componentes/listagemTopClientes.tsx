// listagemTopClientes.tsx (atualizado)
import { Component } from "react";
import { Cliente } from "../dados";

type props = {
    clientes: Cliente[]
}

export default class ListagemTopClientes extends Component<props> {
    // ... (mantemos a lógica existente)

    render() {
        // Mapeia os clientes para um novo array que inclui os totais e valores calculados
        const clientesComTotais = this.props.clientes.map(cliente => {
            const totalProdutos = cliente.pets.reduce((acc, pet) => acc + pet.produtosConsumidos.length, 0);
            const totalServicos = cliente.pets.reduce((acc, pet) => acc + pet.servicosConsumidos.length, 0);
            
            const valorProdutos = cliente.pets.reduce((acc, pet) => 
                acc + pet.produtosConsumidos.reduce((subAcc, p) => subAcc + p.preco, 0), 0);
            
            const valorServicos = cliente.pets.reduce((acc, pet) => 
                acc + pet.servicosConsumidos.reduce((subAcc, s) => subAcc + s.preco, 0), 0);
            
            return {
                ...cliente,
                totalProdutos,
                totalServicos,
                valorProdutos, // Valor apenas de produtos
                valorServicos  // Valor apenas de serviços
            }
        });

        // --- Classificação por Quantidade ---
        const topClientesPorQuantidadeProdutos = [...clientesComTotais].sort((a, b) => b.totalProdutos - a.totalProdutos).slice(0, 10);
        const topClientesPorQuantidadeServicos = [...clientesComTotais].sort((a, b) => b.totalServicos - a.totalServicos).slice(0, 10);
        
        // --- Classificação por Valor (separadamente) ---
        const topClientesPorValorProdutos = [...clientesComTotais].sort((a, b) => b.valorProdutos - a.valorProdutos).slice(0, 5);
        const topClientesPorValorServicos = [...clientesComTotais].sort((a, b) => b.valorServicos - a.valorServicos).slice(0, 5);

        return (
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Relatórios de Clientes</h1>
                    <p className="text-gray-600 mt-2">Análise dos melhores clientes por consumo</p>
                </div>

                {/* Top por Quantidade */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                        <h2 className="text-xl font-bold flex items-center">
                            <i className="bi bi-trophy-fill me-3"></i>
                            Top 10 Clientes por Quantidade Consumida
                        </h2>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Produtos */}
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-center mb-4 text-blue-600">
                                    <i className="bi bi-box-seam-fill me-2"></i>Produtos
                                </h3>
                                <div className="space-y-3">
                                    {topClientesPorQuantidadeProdutos.map((cliente, index) => (
                                        <div key={cliente.id} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-md transition-colors">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 mr-3">{index + 1}º</span>
                                                <span>{cliente.nome}</span>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {cliente.totalProdutos} itens
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Serviços */}
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-center mb-4 text-green-600">
                                    <i className="bi bi-scissors me-2"></i>Serviços
                                </h3>
                                <div className="space-y-3">
                                    {topClientesPorQuantidadeServicos.map((cliente, index) => (
                                        <div key={cliente.id} className="flex items-center justify-between p-3 hover:bg-green-50 rounded-md transition-colors">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 mr-3">{index + 1}º</span>
                                                <span>{cliente.nome}</span>
                                            </div>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {cliente.totalServicos} serviços
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top por Valor */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                    <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 text-white">
                        <h2 className="text-xl font-bold flex items-center">
                            <i className="bi bi-currency-dollar me-3"></i>
                            Top 5 Clientes por Valor Gasto
                        </h2>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Produtos */}
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-center mb-4 text-blue-600">
                                    <i className="bi bi-box-seam-fill me-2"></i>Produtos
                                </h3>
                                <div className="space-y-3">
                                    {topClientesPorValorProdutos.map((cliente, index) => (
                                        <div key={cliente.id} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-md transition-colors">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 mr-3">{index + 1}º</span>
                                                <span>{cliente.nome}</span>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                R$ {cliente.valorProdutos.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Serviços */}
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-center mb-4 text-green-600">
                                    <i className="bi bi-scissors me-2"></i>Serviços
                                </h3>
                                <div className="space-y-3">
                                    {topClientesPorValorServicos.map((cliente, index) => (
                                        <div key={cliente.id} className="flex items-center justify-between p-3 hover:bg-green-50 rounded-md transition-colors">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 mr-3">{index + 1}º</span>
                                                <span>{cliente.nome}</span>
                                            </div>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                R$ {cliente.valorServicos.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}