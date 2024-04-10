[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101130026&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101130026)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101130026/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101130026?branch=main)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101130026/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-alu0101130026/actions/workflows/node.js.yml)

### Práctica 9 - Aplicación para coleccionistas de cartas Magic

## Datos identificativos

- Diego Díaz Fernández
- alu0101130026@ull.edu.es

## Objetivos

En esta semana, se nos pide una aplicación para los amantes del coleccionismo, más concretamente las cartas Magic. El sistema tendrá varias funcionalidades: añadir, eliminar, modificar, listar y leer la información de dichas cartas. Tendremos que hacer uso por primera vez del paquete yargs y chalk.

## Interfaces

Como ya venimos haciendo en las últimas semanas de prácticas, lo primero será definir las interfaces que nos ayudarán a desarrollar nuestro código.

La primera que encontramos es Card. En ella están todos los datos que tenemos que registrar sobre una carta, con algún parámetro opcional.

```
export interface Card {
  id: number;
  nombre: string;
  manaCost: number;
  color: Color;
  type: Type;
  rarity: Rarity;
  rules: string;
  strength?: number;
  resistance?: number;
  loyaltyMarks?: number;
  marketValue: number;
}
```

La segunda y última es la interfaz User. Esta solo tiene los campos name y cards, que es un array de instancias de la interfaz card.

```
export interface User {
  name: string;
  cards: Card[];
}
```

## Enumerados

En esta práctica, además, como tenemos varias características de las cartas que pueden tener distintos valores, se ha definido una carpeta llamada enums con los distintos enumerados sobre esos atributos.

El primero de ellos es el color, en él se definen los distintos colores que puede tomar la carta.

```
export enum Color {
  White = "blanco",
  Blue = "azul",
  Black = "negro",
  Red = "rojo",
  Green = "verde",
  Nocolor = "incoloro",
  Multicolor = "multicolor",
}
```

El segundo es la rareza, que puede tomar 4 valores distintos.

```
export enum Rarity {
  Common = "comun",
  Infrequent = "infrecuente",
  Rare = "rara",
  Mythic = "mitica",
}
```

Por último, el tipo de la carta, variando entre 7 distintos, de ahí que también tenga que ser un enumerado.

```
export enum Type {
  Ground = "tierra",
  Creature = "criatura",
  Enchantment = "encantamiento",
  Spell = "conjuro",
  Instantaneous = "instantaneo",
  Artifact = "artefacto",
  Planeswalker = "planeswalker",
}
```

## Gestor

Seguimos con el archivos gestor.ts. En este se encuentran definidos los distintos comandos, haciendo uso de chalk y yargs. Pasaremos a comentar el comando modificar, puesto que el resto siguen el mismo esqueleto, solo cambiando un poco la implementación.

```
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
```

Lo primero es definir en yargs el nombre de nuestro comando, que en este caso será modificar. Después pasamos a la parte del builder, el cual consta del usuario y después todos los campos que se pueden modificar, como son id, nombre, manaCost...

Ahora pasamos a la parte del manejador o handler. En este es donde se implementa el código a realizar. En el caso particular de modificar, lo que tenemos es que comprobar el atributo que se quiere modificar, esto se hace con los if que vemos en el código, comprobando previamente si la carta existe. Una vez modificado, escribimos los datos en el JSON de la carta y anunciamos que se ha realizado correctamente. Si la carta no existe se mostrará un mensaje. Destar¡car que los mensajes de éxito van en verde y los de error en rojo.

El resto de comandos tienen el mismo esqueleto: un builder y un handler. Teniendo en cuenta en lo que consiste cada uno de los comandos se ha implementado de una manera en concreto.

## Main

Ahora pasamos ya a nuestro programa principal, en el solo están las dos funciones que nos han servido de apoyo en los comandos pero que no hemos comentado todavía.

La primera función es SaveCard. Esta lo que hace es comprobar si existe el directorio y lo crea si no es así. Después crea también el archivo .json que contiene los datos de la carta.

