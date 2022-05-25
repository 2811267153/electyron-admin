let firstMenu = null;


export function mapMenuRouter(menuList) {
  const routers = [];
  const allRouter = [];
  const routerFiles = require.context("../router/index", true, /\.js/);
  routerFiles.keys().forEach((key) => {
    const route = require("../router/index" + key.split(".")[1]);
    allRouter.push(route.default);
  });

  const _recurseGetRouter = (menuList) => {
    const a = [];
    if (menuList.left !== 0) {
      for (const menu of menuList) {
        if (menu.menu === "2") {
          console.log(menu, '________________');
          _recurseGetRouter(menu.children);
          console.log("parentId == 1", menu.children);
        } else if (menu.parentId === "2") {
          allRouter.forEach(route => {
            if (route.path === menu.path) {
              a.push(route);
            }
            console.log(a);
          });
          if (!firstMenu) {
            firstMenu = menu;
          }
        }
      }
    }
    console.log("这是相同的", a);
  };
  _recurseGetRouter(menuList);
  return routers;
}


export function pathMapToMenu(userMenu, currentPath) {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export { firstMenu };
