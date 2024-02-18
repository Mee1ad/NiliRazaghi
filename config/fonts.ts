import {Fira_Code as FontMono, Inter as FontSans, Josefin_Sans as FontJosefin} from "next/font/google"

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const fontMono = FontMono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export const fontJosefin = FontJosefin({
    subsets: ["latin"],
    variable: "--font-josefin"
})