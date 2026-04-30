     1	const SALEOR_API_URL = process.env.SALEOR_API_URL || 'https://store-jhdunta7.saleor.cloud/graphql/';
     2	
     3	export async function saleorFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
     4	  const res = await fetch(SALEOR_API_URL, {
     5	    method: 'POST',
     6	    headers: { 'Content-Type': 'application/json' },
     7	    body: JSON.stringify({ query, variables }),
     8	    next: { revalidate: 60 },
     9	  });
    10	
    11	  const json = await res.json();
    12	  if (json.errors) {
    13	    console.error('Saleor GraphQL errors:', json.errors);
    14	    throw new Error(json.errors[0]?.message || 'GraphQL error');
    15	  }
    16	  return json.data as T;
    17	}
    18	
    19	export const GET_CATEGORIES = `
    20	  query GetCategories {
    21	    categories(first: 20) {
    22	      edges {
    23	        node {
    24	          id
    25	          name
    26	          slug
    27	          backgroundImage { url alt }
    28	          products(first: 1, channel: "default-channel") { totalCount }
    29	        }
    30	      }
    31	    }
    32	  }
    33	`;
    34	
    35	export const GET_PRODUCTS = `
    36	  query GetProducts($first: Int!, $after: String) {
    37	    products(
    38	      first: $first
    39	      after: $after
    40	      channel: "default-channel"
    41	      sortBy: { field: NAME, direction: ASC }
    42	    ) {
    43	      totalCount
    44	      pageInfo { hasNextPage endCursor }
    45	      edges {
    46	        node {
    47	          id
    48	          name
    49	          slug
    50	          description
    51	          thumbnail { url alt }
    52	          pricing {
    53	            priceRange {
    54	              start { gross { amount currency } }
    55	              stop { gross { amount currency } }
    56	            }
    57	          }
    58	          category { name slug }
    59	          isAvailable
    60	        }
    61	      }
    62	    }
    63	  }
    64	`;
    65	
    66	export const GET_PRODUCT_BY_SLUG = `
    67	  query GetProduct($slug: String!) {
    68	    product(slug: $slug, channel: "default-channel") {
    69	      id
    70	      name
    71	      slug
    72	      description
    73	      seoTitle
    74	      seoDescription
    75	      media { url alt type }
    76	      thumbnail { url alt }
    77	      pricing {
    78	        priceRange {
    79	          start { gross { amount currency } }
    80	          stop { gross { amount currency } }
    81	        }
    82	      }
    83	      category { name slug }
    84	      isAvailable
    85	      variants {
    86	        id
    87	        name
    88	        sku
    89	        pricing { price { gross { amount currency } } }
    90	        quantityAvailable
    91	      }
    92	    }
    93	  }
    94	`;
    95	
    96	export const SEARCH_PRODUCTS = `
    97	  query SearchProducts($query: String!) {
    98	    products(first: 20, channel: "default-channel", filter: { search: $query }) {
    99	      edges {
   100	        node {
   101	          id
   102	          name
   103	          slug
   104	          thumbnail { url alt }
   105	          pricing {
   106	            priceRange {
   107	              start { gross { amount currency } }
   108	            }
   109	          }
   110	          category { name slug }
   111	        }
   112	      }
   113	    }
   114	  }
   115	`;
   116	
   117	export interface SaleorMoney {
   118	  amount: number;
   119	  currency: string;
   120	}
   121	
   122	export interface SaleorProduct {
   123	  id: string;
   124	  name: string;
   125	  slug: string;
   126	  description: string;
   127	  thumbnail: { url: string; alt: string } | null;
   128	  media?: { url: string; alt: string; type: string }[];
   129	  pricing: {
   130	    priceRange: {
   131	      start: { gross: SaleorMoney };
   132	      stop?: { gross: SaleorMoney };
   133	    };
   134	  } | null;
   135	  category: { name: string; slug: string } | null;
   136	  isAvailable?: boolean;
   137	  variants?: {
   138	    id: string;
   139	    name: string;
   140	    sku: string;
   141	    pricing: { price: { gross: SaleorMoney } } | null;
   142	    quantityAvailable: number;
   143	  }[];
   144	}
   145	
   146	export interface SaleorCategory {
   147	  id: string;
   148	  name: string;
   149	  slug: string;
   150	  backgroundImage: { url: string; alt: string } | null;
   151	  products: { totalCount: number };
   152	}
   153	
   154	export function formatPrice(money: SaleorMoney | undefined): string {
   155	  if (!money) return 'Price unavailable';
   156	  return new Intl.NumberFormat('en-US', {
   157	    style: 'currency',
   158	    currency: money.currency,
   159	  }).format(money.amount);
   160	}
   161	
   162	export function parseDescription(description: string | null): string {
   163	  if (!description) return '';
   164	  try {
   165	    const parsed = JSON.parse(description);
   166	    if (parsed.blocks) {
   167	      return parsed.blocks
   168	        .map((block: { data?: { text?: string } }) => block.data?.text || '')
   169	        .join(' ')
   170	        .replace(/<[^>]*>/g, '');
   171	    }
   172	    return description;
   173	  } catch {
   174	    return description;
   175	  }
   176	}
   177	
