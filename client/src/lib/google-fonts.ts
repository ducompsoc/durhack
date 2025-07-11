import { Audiowide, Electrolize, Space_Grotesk } from "next/font/google"

export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
export const audiowide = Audiowide({ weight: "400", subsets: ["latin"], fallback: ["sans-serif"] })
export const electrolize = Electrolize({ weight: "400", subsets: ["latin"] })
