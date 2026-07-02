"use client"

import { AlertTriangle, ShieldCheck, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

export type PredictionResult = {
  readmission_risk: string
  probability: number
  message: string
}

export function ResultCard({ result }: { result: PredictionResult }) {
  const isHigh = result.readmission_risk?.toUpperCase() === "HIGH"
  // Normalize probability to a 0-100 percentage.
  const pct = Math.max(
    0,
    Math.min(100, result.probability <= 1 ? result.probability * 100 : result.probability),
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Activity className="size-4 text-primary" aria-hidden="true" />
        Prediction Result
      </div>

      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3.5",
          isHigh
            ? "border-destructive/30 bg-destructive/10 text-destructive"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        )}
      >
        {isHigh ? (
          <AlertTriangle className="size-6 shrink-0" aria-hidden="true" />
        ) : (
          <ShieldCheck className="size-6 shrink-0" aria-hidden="true" />
        )}
        <span className="text-xl font-bold tracking-tight">
          {isHigh ? "HIGH RISK" : "LOW RISK"}
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Readmission Probability
          </span>
          <span className="text-2xl font-bold tabular-nums text-foreground">
            {pct.toFixed(1)}%
          </span>
        </div>
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              isHigh ? "bg-destructive" : "bg-emerald-500",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {result.message ? (
        <p className="mt-5 text-sm leading-relaxed text-foreground text-pretty">
          {result.message}
        </p>
      ) : null}
    </div>
  )
}
