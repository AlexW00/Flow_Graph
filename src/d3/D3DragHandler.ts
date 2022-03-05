export default class D3DragHandler {
  static dragHandler: d3.DragBehavior<Element, unknown, unknown> | null = null;

  static create(
    d3: any,
    simulation: d3.Simulation<any, any>
  ): d3.DragBehavior<Element, unknown, unknown> {
    const dragstarted = (
      e: { active: any },
      d: { fx: any; x: any; fy: any; y: any }
    ) => {
      if (!e.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (e: { x: any; y: any }, d: { fx: any; fy: any }) => {
      d.fx = e.x;
      d.fy = e.y;
    };

    const dragended = (e: { active: any }, d: { fx: null; fy: null }) => {
      if (!e.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    D3DragHandler.dragHandler = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    return D3DragHandler.dragHandler!;
  }

  static applyDragHandler(
    selection: d3.Selection<Element, unknown, any, any>
  ): void {
    D3DragHandler.dragHandler!(selection);
  }
}
