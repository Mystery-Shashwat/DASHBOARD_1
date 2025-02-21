import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData} from './MerchantForm';

interface PersonalDetailsStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const PersonalDetailsStep = ({ formData, updateFormData }: PersonalDetailsStepProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Legal Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="As per official documents"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="For account notifications"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="Exact 10 digits"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Residential Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          placeholder="Your current residential address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => updateFormData('postalCode', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select 
            value={formData.nationality}
            onValueChange={(value) => updateFormData('nationality', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ind">India</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="idType">ID Type</Label>
          <Select 
            value={formData.idType}
            onValueChange={(value) => updateFormData('idType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="driving">Driving License</SelectItem>
              <SelectItem value="national">National ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="idNumber">ID Number</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => updateFormData('idNumber', e.target.value)}
            placeholder="Enter your ID number"
          />
        </div>
      </div>
    
    </div>
  );
};

export default PersonalDetailsStep;