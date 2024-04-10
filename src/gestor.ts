import yargs from "yargs";
import fs from "fs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import { Card } from "./interfaces/card.js";
import { Color } from "./enums/color.js";
import { Type } from "./enums/type.js";
import { Rarity } from "./enums/rarity.js";
import { User } from "./interfaces/user.js";
import { saveCard } from "./main.js";

/**
 * Definimos los distintos comandos y sus manejadores
 */

/**
 * Comando para añadir una carta a la colección
 */
yargs(hideBin(process.argv))
  .command({
    command: "añadir",
    describe: "Añadir una carta a la colección",
    builder: {
      usuario: {
        type: "string",
        demandOption: true,
        describe: "Nombre del usuario",
      },
      id: { type: "number", demandOption: true, describe: "ID de la carta" },
      nombre: {
        type: "string",
        demandOption: true,
        describe: "Nombre de la carta",
      },
      costeMana: {
        type: "number",
        demandOption: true,
        describe: "Coste de maná",
      },
      color: {
        type: "string",
        demandOption: true,
        describe: "Color de la carta",
      },
      tipo: {
        type: "string",
        demandOption: true,
        describe: "Tipo de la carta",
      },
      rareza: {
        type: "string",
        demandOption: true,
        describe: "Rareza de la carta",
      },
      textoReglas: {
        type: "string",
        demandOption: true,
        describe: "Texto de reglas",
      },
      fuerza: {
        type: "number",
        describe: "Fuerza de la carta (solo para tipo Criatura)",
      },
      resistencia: {
        type: "number",
        describe: "Resistencia de la carta (solo para tipo Criatura)",
      },
      marcasLealtad: {
        type: "number",
        describe: "Marcas de lealtad (solo para tipo Planeswalker)",
      },
      valorMercado: {
        type: "number",
        demandOption: true,
        describe: "Valor de mercado",
      },
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
        marketValue: args.valorMercado,
      };
      const usuario: User = {
        name: args.usuario,
        cards: [],
      };

      // Código cambiado para la modificación
      saveCard(usuario, carta, (error) => {
        if (error) {
          console.error("An error ocurred when saving the card:", error);
        } else {
          console.log("The card was succesfully added.");
        }
      });
    },
  })
  .help().argv;

/**
 * Comando para modificar una carta de la colección
 */
yargs(hideBin(process.argv))
  .command({
    command: "modificar",
    describe: "Modificar una carta de la colección",
    builder: {
      usuario: {
        type: "string",
        demandOption: true,
        describe: "Nombre del usuario",
      },
      id: { type: "number", demandOption: true, describe: "ID de la carta" },
      nombre: { type: "string", describe: "Nuevo nombre de la carta" },
      manaCost: { type: "number", describe: "Nuevo coste de mana de la carta" },
      color: { type: "string", describe: "Nuevo color de la carta" },
      type: { type: "string", describe: "Nuevo tipo de la carta" },
      rarity: { type: "string", describe: "Nueva rareza de la carta" },
      rules: { type: "string", describe: "Nuevas reglas de la carta" },
      strength: { type: "number", describe: "Nueva fuerza de la carta" },
      resistance: { type: "number", describe: "Nueva resistencia de la carta" },
      loyaltyMarks: {
        type: "number",
        describe: "Nuevas marcas de lealtad de la carta",
      },
      marketValue: {
        type: "number",
        describe: "Nuevo valor de mercado de la carta",
      },
    },
    handler: (args) => {
      const directorio = `./${args.usuario}`;
      const archivo = `${directorio}/${args.id}.json`;
      if (fs.existsSync(archivo)) {
        const contenido = fs.readFileSync(archivo, "utf-8");
        const carta: Card = JSON.parse(contenido);
        if (args.nombre) {
          carta.nombre = args.nombre;
        }
        if (args.manaCost) {
          carta.manaCost = args.manaCost;
        }
        if (args.color) {
          carta.color = args.color;
        }
        if (args.type) {
          carta.type = args.type;
        }
        if (args.rarity) {
          carta.rarity = args.rarity;
        }
        if (args.rules) {
          carta.rules = args.rules;
        }
        if (args.strength) {
          carta.strength = args.strength;
        }
        if (args.resistance) {
          carta.resistance = args.resistance;
        }
        if (args.loyaltyMarks) {
          carta.loyaltyMarks = args.loyaltyMarks;
        }
        if (args.marketValue) {
          carta.marketValue = args.marketValue;
        }

        fs.writeFileSync(archivo, JSON.stringify(carta));
        console.log(chalk.green("Carta modificada correctamente."));
      } else {
        console.log(chalk.red("No se encontró ninguna carta con ese ID."));
      }
    },
  })
  .help().argv;

