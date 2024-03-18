import yargs from 'yargs';
import fs from 'fs';
import chalk from "chalk";
import { hideBin } from 'yargs/helpers';
import { Card } from './interfaces/card.js';
import { Color } from './enums/color.js';
import { Type } from './enums/type.js';
import { Rarity } from './enums/rarity.js';
import { User } from './interfaces/user.js';


/**
 * Función para guardar una carta de un usuario
 * @param usuario Usuario
 * @param carta Carta a guardar
 */
export function saveCard(usuario: User, carta: Card) {
    const directorio = `./${usuario.name}`;
    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio);
    }
    const archivo = `${directorio}/${carta.id}.json`;
    fs.writeFileSync(archivo, JSON.stringify(carta));
}

// Función para cargar las cartas de un usuario desde archivos JSON
export function uploadCards(usuario: User): Card[] {
    const directorio = `./${usuario.name}`;
    if (!fs.existsSync(directorio)) {
        return [];
    }
    const archivos = fs.readdirSync(directorio);
    const cartas: Card[] = [];
    archivos.forEach(archivo => {
        const contenido = fs.readFileSync(`${directorio}/${archivo}`, 'utf-8');
        const carta: Card = JSON.parse(contenido);
        cartas.push(carta);
    });
    return cartas;
}

/**
 * Pasamos ahora a definir los distintos comandos y sus manejadores
 */

/**
 * Comando para añadir una carta a la colección
 */
yargs(hideBin(process.argv)).command({
    command: 'añadir',
    describe: 'Añadir una carta a la colección',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID de la carta' },
        nombre: { type: 'string', demandOption: true, describe: 'Nombre de la carta' },
        costeMana: { type: 'number', demandOption: true, describe: 'Coste de maná' },
        color: { type: 'string', demandOption: true, describe: 'Color de la carta' },
        tipo: { type: 'string', demandOption: true, describe: 'Tipo de la carta' },
        rareza: { type: 'string', demandOption: true, describe: 'Rareza de la carta' },
        textoReglas: { type: 'string', demandOption: true, describe: 'Texto de reglas' },
        fuerza: { type: 'number', describe: 'Fuerza de la carta (solo para tipo Criatura)' },
        resistencia: { type: 'number', describe: 'Resistencia de la carta (solo para tipo Criatura)' },
        marcasLealtad: { type: 'number', describe: 'Marcas de lealtad (solo para tipo Planeswalker)' },
        valorMercado: { type: 'number', demandOption: true, describe: 'Valor de mercado' }
    },
    handler: (args) => {
        
        const carta: Card = {
            id: args.id,
            nombre: args.nombre,
            manaCost: args.costeMana,
            color: args.color as Color,
            type: args.tipo as Type,
            rarity: args.rareza as Rarity,
            rules: args.textoReglas,
            strength: args.fuerza,
            resistance: args.resistencia,
            loyaltyMarks: args.marcasLealtad,
            marketValue: args.valorMercado
        };
        const usuario: User = {
            name: args.usuario,
            cards: []
        };
        saveCard(usuario, carta);
    }
})
.help()
.argv;

// Definir el comando 'modificar' y su manejador
yargs(hideBin(process.argv)).command({
    command: 'modificar',
    describe: 'Modificar una carta de la colección',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID de la carta' },
        nombre: { type: 'string', describe: 'Nuevo nombre de la carta' },
        // Define más opciones para modificar aquí...
    },
    handler: (args) => {
        // Implementa la lógica para modificar una carta
        const directorio = `./${args.usuario}`;
        const archivo = `${directorio}/${args.id}.json`;
        if (fs.existsSync(archivo)) {
            const contenido = fs.readFileSync(archivo, 'utf-8');
            const carta: Card = JSON.parse(contenido);
            if (args.nombre) {
                carta.nombre = args.nombre;
            }
            // Modifica los demás campos aquí...
            fs.writeFileSync(archivo, JSON.stringify(carta));
            console.log(chalk.green('Carta modificada correctamente.'));
        } else {
            console.log(chalk.red('No se encontró ninguna carta con ese ID.'));
        }
    }
})
.help()
.argv;

// Define el comando 'eliminar' y su manejador
yargs(hideBin(process.argv)).command({
    command: 'eliminar',
    describe: 'Eliminar una carta de la colección',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID de la carta' }
    },
    handler: (args) => {
        // Implementa la lógica para eliminar una carta
        const directorio = `./${args.usuario}`;
        const archivo = `${directorio}/${args.id}.json`;
        if (fs.existsSync(archivo)) {
            fs.unlinkSync(archivo);
            console.log(chalk.green('Carta eliminada correctamente.'));
        } else {
            console.log(chalk.red('No se encontró ninguna carta con ese ID.'));
        }
    }
})
.help()
.argv;

// Define el comando 'listar' y su manejador
yargs(hideBin(process.argv)).command({
    command: 'listar',
    describe: 'Listar las cartas de la colección',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' }
    },
    handler: (args) => {
        // Implementa la lógica para listar las cartas
        const directorio = `./${args.usuario}`;
        if (fs.existsSync(directorio)) { // Esto no debería ser así
            const archivos = fs.readdirSync(directorio);
            console.log(chalk.green('Cartas en la colección:'));
            archivos.forEach(archivo => {
                const contenido = fs.readFileSync(`${directorio}/${archivo}`, 'utf-8');
                const carta: Card = JSON.parse(contenido);
                console.log(chalk.yellow(`- ${carta.nombre}`));
            });
        } else {
            console.log(chalk.red('No se encontraron cartas en la colección.'));
        }
    }
})
.help()
.argv;

// Define el comando 'mostrar' y su manejador
yargs(hideBin(process.argv)).command({
    command: 'mostrar',
    describe: 'Mostrar información de una carta',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID de la carta' }
    },
    handler: (args) => {
        // Implementa la lógica para mostrar información de una carta
        const directorio = `./${args.usuario}`;
        const archivo = `${directorio}/${args.id}.json`;
        if (fs.existsSync(archivo)) {
            const contenido = fs.readFileSync(archivo, 'utf-8');
            const carta: Card = JSON.parse(contenido);
            console.log(chalk.green('Información de la carta:'));
            console.log(chalk.yellow(`Nombre: ${carta.nombre}`));
            // Muestra los demás campos aquí...
        } else {
            console.log(chalk.red('No se encontró ninguna carta con ese ID.'));
        }
    }
})
.help()
.argv;

// Parsea los argumentos de la línea de comandos
yargs(hideBin(process.argv)).parse();
