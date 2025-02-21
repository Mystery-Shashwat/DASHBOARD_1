
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormData } from './MerchantForm';

interface FinancialProfileStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const FinancialProfileStep = ({ formData, updateFormData }: FinancialProfileStepProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Financial Profile</CardTitle>
        <p className="text-sm text-gray-500">Please provide your financial information to complete your profile</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Income and Source of Funds Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Income Information</h3>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="income" className="text-sm font-medium">Annual Income</Label>
              <Select 
                value={formData.income}
                onValueChange={(value) => updateFormData('income', value)}
              >
                <SelectTrigger className="w-full">
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
            <div className="space-y-2">
              <Label htmlFor="sourceOfFunds" className="text-sm font-medium">Source of Funds</Label>
              <Select 
                value={formData.sourceOfFunds}
                onValueChange={(value) => updateFormData('sourceOfFunds', value)}
              >
                <SelectTrigger className="w-full">
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
        </div>

        {/* Employment Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Employment Details</h3>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="employmentStatus" className="text-sm font-medium">Employment Status</Label>
              <Select 
                value={formData.employmentStatus}
                onValueChange={(value) => updateFormData('employmentStatus', value)}
              >
                <SelectTrigger className="w-full">
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
            <div className="space-y-2">
              <Label htmlFor="employerName" className="text-sm font-medium">Employer Name</Label>
              <Input
                id="employerName"
                value={formData.employerName}
                onChange={(e) => updateFormData('employerName', e.target.value)}
                placeholder="Current employer"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Investment Experience Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Investment Profile</h3>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Investment Experience</Label>
              <RadioGroup
                value={formData.investmentExperience}
                onValueChange={(value) => updateFormData('investmentExperience', value)}
                className="space-y-2"
              >
                {[
                  { value: 'none', label: 'No Experience' },
                  { value: 'beginner', label: 'Beginner (1-2 years)' },
                  { value: 'intermediate', label: 'Intermediate (3-5 years)' },
                  { value: 'advanced', label: 'Advanced (5+ years)' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Risk Tolerance</Label>
              <RadioGroup
                value={formData.riskTolerance}
                onValueChange={(value) => updateFormData('riskTolerance', value)}
                className="space-y-2"
              >
                {[
                  { value: 'conservative', label: 'Conservative' },
                  { value: 'moderate', label: 'Moderate' },
                  { value: 'aggressive', label: 'Aggressive' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Compliance</h3>
          <Separator className="my-2" />
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pep"
                checked={formData.isPoliticallyExposed}
                onCheckedChange={(checked) => updateFormData('isPoliticallyExposed', checked)}
              />
              <Label htmlFor="pep" className="text-sm">I am a politically exposed person</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptedTerms}
                onCheckedChange={(checked) => updateFormData('acceptedTerms', checked)}
              />
              <Label htmlFor="terms" className="text-sm">I accept the terms and conditions</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialProfileStep;