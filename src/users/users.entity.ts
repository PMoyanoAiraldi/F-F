import { Entity, Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "../order/orders.entity";

import { v4 as uuid} from 'uuid'

@Entity({
    name: 'users'
})
export class User {

    /**
     * El id del usuario
     * @example 'e2d481f2-735e-428f-8a24-c296956dccf9'
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    /**
     * Nombre del usuario
     * @example 'Paula'
     */
    @Column({length: 50, nullable: false})
    name: string;


    /**
     * Debe ser un email válido
     * @example 'ejemplo@mail.com'
     */
    @Column({ length: 50, unique: true, nullable: false })
    email: string;
    

    /**
     * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)
     * @example 'Ejemplo*1'
     */
    @Column({ nullable: false })
    password: string;

    
    /**
     * El arreglo con la información de la orden
     * 
     */
    @OneToMany(() => Order, order => order.user)
    orders: Order[];

}