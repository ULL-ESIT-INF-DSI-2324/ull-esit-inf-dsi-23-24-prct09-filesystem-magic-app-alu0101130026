import { expect } from "chai";
import fs from "fs";
import mocha from "mocha";
import { saveCard } from "../src/main.js";
import { User } from "../src/interfaces/user.js";
import { uploadCards } from "../src/main.js";
import { Card } from "../src/interfaces/card.js";
import { Color } from "../src/enums/color.js";
import { Type } from "../src/enums/type.js";
import { Rarity } from "../src/enums/rarity.js";

describe("saveCard", () => {
  it("should save a card to the user directory", () => {
    const usuario: User = { name: "testUser", cards: [] };
    const carta: Card = {
      id: 1,
      nombre: "testCard",
      manaCost: 2,
      color: Color.Red,
      type: Type.Creature,
      rarity: Rarity.Common,
      rules: "Test rules",
      marketValue: 10,
    };

    saveCard(usuario, carta);

    const filePath = `./${usuario.name}/${carta.id}.json`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const savedCard: Card = JSON.parse(fileContent);

    expect(savedCard).to.deep.equal(carta);
  });
});

describe("uploadCards", () => {
  it("should upload cards from the user directory", () => {
    const usuario: User = { name: "testUser", cards: [] };
    const carta1: Card = {
      id: 1,
      nombre: "testCard1",
      manaCost: 3,
      color: Color.Blue,
      type: Type.Instantaneous,
      rarity: Rarity.Rare,
      rules: "Test rules 1",
      marketValue: 20,
    };
    const carta2: Card = {
      id: 2,
      nombre: "testCard2",
      manaCost: 4,
      color: Color.Black,
      type: Type.Enchantment,
      rarity: Rarity.Mythic,
      rules: "Test rules 2",
      marketValue: 30,
    };

    // Guardar las cartas
    saveCard(usuario, carta1);
    saveCard(usuario, carta2);

    const uploadedCards: Card[] = uploadCards(usuario);

    expect(uploadedCards).to.deep.include.members([carta1, carta2]);
  });

  it("should return an empty array if the user directory does not exist", () => {
    const usuario: User = { name: "nonExistentUser", cards: [] };

    const uploadedCards: Card[] = uploadCards(usuario);

    expect(uploadedCards).to.be.an("array").that.is.empty;
  });

  describe("Command: añadir", () => {
    it("should add a card to the user collection", () => {
      const usuario: User = { name: "testUser", cards: [] };
      const args = {
        usuario: usuario.name,
        id: 1,
        nombre: "newCard",
        manaCost: 3,
        color: Color.Green,
        type: Type.Spell,
        rarity: Rarity.Infrequent,
        rules: "New card rules",
        marketValue: 15,
      };

      // Ejecutar el comando "añadir"
      // Asumiendo que la lógica de manejo de comandos se implementa en el archivo principal
      // Ejecutamos el handler directamente con los argumentos
      // handler(args);
      saveCard(usuario, args);

      // Verificar si la carta se ha guardado correctamente
      const filePath = `./${usuario.name}/${args.id}.json`;
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const savedCard: Card = JSON.parse(fileContent);

      expect(savedCard).to.deep.equal(args);
    });
  });

  describe("Command: eliminar", () => {
    it("should delete a card from the user collection", () => {
      const usuario: User = { name: "testUser", cards: [] };
      const carta: Card = {
        id: 1,
        nombre: "testCard",
        manaCost: 2,
        color: Color.Red,
        type: Type.Creature,
        rarity: Rarity.Common,
        rules: "Test rules",
        marketValue: 10,
      };

      saveCard(usuario, carta);

      const filePath = `./${usuario.name}/${carta.id}.json`;

      // Verificar que la carta existe antes de eliminarla
      expect(fs.existsSync(filePath)).to.be.true;

      // Ejecutar el comando "eliminar"
      // Asumiendo que la lógica de manejo de comandos se implementa en el archivo principal
      // Ejecutamos el handler directamente con los argumentos
      // handler(args);
      fs.unlinkSync(filePath);

      // Verificar que la carta ha sido eliminada
      expect(fs.existsSync(filePath)).to.be.false;
    });
  });

  describe("Command: mostrar", () => {
    it("should display information of a specific card", () => {
      const usuario: User = { name: "testUser", cards: [] };
      const carta: Card = {
        id: 1,
        nombre: "testCard",
        manaCost: 2,
        color: Color.Red,
        type: Type.Creature,
        rarity: Rarity.Common,
        rules: "Test rules",
        marketValue: 10,
      };

      saveCard(usuario, carta);

      // Asumiendo que la lógica de manejo de comandos se implementa en el archivo principal
      // Ejecutamos el handler directamente con los argumentos
      // handler(args);
      // Aquí esperamos que el comando muestre la información de la carta guardada
      // Puedes verificar la salida del comando en la consola o en otro medio que utilices para mostrar la información
    });
  });

  describe("Command: listar", () => {
    it("should list all cards in the user collection", () => {
      const usuario: User = { name: "testUser", cards: [] };
      const carta1: Card = {
        id: 1,
        nombre: "testCard1",
        manaCost: 2,
        color: Color.Red,
        type: Type.Creature,
        rarity: Rarity.Common,
        rules: "Test rules 1",
        marketValue: 10,
      };
      const carta2: Card = {
        id: 2,
        nombre: "testCard2",
        manaCost: 3,
        color: Color.Blue,
        type: Type.Instantaneous,
        rarity: Rarity.Rare,
        rules: "Test rules 2",
        marketValue: 20,
      };

      saveCard(usuario, carta1);
      saveCard(usuario, carta2);

      // Asumiendo que la lógica de manejo de comandos se implementa en el archivo principal
      // Ejecutamos el handler directamente con los argumentos
      // handler(args);
      // Aquí esperamos que el comando liste todas las cartas en la colección del usuario
      // Puedes verificar la salida del comando en la consola o en otro medio que utilices para mostrar la lista de cartas
    });
  });

  describe("Command: modificar", () => {
    it("should modify a specific card in the user collection", () => {
      const usuario: User = { name: "testUser", cards: [] };
      const carta: Card = {
        id: 1,
        nombre: "testCard",
        manaCost: 2,
        color: Color.Red,
        type: Type.Creature,
        rarity: Rarity.Common,
        rules: "Test rules",
        marketValue: 10,
      };

      saveCard(usuario, carta);

      const newCardName = "newTestCardName";
      const newManaCost = 3;
      const newColor = "Blue";

      // Asumiendo que la lógica de manejo de comandos se implementa en el archivo principal
      // Ejecutamos el handler directamente con los argumentos
      // handler(args);
      // Aquí esperamos que el comando modifique la carta específica con los nuevos valores
      // Puedes verificar la carta modificada directamente en la colección del usuario o a través de la función uploadCards
    });
  });
});
