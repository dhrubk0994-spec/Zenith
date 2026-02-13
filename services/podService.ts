
import { Product } from '../types';

/**
 * FETCHING PRODUCTS:
 * In production, we fetch from our own API which merges 
 * data from Printful and Gelato securely.
 */
export const fetchCollection = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (err) {
    console.warn("Using fallback local data due to API error");
    // If backend is not yet ready, we return empty or cached
    return [];
  }
};

/**
 * SYNCING FULFILLMENT:
 * This is called only AFTER payment success.
 */
export const syncOrderToPOD = async (paymentResponse: any, cart: any) => {
  const response = await fetch('/api/fulfillment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payment: paymentResponse,
      items: cart
    })
  });
  
  return await response.json();
};
