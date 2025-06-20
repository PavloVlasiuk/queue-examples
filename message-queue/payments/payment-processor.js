export class PaymentProcessor {
  downtime = 7000;
  isActive = false;

  constructor(queue) {
    this.queue = queue;
    this.start();
  }

  start() {
    this.queue.onMessage(this.process.bind(this));
    setTimeout(() => {
      console.log('PAYMENT PROCESSOR IS NOW RUNNING');

      this.isActive = true;
    }, this.downtime);
  }

  async process(payment, ack, nack) {
    {
      console.log('Processing payment:', payment);

      try {
        await this.sendEmail(payment);
        ack();
      } catch (err) {
        console.error(`Error: ${err.message}`);
        nack();
      }
    }
  }

  async sendEmail(payment) {
    if (!this.isActive) {
      return Promise.reject(new Error('PAYMENT PROCESSOR IS NOT ACTIVE'));
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.3;
        success
          ? resolve(console.log(`Email sent to ${payment.email}`))
          : reject(new Error('Email service failed'));
      }, 1000);
    });
  }
}

