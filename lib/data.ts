import type { CartItem } from "@/contexts/cart-context"

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number // 1-5
  comment: string
  date: string // ISO string or similar
}

export interface Product extends Omit<CartItem, "quantity"> {
  isNew: any
  colors: any
  rating: number // This will be replaced by averageRatin
  averageRating: number // New field for calculated average
  reviews: Review[] // Array of review objects
  sizes: string[]
  description: string
  images: string[]
  video?: string // New: Path to a product video (e.g., .mp4 file)
}

// New interface for curated looks
export interface Look {
  id: number
  name: string
  description: string
  image: string // Main image for the look
  productIds: number[] // Array of product IDs included in this look
  video?: string // NEW: Optional video for the look
}

export const products: Product[] = [
  {
    id: 3,
    name: "Artisan Handbag",
    price: "₹15,999",
    image: "/placeholder.svg?height=500&width=400",
    category: "Accessories",
    rating: 4.5, // This will be replaced by averageRating
    reviews: [
      {
        id: "rev301",
        userId: "user6",
        userName: "Kavita Rao",
        rating: 5,
        comment: "Exquisite craftsmanship! This bag is a work of art and worth every penny.",
        date: "2024-07-13T18:00:00Z",
      },
      {
        id: "rev302",
        userId: "user7",
        userName: "Vikram Gupta",
        rating: 4,
        comment: "My wife loved it. Very unique design.",
        date: "2024-07-09T12:00:00Z",
      },
    ],
    averageRating: 4.5, // Manually calculated for mock data
    colors: ["#8B7355", "#A0826E"],
    sizes: ["M"],
    description: "Handcrafted by skilled artisans, this exquisite handbag is a testament to traditional craftsmanship. Featuring intricate detailing and made from ethically sourced leather, it's a statement piece that complements any outfit.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Handbag+Front",
      "/placeholder.svg?height=800&width=600&text=Handbag+Open",
      "/placeholder.svg?height=800&width=600&text=Handbag+Detail",
    ],
    isNew: undefined
  },
  {
    id: 6,
    name: "Linen Palazzo",
    price: "₹6,999",
    image: "/placeholder.svg?height=500&width=400",
    category: "Bottoms",
    rating: 4.4, // This will be replaced by averageRating
    reviews: [
      {
        id: "rev601",
        userId: "user9",
        userName: "Sneha Patel",
        rating: 5,
        comment: "So breezy and elegant! Perfect for summer.",
        date: "2024-07-07T15:00:00Z",
      },
      {
        id: "rev602",
        userId: "user10",
        userName: "Rohan Joshi",
        rating: 4,
        comment: "Comfortable, but wrinkles easily. Still, a great pair of pants.",
        date: "2024-07-06T11:00:00Z",
      },
    ],
    averageRating: 4.5, // Manually calculated for mock data
    colors: ["#8B7355", "#CD9B7A", "#F5F0EB"],
    sizes: ["S", "M", "L", "XL"],
    description: "Flowy and elegant, our Linen Palazzo pants are perfect for warm weather. Made from 100% pure linen, they offer exceptional breathability and a relaxed fit, ideal for both casual and semi-formal occasions.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Palazzo+Front",
      "/placeholder.svg?height=800&width=600&text=Palazzo+Flow",
    ],
    isNew: undefined
  },
  // New Products
  {
    id: 7,
    name: "Classic Crewneck T-Shirt",
    price: "₹2,499",
    image: "/placeholder.svg?height=500&width=400&text=T-Shirt",
    category: "T-shirts",
    reviews: [],
    averageRating: 0,
    isNew: true,
    colors: ["#FFFFFF", "#2D2D2D", "#8B7355"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A timeless essential, our Classic Crewneck T-Shirt is crafted from premium organic cotton for ultimate comfort and durability. Perfect for layering or wearing on its own.",
    images: [
      "/placeholder.svg?height=800&width=600&text=T-Shirt+Front",
      "/placeholder.svg?height=800&width=600&text=T-Shirt+Detail",
    ],
    rating: 0
  },
  {
    id: 8,
    name: "Tailored Linen Shirt",
    price: "₹5,999",
    image: "/placeholder.svg?height=500&width=400&text=Shirt",
    category: "Shirts",
    reviews: [
      {
        id: "rev801",
        userId: "user11",
        userName: "Aditi Rao",
        rating: 5,
        comment: "Lightweight and stylish. Great for both casual and semi-formal occasions.",
        date: "2024-07-16T09:00:00Z",
      },
    ],
    averageRating: 5.0,
    colors: ["#F5F0EB", "#A0826E", "#1A4D2E"],
    sizes: ["S", "M", "L", "XL"],
    description: "Our Tailored Linen Shirt offers a relaxed yet refined look. Made from breathable linen, it's ideal for warmer climates and can be dressed up or down.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Shirt+Front",
      "/placeholder.svg?height=800&width=600&text=Shirt+Cuff",
    ],
    isNew: undefined,
    rating: 0
  },
  {
    id: 9,
    name: "Comfort Co-ord Set",
    price: "₹9,499",
    originalPrice: "₹11,000",
    image: "/placeholder.svg?height=500&width=400&text=Co-ord+Set",
    category: "Co-ords",
    reviews: [],
    averageRating: 0,
    isNew: true,
    colors: ["#CD9B7A", "#8B7355", "#2D2D2D"],
    sizes: ["S", "M", "L"],
    description: "Effortless style with our Comfort Co-ord Set. This matching top and bottom set is designed for ultimate comfort and a chic, coordinated look. Perfect for lounging or a relaxed outing.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Co-ord+Set+Full",
      "/placeholder.svg?height=800&width=600&text=Co-ord+Set+Detail",
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-posing-in-a-studio-con-un-fondo-blanco-34435-large.mp4",
    rating: 0
  },
  {
    id: 10,
    name: "Luxury Knit Hoodie",
    price: "₹7,999",
    image: "/placeholder.svg?height=500&width=400&text=Hoodie",
    category: "Hoodies",
    reviews: [
      {
        id: "rev1001",
        userId: "user12",
        userName: "Kabir Singh",
        rating: 4,
        comment: "Very soft and warm. A bit oversized but comfortable.",
        date: "2024-07-15T18:00:00Z",
      },
    ],
    averageRating: 4.0,
    colors: ["#2D2D2D", "#A0826E", "#F5F0EB"],
    sizes: ["S", "M", "L", "XL"],
    description: "Indulge in comfort with our Luxury Knit Hoodie. Made from a premium blend of cashmere and organic cotton, it offers unparalleled softness and warmth for cooler days.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Hoodie+Front",
      "/placeholder.svg?height=800&width=600&text=Hoodie+Texture",
    ],
    isNew: undefined,
    rating: 0
  },
  {
    id: 11,
    name: "Quilted Puffer Vest",
    price: "₹6,499",
    image: "/placeholder.svg?height=500&width=400&text=Vest",
    category: "Vests",
    reviews: [],
    averageRating: 0,
    colors: ["#8B7355", "#2D2D2D"],
    sizes: ["S", "M", "L"],
    description: "Stay warm and stylish with our Quilted Puffer Vest. Lightweight yet insulating, it's perfect for layering during transitional weather.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Vest+Front",
      "/placeholder.svg?height=800&width=600&text=Vest+Detail",
    ],
    isNew: undefined,
    rating: 0
  },
  {
    id: 12,
    name: "Embroidered Baseball Cap",
    price: "₹1,999",
    image: "/placeholder.svg?height=500&width=400&text=Cap",
    category: "Caps",
    reviews: [
      {
        id: "rev1201",
        userId: "user13",
        userName: "Meera Devi",
        rating: 5,
        comment: "Love the subtle embroidery. Great quality cap.",
        date: "2024-07-14T10:00:00Z",
      },
    ],
    averageRating: 5.0,
    colors: ["#2D2D2D", "#8B7355", "#F5F0EB"],
    sizes: ["S", "M", "L", "XL"],
    description: "Complete your look with our stylish Embroidered Baseball Cap. Featuring delicate embroidery and an adjustable strap, it offers both comfort and a touch of elegance.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Cap+Front",
      "/placeholder.svg?height=800&width=600&text=Cap+Side",
    ],
    isNew: undefined,
    rating: 0
  },
  {
    id: 13,
    name: "Oversized Denim Jacket",
    price: "₹11,999",
    image: "/placeholder.svg?height=500&width=400&text=Jacket",
    category: "Jackets",
    reviews: [],
    averageRating: 0,
    isNew: true,
    colors: ["#4A6C8C", "#2D2D2D"],
    sizes: ["S", "M", "L", "XL"],
    description: "A classic reimagined, our Oversized Denim Jacket offers a relaxed fit and timeless appeal. Made from durable, sustainably sourced denim, it's a versatile layering piece for any season.",
    images: [
      "/placeholder.svg?height=800&width=600&text=Jacket+Front",
      "/placeholder.svg?height=800&width=600&text=Jacket+Back",
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-posing-in-a-studio-con-un-fondo-blanco-34435-large.mp4",
    rating: 0
  },
]

