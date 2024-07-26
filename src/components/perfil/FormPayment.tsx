interface FormPaymentProps {
    title: string
    formData: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClose?: () => void
}
export default function FormPayment({ title, formData, handleChange, handleClose }: FormPaymentProps) {
    return (
        <div className="bg-transparent border-4 border-gray-600 rounded-lg p-4 relative text-xsm">
                <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded px-1.5 py-0.5 text-xsm"
                    onClick={handleClose}
                >
                    X
                </button>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <form className='mb-8'>
                <div className="mb-4">
                    <label className="block text-gray-600">CPF: <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Número do Cartão:</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Data de Validade:</label>
                    <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">CVV:</label>
                    <input
                        type="text"
                        name="cardCVV"
                        value={formData.cardCVV}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
            </form>
        </div>
    );
}
