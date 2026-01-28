// src/pages/services/ServiceCard.tsx
import type { IService } from "@/types/serviceType";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }: { service: IService }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${service._id}`);
  };

  return (
    <div className="group relative bg-white rounded-sm overflow-hidden shadow hover:shadow-xl transition hover:cursor-pointer">

      <div className="relative h-84 w-full overflow-hidden">
        <img
          src={service.product.images[0]?.url}
          alt={service.product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-400">
        <h3 className="font-semibold text-gray-800 truncate">
          {service.product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {service.location.area}, {service.location.subArea}
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-blue-600">
            $ {service?.price?.daily}
          </p>

          <button
            onClick={handleClick}
            className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Service Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
