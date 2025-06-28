import React, { Component } from "react";
import AppLayout from "./AppLayout";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaProdutos from "./listaProdutos";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import ListaServicos from "./listaServicos";
import FormularioCadastroServico from "./formularioCadastroServico";
import ListagemTopClientes from "./listagemTopClientes";
import FormularioRegistroConsumo from "./formularioRegistroConsumo";
import ListagemGeralConsumidos from "./listagemGeralConsumidos";
import ListagemConsumidosPorPet from "./listagemConsumidosPorPet";
import { DADOS_INICIAIS, Cliente, Produto, Servico, Pet } from "../dados";

type State = {
    tela: string,
    clientes: Cliente[],
    produtos: Produto[],
    servicos: Servico[],
    itemSelecionado: Cliente | Produto | Servico | null
}

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: 'Clientes',
            clientes: DADOS_INICIAIS.clientes,
            produtos: DADOS_INICIAIS.produtos,
            servicos: DADOS_INICIAIS.servicos,
            itemSelecionado: null
        }
    }

    // Navigation methods
    selecionarView = (novaTela: string, evento?: React.MouseEvent) => {
        if (evento) evento.preventDefault();
        this.setState({ tela: novaTela, itemSelecionado: null });
    }

    selecionarItem = (item: Cliente | Produto | Servico | null) => {
        this.setState({ itemSelecionado: item });
    }

    // Client CRUD operations
    handleClienteSubmit = (cliente: Cliente) => {
        if (this.state.itemSelecionado) {
            this.atualizarCliente(cliente);
        } else {
            this.adicionarCliente(cliente);
        }
    }

    adicionarCliente = (cliente: Cliente) => {
        const novoCliente: Cliente = {
            ...cliente,
            id: Math.max(0, ...this.state.clientes.map(c => c.id)) + 1,
            pets: [], // Novo cliente começa sem pets e consumo
        };
        this.setState(prev => ({
            clientes: [...prev.clientes, novoCliente],
            tela: 'Clientes',
            itemSelecionado: null
        }));
    }

    atualizarCliente = (clienteAtualizado: Cliente) => {
        this.setState(prev => ({
            clientes: prev.clientes.map(c =>
                c.id === clienteAtualizado.id ? clienteAtualizado : c
            ),
            tela: 'Clientes',
            itemSelecionado: null
        }));
    }

    removerCliente = (id: number) => {
        this.setState(prev => ({
            clientes: prev.clientes.filter(c => c.id !== id)
        }));
    }

    // Product CRUD operations
    handleProdutoSubmit = (produto: Produto) => {
        if (produto.id > 0) { // Se tem um ID, está editando
            this.atualizarProduto(produto);
        } else { // Senão, está adicionando
            this.adicionarProduto(produto);
        }
    }

    adicionarProduto = (produto: Produto) => {
        const novoProduto: Produto = {
            ...produto,
            id: Math.max(0, ...this.state.produtos.map(p => p.id)) + 1
        };
        this.setState(prev => ({
            produtos: [...prev.produtos, novoProduto],
            tela: 'Produtos'
        }));
    }

    atualizarProduto = (produtoAtualizado: Produto) => {
        this.setState(prev => ({
            produtos: prev.produtos.map(p =>
                p.id === produtoAtualizado.id ? produtoAtualizado : p
            ),
            tela: 'Produtos',
            itemSelecionado: null
        }));
    }

    removerProduto = (id: number) => {
        this.setState(prev => ({
            produtos: prev.produtos.filter(p => p.id !== id)
        }));
    }

    // Service CRUD operations
    handleServicoSubmit = (servico: Servico) => {
        if (servico.id > 0) { // Se tem um ID, está editando
            this.atualizarServico(servico);
        } else { // Senão, está adicionando
            this.adicionarServico(servico);
        }
    }

    adicionarServico = (servico: Servico) => {
        const novoServico: Servico = {
            ...servico,
            id: Math.max(0, ...this.state.servicos.map(s => s.id)) + 1
        };
        this.setState(prev => ({
            servicos: [...prev.servicos, novoServico],
            tela: 'Servicos'
        }));
    }

    atualizarServico = (servicoAtualizado: Servico) => {
        this.setState(prev => ({
            servicos: prev.servicos.map(s =>
                s.id === servicoAtualizado.id ? servicoAtualizado : s
            ),
            tela: 'Servicos',
            itemSelecionado: null
        }));
    }

    removerServico = (id: number) => {
        this.setState(prev => ({
            servicos: prev.servicos.filter(s => s.id !== id)
        }));
    }

    // Consumption registration
    registrarConsumo = (clienteId: number, petId: number, produtosIds: number[], servicosIds: number[]) => {
        this.setState(prev => {
            const clientesAtualizados = prev.clientes.map(cliente => {
                if (cliente.id === clienteId) {
                    const clienteModificado: Cliente = {
                        ...cliente,
                        pets: cliente.pets.map(pet => {
                            if (pet.id === petId) {
                                const produtosParaAdicionar = produtosIds.map(id =>
                                    prev.produtos.find(p => p.id === id)!
                                );
                                const servicosParaAdicionar = servicosIds.map(id =>
                                    prev.servicos.find(s => s.id === id)!
                                );
                                return {
                                    ...pet,
                                    produtosConsumidos: [...pet.produtosConsumidos, ...produtosParaAdicionar],
                                    servicosConsumidos: [...pet.servicosConsumidos, ...servicosParaAdicionar],
                                };
                            }
                            return pet;
                        })
                    };
                    return clienteModificado;
                }
                return cliente;
            });
    
            return {
                clientes: clientesAtualizados,
                tela: 'Clientes'
            };
        });
    }

    render() {
        const barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} />;

            let conteudo;
        switch (this.state.tela) {
            case 'FormularioCliente':
                conteudo = <FormularioCadastroCliente
                    itemSelecionado={this.state.itemSelecionado as Cliente | null}
                    seletorView={this.selecionarView}
                    onSubmit={this.handleClienteSubmit}
                />;
                break;
            case 'Clientes':
                conteudo = <ListaCliente
                            clientes={this.state.clientes}
                            selecionarItem={this.selecionarItem}
                            seletorView={this.selecionarView}
                            onDelete={this.removerCliente}
                />;
                break;
            case 'FormularioProduto':
                conteudo = <FormularioCadastroProduto
                            itemSelecionado={this.state.itemSelecionado as Produto | null}
                            seletorView={this.selecionarView}
                            onSubmit={this.handleProdutoSubmit}
                />;
                break;
            case 'Produtos':
                conteudo = <ListaProdutos
                            produtos={this.state.produtos}
                            selecionarItem={this.selecionarItem}
                            seletorView={this.selecionarView}
                            onDelete={this.removerProduto}
                />;
                break;
            case 'FormularioServico':
                conteudo = <FormularioCadastroServico
                            itemSelecionado={this.state.itemSelecionado as Servico | null}
                            seletorView={this.selecionarView}
                            onSubmit={this.handleServicoSubmit}
                />;
                break;
            case 'Servicos':
                conteudo = <ListaServicos
                            servicos={this.state.servicos}
                            selecionarItem={this.selecionarItem}
                            seletorView={this.selecionarView}
                            onDelete={this.removerServico}
                />;
                break;
            case 'RegistroConsumo':
                conteudo = <FormularioRegistroConsumo
                            clientes={this.state.clientes}
                            produtos={this.state.produtos}
                            servicos={this.state.servicos}
                            seletorView={this.selecionarView}
                            registrarConsumo={this.registrarConsumo}
                />;
                break;
            case 'ListagemGeral':
                conteudo = <ListagemGeralConsumidos
                            clientes={this.state.clientes}
                            produtos={this.state.produtos}
                            servicos={this.state.servicos}
                />;
                break;
            case 'ListagemPorPet':
                conteudo = <ListagemConsumidosPorPet
                            clientes={this.state.clientes}
                />;
                break;
            case 'Listagens':
                conteudo = <ListagemTopClientes
                            clientes={this.state.clientes}
                />;
                break;
            default:
                conteudo = <ListaCliente
                    clientes={this.state.clientes}
                    selecionarItem={this.selecionarItem}
                    seletorView={this.selecionarView}
                    onDelete={this.removerCliente}
                />;
        }

        return <AppLayout>{conteudo}</AppLayout>;

    }
}