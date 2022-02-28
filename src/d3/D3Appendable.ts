export default interface D3Appendable {
  $selection: d3.Selection<any, any, any, undefined>;
  _appendToSvg($svg: d3.Selection<any, any, any, undefined>): void;
}
