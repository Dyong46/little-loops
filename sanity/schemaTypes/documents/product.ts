import { PackageIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const product = defineType({
  name: "product",
  title: "Sản phẩm",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Thông tin", default: true },
    { name: "publishing", title: "Hiển thị" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tên sản phẩm",
      type: "localizedString",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "details",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "localizedText",
      group: "details",
    }),
    defineField({
      name: "note",
      title: "Ghi chú ngắn",
      type: "localizedString",
      group: "details",
      description: "Ví dụ: Món quà nhỏ đầy ý nghĩa.",
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Ảnh sản phẩm",
      type: "image",
      group: "details",
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
      name: "pricing",
      title: "Cách báo giá",
      type: "string",
      group: "details",
      initialValue: "fixed",
      options: {
        layout: "radio",
        list: [
          { title: "Giá niêm yết (VND)", value: "fixed" },
          { title: "Liên hệ báo giá", value: "quote" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Giá (VND)",
      type: "number",
      group: "details",
      hidden: ({ document }) => document?.pricing === "quote",
      validation: (rule) =>
        rule
          .min(0)
          .integer()
          .custom((value, context) =>
            context.document?.pricing === "fixed" && value === undefined
              ? "Nhập giá niêm yết, hoặc chọn liên hệ báo giá."
              : true
          ),
    }),
    defineField({
      name: "availability",
      title: "Tình trạng",
      type: "string",
      group: "details",
      initialValue: "madeToOrder",
      options: {
        list: [
          { title: "Làm theo đơn", value: "madeToOrder" },
          { title: "Có sẵn", value: "ready" },
          { title: "Tạm ngừng nhận", value: "unavailable" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Sản phẩm nổi bật",
      type: "boolean",
      initialValue: true,
      group: "publishing",
    }),
    defineField({
      name: "visible",
      title: "Hiện trên website",
      type: "boolean",
      initialValue: true,
      group: "publishing",
    }),
    defineField({
      name: "isSample",
      title: "Nội dung minh họa",
      type: "boolean",
      initialValue: false,
      group: "publishing",
      description:
        "Bật nếu đây là sản phẩm mẫu, chưa phải sản phẩm thực tế của tiệm.",
    }),
    defineField({
      name: "sortOrder",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 0,
      group: "publishing",
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
