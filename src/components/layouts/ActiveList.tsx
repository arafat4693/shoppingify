import Image from "next/image"
import { MdModeEditOutline } from "react-icons/md"
import ListItems from "./ListItems"

export default function ActiveList() {
  return (
    <section className="w-[39rem] h-full bg-[#FFF0DE] p-14 overflow-scroll hideScrollbar">
      <div className="w-full h-52 rounded-[2.4rem] bg-[#80485B] relative py-7 flex justify-end pr-11 mb-16">
        <div className="w-full h-full absolute -top-6 -left-40">
          <Image src="/images/source.svg" alt="wine" fill />
        </div>

        <div className="h-full flex flex-col justify-between z-10">
          <p className="w-64 leading-8 font-bold text-white text-2xl">
            {"Didn't"} find what you need?
          </p>
          <button className="text-2xl text-[#34333A] font-bold bg-white flex justify-center items-center w-48 h-16 rounded-2xl cursor-pointer">
            Add item
          </button>
        </div>
      </div>

      <h1 className="text-4xl text-[#34333A] font-bold flex items-center justify-between">
        Shopping list <MdModeEditOutline className="text-4xl cursor-pointer" />
      </h1>

      <ListItems />
      <ListItems />
      <ListItems />

      <div className="fixed bottom-0 right-0 w-[39rem] h-52 bg-white flex items-center justify-center">
        <form className="flex items-center border-2 border-solid border-main-orange w-[31rem] h-24 overflow-hidden rounded-2xl gap-4 pl-6">
          <input
            placeholder="enter a name"
            type="text"
            className="flex-grow text-2xl font-medium text-black"
          />
          <button className="h-full w-[8.7rem] bg-main-orange text-white font-bold text-2xl flex items-center justify-center rounded-tl-2xl rounded-bl-2xl">
            Save
          </button>
        </form>
      </div>
    </section>
  )
}