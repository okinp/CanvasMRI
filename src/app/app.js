import { Origin, Viewport, ClassMap, EventType } from "./mappings";
import { sequenceListTemplate } from "./templates";
import { Nodes, AppState } from "./appData";
import {
  handleAddSequence,
  switchSidebarState,
  switchLayout,
  dragEnter,
  dragOver,
  dragLeave,
  dispatchRemoveSequenceEvent,
  handleRemoveSequence,
} from "./appCallbacks";
import { attachDragListeners } from "./listeners";
import {
  createFragFromText,
  SequenceStore,
  EventFactory,
  idxToDrawParams,
} from "./utils";

function setup() {
  return loadAssets()
    .then(insertSidebarSequences)
    .then(hideLoader)
    .then(attachForwardListeners)
    .then(attachAppListener)
    .then(() => switchLayout(Viewport.ONE))
    .then(render);
}

function loadAssets() {
  const sequences = AppState.sequences.map((seq) => seq.file);
  const uniqueSequences = [...new Set(sequences)];
  return Promise.all(uniqueSequences.map((url) => SequenceStore.set(url)));
}

function hideLoader() {
  Nodes.loader.classList.add(ClassMap.loaderComplete);
  return new Promise((res, rej) => {
    setTimeout(() => {
      Nodes.loader.classList.add(ClassMap.loaderHidden);
      res();
    }, 700);
  });
}

function insertSidebarSequences() {
  const listContent = sequenceListTemplate(AppState);
  const sidebarFrag = createFragFromText(listContent);
  attachDragListeners(sidebarFrag, Origin["sidebar"]);
  sidebarFrag.querySelectorAll("canvas").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    SequenceStore.get(canvas.dataset.src).then((img) => {
      const { sx, sy, sWidth, sHeight } = idxToDrawParams(31, img);
      ctx.drawImage(
        img,
        sx,
        sy,
        4 * sWidth,
        sHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    });
  });
  Nodes.sidebar.appendChild(sidebarFrag);
}

function render() {
  AppState.stage.viewers.forEach(({ instance, layers }) =>
    instance.render(
      AppState.stage.sliceIndex,
      layers.map((layer) => layer.image)
    )
  );
  window.requestAnimationFrame(render);
}

function attachForwardListeners() {
  Nodes.openSidebar.addEventListener("click", (evt) => {
    evt.target.dispatchEvent(
      EventFactory({
        type: EventType.openSidebar,
      })
    );
  });

  Nodes.closeSidebar.addEventListener("click", (evt) => {
    evt.target.dispatchEvent(
      EventFactory({
        type: EventType.closeSidebar,
      })
    );
  });

  Nodes.layoutList.addEventListener("click", (evt) => {
    const numViewers =
      [...evt.target.parentElement.children].indexOf(evt.target) + 1;
    evt.target.dispatchEvent(
      EventFactory({
        type: EventType.changeLayout,
        value: numViewers,
      })
    );
  });

  Nodes.sidebar.addEventListener("dragenter", dragEnter);
  Nodes.sidebar.addEventListener("dragleave", dragLeave);

  Nodes.sidebar.addEventListener("dragover", dragOver);
  Nodes.sidebar.addEventListener("drop", dispatchRemoveSequenceEvent);
}

function attachAppListener() {
  Nodes.app.addEventListener("event", eventHandler);
}

const eventHandler = function({ detail }) {
  const { type, value } = detail;
  switch (type) {
    case EventType.add:
      handleAddSequence(value);
      break;
    case EventType.remove:
      handleRemoveSequence(value);
      break;
    case EventType.closeSidebar:
    case EventType.openSidebar:
      switchSidebarState();
      break;
    case EventType.changeLayout:
      switchLayout(value);
      break;
    default:
      console.error("No handler for event: ", type);
  }
};

function run() {
  setup().then(render);
}

const App = {
  run,
};

Object.freeze(App);

export default App;
