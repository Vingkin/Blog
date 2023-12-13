import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "D:/Blog/node_modules/vuepress-shared/lib/client/index.js";
import { h } from "vue";

import { useScriptTag } from "D:/Blog/node_modules/@vueuse/core/index.mjs";
import FontIcon from "D:/Blog/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BiliBili from "D:/Blog/node_modules/vuepress-plugin-components/lib/client/components/BiliBili.js";
import AudioPlayer from "D:/Blog/node_modules/vuepress-plugin-components/lib/client/components/AudioPlayer.js";
import BackToTop from "D:/Blog/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "D:/Blog/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("BiliBili")) app.component("BiliBili", BiliBili);
    if(!hasGlobalComponent("AudioPlayer")) app.component("AudioPlayer", AudioPlayer);
    
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/brands.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/solid.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/fontawesome.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
  rootComponents: [
    () => h(BackToTop, {}),
  ],
});
