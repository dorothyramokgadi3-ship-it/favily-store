     1	import Link from "next/link";
     2	import { Search, ShoppingCart, Star, Shield, Truck, RotateCcw, ChevronRight, Package, Shirt, Home as HomeIcon, BookOpen, Apple, Headphones, Glasses, Gift } from "lucide-react";
     3	import { saleorFetch, GET_CATEGORIES, GET_PRODUCTS, formatPrice, parseDescription } from "@/lib/saleor";
     4	import type { SaleorProduct, SaleorCategory } from "@/lib/saleor";
     5	
     6	const CATEGORY_ICONS: Record<string, React.ReactNode> = {
     7	  apparel: <Shirt className="w-6 h-6" />,
     8	  accessories: <Glasses className="w-6 h-6" />,
     9	  sneakers: <Package className="w-6 h-6" />,
    10	  homewares: <HomeIcon className="w-6 h-6" />,
    11	  groceries: <Apple className="w-6 h-6" />,
    12	  books: <BookOpen className="w-6 h-6" />,
    13	  audiobooks: <Headphones className="w-6 h-6" />,
    14	  "gift-cards": <Gift className="w-6 h-6" />,
    15	};
    16	
    17	const CATEGORY_COLORS: Record<string, string> = {
    18	  apparel: "#2563EB",
    19	  accessories: "#8B5CF6",
    20	  sneakers: "#EC4899",
    21	  homewares: "#16A34A",
    22	  groceries: "#F97316",
    23	  books: "#0891B2",
    24	  audiobooks: "#6366F1",
    25	  "gift-cards": "#DC2626",
    26	};
    27	
    28	export default async function HomePage() {
    29	  let categories: SaleorCategory[] = [];
    30	  let products: SaleorProduct[] = [];
    31	
    32	  try {
    33	    const catData = await saleorFetch<{ categories: { edges: { node: SaleorCategory }[] } }>(GET_CATEGORIES);
    34	    categories = catData.categories.edges
    35	      .map((e) => e.node)
    36	      .filter((c) => c.products.totalCount > 0 && c.slug !== "default-category");
    37	
    38	    const prodData = await saleorFetch<{ products: { edges: { node: SaleorProduct }[] } }>(GET_PRODUCTS, { first: 12 });
    39	    products = prodData.products.edges.map((e) => e.node);
    40	  } catch (error) {
    41	    console.error("Failed to fetch from Saleor:", error);
    42	  }
    43	
    44	  const topCategories = categories.slice(0, 8);
    45	
    46	  return (
    47	    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
    48	      {/* ── Navbar ── */}
    49	      <nav
    50	        className="sticky top-0 z-50"
    51	        style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-nav)" }}
    52	      >
    53	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    54	          <div className="flex items-center justify-between h-16">
    55	            <Link href="/" className="flex items-center gap-2">
    56	              <div
    57	                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
    58	                style={{ background: "var(--color-cta)", fontFamily: "var(--font-heading)" }}
    59	              >
    60	                F
    61	              </div>
    62	              <span
    63	                className="text-xl font-bold"
    64	                style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
    65	              >
    66	                Favily
    67	              </span>
    68	            </Link>
    69	
    70	            <div className="hidden md:flex flex-1 max-w-xl mx-8">
    71	              <div className="relative w-full">
    72	                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--color-text-light)" }} />
    73	                <input
    74	                  type="text"
    75	                  placeholder="Search for products, brands and more..."
    76	                  className="w-full h-11 pl-10 pr-4 rounded-xl text-sm outline-none transition-all focus:ring-2"
    77	                  style={{
    78	                    background: "var(--color-surface-raised)",
    79	                    border: "1px solid var(--color-border)",
    80	                    fontFamily: "var(--font-body)",
    81	                    color: "var(--color-text)",
    82	                  }}
    83	                />
    84	              </div>
    85	            </div>
    86	
    87	            <div className="flex items-center gap-4">
    88	              <Link
    89	                href="/cart"
    90	                className="relative flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold transition-colors"
    91	                style={{
    92	                  background: "var(--color-cta)",
    93	                  color: "white",
    94	                  fontFamily: "var(--font-body)",
    95	                }}
    96	              >
    97	                <ShoppingCart className="w-5 h-5" />
    98	                <span className="hidden sm:inline">Cart</span>
    99	              </Link>
   100	            </div>
   101	          </div>
   102	        </div>
   103	      </nav>
   104	
   105	      {/* ── Hero ── */}
   106	      <section
   107	        className="relative overflow-hidden grain-overlay"
   108	        style={{
   109	          background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #1D4ED8 100%)",
   110	        }}
   111	      >
   112	        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
   113	          <div className="max-w-2xl">
   114	            <h1
   115	              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
   116	              style={{ fontFamily: "var(--font-heading)" }}
   117	            >
   118	              Shop Everything<br />
   119	              <span style={{ color: "#FCD34D" }}>You Love</span>
   120	            </h1>
   121	            <p
   122	              className="mt-4 text-lg text-white/80 max-w-lg"
   123	              style={{ fontFamily: "var(--font-body)" }}
   124	            >
   125	              Fashion, home, groceries, books & more — all in one place. Trusted by thousands.
   126	            </p>
   127	            <div className="mt-8 flex flex-col sm:flex-row gap-3">
   128	              <Link
   129	                href="/products"
   130	                className="btn-cta inline-flex items-center justify-center gap-2 h-12 px-8 text-base"
   131	              >
   132	                Shop Now
   133	                <ChevronRight className="w-5 h-5" />
   134	              </Link>
   135	              <Link
   136	                href="/products"
   137	                className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold rounded-lg transition-colors"
   138	                style={{
   139	                  background: "rgba(255,255,255,0.15)",
   140	                  color: "white",
   141	                  backdropFilter: "blur(8px)",
   142	                  border: "1px solid rgba(255,255,255,0.2)",
   143	                }}
   144	              >
   145	                Browse Categories
   146	              </Link>
   147	            </div>
   148	          </div>
   149	        </div>
   150	        {/* Decorative shapes */}
   151	        <div
   152	          className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-10"
   153	          style={{ background: "#FCD34D" }}
   154	        />
   155	        <div
   156	          className="absolute -right-10 bottom-0 w-72 h-72 rounded-full opacity-10"
   157	          style={{ background: "#F97316" }}
   158	        />
   159	      </section>
   160	
   161	      {/* ── Categories ── */}
   162	      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
   163	        <div className="flex items-center justify-between mb-8">
   164	          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
   165	            Shop by Category
   166	          </h2>
   167	          <Link
   168	            href="/products"
   169	            className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
   170	            style={{ color: "var(--color-primary)" }}
   171	          >
   172	            View All <ChevronRight className="w-4 h-4" />
   173	          </Link>
   174	        </div>
   175	
   176	        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
   177	          {topCategories.map((cat) => {
   178	            const color = CATEGORY_COLORS[cat.slug] || "#2563EB";
   179	            const icon = CATEGORY_ICONS[cat.slug] || <Package className="w-6 h-6" />;
   180	            return (
   181	              <Link
   182	                key={cat.id}
   183	                href={`/products?category=${cat.slug}`}
   184	                className="category-card flex flex-col items-center gap-3 p-6 rounded-2xl text-center"
   185	                style={{
   186	                  background: "var(--color-surface)",
   187	                  boxShadow: "var(--shadow-card)",
   188	                }}
   189	              >
   190	                <div
   191	                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
   192	                  style={{ background: color }}
   193	                >
   194	                  {icon}
   195	                </div>
   196	                <div>
   197	                  <p className="font-semibold text-sm" style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}>
   198	                    {cat.name}
   199	                  </p>
   200	                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
   201	                    {cat.products.totalCount} items
   202	                  </p>
   203	                </div>
   204	              </Link>
   205	            );
   206	          })}
   207	        </div>
   208	      </section>
   209	
   210	      {/* ── Featured Products ── */}
   211	      <section style={{ background: "var(--color-surface)" }}>
   212	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
   213	          <div className="flex items-center justify-between mb-8">
   214	            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
   215	              Featured Products
   216	            </h2>
   217	            <Link
   218	              href="/products"
   219	              className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
   220	              style={{ color: "var(--color-primary)" }}
   221	            >
   222	              See All <ChevronRight className="w-4 h-4" />
   223	            </Link>
   224	          </div>
   225	
   226	          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
   227	            {products.map((product) => {
   228	              const price = product.pricing?.priceRange?.start?.gross;
   229	              const desc = parseDescription(product.description);
   230	              return (
   231	                <Link
   232	                  key={product.id}
   233	                  href={`/products/${product.slug}`}
   234	                  className="product-card rounded-2xl overflow-hidden group"
   235	                  style={{
   236	                    background: "var(--color-background)",
   237	                    boxShadow: "var(--shadow-card)",
   238	                  }}
   239	                >
   240	                  <div className="aspect-square relative overflow-hidden" style={{ background: "var(--color-surface-raised)" }}>
   241	                    {product.thumbnail?.url ? (
   242	                      <img
   243	                        src={product.thumbnail.url}
   244	                        alt={product.thumbnail.alt || product.name}
   245	                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
   246	                      />
   247	                    ) : (
   248	                      <div className="w-full h-full flex items-center justify-center">
   249	                        <Package className="w-12 h-12" style={{ color: "var(--color-text-light)" }} />
   250	                      </div>
   251	                    )}
   252	                    {product.category && (
   253	                      <span
   254	                        className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md"
   255	                        style={{
   256	                          background: "rgba(255,255,255,0.9)",
   257	                          color: "var(--color-text-muted)",
   258	                          backdropFilter: "blur(4px)",
   259	                        }}
   260	                      >
   261	                        {product.category.name}
   262	                      </span>
   263	                    )}
   264	                  </div>
   265	                  <div className="p-4">
   266	                    <h3
   267	                      className="font-semibold text-sm line-clamp-2 mb-1"
   268	                      style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
   269	                    >
   270	                      {product.name}
   271	                    </h3>
   272	                    {desc && (
   273	                      <p className="text-xs line-clamp-1 mb-2" style={{ color: "var(--color-text-muted)" }}>
   274	                        {desc}
   275	                      </p>
   276	                    )}
   277	                    <div className="flex items-center justify-between">
   278	                      <span className="text-base font-bold" style={{ color: "var(--color-cta)" }}>
   279	                        {formatPrice(price)}
   280	                      </span>
   281	                      <span
   282	                        className="text-xs px-2 py-0.5 rounded-full font-medium"
   283	                        style={{
   284	                          background: "rgba(22,163,74,0.1)",
   285	                          color: "var(--color-success)",
   286	                        }}
   287	                      >
   288	                        In Stock
   289	                      </span>
   290	                    </div>
   291	                  </div>
   292	                </Link>
   293	              );
   294	            })}
   295	          </div>
   296	        </div>
   297	      </section>
   298	
   299	      {/* ── Trust Bar ── */}
   300	      <section
   301	        className="border-t border-b"
   302	        style={{ borderColor: "var(--color-border)", background: "var(--color-surface-raised)" }}
   303	      >
   304	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
   305	          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
   306	            {[
   307	              { icon: <Truck className="w-7 h-7" />, title: "Free Delivery", desc: "On orders over $50" },
   308	              { icon: <Shield className="w-7 h-7" />, title: "Secure Payments", desc: "PayFast protected" },
   309	              { icon: <RotateCcw className="w-7 h-7" />, title: "Easy Returns", desc: "30-day return policy" },
   310	              { icon: <Star className="w-7 h-7" />, title: "Trusted Store", desc: "Rated on Trustpilot" },
   311	            ].map((item) => (
   312	              <div key={item.title} className="flex items-start gap-4">
   313	                <div
   314	                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
   315	                  style={{ background: "rgba(37,99,235,0.08)", color: "var(--color-primary)" }}
   316	                >
   317	                  {item.icon}
   318	                </div>
   319	                <div>
   320	                  <p className="font-semibold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
   321	                    {item.title}
   322	                  </p>
   323	                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
   324	                    {item.desc}
   325	                  </p>
   326	                </div>
   327	              </div>
   328	            ))}
   329	          </div>
   330	        </div>
   331	      </section>
   332	
   333	      {/* ── Trustpilot Placeholder ── */}
   334	      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
   335	        <div className="text-center mb-8">
   336	          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
   337	            What Our Customers Say
   338	          </h2>
   339	          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
   340	            Trusted by shoppers — rated on Trustpilot
   341	          </p>
   342	        </div>
   343	        <div
   344	          className="rounded-2xl p-8 sm:p-12 text-center"
   345	          style={{
   346	            background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
   347	            border: "1px solid #BBF7D0",
   348	          }}
   349	        >
   350	          <div className="flex items-center justify-center gap-1 mb-3">
   351	            {[1, 2, 3, 4, 5].map((i) => (
   352	              <Star key={i} className="w-6 h-6 fill-current" style={{ color: "#16A34A" }} />
   353	            ))}
   354	          </div>
   355	          <p className="text-lg font-semibold mb-1" style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}>
   356	            Excellent on Trustpilot
   357	          </p>
   358	          <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
   359	            Based on customer reviews
   360	          </p>
   361	          <div
   362	            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
   363	            style={{ background: "white", color: "#16A34A", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
   364	          >
   365	            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
   366	              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#16A34A" />
   367	            </svg>
   368	            Trustpilot Verified
   369	          </div>
   370	        </div>
   371	      </section>
   372	
   373	      {/* ── Footer ── */}
   374	      <footer style={{ background: "var(--color-text)", color: "white" }}>
   375	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
   376	          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
   377	            <div>
   378	              <div className="flex items-center gap-2 mb-4">
   379	                <div
   380	                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
   381	                  style={{ background: "var(--color-cta)", fontFamily: "var(--font-heading)" }}
   382	                >
   383	                  F
   384	                </div>
   385	                <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
   386	                  Favily
   387	                </span>
   388	              </div>
   389	              <p className="text-sm text-white/60">
   390	                Your one-stop online marketplace for everything you love.
   391	              </p>
   392	            </div>
   393	            <div>
   394	              <h4 className="font-semibold text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Shop</h4>
   395	              <ul className="space-y-2 text-sm text-white/60">
   396	                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
   397	                <li><Link href="/products?category=apparel" className="hover:text-white transition-colors">Apparel</Link></li>
   398	                <li><Link href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
   399	                <li><Link href="/products?category=homewares" className="hover:text-white transition-colors">Homewares</Link></li>
   400	              </ul>
   401	            </div>
   402	            <div>
   403	              <h4 className="font-semibold text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Support</h4>
   404	              <ul className="space-y-2 text-sm text-white/60">
   405	                <li><Link href="#" className="hover:text-white transition-colors">Help Centre</Link></li>
   406	                <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
   407	                <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
   408	                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
   409	              </ul>
   410	            </div>
   411	            <div>
   412	              <h4 className="font-semibold text-sm mb-3" style={{ fontFamily: "var(--font-heading)" }}>Company</h4>
   413	              <ul className="space-y-2 text-sm text-white/60">
   414	                <li><Link href="#" className="hover:text-white transition-colors">About Favily</Link></li>
   415	                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
   416	                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
   417	              </ul>
   418	            </div>
   419	          </div>
   420	          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
   421	            <p className="text-xs text-white/40">
   422	              © 2026 Favily. All rights reserved.
   423	            </p>
   424	            <div className="flex items-center gap-3 text-xs text-white/40">
   425	              <span>Powered by Saleor</span>
   426	              <span>·</span>
   427	              <span>Payments by PayFast</span>
   428	            </div>
   429	          </div>
   430	        </div>
   431	      </footer>
   432	    </div>
   433	  );
   434	}
   435	
