// src/components/shared/TopHeader.tsx
import { useGetAllHomeDataQuery } from "@/redux/features/home/homeApi";
import Marquee from "../ui/Marquee";

const TopHeader = () => {
  const { data, isLoading, isError } = useGetAllHomeDataQuery();

  const homes = data?.data?.data ?? [];
  if (isLoading || isError || !homes.length) return null;

  const sliderTexts = homes.flatMap(item => item.headerSliderTexts);

  return (
    <div className="w-full bg-gray-100 py-1 overflow-hidden">
      <div className="relative flex">
        <Marquee texts={sliderTexts} />
      </div>
    </div>
  );
};

export default TopHeader;
