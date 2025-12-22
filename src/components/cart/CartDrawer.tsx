"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const {
    isOpen,
    setIsOpen,
    items,
    itemCount,
    subtotal,
    removeFromCart,
    updateQuantity,
    checkout,
    isLoading,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1A1A1A] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#2D2D2D]">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Cart ({itemCount})
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-[#00B4D8] hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="bg-[#2D2D2D] rounded-lg p-4 flex gap-4"
                    >
                      {/* Image placeholder */}
                      <div className="w-20 h-20 bg-[#1A1A1A] rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.variant?.image?.src ? (
                          <img
                            src={item.variant.image.src}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-[#0077B6] text-xl font-bold opacity-30">
                            TBF
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        {item.variant?.title !== "Default Title" && (
                          <p className="text-gray-400 text-sm">
                            {item.variant?.title}
                          </p>
                        )}
                        <p className="text-[#00B4D8] font-semibold mt-1">
                          ${parseFloat(item.variant?.price?.amount || "0").toFixed(2)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="w-8 h-8 bg-[#1A1A1A] rounded flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="w-8 h-8 bg-[#1A1A1A] rounded flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            disabled={isLoading}
                            className="ml-auto text-red-400 hover:text-red-300 text-sm transition-colors disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#2D2D2D] p-4 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Shipping and taxes calculated at checkout
                </p>
                <button
                  onClick={checkout}
                  disabled={isLoading}
                  className="w-full bg-[#0077B6] hover:bg-[#00B4D8] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
