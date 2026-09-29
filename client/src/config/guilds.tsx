export type GuildConfig = {
  name: string
  imgSrc: {
    src: string
    width: number
    height: number
  }
}

export const guilds: GuildConfig[] = [
  {
    name: "Skyline",
    imgSrc: { src: "/assets/guilds/skyline.svg", width: 3384, height: 1211 },
  },
  {
    name: "Plaza",
    imgSrc: { src: "/assets/guilds/plaza.svg", width: 3457, height: 1090 },
  },
  {
    name: "Metro",
    imgSrc: { src: "/assets/guilds/metro.svg", width: 3367, height: 3387 },
  },
]
