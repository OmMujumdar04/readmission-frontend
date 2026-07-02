"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold leading-tight text-foreground text-balance">
            {title}
          </h2>
          {description ? (
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              {description}
            </p>
          ) : null}
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}

export function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string
  htmlFor: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const controlClasses =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"

export function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  className,
}: {
  id: string
  label: string
  value: number | ""
  onChange: (value: number | "") => void
  min?: number
  className?: string
}) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <input
        id={id}
        name={id}
        type="number"
        inputMode="numeric"
        min={min}
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className={controlClasses}
      />
    </Field>
  )
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  className,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  className?: string
}) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(controlClasses, "appearance-none bg-[length:0]")}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function ToggleField({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors",
        checked
          ? "border-primary/40 bg-primary/5 text-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-muted/50",
      )}
    >
      <span className="font-medium leading-snug">{label}</span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
          checked ? "bg-primary" : "bg-muted-foreground/30",
        )}
      >
        <span
          className={cn(
            "inline-block size-5 transform rounded-full bg-card shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </label>
  )
}
