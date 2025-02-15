"use client";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearCart } from "@/store/cartSlice";
import type { RootState } from "@/store";
import { CartItem } from "./CartItem";
import { Modal } from "./Modal";
import { useState } from "react";

export const Cart = () => {
    const dispatch = useDispatch();
    const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        setIsModalOpen(true);
    };

    const confirmClearCart = () => {
        dispatch(clearCart());
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
            <h1 className="text-2xl font-bold mb-4">Корзина</h1>
            {totalQuantity === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {items.map(item => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                quantity={item.quantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </ul>
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Итого: {totalPrice.toLocaleString()} KZT</h2>
                        <button
                            type="button"
                            onClick={handleClearCart}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                            Очистить корзину
                        </button>
                    </div>
                </>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Подтвердите очистку корзины"
                message="Вы уверены, что хотите очистить корзину? Все товары будут удалены."
            >
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        onClick={confirmClearCart}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                    >
                        Очистить
                    </button>
                </div>
            </Modal>
        </div>
    );
};