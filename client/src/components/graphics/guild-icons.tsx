import * as React from "react"

type GuildIconProps = React.HTMLAttributes<SVGElement>

export function GuildAtlantisIcon(props: GuildIconProps) {
  return (
    <svg role="img" viewBox="0 0 1816 1816">
      <title>Atlantis</title>
      <use href="/assets/graphics/guild-icons.svg#guild-border"/>
      <use href="/assets/graphics/guild-icons.svg#guild-atlantis"/>
      <use href="/assets/graphics/guild-icons.svg#guild-gear"/>
    </svg>
  )
}

export function GuildCentreOfTheEarthIcon(props: GuildIconProps) {
  return (
    <svg role="img" viewBox="0 0 1816 1816">
      <title>Centre of the Earth</title>
      <use href="/assets/graphics/guild-icons.svg#guild-border"/>
      <use href="/assets/graphics/guild-icons.svg#guild-centre-of-the-earth"/>
      <use href="/assets/graphics/guild-icons.svg#guild-gear"/>
    </svg>
  )
}

export function GuildMoonIcon(props: GuildIconProps) {
  return (
    <svg role="img" viewBox="0 0 1816 1816">
      <title>Moon</title>
      <use href="/assets/graphics/guild-icons.svg#guild-border"/>
      <use href="/assets/graphics/guild-icons.svg#guild-moon"/>
      <use href="/assets/graphics/guild-icons.svg#guild-gear"/>
    </svg>
  )
}

export function GuildMysteriousIslandIcon(props: GuildIconProps) {
  return (
    <svg role="img" viewBox="0 0 1816 1816">
      <title>Mysterious Island</title>
      <use href="/assets/graphics/guild-icons.svg#guild-border"/>
      <use href="/assets/graphics/guild-icons.svg#guild-mysterious-island"/>
      <use href="/assets/graphics/guild-icons.svg#guild-gear"/>
    </svg>
  )
}
