import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext } from "react";
import CurrentHeaderContext from "../../Share/Contexts/CurrentHeaderContext";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const AdminPage = () => {
    const {setCurrentHeader} = useContext(CurrentHeaderContext)
    if (performance.getEntriesByType("navigation")[0].type) {
        setCurrentHeader("Admin");
    }
  return (
    <div>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          style={{
            height: "100%",
            borderRight: 0,
          }}
        ></Menu>
      </Sider>
    </div>
  );
};

export default AdminPage;
