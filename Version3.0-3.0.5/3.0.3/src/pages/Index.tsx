
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Server,
  Clock,
  Star,
  ShoppingCart,
  Gamepad2,
  Database,
  Zap,
  Award,
  TrendingUp,
  Activity
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Professional Server Protection",
      description: "Advanced anti-cheat systems and moderation tools for serious roleplay servers."
    },
    {
      icon: Database,
      title: "Resource Management",
      description: "Comprehensive database solutions for player data, inventories, and server statistics."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Custom scripts optimized for maximum server performance and stability."
    },
    {
      icon: Award,
      title: "Premium Support",
      description: "24/7 technical support and custom development services for our clients."
    }
  ];

  const products = [
    {
      name: "Whitelist Access",
      price: "$15.00",
      description: "Get whitelisted on our premium FiveM server with exclusive features",
      category: "Access",
      featured: true,
      image: "🔐"
    },
    {
      name: "VIP Package",
      price: "$30.00", 
      description: "Priority support, exclusive vehicles, and VIP housing locations",
      category: "Premium",
      featured: true,
      image: "⭐"
    },
    {
      name: "Custom Vehicle Pack",
      price: "$25.00",
      description: "Hand-picked collection of realistic vehicles for our server",
      category: "Vehicles",
      featured: false,
      image: "🚗"
    },
    {
      name: "Business License",
      price: "$40.00",
      description: "Own and operate your own business in our roleplay economy",
      category: "Business",
      featured: true,
      image: "💼"
    },
    {
      name: "Law Enforcement Access",
      price: "$35.00",
      description: "Join our police department with specialized training and equipment",
      category: "Jobs",
      featured: false,
      image: "👮"
    },
    {
      name: "Medical Professional",
      price: "$35.00",
      description: "Work as EMS or doctor with realistic medical roleplay scenarios",
      category: "Jobs", 
      featured: false,
      image: "🏥"
    }
  ];

  const stats = [
    { label: "Active Players", value: "2,847", icon: Users },
    { label: "Server Uptime", value: "99.9%", icon: Activity },
    { label: "Total Sales", value: "15,392", icon: TrendingUp },
    { label: "Response Time", value: "<2min", icon: Clock }
  ];

  const categories = [
    { name: "Server Access", count: 3, icon: Shield },
    { name: "Vehicle Packs", count: 8, icon: Gamepad2 },
    { name: "Job Packages", count: 12, icon: Users },
    { name: "Custom Scripts", count: 24, icon: Database }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-black py-20">
        <div className="responsive-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              BS-Development
              <span className="block text-orange-400 text-2xl md:text-3xl mt-2 font-normal">
                Premium FiveM Server Store
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional roleplay experiences with premium content, reliable infrastructure, and dedicated support for serious players.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Browse Store
              </Button>
              <Button variant="outline" size="lg" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black px-8 py-3 text-lg">
                <Server className="mr-2 h-5 w-5" />
                Connect: 198.27.111.42:30120
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="responsive-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-black border-gray-600 text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="responsive-container">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Shop Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="bg-gray-800 border-gray-600 hover:border-orange-400 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <category.icon className="h-12 w-12 text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900">
        <div className="responsive-container">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(product => product.featured).map((product, index) => (
              <Card key={index} className="bg-black border-gray-600 hover:border-orange-400 transition-all group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-gray-700 text-orange-400 border-gray-600">
                      {product.category}
                    </Badge>
                    <div className="text-3xl">{product.image}</div>
                  </div>
                  <CardTitle className="text-white group-hover:text-orange-300 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-400">{product.price}</span>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Purchase
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-16">
        <div className="responsive-container">
          <h2 className="text-3xl font-bold text-white text-center mb-12">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="bg-gray-800 border-gray-600 hover:border-orange-400 transition-all group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      {product.category}
                    </Badge>
                    <div className="text-2xl">{product.image}</div>
                  </div>
                  <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-400">{product.price}</span>
                    <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="responsive-container">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose BS-Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black border-gray-600">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <feature.icon className="h-6 w-6 text-orange-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="responsive-container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience premium roleplay with our professional server infrastructure and dedicated community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              Start Shopping
            </Button>
            <Button variant="outline" size="lg" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black px-8 py-4 text-lg">
              Join Discord
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
