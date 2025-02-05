import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private readonly usuariosRepository: Repository<User>
    ){}
        
    async createUser(createUserDto: CreateUserDto): Promise <User>{
        // Verificar si el correo ya existe
        const usuarioExistente = await this.usuariosRepository.findOne({ where: { email: createUserDto.email } });
        if (usuarioExistente) {
            throw new HttpException('El email ya está registrado', 400);
        }

        const newUser = new User();
        Object.assign(newUser, createUserDto);
        console.log('Usuario antes de guardar:', newUser);

        const hashedcontrasena = await bcrypt.hash(createUserDto.password, 10);
        newUser.password = hashedcontrasena;// Asignar la contraseña encriptada al nuevo usuario
        console.log('Hashed contrasena:', newUser.password);

        return this.usuariosRepository.save(newUser)
        } catch (error) {
        console.error('Error al crear el usuario:', error);
        if (error instanceof HttpException) {
            throw error; // Re-lanzar excepciones controladas
        }
        throw new HttpException('Error al crear el usuario', 500);
    }

    async getUsers(): Promise <ResponseUserDto[]>{
        const users = await this.usuariosRepository.find()
        
        return users.map(user => {
            const userDto = new ResponseUserDto();
            userDto.name = user.name;
            userDto.email = user.email;
            
            return userDto
        })
    }

    // async login(loginUserDto: LoginUserDto): Promise <LoginUserDto>{

    // }


        
}


