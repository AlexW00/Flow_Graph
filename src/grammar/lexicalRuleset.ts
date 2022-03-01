// ##################################################################### //
// ########################### LexicalRuleset ########################## //
// ##################################################################### //

import { LexicalRuleset } from "tiny-comp";

const lexicalRuleset: LexicalRuleset = {
  // the name of the token
  whitespace: {
    regex: /([^\S\r\n])/, // the regex that matches the token
  },
  text_node: {
    regex: /"[^"]+"/,
  },
  reference_node: {
    regex: /\[\[[^\[^\]]+\]\]/,
  },
  link_body: {
    regex: /--/,
  },
  link_direction_left: {
    regex: /</,
  },
  link_direction_right: {
    regex: />/,
  },
  link_options_start: {
    regex: /\(/,
  },
  link_options_end: {
    regex: /\)/,
  },
  link_option_delimiter: {
    regex: /,/,
  },
  number: {
    regex: /[0-9]+/,
  },
  math_operator: {
    regex: /[\+\-\/\*]/,
  },

  // ... more lexical rules go here
};

export default lexicalRuleset;
