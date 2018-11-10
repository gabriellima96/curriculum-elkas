import React, { Fragment } from "react";
import HeaderApp from "../../components/HeaderApp";
import ContentDash from "../../components/ContentDash";

const Dashboard = ({ location }) => (
  <Fragment>
    <HeaderApp />
    <ContentDash location={location} />
  </Fragment>
);
export default Dashboard;
