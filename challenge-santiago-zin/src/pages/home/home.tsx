import { useEffect, useState } from "react";
import { getProperties } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Property } from "@/types/properties";
import { SquareDashed, Calendar} from "lucide-react";
import MapComponent from "@/components/custom/maps";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const SkeletonCard = () => (
  <div className="border rounded-lg shadow-lg p-4 animate-pulse">
    <div className="h-40 bg-gray-300 mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300"></div>
  </div>
);

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterColumnVisible, setIsFilterColumnVisible] = useState(true);
  const [isSortedByPrice, setIsSortedByPrice] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const itemsPerPage = 10;

  const fetchProperties = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getProperties({ page, limit: itemsPerPage });
      setProperties(response.data);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Hubo un error al cargar las propiedades, ${error}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRedirect = (id: string) => {
    navigate(`/property/${id}`);
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortPropertiesByPrice = () => {
    const sortedProperties = [...properties].sort((a, b) => {
      return isSortedByPrice
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price);
    });
    setProperties(sortedProperties);
    setIsSortedByPrice(!isSortedByPrice);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-4">
        <div className={`transition-all duration-300 ${
          isFilterColumnVisible 
            ? "col-span-12 lg:col-span-6" 
            : "col-span-12 lg:col-span-1"
        }`}>
          <div className="h-full">
            <MapComponent properties={filteredProperties} />
          </div>
        </div>

        <div className={`transition-all duration-300 relative z-10 ${
          isFilterColumnVisible 
            ? "col-span-12 lg:col-span-6" 
            : "col-span-12 lg:col-span-11"
        }`}>
          <div className="relative lg:sticky top-[80px] pt-4 pb-4 z-20">
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold">Propiedades</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterColumnVisible(!isFilterColumnVisible)}
                  className="p-2 bg-gray-100 rounded-lg hidden lg:block"
                >
                  {isFilterColumnVisible ? "← Expandir" : "→ Contraer"}
                </Button>
                <Button
                  onClick={sortPropertiesByPrice}
                  className="p-2 rounded-lg"
                >
                  Ordenar por precio {isSortedByPrice ? "↑" : "↓"}
                </Button>
                <Button variant="outline" onClick={() => navigate('/create')}>
                 Crear nueva propiedad
                </Button>
              </div>
            </div>

            <div className={`${isFilterColumnVisible ? "block" : "hidden"}`}>
              <Input
                placeholder="Filtrar.."
                value={searchTerm}
                className="min-h-[60px] text-black placeholder:text-black bg-white"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 overflow-y-visible lg:overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
            <div className={`grid gap-4 ${
              isFilterColumnVisible 
                ? "grid-cols-1 lg:grid-cols-2" 
                : "grid-cols-1 lg:grid-cols-3"
            }`}>
              {isLoading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              ) : (
                filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="cursor-pointer border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-95 bg-white"
                    onClick={() => handleRedirect(property.id)}
                  >
                    <CardContent className="relative">
                      <Badge
                        className="mr-2 absolute top-2 right-2 uppercase"
                        variant={property.isActive ? "success" : "destructive"}
                      >
                        {property.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                      <img
                        className="mb-2"
                        src={property.images[0]}
                        alt={property.title}
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "ARS",
                          }).format(Number(property.price))}
                        </span>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <SquareDashed />
                            <span className="text-sm font-light my-2 ml-2 mr-4">
                              {property.area} m2
                            </span>
                            <Calendar />
                            <span className="text-sm font-light ml-2">
                              {new Intl.DateTimeFormat("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }).format(new Date(property.updatedAt))}
                            </span>
                          </div>

                          <div className="my-2">
                            <Badge
                              className="mr-2 uppercase"
                              variant={property.status === "sale" ? "success" : "warning"}
                            >
                              {property.status}
                            </Badge>
                            <Badge
                              className="mr-2 uppercase"
                              variant='secondary'
                            >
                              {property.type}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="text-sm font-light">
                          {property.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="flex justify-center gap-2 mt-8 mb-8 bg-white p-4 rounded-lg">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Anterior
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === page ? "bg-primary text-white" : ""
                  }`}
                >
                  {page}
                </Button>
              ))}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
