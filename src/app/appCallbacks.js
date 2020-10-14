import { Nodes, AppState } from "./appData";
import { SequenceStore, EventFactory, createViewerState } from "./utils";
import { ClassMap, EventType, Origin } from "./mappings";

function viewerHasSequence(viewer, sequenceId) {
  return Boolean(viewer.layers.find((l) => l.id === sequenceId));
}

function handleAddSequence(event) {
  const { viewerIndex, sequenceId } = event;

  const viewer = AppState.stage.viewers[viewerIndex];

  if (!viewerHasSequence(viewer, sequenceId)) {
    const foundSequence = AppState.sequences.find(
      (seq) => seq.id === sequenceId
    );

    if (foundSequence) {
      const { id, title, file } = foundSequence;
      SequenceStore.get(file).then((image) => {
        AppState.stage.viewers[viewerIndex].layers.push({
          id,
          title,
          image,
        });
      });
      viewer.instance.updateLegend();
    }
  }
}

function handleRemoveSequence({ viewerIndex, sequenceId }) {
  if (viewerIndex === Origin.sidebar) {
    return;
  }
  const layerIndex = AppState.stage.viewers[viewerIndex].layers.findIndex(
    (layer) => layer.id === sequenceId
  );
  if (layerIndex > -1) {
    AppState.stage.viewers[viewerIndex].layers.splice(layerIndex, 1);
    AppState.stage.viewers[viewerIndex].instance.updateLegend();
    if (AppState.stage.viewers[viewerIndex].layers.length === 0) {
      AppState.stage.viewers[viewerIndex].instance.node.classList.add(
        ClassMap.viewerEmpty
      );
    }
  }
}

function dispatchAddSequenceEvent(event) {
  const { sequenceId } = JSON.parse(event.dataTransfer.getData("text"));
  event.dataTransfer.clearData();

  const viewerIndex = [...event.currentTarget.parentElement.children].indexOf(
    event.currentTarget
  );

  event.currentTarget.classList.remove("drag--over");
  event.currentTarget.classList.remove("viewer--empty");

  event.currentTarget.dispatchEvent(
    EventFactory({
      type: EventType.add,
      value: {
        viewerIndex,
        sequenceId,
      },
    })
  );
}

function dispatchRemoveSequenceEvent(event) {
  const { sequenceId, origin } = JSON.parse(event.dataTransfer.getData("text"));
  event.dataTransfer.clearData();

  event.currentTarget.classList.remove("drag--over");

  event.currentTarget.dispatchEvent(
    EventFactory({
      type: EventType.remove,
      value: {
        viewerIndex: origin,
        sequenceId,
      },
    })
  );
}

function switchSidebarState() {
  Nodes.sidebar.classList.toggle(ClassMap.sidebarOpen);
  Nodes.stage.classList.toggle(ClassMap.stageFull);
}

function switchLayout(targetNumScreens) {
  let diff = targetNumScreens - AppState.stage.viewport;
  let direction = diff > 0 ? "Up" : "Down";
  switch (direction) {
    case "Down":
      while (diff < 0) {
        const removed = AppState.stage.viewers.pop();
        removed.instance.destroy();
        AppState.stage.viewport -= 1;
        diff++;
      }
      break;
    case "Up":
      while (diff > 0) {
        const viewerIdx = AppState.stage.viewers.length;
        AppState.stage.viewers.push(createViewerState(viewerIdx));
        AppState.stage.viewport += 1;
        diff--;
      }
      break;
  }
  Nodes.app.dataset.layoutId = targetNumScreens;
}

function handleWheel(event) {
  if (event.target.classList.contains("viewer--empty")) {
    return;
  }
  if (event.deltaY < 0) {
    const idx =
      (AppState.stage.sliceIndex - 1) % AppState.sequenceMeta.numSlices;
    AppState.stage.sliceIndex =
      idx < 0 ? AppState.sequenceMeta.numSlices + idx : idx;
  } else if (event.deltaY > 0) {
    AppState.stage.sliceIndex =
      (AppState.stage.sliceIndex + 1) % AppState.sequenceMeta.numSlices;
  }
}

const dragStart = (origin = 0) => (event) =>
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({
      sequenceId: event.currentTarget.dataset.sequenceId,
      origin,
    })
  );

const dragEnter = (event) => {
  event.currentTarget.classList.add(ClassMap.dragOver);
};

const dragOver = (event) => {
  event.preventDefault();
};

const dragLeave = (event) => {
  event.currentTarget.classList.remove(ClassMap.dragOver);
};

export {
  handleAddSequence,
  handleRemoveSequence,
  handleWheel,
  switchSidebarState,
  switchLayout,
  dispatchAddSequenceEvent,
  dispatchRemoveSequenceEvent,
  dragStart,
  dragEnter,
  dragOver,
  dragLeave,
};
