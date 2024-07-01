import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CarlosService {
    private readonly baseUrl = 'http://10.42.0.13:5000';
    
    constructor(private readonly httpService: HttpService) {}

    async getDataFromRoute(route?: string, id?: string, token?: string) {
        let url = route ? `${this.baseUrl}/${route}` : this.baseUrl;
        if (id) {
            url += `/${id}`;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await lastValueFrom(this.httpService.get(url, config));

            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new HttpException(`No autorizado para acceder a la ruta ${url}`, HttpStatus.UNAUTHORIZED);
            } else {
                console.error(`Error al obtener datos de la ruta ${url}`, error);
                throw new HttpException(`Error al obtener datos de la ruta ${url}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    
    async postDataToRoute(route: string, body: any, token?: string) {
        const url = `${this.baseUrl}/${route}`;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await lastValueFrom(this.httpService.post(url, body, config));

            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new HttpException(`No autorizado para acceder a la ruta ${url}`, HttpStatus.UNAUTHORIZED);
            } else {
                console.error(`Error al enviar datos a la ruta ${url}`, error);
                throw new HttpException(`Error al enviar datos a la ruta ${url}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}

