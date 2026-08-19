"use client"

export default function CvButton() {
  return (
    <a
      href="/SachitDahalCV.pdf"
      download
      className="inline-block"
    >
      <button
        className="relative flex items-center gap-2 px-6 py-3 text-white font-bold rounded-full shadow-lg cursor-pointer group/download
        bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600
        transform transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="20px"
          width="20px"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#f1f1f1"
            d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
          />
        </svg>
        curriculum vitae

        {/* Tooltip */}
        <div
          className="absolute text-xs uppercase scale-0 rounded-md py-2 px-2 bg-[#5c5fe9] left-2/4 -translate-x-1/2 mb-3 bottom-full group-hover/download:scale-100 origin-bottom transition-all duration-300 shadow-lg pointer-events-none
          before:content-[''] before:absolute before:top-full before:left-2/4 before:w-2 before:h-2 before:bg-[#5c5fe9] 
          before:rotate-45 before:-translate-y-2/4 before:-translate-x-2/4"
        >
          SachitDahalCV.pdf
        </div>
      </button>
    </a>
  )
}