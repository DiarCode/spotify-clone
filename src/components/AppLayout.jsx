import Head from "next/head";
import React from "react";

const AppLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Spotify-Clone | {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {children}
    </>
  );
};

export default AppLayout;
