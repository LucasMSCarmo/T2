import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import DetalhesCliente from "./detalhesCliente";
import FormularioCadastroPet from "./formularioCadastroPet";
import FormularioEdicaoCliente from "./formularioEdicaoCliente";
import FormularioEdicaoPet from "./formularioEdicaoPet";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import FormularioCadastroServico from "./formularioCadastroServico";
import Catalogo from "./catalogo";
import FormularioEdicaoProduto from "./formularioEdicaoProduto";
import FormularioEdicaoServico from "./formularioEdicaoServico";
import RelatorioTopConsumidores from "./relatoriosTopConsumidores";
import RelatorioMaisConsumidos from "./relatorioMaisConsumidos";
import RelatorioConsumoPets from "./relatorioConsumoPets";
import RelatorioTopValor from "./relatorioTopValor";
import FormularioRegistroCompra from "./formularioRegistroCompra";
import { clientes, produtos, servicos } from "./dados";
import { Cliente, Pet, Produto, Servico } from "./dados";

type State = {
    tela: string;
    clientes: typeof clientes;
    produtos: typeof produtos;
    servicos: typeof servicos;
    clienteSelecionado: typeof clientes[0] | null;
    origemCadastroPet: 'detalhes' | 'menu' | null;
    petSelecionadoParaEdicao: Pet | null;
    produtoSelecionadoParaEdicao: Produto | null;
    servicoSelecionadoParaEdicao: Servico | null;
    telaAnterior: string;
    registrarCompra: boolean;
}

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: 'Clientes',
            clientes,
            produtos,
            servicos,
            clienteSelecionado: null,
            origemCadastroPet: null,
            petSelecionadoParaEdicao: null,
            produtoSelecionadoParaEdicao: null,
            servicoSelecionadoParaEdicao: null,
            telaAnterior: 'Clientes',
            registrarCompra: false
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.editarCliente = this.editarCliente.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this);
        this.mostrarDetalhesCliente = this.mostrarDetalhesCliente.bind(this);
        this.fecharDetalhes = this.fecharDetalhes.bind(this);
        this.adicionarPet = this.adicionarPet.bind(this);
        this.excluirPet = this.excluirPet.bind(this);
        this.iniciarEdicaoPet = this.iniciarEdicaoPet.bind(this);
        this.salvarEdicaoPet = this.salvarEdicaoPet.bind(this);
        this.cancelarEdicaoPet = this.cancelarEdicaoPet.bind(this);
        this.adicionarProduto = this.adicionarProduto.bind(this);
        this.adicionarServico = this.adicionarServico.bind(this);
        this.iniciarEdicaoProduto = this.iniciarEdicaoProduto.bind(this);
        this.cancelarEdicaoProduto = this.cancelarEdicaoProduto.bind(this);
        this.salvarEdicaoProduto = this.salvarEdicaoProduto.bind(this);
        this.excluirProduto = this.excluirProduto.bind(this);
        this.iniciarEdicaoServico = this.iniciarEdicaoServico.bind(this);
        this.cancelarEdicaoServico = this.cancelarEdicaoServico.bind(this);
        this.salvarEdicaoServico = this.salvarEdicaoServico.bind(this);
        this.excluirServico = this.excluirServico.bind(this);
        this.fecharDetalhes = this.fecharDetalhes.bind(this);
        this.registrarCompra = this.registrarCompra.bind(this);
    }

    registrarCompra = (cliente: Cliente, petNome: string, produtos: { produto: Produto, quantidade: number }[], servicos: Servico[]) => {
        const dataAtual = new Date();

        this.setState(prevState => {
            const clientesAtualizados = prevState.clientes.map(c => {
                if (c.email === cliente.email) {
                    const petsAtualizados = c.pets.map(pet => {
                        if (pet.nome === petNome) {
                            const novosProdutos = produtos.map(p => ({
                                produto: p.produto,
                                quantidade: p.quantidade,
                                data: dataAtual
                            }));

                            const novosServicos = servicos.map(s => ({
                                servico: s,
                                data: dataAtual
                            }));

                            return {
                                ...pet,
                                produtosConsumidos: [...pet.produtosConsumidos, ...novosProdutos],
                                servicosConsumidos: [...pet.servicosConsumidos, ...novosServicos]
                            };
                        }
                        return pet;
                    });

                    return {
                        ...c,
                        pets: petsAtualizados
                    };
                }
                return c;
            });

            return {
                clientes: clientesAtualizados,
                tela: 'Clientes'
            };
        });
    };

    selecionarView(novaTela: string, evento: React.MouseEvent) {
        evento.preventDefault();
        this.setState({
            tela: novaTela,
            clienteSelecionado: null
        });
    }

    mostrarDetalhesCliente(cliente: Cliente) {
        this.setState({
            telaAnterior: this.state.tela,
            tela: 'Detalhes Cliente',
            clienteSelecionado: cliente
        });
    }

    fecharDetalhes() {
        this.setState({
            tela: this.state.telaAnterior,
            clienteSelecionado: null
        });
    }

    adicionarCliente(novoCliente: typeof clientes[0]) {
        this.setState(prevState => ({
            clientes: [...prevState.clientes, novoCliente],
            tela: 'Clientes'
        }));
    }

    editarCliente(clienteEditado: typeof clientes[0]) {
        this.setState(prevState => ({
            clientes: prevState.clientes.map(c =>
                c.email === prevState.clienteSelecionado?.email ? clienteEditado : c
            ),
            tela: 'Clientes'
        }));
    }

    excluirCliente(cliente: typeof clientes[0]) {
        if (window.confirm(`Tem certeza que deseja excluir ${cliente.nome}?`)) {
            this.setState(prevState => ({
                clientes: prevState.clientes.filter(c => c !== cliente),
                tela: 'Clientes'
            }));
        }
    }

    adicionarPet = (cliente: typeof clientes[0] | null, novoPet: any) => {
        if (!cliente) {
            alert("Ocorreu um erro: Nenhum cliente foi associado ao pet.");
            return;
        }

        this.setState(prevState => {
            const clientesAtualizados = prevState.clientes.map(c => {
                if (c.email === cliente.email) {
                    return {
                        ...c,
                        pets: [...c.pets, novoPet]
                    };
                }
                return c;
            });

            const clienteAtualizado = clientesAtualizados.find(c => c.email === cliente.email) || null;

            return {
                clientes: clientesAtualizados,
                tela: 'Detalhes Cliente',
                clienteSelecionado: clienteAtualizado
            };
        });
    }

    abrirCadastroPet = (origem: 'detalhes' | 'menu', cliente?: typeof clientes[0]) => {
        this.setState({
            tela: 'Cadastrar Pet',
            clienteSelecionado: cliente || null,
            origemCadastroPet: origem
        });
    }

    excluirPet(clienteAlvo: Cliente, petParaExcluir: Pet) {
        if (!window.confirm(`Tem certeza que deseja excluir o pet ${petParaExcluir.nome}?`)) {
            return;
        }

        this.setState(prevState => {
            const clientesAtualizados = prevState.clientes.map(cliente => {
                if (cliente.email === clienteAlvo.email) {
                    const petsAtualizados = cliente.pets.filter(pet => pet !== petParaExcluir);
                    return { ...cliente, pets: petsAtualizados };
                }
                return cliente;
            });

            return {
                clientes: clientesAtualizados,
                clienteSelecionado: clientesAtualizados.find(c => c.email === clienteAlvo.email) || null
            };
        });
    }

    salvarEdicaoPet(petAtualizado: Pet) {
        this.setState(prevState => {
            if (!prevState.clienteSelecionado || !prevState.petSelecionadoParaEdicao) {
                return null;
            }

            const petOriginal = prevState.petSelecionadoParaEdicao;
            const clienteAlvo = prevState.clienteSelecionado;

            const clientesAtualizados = prevState.clientes.map(cliente => {
                if (cliente.email === clienteAlvo.email) {
                    const petsAtualizados = cliente.pets.map(pet =>
                        pet === petOriginal ? petAtualizado : pet
                    );
                    return { ...cliente, pets: petsAtualizados };
                }
                return cliente;
            });

            return {
                clientes: clientesAtualizados,
                clienteSelecionado: clientesAtualizados.find(c => c.email === clienteAlvo.email) || null,
                petSelecionadoParaEdicao: null
            };
        });
    }

    iniciarEdicaoPet(pet: Pet) {
        this.setState({ petSelecionadoParaEdicao: pet });
    }

    cancelarEdicaoPet() {
        this.setState({ petSelecionadoParaEdicao: null });
    }

    adicionarProduto(novoProduto: typeof produtos[0]) {
        this.setState(prevState => ({
            produtos: [...prevState.produtos, novoProduto],
            tela: 'Catálogo'
        }));
    }

    adicionarServico(novoServico: typeof servicos[0]) {
        this.setState(prevState => ({
            servicos: [...prevState.servicos, novoServico],
            tela: 'Catálogo'
        }));
    }

    iniciarEdicaoProduto(produto: Produto) {
        this.setState({ produtoSelecionadoParaEdicao: produto });
    }

    cancelarEdicaoProduto() {
        this.setState({ produtoSelecionadoParaEdicao: null });
    }

    excluirProduto(produtoParaExcluir: Produto) {
        if (window.confirm(`Tem certeza que deseja excluir o produto ${produtoParaExcluir.nome}?`)) {
            this.setState(prevState => ({
                produtos: prevState.produtos.filter(p => p !== produtoParaExcluir)
            }));
        }
    }

    iniciarEdicaoServico(servico: Servico) {
        this.setState({ servicoSelecionadoParaEdicao: servico });
    }

    cancelarEdicaoServico() {
        this.setState({ servicoSelecionadoParaEdicao: null });
    }

    excluirServico(servicoParaExcluir: Servico) {
        if (window.confirm(`Tem certeza que deseja excluir o serviço ${servicoParaExcluir.nome}?`)) {
            this.setState(prevState => ({
                servicos: prevState.servicos.filter(s => s !== servicoParaExcluir)
            }));
        }
    }

    salvarEdicaoProduto(produtoAtualizado: Produto) {
        const produtoOriginal = this.state.produtoSelecionadoParaEdicao;
        if (!produtoOriginal) return;

        const produtosAtualizados = this.state.produtos.map(p => {
            if (p.nome === produtoOriginal.nome) {
                return produtoAtualizado;
            } else {
                return p;
            }
        });

        this.setState({
            produtos: produtosAtualizados,
            produtoSelecionadoParaEdicao: null
        });
    }

    salvarEdicaoServico(servicoAtualizado: Servico) {
        const servicoOriginal = this.state.servicoSelecionadoParaEdicao;
        if (!servicoOriginal) return;

        const servicosAtualizados = this.state.servicos.map(s => {
            if (s.nome === servicoOriginal.nome) {
                return servicoAtualizado;
            } else {
                return s;
            }
        });

        this.setState({
            servicos: servicosAtualizados,
            servicoSelecionadoParaEdicao: null
        });
    }

    render() {
        const { tela, clientes, clienteSelecionado } = this.state;

        return (
            <>
                <BarraNavegacao
                    seletorView={this.selecionarView}
                    onAbrirCadastroPet={() => this.abrirCadastroPet('menu')}
                    tema="#6c757d"
                />

                <div className="container mt-4">

                    {tela === 'Clientes' && (
                        <ListaCliente
                            tema="#6c757d"
                            clientes={clientes}
                            onDetalhes={(cliente) => this.mostrarDetalhesCliente(cliente)}
                            onEditar={(cliente) => {
                                this.setState({
                                    tela: 'Editar Cliente',
                                    clienteSelecionado: cliente
                                });
                            }}
                            onExcluir={this.excluirCliente}
                        />
                    )}

                    {tela === 'Cadastrar Cliente' && (
                        <FormularioCadastroCliente
                            tema="#6c757d"
                            onSubmit={this.adicionarCliente}
                        />
                    )}

                    {tela === 'Editar Cliente' && clienteSelecionado && (
                        <FormularioEdicaoCliente
                            cliente={clienteSelecionado}
                            tema="#6c757d"
                            onFechar={() => this.setState({ tela: 'Clientes' })}
                            onSalvar={this.editarCliente}
                        />
                    )}

                    {tela === 'Detalhes Cliente' && clienteSelecionado && (
                        <DetalhesCliente
                            cliente={clienteSelecionado}
                            tema="#6c757d"
                            onFechar={this.fecharDetalhes}
                            onCadastrarPet={() => this.abrirCadastroPet('detalhes', clienteSelecionado)}
                            onExcluirPet={(pet) => this.excluirPet(clienteSelecionado, pet)}
                            onIniciarEdicaoPet={this.iniciarEdicaoPet}
                        />
                    )}

                    {tela === 'Detalhes Cliente' && clienteSelecionado && (
                        <>
                            <DetalhesCliente
                                cliente={clienteSelecionado}
                                tema="#6c757d"
                                onFechar={this.fecharDetalhes}
                                onCadastrarPet={() => this.abrirCadastroPet('detalhes', clienteSelecionado)}
                                onExcluirPet={(pet) => this.excluirPet(clienteSelecionado, pet)}
                                onIniciarEdicaoPet={this.iniciarEdicaoPet}
                            />
                            {this.state.petSelecionadoParaEdicao && (
                                <FormularioEdicaoPet
                                    tema="#6c757d"
                                    pet={this.state.petSelecionadoParaEdicao}
                                    onSalvar={this.salvarEdicaoPet}
                                    onCancelar={this.cancelarEdicaoPet}
                                />
                            )}
                        </>
                    )}

                    {tela === 'Cadastrar Pet' && (
                        <FormularioCadastroPet
                            tema="#6c757d"
                            cliente={clienteSelecionado}
                            clientes={clientes}
                            onSubmit={this.adicionarPet}
                            onCancelar={() => this.setState({
                                tela: this.state.origemCadastroPet === 'detalhes'
                                    ? 'Detalhes Cliente'
                                    : 'Clientes'
                            })}
                        />
                    )}

                    {tela === 'Cadastrar Produto' && (
                        <FormularioCadastroProduto
                            tema="#6c757d"
                            onSubmit={this.adicionarProduto}
                        />
                    )}

                    {tela === 'Cadastrar Serviço' && (
                        <FormularioCadastroServico
                            tema="#6c757d"
                            onSubmit={this.adicionarServico}
                        />
                    )}

                    {tela === 'Catálogo' && (
                        <Catalogo
                            tema="#6c757d"
                            produtos={this.state.produtos}
                            servicos={this.state.servicos}
                            onEditarProduto={this.iniciarEdicaoProduto}
                            onExcluirProduto={this.excluirProduto}
                            onEditarServico={this.iniciarEdicaoServico}
                            onExcluirServico={this.excluirServico}
                        />
                    )}

                    {this.state.produtoSelecionadoParaEdicao && (
                        <FormularioEdicaoProduto
                            tema="#6c757d"
                            produto={this.state.produtoSelecionadoParaEdicao}
                            onSalvar={this.salvarEdicaoProduto}
                            onCancelar={this.cancelarEdicaoProduto}
                        />
                    )}

                    {this.state.servicoSelecionadoParaEdicao && (
                        <FormularioEdicaoServico
                            tema="#6c757d"
                            servico={this.state.servicoSelecionadoParaEdicao}
                            onSalvar={this.salvarEdicaoServico}
                            onCancelar={this.cancelarEdicaoServico}
                        />
                    )}

                    {tela === 'RelatoriosConsumo' && (
                        <RelatorioTopConsumidores
                            tema="#6c757d"
                            clientes={this.state.clientes}
                            onClienteSelect={this.mostrarDetalhesCliente}
                        />
                    )}

                    {tela === 'RelatorioMaisConsumidos' && (
                        <RelatorioMaisConsumidos
                            tema="#6c757d"
                            clientes={this.state.clientes}
                        />
                    )}

                    {tela === 'RelatorioConsumoPets' && (
                        <RelatorioConsumoPets
                            tema="#6c757d"
                            clientes={this.state.clientes}
                        />
                    )}

                    {tela === 'RelatorioTopValor' && (
                        <RelatorioTopValor
                            tema="#6c757d"
                            clientes={this.state.clientes}
                            onClienteSelect={this.mostrarDetalhesCliente}
                        />
                    )}

                    {tela === 'Registrar Compra' && (
                        <FormularioRegistroCompra
                            tema="#6c757d"
                            clientes={clientes}
                            produtos={produtos}
                            servicos={servicos}
                            onSubmit={this.registrarCompra}
                            onCancelar={() => this.setState({ tela: 'Clientes' })}
                        />
                    )}
                </div>
            </>
        );
    }
}