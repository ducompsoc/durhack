import { SectionHeader } from "@/components/section-header"

export default function Guilds() {
  return (
    <div className="text-center px-16">

      <SectionHeader>Guilds</SectionHeader>

      <div className="text-center text-lg md:text-xl px-4 sm:px-8 md:px-12 lg:px-24">
        Guilds text goes here. needs to be rewritten for 2024
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full">
          <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/centre-of-the-earth/icon.svg"/>
          <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/atlantis/icon.svg"/>
          <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/moon/icon.svg"/>
          <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/mysterious-island/icon.svg"/>
        </div>
      </div>

    </div>
  );
}
