import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export default async function NotFound() {
  const t = await getTranslations("NotFound")
  return (
    <main className="container py-24">
      <h1 className="font-editorial text-4xl">{t("title")}</h1>
      <p className="my-5">{t("description")}</p>
      <Link href="/" className="text-link">
        {t("back")}
      </Link>
    </main>
  )
}
