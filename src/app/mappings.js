const Origin = {
  sidebar: -1,
};

const Viewport = {
  NONE: 0,
  ONE: 1,
  ONE_ONE: 2,
  ONE_TWO: 3,
  TWO_TWO: 4,
};

const ClassMap = {
  sidebarOpen: "sidebar--open",
  stageFull: "stage--full",
  thumbLoaded: "imaging__thumb--loaded",
  loaderComplete: "loader--complete",
  loaderHidden: "loader--hidden",
  dragOver: "drag--over",
  viewerEmpty: "viewer--empty",
};

const Selectors = {
  sidebar: "[js-sidebar]",
  stage: "[js-stage]",
  openSidebar: "[js-open--sidebar]",
  closeSidebar: "[js-close--sidebar]",
  loader: "[js-loader-window]",
  viewer: "[js-viewer]",
  viewerLayers: "[js-viewer-layers]",
  canvas: "[js-viewer-canvas]",
  layoutList: "[js-layout-list]",
};

const EventType = {
  add: "addSequence",
  remove: "removeSequence",
  closeSidebar: "closeSidebar",
  openSidebar: "openSidebar",
  changeLayout: "changeLayout",
};

Object.freeze(Viewport);
Object.freeze(ClassMap);
Object.freeze(EventType);
Object.freeze(Selectors);

export { Origin, Viewport, ClassMap, Selectors, EventType };
