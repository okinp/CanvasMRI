const sequenceItemTemplate = ({ title, date, file, id }) => {
  return `
    <li class="sequences__item" draggable="true" data-id="${id}">
      <div class="imaging">
        <div class="imaging__label">
          <span class="imaging__title">${title}</span>
          <span class="imaging__date">${
            date.toISOString().split("T")[0]
          }</span> 
        </div>
        <div class="imaging__thumb">
          <img
            src="${file}" />
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

export { sequenceListTemplate };
