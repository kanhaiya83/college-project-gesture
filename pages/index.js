import Link from "next/link"
import React, { useState } from "react"

const home = () => {
  return (
    <div class="bg-[#040404] min-h-screen w-full px-[10%] text-white flex justify-center items-center">
      <div class="grid grid-cols-2 gap-4 max-w-4xl mx-auto ">
        <Card color={"#F7B338"} data={{btnText:"Learn Now!!",heading:"Learn Alphabets and Numbers!!"}} link="/learn"/>
        <Card color={"#52CB63"} data={{btnText:"Join Now!!",heading:"Take Quiz!!"}}  link="/quiz"/>
        <Card color={"#E44803"} data={{disabled:true,heading:"Learn Phrases!!"}} />
        <Card color={"#973FFE"} data={{disabled:true,heading:"Live Video Chat With Sign Language Parsing!!"}}/>
      </div>
    </div>
  )
}
const Card = ({data,color}) => {
  const {btnText, onClick, disabled,heading,link } = data
  const [hover, setHover] = useState(false)
  return (
  <Link href={link}>
    <div
      class="bg-[#191919] rounded-2xl px-5 py-8 relative overflow-hidden"
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <div
        class={`rounded-full w-32 h-32 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2  transition-all duration-1000 ${
          hover && "scale-[10]  translate-x-0 translate-y-0"
        } ${disabled && "opacity-20"}`}
        style={{ backgroundColor: color }}
      ></div>
      <div class="relative">
        <h1 class="text-3xl font-semibold mb-2">{heading}</h1>
        <p className="text-slate-300 text-sm max-w-[80%] mb-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus et
          mollitia atque vel pariatur recusandae saepe repellendus facere{" "}
        </p>
        <button
          className={`py-3 w-full text-center rounded-full text-g font-semibold bg-slate-500 `}
          onClick={onClick}
        >
          {disabled ? "Coming Soon..." : btnText}
        </button>
      </div>
    </div></Link>
  )
}
export default home
