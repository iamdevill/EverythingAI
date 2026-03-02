// Node.js script to test the products API endpoints
// Using native fetch (available in Node.js v20+)
const API_BASE = 'http://localhost:3000/api';

async function testProductsAPI() {
    console.log('Testing Products API...\n');

    try {
        // Test GET request
        console.log('1. Testing GET /api/products');
        const getResponse = await fetch(`${API_BASE}/products`);
        const products = await getResponse.json();
        console.log(`GET Response: ${getResponse.status} - ${products.length} products found\n`);

        // Test POST request (create new product)
        console.log('2. Testing POST /api/products');
        const newProduct = {
            name: 'Test Product ' + Date.now(),
            price: 29.99,
            description: 'This is a test product',
            inventory: 100,
            sku: 'TEST-' + Date.now()
        };

        const postResponse = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (postResponse.ok) {
            const createdProduct = await postResponse.json();
            console.log(`POST Response: ${postResponse.status} - Product created with ID: ${createdProduct.id}\n`);
            
            // Test PUT request (update product)
            console.log('3. Testing PUT /api/products');
            const updatedProduct = {
                id: createdProduct.id,
                name: 'Updated Test Product',
                price: 39.99
            };

            const putResponse = await fetch(`${API_BASE}/products`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            if (putResponse.ok) {
                const updated = await putResponse.json();
                console.log(`PUT Response: ${putResponse.status} - Product updated successfully\n`);
                
                // Test DELETE request (soft delete)
                console.log('4. Testing DELETE /api/products');
                const deleteResponse = await fetch(`${API_BASE}/products?id=${createdProduct.id}`, {
                    method: 'DELETE'
                });

                if (deleteResponse.ok) {
                    const deleteResult = await deleteResponse.json();
                    console.log(`DELETE Response: ${deleteResponse.status} - Product deleted successfully\n`);
                } else {
                    console.log(`DELETE Response: ${deleteResponse.status} - Error: ${deleteResult.error}\n`);
                }
            } else {
                const putResult = await putResponse.json();
                console.log(`PUT Response: ${putResponse.status} - Error: ${putResult.error}\n`);
            }
        } else {
            const postResult = await postResponse.json();
            console.log(`POST Response: ${postResponse.status} - Error: ${postResult.error}\n`);
        }

    } catch (error) {
        console.error('Error testing API:', error.message);
    }
}

testProductsAPI();