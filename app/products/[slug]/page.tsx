     1	import Link from "next/link";
     2	import { ArrowLeft, ShoppingCart, Package, Star, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react";
     3	import { saleorFetch, GET_PRODUCT_BY_SLUG, formatPrice, parseDescription } from "@/lib/saleor";
     4	import type { SaleorProduct } from "@/lib/saleor";
     5	
     6	export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
     7	  const { slug } = await params;
     8	  let product: SaleorProduct | null = null;
     9	
    10	  try {
    11	    const data = await saleorFetch<{ product: SaleorProduct }>(GET_PRODUCT_BY_SLUG, { slug });
    12	    product = data.product;
    13	  } catch (error) {
    14	    console.error("Failed to fetch product:", error);
    15	  }
    16	
    17	  if (!product) {
    18	    return (
    19	      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-background)" }}>
    20	        <div className="text-center">
    21	          <Package className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--color-text-light)" }} />
    22	          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Product Not Found</h1>
    23	          <Link href="/products" className="btn-primary inline-flex items-center gap-2 h-10 px-6 text-sm mt-4">
    24	            <ArrowLeft className="w-4 h-4" /> Back to Products
    25	          </Link>
    26	        </div>
    27	      </div>
    28	    );
    29	  }
    30	
    31	  const price = product.pricing?.priceRange?.start?.gross;
    32	  const desc = parseDescription(product.description);
    33	  const images = product.media?.filter((m) => m.type === "IMAGE") || [];
    34	  const mainImage = images[0]?.url || product.thumbnail?.url;
    35	
    36	  return (
    37	    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
    38	      {/* Navbar */}
    39	      <nav className="sticky top-0 z-50" style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-nav)" }}>
    40	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    41	          <div className="flex items-center justify-between h-16">
    42	            <Link href="/" className="flex items-center gap-2">
    43	              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ background: "var(--color-cta)", fontFamily: "var(--font-heading)" }}>F</div>
    44	              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>Favily</span>
    45	            </Link>
    46	            <Link href="/cart" className="flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold" style={{ background: "var(--color-cta)", color: "white" }}>
    47	              <ShoppingCart className="w-5 h-5" />
    48	              <span className="hidden sm:inline">Cart</span>
    49	            </Link>
    50	          </div>
    51	        </div>
    52	      </nav>
    53	
    54	      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    55	        {/* Breadcrumb */}
    56	        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
    57	          <Link href="/" className="hover:underline" style={{ color: "var(--color-primary)" }}>Home</Link>
    58	          <span>/</span>
    59	          <Link href="/products" className="hover:underline" style={{ color: "var(--color-primary)" }}>Products</Link>
    60	          {product.category && (
    61	            <>
    62	              <span>/</span>
    63	              <Link href={`/products?category=${product.category.slug}`} className="hover:underline" style={{ color: "var(--color-primary)" }}>
    64	                {product.category.name}
    65	              </Link>
    66	            </>
    67	          )}
    68	          <span>/</span>
    69	          <span className="truncate max-w-[200px]">{product.name}</span>
    70	        </div>
    71	
    72	        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
    73	          {/* Image */}
    74	          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
    75	            <div className="aspect-square relative" style={{ background: "var(--color-surface-raised)" }}>
    76	              {mainImage ? (
    77	                <img src={mainImage} alt={product.name} className="w-full h-full object-contain p-8" />
    78	              ) : (
    79	                <div className="w-full h-full flex items-center justify-center">
    80	                  <Package className="w-24 h-24" style={{ color: "var(--color-text-light)" }} />
    81	                </div>
    82	              )}
    83	            </div>
    84	            {images.length > 1 && (
    85	              <div className="flex gap-2 p-4 overflow-x-auto">
    86	                {images.map((img, i) => (
    87	                  <div key={i} className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ border: "2px solid var(--color-border)" }}>
    88	                    <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover" />
    89	                  </div>
    90	                ))}
    91	              </div>
    92	            )}
    93	          </div>
    94	
    95	          {/* Details */}
    96	          <div>
    97	            {product.category && (
    98	              <span className="text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block"
    99	                style={{ background: "rgba(37,99,235,0.08)", color: "var(--color-primary)" }}>
   100	                {product.category.name}
   101	              </span>
   102	            )}
   103	            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
   104	              {product.name}
   105	            </h1>
   106	
   107	            <div className="flex items-center gap-3 mb-6">
   108	              <span className="text-3xl font-bold" style={{ color: "var(--color-cta)" }}>
   109	                {formatPrice(price)}
   110	              </span>
   111	              <span className="text-xs px-2 py-1 rounded-full font-medium"
   112	                style={{ background: "rgba(22,163,74,0.1)", color: "var(--color-success)" }}>
   113	                In Stock
   114	              </span>
   115	            </div>
   116	
   117	            {desc && (
   118	              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-text-muted)" }}>
   119	                {desc}
   120	              </p>
   121	            )}
   122	
   123	            {/* Variants */}
   124	            {product.variants && product.variants.length > 1 && (
   125	              <div className="mb-6">
   126	                <p className="text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>Options</p>
   127	                <div className="flex flex-wrap gap-2">
   128	                  {product.variants.map((v) => (
   129	                    <button key={v.id} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
   130	                      style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" }}>
   131	                      {v.name}
   132	                    </button>
   133	                  ))}
   134	                </div>
   135	              </div>
   136	            )}
   137	
   138	            {/* Add to Cart */}
   139	            <div className="flex flex-col sm:flex-row gap-3 mb-8">
   140	              <button className="btn-cta flex-1 h-14 text-base flex items-center justify-center gap-2 rounded-xl">
   141	                <ShoppingCart className="w-5 h-5" />
   142	                Add to Cart
   143	              </button>
   144	              <button className="btn-primary h-14 px-8 text-base rounded-xl">
   145	                Buy Now
   146	              </button>
   147	            </div>
   148	
   149	            {/* Trust badges */}
   150	            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl" style={{ background: "var(--color-surface-raised)" }}>
   151	              {[
   152	                { icon: <Truck className="w-5 h-5" />, text: "Free Delivery" },
   153	                { icon: <Shield className="w-5 h-5" />, text: "Secure Payment" },
   154	                { icon: <RotateCcw className="w-5 h-5" />, text: "Easy Returns" },
   155	              ].map((badge) => (
   156	                <div key={badge.text} className="flex flex-col items-center gap-1 text-center">
   157	                  <span style={{ color: "var(--color-primary)" }}>{badge.icon}</span>
   158	                  <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>{badge.text}</span>
   159	                </div>
   160	              ))}
   161	            </div>
   162	          </div>
   163	        </div>
   164	      </div>
   165	    </div>
   166	  );
   167	}
   168	
