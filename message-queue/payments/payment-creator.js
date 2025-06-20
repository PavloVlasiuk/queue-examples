export class PaymentCreator {
  constructor(queue) {
    this.queue = queue;
  }

  create(payment) {
    console.log('Payment created:', payment);
    this.queue.push(payment);
  }
}
