
function printArraySingleLine(T) {
  console.log(T.join(" "));
}

// Duration of your trace, in milliseconds
let TRACE_LENGTH;

// Array of length TRACE_LENGTH with your trace's values
let T;

// Value of performance.now() when you started recording your trace
let start;

const l3cacheSizeMB = 24;
const cacheSizeBytes = l3cacheSizeMB * 1024 * 1024; // Convert MB to bytes
const intSizeBytes = 4; // Assuming each integer occupies 4 bytes (32 bits)

// Number of addresses N to cover your entire last level cache
const N = cacheSizeBytes / (16 * intSizeBytes);

function record() {
  const num_intervals = 1000;
  // Interval length P in milliseconds
  const P = TRACE_LENGTH / num_intervals; // Assign an appropriate value based on your requirements

  // Create empty array for saving trace values
  // let T = [];
  const T = new Array(num_intervals).fill(-1);

  console.log(TRACE_LENGTH);

  // Initialize the buffer to traverse
  // const buffer = new Array(N).fill(-1);

  // Save start timestamp
  start = performance.now();

  let intervalEnd = start + P;
  let intervalIndex = 0;
  let accessCount = 0;
  let now = performance.now();
  //while(now - start < TRACE_LENGTH){
  for (let j = 0; j < num_intervals; j++) {

    intervalEnd = now + P;
    while(now <= intervalEnd){
      for (let i = 0; i < N; i++) {
        // let temp = buffer[i];
      }
      accessCount++;
      now = performance.now();
    }

    T[intervalIndex] = accessCount; 
    intervalIndex++;
    accessCount = 0;
  }


  console.log("T.length = ", T.length)
  printArraySingleLine(T);
  console.log("Minimum value:", Math.min(...T));
  console.log("Maximum value:", Math.max(...T));
  postMessage(JSON.stringify(T));
}

// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
  if (e.data.type === "start") {
    TRACE_LENGTH = e.data.trace_length;
    setTimeout(record, 0);
  }
};