import fs from "fs";
import { Card } from "./interfaces/card.js";
import { User } from "./interfaces/user.js";
import request from "request";

/**
 * Función para guardar una carta de un usuario
 * @param usuario Usuario
 * @param carta Carta a guardar
 */

/*export function saveCard(usuario: User, carta: Card) {
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
/*export function uploadCards(usuario: User): Card[] {
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
*/

/**
 * Guarda la carta de un usuario
 * @param usuario Usuario
 * @param carta Carta a guardar
 * @param callback Callback de la función
 */
export const saveCard = (
  usuario: User,
  carta: Card,
  callback: (error: string | undefined) => void,
) => {
  const directorio = `./${usuario.name}`;
  fs.access(directorio, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.mkdir(directorio, (err) => {
          if (err) {
            callback(err.message);
          } else {
            guardarArchivo();
          }
        });
      } else {
        callback(err.message);
      }
    } else {
      guardarArchivo();
    }
  });

  /**
   * Función que maneja request y los errores
   */
  function guardarArchivo() {
    const archivo = `${directorio}/${carta.id}.json`;
    request(
      { url: archivo, body: JSON.stringify(carta) },
      (error, response, body) => {
        if (error) {
          callback(error.message);
        } else if (response.statusCode !== 200) {
          callback(`Error: ${response.statusCode} - ${body}`);
        } else {
          callback(undefined);
        }
      },
    );
  }
};

/**
 * Carga las cartas de un usuario
 * @param usuario Usuario
 * @param callback Callback de la función
 */
export const uploadCards = (
  usuario: User,
  callback: (error: string | undefined, cartas?: Card[]) => void,
) => {
  const directorio = `./${usuario.name}`;
  fs.access(directorio, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        callback(undefined, []);
      } else {
        callback(err.message);
      }
    } else {
      fs.readdir(directorio, (err, archivos) => {
        if (err) {
          callback(err.message);
        } else {
          const cartas: Card[] = [];
          let archivosRestantes = archivos.length;
          if (archivosRestantes === 0) {
            callback(undefined, cartas);
          }
          archivos.forEach((archivo) => {
            fs.readFile(
              `${directorio}/${archivo}`,
              "utf-8",
              (err, contenido) => {
                if (err) {
                  callback(err.message);
                } else {
                  const carta: Card = JSON.parse(contenido);
                  cartas.push(carta);
                  archivosRestantes--;
                  if (archivosRestantes === 0) {
                    callback(undefined, cartas);
                  }
                }
              },
            );
          });
        }
      });
    }
  });
};
