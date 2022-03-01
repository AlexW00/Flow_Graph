export default interface D3Appendable {
  $selection: d3.Selection<any, any, any, any>;
  _append($svg: d3.Selection<any, any, any, any>): void;
}
