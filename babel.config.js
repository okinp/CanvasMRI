{
  presets: [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: {
        version: "3.6"
      }
    }
  ]
}