const fs = require('fs-extra');
const path = require('path');

class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(_, testResults) {
    const report = this.generateReport(testResults);
    const outputPath = path.resolve(process.cwd(), 'test-report.html');
    fs.writeFileSync(outputPath, report);
    console.log(`Отчёт сохранён: ${outputPath}`);
  }

  generateReport(testResults) {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Отчёт тестов</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .test { margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
          .test-pass { background-color: #e8f5e9; }
          .test-fail { background-color: #ffebee; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 3px; overflow-x: auto; }
          .status { font-weight: bold; margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <h1>Результаты тестов</h1>
    `;

    testResults.testResults.forEach(suite => {
      suite.testResults.forEach(test => {
        const testCode = this.getTestCode(suite.testFilePath, test.title);
        html += `
          <div class="test test-${test.status}">
            <div class="status">${test.status === 'passed' ? '✅ PASS' : '❌ FAIL'}: ${test.title}</div>
            <div>Время выполнения: ${test.duration}ms</div>
            <pre><code>${testCode}</code></pre>
          </div>
        `;
      });
    });

    html += `</body></html>`;
    return html;
  }

  getTestCode(filePath, testTitle) {
    try {
      const code = fs.readFileSync(filePath, 'utf8');
      const lines = code.split('\n');
      let startLine = 0;
      let endLine = 0;

      // Находим строки с тестом
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`test("${testTitle}"`) || lines[i].includes(`test('${testTitle}'`)) {
          startLine = i;
          let openBraces = 0;
          for (let j = i; j < lines.length; j++) {
            openBraces += (lines[j].match(/{/g) || []).length;
            openBraces -= (lines[j].match(/}/g) || []).length;
            if (openBraces === 0 && j > i) {
              endLine = j;
              break;
            }
          }
          break;
        }
      }

      return lines.slice(startLine, endLine + 1).join('\n');
    } catch (e) {
      return 'Не удалось загрузить код теста.';
    }
  }
}

module.exports = CustomReporter;