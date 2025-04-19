import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  removeFromCart,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
} from "../features/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const [shippingMethod, setShippingMethod] = useState("pickup");

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const shippingCost = shippingMethod === "pickup" ? 0 : 9.9;
  const total = subtotal + shippingCost;

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 text-red-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-red-500">My Cart</h1>
        <button
          onClick={() => navigate("/")}
          className="hover:text-red-600 text-sm sm:text-base hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-base sm:text-xl">
          🛒 Your cart is empty.
        </div>
      ) : (
        <>
          {/* Desktop Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 border-b text-xs sm:text-sm uppercase">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Product Info */}
              <Link
                to={`/card/${item.id}`}
                className="col-span-6 flex gap-3 items-start sm:items-center"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover bg-gray-100 rounded"
                />
                <div>
                  <h3 className="font-medium text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Brand: {item.brand}</p>
                </div>
              </Link>

              {/* Price */}
              <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                <p className="font-medium w-full md:w-auto text-sm sm:text-base text-right">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity */}
              <div className="md:col-span-2 flex justify-center items-center">
                <div className="flex items-center gap-2 border px-3 py-1 rounded">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="hover:text-red-600 text-xs sm:text-base"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="min-w-[24px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="hover:text-red-600 text-xs sm:text-base"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>

              {/* Total + Remove */}
              <div className="md:col-span-2 flex justify-between md:justify-end items-center gap-3">
                <span className="font-medium w-full md:w-auto text-sm sm:text-base text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Summary Section */}
          <div className="mt-10 p-4 border rounded-lg space-y-4 text-sm sm:text-base">
            <h3 className="font-semibold text-base sm:text-lg">Choose Shipping Option</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "pickup"}
                    onChange={() => setShippingMethod("pickup")}
                  />
                  Store Pickup (20 mins)
                </div>
                <span className="font-medium">Free</span>
              </label>

              <label className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "delivery"}
                    onChange={() => setShippingMethod("delivery")}
                  />
                  Home Delivery (2–4 Days)
                </div>
                <span className="font-medium">$9.90</span>
              </label>

              {shippingMethod === "delivery" && (
                <p className="text-xs sm:text-sm pl-6 text-gray-600">
                  Delivery Address: 45 Glenridge Ave, Brooklyn, NY
                </p>
              )}
            </div>

            <div className="border-t pt-4 space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-sm sm:text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Proceeding to checkout...")}
                className="bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-red-600 w-full sm:w-auto text-sm sm:text-base"
              >
                Checkout <span className="ml-3">${total.toFixed(2)}</span>
              </motion.button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
