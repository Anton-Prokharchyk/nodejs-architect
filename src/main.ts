import App from "./app.js";

const bootstrap = async () => {
  const server = new App();
  await server.init();
};

bootstrap();
