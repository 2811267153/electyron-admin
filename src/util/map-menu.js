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
    console.log(menuList);
    if (menuList.left !== 0) {
      for (const menu of menuList) {
        if (menu.menuType === "M") {
          const route = allRouter.find((route) => route.path === menu.path);
          // console.log(allRouter);
          if (route) routers.push(route);
          if (!firstMenu) {
            firstMenu = menu;
          }
        } else if (menu.menuType !== "F") {
          _recurseGetRouter(menu.children);
        }
      }
    }
  };
  // _recurseGetRouter(menuList);
  return routers;
}

export function formatMenu(menuList) {
  console.log("menuList", menuList);
  const resultList = [];
  if (menuList.left !== 0) {
    for (const menu of menuList) {
      if (menu.menuType === "M") {
        menu.sort((a, b) => {
          return a.orderNum - b.orderNum;
        });
      } else if (menu.menuType !== "F") {
        menuList.sort((a, b) => {
          resultList.push(a.orderNum - b.orderNum);
          formatMenu(menu.children);
        });
      }
    }
  }
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
