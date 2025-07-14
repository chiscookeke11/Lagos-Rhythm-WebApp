import { userDataType } from "@/Types/UserDataType";

export type ValidationErrors = {
  [key in keyof userDataType]?: string;
};

export function validateUserData(data: userDataType): ValidationErrors {
  const errors: ValidationErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.race) {
    errors.race = "Race is required";
  }

  if (!data.country) {
    errors.country = "Country is required";
  }

  if (!data.joiningAs) {
    errors.joiningAs = "Please select a role";
  }

  if (data.tourDate.length === 0) {
    errors.tourDate = "At least one tour date must be selected";
  }

  if (!data.referralSource) {
    errors.referralSource = "Referral source is required";
  }

  if (!data.communicationConsent) {
    errors.communicationConsent = "You must agree to receive emails";
  }

  if (!data.termsAgreement) {
    errors.termsAgreement = "You must accept the privacy policy and terms";
  }

  return errors;
}
