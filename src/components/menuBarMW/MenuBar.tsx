import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menuItems from "./helper/ListMenu";
import { RootState, useAppDispatch } from "../../store/configureStore";
// import { getDataTable , } from "../tableMarketwatch/tableSlice";
import {
  getDataCookie,
  getDataTable,
} from "../tableMarketwatch/tableTestSlice";
import { useSelector } from "react-redux";
import { activeMenuDanhmuc } from "./danhmucSlice";
import { setActiveMenu } from "./menuSlice";
import { setCookie } from "../../models/cookie";

interface MenuItem {
  name: string;
  path: string;
  query: string;
  floor: string;
  children?: MenuItem[];
}

const MenuBar = () => {
  const dispatch = useAppDispatch();
  const [activeMenuItemName, setActiveMenuItemChild] = useState<string | null>(
    null
  ); // teen menu item
  const { row, name, data } = useSelector(
    (state: RootState) => state.categories
  );
  const { keyMenu, nameMenu } = useSelector(
    (state: RootState) => state.menuBar
  );
  const handleItemClick = (path: string, key: number) => {
    // setIsActiveMenu(key);
    // setactiveNameFloor(path);
    // localStorage.setItem("activePriceboarFloor", path);
    // click set lại active menu
    let activeCate = {
      row: null,
      name: "",
    };
    dispatch(activeMenuDanhmuc(activeCate)); // cập nhật lại active danh mục
  };
  // call api
  const handleItemChildClick = async (
    key: number,
    name: string,
    query: string,
    floor: string,
    KeyMenuChildren?: any
  ) => {
    setActiveMenuItemChild(name);
    localStorage.setItem("activePriceboardTabMenu", name);
    let data = {
      Floor: floor,
      Query: query,
      RowPined: null,
    };
    let activeMenu = {
      nameMenu: name,
      keyMenu: key,
    };
    let cookie = {
      tab: name,
      codeList: "",
    };
    // name = tab
    setCookie(cookie);
    dispatch(setActiveMenu(activeMenu)); // cập nhật lại menu

    let result = await dispatch(getDataTable(data));
    if (result?.payload) {
      dispatch(getDataCookie(cookie.codeList)); // cập nhật lại menu
    }
  };
  const renderMenuItem = (item: any, key: number) => {
    return (
      <div
        key={key}
        className={`group list-sub-menu ${
          !row && !name && keyMenu === key ? "active" : ""
        } `}
        onClick={() => handleItemClick(item.path, key)}
      >
        <span className="text-13px">
          {item.name}
          {keyMenu === key
            ? nameMenu
              ? `: ${
                  nameMenu.length > 15
                    ? nameMenu.slice(0, 15) + "..."
                    : nameMenu
                }`
              : "" + nameMenu?.replace(" ", "")
            : " "}
        </span>
        {item.children && item.children.length <= 9 ? (
          <ul
            className="absolute hidden text-black group-hover:block z-40 sub-menu"
            key={item.path}
          >
            {item.children?.map((child: any, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() =>
                    handleItemChildClick(
                      key,
                      child.name,
                      child.query,
                      item.floor,
                      index
                    )
                  }
                >
                  <Link
                    to=""
                    className={`${
                      activeMenuItemName === child.name ? "active" : ""
                    } `}
                  >
                    {child.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div key={item.path}>
            <ul
              className="absolute hidden text-black group-hover:block z-40 sub-menu dropdown-menu-price"
              key={item.path}
            >
              {item.children?.map((child: any, index: number) => {
                return (
                  <li
                    key={index}
                    className={`${
                      index % 2 === 0 ? "float-left" : "float-right"
                    }`}
                    onClick={() =>
                      handleItemChildClick(
                        key,
                        child.name,
                        child.query,
                        item.floor,
                        index
                      )
                    }
                  >
                    <Link
                      to=""
                      className={`${
                        activeMenuItemName === child.name ? "active" : ""
                      } `}
                    >
                      {child.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="flex menu-table">
      {menuItems.map((item, key) => renderMenuItem(item, key))}
    </div>
  );
};

export default React.memo(MenuBar);
