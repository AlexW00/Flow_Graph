// ##################################################################### //
// ########################### syntaxRuleset ########################### //
// ##################################################################### //

import { SyntaxRuleset } from "tiny-comp";

const syntaxRuleset: SyntaxRuleset = {
  GRAPH: {
    _: ["RELATIONSHIP+"],
  },

  RELATIONSHIP: {
    _: ["NODE", "LINK", "NODE"],
  },

  NODE: {
    text_node: ["text_node"],
    reference_node: ["reference_node"],
  },

  LINK: {
    right: ["link_body", "LINK_OPTIONS?", "link_body", "link_direction_right"],
    left: ["link_direction_left", "link_body", "LINK_OPTIONS?", "link_body"],
    left_right: [
      "link_direction_left",
      "link_body",
      "LINK_OPTIONS?",
      "link_body",
      "link_direction_right",
    ],
  },

  LINK_OPTIONS: {
    _: [
      "link_options_start",
      "LINK_OPTION_STRENGTH",
      "LINK_OPTION_SPEED?",
      "link_options_end",
    ],
  },

  LINK_OPTION_STRENGTH: {
    _: ["math_operator", "number"],
  },

  LINK_OPTION_SPEED: {
    _: ["link_option_delimiter", "number"],
  },
  // more syntax rules go here
};
export default syntaxRuleset;