/**
 * Comando para eliminar una carta de la colección
 */
yargs(hideBin(process.argv))
  .command({
    command: "eliminar",
    describe: "Eliminar una carta de la colección",
    builder: {
      usuario: {
        type: "string",
        demandOption: true,
        describe: "Nombre del usuario",
      },
      id: { type: "number", demandOption: true, describe: "ID de la carta" },
    },
    handler: (args) => {
      const directorio = `./${args.usuario}`;
      const archivo = `${directorio}/${args.id}.json`;
      if (fs.existsSync(archivo)) {
        fs.unlinkSync(archivo);
        console.log(chalk.green("Carta eliminada correctamente."));
      } else {
        console.log(chalk.red("No se encontró ninguna carta con ese ID."));
      }
    },
  })
  .help().argv;

/**
 * Comando para listar las cartas de la colección
 */
yargs(hideBin(process.argv))
  .command({
    command: "listar",
    describe: "Listar las cartas de la colección",
    builder: {
      usuario: {
        type: "string",
        demandOption: true,
        describe: "Nombre del usuario",
      },
    },
    handler: (args) => {
      const directorio = `./${args.usuario}`;
      const archivos = fs.readdirSync(directorio);
      if (archivos.length > 0) {
        console.log(chalk.green("Cartas en la colección:"));
        archivos.forEach((archivo) => {
          const contenido = fs.readFileSync(
            `${directorio}/${archivo}`,
            "utf-8",
          );
          const carta: Card = JSON.parse(contenido);
          console.log(chalk.yellow(`- ${carta.nombre}`));
        });
      } else {
        console.log(chalk.red("No se encontraron cartas en la colección."));
      }
    },
  })
  .help().argv;

/**
 * Comando para mostrar la información de una carta
 */
yargs(hideBin(process.argv))
  .command({
    command: "mostrar",
    describe: "Mostrar información de una carta",
    builder: {
      usuario: {
        type: "string",
        demandOption: true,
        describe: "Nombre del usuario",
      },
      id: { type: "number", demandOption: true, describe: "ID de la carta" },
    },
    handler: (args) => {
      const directorio = `./${args.usuario}`;
      const archivo = `${directorio}/${args.id}.json`;
      if (fs.existsSync(archivo)) {
        const contenido = fs.readFileSync(archivo, "utf-8");
        const carta: Card = JSON.parse(contenido);
        console.log(chalk.green("Información de la carta:"));
        console.log(chalk.yellow(`Nombre: ${carta.nombre}`));
        console.log(chalk.yellow(`Coste de mana: ${carta.manaCost}`));
        console.log(chalk.yellow(`Color: ${carta.color}`));
        console.log(chalk.yellow(`Tipo: ${carta.type}`));
        console.log(chalk.yellow(`Rareza: ${carta.rarity}`));
        console.log(chalk.yellow(`Reglas: ${carta.rules}`));
        if (carta.strength !== undefined)
          // Comprobamos en caso de que la propiedad sea opcional
          console.log(chalk.yellow(`Fuerza: ${carta.strength}`));
        if (carta.resistance !== undefined)
          console.log(chalk.yellow(`Resistencia: ${carta.resistance}`));
        if (carta.loyaltyMarks !== undefined)
          console.log(chalk.yellow(`Marcas de lealtad: ${carta.loyaltyMarks}`));
        console.log(chalk.yellow(`Valor de mercado: ${carta.marketValue}`));
      } else {
        console.log(chalk.red("No se encontró ninguna carta con ese ID."));
      }
    },
  })
  .help().argv;

yargs(hideBin(process.argv)).parse();
