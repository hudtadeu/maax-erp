import axios from 'axios';
import { GetEstabelResponse } from './types';

const BASE_URL = 'https://totvs.conticonsultoria.com.br/dts/datasul-rest/resources/dbo/adbo/boad107na';

export async function getEstabel(usuario: string, senha: string): Promise<GetEstabelResponse> {
    const response = await axios.get<GetEstabelResponse>(
        `${BASE_URL}?fields=cod-estabel,nome,cidade,estado,ep-codigo&limit=50`,
        {
            auth: {
                username: usuario,
                password: senha,
            },
        }
    );
    return response.data;
}
