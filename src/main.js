import { createApp } from "vue";
import App from "./App.vue";
import components from "@/components/UI";
import router from "./router/routes";
import Vfocus from "./directives/Vfocus";
import store from "./store";

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});
app.directive("focus", Vfocus);
app.use(router).use(store).mount("#app");
