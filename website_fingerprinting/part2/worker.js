// Duration of your trace, in milliseconds
let TRACE_LENGTH;
 
let P = 3; //
let L3Size = 24 * 1024 * 1024
const LINE_SIZE = 16;
let N = L3Size / (8 * LINE_SIZE); // L3 = 8MB. 8MB/16B = N lines
 
// Array of length TRACE_LENGTH with your trace's values
let T;
 
// Value of performance.now() when you started recording your trace
let start;
 
function record() {
  // Create empty array for saving trace values
  T = new Array(TRACE_LENGTH);
 
  // Fill array with -1 so we can be sure memory is allocated
  T.fill(-1, 0, T.length);
 
  // Save start timestamp
  start = performance.now();
 
  // TODO (Exercise 2-2): Record data for TRACE_LENGTH seconds and save values to T.
 
  let itr = 0, sampels=0;
  let time_t = performance.now();
  let start_p,time_p;
 
  const M = new Array(N*LINE_SIZE).fill(-1);
  while(T[TRACE_LENGTH-1]==-1){//time_t-start < TRACE_LENGTH){ // time of sampeling
 
    sampels = 0;
 
    start_p=performance.now();
    time_p=start_p;
    while(time_p-start_p < P){
 
      sampleNLines(M);
      time_p=performance.now();
 
      sampels+=1;
 
    }
 
    time_t= performance.now();
 
    console.log(`--> itr ${itr}: samples: ${sampels}`);
 
    T[itr]=sampels;
    itr+=1;
 
  }
 
 
 
  // Once done recording, send result to main thread
  postMessage(JSON.stringify(T));
}
 
 
function sampleNLines(M){
  let M_i=0;
  for(let line=1; line<N; line++){
    let val = M[M_i+(line-1)*LINE_SIZE];
 
    M_i+=1;
    if(M_i >= LINE_SIZE){
      M_i=0;
    }
 
  }
 
}
 
 
 
 
 
 
 
 
 
 
 
 
// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
  if (e.data.type === "start") {
    TRACE_LENGTH = e.data.trace_length;
    setTimeout(record, 0);
  }
};
 