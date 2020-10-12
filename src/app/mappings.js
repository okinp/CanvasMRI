const Viewport = {
    ONE: 1,
    ONE_ONE: 2,
    ONE_TWO: 3,
    TWO_TWO: 4,
};
Object.freeze(Viewport);

const ClassMap = {
    sidebarOpen: "sidebar--open",
    stageFull: "stage--full",
    thumbLoaded: "imaging__thumb--loaded",
    loaderComplete: "loader--complete",
    loaderHidden: "loader--hidden",
    dragOver: "drag--over",
};
Object.freeze(ClassMap);

const Selectors = {
    sidebar: "[js-sidebar]",
    stage: "[js-stage]",
    openSidebar: "[js-open--sidebar]",
    closeSidebar: "[js-close--sidebar]",
    loader: "[js-loader-window]",
    viewer: "[js-viewer]",
    canvas: "[js-viewer-canvas]",
    layoutList: "[js-layout-list]",
};
Object.freeze(Selectors);

export { Viewport, ClassMap, Selectors };
