import { getProperties, updateProperty } from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Property } from "@/types/properties";
import FormProperty from "@/components/custom/formProp";
import { Button } from "@/components/ui/button";

const IndProperty = () => {
  const { id } = useParams();

  const [data, setData] = useState<Property[]>([]);
  const [edit, setEdit] = useState(true);

  const fetchProperty = async () => {
    const response = await getProperties({
      page: 1,
      limit: 1,
      id: id as string,
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  const handleUpdate = async (data: Property) => {
    const response = await updateProperty({ id: data.id, data });
    setData(response);
    setEdit(true);
  };

  return (
    <section
      className={`flex flex-col items-center justify-center h-screen pt-5 w-full mb-40 ${
        edit ? "mt-10" : ""
      }`}
    >
      <div className="shadow-lg rounded-md bg-white p-10 w-full max-w-5xl">
        <h2 className="text-2xl font-bold">
          {data.length > 0 && data[0].title}
        </h2>
        {data.length > 0 && (
          <FormProperty values={data[0]} edit={edit} setEdit={setEdit} onSubmit={handleUpdate} />
        )}
        <div className="flex justify-center items-center">
        {edit && (
            <>
          <Link
            className="w-full max-w-1/4 mr-4 border border-gray-300 rounded-md p-2 text-center hover:bg-gray-100"
            to="/"
          >
            Volver
          </Link>

     
            <Button
              className="w-full max-w-1/4 ml-4"
              onClick={() => setEdit(!edit)}
            >
              Editar
            </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndProperty;
