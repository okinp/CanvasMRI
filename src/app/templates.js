const sequenceItemTemplate = ({ title, date, file, id }) => {
  return `
    <li class="sequences__item" draggable="true" data-type="sequence-item" data-sequence-id="${id}">
      <div class="imaging">
        <div class="imaging__label">
          <span class="imaging__title">${title}</span>
          <span class="imaging__date">${
            date.toISOString().split("T")[0]
          }</span> 
        </div>
        <div class="imaging__thumb">
          <canvas data-src="${file}"></canvas>
        </div>
      </div>
    </li>`;
};

const sequenceListTemplate = ({ sequences }) => {
  return `
    <ul class="sequences">
      ${sequences.reduce((acc, cur) => acc + sequenceItemTemplate(cur), "")}
    </ul>`;
};

const viewerTemplate = (width = 156, height = 207) => `
    <div class="viewer viewer--empty" js-viewer data-index="1">
      <canvas width="${width}" height="${height}" js-viewer-canvas></canvas>
      <ul class="viewer__layers" js-viewer-layers></ul>
    </div>
`;

const layerItem = ({ title, id }) => `
  <li class="viewer__layers__item" draggable="true" data-sequence-id="${id}">
    <span>${title}</span>
  </li>
`;

export { sequenceListTemplate, viewerTemplate, layerItem };
