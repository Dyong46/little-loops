"use client"

import { useState } from "react"
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
import { shop, type Product } from "@/lib/shop"

type ContactProps = {
  label?: string
  className?: string
  subject?: string
  floating?: boolean
}

function Channels({ subject }: { subject?: string }) {
  const [copied, setCopied] = useState(false)
  const message = subject
    ? `Hello Little Loops! I would love to know more about ${subject}.`
    : "Hello Little Loops! I have a crochet idea in mind."
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-secondary/60 p-4 text-sm leading-relaxed">
        <p className="mb-2 font-medium">Your conversation starter</p>
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
              <Check aria-hidden="true" /> Copied
            </>
          ) : (
            "Copy message"
          )}
        </Button>
        <span className="sr-only" role="status">
          {copied ? "Message copied to clipboard" : ""}
        </span>
      </div>
      {shop.channels.map((channel, index) => {
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
                {channel.detail}
              </span>
            </span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        ) : (
          <div key={channel.name} className="channel-link bg-muted/40">
            <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
            <span className="flex-1 font-medium">{channel.name}</span>
            <span className="text-xs text-muted-foreground">Coming soon</span>
          </div>
        )
      })}
      {!shop.channels.some((channel) => channel.url) && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          This is a shop preview. Contact channels will be available when the
          shop adds its social accounts.
        </p>
      )}
    </div>
  )
}

export function ContactButton({
  label = "Let’s make something lovely",
  className = "",
  subject,
  floating = false,
}: ContactProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={`${buttonVariants()} ${floating ? "contact-fab" : `shop-button ${className}`}`}
        type="button"
        aria-label={floating ? "Contact Little Loops" : undefined}
        data-motion-contact={floating ? "" : undefined}
      >
        {floating ? (
          <span className="flex items-center gap-2">
            <MessageCircle aria-hidden="true" className="size-5" />
            <span className="hidden sm:inline">Let’s chat</span>
          </span>
        ) : (
          <>
            {label}
            <ArrowUpRight aria-hidden="true" />
          </>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-3xl p-7 sm:max-w-md">
        <span className="eyebrow">A LITTLE HELLO</span>
        <DialogTitle className="font-editorial text-3xl font-normal">
          Lovely things start with a chat.
        </DialogTitle>
        <DialogDescription>
          Ask about{" "}
          {subject ||
            "a handmade piece, a thoughtful gift, or an idea of your own"}
          . Choose your favorite way to say hello.
        </DialogDescription>
        <Channels subject={subject} />
      </DialogContent>
    </Dialog>
  )
}

export function ProductDetails({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="product-enquiry" />
        }
        aria-label={`View ${product.name} and enquire`}
      >
        <ArrowUpRight aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-3xl p-7 sm:max-w-md">
        <span className="eyebrow">HANDMADE, JUST FOR YOU</span>
        <DialogTitle className="font-editorial text-3xl font-normal">
          {product.name}
        </DialogTitle>
        <DialogDescription>{product.description}</DialogDescription>
        <p className="text-lg font-medium text-primary">
          {product.price}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            · sample price
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Message us to confirm availability, colors, production time, delivery,
          and your final quote.
        </p>
        <Channels subject={product.name} />
      </DialogContent>
    </Dialog>
  )
}

export function SaveProduct({ name }: { name: string }) {
  const [saved, setSaved] = useState(false)
  return (
    <Button
      variant="ghost"
      size="icon"
      className="save-product"
      onClick={() => setSaved(!saved)}
      aria-label={`${saved ? "Unsave" : "Save"} ${name}`}
      aria-pressed={saved}
    >
      <Heart
        aria-hidden="true"
        className={saved ? "fill-primary text-primary" : ""}
      />
    </Button>
  )
}
