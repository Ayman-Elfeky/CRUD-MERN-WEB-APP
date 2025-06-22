import mongoose from 'mongoose'
import Product from '../Models/Product.model.js'

const getProducts = async (req, res)=> {
    try {
        const products = await Product.find({});
        console.log("Products has fetched successfully")
        res.status(200).json({success: true, message: products})
    } catch (error) {
        console.log("Error in fetching Products: ", error.message)
        res.status(500).json({success: false, message: error.message})
    }
}

const createProduct = async (req, res) => {
    console.log(req.body);
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Add all fields'})
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        console.log("A new product has been added successfully:", newProduct)
        res.status(201).json({success: true, message: `A new Product has added successfully` })
    } catch (error) {
        console.log("Error in add the product: ", error.message)
        return res.status(500).json({success: false, message: 'Server Error'})
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // If the id is not found in mongoose
    if(!mongoose.Types.ObjectId.isValid(id)) {
        console.log('From Delete: The Product does not found');
        return res.status(404).json({success: false, message: 'Product is Not Found'})
    }

    try {
        // {new:true} returns the product after updating but the opposite returns the product before updating
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        console.log('Product has been added successfully:', updatedProduct);
        res.status(200).json({success: true, message: 'The product updated successfully'})
    } catch (error) {
        console.log('Error in updating a product: ', error.message);
        res.status(500).json({success: false, message: 'Error in updating the product'})
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    // If the id is not found in mongoose
    if(!mongoose.Types.ObjectId.isValid(id)) {
        console.log('The product does not found');
        return res.status(404).json({successs: false, message: 'The product does not found'});
    }

    try {
        const done = await Product.findByIdAndDelete(id);
        console.log("product has been deleted successfully:", done)
        res.status(200).json({success: true, message: 'Product has deleted successfully'})
    } catch (error) {
        console.log('Error cannot find the product: ', error.message);
        res.status(500).json({success: false, message: "Couldn't find the product"})
    }
}

export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}