"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import {
  ArrowUpRight,
  Check,
  Heart,
  Camera as Instagram,
  MessageCircle,
  Send,
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ContactChannel, Product } from "@/lib/shop"

const ContactContext = createContext<ContactChannel[]>([])

export function ShopContactProvider({
  channels,
  children,
}: {
  channels: ContactChannel[]
  children: ReactNode
}) {
  return (
    <ContactContext.Provider value={channels}>
      {children}
    </ContactContext.Provider>
  )
}

type ContactProps = {
  label?: string
  className?: string
  subject?: string
  floating?: boolean
}

function Channels({ subject }: { subject?: string }) {
  const t = useTranslations("Contact")
  const channels = useContext(ContactContext)
  const [copied, setCopied] = useState(false)
  const message = subject
    ? t("messageSubject", { subject })
    : t("messageDefault")
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-secondary/60 p-4 text-sm leading-relaxed">
        <p className="mb-2 font-medium">{t("starter")}</p>
        <p className="text-muted-foreground">{message}</p>
        <Button
          variant="link"
          className="mt-2 h-11 px-0"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(message)
              setCopied(true)
            } catch {
              setCopied(false)
            }
          }}
        >
          {copied ? (
            <>
              <Check aria-hidden="true" /> {t("copied")}
            </>
          ) : (
            t("copy")
          )}
        </Button>
        <span className="sr-only" role="status">
          {copied ? t("copyStatus") : ""}
        </span>
      </div>
      {channels.map((channel, index) => {
        const Icon =
          index === 2 ? Instagram : index === 0 ? Send : MessageCircle
        return channel.url ? (
          <a
            key={channel.name}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-link"
          >
            <Icon aria-hidden="true" className="size-5 text-primary" />
            <span className="flex-1">
              <strong className="block font-medium">{channel.name}</strong>
              <span className="text-xs text-muted-foreground">
                {t(channel.name)}
              </span>
            </span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        ) : (
          <div key={channel.name} className="channel-link bg-muted/40">
            <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
            <span className="flex-1 font-medium">{channel.name}</span>
            <span className="text-xs text-muted-foreground">
              {t("comingSoon")}
            </span>
          </div>
        )
      })}
      {!channels.some((channel) => channel.url) && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t("preview")}
        </p>
      )}
    </div>
  )
}

export function ContactButton({
  label,
  className = "",
  subject,
  floating = false,
}: ContactProps) {
  const t = useTranslations("Contact")
  return (
    <Dialog>
      <DialogTrigger
        className={`${buttonVariants()} ${floating ? "contact-fab" : `shop-button ${className}`}`}
        type="button"
        aria-label={floating ? t("contactLabel") : undefined}
        data-motion-contact={floating ? "" : undefined}
      >
        {floating ? (
          <span className="flex items-center gap-2">
            <MessageCircle aria-hidden="true" className="size-5" />
            <span className="hidden sm:inline">{t("chat")}</span>
          </span>
        ) : (
          <>
            {label ?? t("defaultLabel")}
            <ArrowUpRight aria-hidden="true" />
          </>
        )}
      </DialogTrigger>
      <DialogContent
        closeLabel={t("close")}
        className="max-h-[90dvh] overflow-y-auto rounded-3xl p-7 sm:max-w-md"
      >
        <span className="eyebrow">{t("eyebrow")}</span>
        <DialogTitle className="font-editorial text-3xl font-normal">
          {t("title")}
        </DialogTitle>
        <DialogDescription>
          {t("description", { subject: subject || t("defaultSubject") })}
        </DialogDescription>
        <Channels subject={subject} />
      </DialogContent>
    </Dialog>
  )
}

export function ProductDetails({ product }: { product: Product }) {
  const t = useTranslations("Contact")
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="product-enquiry" />
        }
        aria-label={t("view", { name: product.name })}
      >
        <ArrowUpRight aria-hidden="true" />
      </DialogTrigger>
      <DialogContent
        closeLabel={t("close")}
        className="max-h-[90dvh] overflow-y-auto rounded-3xl p-7 sm:max-w-md"
      >
        <span className="eyebrow">{t("productEyebrow")}</span>
        <DialogTitle className="font-editorial text-3xl font-normal">
          {product.name}
        </DialogTitle>
        <DialogDescription>{product.description}</DialogDescription>
        <p className="text-lg font-medium text-primary">
          {product.price}{" "}
          {product.isSample && (
            <span className="text-xs font-normal text-muted-foreground">
              {t("samplePrice")}
            </span>
          )}
        </p>
        <p className="text-sm text-muted-foreground">{t("productNote")}</p>
        <Channels subject={product.name} />
      </DialogContent>
    </Dialog>
  )
}

export function SaveProduct({ name }: { name: string }) {
  const t = useTranslations("Contact")
  const [saved, setSaved] = useState(false)
  return (
    <Button
      variant="ghost"
      size="icon"
      className="save-product"
      onClick={() => setSaved(!saved)}
      aria-label={t(saved ? "unsave" : "save", { name })}
      aria-pressed={saved}
    >
      <Heart
        aria-hidden="true"
        className={saved ? "fill-primary text-primary" : ""}
      />
    </Button>
  )
}