```
export function saveCard(usuario: User, carta: Card) {
  const directorio = `./${usuario.name}`;
  if (!fs.existsSync(directorio)) {
    fs.mkdirSync(directorio);
  }
  const archivo = `${directorio}/${carta.id}.json`;
  fs.writeFileSync(archivo, JSON.stringify(carta));
}
```

La segunda es uploadCard, la cual lo que hace es retornar las cartas de un usuario en caso de que este tenga cartas. Lee el directorio y con un bucle va añadiendo las cartas a un array de instancias de cartas.

```
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
```

Este sería todo el programa desarrollado. Destacar que se han hecho las pruebas con un cubrimiento del 100% con Coveralls, además de comentar el programa utilizando Typedoc.

## Sesión PE

En la novena semana de la asignatura, se nos pide desarrollar, usando el Template Method, un programa que lea archivos CSV y JSON con instancias de problema de la mochila. Lo primero será definir la interfaz FileProcessorHooks, en la que se definen los hooks con sus dos métodos pre y post.

```
export interface FileProcessorHooks {
  preProcess(fileContent: string): string;
  postProcess(benefits: number[], weights: number[]): void;
}
```

El siguiente archivo, el main, es el que alberga el funcionamiento del programa, con las clases y las funciones. Lo primero sería definir una clase para poner los hooks por defecto:

```
export class DefaultHooks implements FileProcessorHooks {
  preProcess(fileContent: string): string {
    return fileContent;
  }

  postProcess(benefits: number[], weights: number[]): void {
    console.log("Default post-processing:", benefits, weights);
  }
}
```

Hecho esto, entramos en la clase BackpackFileProcessor, la cual será la que procese los archivos CSV y JSON. Lo primero será definir el constructor de los hooks y después ya nos metemos de lleno con el método process. Este define los arrays weights y benefits, que será retornados una vez sean procesados los archivos. Comprobamos primero si tiene formato JSON, si es así mapeamos los elementos en nuestros arrays. En caso contrario, este será un archivo CSV, por lo que se tratará con el siguiente bucle:

```
for (let i = 2; i < numElements + 2; i++) {
          const [numElemento, peso, beneficio] = lines[i]
            .split(",")
            .map(Number);
          benefits.push(beneficio);
          weights.push(peso);
        }
```

Después solo tendremos que manejar un posible error al procesar el archivo y retornar los arrays. Al final de la clase incluiremos la función que comprueba si el formato es JSON.

```
private isJSONFormat(data: string): boolean {
    try {
      JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  }
```

Al final del main se ha incluido un ejemplo con unos hooks personalizados, definiendo los métodos pre y post Process.

## Sesión PE Semana 11

En esta semana se nos pedía, sobre esta práctica ya realizada, cambiar dos de los métodos para que se sustituya en los mismos la invocación de métodos del API síncrona de Node.js de gestión el sistema de ficheros, por llamadas a los métodos equivalentes del API asíncrona basada en callbacks. Además teníamos que seguir el patrón callback. Se desarrollaron los cambios sobre saveCard y uploadCard, de la siguiente manera: 

```
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
```

## Conclusiones

Terminada ya la semana 9 de la asignatura, ya pasado el ecuador de la misma, hacemos retrospección y vemos que ya tenemos un amplio manejo de typescript. Empezamos definiendo funciones básicas como `Hola Mundo` y ahora somos capaces de usar yargs para pasarle por consola distintos comandos que nosotros mismos hemos diseñado.

Si profundizamos en lo hecho en esta semana, vemos sobre todo que los paquetes yargs y chalk nos aportan herramientas que nos serán muy útiles de aquí en adelante. En conclusión, ha sido una semana de un aprendizaje que nos será de gran provecho, pues son dos elementos muy intuitivos y de gran ayuda.

## Bibliografía

- http://yargs.js.org/
- https://www.npmjs.com/package/chalk
