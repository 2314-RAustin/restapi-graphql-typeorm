import { DataSource } from 'typeorm';
import { Product } from '../entity/Product';
import path from 'path';

export const connection = new DataSource({
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'graphqlts',
    entities: [Product],
    synchronize: true,
});

