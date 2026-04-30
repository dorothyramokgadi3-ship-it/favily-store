     1	import Link from "next/link";
     2	import { ShoppingCart, ArrowLeft, Trash2, Package, ShieldCheck } from "lucide-react";
     3	
     4	export default function CartPage() {
     5	  // Cart state will be managed client-side with localStorage
     6	  // This is a placeholder that shows the cart structure
     7	  return (
     8	    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
     9	      {/* Navbar */}
    10	      <nav className="sticky top-0 z-50" style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-nav)" }}>
    11	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    12	          <div className="flex items-center justify-between h-16">
    13	            <Link href="/" className="flex items-center gap-2">
    14	              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ background: "var(--color-cta)", fontFamily: "var(--font-heading)" }}>F</div>
    15	              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>Favily</span>
    16	            </Link>
    17	          </div>
    18	        </div>
    19	      </nav>
    20	
    21	      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    22	        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
    23	          <Link href="/" className="hover:underline" style={{ color: "var(--color-primary)" }}>Home</Link>
    24	          <span>/</span>
    25	          <span>Shopping Cart</span>
    26	        </div>
    27	
    28	        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
    29	          Shopping Cart
    30	        </h1>
    31	
    32	        {/* Empty State */}
    33	        <div className="text-center py-16 rounded-2xl" style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
    34	          <ShoppingCart className="w-20 h-20 mx-auto mb-4" style={{ color: "var(--color-text-light)" }} />
    35	          <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
    36	            Your cart is empty
    37	          </h2>
    38	          <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
    39	            Looks like you haven't added anything yet. Start shopping!
    40	          </p>
    41	          <Link href="/products" className="btn-cta inline-flex items-center gap-2 h-12 px-8 text-base">
    42	            <Package className="w-5 h-5" />
    43	            Browse Products
    44	          </Link>
    45	        </div>
    46	
    47	        {/* Checkout Section - visible when items in cart */}
    48	        <div className="mt-8 rounded-2xl p-6" style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
    49	          <div className="flex items-center gap-3 mb-4">
    50	            <ShieldCheck className="w-5 h-5" style={{ color: "var(--color-success)" }} />
    51	            <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
    52	              Secure checkout powered by PayFast
    53	            </span>
    54	          </div>
    55	          <div className="p-4 rounded-xl text-center" style={{ background: "rgba(249,115,22,0.06)", border: "1px dashed var(--color-cta)" }}>
    56	            <p className="text-sm font-medium" style={{ color: "var(--color-cta)" }}>
    57	              PayFast integration coming soon — add your merchant credentials to enable payments
    58	            </p>
    59	          </div>
    60	        </div>
    61	      </div>
    62	    </div>
    63	  );
    64	}
    65	
