import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // Datos de productos - Componentes de PC
  const componentesPC = [
    { id: 1, nombre: 'AMD Ryzen 9 7950X', categoria: 'Procesadores', precio: 899.99, imagen: 'https://images.unsplash.com/photo-1568209865332-a15790aed756', descripcion: 'Procesador de 16 núcleos y 32 hilos para gaming extremo', especificaciones: '16 núcleos, 32 hilos, 4.5GHz base, 5.7GHz boost' },
    { id: 2, nombre: 'NVIDIA RTX 4090', categoria: 'Tarjetas Gráficas', precio: 1799.99, imagen: 'https://images.pexels.com/photos/17485866/pexels-photo-17485866.png', descripcion: 'La tarjeta gráfica más potente para 4K gaming', especificaciones: '24GB GDDR6X, Ray Tracing, DLSS 3.0' },
    { id: 3, nombre: 'MSI Z790 Gaming Plus', categoria: 'Motherboards', precio: 249.99, imagen: 'https://images.pexels.com/photos/4316/technology-computer-chips-gigabyte.jpg', descripcion: 'Motherboard gaming con soporte DDR5', especificaciones: 'Socket LGA1700, DDR5, PCIe 5.0' },
    { id: 4, nombre: 'Corsair Vengeance DDR5', categoria: 'Memoria RAM', precio: 179.99, imagen: 'https://images.pexels.com/photos/2643596/pexels-photo-2643596.jpeg', descripcion: 'Memoria RAM DDR5 de alta velocidad con RGB', especificaciones: '32GB (2x16GB), 5600MHz, RGB' },
    { id: 5, nombre: 'Samsung 980 PRO 2TB', categoria: 'Almacenamiento', precio: 199.99, imagen: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48', descripcion: 'SSD NVMe de alta velocidad', especificaciones: '2TB, PCIe 4.0, 7000 MB/s' },
    { id: 6, nombre: 'NZXT Kraken X73', categoria: 'Refrigeración', precio: 179.99, imagen: 'https://images.unsplash.com/photo-1696197819149-e7b0654557ba', descripcion: 'Refrigeración líquida RGB de 360mm', especificaciones: '360mm, RGB infinity mirror, RL140 fans' },
    { id: 7, nombre: 'Corsair RM850x', categoria: 'Fuentes de Poder', precio: 149.99, imagen: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', descripcion: 'Fuente modular 80+ Gold', especificaciones: '850W, 80+ Gold, Modular' },
    { id: 8, nombre: 'Lian Li O11 Dynamic', categoria: 'Cases', precio: 159.99, imagen: 'https://images.unsplash.com/photo-1696197820893-e285fdddf60b', descripcion: 'Case gaming con cristal templado', especificaciones: 'Mid Tower, Cristal templado, RGB' },
    { id: 9, nombre: 'Intel Core i9-13900K', categoria: 'Procesadores', precio: 589.99, imagen: 'https://images.unsplash.com/photo-1568209865332-a15790aed756', descripcion: 'Procesador Intel de 13va generación', especificaciones: '24 núcleos, 32 hilos, 3.0GHz base' },
    { id: 10, nombre: 'AMD RX 7900 XTX', categoria: 'Tarjetas Gráficas', precio: 999.99, imagen: 'https://images.unsplash.com/photo-1658673847785-08f1738116f8', descripcion: 'Tarjeta gráfica AMD de alta gama', especificaciones: '24GB GDDR6, RDNA 3' },
  ];

  // Datos de productos - Videojuegos con imágenes reales
  const videojuegos = [
    { id: 101, nombre: 'Cyberpunk 2077: Phantom Liberty', categoria: 'Acción RPG', precio: 59.99, imagen: 'https://images.https://cdn.mos.cms.futurecdn.net/BeyhFdCM2ugLQjX8vX7fuQ.jpg.com/photos/7887043/pexels-photo-7887043.jpeg', descripcion: 'Expansión futurista cyberpunk con Ray Tracing', plataforma: 'PC, PlayStation, Xbox', descuento: 20 },
    { id: 102, nombre: 'Elden Ring', categoria: 'Acción RPG', precio: 49.99, imagen: 'https://images.pexels.com/photos/7778824/pexels-photo-7778824.jpeg', descripcion: 'Épica aventura de FromSoftware - GOTY 2022', plataforma: 'PC, PlayStation, Xbox', descuento: 25 },
    { id: 103, nombre: 'Call of Duty: Modern Warfare III', categoria: 'FPS', precio: 69.99, imagen: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd', descripcion: 'El FPS más épico del año - Multijugador online', plataforma: 'PC, PlayStation, Xbox', bestseller: true },
    { id: 104, nombre: 'The Legend of Zelda: Tears of the Kingdom', categoria: 'Aventura', precio: 59.99, imagen: 'https://images.unsplash.com/photo-1635514569146-9a9607ecf303', descripcion: 'Aventura épica en Hyrule - Exclusivo Nintendo', plataforma: 'Nintendo Switch', exclusivo: true },
    { id: 105, nombre: 'FIFA 24', categoria: 'Deportes', precio: 59.99, imagen: 'https://images.unsplash.com/photo-1640955011254-39734e60b16f', descripcion: 'El simulador de fútbol más realista', plataforma: 'PC, PlayStation, Xbox', descuento: 15 },
    { id: 106, nombre: 'Spider-Man 2', categoria: 'Acción', precio: 69.99, imagen: 'https://images.pexels.com/photos/7773547/pexels-photo-7773547.jpeg', descripcion: 'Aventuras épicas del Hombre Araña en 4K', plataforma: 'PlayStation 5', exclusivo: true },
    { id: 107, nombre: "Baldur's Gate 3", categoria: 'RPG', precio: 59.99, imagen: 'https://images.pexels.com/photos/4048096/pexels-photo-4048096.jpeg', descripcion: 'RPG de fantasía épica - Más de 100 horas', plataforma: 'PC, PlayStation', bestseller: true },
    { id: 108, nombre: 'Starfield', categoria: 'Acción RPG', precio: 69.99, imagen: 'https://images.pexels.com/photos/7862493/pexels-photo-7862493.jpeg', descripcion: 'Exploración espacial épica de Bethesda', plataforma: 'PC, Xbox', descuento: 30 },
    { id: 109, nombre: 'Mortal Kombat 1', categoria: 'Lucha', precio: 59.99, imagen: 'https://images.pexels.com/photos/31113427/pexels-photo-31113427.jpeg', descripcion: 'Combates brutales y fatalities épicos', plataforma: 'PC, PlayStation, Xbox' },
    { id: 110, nombre: 'Alan Wake 2', categoria: 'Terror', precio: 49.99, imagen: 'https://images.unsplash.com/photo-1660079542792-a93da7ab1206', descripcion: 'Terror psicológico sobrenatural premiado', plataforma: 'PC, PlayStation, Xbox', descuento: 35 },
    { id: 111, nombre: 'The Last of Us Part II', categoria: 'Acción/Aventura', precio: 39.99, imagen: 'https://images.unsplash.com/photo-1660079542792-a93da7ab1206', descripcion: 'Historia post-apocalíptica emocional', plataforma: 'PlayStation', bestseller: true },
    { id: 112, nombre: 'Grand Theft Auto VI', categoria: 'Acción', precio: 79.99, imagen: 'https://images.pexels.com/photos/1373100/pexels-photo-1373100.jpeg', descripcion: 'El juego más esperado de la década', plataforma: 'PC, PlayStation, Xbox', preventa: true },
    { id: 113, nombre: 'Pac-Man World Re-PAC', categoria: 'Plataformas', precio: 29.99, imagen: 'https://images.pexels.com/photos/1373100/pexels-photo-1373100.jpeg', descripcion: 'Clásico remasterizado con gráficos modernos', plataforma: 'Todas las plataformas', retro: true },
    { id: 114, nombre: 'God of War Ragnarök', categoria: 'Acción/Aventura', precio: 59.99, imagen: 'https://images.pexels.com/photos/16247234/pexels-photo-16247234.jpeg', descripcion: 'Épica nórdica de Kratos y Atreus', plataforma: 'PlayStation, PC', bestseller: true },
    { id: 115, nombre: 'Minecraft Legends', categoria: 'Estrategia', precio: 39.99, imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420', descripcion: 'Estrategia en el universo Minecraft', plataforma: 'Todas las plataformas' },
  ];

  // Combinar todos los productos para búsqueda
  const todosLosProductos = [...componentesPC, ...videojuegos];

  // Filtrar productos según término de búsqueda
  const productosFiltrados = todosLosProductos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCart([...cart, producto]);
    alert(`${producto.nombre} agregado al carrito!`);
  };

  // Navegación
  const NavBar = () => (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-lg border-b border-green-500/30 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              TechCyber
            </h1>
            <div className="hidden md:flex space-x-6">
              {['inicio', 'componentes', 'videojuegos', 'ofertas', 'qa', 'noticias'].map((section) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(section)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:text-green-400 ${
                    currentSection === section ? 'bg-green-500/30 text-green-400' : 'text-gray-300'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-all duration-300"
            >
              🔍
            </button>
            <div className="relative">
              <button className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-all duration-300">
                🛒 ({cart.length})
              </button>
            </div>
          </div>
        </div>
        {showSearch && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
            />
          </div>
        )}
      </div>
    </nav>
  );

  // Tarjeta de producto con efectos 3D y diseño marketero
  const ProductCard = ({ producto, tipo }) => {
    const precioOriginal = tipo === 'juego' && producto.descuento ? 
      (producto.precio / (1 - producto.descuento / 100)).toFixed(2) : null;
    
    return (
      <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-xl overflow-hidden hover:border-green-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 transform-gpu">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
          {producto.bestseller && (
            <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs rounded-full font-bold animate-pulse">
              🔥 BESTSELLER
            </span>
          )}
          {producto.exclusivo && (
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-bold">
              ⭐ EXCLUSIVO
            </span>
          )}
          {producto.preventa && (
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full font-bold">
              🚀 PRE-VENTA
            </span>
          )}
          {producto.retro && (
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs rounded-full font-bold">
              👾 RETRO
            </span>
          )}
        </div>
        
        <div className="relative overflow-hidden">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-green-900/40"></div>
          
          {/* Precio con descuento */}
          <div className="absolute top-2 right-2">
            {producto.descuento ? (
              <div className="text-right">
                <div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold mb-1">
                  -{producto.descuento}%
                </div>
                <div className="px-2 py-1 bg-green-500 text-black text-xs rounded-full font-bold">
                  ${producto.precio}
                </div>
                {precioOriginal && (
                  <div className="text-xs text-gray-400 line-through mt-1">
                    ${precioOriginal}
                  </div>
                )}
              </div>
            ) : (
              <span className="px-2 py-1 bg-green-500 text-black text-xs rounded-full font-bold">
                ${producto.precio}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
            {producto.nombre}
          </h3>
          <p className="text-sm text-gray-400 mb-2">{producto.categoria}</p>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{producto.descripcion}</p>
          {tipo === 'componente' && (
            <p className="text-xs text-green-400 mb-3">{producto.especificaciones}</p>
          )}
          {tipo === 'juego' && (
            <p className="text-xs text-blue-400 mb-3">{producto.plataforma}</p>
          )}
          
          {/* Botón CTA más grande y atractivo */}
          <button
            onClick={() => agregarAlCarrito(producto)}
            className="w-full py-3 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-500/50 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group/btn"
          >
            <span className="relative z-10">
              {producto.preventa ? '🚀 PRE-ORDENAR' : '🛒 COMPRAR AHORA'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
          </button>
          
          {producto.descuento && (
            <p className="text-center text-red-400 text-sm mt-2 font-bold animate-pulse">
              ¡Ahorra ${((precioOriginal - producto.precio)).toFixed(2)}!
            </p>
          )}
        </div>
      </div>
    );
  };

  // Noticia Titular Grande
  const NoticiaTitular = () => (
    <section className="relative py-16 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-cyan-900/30 overflow-hidden">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full mb-4 animate-pulse">
              🔥 NOTICIA EXPLOSIVA
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              NVIDIA RTX 5090 REVELADA
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              La nueva generación de tarjetas gráficas promete un rendimiento 60% superior con arquitectura revolucionaria de IA integrada. ¡Pre-órdenes disponibles YA!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentSection('componentes')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:-translate-y-2 hover:scale-105 text-lg"
              >
                🚀 VER RTX 5090
              </button>
              <button className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold rounded-lg transition-all duration-300 text-lg">
                📰 Leer Más
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/30 hover:border-cyan-500 transition-all duration-500 group">
              <img 
                src="https://images.unsplash.com/photo-1696197819149-e7b0654557ba" 
                alt="RTX 5090" 
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent group-hover:from-cyan-900/40"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-lg">Rendimiento nunca antes visto</p>
                <p className="text-cyan-400 text-sm">Disponible Q3 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Oferta Titular Mega
  const OfertaTitular = () => (
    <section className="relative py-20 bg-gradient-to-br from-red-900/40 via-orange-900/40 to-yellow-900/40 overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-red-500/20 to-yellow-500/20 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full mb-6 animate-bounce">
          ⚡ MEGA OFERTA LIMITADA ⚡
        </div>
        
        <h2 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 animate-pulse">
          SUPER BUNDLE GAMER
        </h2>
        
        <p className="text-2xl text-white mb-8 max-w-4xl mx-auto">
          RTX 4090 + Ryzen 9 7950X + 64GB DDR5 + Monitor 4K 144Hz
        </p>
        
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-lg text-gray-400 line-through">Precio Normal</p>
            <p className="text-3xl font-bold text-gray-400 line-through">$4,299.99</p>
          </div>
          <div className="text-6xl text-yellow-400 animate-pulse">→</div>
          <div className="text-center">
            <p className="text-lg text-yellow-400">PRECIO ESPECIAL</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              $2,999.99
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-red-400 text-xl font-bold animate-pulse mb-4">
            ¡AHORRAS $1,300! Solo quedan 24 horas
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-black/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">23</div>
                <div className="text-xs text-gray-400">HORAS</div>
              </div>
              <div className="bg-black/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">45</div>
                <div className="text-xs text-gray-400">MIN</div>
              </div>
              <div className="bg-black/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">32</div>
                <div className="text-xs text-gray-400">SEG</div>
              </div>
              <div className="bg-black/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-400">!</div>
                <div className="text-xs text-gray-400">URGENTE</div>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => agregarAlCarrito({id: 9999, nombre: 'Super Bundle Gamer', precio: 2999.99})}
          className="px-12 py-6 text-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-black font-bold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50 transform hover:-translate-y-3 hover:scale-110 relative overflow-hidden group"
        >
          <span className="relative z-10">🔥 COMPRAR BUNDLE MEGA 🔥</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        <p className="text-sm text-gray-400 mt-4">
          Envío gratis • Garantía extendida • Setup profesional incluido
        </p>
      </div>
    </section>
  );
  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-900/20">
      <div className="absolute inset-0 opacity-10 animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 bg-repeat" 
             style={{backgroundImage: "radial-gradient(circle at 25% 25%, #22c55e 2px, transparent 2px), radial-gradient(circle at 75% 75%, #10b981 2px, transparent 2px)", backgroundSize: "60px 60px"}}>
        </div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
          TECHCYBER
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          La plataforma más avanzada para componentes de PC y videojuegos del futuro
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentSection('componentes')}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 transform hover:-translate-y-2 hover:scale-105"
          >
            Explorar Componentes
          </button>
          <button
            onClick={() => setCurrentSection('videojuegos')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-2 hover:scale-105"
          >
            Ver Videojuegos
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );

  // Sección de componentes
  const ComponentesSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Componentes de PC de Alta Gama
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {componentesPC.map((componente) => (
            <ProductCard key={componente.id} producto={componente} tipo="componente" />
          ))}
        </div>
      </div>
    </section>
  );

  // Sección de videojuegos
  const VideojuegosSection = () => (
    <section className="py-16 bg-gradient-to-br from-black to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
          Videojuegos Épicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videojuegos.map((juego) => (
            <ProductCard key={juego.id} producto={juego} tipo="juego" />
          ))}
        </div>
      </div>
    </section>
  );

  // Sección de ofertas especiales expandida
  const OfertasSection = () => (
    <section className="py-16 bg-gradient-to-br from-red-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
          Ofertas Especiales 🔥
        </h2>
        
        {/* Ofertas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-red-900/50 to-black border border-red-500/30 rounded-xl p-6 hover:border-red-500 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              HOT 🔥
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">Bundle Gaming Pro</h3>
            <p className="text-gray-300 mb-4">RTX 4090 + Ryzen 9 7950X + 32GB DDR5</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg line-through text-gray-500">$2,699.98</span>
              <span className="text-3xl font-bold text-red-400">$2,199.99</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-500/50 transform hover:-translate-y-1">
              🚀 COMPRAR BUNDLE
            </button>
            <p className="text-center text-red-400 text-sm mt-2 font-bold">¡Ahorra $500!</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/50 to-black border border-green-500/30 rounded-xl p-6 hover:border-green-500 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <div className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              POPULAR ⭐
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">Pack Gamer Elite</h3>
            <p className="text-gray-300 mb-4">5 Juegos AAA + DLC Season Pass</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg line-through text-gray-500">$349.95</span>
              <span className="text-3xl font-bold text-green-400">$179.99</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-500/50 transform hover:-translate-y-1">
              🎮 COMPRAR PACK
            </button>
            <p className="text-center text-green-400 text-sm mt-2 font-bold">¡Ahorra $170!</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-black border border-blue-500/30 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              COMPLETO 💎
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Setup Streamer</h3>
            <p className="text-gray-300 mb-4">PC + Monitor 4K + Cámara + Audio</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg line-through text-gray-500">$4,999.99</span>
              <span className="text-3xl font-bold text-blue-400">$3,799.99</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 transform hover:-translate-y-1">
              📺 COMPRAR SETUP
            </button>
            <p className="text-center text-blue-400 text-sm mt-2 font-bold">¡Ahorra $1,200!</p>
          </div>
        </div>
        
        {/* Ofertas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/30 rounded-xl p-4 hover:border-purple-500 transition-all duration-300 hover:scale-105">
            <h4 className="text-lg font-bold text-purple-400 mb-2">Bundle AMD</h4>
            <p className="text-sm text-gray-300 mb-3">RX 7900XTX + Ryzen 7</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm line-through text-gray-500">$1,299</span>
              <span className="text-xl font-bold text-purple-400">$999</span>
            </div>
            <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded text-sm transition-all duration-300">
              COMPRAR
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/50 to-black border border-yellow-500/30 rounded-xl p-4 hover:border-yellow-500 transition-all duration-300 hover:scale-105">
            <h4 className="text-lg font-bold text-yellow-400 mb-2">Retro Pack</h4>
            <p className="text-sm text-gray-300 mb-3">10 Clásicos + Emulador</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm line-through text-gray-500">$199</span>
              <span className="text-xl font-bold text-yellow-400">$89</span>
            </div>
            <button className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded text-sm transition-all duration-300">
              COMPRAR
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-pink-900/50 to-black border border-pink-500/30 rounded-xl p-4 hover:border-pink-500 transition-all duration-300 hover:scale-105">
            <h4 className="text-lg font-bold text-pink-400 mb-2">RGB Extreme</h4>
            <p className="text-sm text-gray-300 mb-3">Todos los RGB + Control</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm line-through text-gray-500">$399</span>
              <span className="text-xl font-bold text-pink-400">$249</span>
            </div>
            <button className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded text-sm transition-all duration-300">
              COMPRAR
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-900/50 to-black border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-500 transition-all duration-300 hover:scale-105">
            <h4 className="text-lg font-bold text-cyan-400 mb-2">VR Ready</h4>
            <p className="text-sm text-gray-300 mb-3">PC VR + Headset Meta</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm line-through text-gray-500">$2,499</span>
              <span className="text-xl font-bold text-cyan-400">$1,899</span>
            </div>
            <button className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded text-sm transition-all duration-300">
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // Sección Q&A
  const QASection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-6">
          {[
            {
              pregunta: "¿Ofrecen garantía en los componentes?",
              respuesta: "Sí, todos nuestros componentes tienen garantía del fabricante de 1-3 años según el producto."
            },
            {
              pregunta: "¿Los juegos son versiones digitales?",
              respuesta: "Ofrecemos tanto versiones digitales como físicas. Las digitales se entregan instantáneamente."
            },
            {
              pregunta: "¿Hacen envíos internacionales?",
              respuesta: "Sí, enviamos a más de 50 países con tracking completo y seguro."
            },
            {
              pregunta: "¿Puedo armar mi PC personalizada?",
              respuesta: "¡Absolutamente! Tenemos un configurador de PC y servicio de ensamblado."
            }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-900 border border-green-500/30 rounded-lg p-6 hover:border-green-500 transition-all duration-300">
              <h3 className="text-lg font-bold text-green-400 mb-2">{item.pregunta}</h3>
              <p className="text-gray-300">{item.respuesta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Sección de noticias gaming expandida
  const NoticiasSection = () => (
    <section className="py-16 bg-gradient-to-br from-purple-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Noticias Gaming & Tech
        </h2>
        
        {/* Noticias principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-red-900/50 to-black border border-red-500/30 rounded-xl overflow-hidden hover:border-red-500 transition-all duration-300 hover:scale-105 group">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1696197819149-e7b0654557ba" alt="RTX 5090" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                🔥 EXCLUSIVA
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="text-sm text-red-400 mb-2">15 Jun 2025 • Hardware</div>
              <h3 className="text-2xl font-bold text-white mb-3">RTX 5090: Primera Review Exclusiva</h3>
              <p className="text-gray-400 mb-4">NVIDIA presenta oficialmente la RTX 5090 con arquitectura Ada Lovelace Next-Gen. Un 65% más de rendimiento que la RTX 4090 con Ray Tracing de nueva generación...</p>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-all duration-300">
                Leer Artículo Completo
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-black border border-blue-500/30 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:scale-105 group">
            <div className="relative">
              <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg" alt="GTA 6" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                🎮 GAMING
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-400 mb-2">12 Jun 2025 • Videojuegos</div>
              <h3 className="text-2xl font-bold text-white mb-3">GTA 6: Primer Gameplay Oficial</h3>
              <p className="text-gray-400 mb-4">Rockstar Games revela por primera vez el gameplay de Grand Theft Auto VI. Vice City renace con gráficos fotorealistas y mecánicas revolucionarias...</p>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-all duration-300">
                Ver Trailer Gameplay
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid de noticias secundarias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              titulo: "AMD Ryzen 8000 Series Oficial",
              fecha: "10 Jun 2025",
              categoria: "Hardware",
              resumen: "Los nuevos procesadores AMD Zen 5 prometen un 35% más de rendimiento por vatio con arquitectura híbrida revolucionaria...",
              imagen: "https://images.unsplash.com/photo-1568209865332-a15790aed756",
              color: "green"
            },
            {
              titulo: "PlayStation 6 Dev Kit Filtrado",
              fecha: "8 Jun 2025",
              categoria: "Consolas",
              resumen: "Imágenes del kit de desarrollo de PS6 revelan soporte para 8K 120fps y ray tracing hardware de próxima generación...",
              imagen: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5",
              color: "purple"
            },
            {
              titulo: "Steam Deck 2 Confirmado",
              fecha: "6 Jun 2025",
              categoria: "Portátiles",
              resumen: "Valve confirma oficialmente Steam Deck 2 con chip custom AMD RDNA 4 y pantalla OLED de 120Hz para Q1 2026...",
              imagen: "https://images.pexels.com/photos/7862493/pexels-photo-7862493.jpeg",
              color: "cyan"
            },
            {
              titulo: "Microsoft DirectX 13 Revelado",
              fecha: "4 Jun 2025",
              categoria: "Software",
              resumen: "DirectX 13 introduce ray tracing global illumination en tiempo real y soporte nativo para IA generativa en juegos...",
              imagen: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
              color: "yellow"
            },
            {
              titulo: "Meta Quest 4 Especificaciones",
              fecha: "2 Jun 2025",
              categoria: "VR/AR",
              resumen: "El nuevo headset de Meta incluirá eye tracking avanzado, resolución 4K por ojo y conectividad 5G integrada...",
              imagen: "https://images.pexels.com/photos/7887043/pexels-photo-7887043.jpeg",
              color: "pink"
            },
            {
              titulo: "Intel Arc B-Series GPUs",
              fecha: "1 Jun 2025",
              categoria: "Graphics",
              resumen: "Intel Arc Battlemage promete competir directamente con RTX 4070 a precio más accesible con XeSS 2.0...",
              imagen: "https://images.unsplash.com/photo-1696197820893-e285fdddf60b",
              color: "orange"
            }
          ].map((noticia, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900/50 to-black border border-green-500/30 rounded-xl overflow-hidden hover:border-green-500 transition-all duration-300 hover:scale-105 group">
              <div className="relative">
                <img src={noticia.imagen} alt={noticia.titulo} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {noticia.categoria}
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-green-400 mb-2">{noticia.fecha}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{noticia.titulo}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">{noticia.resumen}</p>
                <button className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold transition-all duration-300">
                  Leer Más
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter signup */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">🚀 Mantente Al Día</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las últimas noticias de tecnología, lanzamientos exclusivos y ofertas especiales directamente en tu inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="tu-email@ejemplo.com" 
              className="flex-1 px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // Sección de búsqueda
  const BusquedaSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Resultados de Búsqueda
        </h2>
        {searchTerm ? (
          <div>
            <p className="text-center text-gray-400 mb-8">
              Mostrando {productosFiltrados.length} resultados para "{searchTerm}"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosFiltrados.map((producto) => (
                <ProductCard 
                  key={producto.id} 
                  producto={producto} 
                  tipo={producto.id > 100 ? 'juego' : 'componente'} 
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Ingresa un término de búsqueda arriba</p>
        )}
      </div>
    </section>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 'inicio':
        return (
          <>
            <HeroSection />
            <NoticiaTitular />
            <OfertaTitular />
            <ComponentesSection />
            <VideojuegosSection />
          </>
        );
      case 'componentes':
        return <ComponentesSection />;
      case 'videojuegos':
        return <VideojuegosSection />;
      case 'ofertas':
        return (
          <>
            <OfertaTitular />
            <OfertasSection />
          </>
        );
      case 'qa':
        return <QASection />;
      case 'noticias':
        return (
          <>
            <NoticiaTitular />
            <NoticiasSection />
          </>
        );
      default:
        return searchTerm ? <BusquedaSection /> : <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main className="pt-16">
        {searchTerm && currentSection !== 'busqueda' ? <BusquedaSection /> : renderSection()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-green-500/30 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
                TechCyber
              </h3>
              <p className="text-gray-400">La tienda del futuro para gamers y entusiastas de la tecnología.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Componentes PC</li>
                <li>Videojuegos</li>
                <li>Periféricos</li>
                <li>Accesorios</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centro de Ayuda</li>
                <li>Garantías</li>
                <li>Devoluciones</li>
                <li>Contacto</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                  📱
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                  📘
                </div>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
                  📺
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-500/30 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TechCyber. Todos los derechos reservados. Powered by AI del futuro.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;