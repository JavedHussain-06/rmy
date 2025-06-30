// otpService.js - Improved version
import axios from "axios";
import encryptPayload from "./encryptPayload";
import decryptPayload from "./decryptPayload";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Input validation functions
const validateMobile = (mobile) => {
  const mobileStr = String(mobile).replace(/\s+/g, '');
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobileStr);
};

const validateOTP = (otp) => {
  const otpStr = String(otp).replace(/\s+/g, '');
  return /^\d{4}$/.test(otpStr);
};

// Sanitize inputs
const sanitizeInput = (input) => {
  return String(input).replace(/[^\d]/g, '').trim();
};

/**
 * Sends an OTP to the specified mobile number with encryption.
 * @param {string|number} mobile
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const sendOtp = async (mobile) => {
  try {
    // Input validation
    const sanitizedMobile = sanitizeInput(mobile);
    
    if (!validateMobile(sanitizedMobile)) {
      console.warn("❌ Invalid mobile number format");
      return {
        success: false,
        message: "Please enter a valid 10-digit mobile number."
      };
    }

    const encrypted = encryptPayload({
      mobilenumber: parseInt(sanitizedMobile),
      source: "web",
    });

    // Log only in development
    if (process.env.NODE_ENV === 'development') {
      console.log("🔐 Sending OTP request for mobile:", sanitizedMobile);
    }

    const [response] = await Promise.all([
      axios.post(
        "/api/annualpass/v3.0/generate-otp",
        { data: encrypted },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      ),
      delay(300),
    ]);

    const res = response.data;

    if (res?.status === 200 || res?.resultCode === 200) {
      if (process.env.NODE_ENV === 'development') {
        console.log("✅ OTP sent successfully");
      }
      return { success: true };
    }

    return {
      success: false,
      message: res?.message || "Failed to send OTP. Please try again.",
    };

  } catch (error) {
    // Log error details only in development
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ sendOtp Error:", error?.response?.data || error.message);
    }

    // Return user-friendly error messages
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: "Request timeout. Please check your connection."
      };
    }

    if (error.response?.status === 429) {
      return {
        success: false,
        message: "Too many attempts. Please try again later."
      };
    }

    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};

/**
 * Verifies the OTP for the specified mobile number with encryption.
 * @param {string|number} mobile
 * @param {string|number} otp
 * @returns {Promise<{ success: boolean, message?: string, data?: any }>}
 */
export const verifyOtp = async (mobile, otp) => {
  try {
    // Input validation
    const sanitizedMobile = sanitizeInput(mobile);
    const sanitizedOTP = sanitizeInput(otp);

    if (!validateMobile(sanitizedMobile)) {
      return {
        success: false,
        message: "Invalid mobile number format."
      };
    }

    if (!validateOTP(sanitizedOTP)) {
      return {
        success: false,
        message: "Please enter a valid 4-digit OTP."
      };
    }

    const encrypted = encryptPayload({
      mobilenumber: parseInt(sanitizedMobile),
      loginotp: parseInt(sanitizedOTP),
    });

    if (process.env.NODE_ENV === 'development') {
      console.log("🔐 Verifying OTP for mobile:", sanitizedMobile);
    }

    const [response] = await Promise.all([
      axios.post(
        "/api/annualpass/v3.0/verify-otp",
        { data: encrypted },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      ),
      delay(300),
    ]);

    const encryptedPayload = response.data?.payload;

    if (!encryptedPayload) {
      throw new Error("Invalid response format from server.");
    }

    const decrypted = decryptPayload(encryptedPayload);

    if (process.env.NODE_ENV === 'development') {
      console.log("✅ OTP verification response received");
      // Don't log the actual decrypted data for security
    }

    if (decrypted?.userid) {
      return {
        success: true,
        data: { payload: decrypted },
      };
    } else {
      return {
        success: false,
        message: decrypted?.message || "Invalid OTP. Please try again.",
      };
    }

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ verifyOtp Error:", error?.response?.data || error.message);
    }

    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: "Request timeout. Please try again."
      };
    }

    if (error.response?.status === 401) {
      return {
        success: false,
        message: "Invalid OTP. Please try again."
      };
    }

    if (error.response?.status === 429) {
      return {
        success: false,
        message: "Too many attempts. Please wait before trying again."
      };
    }

    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};