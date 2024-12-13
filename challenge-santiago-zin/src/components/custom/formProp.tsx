import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Property } from "@/types/properties";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

type FormPropertyProps = {
  values: Property;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  onSubmit: (data: Property) => void;
};

const FormProperty: React.FC<FormPropertyProps> = ({ values, edit, setEdit, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    
  } = useForm<Property>({
    defaultValues: {
      address: values.address,
      description: values.description,
      price: values.price,
      area: values.area,
      type: values.type,
      status: values.status,
    },
    
  });

  const dataSubmit: SubmitHandler<Property> = (data) => {
    setEdit(true);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(dataSubmit)} className="w-full">
      {values.createdAt ? (
        <span className="text-sm text-gray-500 my-4">
          {new Date(values.createdAt).toLocaleDateString()}
        </span>
      ) : (
        <span className="text-sm text-gray-500 my-4">
          {new Date().toLocaleDateString()}
        </span>
      )}
      {!edit ? (
        <div className="flex flex-col my-4">
          <Label htmlFor="image">Subir Imagen</Label>
          <input type="file" id="image" className="w-full" />
        </div>
      ) : (
        <img
          src={values.images[0]}
          alt={values.title}
          className="w-full h-full object-cover max-w-md mx-auto"
        />
      )}
      <div className="flex flex-col my-4">
        <Label htmlFor="address">Dirección</Label>
        <Controller
          name="address"
          control={control}
          rules={{ required: "La dirección es obligatoria" }}
          render={({ field }) => <Input id="address" type="text" {...field} />}
          disabled={edit}
        />
        {errors.address && (
          <span className="text-red-500">{errors.address.message}</span>
        )}
      </div>
      <div className="flex flex-col my-4">
        <Label htmlFor="description">Descripción</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "La descripción es obligatoria" }}
          render={({ field }) => (
            <textarea
              id="description"
              {...field}
              className="w-full h-full min-h-20 p-2 mt-2 border-2 border-gray-300 rounded-md"
            ></textarea>
          )}
          disabled={edit}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div className="flex flex-col my-4">
        <Label htmlFor="price">Precio</Label>
        <Controller
          name="price"
          control={control}
          rules={{
            required: "El precio es obligatorio",
            validate: {
              isNumber: (value) =>
                /^\d+(\.\d+)?$/.test(value) || "El precio debe ser un número",
              isPositive: (value) =>
                parseFloat(value) > 0 ||
                "El precio debe ser un número positivo",
            },
          }}
          render={({ field }) => <Input id="price" type="text" {...field} />}
          disabled={edit}
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </div>
      <div className="flex flex-col my-4">
        <Label htmlFor="area">Área</Label>
        <Controller
          name="area"
          control={control}
          rules={{ required: "El área es obligatoria" }}
          render={({ field }) => <Input id="area" type="text" {...field} />}
          disabled={edit}
        />
        {errors.area && (
          <span className="text-red-500">{errors.area.message}</span>
        )}
      </div>
      <div className="flex flex-col my-4">
        <Label htmlFor="type">Tipo</Label>
        <Controller
          name="type"
          control={control}
          rules={{ required: "El tipo es obligatorio" }}
          render={({ field }) => <Input id="type" type="text" {...field} />}
          disabled={edit}
        />
        {errors.type && (
          <span className="text-red-500">{errors.type.message}</span>
        )}
      </div>
      <div className="flex flex-col my-4">
        <Label htmlFor="status">Estado</Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "El estado es obligatorio" }}
          render={({ field }) => <Input id="status" type="text" {...field} />}
          disabled={edit}
        />
        {errors.status && (
          <span className="text-red-500">{errors.status.message}</span>
        )}
      </div>

      {!edit && (
        <div className="flex justify-center items-center">
               <Link className="w-full max-w-1/4 mr-4 border border-gray-300 rounded-md p-2 text-center hover:bg-gray-100" to="/">
            Volver
          </Link>
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full max-w-1/4"
          >
            Enviar
          </Button>
     
        </div>
      )}
    </form>
  );
};

export default FormProperty;
