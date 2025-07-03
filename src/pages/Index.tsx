import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [carType, setCarType] = useState("");
  const [distance, setDistance] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const carTypes = [
    { id: "economy", name: "Эконом", price: 25, icon: "Car" },
    { id: "comfort", name: "Комфорт", price: 35, icon: "Car" },
    { id: "business", name: "Бизнес", price: 50, icon: "Car" },
  ];

  const calculateCost = () => {
    if (!carType || !from || !to) return;

    const selectedCar = carTypes.find((car) => car.id === carType);
    if (!selectedCar) return;

    // Simulate distance calculation (in real app would use maps API)
    const estimatedDistance = Math.random() * 20 + 5; // 5-25 km
    const cost = Math.round(estimatedDistance * selectedCar.price);

    setDistance(estimatedDistance);
    setEstimatedCost(cost);
  };

  const handleOrderTaxi = () => {
    if (!from || !to || !carType) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    alert("Заказ принят! Такси подъедет через 5-10 минут");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Car" size={32} />
              <h1 className="text-3xl font-bold">TaxiGo</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#order" className="hover:underline">
                Заказать
              </a>
              <a href="#tariffs" className="hover:underline">
                Тарифы
              </a>
              <a href="#contacts" className="hover:underline">
                Контакты
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Быстрое и надежное такси
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Закажите такси за 30 секунд. Фиксированная стоимость, опытные
              водители.
            </p>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="MapPin" size={24} />
                  Заказать такси
                </CardTitle>
                <CardDescription>
                  Укажите точки маршрута и выберите класс автомобиля
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">Откуда</Label>
                    <div className="relative">
                      <Icon
                        name="Circle"
                        size={16}
                        className="absolute left-3 top-3 text-green-500"
                      />
                      <Input
                        id="from"
                        placeholder="Введите адрес отправления"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">Куда</Label>
                    <div className="relative">
                      <Icon
                        name="MapPin"
                        size={16}
                        className="absolute left-3 top-3 text-red-500"
                      />
                      <Input
                        id="to"
                        placeholder="Введите адрес назначения"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carType">Класс автомобиля</Label>
                    <Select value={carType} onValueChange={setCarType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите класс" />
                      </SelectTrigger>
                      <SelectContent>
                        {carTypes.map((car) => (
                          <SelectItem key={car.id} value={car.id}>
                            <div className="flex items-center gap-2">
                              <Icon name={car.icon} size={16} />
                              <span>
                                {car.name} - {car.price} ₽/км
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={calculateCost}
                  variant="outline"
                  className="w-full"
                  disabled={!from || !to || !carType}
                >
                  <Icon name="Calculator" size={16} className="mr-2" />
                  Рассчитать стоимость
                </Button>

                {estimatedCost > 0 && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Расстояние
                          </p>
                          <p className="font-semibold">
                            {distance.toFixed(1)} км
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Стоимость
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            {estimatedCost} ₽
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={handleOrderTaxi}
                  className="w-full h-12 text-lg font-semibold"
                  disabled={!from || !to || !carType}
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Заказать такси
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tariffs */}
      <section id="tariffs" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Тарифы</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {carTypes.map((car) => (
                <Card
                  key={car.id}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <Icon
                        name={car.icon}
                        size={32}
                        className="text-primary"
                      />
                    </div>
                    <CardTitle className="text-xl">{car.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-3xl font-bold text-primary">
                          {car.price} ₽
                        </p>
                        <p className="text-sm text-muted-foreground">
                          за километр
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <p>✓ Опытные водители</p>
                        <p>✓ Чистые автомобили</p>
                        <p>✓ Безналичный расчет</p>
                        {car.id === "business" && <p>✓ Премиум-класс</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Контакты</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon
                    name="Phone"
                    size={32}
                    className="mx-auto mb-4 text-primary"
                  />
                  <h4 className="font-semibold mb-2">Телефон</h4>
                  <p className="text-lg">+7 (999) 123-45-67</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon
                    name="Clock"
                    size={32}
                    className="mx-auto mb-4 text-primary"
                  />
                  <h4 className="font-semibold mb-2">Режим работы</h4>
                  <p className="text-lg">Круглосуточно</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Car" size={24} />
            <span className="text-xl font-bold">TaxiGo</span>
          </div>
          <p className="text-sm opacity-80">
            © 2024 TaxiGo. Быстрое и надежное такси.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
