// "use client"

// import { useState } from "react"
// import {
//   User,
//   BedDouble,
//   Pill,
//   CalendarClock,
//   ClipboardList,
//   Loader2,
//   Stethoscope,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   SectionCard,
//   NumberField,
//   SelectField,
//   ToggleField,
// } from "./form-primitives"
// import { ResultCard, type PredictionResult } from "./result-card"

// const flagFields = [
//   { id: "race_Caucasian", label: "Race: Caucasian" },
//   { id: "diag_1_Other", label: "Diagnosis 1: Other" },
//   { id: "diag_2_Other", label: "Diagnosis 2: Other" },
//   { id: "diag_2_Diabetes", label: "Diagnosis 2: Diabetes" },
//   { id: "diag_3_Other", label: "Diagnosis 3: Other" },
//   { id: "diag_3_Diabetes", label: "Diagnosis 3: Diabetes" },
//   { id: "medical_specialty_Unknown", label: "Specialty: Unknown" },
//   { id: "medical_specialty_InternalMedicine", label: "Specialty: Internal Medicine" },
//   { id: "admission_source_id_7", label: "Admission Source: 7" },
//   { id: "admission_type_id_2", label: "Admission Type: 2" },
//   { id: "admission_type_id_3", label: "Admission Type: 3" },
//   { id: "discharge_disposition_id_6", label: "Discharge Disposition: 6" },
// ] as const

// type FlagKey = (typeof flagFields)[number]["id"]

// const initialNumbers = {
//   age: 65,
//   time_in_hospital: 4,
//   num_procedures: 1,
//   num_medications: 12,
//   num_lab_procedures: 40,
//   number_diagnoses: 7,
//   total_meds_prescribed: 15,
//   num_med_increased: 0,
//   num_med_decreased: 0,
//   number_inpatient: 0,
//   number_outpatient: 0,
//   number_emergency: 0,
// }

// type NumberKey = keyof typeof initialNumbers

// export function PredictorForm() {
//   const [numbers, setNumbers] = useState<Record<NumberKey, number | "">>(initialNumbers)
//   const [gender, setGender] = useState("Male")
//   const [change, setChange] = useState("No change")
//   const [a1c, setA1c] = useState("Not Tested")
//   const [flags, setFlags] = useState<Record<FlagKey, boolean>>(
//     () =>
//       Object.fromEntries(flagFields.map((f) => [f.id, false])) as Record<
//         FlagKey,
//         boolean
//       >,
//   )

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [result, setResult] = useState<PredictionResult | null>(null)

//   const setNumber = (key: NumberKey) => (value: number | "") =>
//     setNumbers((prev) => ({ ...prev, [key]: value }))

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setResult(null)

//     const payload = {
//       ...numbers,
//       gender,
//       change,
//       A1Cresult: a1c,
//       ...Object.fromEntries(
//         flagFields.map((f) => [f.id, flags[f.id] ? 1 : 0]),
//       ),
//     }

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_URL
//       if (!baseUrl) {
//         throw new Error(
//           "NEXT_PUBLIC_API_URL is not configured. Please set it in your project environment variables.",
//         )
//       }
//       const res = await fetch(`${baseUrl}/predict`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       })
//       if (!res.ok) {
//         throw new Error(`Request failed with status ${res.status}`)
//       }
//       const data = (await res.json()) as PredictionResult
//       setResult(data)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//         <SectionCard
//           icon={<User className="size-5" aria-hidden="true" />}
//           title="Patient Info"
//           description="Basic demographic details for the patient."
//         >
//           <NumberField
//             id="age"
//             label="Age"
//             value={numbers.age}
//             onChange={setNumber("age")}
//           />
//           <SelectField
//             id="gender"
//             label="Gender"
//             value={gender}
//             onChange={setGender}
//             options={[
//               { label: "Male", value: "Male" },
//               { label: "Female", value: "Female" },
//             ]}
//           />
//         </SectionCard>

