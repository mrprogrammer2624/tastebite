import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Header, Sidebar } from "@/components";
import clsx from "clsx";
import styles from "./DashboardLayout.module.css";

const { Content } = Layout;

export const DashboardLayout = ({ items }) => {
  return (
    <Layout className={styles.main}>
      <Sidebar
        width={280}
        items={items}
        // className={clsx(show === true ? styles.Sidebar : "")}
      />
      <Layout>
        <Header />
        <Content className={clsx(styles.content, "card")}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
