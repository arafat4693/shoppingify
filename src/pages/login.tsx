import Image from "next/image"
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { NextPageContext } from "next"

export default function login() {
  // const { data: session } = useSession()

  // console.log(session)

  return (
    <section className="bg-white flex justify-center items-center h-screen">
      <div className="bg-white border-2 border-solid border-[#BDBDBD] rounded-3xl py-10 px-14 w-[42rem] overflow-scroll hideScrollbar">
        <div className="flex items-center gap-x-6 mb-12">
          <Image src="/images/logo.svg" alt="logo" width={42} height={42} />
          <span className="font-bold text-main-orange text-4xl">
            Shoppingify
          </span>
        </div>

        <div className="flex flex-col gap-y-5">
          <button
            onClick={() => signIn("google")}
            className="h-20 rounded-2xl flex gap-x-6 items-center bg-red-600 text-white font-semibold transition-all duration-200 hover:bg-red-500 text-2xl capitalize px-8"
          >
            <FaGoogle className="text-4xl" />
            continue with google
          </button>

          <button
            onClick={() => signIn("twitter")}
            className="h-20 rounded-2xl flex gap-x-6 items-center bg-sky-600 text-white font-semibold transition-all duration-200 hover:bg-sky-500 text-2xl capitalize px-8"
          >
            <FaTwitter className="text-4xl" />
            continue with twitter
          </button>

          <button
            onClick={() => signIn("github")}
            className="h-20 rounded-2xl flex gap-x-6 items-center bg-gray-700 text-white font-semibold transition-all duration-200 hover:bg-gray-600 text-2xl capitalize px-8"
          >
            <FaGithub className="text-4xl" />
            continue with github
          </button>

          {/* <button onClick={() => signOut()}>sign out</button> */}
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    }
  }

  return { props: {} }
}
