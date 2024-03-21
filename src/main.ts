import fs from "fs";
import { Card } from "./interfaces/card.js";
import { User } from "./interfaces/user.js";

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

/**
 * Función para cargar las cartas de un usuario desde un archivo JSON
 * @param usuario Usuario
 * @returns Cartas del usuario
 */
export function uploadCards(usuario: User): Card[] {
  const directorio = `./${usuario.name}`;
  if (!fs.existsSync(directorio)) {
    return [];
  }
  const archivos = fs.readdirSync(directorio);
  const cartas: Card[] = [];
  archivos.forEach((archivo) => {
    const contenido = fs.readFileSync(`${directorio}/${archivo}`, "utf-8");
    const carta: Card = JSON.parse(contenido);
    cartas.push(carta);
  });
  return cartas;
}
