"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var helpers_1 = require("yargs/helpers");
// Función para guardar una carta en un archivo JSON
function saveCard(usuario, carta) {
    var directorio = "./".concat(usuario.name);
    if (!fs_1.default.existsSync(directorio)) {
        fs_1.default.mkdirSync(directorio);
    }
    var archivo = "".concat(directorio, "/").concat(carta.id, ".json");
    fs_1.default.writeFileSync(archivo, JSON.stringify(carta));
}
// Función para cargar las cartas de un usuario desde archivos JSON
function uploadCards(usuario) {
    var directorio = "./".concat(usuario.name);
    if (!fs_1.default.existsSync(directorio)) {
        return [];
    }
    var archivos = fs_1.default.readdirSync(directorio);
    var cartas = [];
    archivos.forEach(function (archivo) {
        var contenido = fs_1.default.readFileSync("".concat(directorio, "/").concat(archivo), 'utf-8');
        var carta = JSON.parse(contenido);
        cartas.push(carta);
    });
    return cartas;
}
// Definir los comandos y sus manejadores
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command({
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
    handler: function (args) {
        var carta = {
            id: args.id,
            nombre: args.nombre,
            manaCost: args.costeMana,
            color: args.color,
            type: args.tipo,
            rarity: args.rareza,
            rules: args.textoReglas,
            strength: args.fuerza,
            resistance: args.resistencia,
            loyaltyMarks: args.marcasLealtad,
            marketValue: args.valorMercado
        };
        saveCard(args.usuario, carta);
    }
});
// Definir el comando 'modificar' y su manejador
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command({
    command: 'modificar',
    describe: 'Modificar una carta de la colección',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID de la carta' },
        nombre: { type: 'string', describe: 'Nuevo nombre de la carta' },
        // Define más opciones para modificar aquí...
    },
    handler: function (args) {
        // Implementa la lógica para modificar una carta
        var directorio = "./".concat(args.usuario);
        var archivo = "".concat(directorio, "/").concat(args.id, ".json");
        if (fs_1.default.existsSync(archivo)) {
            var contenido = fs_1.default.readFileSync(archivo, 'utf-8');
            var carta = JSON.parse(contenido);
            if (args.nombre) {
                carta.nombre = args.nombre;
            }
            // Modifica los demás campos aquí...
            fs_1.default.writeFileSync(archivo, JSON.stringify(carta));
            console.log(chalk_1.default.green('Carta modificada correctamente.'));
        }
        else {
            console.log(chalk_1.default.red('No se encontró ninguna carta con ese ID.'));
        }
    }
});
// Define el comando 'eliminar' y su manejador
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command({
    command: 'eliminar',
    describe: 'Eliminar una carta de la colección',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID de la carta' }
    },
    handler: function (args) {
        // Implementa la lógica para eliminar una carta
        var directorio = "./".concat(args.usuario);
        var archivo = "".concat(directorio, "/").concat(args.id, ".json");
        if (fs_1.default.existsSync(archivo)) {
            fs_1.default.unlinkSync(archivo);
            console.log(chalk_1.default.green('Carta eliminada correctamente.'));
        }
        else {
            console.log(chalk_1.default.red('No se encontró ninguna carta con ese ID.'));
        }
    }
});
// Define el comando 'listar' y su manejador
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command({
    command: 'listar',
    describe: 'Listar las cartas de la colección',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' }
    },
    handler: function (args) {
        // Implementa la lógica para listar las cartas
        var directorio = "./".concat(args.usuario);
        if (fs_1.default.existsSync(directorio)) {
            var archivos = fs_1.default.readdirSync(directorio);
            console.log(chalk_1.default.green('Cartas en la colección:'));
            archivos.forEach(function (archivo) {
                var contenido = fs_1.default.readFileSync("".concat(directorio, "/").concat(archivo), 'utf-8');
                var carta = JSON.parse(contenido);
                console.log(chalk_1.default.yellow("- ".concat(carta.nombre)));
            });
        }
        else {
            console.log(chalk_1.default.red('No se encontraron cartas en la colección.'));
        }
    }
});
// Define el comando 'mostrar' y su manejador
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command({
    command: 'mostrar',
    describe: 'Mostrar información de una carta',
    builder: {
        usuario: { type: 'string', demandOption: true, describe: 'Nombre del usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID de la carta' }
    },
    handler: function (args) {
        // Implementa la lógica para mostrar información de una carta
        var directorio = "./".concat(args.usuario);
        var archivo = "".concat(directorio, "/").concat(args.id, ".json");
        if (fs_1.default.existsSync(archivo)) {
            var contenido = fs_1.default.readFileSync(archivo, 'utf-8');
            var carta = JSON.parse(contenido);
            console.log(chalk_1.default.green('Información de la carta:'));
            console.log(chalk_1.default.yellow("Nombre: ".concat(carta.nombre)));
            // Muestra los demás campos aquí...
        }
        else {
            console.log(chalk_1.default.red('No se encontró ninguna carta con ese ID.'));
        }
    }
});
// Parsea los argumentos de la línea de comandos
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).parse();
