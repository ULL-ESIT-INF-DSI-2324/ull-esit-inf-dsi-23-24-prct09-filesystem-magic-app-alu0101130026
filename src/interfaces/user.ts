import { Card } from "./card.js";

/**
 * Interfaz para definir a un usuario
 */
export interface User {
    name: string;
    cards: Card[];
}