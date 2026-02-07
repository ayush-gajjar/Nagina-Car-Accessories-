// Local Storage Keys
const CART_KEY = 'nagina_cart'
const WISHLIST_KEY = 'nagina_wishlist'
const USER_KEY = 'nagina_user'

// Cart Interface
export interface CartItem {
  id: string
  name: string
  price: number
  salePrice: number
  image: string
  quantity: number
}

// Cart Functions
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cartUpdated'))
}

export const addToCart = (product: any) => {
  const cart = getCart()
  const existingItem = cart.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      quantity: 1
    })
  }
  
  saveCart(cart)
  return cart
}

export const removeFromCart = (productId: string) => {
  const cart = getCart().filter(item => item.id !== productId)
  saveCart(cart)
  return cart
}

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCart()
  const item = cart.find(item => item.id === productId)
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
    item.quantity = quantity
    saveCart(cart)
  }
  
  return cart
}

export const clearCart = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_KEY)
  window.dispatchEvent(new Event('cartUpdated'))
}

export const getCartTotal = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + (item.salePrice * item.quantity), 0)
}

export const getCartCount = () => {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

// Wishlist Functions
export const getWishlist = (): string[] => {
  if (typeof window === 'undefined') return []
  const wishlist = localStorage.getItem(WISHLIST_KEY)
  return wishlist ? JSON.parse(wishlist) : []
}

export const saveWishlist = (wishlist: string[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  window.dispatchEvent(new Event('wishlistUpdated'))
}

export const addToWishlist = (productId: string) => {
  const wishlist = getWishlist()
  if (!wishlist.includes(productId)) {
    wishlist.push(productId)
    saveWishlist(wishlist)
  }
  return wishlist
}

export const removeFromWishlist = (productId: string) => {
  const wishlist = getWishlist().filter(id => id !== productId)
  saveWishlist(wishlist)
  return wishlist
}

export const isInWishlist = (productId: string) => {
  return getWishlist().includes(productId)
}

// User Functions (for guest checkout)
export interface UserData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export const saveUserData = (userData: UserData) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_KEY, JSON.stringify(userData))
}

export const getUserData = (): UserData | null => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

// Order History
const ORDERS_KEY = 'nagina_orders'

export interface Order {
  id: string
  orderNumber: string
  date: string
  items: CartItem[]
  total: number
  userData: UserData
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
}

export const saveOrder = (order: Order) => {
  if (typeof window === 'undefined') return
  const orders = getOrders()
  orders.unshift(order)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return []
  const orders = localStorage.getItem(ORDERS_KEY)
  return orders ? JSON.parse(orders) : []
}

export const generateOrderNumber = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `NAG${timestamp}${random}`
}
