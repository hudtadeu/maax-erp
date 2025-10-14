export interface Estabel {
    'cidade': string;
    'estado': string;
    'r-Rowid': string;
    'cod-estabel': string;
    'nome': string;
    'ep-codigo': string;
}

export interface GetEstabelResponse {
    data: Estabel[];
    length: number;
    messages: unknown[];
}
