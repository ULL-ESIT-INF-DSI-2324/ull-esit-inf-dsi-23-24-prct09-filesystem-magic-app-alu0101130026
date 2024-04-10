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

/*describe("saveCard", () => {
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
    fs.unlinkSync(filePath);
    fs.rmdirSync(usuario.name);
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

    saveCard(usuario, carta1);
    saveCard(usuario, carta2);

    const uploadedCards: Card[] = uploadCards(usuario);

    expect(uploadedCards).to.deep.include.members([carta1, carta2]);
    fs.unlinkSync(`${usuario.name}/${carta1.id}.json`);
    fs.unlinkSync(`${usuario.name}/${carta2.id}.json`);
    fs.rmdirSync(usuario.name);
  });

  it("should return an empty array if the user directory does not exist", () => {
    const usuario: User = { name: "nonExistentUser", cards: [] };

    const uploadedCards: Card[] = uploadCards(usuario);

    expect(uploadedCards).to.be.an("array").that.is.empty;
  });
});

*/

describe("Funciones", () => {
  const usuario: User = { name: "test", cards: [] };
  const cartaEjemplo: Card = {
    id: 1,
    nombre: "Carta de ejemplo",
    manaCost: 3,
    color: Color.Blue,
    type: Type.Enchantment,
    rarity: Rarity.Common,
    rules: "Texto de reglas de la carta",
    marketValue: 10,
  };

  afterEach(() => {
    const directorio = `./${usuario.name}`;
    if (fs.existsSync(directorio)) {
      fs.readdirSync(directorio).forEach((archivo) => {
        fs.unlinkSync(`${directorio}/${archivo}`);
      });
      fs.rmdirSync(directorio);
    }
  });

  describe("saveCard", () => {
    it("debería guardar una carta correctamente", (done) => {
      saveCard(usuario, cartaEjemplo, (error) => {
        const archivo = `./${usuario.name}/${cartaEjemplo.id}.json`;
        expect(fs.existsSync(archivo)).to.be.true;
        done();
      });
    });

    it("debería manejar errores al guardar una carta", (done) => {
      const usuarioInvalido: User = { name: "", cards: [] };
      saveCard(usuarioInvalido, cartaEjemplo, (error) => {
        expect(error).to.not.be.undefined;
        done();
      });
    });
  });

  describe("uploadCards", () => {
    it("debería cargar las cartas correctamente", (done) => {
      saveCard(usuario, cartaEjemplo, (error) => {
        uploadCards(usuario, (error, cartas) => {
          expect(cartas).to.have.lengthOf(1);
          expect(cartas![0]).to.deep.equal(cartaEjemplo);
          done();
        });
      });
    });

    it("debería manejar errores al cargar las cartas", (done) => {
      const usuarioInvalido: User = { name: "", cards: [] };
      uploadCards(usuarioInvalido, (error) => {
        expect(error).to.not.be.undefined;
        done();
      });
    });
  });
});
