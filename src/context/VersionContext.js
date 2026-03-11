import React, { createContext, useState, useEffect } from "react";

export const VersionContext = createContext();

export const VersionProvider = ({ children }) => {
  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;
  const appVersion = process.env.REACT_APP_CURRENT_VERSION;
  const version = async () => {
    const checkVersion = async () => {
      try {
        let response = await fetch(
          `${serverDomain}/api/version/version-number`,
        );
        response = await response.json();
        const version = response.message.version_number;
        console.log("current version", version, "running version", appVersion);
        if (version && version !== appVersion) {
          window.location.reload();
          return;
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkVersion();
    // setInterval(checkVersion, 100000);
  };
  useEffect(() => {
    version();
  });
  return (
    <VersionContext.Provider
      value={{
        version,
      }}
    >
      {children}
    </VersionContext.Provider>
  );
};
