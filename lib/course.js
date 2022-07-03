import axios from "axios-base";

export const getGroups = async (query, init) => {
  let groups = [];
  let error = null;
  await axios
    .get(`onlinegroups?${query}`)
    .then((res) => (menus = res.data.data))
    .catch((err) => (error = err.status));

  if (groups.length > 0) {
  }

  return { groups, error };
};

export const getMenu = async (slug) => {
  let menu = {};
  let parent = {};
  let error = null;
  let childeMenus = null;
  let sameParentMenus = null;
  await axios
    .get(`menu/slug/${slug}`)
    .then((res) => {
      menu = res.data.data;
      parent = res.data.parent;
      childeMenus = res.data.childeMenus;
      sameParentMenus = res.data.sameParentMenus;
    })
    .catch((err) => (error = err.status));

  return { menu, parent, childeMenus, error, sameParentMenus };
};

export const getFooterMenu = async (slug) => {
  let menu = {};
  let parent = {};
  let error = null;
  let childeMenus = null;
  let sameParentMenus = null;
  await axios
    .get(`footermenu/slug/${slug}`)
    .then((res) => {
      menu = res.data.data;
      parent = res.data.parent;
      childeMenus = res.data.childeMenus;
      sameParentMenus = res.data.sameParentMenus;
    })
    .catch((err) => (error = err.status));

  return { menu, parent, childeMenus, error, sameParentMenus };
};
