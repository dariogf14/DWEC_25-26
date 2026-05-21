USE devportfolio;
INSERT INTO users (id, username, password, bio, email, photo) VALUES
(1, 'data_wiz', MD5('1234'), 'Backend developer skilled in databases, APIs, and data analysis.', 'data.wiz@example.com', 'https://randomuser.me/api/portraits/women/65.jpg'),
(2, 'game_maker', MD5('1234'), 'Game developer passionate about interactive entertainment.', 'game.maker@example.com', 'https://randomuser.me/api/portraits/men/32.jpg'),
(3, 'ai_builder', MD5('1234'), 'AI/ML engineer developing intelligent solutions.', 'ai.builder@example.com', 'https://randomuser.me/api/portraits/men/75.jpg');
INSERT INTO projects (id, title, description, repo_url, live_url, user_id) VALUES
(1, 'Data Visualization Tool', 'Transforms complex datasets into interactive charts and graphs.', 'https://github.com/example/data-viz', 'https://example.com/data-viz', 1),
(2, 'API Gateway', 'Manages and routes requests to multiple backend services.', 'https://github.com/example/api-gateway', '', 1),
(3, 'Indie Platformer', 'A 2D platform game made with JavaScript.', 'https://github.com/example/platformer', 'https://example.com/platformer', 2),
(4, 'Image Classifier', 'Small machine learning app for classifying images.', 'https://github.com/example/image-classifier', '', 3);
INSERT INTO social_links (id, platform, url, user_id) VALUES
(1, 'GitHub', 'https://github.com/data-wiz', 1),(2, 'LinkedIn', 'https://linkedin.com/in/data-wiz', 1),(3, 'GitHub', 'https://github.com/game-maker', 2),(4, 'Twitter', 'https://twitter.com/ai-builder', 3);
ALTER TABLE users AUTO_INCREMENT = 4;ALTER TABLE projects AUTO_INCREMENT = 5;ALTER TABLE social_links AUTO_INCREMENT = 5;
