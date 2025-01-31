import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post('register')
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: CreateUserDto })
    @ApiResponse({ status: 500, description: 'Error inesperado al crear el usuario' })
    
    async createUsuario(@Body() createUser: CreateUserDto) {
        const user = await this.usersService.createUser(createUser)

        return {
            message: `Usuario creado exitosamente`,
            user
        };
    }

    @Get()  
    @HttpCode(HttpStatus.OK)
    @ApiSecurity('bearer')
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de resultados por página', example: 5 })
    async getUsers(): Promise<ResponseUserDto[]>{ 
        return this.usersService.getUsers();
    }


}
