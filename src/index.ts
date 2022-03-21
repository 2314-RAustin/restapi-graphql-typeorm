import 'reflect-metadata';
import { startServer } from './app';
import { connection } from './config/typeorm';

async function main() {
    const app = await startServer();
    await connection.initialize();
    app.listen(3000);
    console.log(`Server listen on port ${3000}`);
}

main();