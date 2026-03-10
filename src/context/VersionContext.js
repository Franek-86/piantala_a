import React, { createContext, useState, useEffect } from "react";

export const VersionContext = createContext();

export const VersionProvider = ({ children }) => {
  const version = async () => {
    const checkVersion = async () => {
      const appVersion = process.env.REACT_APP_CURRENT_VERSION;
      let response = await fetch(
        "http://localhost:3001/api/version/version-number",
      );
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
