import { Viewport, ClassMap } from "./mappings";
import { sequenceListTemplate } from "./templates";
import { Nodes, AppState } from "./appData";
import { viewer } from "./viewer";
import { createFragFromText, SequenceStore } from "./utils";

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

function addDragListeners(frag) {
    const draggables = frag.querySelectorAll("[draggable='true']");
    draggables.forEach((item) => item.addEventListener("dragstart", dragstart));
}

function renderSidebar() {
    const listContent = sequenceListTemplate(AppState);
    const sidebarFrag = createFragFromText(listContent);
    addDragListeners(sidebarFrag);
    sidebarFrag.querySelectorAll("canvas").forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        SequenceStore.get(canvas.dataset.src).then((img) => {
            const targetWidth = 7 * canvas.offsetWidth;
            const targetHeight = 20 * canvas.offsetHeight;
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        });
    });
    Nodes.sidebar.appendChild(sidebarFrag);
}

function attachAppListeners() {
    const switchSidebarCb = () => {
        Nodes.sidebar.classList.toggle(ClassMap.sidebarOpen);
        Nodes.stage.classList.toggle(ClassMap.stageFull);
    };
    const handleLayoutChange = (evt) => {
        const index = [...evt.target.parentElement.children].indexOf(
            evt.target
        );
        console.log("Num of required viewers: ", index + 1);
    };
    Nodes.openSidebar.addEventListener("click", switchSidebarCb);
    Nodes.closeSidebar.addEventListener("click", switchSidebarCb);
    Nodes.layoutList.addEventListener("click", handleLayoutChange);
}

function setup() {
    return loadAssets()
        .then(renderSidebar)
        .then(hideLoader)
        .then(attachAppListeners)
        .then(render)
        .then(initViewers);
}

function dragstart(event) {
    event.dataTransfer.setData("text/plain", event.currentTarget.dataset.src);
}

const wheelCb = (evt) => {
    if (evt.target.classList.contains("viewer--empty")) {
        return;
    }
    if (evt.deltaY < 0) {
        const idx = (AppState.stage.sliceIndex - 1) % 71;
        AppState.stage.sliceIndex = idx < 0 ? 71 + idx : idx;
    } else if (evt.deltaY > 0) {
        AppState.stage.sliceIndex = (AppState.stage.sliceIndex + 1) % 71;
    }
    evt.target.dataset.index = AppState.stage.sliceIndex;
};

const createViewerState = () => {
    const instance = viewer();
    instance.setup();
    instance.node.addEventListener("wheel", wheelCb);
    return {
        instance,
        layers: [],
    };
};

function initViewers() {
    AppState.stage.viewers.push(createViewerState());
    AppState.stage.viewers.push(createViewerState());
}

function updateViewport() {}

function render() {
    AppState.stage.viewers.forEach(({ instance }) =>
        instance.render(AppState.stage.sliceIndex)
    );
    window.requestAnimationFrame(render);
}

const App = {
    setup,
    render,
};

Object.freeze(App);

export default App;
