import { Layout, Menu } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Aside } from "@/hooks";
import styles from "./Sidebar.module.css";
import { Logo } from "@/assets/img";

const { Sider } = Layout;

export const Sidebar = ({ collapsed, className, width, items }) => {
  const { currentPage } = Aside();
  return (
    <Sider
      trigger={null}
      width={width}
      collapsible
      collapsed={collapsed}
      className={clsx(styles.sider, className)}
    >
      <div className={styles.logo}>
        <Link className="d-inline-block h1" to="/">
          <img src={Logo} alt="Taste Bite" />
        </Link>
      </div>
      <Menu
        mode="inline"
        className={clsx(styles.menu, "border-0")}
        defaultSelectedKeys={[currentPage]}
        selectedKeys={[currentPage]}
        items={items}
      />
    </Sider>
  );
};
