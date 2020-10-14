import { Selectors, Viewport } from "./mappings";

const AppState = {
  sequences: [
    {
      title: "T1",
      file: "https://s3-eu-central-1.amazonaws.com/advantis-public/t1.png",
      date: new Date(2020, 2, 12),
      id: "_001",
    },
    {
      title: "DWI",
      file: "https://s3-eu-central-1.amazonaws.com/advantis-public/dwi.png",
      date: new Date(2020, 2, 11),
      id: "_002",
    },
    {
      title: "ColorMap",
      file:
        "https://s3-eu-central-1.amazonaws.com/advantis-public/colormap.png",
      date: new Date(2019, 3, 21),
      id: "_003",
    },
  ],
  sequenceMeta: {
    aspectWidth: 156,
    aspectHeight: 207,
    numCols: 9,
    numRow: 8,
    numSlices: 71,
  },
  stage: {
    sliceIndex: 31,
    viewport: Viewport.NONE,
    viewers: [],
  },
};

const Nodes = {
  app: document.querySelector("#app"),
  sidebar: document.querySelector(Selectors["sidebar"]),
  stage: document.querySelector(Selectors["stage"]),
  openSidebar: document.querySelector(Selectors["openSidebar"]),
  closeSidebar: document.querySelector(Selectors["closeSidebar"]),
  loader: document.querySelector(Selectors["loader"]),
  layoutList: document.querySelector(Selectors["layoutList"]),
};

export { Nodes, AppState };
