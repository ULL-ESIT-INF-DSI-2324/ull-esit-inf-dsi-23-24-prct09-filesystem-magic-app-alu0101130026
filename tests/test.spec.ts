import { expect } from "chai";
import fs from "fs";
import mocha from "mocha";
import { saveCard } from "../src/main.js";
import { User } from "../src/interfaces/user.js";

describe("Añadir Carta", () => {
  it("debería agregar una nueva carta al directorio del usuario", () => {
    const carta = {
      id: 1,
      nombre: "Carta de Prueba",
      costeMana: 3,
      color: "azul",
      tipo: "Criatura",
      rareza: "comun",
      textoReglas: "Descripción de la carta",
      valorMercado: 10,
    };
    const usuario: User = {
      name: "nombre_usuario",
      cards: [],
    };

    // Llama a la función añadirCarta con el usuario y la carta de prueba
    //saveCard(usuario, carta);

    // Verifica que se haya creado el directorio del usuario
    expect(fs.existsSync(`./${usuario}`)).to.be.true;

    // Verifica que se haya creado el archivo JSON de la carta
    expect(fs.existsSync(`./${usuario}/${carta.id}.json`)).to.be.true;

    // Limpia el directorio y elimina el archivo de prueba después de la prueba
    fs.unlinkSync(`./${usuario}/${carta.id}.json`);
    fs.rmdirSync(`./${usuario}`);
  });
});
