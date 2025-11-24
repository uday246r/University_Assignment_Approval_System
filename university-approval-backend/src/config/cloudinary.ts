import { v2 as cloudinary } from "cloudinary";

// Get environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Configure Cloudinary only if all environment variables are present
if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
} else {
  // Log warning but don't throw - allows server to start
  // The error will be thrown when upload is actually attempted
  console.warn('⚠️  Cloudinary not configured. File uploads will fail until environment variables are set.');
  const missing: string[] = [];
  if (!cloudName) missing.push('CLOUDINARY_CLOUD_NAME');
  if (!apiKey) missing.push('CLOUDINARY_API_KEY');
  if (!apiSecret) missing.push('CLOUDINARY_API_SECRET');
  console.warn(`   Missing: ${missing.join(', ')}`);
  console.warn('   Add these to your .env file in the root directory');
}

export default cloudinary;
