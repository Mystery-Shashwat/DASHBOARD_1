import React from "react";
import withFeatureToggle from "./withFeatureToggle";
const Notification: React.FC = () => {
  return <div>Notification</div>;
};

export default withFeatureToggle(Notification);
