import React, { createContext, useState, useEffect } from "react";

export const VersionContext = createContext();

export const VersionProvider = ({ children }) => {
  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;
  const version = async () => {
    const checkVersion = async () => {
      const appVersion = process.env.REACT_APP_CURRENT_VERSION;
      let response = await fetch(`${serverDomain}/api/version/version-number`);
      response = await response.json();

      const version = response.message.version_number;
      if (version !== appVersion) {
        console.log("different versions", version, "vs", appVersion);
        window.location.reload();
      } else {
        console.log("same version");
      }
    };
    setInterval(checkVersion, 100000);
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
