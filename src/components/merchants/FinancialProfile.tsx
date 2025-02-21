import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormData } from "./MerchantForm"

interface FinancialProfileStepProps {
  formData: FormData
  updateFormData: (field: keyof FormData, value: any) => void
  errors: Partial<FormData>
}

const FinancialProfileStep: React.FC<FinancialProfileStepProps> = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="income">Income Range</Label>
        <Input
          id="income"
          value={formData.income}
          onChange={(e) => updateFormData("income", e.target.value)}
          className={errors.income ? "border-red-500" : ""}
        />
        {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income}</p>}
      </div>
      <div>
        <Label htmlFor="sourceOfFunds">Source of Funds</Label>
        <Input
          id="sourceOfFunds"
          value={formData.sourceOfFunds}
          onChange={(e) => updateFormData("sourceOfFunds", e.target.value)}
          className={errors.sourceOfFunds ? "border-red-500" : ""}
        />
        {errors.sourceOfFunds && <p className="text-red-500 text-sm mt-1">{errors.sourceOfFunds}</p>}
      </div>
      <div>
        <Label htmlFor="employmentStatus">Employment Status</Label>
        <Input
          id="employmentStatus"
          value={formData.employmentStatus}
          onChange={(e) => updateFormData("employmentStatus", e.target.value)}
          className={errors.employmentStatus ? "border-red-500" : ""}
        />
        {errors.employmentStatus && <p className="text-red-500 text-sm mt-1">{errors.employmentStatus}</p>}
      </div>
      <div>
        <Label htmlFor="employerName">Employer Name</Label>
        <Input
          id="employerName"
          value={formData.employerName}
          onChange={(e) => updateFormData("employerName", e.target.value)}
          className={errors.employerName ? "border-red-500" : ""}
        />
      </div>
      <div>
        <Label htmlFor="investmentExperience">Investment Experience</Label>
        <Input
          id="investmentExperience"
          value={formData.investmentExperience}
          onChange={(e) => updateFormData("investmentExperience", e.target.value)}
          className={errors.investmentExperience ? "border-red-500" : ""}
        />
      </div>
      <div>
        <Label htmlFor="riskTolerance">Risk Tolerance</Label>
        <Input
          id="riskTolerance"
          value={formData.riskTolerance}
          onChange={(e) => updateFormData("riskTolerance", e.target.value)}
          className={errors.riskTolerance ? "border-red-500" : ""}
        />
      </div>
    </div>
  )
}

export default FinancialProfileStep

