import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type props = {
    tema: string;
    seletorView: (novaTela: string, evento: React.MouseEvent) => void;
    onAbrirCadastroPet: () => void;
}


export default class BarraNavegacao extends Component<props> {
    render() {
        const { tema, seletorView, onAbrirCadastroPet } = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: tema }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <i className="bi bi-heart-fill me-2"></i>
                        PetLovers
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={(e) => seletorView('Clientes', e)}>
                                    <i className="bi bi-people-fill me-1"></i>
                                    Clientes & Pets
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={(e) => seletorView('Catálogo', e)}>
                                    <i className="bi bi-journal-album me-1"></i>
                                    Catálogo
                                </a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownRelatorios" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-file-earmark-bar-graph-fill me-1"></i>
                                    Relatórios
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownRelatorios">
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView('RelatoriosConsumo', e)}>
                                            <i className="bi bi-graph-up-arrow me-2"></i>
                                            Top 10 Consumidores
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView('RelatorioMaisConsumidos', e)}>
                                            <i className="bi bi-star-fill me-2"></i>
                                            Itens Mais Consumidos
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView('RelatorioConsumoPets', e)}>
                                            <i className="bi bi-pie-chart-fill me-2"></i>
                                            Consumo por Tipo e Raça
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView('RelatorioTopValor', e)}>
                                            <i className="bi bi-trophy-fill me-2"></i>
                                            Top 5 Clientes (Valor)
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-file-earmark-plus me-1"></i>
                                    Cadastros
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView('Cadastrar Cliente', e)}>
                                            <i className="bi bi-person-plus me-2"></i>
                                            Cliente
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={onAbrirCadastroPet}>
                                            <i className="bi bi-heart me-2"></i>
                                            Pet
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView('Cadastrar Produto', e)}>
                                            <i className="bi bi-cart-plus me-2"></i>
                                            Produto
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => seletorView('Cadastrar Serviço', e)}>
                                            <i className="bi bi-scissors me-2"></i>
                                            Serviço
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}