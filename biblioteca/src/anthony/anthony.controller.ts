import { Controller, Get, Post, Param, Headers, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AnthonyService } from './anthony.service';

@Controller('anthony')
export class AnthonyController {
    constructor(private readonly anthonyService: AnthonyService) {}

    @Get(':route')
    async getDataFromRoute(@Param('route') route: string, @Headers('Authorization') authHeader: string) {
        try {
            const token = authHeader ? authHeader.split(' ')[1] : null;
            const data = await this.anthonyService.getDataFromRoute(route, undefined, token);
            return data;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(`Error en el controlador al obtener datos de la ruta ${route}`, error);
            throw new HttpException(`Error en el controlador al obtener datos de la ruta ${route}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':route/:id')
    async getDataFromRouteWithId(@Param('route') route: string, @Param('id') id: string, @Headers('Authorization') authHeader: string) {
        try {
            const token = authHeader ? authHeader.split(' ')[1] : null;
            const data = await this.anthonyService.getDataFromRoute(route, id, token);
            return data;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(`Error en el controlador al obtener datos de la ruta ${route}/${id}`, error);
            throw new HttpException(`Error en el controlador al obtener datos de la ruta ${route}/${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getDefaultRoute(@Headers('Authorization') authHeader: string) {
        try {
            const token = authHeader ? authHeader.split(' ')[1] : null;
            const data = await this.anthonyService.getDataFromRoute(undefined, undefined, token);
            return data;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error('Error en el controlador al obtener datos de la ruta predeterminada', error);
            throw new HttpException('Error en el controlador al obtener datos de la ruta predeterminada', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post(':route')
    async postDataToRoute(@Param('route') route: string, @Body() body: any, @Headers('Authorization') authHeader: string) {
        try {
            const token = authHeader ? authHeader.split(' ')[1] : null;
            const response = await this.anthonyService.postDataToRoute(route, body, token);
            return response;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(`Error en el controlador al enviar datos a la ruta ${route}`, error);
            throw new HttpException(`Error en el controlador al enviar datos a la ruta ${route}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
