import FormProperty from "@/components/custom/formProp";
import { createProperty } from "@/services/api";
import { Property } from "@/types/properties";
import { useNavigate } from "react-router-dom";


const CreateProperty = () => {
  const navigate = useNavigate();

  const dummyValues = {
    id: "",
    title: "",
    description: "",
    price: "",
    location: [0, 0] as [number, number],
    rooms: "",
    bathrooms: "",
    size: "",
    type: "",
    images: [],
    area: "",
    isActive: true,
    status: "sale",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "",
    address: "",
  };

  const handleEdit = (value: boolean) => {
    console.log("Edit value:", value);
  };

  const handleRedirect = (id: string) => {
    navigate(`/property/${id}`);
  };

  const handleCreate = async (data: Property) => {
    const response = await createProperty({ data });
    handleRedirect(response.id);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-5 w-full mb-40 max-w-3xl mx-auto border border-gray-300 rounded-md p-10 bg-white ">
      <h1 className="text-2xl font-bold">Crear nueva propiedad</h1>
      <FormProperty values={dummyValues} edit={false} setEdit={handleEdit} onSubmit={handleCreate} />
    </div>
  );
};

export default CreateProperty;
