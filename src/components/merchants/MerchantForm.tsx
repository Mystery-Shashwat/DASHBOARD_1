"use client";

import React from "react";
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, ArrowLeft, ArrowRight } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "react-hot-toast";
import PersonalDetailsShimmer from "../PersonalDetailsShimmer";
const PersonalDetailsStep = React.lazy(() => import("./PersonalDetails"));
const FinancialProfileStep = React.lazy(() => import("./FinancialProfile"));

export interface FormData {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
  idType: string;
  idNumber: string;
  income: string;
  sourceOfFunds: string;
  employmentStatus: string;
  employerName: string;
  investmentExperience: string;
  riskTolerance: string;
  isPoliticallyExposed: boolean;
  acceptedTerms: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  nationality: "",
  address: "",
  city: "",
  postalCode: "",
  idType: "",
  idNumber: "",
  income: "",
  sourceOfFunds: "",
  employmentStatus: "",
  employerName: "",
  investmentExperience: "",
  riskTolerance: "",
  isPoliticallyExposed: false,
  acceptedTerms: false,
};

const MerchantForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const formRef = useRef<HTMLDivElement>(null);

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Financial Profile" },
    { number: 3, title: "Review & Submit" },
  ];

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors({});
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= step.number
                ? "bg-backgroundsidebar text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {step.number}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-20 h-1 mx-2 ${
                currentStep > step.number ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="rounded-lg bg-muted p-6">
        <h3 className="font-semibold mb-4">Personal Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Full Name:</span> {formData.fullName}
          </p>
          <p>
            <span className="font-medium">Date of Birth:</span>{" "}
            {formData.dateOfBirth}
          </p>
          <p>
            <span className="font-medium">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {formData.phone}
          </p>
          <p>
            <span className="font-medium">Address:</span> {formData.address}
          </p>
          <p>
            <span className="font-medium">City:</span> {formData.city}
          </p>
          <p>
            <span className="font-medium">Postal Code:</span>{" "}
            {formData.postalCode}
          </p>
          <p>
            <span className="font-medium">Nationality:</span>{" "}
            {formData.nationality}
          </p>
          <p>
            <span className="font-medium">ID Type:</span> {formData.idType}
          </p>
          <p>
            <span className="font-medium">ID Number:</span> {formData.idNumber}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="font-semibold mb-4">Financial Profile</h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Income Range:</span> {formData.income}
          </p>
          <p>
            <span className="font-medium">Source of Funds:</span>{" "}
            {formData.sourceOfFunds}
          </p>
          <p>
            <span className="font-medium">Employment Status:</span>{" "}
            {formData.employmentStatus}
          </p>
          <p>
            <span className="font-medium">Employer:</span>{" "}
            {formData.employerName}
          </p>
          <p>
            <span className="font-medium">Investment Experience:</span>{" "}
            {formData.investmentExperience}
          </p>
          <p>
            <span className="font-medium">Risk Tolerance:</span>{" "}
            {formData.riskTolerance}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-6">
        <h3 className="font-semibold mb-4">Declarations</h3>
        <p>
          <span className="font-medium">Politically Exposed Person:</span>{" "}
          {formData.isPoliticallyExposed ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-medium">Terms Accepted:</span>{" "}
          {formData.acceptedTerms ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );

  const validateStep = () => {
    const newErrors: Partial<FormData> = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
        newErrors.phone = "Phone number is invalid";
        toast.error("Invalid Phone Number");
      }
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.postalCode)
        newErrors.postalCode = "Postal code is required";
      if (!formData.nationality)
        newErrors.nationality = "Nationality is required";
      if (!formData.idType) newErrors.idType = "ID type is required";
      if (!formData.idNumber) newErrors.idNumber = "ID number is required";
    } else if (currentStep === 2) {
      if (!formData.income) newErrors.income = "Income range is required";
      if (!formData.sourceOfFunds)
        newErrors.sourceOfFunds = "Source of funds is required";
      if (!formData.employmentStatus)
        newErrors.employmentStatus = "Employment status is required";
      if (!formData.investmentExperience)
        newErrors.investmentExperience = "Investment experience is required";
      if (!formData.riskTolerance)
        newErrors.riskTolerance = "Risk tolerance is required";
      if (!formData.acceptedTerms)
        newErrors.acceptedTerms = "You must accept the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 3 && validateStep()) {
      try {
        console.log("Form submitted:", formData);

        toast.success("Form submitted successfully");

        resetForm();

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        toast.error("Error submitting form");
        console.error("Form submission error:", error);
      }
    }
  };
  //add pdf button

  const downloadPDF = () => {
    const pdf = new jsPDF();
    let yPos = 10;

    pdf.setFontSize(20);
    pdf.text("Merchant Application Form", 105, yPos, { align: "center" });
    yPos += 20;

    const addSection = (
      title: string,
      data: Record<string, string | boolean>
    ) => {
      pdf.setFontSize(16);
      pdf.text(title, 10, yPos);
      yPos += 10;
      pdf.setFontSize(12);
      Object.entries(data).forEach(([key, value]) => {
        pdf.text(`${key}: ${value}`, 20, yPos);
        yPos += 7;
        if (yPos > 280) {
          pdf.addPage();
          yPos = 10;
        }
      });
      yPos += 10;
    };

    addSection("Personal Details", {
      "Full Name": formData.fullName,
      "Date of Birth": formData.dateOfBirth,
      Email: formData.email,
      Phone: formData.phone,
      Address: formData.address,
      City: formData.city,
      "Postal Code": formData.postalCode,
      Nationality: formData.nationality,
      "ID Type": formData.idType,
      "ID Number": formData.idNumber,
    });

    addSection("Financial Profile", {
      "Income Range": formData.income,
      "Source of Funds": formData.sourceOfFunds,
      "Employment Status": formData.employmentStatus,
      Employer: formData.employerName,
      "Investment Experience": formData.investmentExperience,
      "Risk Tolerance": formData.riskTolerance,
    });

    addSection("Declarations", {
      "Politically Exposed Person": formData.isPoliticallyExposed
        ? "Yes"
        : "No",
      "Terms Accepted": formData.acceptedTerms ? "Yes" : "No",
    });

    pdf.save("merchant_application.pdf");
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen ">
      <div ref={formRef} className="max-h-full  pb-8">
        <form onSubmit={handleSubmit}>
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {steps.find((step) => step.number === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepIndicator()}
              {currentStep === 1 && (
                <React.Suspense fallback={<PersonalDetailsShimmer />}>
                  <PersonalDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors}
                  />
                </React.Suspense>
              )}
              {currentStep === 2 && (
                <React.Suspense fallback={<PersonalDetailsShimmer />}>
                  <FinancialProfileStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors}
                  />
                </React.Suspense>
              )}
              {currentStep === 3 && renderReview()}
              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>
                    Please correct the errors before proceeding.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4 " /> Back
                </Button>
              )}
              {currentStep < 3 && (
                <Button type="button" onClick={handleNext} className="ml-auto">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {currentStep === 3 && (
                <div className="flex space-x-4">
                  <Button type="submit">Submit Application</Button>
                  <Button type="button" variant="outline" onClick={downloadPDF}>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default MerchantForm;
