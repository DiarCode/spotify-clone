import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

const Login = ({ providers }) => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
      <div className="mb-7">
        <Image
          width="112px"
          height="112px"
          className=" w-28 h-28"
          src="https://links.papareact.com/9xl"
          alt="spotify"
        />
      </div>

      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="bg-[#19c65b] text-gray-200 px-6 py-3 hover:bg-[#13b150] text-sm rounded-full"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
