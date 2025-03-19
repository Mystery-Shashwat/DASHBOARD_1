import React from "react";
import { useSelector } from "react-redux";
import AccessDenied from "./AccessDenied";
const withFeatureToggle = (WrappedComponent) => {
  return (props) => {
    const { feature, ...otherProps } = props;
    // console.log(props);
    const storedRole = localStorage.getItem("userRole");
    // console.log(storedRole);
    const settings = useSelector((state) => state.settings);
    // console.log(settings);
    // console.log(feature);
    const isEnabled = settings[feature];
    // console.log("In withFeatureToggle");
    // If the feature is disabled, don't show the component
    if (!isEnabled && storedRole === "user") {
      console.log("Disabled");
      return <AccessDenied />;
    }

    // If enabled, show the wrapped component with its props
    return <WrappedComponent {...otherProps} />;
  };
};

export default withFeatureToggle;
