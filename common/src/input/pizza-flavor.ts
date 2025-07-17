import { z } from "zod/v4"
import { recordEntries } from "@/util/record-entries"

export const pizzaFlavorSchema = z.enum(["nothing", "alternative", "margherita", "pepperoni"])

export type PizzaFlavor = z.output<typeof pizzaFlavorSchema>

const PizzaFlavourMetadata: Record<PizzaFlavor, { label: string }> = {
  nothing: { label: "Nothing" },
  alternative: { label: "Alternative" },
  margherita: { label: "Margherita" },
  pepperoni: { label: "Pepperoni" },
}

export const pizzaFlavourOptions = recordEntries(PizzaFlavourMetadata).map(([value, metadata]) => ({
  value,
  label: metadata.label,
})) satisfies Array<{
  value: PizzaFlavor
  label: string
}>
