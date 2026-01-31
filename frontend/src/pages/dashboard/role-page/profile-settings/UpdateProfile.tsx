// src/pages/dashboard/role-page/profile-settings/UpdateProfile.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useUpdateProfileMutation } from "@/redux/features/users/userApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { updateProfileSchema, type UpdateProfileInput } from "@/validations/updateProfile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UpdateProfile = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }} = useForm<UpdateProfileInput>({resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: {
        city: user?.address?.city || "",
        division: user?.address?.division || "",
        postalCode: user?.address?.postalCode || "",
      },
    },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

const onSubmit = async (data: UpdateProfileInput) => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.phone) formData.append("phone", data.phone);
  if (data.address?.city) formData.append("address[city]", data.address.city);
  if (data.address?.division) formData.append("address[division]", data.address.division);
  if (data.address?.postalCode) formData.append("address[postalCode]", data.address.postalCode);

  if (image) formData.append("image", image);

  const res = await updateProfile(formData).unwrap();
  dispatch(setUser(res.data));
  onClose();
};


  return (
 <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <motion.div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Update Profile</h2>
            <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-pink-600 transition-all duration-500">
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              {...register("phone")}
              placeholder="Phone"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <input
                {...register("address.city")}
                placeholder="City"
                className="border rounded-lg px-4 py-2"
              />
              <input
                {...register("address.division")}
                placeholder="Division"
                className="border rounded-lg px-4 py-2"
              />
            </div>

            <input
              {...register("address.postalCode")}
              placeholder="Postal Code"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.address?.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.address?.postalCode.message}
              </p>
            )}

            <label className="flex items-center gap-3 cursor-pointer border rounded-lg px-4 py-3">
              <Upload className="w-5 h-5" />
              <span>Upload Avatar</span>
              <input type="file" hidden accept="image/*" onChange={handleImage} />
            </label>

            {preview && (
              <img
                src={preview}
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateProfile;
