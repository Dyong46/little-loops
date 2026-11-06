import type { SchemaTypeDefinition } from "sanity"
import { localizedString } from "./objects/localizedString"
import { localizedText } from "./objects/localizedText"
import { category } from "./documents/category"
import { product } from "./documents/product"
import { shopSettings } from "./documents/shopSettings"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localizedString, localizedText, category, product, shopSettings],
}
