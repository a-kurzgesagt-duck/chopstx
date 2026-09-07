// This API endpoint saves form data to Upstash
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
// Only allow POST requests
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

try {
const { title, description, date, time } = req.body;

// Validate inputs
if (!title || !description || !date || !time) {
return res.status(400).json({ error: 'Missing required fields' });
}

// Create a unique key for this entry (using timestamp)
const timestamp = Date.now();
const key = `content:${timestamp}`;

// Store the data in Upstash
await kv.set(key, JSON.stringify({
title,
description,
date,
time,
timestamp,
}));

res.status(200).json({
message: 'Content saved successfully',
key
});
} catch (error) {
console.error('Error saving content:', error);
res.status(500).json({ error: 'Failed to save content' });
}
}
