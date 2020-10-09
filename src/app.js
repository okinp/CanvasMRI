import { sequenceListTemplate } from "./templates";

const $ = {
  sidebar: document.querySelector(".sidebar"),
  stage: document.querySelector(".stage"),
  openSidebar: document.querySelector(".button--open"),
  closeSidebar: document.querySelector(".button--close"),
};

function initListeners() {
  const switchSidebarCb = () => {
    $.sidebar.classList.toggle("sidebar--open");
    $.stage.classList.toggle("stage--full");
  };
  $.openSidebar.addEventListener("click", switchSidebarCb);
  $.closeSidebar.addEventListener("click", switchSidebarCb);
}

function renderSidebar(state) {
  const content = sequenceListTemplate(state);
  const sidebarFrag = document.createRange().createContextualFragment(content);
  $.sidebar.appendChild(sidebarFrag);
}

const app = (() => ({
  initListeners,
  renderSidebar,
}))();

export default app;
