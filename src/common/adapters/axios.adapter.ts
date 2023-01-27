import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../../common/interfaces/http-adapters.interface';
import { Injectable } from '@nestjs/common';
//esta clase permite cambiar la forma de llamar a la url, ya sea por axios, fetch o lo que sea
@Injectable()
export class AxiosAdapter implements HttpAdapter{
    private readonly axios: AxiosInstance = axios.create();
    async get<T>(url: string): Promise<T>{
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (e) {
            throw new Error(e);            
        }
    }


}