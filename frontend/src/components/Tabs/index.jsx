import { Tabs } from "antd";
import clsx from "clsx";
import styles from "./Tabs.module.css";

export const Tab = ({
  items,
  animated,
  onChange,
  className,
  extraContent,
  tabPosition = "top",
  activeTabKey,
  ...rest
}) => {
  return (
    <Tabs
      items={items}
      defaultActiveKey={activeTabKey}
      activeKey={activeTabKey}
      onChange={onChange}
      tabBarExtraContent={extraContent}
      animated={animated}
      className={clsx(styles.tabs, className)}
      tabPosition={tabPosition}
      {...rest}
    />
  );
};
