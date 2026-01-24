"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const Pay = ({cart}) => {

    const total = cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    const {isPending, isError, mutate, data} = useMutation({
        mutationFn: async () => {
            const startTime = Date.now();
            const response = await axios.post('http://localhost:8000/order', {
                cart,
            });
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000;
            return { ...response, duration };
        },
    })

    return (
        <div className="bg-red-50 flex flex-col items-center justify-center gap-4 py-8 rounded-xl">
            <div className="flex flex-col gap-12">
                <div className="">
                    <div className="flex items-center gap-8">
                        <h1 className="font-thin tracking-wider">CART TOTAL</h1>
                        <h2 className="text-xl font-bold tracking-widest">{total}</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Shipping & taxes calculated at checkout
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <input 
                        type="checkbox" 
                        id="terms"
                        className="w-4 h-4"
                        defaultChecked={true}
                    />
                    <label htmlFor="terms">
                        I agree to the{" "}
                        <span className="text-red-300">Terms and Conditions</span>
                    </label>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                    <span className="font-semibold text-sm">Saved Card:</span>
                    <Image src="/visa.png" alt="card" width={30} height={30}/>
                    <span className="font-semibold text-xs">**** 8944</span>
                    <span className="text-xs text-red-300">(change)</span>
                </div>
                <button 
                    disabled={isPending}
                >
                    <span>CHECKOUT</span>
                </button>
            </div>
        </div>
    )
};

export default Pay;