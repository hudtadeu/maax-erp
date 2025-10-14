export interface EnableField {
    tabela: string;
    habilitado: boolean;
    campo: string;
}

export interface RequestDefault {
    estado: number;
    situacao: number;
    'dt-requisicao': number;
    'cod-estabel': string;
    'loc-entrega': string;
    nome: string;
    'situacao-desc': string;
    'nome-abrev': string;
    'nr-requisicao': number;
    'nome-aprov': string;
    'dt-atend': number | null;
    impressa: number;
    'dt-devol': number | null;
    'estado-desc': string;
    'tp-requis': number
    'impressa-desc': string;
    narrativa: string;
    'nome-abrev-desc': string;
    'tp-requis-desc': string;
}

export interface GetDefaultsData {
    ttEnableFields: EnableField[];
    ttRequestDefault: RequestDefault[];
}

export interface GetDefaultsResponse {
    data: GetDefaultsData;
    length: number | null;
    messages: unknown[];
}
