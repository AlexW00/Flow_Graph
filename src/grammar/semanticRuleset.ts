// ##################################################################### //
// ########################## SemanticRuleset ########################## //
// ##################################################################### //

import {
  _getFirstSemanticContextBySyntaxRuleName,
  _getSemanticContextsBySyntaxRuleName,
  SemanticRuleset,
  Attribute,
  SemanticContext,
} from "tiny-comp";
import Graph from "../graph/Graph.js";

import Link, {
  LinkStrength,
  LinkOptions,
  LinkDirection,
  getLinkStrengthTypeByOperator,
} from "../graph/Link.js";
import Node, { NodeType } from "../graph/Node.js";
import Relationship from "../graph/Relationship.js";

const _makeLinkContext = (
  semanticContexts: SemanticContext[],
  linkDirection: LinkDirection
): SemanticContext => {
  const semanticContext = new SemanticContext("LINK"); // create a new semantic context (= array of attributes)

  const linkOptions = _getFirstSemanticContextBySyntaxRuleName(
    "LINK_OPTIONS",
    semanticContexts,
    true
  );

  const _deps = [];
  if (linkOptions) _deps.push(linkOptions.getAttribute("val"));

  semanticContext.addAttribute(
    new Attribute("val", _deps, (...deps) => {
      return new Link(
        linkDirection,
        deps[0] ? deps[0].value() : new LinkOptions()
      );
    })
  );
  return semanticContext;
};

const _makeNodeContext = (
  semanticContexts: SemanticContext[],
  nodeType: NodeType
): SemanticContext => {
  const semanticContext = new SemanticContext("NODE");
  const node =
    nodeType === NodeType.TEXT_NODE
      ? _getFirstSemanticContextBySyntaxRuleName("text_node", semanticContexts)
      : _getFirstSemanticContextBySyntaxRuleName(
          "reference_node",
          semanticContexts
        );

  semanticContext.addAttribute(
    new Attribute("val", [node!!.getAttribute("lex")], (...deps) => {
      return new Node(deps[0].value(), nodeType);
    })
  );
  return semanticContext; // return the semantic context
};

// ====================================================== //
// =================== SemanticRuleset ================== //
// ====================================================== //

const semanticRuleset: SemanticRuleset = {
  GRAPH: {
    _: (...semanticContexts) => {
      const semanticContext = new SemanticContext("GRAPH"); // create a new semantic context (= array of attributes)
      const relationships = _getSemanticContextsBySyntaxRuleName(
        "RELATIONSHIP",
        semanticContexts
      ).map((relationship) => relationship.getAttribute("val"));

      semanticContext.addAttribute(
        new Attribute("val", relationships, (...deps) => {
          return new Graph(deps.map((dep) => dep.value()));
        })
      );
      return semanticContext; // return the semantic context
    },
  },

  RELATIONSHIP: {
    _: (...semanticContexts) => {
      const semanticContext = new SemanticContext("RELATIONSHIP"); // create a new semantic context (= array of attributes)

      const nodes = _getSemanticContextsBySyntaxRuleName(
        "NODE",
        semanticContexts
      );

      const link = _getFirstSemanticContextBySyntaxRuleName(
        "LINK",
        semanticContexts
      );

      semanticContext.addAttribute(
        new Attribute(
          "val",
          [
            link!!.getAttribute("val"),
            nodes[0].getAttribute("val"),
            nodes[1].getAttribute("val"),
          ],
          (...deps) => {
            return new Relationship(
              deps[0].value(),
              deps[1].value(),
              deps[2].value()
            );
          }
        )
      );
      return semanticContext; // return the semantic context
    },
  },

  NODE: {
    text_node: (...semanticContexts) => {
      return _makeNodeContext(semanticContexts, NodeType.TEXT_NODE);
    },
    reference_node: (...semanticContexts) => {
      return _makeNodeContext(semanticContexts, NodeType.REFERENCE_NODE);
    },
  },

  LINK: {
    right: (...semanticContexts) => {
      return _makeLinkContext(semanticContexts, LinkDirection.RIGHT);
    },
    left: (...semanticContexts) => {
      return _makeLinkContext(semanticContexts, LinkDirection.LEFT);
    },
    left_right: (...semanticContexts) => {
      return _makeLinkContext(semanticContexts, LinkDirection.LEFT_RIGHT);
    },
  },

  LINK_OPTIONS: {
    _: (...semanticContexts) => {
      const semanticContext = new SemanticContext("LINK_OPTIONS"); // create a new semantic context (= array of attributes)

      const linkOptionStrength = _getFirstSemanticContextBySyntaxRuleName(
        "LINK_OPTION_STRENGTH",
        semanticContexts
      );

      const linkOptionSpeed = _getFirstSemanticContextBySyntaxRuleName(
        "LINK_OPTION_SPEED",
        semanticContexts,
        true
      );

      const _deps = [];
      _deps.push(linkOptionStrength!!.getAttribute("val"));
      if (linkOptionSpeed) _deps.push(linkOptionSpeed.getAttribute("val"));

      semanticContext.addAttribute(
        new Attribute("val", _deps, (...deps) => {
          return new LinkOptions(
            deps[0].value(),
            deps.length > 1 ? (deps[1].value() as number) : undefined
          );
        })
      );
      return semanticContext; // return the semantic context
    },
  },

  LINK_OPTION_STRENGTH: {
    _: (...semanticContexts) => {
      const semanticContext = new SemanticContext("LINK_OPTION_STRENGTH"); // create a new semantic context (= array of attributes)

      const strengthType = _getFirstSemanticContextBySyntaxRuleName(
        "math_operator",
        semanticContexts
      );

      const strength = _getFirstSemanticContextBySyntaxRuleName(
        "number",
        semanticContexts
      );

      semanticContext.addAttribute(
        new Attribute(
          "val",
          [strengthType!!.getAttribute("lex"), strength!!.getAttribute("lex")],
          (...deps) => {
            return new LinkStrength(
              deps[1].value(),
              getLinkStrengthTypeByOperator(deps[0].value())
            );
          }
        )
      );
      return semanticContext;
    },
  },

  LINK_OPTION_SPEED: {
    _: (...semanticContexts) => {
      const semanticContext = new SemanticContext("LINK_OPTION_SPEED"); // create a new semantic context (= array of attributes)
      const speed = _getFirstSemanticContextBySyntaxRuleName(
        "number",
        semanticContexts
      );

      semanticContext.addAttribute(
        new Attribute("val", [speed!!.getAttribute("lex")], (...deps) => {
          return deps[0].value();
        })
      );
      return semanticContext; // return the semantic context
    },
  },
};
export default semanticRuleset;