//         <SectionCard
//           icon={<BedDouble className="size-5" aria-hidden="true" />}
//           title="Hospital Stay"
//           description="Utilization during the current inpatient stay."
//         >
//           <NumberField
//             id="time_in_hospital"
//             label="Time in Hospital (days)"
//             value={numbers.time_in_hospital}
//             onChange={setNumber("time_in_hospital")}
//           />
//           <NumberField
//             id="num_procedures"
//             label="Number of Procedures"
//             value={numbers.num_procedures}
//             onChange={setNumber("num_procedures")}
//           />
//           <NumberField
//             id="num_medications"
//             label="Number of Medications"
//             value={numbers.num_medications}
//             onChange={setNumber("num_medications")}
//           />
//           <NumberField
//             id="num_lab_procedures"
//             label="Number of Lab Procedures"
//             value={numbers.num_lab_procedures}
//             onChange={setNumber("num_lab_procedures")}
//           />
//           <NumberField
//             id="number_diagnoses"
//             label="Number of Diagnoses"
//             value={numbers.number_diagnoses}
//             onChange={setNumber("number_diagnoses")}
//           />
//           <NumberField
//             id="total_meds_prescribed"
//             label="Total Meds Prescribed"
//             value={numbers.total_meds_prescribed}
//             onChange={setNumber("total_meds_prescribed")}
//           />
//         </SectionCard>

//         <SectionCard
//           icon={<Pill className="size-5" aria-hidden="true" />}
//           title="Medication Changes"
//           description="Adjustments to the patient&apos;s medication regimen."
//         >
//           <SelectField
//             id="change"
//             label="Medication Change"
//             value={change}
//             onChange={setChange}
//             options={[
//               { label: "No change", value: "No change" },
//               { label: "Changed", value: "Changed" },
//             ]}
//           />
//           <SelectField
//             id="A1Cresult"
//             label="A1C Result"
//             value={a1c}
//             onChange={setA1c}
//             options={[
//               { label: "Not Tested", value: "Not Tested" },
//               { label: "Normal", value: "Normal" },
//               { label: ">7", value: ">7" },
//               { label: ">8", value: ">8" },
//             ]}
//           />
//           <NumberField
//             id="num_med_increased"
//             label="Meds Increased"
//             value={numbers.num_med_increased}
//             onChange={setNumber("num_med_increased")}
//           />
//           <NumberField
//             id="num_med_decreased"
//             label="Meds Decreased"
//             value={numbers.num_med_decreased}
//             onChange={setNumber("num_med_decreased")}
//           />
//         </SectionCard>

//         <SectionCard
//           icon={<CalendarClock className="size-5" aria-hidden="true" />}
//           title="Visit History"
//           description="Prior visits over the preceding year."
//         >
//           <NumberField
//             id="number_inpatient"
//             label="Inpatient Visits"
//             value={numbers.number_inpatient}
//             onChange={setNumber("number_inpatient")}
//           />
//           <NumberField
//             id="number_outpatient"
//             label="Outpatient Visits"
//             value={numbers.number_outpatient}
//             onChange={setNumber("number_outpatient")}
//           />
//           <NumberField
//             id="number_emergency"
//             label="Emergency Visits"
//             value={numbers.number_emergency}
//             onChange={setNumber("number_emergency")}
//           />
//         </SectionCard>

//         <SectionCard
//           icon={<ClipboardList className="size-5" aria-hidden="true" />}
//           title="Diagnosis & Admission Flags"
//           description="Toggle any flags that apply to this encounter."
//         >
//           {flagFields.map((f) => (
//             <ToggleField
//               key={f.id}
//               id={f.id}
//               label={f.label}
//               checked={flags[f.id]}
//               onChange={(checked) =>
//                 setFlags((prev) => ({ ...prev, [f.id]: checked }))
//               }
//             />
//           ))}
//         </SectionCard>

//         <div className="flex flex-col gap-3">
//           <Button
//             type="submit"
//             size="lg"
//             disabled={loading}
//             className="h-12 w-full rounded-xl text-base"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="size-5 animate-spin" aria-hidden="true" />
//                 Analyzing…
//               </>
//             ) : (
//               "Predict Readmission Risk"
//             )}
//           </Button>
//           {error ? (
//             <p
//               role="alert"
//               className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
//             >
//               {error}
//             </p>
//           ) : null}
//         </div>
//       </form>

