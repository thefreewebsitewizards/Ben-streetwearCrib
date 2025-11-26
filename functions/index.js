const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();

setGlobalOptions({ region: 'europe-west1', maxInstances: 10 });

exports.addProduct = onCall({ cors: true }, async (request) => {
    // Authentication check removed for testing purposes as requested
    // if (!request.auth) {
    //    throw new HttpsError('failed-precondition', 'The function must be called while authenticated.');
    // }

    const data = request.data;
    const { name, description, price, stock, imageUrl, category, categories, shippingInfo, materialsCare, sizes, images, colors, rating, reviewCount } = data;

    // Basic validation
    if (!name || !price) {
         throw new HttpsError('invalid-argument', 'The function must be called with valid arguments.');
    }

    try {
        const productRef = await admin.firestore().collection('products').add({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            imageUrl: imageUrl || (images && images.length > 0 ? images[0] : null), // Fallback or primary image
            images: images || [], // Array of image URLs
            category: category || 'General', // Keep for backward compatibility or single display
            categories: categories || (category ? [category] : ['General']), // Array of categories
            shippingInfo: shippingInfo || '',
            materialsCare: materialsCare || '',
            sizes: sizes || [], // Array of sizes
            colors: colors || [], // Array of colors
            rating: rating ? parseFloat(rating) : 0,
            reviewCount: reviewCount ? parseInt(reviewCount) : 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return { id: productRef.id, message: 'Product added successfully' };
    } catch (error) {
        console.error("Error adding product: ", error);
        throw new HttpsError('internal', 'Unable to add product');
    }
});

exports.updateProduct = onCall({ cors: true }, async (request) => {
    // Authentication check removed for testing purposes
    // if (!request.auth) {
    //    throw new HttpsError('failed-precondition', 'The function must be called while authenticated.');
    // }

    const { productId, ...updates } = request.data;
    
    if (!productId) {
         throw new HttpsError('invalid-argument', 'Product ID is required.');
    }

    try {
        // Ensure numeric values are correctly typed
        if (updates.price !== undefined) updates.price = parseFloat(updates.price);
        if (updates.stock !== undefined) updates.stock = parseInt(updates.stock);
        if (updates.rating !== undefined) updates.rating = parseFloat(updates.rating);
        if (updates.reviewCount !== undefined) updates.reviewCount = parseInt(updates.reviewCount);
        
        updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();

        await admin.firestore().collection('products').doc(productId).update(updates);
        return { message: 'Product updated successfully' };
    } catch (error) {
        console.error("Error updating product: ", error);
        throw new HttpsError('internal', 'Unable to update product');
    }
});

exports.deleteProduct = onCall({ cors: true }, async (request) => {
    // Authentication check removed for testing purposes
    // if (!request.auth) {
    //    throw new HttpsError('failed-precondition', 'The function must be called while authenticated.');
    // }

    const { productId } = request.data;
    
    if (!productId) {
         throw new HttpsError('invalid-argument', 'Product ID is required.');
    }

    try {
        await admin.firestore().collection('products').doc(productId).delete();
        return { message: 'Product deleted successfully' };
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw new HttpsError('internal', 'Unable to delete product');
    }
});
