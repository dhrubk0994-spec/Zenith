
# Zenith Deployment Guide

### 1. Environment Variables (Add to Vercel)
- `API_KEY`: Your Google Gemini API Key.
- `RAZORPAY_KEY_ID`: Your Razorpay Public Key.
- `RAZORPAY_KEY_SECRET`: Your Razorpay Private Key (Keep Secret!).
- `PRINTFUL_API_KEY`: Your Printful Private Token.
- `GELATO_API_KEY`: Your Gelato API Key.

### 2. Implementation Steps
- **Products**: Create `api/products.ts` on Vercel to fetch from `api.printful.com/store/products`.
- **Payments**: The `paymentService.ts` now correctly calls `/api/create-razorpay-order` to generate secure IDs.
- **Fulfillment**: Create `api/fulfillment.ts` to receive payment confirmation and send the order to Printful/Gelato.

### 3. Launch
Push this repo to GitHub, connect it to Vercel, and add the variables listed above.
