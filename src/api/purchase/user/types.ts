export interface UserExtraInfo {
    'desc-moeda': string;
    'desc-preco': string;
}

export interface User {
    'nome-abrev': string;
    'r-rowid': string;
    telefone: string[];
    'sc-codigo': string;
    'limite-requis': number;
    'tp-preco': number;
    nome: string;
    ramal: string[];
    '': UserExtraInfo;
}

export interface GetUsersResponse {
    data: User[];
    length: number;
    messages: unknown[];
}
