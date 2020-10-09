const state = {
  sequences: [
    {
      title: "T1",
      file: "https://s3-eu-central-1.amazonaws.com/advantis-public/t1.png",
      date: new Date(2020, 2, 12),
      id: Date.now(),
    },
    {
      title: "DWI",
      file: "https://s3-eu-central-1.amazonaws.com/advantis-public/dwi.png",
      date: new Date(2020, 2, 11),
      id: Date.now(),
    },
    {
      title: "ColorMap",
      file:
        "https://s3-eu-central-1.amazonaws.com/advantis-public/colormap.png",
      date: new Date(2019, 3, 21),
      id: Date.now(),
    },
  ],
  stage: {
    sliceIndex: 0,
    viewers: [
      {
        sequences: ["T1"],
      },
      {
        sequences: ["T1", "T2"],
      },
    ],
  },
};

export { state };
