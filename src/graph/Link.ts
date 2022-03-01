// ====================================================== //
// ======================== Link ======================== //
// ====================================================== //

import D3_CONFIG from "../d3/D3_CONFIG";

export default class Link {
  linkDirection: LinkDirection;
  linkOptions: LinkOptions;

  constructor(linkDirection: LinkDirection, linkOptions: LinkOptions) {
    this.linkDirection = linkDirection;
    this.linkOptions = linkOptions;
  }
}

// ~~~~~~~~~~~~~ LinkOptions ~~~~~~~~~~~~~ //

export class LinkOptions {
  linkStrength: LinkStrength;
  linkSpeed: number;

  constructor(
    linkStrength: LinkStrength = new LinkStrength(),
    linkSpeed: number = LINK_DEFAULT_VALUES.speed
  ) {
    this.linkStrength = linkStrength;
    this.linkSpeed = linkSpeed;
  }
}

// ~~~~~~~~~~~~~ LinkStrength ~~~~~~~~~~~~ //

export class LinkStrength {
  type: LinkStrengthType;
  strength: number;

  constructor(
    strength = LINK_DEFAULT_VALUES.strength,
    linkStrengthType = LINK_DEFAULT_VALUES.strengthType
  ) {
    this.type = linkStrengthType;
    this.strength = strength;
  }
}

export enum LinkStrengthType {
  PLUS = 0,
  MINUS = 1,
  MULTIPLY = 2,
  DIVIDE = 3,
}

export function getLinkStrengthTypeByOperator(
  operator: string
): LinkStrengthType {
  switch (operator) {
    case "+":
      return LinkStrengthType.PLUS;
    case "-":
      return LinkStrengthType.MINUS;
    case "*":
      return LinkStrengthType.MULTIPLY;
    case "/":
      return LinkStrengthType.DIVIDE;
    default:
      return LinkStrengthType.PLUS;
  }
}

export function getLinkStrengthOperatorByType(type: LinkStrengthType): string {
  switch (type) {
    case LinkStrengthType.PLUS:
      return "+";
    case LinkStrengthType.MINUS:
      return "-";
    case LinkStrengthType.MULTIPLY:
      return "*";
    case LinkStrengthType.DIVIDE:
      return "/";
    default:
      return "+";
  }
}

export function getColorByType(type: LinkStrengthType): string {
  switch (type) {
    case LinkStrengthType.PLUS:
      return D3_CONFIG.particle.colors.plus;
    case LinkStrengthType.MINUS:
      return D3_CONFIG.particle.colors.minus;
    case LinkStrengthType.MULTIPLY:
      return D3_CONFIG.particle.colors.multiply;
    case LinkStrengthType.DIVIDE:
      return D3_CONFIG.particle.colors.divide;
    default:
      return "black";
  }
}

export function performOperation(
  operand1: number,
  operand2: number,
  linkStrengthType: LinkStrengthType
) {
  switch (linkStrengthType) {
    case LinkStrengthType.PLUS:
      return operand1 + operand2;
    case LinkStrengthType.MINUS:
      return operand1 - operand2;
    case LinkStrengthType.MULTIPLY:
      return operand1 * operand2;
    case LinkStrengthType.DIVIDE:
      return operand1 / operand2;
    default:
      return operand1 + operand2;
  }
}

// ~~~~~~~~~~~~ LinkDirection ~~~~~~~~~~~~ //

export enum LinkDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  LEFT_RIGHT = "LEFT_RIGHT",
}

export let LINK_DEFAULT_VALUES = {
  strength: 5,
  strengthType: LinkStrengthType.PLUS,
  speed: 1,
};
