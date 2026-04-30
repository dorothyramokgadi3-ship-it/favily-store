     1	import Link from "next/link";
     2	import { ArrowLeft, Package, Search, SlidersHorizontal, ShoppingCart } from "lucide-react";
     3	import { saleorFetch, GET_CATEGORIES, GET_PRODUCTS, formatPrice, parseDescription } from "@/lib/saleor";
     4	import type { SaleorProduct, SaleorCategory } from "@/lib/saleor";
     5	
     6	export default async function ProductsPage({
     7	  searchParams,
     8	}: {
     9	  searchParams: Promise<{ category?: string; search?: string }>;
    10	}) {
    11	  const params = await searchParams;
    12	  const activeCategory = params.category || null;
    13	
    14	  let categories: SaleorCategory[] = [];
    15	  let products: SaleorProduct[] = [];
    16	
    17	  try {
    18	    const catData = await saleorFetch<{ categories: { edges: { node: SaleorCategory }[] } }>(GET_CATEGORIES);
    19	    categories = catData.categories.edges
    20	      .map((e) => e.node)
    21	      .filter((c) => c.products.totalCount > 0 && c.slug !== "default-category");
    22	
    23	    const prodData = await saleorFetch<{ products: { edges: { node: SaleorProduct }[] } }>(GET_PRODUCTS, { first: 50 });
    24	    products = prodData.products.edges.map((e) => e.node);
    25	
    26	    if (activeCategory) {
    27	      products = products.filter((p) => p.category?.slug === activeCategory);
    28	    }
    29	  } catch (error) {
    30	    console.error("Failed to fetch products:", error);
    31	  }
    32	
    33	  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name || "All Products";
    34	
    35	  return (
    36	    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
    37	      {/* Navbar */}
    38	      <nav className="sticky top-0 z-50" style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-nav)" }}>
    39	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    40	          <div className="flex items-center justify-between h-16">
    41	            <Link href="/" className="flex items-center gap-2">
    42	              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ background: "var(--color-cta)", fontFamily: "var(--font-heading)" }}>F</div>
    43	              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>Favily</span>
    44	            </Link>
    45	            <Link href="/cart" className="flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold" style={{ background: "var(--color-cta)", color: "white" }}>
    46	              <ShoppingCart className="w-5 h-5" />
    47	              <span className="hidden sm:inline">Cart</span>
    48	            </Link>
    49	          </div>
    50	        </div>
    51	      </nav>
    52	
    53	      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    54	        {/* Breadcrumb */}
    55	        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
    56	          <Link href="/" className="hover:underline" style={{ color: "var(--color-primary)" }}>Home</Link>
    57	          <span>/</span>
    58	          <span>{activeCategoryName}</span>
    59	        </div>
    60	
    61	        <div className="flex flex-col lg:flex-row gap-8">
    62	          {/* Sidebar */}
    63	          <aside className="lg:w-64 flex-shrink-0">
    64	            <div className="rounded-2xl p-5" style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
    65	              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
    66	                <SlidersHorizontal className="w-4 h-4" /> Categories
    67	              </h3>
    68	              <ul className="space-y-1">
    69	                <li>
    70	                  <Link
    71	                    href="/products"
    72	                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!activeCategory ? 'font-bold' : ''}`}
    73	                    style={{
    74	                      background: !activeCategory ? "rgba(37,99,235,0.08)" : "transparent",
    75	                      color: !activeCategory ? "var(--color-primary)" : "var(--color-text-muted)",
    76	                    }}
    77	                  >
    78	                    All Products
    79	                  </Link>
    80	                </li>
    81	                {categories.map((cat) => (
    82	                  <li key={cat.id}>
    83	                    <Link
    84	                      href={`/products?category=${cat.slug}`}
    85	                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.slug ? 'font-bold' : ''}`}
    86	                      style={{
    87	                        background: activeCategory === cat.slug ? "rgba(37,99,235,0.08)" : "transparent",
    88	                        color: activeCategory === cat.slug ? "var(--color-primary)" : "var(--color-text-muted)",
    89	                      }}
    90	                    >
    91	                      {cat.name}
    92	                      <span className="ml-1 text-xs opacity-60">({cat.products.totalCount})</span>
    93	                    </Link>
    94	                  </li>
    95	                ))}
    96	              </ul>
    97	            </div>
    98	          </aside>
    99	
   100	          {/* Products Grid */}
   101	          <main className="flex-1">
   102	            <div className="flex items-center justify-between mb-6">
   103	              <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
   104	                {activeCategoryName}
   105	              </h1>
   106	              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
   107	                {products.length} product{products.length !== 1 ? 's' : ''}
   108	              </p>
   109	            </div>
   110	
   111	            {products.length === 0 ? (
   112	              <div className="text-center py-20">
   113	                <Package className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--color-text-light)" }} />
   114	                <p className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>No products found</p>
   115	                <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>Try browsing a different category</p>
   116	              </div>
   117	            ) : (
   118	              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
   119	                {products.map((product) => {
   120	                  const price = product.pricing?.priceRange?.start?.gross;
   121	                  const desc = parseDescription(product.description);
   122	                  return (
   123	                    <Link
   124	                      key={product.id}
   125	                      href={`/products/${product.slug}`}
   126	                      className="product-card rounded-2xl overflow-hidden group"
   127	                      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
   128	                    >
   129	                      <div className="aspect-square relative overflow-hidden" style={{ background: "var(--color-surface-raised)" }}>
   130	                        {product.thumbnail?.url ? (
   131	                          <img
   132	                            src={product.thumbnail.url}
   133	                            alt={product.thumbnail.alt || product.name}
   134	                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
   135	                          />
   136	                        ) : (
   137	                          <div className="w-full h-full flex items-center justify-center">
   138	                            <Package className="w-12 h-12" style={{ color: "var(--color-text-light)" }} />
   139	                          </div>
   140	                        )}
   141	                      </div>
   142	                      <div className="p-4">
   143	                        <h3 className="font-semibold text-sm line-clamp-2 mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
   144	                          {product.name}
   145	                        </h3>
   146	                        {desc && (
   147	                          <p className="text-xs line-clamp-1 mb-2" style={{ color: "var(--color-text-muted)" }}>{desc}</p>
   148	                        )}
   149	                        <span className="text-base font-bold" style={{ color: "var(--color-cta)" }}>
   150	                          {formatPrice(price)}
   151	                        </span>
   152	                      </div>
   153	                    </Link>
   154	                  );
   155	                })}
   156	              </div>
   157	            )}
   158	          </main>
   159	        </div>
   160	      </div>
   161	    </div>
   162	  );
   163	}
   164	
