import { Component } from "react";
import { Cliente } from "../dados"; 

type Props = {
    clientes: Cliente[];
};

type ConsumoPorPet = {
    tipo: string;
    raca: string;
    itens: Array<{
        nome: string;
        quantidade: number;
    }>;
};

export default class ListagemConsumidosPorPet extends Component<Props> {

    calcularConsumoPorPet(): ConsumoPorPet[] {
        const consumoAgregado: Record<string, Record<string, Record<string, number>>> = {};

        // Itera sobre clientes, depois pets
        this.props.clientes.forEach(cliente => {
            cliente.pets.forEach(pet => {
                // Garante que as chaves existem
                if (!consumoAgregado[pet.tipo]) consumoAgregado[pet.tipo] = {};
                if (!consumoAgregado[pet.tipo][pet.raca]) consumoAgregado[pet.tipo][pet.raca] = {};

                // Conta os produtos consumidos pelo pet
                pet.produtosConsumidos.forEach(produto => {
                    consumoAgregado[pet.tipo][pet.raca][produto.nome] = 
                        (consumoAgregado[pet.tipo][pet.raca][produto.nome] || 0) + 1;
                });

                // Conta os serviços consumidos pelo pet
                pet.servicosConsumidos.forEach(servico => {
                    consumoAgregado[pet.tipo][pet.raca][servico.nome] = 
                        (consumoAgregado[pet.tipo][pet.raca][servico.nome] || 0) + 1;
                });
            });
        });

        // Transforma o objeto agregado em um array para renderização
        return Object.entries(consumoAgregado).flatMap(([tipo, racas]) =>
            Object.entries(racas).map(([raca, itens]) => ({
                tipo,
                raca,
                itens: Object.entries(itens).map(([nome, quantidade]) => ({
                    nome,
                    quantidade
                })).sort((a, b) => b.quantidade - a.quantidade)
            }))
        );
    }

    render() {
        const consumoPorPet = this.calcularConsumoPorPet();

        return (
            <div className="container-fluid">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="m-0">Listagem de Consumo por Tipo e Raça de Pet</h5>
                    </div>
                    <div className="card-body">
                        {consumoPorPet.length === 0 ? (
                            <div className="alert alert-info">Nenhum consumo registrado.</div>
                        ) : (
                            <div className="accordion" id="consumoPorPetAccordion">
                                {consumoPorPet.map((item, index) => (
                                    <div key={`${item.tipo}-${item.raca}`} className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${index}`}
                                            >
                                                <span className="badge bg-secondary me-2">{item.tipo}</span>
                                                {item.raca}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${index}`}
                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                            data-bs-parent="#consumoPorPetAccordion"
                                        >
                                            <div className="accordion-body">
                                                <ul className="list-group">
                                                    {item.itens.map((consumo, idx) => (
                                                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                                            {consumo.nome}
                                                            <span className="badge bg-primary rounded-pill">
                                                                {consumo.quantidade}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}