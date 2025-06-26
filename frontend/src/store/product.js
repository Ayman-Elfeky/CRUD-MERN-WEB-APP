import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch("api/products");
		console.log("Response from API: ", res);
		const data = await res.json();
        console.log("Fetched Products from API: ", data.message);
		set({ products: data.message });
	},
	deleteProduct: async (id) => {
		try {
			const res = await fetch(`/api/products/${id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			
			if (!res.ok) {
				return { success: false, message: data.message || "Failed to delete product" };
			}
			
			// Remove the product from the state
			set((state) => ({
				products: state.products.filter((product) => product._id !== id)
			}));
			
			return { success: true, message: "Product deleted successfully" };
		} catch (error) {
			console.error("Error deleting product:", error);
			return { success: false, message: "Network error. Please try again." };
		}
	},
}));