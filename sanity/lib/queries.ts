import { defineQuery } from "next-sanity"

export const STOREFRONT_QUERY = defineQuery(`{
  "categories": *[_type == "category"] | order(sortOrder asc, _createdAt asc) {
    "id": _id, kind,
    "name": coalesce(select($locale == "vi" => title.vi, title.en), title.vi, title.en, ""),
    image,
    "imageAlt": coalesce(select($locale == "vi" => image.alt.vi, image.alt.en), image.alt.vi, image.alt.en, select($locale == "vi" => title.vi, title.en), title.vi, title.en, "")
  },
  "products": *[_type == "product" && visible != false && defined(category->_id)] | order(sortOrder asc, _createdAt asc) {
    "id": _id, "category": category._ref,
    "name": coalesce(select($locale == "vi" => title.vi, title.en), title.vi, title.en, ""),
    "description": coalesce(select($locale == "vi" => description.vi, description.en), description.vi, description.en, ""),
    "note": coalesce(select($locale == "vi" => note.vi, note.en), note.vi, note.en, ""),
    image,
    "imageAlt": coalesce(select($locale == "vi" => image.alt.vi, image.alt.en), image.alt.vi, image.alt.en, select($locale == "vi" => title.vi, title.en), title.vi, title.en, ""),
    "amount": select(pricing == "fixed" => amount, null),
    "featured": coalesce(featured, false),
    "isSample": coalesce(isSample, false),
    "availability": coalesce(availability, "madeToOrder")
  },
  "settings": *[_type == "shopSettings" && _id == "shopSettings"][0]{zaloUrl, messengerUrl, instagramUrl}
}`)