// Mock data for curated looks
export const looks: Look[] = [
  {
    id: 1,
    name: "Evening Elegance",
    description: "A sophisticated ensemble perfect for a gala or a formal dinner.",
    image: "/placeholder.svg?height=800&width=600&text=Look+1+Model+Shot",
    productIds: [3], // Only Artisan Handbag remains
  },
  {
    id: 2,
    name: "Urban Professional",
    description: "Sharp and stylish for the modern professional.",
    image: "/placeholder.svg?height=800&width=600&text=Look+2+Street+Style",
    productIds: [], // Removed product 5 (Organic Cotton Tee) as it's a 'Top'
    video:
      "https://chapter2drip.com/cdn/shop/videos/c/vp/49d846302c2a4757b7b20736a5b86e7c/49d846302c2a4757b7b20736a5b86e7c.HD-1080p-7.2Mbps-47384917.mp4?v=0", // Added video
  },
  {
    id: 5,
    name: "Weekend Comfort",
    description: "The perfect blend of comfort and style for your off-duty days.",
    image: "/placeholder.svg?height=800&width=600&text=Look+5+Weekend",
    productIds: [7, 10, 12], // Classic Crewneck T-Shirt, Luxury Knit Hoodie, Embroidered Baseball Cap
    video:
      "https://chapter2drip.com/cdn/shop/videos/c/vp/4c71add4578c4bbcb2d55fdccfea7aca/4c71add4578c4bbcb2d55fdccfea7aca.HD-1080p-7.2Mbps-47384916.mp4?v=0", // NEW: Added video for Weekend Comfort
  },
  {
    id: 6,
    name: "Layered Urban",
    description: "A versatile layered look for the city explorer.",
    image: "/placeholder.svg?height=800&width=600&text=Look+6+Layered",
    productIds: [8, 11, 13], // Tailored Linen Shirt, Quilted Puffer Vest, Oversized Denim Jacket
  },
]
