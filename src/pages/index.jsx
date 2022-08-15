import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

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
    return (
      <AppLayout title={"Loading..."}>
        <div className="bg-black h-screen"></div>
      </AppLayout>
    );
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
