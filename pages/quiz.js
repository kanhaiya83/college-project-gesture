import React, { useRef, useState, useEffect } from "react"
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import { drawHand } from "../components/handposeutil"
import * as fp from "fingerpose"
import Handsigns from "../components/handsigns"
import toast, { Toaster } from 'react-hot-toast';

import { Signimage, Signpass } from "../components/handimage" 

import { BallTriangle } from "react-loader-spinner"
import { useRouter } from "next/router"
import Image from "next/image"

export default function Home() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [loader, setLoader] = useState(true)
  const [hint, setHint] = useState(false)
  const [camState, setCamState] = useState("on")


  let signList = []
  let currentSign = 0

  let gamestate = "started"


  async function runHandpose() {
    const net = await handpose.load()
    _signList()

    setInterval(() => {
      detect(net)
    }, 150)
  }

  function _signList() {
    signList = generateSigns()
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function generateSigns() {
    const password = shuffle(Signpass).slice(0,10)
    return password
  }

  async function detect(net) {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canvas height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // Make Detections
      const hand = await net.estimateHands(video)

      if (hand.length > 0) {
        //loading the fingerpose model
        const GE = new fp.GestureEstimator([
          fp.Gestures.ThumbsUpGesture,
          Handsigns.aSign,
          Handsigns.bSign,
          Handsigns.cSign,
          Handsigns.dSign,
          Handsigns.eSign,
          Handsigns.fSign,
          Handsigns.gSign,
          Handsigns.hSign,
          Handsigns.iSign,
          Handsigns.jSign,
          Handsigns.kSign,
          Handsigns.lSign,
          Handsigns.mSign,
          Handsigns.nSign,
          Handsigns.oSign,
          Handsigns.pSign,
          Handsigns.qSign,
          Handsigns.rSign,
          Handsigns.sSign,
          Handsigns.tSign,
          Handsigns.uSign,
          Handsigns.vSign,
          Handsigns.wSign,
          Handsigns.xSign,
          Handsigns.ySign,
          Handsigns.zSign,
        ])

        const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5)
      
        if (
          estimatedGestures.gestures !== undefined &&
          estimatedGestures.gestures.length > 0
        ) {
          const confidence = estimatedGestures.gestures.map(p => p.confidence)
          const maxConfidence = confidence.indexOf(
            Math.max.apply(undefined, confidence)
          )

          //setting up game state, looking for thumb emoji
          if (gamestate !== "played") {
            _signList()
            gamestate = "played"
            setLoader(false)
            // document.querySelector(".tutor-text").innerText =
            //   "make a hand gesture based on letter shown below"
          } else if (gamestate === "played") {
            // document.querySelector("#app-title").innerText = ""

            //looping the sign list
            if (currentSign === signList.length) {
              _signList()
              currentSign = 0
              return
            }

            
            //game play state

            if (
              typeof signList[currentSign].src.src === "string" ||
              signList[currentSign].src.src instanceof String
            ) {
              document
                .getElementById("letter-container").textContent = signList[currentSign].alt

              document
              .getElementById("emoji-image")
              .setAttribute("src", signList[currentSign].src.src)

              if (
                signList[currentSign].alt ===
                estimatedGestures.gestures[maxConfidence].name
              ) {
                toast.success("Yay,You guess it right!!")
                currentSign++
              }
            }
          } else if (gamestate === "finished") {
            return
          }
        }
      }
      // Draw hand lines
      const ctx = canvasRef.current.getContext("2d")
      drawHand(hand, ctx)
    }
  }

  

  useEffect(() => {
    runHandpose()
  }, [])
const router = useRouter()
  function handleClose() {
    setLoader(true)
    router.push("/")
  }
  return (
    <div class="bg-black min-h-screen md:h-screen pt-8 px-[5%] text-white relative">
      <button class="bg-red-500 py-2 px-4 text-lg font-medium absolute right-[5%] top-6 rounded-lg" onClick={handleClose}>Close</button>
      <h1 class="text-5xl font-semibold text-center mb-12">
        Learn Sign Alphabets
      </h1>
      <div class="flex gap-4">
        <div class="flex-[3]">
          <div class="relative pt-[56%] w-full">
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
              {camState === "on" ? (
                <Webcam id="webcam" ref={webcamRef} />
              ) : (
                <div id="webcam" background="black"></div>
              )}
              <canvas id="gesture-canvas" ref={canvasRef} style={{}} />
             
            </div>
          </div>
        </div>
        <div class="flex-[2] bg-[#191919] rounded-3xl">
          <div class="flex flex-col items-center gap-4 py-6 w-full">
            <h2 class="text-2xl font-medium">Guess this Letter</h2>
            <h1 id="letter-container" className="text-[10rem]"></h1>
            <button className="py-2 px-4 rounded-sm text-sm bg-slate-600" onClick={()=>{setHint(true)}}>Show Hint</button>
            <Image src="" alt="" className={`w-16 ${!hint && "hidden"}`} id="emoji-image" />
          </div>
        </div>
      </div>
      <div
                class={`bg-[#191919] z-100 absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-6 ${
                  !loader && "hidden"
                }`}
              >
                <BallTriangle
                  height={200}
                  width={200}
                  radius={5}
                  color="#fff"
                  ariaLabel="ball-triangle-loading"
                  wrapperClass={{}}
                  wrapperStyle=""
                  visible={true}
                />
                <p>Loading...</p>
              </div>
              <Toaster/>
    </div>
  )
}