//       <aside className="lg:sticky lg:top-8">
//         {result ? (
//           <ResultCard result={result} />
//         ) : (
//           <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center">
//             <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
//               <Stethoscope className="size-6" aria-hidden="true" />
//             </span>
//             <h2 className="text-base font-semibold text-foreground">
//               Awaiting Assessment
//             </h2>
//             <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
//               Complete the patient form and submit to generate a 30-day
//               readmission risk prediction.
//             </p>
//           </div>
//         )}
//       </aside>
//     </div>
//   )
// }








// changed code
"use client"

import { useState } from "react"
import {
  User,
  BedDouble,
  Pill,
  CalendarClock,
  ClipboardList,
  Loader2,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SectionCard,
  NumberField,
  SelectField,
  ToggleField,
} from "./form-primitives"
import { ResultCard, type PredictionResult } from "./result-card"

const flagFields = [
  { id: "race_Caucasian", label: "Race: Caucasian" },
  { id: "diag_1_Other", label: "Diagnosis 1: Other" },
  { id: "diag_2_Other", label: "Diagnosis 2: Other" },
  { id: "diag_2_Diabetes", label: "Diagnosis 2: Diabetes" },
  { id: "diag_3_Other", label: "Diagnosis 3: Other" },
  { id: "diag_3_Diabetes", label: "Diagnosis 3: Diabetes" },
  { id: "medical_specialty_Unknown", label: "Specialty: Unknown" },
  { id: "medical_specialty_InternalMedicine", label: "Specialty: Internal Medicine" },
  { id: "admission_source_id_7", label: "Admission Source: 7" },
  { id: "admission_type_id_2", label: "Admission Type: 2" },
  { id: "admission_type_id_3", label: "Admission Type: 3" },
  { id: "discharge_disposition_id_6", label: "Discharge Disposition: 6" },
] as const

type FlagKey = (typeof flagFields)[number]["id"]

const initialNumbers = {
  age: 65,
  time_in_hospital: 4,
  num_procedures: 1,
  num_medications: 12,
  num_lab_procedures: 40,
  number_diagnoses: 7,
  total_meds_prescribed: 15,
  num_med_increased: 0,
  num_med_decreased: 0,
  number_inpatient: 0,
  number_outpatient: 0,
  number_emergency: 0,
}

type NumberKey = keyof typeof initialNumbers

// CHANGE 1: added this map (new code)
const a1cMap: Record<string, number> = {
  "Not Tested": 0,
  "Normal": 1,
  ">7": 2,
  ">8": 3,
}

