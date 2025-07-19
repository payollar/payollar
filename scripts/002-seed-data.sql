-- Insert admin user
INSERT INTO users (email, password_hash, user_type, first_name, last_name, verified) VALUES
('admin@payola.com', '$2b$10$example_hash', 'admin', 'System', 'Administrator', TRUE);

-- Insert sample talents
INSERT INTO users (email, password_hash, user_type, first_name, last_name, phone, bio, location, verified) VALUES
('dj.mike@example.com', '$2b$10$example_hash', 'talent', 'Mike', 'Johnson', '+1234567890', 'Professional DJ with 10+ years experience', 'Los Angeles, CA', TRUE),
('mc.sarah@example.com', '$2b$10$example_hash', 'talent', 'Sarah', 'Williams', '+1234567891', 'Dynamic MC and event host', 'New York, NY', TRUE),
('artist.alex@example.com', '$2b$10$example_hash', 'talent', 'Alex', 'Rodriguez', '+1234567892', 'Multi-genre artist and performer', 'Miami, FL', TRUE);

-- Insert sample media owners
INSERT INTO users (email, password_hash, user_type, first_name, last_name, phone, location, verified) VALUES
('contact@radiowave.com', '$2b$10$example_hash', 'media_owner', 'John', 'Smith', '+1234567893', 'Los Angeles, CA', TRUE),
('booking@streamtv.com', '$2b$10$example_hash', 'media_owner', 'Emma', 'Davis', '+1234567894', 'New York, NY', TRUE);

-- Insert talent profiles
INSERT INTO talent_profiles (user_id, stage_name, talent_type, genres, experience_years, hourly_rate, portfolio_links, social_media_links, skills, equipment_owned, travel_radius) VALUES
(2, 'DJ Mike Beats', 'dj', ARRAY['Electronic', 'Hip-Hop', 'Pop'], 10, 150.00, ARRAY['https://soundcloud.com/djmike'], '{"instagram": "@djmikebeats", "twitter": "@djmike"}', ARRAY['Mixing', 'Scratching', 'Live Performance'], ARRAY['Pioneer CDJ-2000', 'Allen & Heath Mixer'], 50),
(3, 'MC Sarah Fire', 'mc', ARRAY['Hip-Hop', 'R&B', 'Pop'], 8, 120.00, ARRAY['https://youtube.com/mcsarah'], '{"instagram": "@mcsarahfire", "tiktok": "@sarahfire"}', ARRAY['Live Hosting', 'Crowd Engagement', 'Freestyle'], ARRAY['Wireless Microphone', 'Portable Speaker'], 75),
(4, 'Alex Harmony', 'artist', ARRAY['Pop', 'Rock', 'Acoustic'], 12, 200.00, ARRAY['https://spotify.com/alexharmony'], '{"instagram": "@alexharmony", "youtube": "AlexHarmonyMusic"}', ARRAY['Vocals', 'Guitar', 'Songwriting'], ARRAY['Acoustic Guitar', 'Keyboard', 'Audio Interface'], 100);

-- Insert media owner profiles
INSERT INTO media_owner_profiles (user_id, company_name, media_type, company_size, website_url, preferred_genres, budget_range_min, budget_range_max) VALUES
(5, 'RadioWave FM', 'radio', 'medium', 'https://radiowave.com', ARRAY['Pop', 'Hip-Hop', 'Electronic'], 100.00, 300.00),
(6, 'StreamTV Network', 'tv', 'large', 'https://streamtv.com', ARRAY['Pop', 'Rock', 'R&B'], 200.00, 500.00);

-- Insert sample bookings
INSERT INTO bookings (talent_id, media_owner_id, title, description, event_type, start_datetime, end_datetime, location, budget, status) VALUES
(2, 5, 'Morning Show DJ Set', 'Live DJ performance for morning radio show', 'Radio Show', '2024-01-15 08:00:00', '2024-01-15 10:00:00', 'RadioWave FM Studio, LA', 300.00, 'confirmed'),
(3, 6, 'Live TV Performance', 'MC performance for variety show', 'TV Show', '2024-01-20 19:00:00', '2024-01-20 20:00:00', 'StreamTV Studios, NY', 400.00, 'pending');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, related_booking_id) VALUES
(2, 'Booking Confirmed', 'Your booking for Morning Show DJ Set has been confirmed!', 'booking_update', 1),
(5, 'New Booking Request', 'You have a new booking request from MC Sarah Fire', 'new_request', 2);
