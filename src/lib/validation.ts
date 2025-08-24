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

      case "reasonForJoin":
        if (data.reasonForJoin.length < 1) {
          errors.reasonForJoin = "Please select at least one reason";
        }
        break;

      case "OtherReason":
        if (data.reasonForJoin.includes("others") && data.OtherReason.length < 3) {
          errors.OtherReason = "Response must be at least 3 characters"
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
      case "otherJoin":
        if (data.joiningAs === "Other" && (data.otherJoin?.trim().length ?? 0) < 3) {
          errors.otherJoin = "A minimum of 3 characters is required"
        }

      // case "tourDate":
      //   if (!data.tourDate || data.tourDate.length === 0) {
      //     errors.tourDate = "At least one tour date must be selected";
      //   }
      //   break;

      case "referralSource":
        if (!data.referralSource) {
          errors.referralSource = "Referral source is required";
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
