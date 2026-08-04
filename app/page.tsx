// import { HeartPulse } from "lucide-react"
// import { PredictorForm } from "@/components/predictor/predictor-form"

// export default function Page() {
//   return (
//     <main className="min-h-dvh bg-background">
//       <header className="border-b border-border bg-card/70 backdrop-blur">
//         <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
//           <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
//             <HeartPulse className="size-6" aria-hidden="true" />
//           </span>
//           <div>
//             <h1 className="text-lg font-semibold tracking-tight text-foreground text-balance">
//               Hospital Readmission Risk Predictor
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Clinical decision support for 30-day readmission risk
//             </p>
//           </div>
//         </div>
//       </header>

//       <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
//         <PredictorForm />
//         <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
//           For clinical decision support only. Predictions should be interpreted
//           alongside professional medical judgment.
//         </p>
//       </div>
//     </main>
//   )
// }



import { HeartPulse } from "lucide-react"
import { PredictorForm } from "@/components/predictor/predictor-form"
import { ChatWidget } from "@/components/chatbot/chat-widget"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b border-border bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <HeartPulse className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground text-balance">
              Hospital Readmission Risk Predictor
            </h1>
            <p className="text-sm text-muted-foreground">
              Clinical decision support for 30-day readmission risk
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <PredictorForm />
        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
          For clinical decision support only. Predictions should be interpreted
          alongside professional medical judgment.
        </p>
      </div>

      <ChatWidget />
    </main>
  )
}