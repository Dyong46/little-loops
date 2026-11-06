import { TranslateIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const localizedString = defineType({
  name: "localizedString",
  title: "Nội dung Việt / Anh",
  type: "object",
  icon: TranslateIcon,
  fields: [
    defineField({
      name: "vi",
      title: "Tiếng Việt",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
})
