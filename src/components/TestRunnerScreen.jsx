// import React, { useState } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import testSuitesData from '../testSuitesData';

// const TestRunnerScreen = ({ navigateTo }) => {
//   const [selectedSuite, setSelectedSuite] = useState(null);
//   const [testResults, setTestResults] = useState({});

//   const runTest = async (suiteName, testName) => {
//     try {
//       const response = await fetch('http://localhost:3001/run-tests', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ suite: testSuitesData[suiteName].file, test: testName })
//       });
//       const result = await response.json();
//       if (result.success) {
//         setTestResults(prev => ({
//           ...prev,
//           [suiteName]: {
//             ...prev[suiteName],
//             [testName]: {
//               status: result.testResults[0]?.status || 'failed',
//               message: result.testResults[0]?.message || null,
//               duration: result.testResults[0]?.duration || 0
//             }
//           }
//         }));
//       } else {
//         throw new Error(result.error);
//       }
//     } catch (error) {
//       setTestResults(prev => ({
//         ...prev,
//         [suiteName]: {
//           ...prev[suiteName],
//           [testName]: {
//             status: 'failed',
//             message: error.message,
//             duration: 0
//           }
//         }
//       }));
//     }
//   };

//   const runAllTests = async () => {
//     setTestResults({});
//     try {
//       const response = await fetch('http://localhost:3001/run-tests', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({})
//       });
//       const result = await response.json();
//       if (result.success) {
//         const newResults = {};
//         Object.keys(testSuitesData).forEach(suiteName => {
//           newResults[suiteName] = {};
//           testSuitesData[suiteName].tests.forEach(test => {
//             const testResult = result.testResults.find(tr => tr.testFilePath.includes(testSuitesData[suiteName].file) && tr.message?.includes(test.name));
//             newResults[suiteName][test.name] = {
//               status: testResult?.status || 'failed',
//               message: testResult?.message || null,
//               duration: testResult?.duration || 0
//             };
//           });
//         });
//         setTestResults(newResults);
//       } else {
//         throw new Error(result.error);
//       }
//     } catch (error) {
//       console.error('Error running all tests:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Тесты приложения</h1>
//           <div className="flex gap-4">
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               onClick={() => navigateTo('catalog')}
//             >
//               ← Каталог
//             </button>
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               onClick={runAllTests}
//             >
//               Запустить все тесты
//             </button>
//           </div>
//         </div>

//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="flex gap-4 mb-4">
//             {Object.keys(testSuitesData).map(suiteName => (
//               <button
//                 key={suiteName}
//                 className={`px-4 py-2 rounded ${selectedSuite === suiteName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                 onClick={() => setSelectedSuite(suiteName)}
//               >
//                 {testSuitesData[suiteName].name}
//               </button>
//             ))}
//           </div>

//           {selectedSuite && (
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">{testSuitesData[selectedSuite].name}</h2>
//               {testSuitesData[selectedSuite].tests.map(test => (
//                 <div key={test.name} className="mb-6 border-b pb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-xl font-medium">{test.name}</h3>
//                     <button
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       onClick={() => runTest(selectedSuite, test.name)}
//                     >
//                       Запустить
//                     </button>
//                   </div>
//                   <div className="bg-gray-900 p-4 rounded">
//                     <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
//                       {test.code}
//                     </SyntaxHighlighter>
//                   </div>
//                   {testResults[selectedSuite]?.[test.name] && (
//                     <div className="mt-2">
//                       <p className={`font-semibold ${testResults[selectedSuite][test.name].status === 'passed' ? 'text-green-500' : 'text-red-500'}`}>
//                         Статус: {testResults[selectedSuite][test.name].status === 'passed' ? 'Пройден' : 'Провал'}
//                       </p>
//                       {testResults[selectedSuite][test.name].message && (
//                         <p className="text-red-500">Ошибка: {testResults[selectedSuite][test.name].message}</p>
//                       )}
//                       <p>Время выполнения: {testResults[selectedSuite][test.name].duration.toFixed(2)} мс</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestRunnerScreen;