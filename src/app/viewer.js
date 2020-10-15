import { createFragFromText, idxToDrawParams } from "./utils";
import { Selectors } from "./mappings";
import { viewerTemplate, layerItem } from "./templates";
import { Nodes, AppState } from "./appData";
import {
  dragEnter,
  dragOver,
  dragLeave,
  handleWheel,
  dispatchAddSequenceEvent,
} from "./appCallbacks";
import { attachDragListeners } from "./listeners";

const viewer = (viewerIndex) => {
  const viewerFragment = createFragFromText(viewerTemplate());
  Nodes.stage.appendChild(viewerFragment);

  const node = [...Nodes.stage.children].pop();
  node.addEventListener("dragenter", dragEnter);
  node.addEventListener("dragleave", dragLeave);
  node.addEventListener("dragover", dragOver);
  node.addEventListener("drop", dispatchAddSequenceEvent);
  node.addEventListener("wheel", handleWheel);

  const layerListNode = node.querySelector(Selectors.viewerLayers);
  const canvas = node.querySelector(Selectors.canvas);

  function render(index = 31, layers = []) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = layers.length === 0 ? 1 : 1 / layers.length;
    node.dataset.index = index;
    layers.forEach((image) => {
      const { sx, sy, sWidth, sHeight } = idxToDrawParams(index, image);
      ctx.drawImage(
        image,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    });
    ctx.restore();
  }

  function updateLegend() {
    setTimeout(() => {
      layerListNode.innerHTML = "";
      const legendTextual = AppState.stage.viewers[viewerIndex].layers.reduce(
        (acc, cur) => acc + layerItem(cur),
        ""
      );
      const frag = createFragFromText(legendTextual);
      layerListNode.append(frag);
      attachDragListeners(layerListNode, viewerIndex);
    });
  }

  function destroy() {
    node.removeEventListener("dragenter", dragEnter);
    node.removeEventListener("dragleave", dragLeave);
    node.removeEventListener("dragover", dragOver);
    node.removeEventListener("drop", dispatchAddSequenceEvent);
    node.removeEventListener("wheel", handleWheel);
    node.remove();
  }

  return {
    node,
    render,
    updateLegend,
    destroy,
  };
};
export { viewer };
