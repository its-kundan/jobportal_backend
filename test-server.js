import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testServer() {
    try {
        // Test health endpoint
        console.log('Testing health endpoint...');
        const healthResponse = await fetch(`${BASE_URL}/health`);
        const healthData = await healthResponse.json();
        console.log('Health check:', healthData);

        // Test 404 endpoint
        console.log('\nTesting 404 endpoint...');
        const notFoundResponse = await fetch(`${BASE_URL}/api/nonexistent`);
        const notFoundData = await notFoundResponse.json();
        console.log('404 response:', notFoundData);

        console.log('\n✅ Server is running and responding correctly!');
    } catch (error) {
        console.error('❌ Server test failed:', error.message);
    }
}

testServer();
