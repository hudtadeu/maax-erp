import axios from 'axios';
import { GetDefaultsResponse } from './types';

const BASE_URL = 'https://totvs.conticonsultoria.com.br/dts/datasul-rest/resources/api/ccp/ccapi354';

export async function getDefaults(usuario: string, senha: string): Promise<GetDefaultsResponse> {
    const response = await axios.get<GetDefaultsResponse>(`${BASE_URL}/getDefaults`, {
        auth: {
            username: usuario,
            password: senha,
        },
    });
    return response.data;
}