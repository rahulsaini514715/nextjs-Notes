import Link from "next/link"
import "../globals.css"
import style from "./tailwind.module.css"
export default function Tailwind() {
  return (
    <>
  <h1 className="text-red-700 bg-sky-500/20">Tailwind page  </h1>
  <h1 className={style.module_css}>MOdule CSS</h1>
        </>
  )
}
   