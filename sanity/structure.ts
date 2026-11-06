import { CogIcon, PackageIcon, TagIcon } from "@sanity/icons"
import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Little Loops")
    .items([
      S.documentTypeListItem("product").title("Sản phẩm").icon(PackageIcon),
      S.documentTypeListItem("category").title("Danh mục").icon(TagIcon),
      S.divider(),
      S.listItem()
        .title("Thông tin shop")
        .icon(CogIcon)
        .child(
          S.document().schemaType("shopSettings").documentId("shopSettings")
        ),
    ])
