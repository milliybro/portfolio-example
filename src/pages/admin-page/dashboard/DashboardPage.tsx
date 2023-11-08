import { Spin } from "antd";

import "./style.scss";
import { useAuth } from "../../../states/auth";


const DashboardPage = () => {
  const {role} = useAuth();
  return (
    <Spin spinning={false}>
      <section>
        <div className="container">
          <div className="main-stats">
            <h2 className="dashboard-title">Hello {role}!</h2>
          </div>
          <div className="stats-row">
          </div>
        </div>
      </section>
    </Spin>
  );
};

export default DashboardPage;