export function PredictorForm() {
  const [numbers, setNumbers] = useState<Record<NumberKey, number | "">>(initialNumbers)
  const [gender, setGender] = useState("Male")
  const [change, setChange] = useState("No change")
  const [a1c, setA1c] = useState("Not Tested")
  const [flags, setFlags] = useState<Record<FlagKey, boolean>>(
    () =>
      Object.fromEntries(flagFields.map((f) => [f.id, false])) as Record<FlagKey, boolean>,
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const setNumber = (key: NumberKey) => (value: number | "") =>
    setNumbers((prev) => ({ ...prev, [key]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    // CHANGE 2: gender/change/A1Cresult now converted to numbers
    const payload = {
      ...numbers,
      gender: gender === "Male" ? 1 : 0,
      change: change === "Changed" ? 1 : 0,
      A1Cresult: a1cMap[a1c],
      ...Object.fromEntries(
        flagFields.map((f) => [f.id, flags[f.id] ? 1 : 0]),
      ),
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL
      if (!baseUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured. Please set it in your project environment variables.",
        )
      }
      const res = await fetch(`${baseUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      const data = (await res.json()) as PredictionResult
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <SectionCard
          icon={<User className="size-5" aria-hidden="true" />}
          title="Patient Info"
          description="Basic demographic details for the patient."
        >
          <NumberField
            id="age"
            label="Age"
            value={numbers.age}
            onChange={setNumber("age")}
          />
          <SelectField
            id="gender"
            label="Gender"
            value={gender}
            onChange={setGender}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
          />
        </SectionCard>

        <SectionCard
          icon={<BedDouble className="size-5" aria-hidden="true" />}
          title="Hospital Stay"
          description="Utilization during the current inpatient stay."
        >
          <NumberField
            id="time_in_hospital"
            label="Time in Hospital (days)"
            value={numbers.time_in_hospital}
            onChange={setNumber("time_in_hospital")}
          />
          <NumberField
            id="num_procedures"
            label="Number of Procedures"
            value={numbers.num_procedures}
            onChange={setNumber("num_procedures")}
          />
          <NumberField
            id="num_medications"
            label="Number of Medications"
            value={numbers.num_medications}
            onChange={setNumber("num_medications")}
          />
          <NumberField
            id="num_lab_procedures"
            label="Number of Lab Procedures"
            value={numbers.num_lab_procedures}
            onChange={setNumber("num_lab_procedures")}
          />
          <NumberField
            id="number_diagnoses"
            label="Number of Diagnoses"
            value={numbers.number_diagnoses}
            onChange={setNumber("number_diagnoses")}
          />
          <NumberField
            id="total_meds_prescribed"
            label="Total Meds Prescribed"
            value={numbers.total_meds_prescribed}
            onChange={setNumber("total_meds_prescribed")}
          />
        </SectionCard>

        <SectionCard
          icon={<Pill className="size-5" aria-hidden="true" />}
          title="Medication Changes"
          description="Adjustments to the patient&apos;s medication regimen."
        >
          <SelectField
            id="change"
            label="Medication Change"
            value={change}
            onChange={setChange}
            options={[
              { label: "No change", value: "No change" },
              { label: "Changed", value: "Changed" },
            ]}
          />
          <SelectField
            id="A1Cresult"
            label="A1C Result"
            value={a1c}
            onChange={setA1c}
            options={[
              { label: "Not Tested", value: "Not Tested" },
              { label: "Normal", value: "Normal" },
              { label: ">7", value: ">7" },
              { label: ">8", value: ">8" },
            ]}
          />
          <NumberField
            id="num_med_increased"
            label="Meds Increased"
            value={numbers.num_med_increased}
            onChange={setNumber("num_med_increased")}
          />
          <NumberField
            id="num_med_decreased"
            label="Meds Decreased"
            value={numbers.num_med_decreased}
            onChange={setNumber("num_med_decreased")}
          />
        </SectionCard>

        <SectionCard
          icon={<CalendarClock className="size-5" aria-hidden="true" />}
          title="Visit History"
          description="Prior visits over the preceding year."
        >
          <NumberField
            id="number_inpatient"
            label="Inpatient Visits"
            value={numbers.number_inpatient}
            onChange={setNumber("number_inpatient")}
          />
          <NumberField
            id="number_outpatient"
            label="Outpatient Visits"
            value={numbers.number_outpatient}
            onChange={setNumber("number_outpatient")}
          />
          <NumberField
            id="number_emergency"
            label="Emergency Visits"
            value={numbers.number_emergency}
            onChange={setNumber("number_emergency")}
          />
        </SectionCard>

        <SectionCard
          icon={<ClipboardList className="size-5" aria-hidden="true" />}
          title="Diagnosis & Admission Flags"
          description="Toggle any flags that apply to this encounter."
        >
          {flagFields.map((f) => (
            <ToggleField
              key={f.id}
              id={f.id}
              label={f.label}
              checked={flags[f.id]}
              onChange={(checked) =>
                setFlags((prev) => ({ ...prev, [f.id]: checked }))
              }
            />
          ))}
        </SectionCard>

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-12 w-full rounded-xl text-base"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                Analyzing…
              </>
            ) : (
              "Predict Readmission Risk"
            )}
          </Button>
          {error ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
        </div>
      </form>

      <aside className="lg:sticky lg:top-8">
        {result ? (
          <ResultCard result={result} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center">
            <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Stethoscope className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-base font-semibold text-foreground">
              Awaiting Assessment
            </h2>
            <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              Complete the patient form and submit to generate a 30-day
              readmission risk prediction.
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}