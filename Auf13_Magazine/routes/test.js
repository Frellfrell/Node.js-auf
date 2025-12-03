import express from 'express';
import Publisher from '../models/Publisher.js';
import Magazine from '../models/Magazine.js';
import Tag from '../models/Tag.js';
import Article from '../models/Article.js';

const router = express.Router();

// Создание издателя, журнала, статьи и тега для тестирования
router.post('/test', async (_req, res) => {
  try {
    // Создание издателя
    const publisher = new Publisher({
      name: 'Awesome Publisher',
      location: 'New York'
    });
    await publisher.save();

    // Создание журнала, привязанного к издателю
    const magazine = new Magazine({
      title: 'Tech Weekly',
      issueNumber: 1,
      publisher: publisher._id
    });
    await magazine.save();

    // Создание тега
    const tag = new Tag({ name: 'Tech' });
    await tag.save();

    // Создание статьи, привязанной к тегу
    const article = new Article({
      title: 'The Future of Tech',
      content: 'Content of the article...',
      tags: [tag._id]  // связываем статью с тегом
    });
    await article.save();

    // Добавляем статью в тег
    tag.articles.push(article._id);
    await tag.save();

    // Ответ с результатом
    res.json({
      message: 'Test data created successfully!',
      publisher,
      magazine,
      tag,
      article
    });
  } catch (err) {
    console.error('Error creating test data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;