import axios from 'axios';
import { GetUsersResponse } from './types';

const BASE_URL = 'https://totvs.conticonsultoria.com.br/dts/datasul-rest/resources/dbo/inbo/boin386';

export async function getUsers(usuario: string, senha: string): Promise<GetUsersResponse> {
    const response = await axios.get<GetUsersResponse>(
        `${BASE_URL}?fields=nome-abrev,nome,limite-requis,tp-preco,sc-codigo,telefone,ramal&limit=100`,
        {
            auth: {
                username: usuario,
                password: senha,
            },
        }
    );
    return response.data;
}
