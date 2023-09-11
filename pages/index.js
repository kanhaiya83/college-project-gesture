import Link from "next/link"
import React, { useState } from "react"

const home = () => {
  return (
    <div class="bg-[#040404] min-h-screen w-full px-[10%] text-white flex flex-col justify-center items-center">
      <h1 class="text-[10rem] font-semibold leading-none mb-4">Gesture</h1>
      <p class="text-slate-300 mb-12">A Sign Language Learning Platform</p>
      <div class="grid grid-cols-2 gap-4 max-w-4xl mx-auto ">
        <Card color={"#F7B338"} data={{btnText:"Learn Now!!",heading:"Learn Alphabets and Numbers!!",link:"/learn"}} />
        <Card color={"#52CB63"} data={{btnText:"Join Now!!",heading:"Take Quiz!!",link:"/quiz"}}  />
        <Card color={"#E44803"} data={{disabled:true,heading:"Learn Phrases!!",link:"#"}} />
        <Card color={"#973FFE"} data={{disabled:true,heading:"Live Video Chat With Sign Language Parsing!!",link:"#"}}/>
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
      class="bg-[#191919] rounded-2xl px-5 py-8 relative overflow-hidden h-full"
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
      <div class="relative flex flex-col justify-between h-full">
       <div>
       <h1 class="text-3xl font-semibold mb-8">{heading}</h1>
       </div>
        <button
          className={` py-3 w-full text-center rounded-full text-g font-semibold bg-slate-500 `}
          onClick={onClick}
        >
          {disabled ? "Coming Soon..." : btnText}
        </button>
      </div>
    </div></Link>
  )
}
export default home
