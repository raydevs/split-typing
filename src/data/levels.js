export const createLevels = (physicalMap) => ({
  beginner: {
    title: "Home Row (Default Layer)",
    keys: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21], // IDs de teclas home row
    exercises: ["asdf", "jkl;", "fdsa"],
    allowedErrors: 3
  },
  thumbs: {
    title: "Thumb Cluster Training",
    keys: [36, 37, 38, 39, 40, 41], // IDs de teclas thumb
    exercises: ["space space", "enter enter", "shift shift"],
    combo: true
  },
  // ...
});