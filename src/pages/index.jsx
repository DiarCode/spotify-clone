import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import Center from "../components/center";
import Player from "../components/player";
import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import AppLayout from "../components/appLayout";

export default function Home() {
  const { data: session } = useSession();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const isUserLoggedIn = Boolean(session?.user);

  useEffect(() => {
    if (!isUserLoggedIn) {
      Router.push("/login ");
    } else {
      setIsPageLoaded(true);
    }
  }, [isUserLoggedIn]);

  if (!isPageLoaded) {
    return <div className="bg-black h-screen"></div>;
  }

  return (
    <AppLayout title={"Home and Playlists"}>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>

        <div>
          <Player />
        </div>
      </div>
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
