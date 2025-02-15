"use client";
import React, { useState } from "react";
import { Modal } from "./Modal";

interface CartItemProps {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
    onRemove: (id: number) => void;
}

export const CartItem = ({ id, title, image, price, quantity, onRemove }: CartItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemove = () => {
        setIsModalOpen(true);
    };

    const confirmRemove = () => {
        onRemove(id);
        setIsModalOpen(false);
    };

    return (
        <>
            <li className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center">
                    <img src={image} alt={title} className="w-16 h-24 object-cover mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p>Цена: {price.toLocaleString()} KZT</p>
                        <p>Количество: {quantity}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleRemove}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                >
                    Удалить
                </button>
            </li>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Подтвердите удаление"
                message={`Вы уверены, что хотите удалить "${title}" из корзины?`}
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
                        onClick={confirmRemove}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                    >
                        Удалить
                    </button>
                </div>
            </Modal>
        </>
    );
};