import { dragStart } from "./appCallbacks";

const attachDragListeners = (frag, origin = 0) => {
  const draggables = frag.querySelectorAll("[draggable='true']");
  draggables.forEach((item) =>
    item.addEventListener("dragstart", dragStart(origin))
  );
};

export { attachDragListeners };
