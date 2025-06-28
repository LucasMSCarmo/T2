// barraNavegacao.tsx (atualizado)
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    seletorView: (valor: string, evento?: React.MouseEvent) => void;
}

export default class BarraNavegacao extends Component<Props> {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                <div className="container-fluid">
                    <span className="navbar-brand d-flex align-items-center font-bold text-xl">
                        <i className="bi bi-heart-pulse-fill me-2"></i>
                        PetLovers
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item mx-1">
                                <a className="nav-link hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-200 flex items-center" 
                                   href="#" onClick={(e) => this.props.seletorView('Clientes', e)}>
                                    <i className="bi bi-people-fill me-2"></i>Clientes
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a className="nav-link hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-200 flex items-center" 
                                   href="#" onClick={(e) => this.props.seletorView('Produtos', e)}>
                                    <i className="bi bi-box-seam-fill me-2"></i>Produtos
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a className="nav-link hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-200 flex items-center" 
                                   href="#" onClick={(e) => this.props.seletorView('Servicos', e)}>
                                    <i className="bi bi-scissors me-2"></i>Serviços
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a className="nav-link hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-200 flex items-center" 
                                   href="#" onClick={(e) => this.props.seletorView('RegistroConsumo', e)}>
                                    <i className="bi bi-cart-plus-fill me-2"></i>Registrar Consumo
                                </a>
                            </li>
                            <li className="nav-item dropdown mx-1">
                                <a className="nav-link hover:bg-blue-700 px-3 py-2 rounded-md transition-all duration-200 flex items-center dropdown-toggle" 
                                   href="#" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-graph-up me-2"></i>Relatórios
                                </a>
                                <ul className="dropdown-menu shadow-lg rounded-md border-0">
                                    <li><a className="dropdown-item hover:bg-blue-50 rounded-md" href="#" onClick={(e) => this.props.seletorView('Listagens', e)}>Top Clientes</a></li>
                                    <li><a className="dropdown-item hover:bg-blue-50 rounded-md" href="#" onClick={(e) => this.props.seletorView('ListagemGeral', e)}>Mais Consumidos</a></li>
                                    <li><a className="dropdown-item hover:bg-blue-50 rounded-md" href="#" onClick={(e) => this.props.seletorView('ListagemPorPet', e)}>Consumo por Pet</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}