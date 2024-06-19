export default function AddDate() {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-700">
                    Agregar alquiler
                </h1>
                <form className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Fecha inicio:
                        </label>
                        <input type="date" className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Fecha fin:
                        </label>
                        <input type="date" className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Informacion adicional:
                        </label>
                        <input type="text" placeholder="Informacion adicional" className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="h-12 w-full rounded-lg bg-blue-600 text-white font-medium transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
