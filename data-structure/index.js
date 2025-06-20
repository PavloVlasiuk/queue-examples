import { MicrotaskProcessor } from './microtask-processor.js';

async function main() {
  const processor = new MicrotaskProcessor();

  console.log('Queue Demonstration');

  processor.addTask(
    () => {
      console.log('Standart task executed (first task)');
      return 'OK';
    },
  );

  processor.addTask(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('Heavy async task executed (second task)');
      return 'DONE';
    },
  );

  processor.addTask(
    () => {
      const sum = Array.from({ length: 1000 }, (_, i) => i).reduce((a, b) => a + b, 0);
      console.log('Calculation executed (third task)');
      return `Sum: ${sum}`;
    },
  );

  processor.addTask(
    () => {
      console.log('Error task executed (fourth task)');
      throw new Error('Static error of the fourth task');
    },
  );

  processor.addTask(
    () => {
      console.log('Data processing task executed (fifth task)');
      const data = { users: 100, orders: 50 };
      return `Processed: ${JSON.stringify(data)}`;
    },
  );

  console.log('=== INITIAL STATISTICS ===');
  processor.showQueueState();
  console.log('==========================\n')


  setTimeout(() => {
    console.log('=== FINAL STATISTICS ===');
    processor.showQueueState();
    console.log('========================\n')

  }, 500);
}

main().catch(error => {
  console.error('Error in main function:', error);
});
