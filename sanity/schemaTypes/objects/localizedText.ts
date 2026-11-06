import { TranslateIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const localizedText = defineType({
  name: "localizedText",
  title: "Đoạn văn Việt / Anh",
  type: "object",
  icon: TranslateIcon,
  fields: [
    defineField({ name: "vi", title: "Tiếng Việt", type: "text", rows: 4 }),
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
  ],
})
