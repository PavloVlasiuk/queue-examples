import { PaymentQueue } from './queues/payment-queue.js';
import { PaymentCreator } from './payments/payment-creator.js';
import { PaymentProcessor } from './payments/payment-processor.js';

const main = () => {
  const queue = new PaymentQueue();

  new PaymentProcessor(queue);

  const creator = new PaymentCreator(queue);
  creator.create({
    id: 'BILL123',
    amount: 99.99,
    email: 'mq@example.com',
  });
}

main();
