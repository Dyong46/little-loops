import { CogIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const shopSettings = defineType({
  name: "shopSettings",
  title: "Thông tin shop",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "zaloUrl",
      title: "Liên hệ Zalo",
      type: "url",
      description: "Ví dụ https://zalo.me/…",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "messengerUrl",
      title: "Facebook Messenger",
      type: "url",
      description: "Ví dụ https://m.me/…",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
      description: "Ví dụ https://www.instagram.com/…",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Thông tin shop",
      subtitle: "Các kênh liên hệ của Little Loops",
    }),
  },
})
