module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:8000/"],
      startServerCommand: "rails server -e production",
      staticDistDir: "./",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
