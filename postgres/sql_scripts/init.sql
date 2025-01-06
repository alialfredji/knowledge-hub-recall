-- Enable pgvector extensions
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table for storing initial data for content
CREATE TABLE IF NOT EXISTS uploads (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
