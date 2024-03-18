import { Color } from '../enums/color.js';
import { Type } from '../enums/type.js';
import { Rarity } from '../enums/rarity.js';

/**
 * Interfaz que define a una carta
 */
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
