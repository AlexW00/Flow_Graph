// ====================================================== //
// ======================== Link ======================== //
// ====================================================== //

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

// ~~~~~~~~~~~~ LinkDirection ~~~~~~~~~~~~ //

export enum LinkDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  LEFT_RIGHT = "LEFT_RIGHT",
}

// ~~~~~~~~~~~~~~~ Default ~~~~~~~~~~~~~~~ //

const LINK_DEFAULT_VALUES = {
  strength: 1,
  strengthType: LinkStrengthType.PLUS,
  speed: 1,
};
