// src/dados.ts

// Tipos base
export type CPF = { valor: string; dataEmissao: Date; };
export type RG = { valor: string; dataEmissao: Date; };
export type Telefone = { ddd: string; numero: string; };
export type Produto = { id: number; nome: string; preco: number; };
export type Servico = { id: number; nome: string; preco: number; };

// Estrutura de Tipos Final
export type Pet = { 
    id: number; 
    nome: string; 
    raca: string; 
    genero: string; 
    tipo: string; 
    // Consumo é agora parte do Pet
    produtosConsumidos: Produto[];
    servicosConsumidos: Servico[];
};

export type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: CPF;
    rgs: RG[];
    telefones: Telefone[];
    pets: Pet[]; // A lista de pets agora contém o consumo
};

// --- DADOS EXPANDIDOS (REESTRUTURADOS) ---

// -- Produtos e Serviços --
let produtos: Produto[] = [
    { id: 1, nome: "Ração Premium Cães", preco: 150.00 },
    { id: 2, nome: "Shampoo Antipulgas", preco: 45.50 },
    { id: 3, nome: "Brinquedo Bolinha", preco: 25.00 },
    { id: 4, nome: "Arranhador para Gatos", preco: 80.00 },
    { id: 5, nome: "Ração Úmida Gatos (Sachê)", preco: 7.50 },
    { id: 6, nome: "Osso de Nylon", preco: 35.00 },
    { id: 7, nome: "Antipulgas e Carrapatos (Pipeta)", preco: 89.90 },
    { id: 8, nome: "Cama Aconchegante", preco: 120.00 },
];

let servicos: Servico[] = [
    { id: 1, nome: "Banho e Tosa", preco: 90.00 },
    { id: 2, nome: "Consulta Veterinária", preco: 120.00 },
    { id: 3, nome: "Vacina V10", preco: 180.00 },
    { id: 4, nome: "Adestramento Básico", preco: 300.00 },
    { id: 5, nome: "Hidratação de Pelo", preco: 50.00 },
    { id: 6, nome: "Corte de Unhas", preco: 30.00 },
    { id: 7, nome: "Consulta com Especialista", preco: 250.00 },
    { id: 8, nome: "Limpeza de Tártaro", preco: 400.00 },
];


// -- Clientes (com dados de consumo dentro de cada pet) --
let clientes: Cliente[] = [
    { // Cliente 1: Consumidor equilibrado
        id: 1, nome: "João da Silva", nomeSocial: "Jô", cpf: { valor: '111.111.111-11', dataEmissao: new Date() },
        rgs: [{ valor: '1234567', dataEmissao: new Date() }], telefones: [{ ddd: '11', numero: '987654321' }],
        pets: [ 
            { 
                id: 1, nome: "Rex", raca: "Golden Retriever", genero: "Macho", tipo: "Cachorro",
                produtosConsumidos: [produtos[0], produtos[0], produtos[1], produtos[6]],
                servicosConsumidos: [servicos[0], servicos[4]]
            } 
        ],
    },
    { // Cliente 2: Foco em serviços
        id: 2, nome: "Maria Oliveira", nomeSocial: "Maria", cpf: { valor: '222.222.222-22', dataEmissao: new Date() },
        rgs: [], telefones: [{ ddd: '12', numero: '912345678' }],
        pets: [
            {
                id: 3, nome: "Toby", raca: "Poodle", genero: "Macho", tipo: "Cachorro",
                produtosConsumidos: [produtos[2]],
                servicosConsumidos: [servicos[0], servicos[0], servicos[1], servicos[5], servicos[5]]
            }
        ],
    },
    { // Cliente 3: "Gateira", foco em produtos para gatos
        id: 3, nome: "Carla Pereira", nomeSocial: "Carlinhos", cpf: { valor: '333.333.333-33', dataEmissao: new Date() },
        rgs: [], telefones: [],
        pets: [ 
            { 
                id: 2, nome: "Mimi", raca: "Siamês", genero: "Fêmea", tipo: "Gato",
                produtosConsumidos: [produtos[3], produtos[4], produtos[4]],
                servicosConsumidos: [servicos[1]]
            }, 
            { 
                id: 4, nome: "Frajola", raca: "SRD", genero: "Macho", tipo: "Gato",
                produtosConsumidos: [produtos[4], produtos[4], produtos[4]],
                servicosConsumidos: []
            } 
        ],
    },
    { // Cliente 4: Cliente de alto valor (serviços caros)
        id: 4, nome: "Pedro Martins", nomeSocial: "Pedro", cpf: { valor: '444.444.444-44', dataEmissao: new Date() },
        rgs: [], telefones: [],
        pets: [
            {
                id: 5, nome: "Brutus", raca: "Bulldog", genero: "Macho", tipo: "Cachorro",
                produtosConsumidos: [produtos[7]],
                servicosConsumidos: [servicos[6], servicos[7]]
            }
        ],
    },
    { // Cliente 5: Novo cliente, pouco consumo
        id: 5, nome: "Ana Costa", nomeSocial: "Ana", cpf: { valor: '555.555.555-55', dataEmissao: new Date() },
        rgs: [], telefones: [],
        pets: [],
    },
    { // Cliente 6: Consumidor de muitos produtos baratos
        id: 6, nome: "Lucas Almeida", nomeSocial: "Lucas", cpf: { valor: '666.666.666-66', dataEmissao: new Date() },
        rgs: [], telefones: [],
        pets: [
            {
                id: 6, nome: "Pipoca", raca: "Lulu da Pomerânia", genero: "Fêmea", tipo: "Cachorro",
                produtosConsumidos: [produtos[2], produtos[2], produtos[4], produtos[4], produtos[5], produtos[5], produtos[5]],
                servicosConsumidos: [servicos[5]]
            }
        ],
    },
    { // Cliente 7: Apenas um serviço, mas caro
        id: 7, nome: "Fernanda Lima", nomeSocial: "Fê", cpf: { valor: '777.777.777-77', dataEmissao: new Date() },
        rgs: [], telefones: [],
        pets: [
            {
                id: 7, nome: "Thor", raca: "Pastor Alemão", genero: "Macho", tipo: "Cachorro",
                produtosConsumidos: [],
                servicosConsumidos: [servicos[3]]
            }
        ],
    },
     { // Cliente 8: Cliente fiel de banho e tosa
        id: 8, nome: "Beatriz Santos", nomeSocial: "Bia", cpf: { valor: '888.888.888-88', dataEmissao: new Date() },
        rgs: [], telefones: [],
        pets: [
            {
                id: 8, nome: "Mel", raca: "Shih Tzu", genero: "Fêmea", tipo: "Cachorro",
                produtosConsumidos: [produtos[1]],
                servicosConsumidos: [servicos[0], servicos[0], servicos[0], servicos[0], servicos[0]]
            }
        ],
    }
];

export const DADOS_INICIAIS = {
    clientes,
    produtos,
    servicos
};