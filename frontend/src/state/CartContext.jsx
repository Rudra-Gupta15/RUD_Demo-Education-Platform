import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [purchasedCourses, setPurchasedCourses] = useState(() => {
    const savedPurchased = localStorage.getItem("purchasedCourses");
    return savedPurchased ? JSON.parse(savedPurchased) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("purchasedCourses", JSON.stringify(purchasedCourses));
  }, [purchasedCourses]);

  const addToCart = (course) => {
    setCartItems((prevItems) => {
      if (prevItems.some((item) => item.id === course.id)) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== courseId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (course) => {
    setWishlist((prevItems) => {
      if (prevItems.some((item) => item.id === course.id)) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  };

  const removeFromWishlist = (courseId) => {
    setWishlist((prevItems) => prevItems.filter((item) => item.id !== courseId));
  };

  const purchaseCourses = (courses) => {
    setPurchasedCourses((prevItems) => {
      const newItems = [...prevItems];
      courses.forEach((course) => {
        if (!newItems.some((item) => item.id === course.id)) {
          newItems.push(course);
        }
      });
      return newItems;
    });
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        addToCart,
        removeFromCart,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        purchasedCourses,
        purchaseCourses,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
