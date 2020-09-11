// @ts-check

'use strict';

const fs = require(`fs/promises`);

/**
 * @typedef AnnouncementType
 * @type {('offer'|'sale')}
 */

/**
 * @typedef AnnouncementCategory
 * @type {('Книги'|'Разное'|'Посуда'|'Игры'|'Животные'|'Журналы')}
 */

/**
 * @typedef Announcement
 * @type {object}
 * @property {string} id - Уникальный индентификатор.
 * @property {string} title - Заголовок объявления.
 * @property {string} picture - Имя файла с изображением.
 * @property {string} description - Краткое описание объявления.
 * @property {AnnouncementType} type - Тип объявления.
 * @property {number} sum - Стоимость товара.
 * @property {AnnouncementCategory[]} category - Массив категорий к которым относится объявление.
 */

/**
 * Генерирует моковые данные с Объявлениями.
 * @param {number} count
 * @return {Announcement[]}
 */
const generateAnnouncements = (count) => {
  const items = [];

  for (let i = 0; i <= count; i += 1) {
    /**
     * @type {Announcement}
     */
    const item = {
      id: `1`,
      title: ``,
      picture: `itemXX.jpg`,
      description: ``,
      type: `offer`,
      category: [`Игры`],
      sum: 100
    };

    items.push(item);
  }

  return items;
};

/**
 * Записывает моковые данные в файл mocks.json
 * @param {Announcement[]} data
 */
const makeFileWithMocks = async (data) => {
  try {
    await fs.writeFile(__dirname, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const MAX_ANNOUNCEMENTS = 1000;

module.exports = {
  name: `--generate`,

  /**
   * @param {number} count
   */
  run(count) {
    const announcement = generateAnnouncements(
        count > MAX_ANNOUNCEMENTS
          ? count
          : MAX_ANNOUNCEMENTS
    );

    makeFileWithMocks(announcement);
  }
};
