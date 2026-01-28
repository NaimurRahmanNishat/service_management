// src/pages/register/ActivationUser.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useActivateUserMutation, useResendActivationMutation } from "@/redux/features/auth/authApi";
import { activationSchema, type ActivationSchemaType } from "@/validations/auth.validation";


const OTP_LENGTH = 6;
const RESEND_UI_TIMER = 600; 

const ActivationUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ===================== EMAIL SOURCE ===================== */
  const email = useMemo(() => {
    return (
      (location.state?.email as string) || new URLSearchParams(location.search).get("email") || ""
    );
  }, [location]);

  /* ===================== LOCAL STATE ===================== */
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(60);
  const [resendCooldown, setResendCooldown] = useState(false);

  /* ===================== API MUTATIONS ===================== */
  const [activateUser, { isLoading: activating }] = useActivateUserMutation();
  const [resendActivation, { isLoading: resending }] = useResendActivationMutation();

  /* ===================== FORM SETUP ===================== */
  const { handleSubmit, setValue } = useForm<ActivationSchemaType>({
    resolver: zodResolver(activationSchema),
    defaultValues: { email, otp: "" },
  });

  /* ===================== TIMER (UI ONLY) ===================== */
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* ===================== OTP HANDLERS ===================== */
  const handleChange = (value: string, index: number) => {
    if (!/^[A-Za-z0-9]?$/.test(value)) return;
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value.toUpperCase();
    setOtpDigits(updatedOtp);
    // Auto focus next input
    if (value && index < OTP_LENGTH - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  /* ===================== HANDLE BACKSPACE ===================== */
  const handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  /* ===================== PASTE FULL OTP ===================== */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").toUpperCase();

    if (/^[A-Za-z0-9]{6}$/.test(pasted)) {
      setOtpDigits(pasted.split(""));
      document.getElementById("otp-5")?.focus();
    }
  };

  /* ===================== SUBMIT ===================== */
  const onSubmit = async () => {
    const otpCode = otpDigits.join("");

    setValue("otp", otpCode);

    try {
      await activateUser({ email, otp: otpCode }).unwrap();
      toast.success("Account activated successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Activation failed");
    }
  };

  /* ===================== RESEND OTP ===================== */
  const handleResend = async () => {
    if (!email || resendCooldown) return;

    setResendCooldown(true);
    setTimeout(() => setResendCooldown(false), 3000);

    try {
      await resendActivation({ email }).unwrap();
      toast.success("New OTP sent to your email");
      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setTimer(RESEND_UI_TIMER);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Activate Your Account</h2>

        <p className="text-gray-500 mb-6">
          Enter the 6-character code sent to{" "}
          <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-2 mb-6">
            {otpDigits.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                maxLength={1}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={activating}
                className="w-12 h-12 text-center text-xl uppercase"
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={activating}
            className="w-full"
          >
            {activating ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {/* UI Timer */}
        <p className="text-sm text-gray-500 mt-3">
          {timer > 0
            ? `Resend available in ${timer}s`
            : "You can resend OTP now"}
        </p>

        <button
          onClick={handleResend}
          disabled={resending || resendCooldown}
          className="mt-3 text-indigo-600 font-medium disabled:opacity-50"
        >
          {resending ? "Resending..." : "Resend Code"}
        </button>
      </motion.div>
    </div>
  );
};

export default ActivationUser;
