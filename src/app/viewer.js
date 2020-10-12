import { createFragFromText, idxToDrawParams, SequenceStore } from "./utils";
import { ClassMap, Selectors } from "./mappings";
import { viewerTemplate } from "./templates";

const dragenter = (event) => {
    event.currentTarget.classList.add(ClassMap.dragOver);
};

const dragleave = (event) => {
    event.currentTarget.classList.remove(ClassMap.dragOver);
};

const dragover = (event) => {
    event.preventDefault();
};

const viewer = (idx = 31) => {
    const layers = [];

    const viewerFragment = createFragFromText(viewerTemplate());

    document.querySelector(Selectors["stage"]).appendChild(viewerFragment);

    const node = [...document.querySelectorAll(Selectors.viewer)].pop();
    node.dataset.index = idx;
    const canvas = node.querySelector(Selectors["canvas"]);

    const addLayer = (layer) => {
        layers.push(layer);
    };

    const render = (index = 31) => {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.globalAlpha = layers.length === 0 ? 1 : 1 / layers.length;

        layers.forEach((layer) => {
            const { sx, sy, sWidth, sHeight } = idxToDrawParams(index, layer);
            ctx.drawImage(
                layer,
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
    };

    return {
        layers,
        fragment: viewerFragment,
        node,
        setup() {
            node.addEventListener("dragenter", dragenter);
            node.addEventListener("dragleave", dragleave);
            node.addEventListener("dragover", dragover);
            node.addEventListener("drop", this.dropCb);
        },
        destroy() {
            node.removeEventListener("dragenter", dragenter);
            node.removeEventListener("dragleave", dragleave);
            node.removeEventListener("dragover", dragover);
            node.removeEventListener("drop", this.dropCb);
        },
        dropCb(event) {
            const src = event.dataTransfer.getData("text");
            event.dataTransfer.clearData();
            event.currentTarget.classList.remove("drag--over");
            SequenceStore.get(src).then((img) => {
                addLayer(img);
            });
            node.classList.remove("viewer--empty");
        },
        render,
    };
};
export { viewer };
