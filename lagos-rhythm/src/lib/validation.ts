import { userDataType } from "@/Types/UserDataType";

export type ValidationErrors = {
  [key in keyof userDataType]?: string;
};

export function validateUserData(
  data: userDataType,
  fieldName?: keyof userDataType
): ValidationErrors {
  const errors: ValidationErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checkField = (field: keyof userDataType) => {
    switch (field) {
      case "fullName":
        if (!data.fullName.trim()) {
          errors.fullName = "Full name is required";
        } else if (data.fullName.trim().length < 3) {
          errors.fullName = "Full name must be at least 3 characters";
        }
        break;

      case "email":
        if (!data.email.trim()) {
          errors.email = "Email is required";
        } else if (!emailRegex.test(data.email)) {
          errors.email = "Please enter a valid email address";
        }
        break;

      case "race":
        if (!data.race) {
          errors.race = "Race is required";
        }
        break;

      case "country":
        if (!data.country) {
          errors.country = "Country is required";
        }
        break;

      case "joiningAs":
        if (!data.joiningAs) {
          errors.joiningAs = "Please select a role";
        }
        break;

      case "tourDate":
        if (!data.tourDate || data.tourDate.length === 0) {
          errors.tourDate = "At least one tour date must be selected";
        }
        break;

      case "referralSource":
        if (!data.referralSource) {
          errors.referralSource = "Referral source is required";
        }
        break;

      case "communicationConsent":
        if (!data.communicationConsent) {
          errors.communicationConsent = "You must agree to receive emails";
        }
        break;

      case "termsAgreement":
        if (!data.termsAgreement) {
          errors.termsAgreement = "You must accept the privacy policy and terms";
        }
        break;
    }
  };

  if (fieldName) {
    checkField(fieldName);
  } else {
    // Validate the entire form
    (Object.keys(data) as (keyof userDataType)[]).forEach(checkField);
  }

  return errors;
}
