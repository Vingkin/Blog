export const categoryMap = {"category":{"/":{"path":"/category/","map":{"interview":{"path":"/category/interview/","keys":["v-31c50a00"]},"redis":{"path":"/category/redis/","keys":["v-383eefd9"]}}}},"tag":{"/":{"path":"/tag/","map":{"interview":{"path":"/tag/interview/","keys":["v-31c50a00"]},"redis":{"path":"/tag/redis/","keys":["v-383eefd9"]}}}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
  });


