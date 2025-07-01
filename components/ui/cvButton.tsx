"use client"

import { motion } from "framer-motion"

export default function CvButton() {
  return (
    <motion.div
       initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mt-16"
    >
      <button
        className="relative flex gap-1 px-8 py-4 bg-[#5c5fe9] text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 font-semibold shadow-xl active:shadow-inner transition-all duration-300 cursor-pointer group/download
        bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold
        py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
        >
          <g>
            <g>
              <g>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="#f1f1f1"
                  d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                />
              </g>
            </g>
          </g>
        </svg>
        curriculum vitae

        <div
          className="absolute text-xs uppercase scale-0 rounded-md py-2 px-2 bg-[#5c5fe9] left-2/4 mb-3 bottom-full group-hover/download:scale-100 origin-bottom transition-all duration-300 shadow-lg 
          before:content-[''] before:absolute before:top-full before:left-2/4 before:w-3 before:h-3 before:border-solid before:bg-[#5c5fe9] 
          before:rotate-45 before:-translate-y-2/4 before:-translate-x-2/4"
        >
          SachitDahalCV.pdf
        </div>
      </button>
    </motion.div>
  )
}
