let runs = 8;
const MAX_N = 1000000;

function measureOneLine() {
  const LINE_SIZE = 16; // 64/sizeof(int)
  let result = [];

  // Fill with -1 to ensure allocation
  const M = new Array(runs * LINE_SIZE).fill(-1);

  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    let val = M[i * LINE_SIZE];
    const end = performance.now();

    result.push(end - start);
  }

  return result;
}

function findMedian(arr) {
  arr.sort((a, b) => a - b);
  const middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
      return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
  } else {
      return arr[middleIndex];
  }
}

function measureNLines() {
  const LINE_SIZE = 16; // 64/sizeof(int)
  let result = [];
  

  // Fill with -1 to ensure allocation
  const M = new Array(MAX_N * LINE_SIZE).fill(-1);


  for (let i = 0; i < runs; i++) {

    let temp_result = [];

    for (let j = 0; j < 10; j++){
      const start = performance.now();

      for (let N = 1; N < Math.pow(10, i); N++) {
        let val = M[N * LINE_SIZE];
      }
      const end = performance.now();
      temp_result.push(end - start);
    }

    let med_result = findMedian(temp_result)
    console.log(Math.pow(10, i))
    console.log(med_result)

    result.push(med_result);
  }

  return result;
}

document.getElementById(
  "exercise1-values"
).innerText = `1 Cache Line: [${measureOneLine().join(", ")}]`;

document.getElementById(
  "exercise2-values"
).innerText = `N Cache Lines: [${measureNLines().join(", ")}]`;

console.log("Hello Pavel!")