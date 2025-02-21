import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from './MerchantForm';

interface FinancialProfileStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const FinancialProfileStep = ({ formData, updateFormData }: FinancialProfileStepProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="income">Annual Income</Label>
          <Select 
            value={formData.income}
            onValueChange={(value) => updateFormData('income', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-25000">$0 - $25,000</SelectItem>
              <SelectItem value="25001-50000">$25,001 - $50,000</SelectItem>
              <SelectItem value="50001-100000">$50,001 - $100,000</SelectItem>
              <SelectItem value="100001-250000">$100,001 - $250,000</SelectItem>
              <SelectItem value="250001+">$250,001+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sourceOfFunds">Source of Funds</Label>
          <Select 
            value={formData.sourceOfFunds}
            onValueChange={(value) => updateFormData('sourceOfFunds', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="business">Business Income</SelectItem>
              <SelectItem value="investment">Investment Returns</SelectItem>
              <SelectItem value="inheritance">Inheritance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="employmentStatus">Employment Status</Label>
          <Select 
            value={formData.employmentStatus}
            onValueChange={(value) => updateFormData('employmentStatus', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="self-employed">Self-employed</SelectItem>
              <SelectItem value="business-owner">Business Owner</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="employerName">Employer Name</Label>
          <Input
            id="employerName"
            value={formData.employerName}
            onChange={(e) => updateFormData('employerName', e.target.value)}
            placeholder="Current employer"
          />
        </div>
      </div>

      <div>
        <Label>Investment Experience</Label>
        <RadioGroup
          value={formData.investmentExperience}
          onValueChange={(value) => updateFormData('investmentExperience', value)}
          className="grid grid-cols-1 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">No Experience</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="beginner" id="beginner" />
            <Label htmlFor="beginner">Beginner (1-2 years)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediate" id="intermediate" />
            <Label htmlFor="intermediate">Intermediate (3-5 years)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="advanced" id="advanced" />
            <Label htmlFor="advanced">Advanced (5+ years)</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Risk Tolerance</Label>
        <RadioGroup
          value={formData.riskTolerance}
          onValueChange={(value) => updateFormData('riskTolerance', value)}
          className="grid grid-cols-1 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="conservative" id="conservative" />
            <Label htmlFor="conservative">Conservative</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate">Moderate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="aggressive" id="aggressive" />
            <Label htmlFor="aggressive">Aggressive</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Compliance Checks</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pep"
              checked={formData.isPoliticallyExposed}
              onCheckedChange={(checked) => updateFormData('isPoliticallyExposed', checked)}
            />
            <Label htmlFor="pep">I am a politically exposed person</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptedTerms}
              onCheckedChange={(checked) => updateFormData('acceptedTerms', checked)}
            />
            <Label htmlFor="terms">I accept the terms and conditions</Label>
      </div>
    </div>
        
      </div>
      
    </div>
  );
};

export default FinancialProfileStep;