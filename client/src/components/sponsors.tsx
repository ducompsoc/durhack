"use client"
import configJson from "@/components/componentInfo"

const sponsors = configJson.sponsors

const sponsorScale = 0.7
const tierWidths = {
  platinum: 200,
  gold: 150,
  silver: 100,
}

const partnerScale = 0.75
const partnerWidth = 200

type Tier = "platinum" | "gold" | "silver"

export default function Sponsors() {
  return (
    <section className="section sponsors">
      <div>
        <div className="text-center">
          <h1>Sponsors</h1>
        </div>

        {Object.entries(sponsors).map(([tier, sponsorList]) => (
          <div key={tier} className="text-center">
            {tier === "partners" && sponsorList.length > 0 && (
              <div className="text-center">
                <h3>Partners</h3>
              </div>
            )}

            <div className={`${tier} flex flex-wrap justify-center gap-6`} key={tier}>
              {sponsorList.map((sponsor, index) => (
                <div key={index} className="sponsor biggest mb-5">
                  {index === 0 && tier !== "partners" && (
                    <div>
                      {tier === "silver" && (
                        <p className="bg-silverGradient text-transparent bg-clip-text font-bold text-[20px] -rotate-[30deg] -translate-x-1.5 absolute">
                          SILVER
                        </p>
                      )}

                      {tier === "gold" && (
                        <p className="bg-goldGradient text-transparent bg-clip-text font-bold text-[20px] -rotate-[30deg] translate-x-3 translate-y-3 absolute">
                          GOLD
                        </p>
                      )}

                      {tier === "platinum" && (
                        <p className="bg-platinumGradient text-transparent bg-clip-text font-bold text-[20px] -rotate-[30deg] translate-x-2 translate-y-6 absolute">
                          PLATINUM
                        </p>
                      )}
                    </div>
                  )}
                  <a
                    href={sponsor.link}
                    target="_blank"
                    style={{
                      width:
                        tier === "partners" ? `${partnerWidth}px` : `${Math.round(tierWidths[tier as Tier] * 1.1)}px`,
                      height:
                        tier === "partners"
                          ? `${Math.round(partnerWidth * partnerScale)}px`
                          : `${Math.round(tierWidths[tier as Tier] * 1.3)}px`,
                    }}
                    className={"relative flex flex-col items-center justify-center border-b-0 m-[10px] mx-[5px]"}
                    rel="noreferrer"
                  >
                    <img
                      src={`/assets/sponsors/${sponsor.image}`}
                      style={{
                        width:
                          tier === "partners"
                            ? `${Math.round(partnerWidth * partnerScale)}px`
                            : `${Math.round((tierWidths[tier as Tier] - tierWidths[tier as Tier] * 0.17) * sponsorScale)}px`,
                        maxHeight:
                          tier === "partners"
                            ? `${Math.round(partnerWidth * partnerScale)}px`
                            : `${Math.round((tierWidths[tier as Tier] - tierWidths[tier as Tier] * 0.17) * sponsorScale)}px`,
                      }}
                      className="relative z-40"
                    />
                    <img
                      src={`/assets/sponsors/tiles/${tier}.svg`}
                      style={{
                        width: tier === "partners" ? `${partnerWidth}px` : `${tierWidths[tier as Tier]}px`,
                        height: tier === "partners" ? `${partnerWidth}px` : "auto",
                      }}
                      className="absolute z-30"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
