const fs = require('fs');
const path = require('path');

const testFiles = ['apiLogic.test.js', 'authScreen.test.js', 'CartScreen.test.js', 'ProductScreen.test.js'];
const output = {};

testFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  // Проверяем, существует ли файл
  if (!fs.existsSync(filePath)) {
    console.warn(`Предупреждение: Файл ${file} не найден в ${__dirname}`);
    return;
  }

  try {
    // Читаем содержимое файла
    const content = fs.readFileSync(filePath, 'utf8');
    const suiteName = file.replace('.test.js', '');

    // Извлекаем название набора тестов (поддерживаем ' и ")
    const suiteTitleMatch = content.match(/describe\(['"](.*?)['"],/);
    const suiteTitle = suiteTitleMatch ? suiteTitleMatch[1] : `Набор тестов ${suiteName}`;

    // Извлекаем тесты
    const tests = content.match(/test\(['"](.*?)['"],[\s\S]*?\}\);/g) || [];

    output[suiteName] = {
      name: suiteTitle,
      file,
      tests: tests.map(test => {
        const testNameMatch = test.match(/test\(['"](.*?)['"],/);
        return {
          name: testNameMatch ? testNameMatch[1] : 'Без названия',
          code: test.trim()
        };
      })
    };

    console.log(`Обработан файл ${file}: найдено ${tests.length} тестов`);
  } catch (error) {
    console.error(`Ошибка при обработке файла ${file}: ${error.message}`);
  }
});

// Сохраняем результат
try {
  fs.writeFileSync(
    path.join(__dirname, 'testSuitesData.js'),
    `export default ${JSON.stringify(output, null, 2)};`
  );
  console.log('Файл testSuitesData.js успешно создан');
} catch (error) {
  console.error(`Ошибка при записи testSuitesData.js: ${error.message}`);
}