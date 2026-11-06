import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "Danh mục",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tên danh mục",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "Mã danh mục ổn định, ví dụ plushies hoặc flowers.",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Nhóm sản phẩm",
      type: "string",
      options: {
        list: [
          { title: "Thú bông len", value: "plushies" },
          { title: "Hoa len", value: "flowers" },
          { title: "Túi len", value: "bags" },
          { title: "Móc khóa", value: "keychains" },
          { title: "Quà cá nhân hóa", value: "gifts" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Ảnh danh mục",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Mô tả ảnh",
          type: "localizedString",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: { title: "title.vi", subtitle: "title.en", media: "image" },
  },
  orderings: [
    {
      title: "Thứ tự hiển thị",
      name: "displayOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
})
