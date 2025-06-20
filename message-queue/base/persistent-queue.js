export class PersistentQueue {
  constructor({ retryLimit = 10, retryDelay = 2000 } = {}) {
    this.queue = [];
    this.listener = null;
    this.processing = false;
    this.retryLimit = retryLimit;
    this.retryDelay = retryDelay;
  }

  push(job) {
    this.queue.push({ job, attempts: 0, ack: false });
    this.dispatch();
  }

  onMessage(listener) {
    this.listener = listener;
    this.dispatch();
  }

  dispatch() {
    if (!this.listener || this.processing) return;

    const item = this.queue.find(msg => !msg.ack && msg.attempts < this.retryLimit);
    if (!item) return;

    this.processing = true;

    const ack = () => {
      item.ack = true;
      this.queue = this.queue.filter(msg => !msg.ack);
      this.processing = false;
      this.dispatch();
    };

    const nack = () => {
      item.attempts++;
      this.processing = false;
      console.log(`Retry #${item.attempts} scheduled in ${this.retryDelay / 1000}s...`);
      setTimeout(() => this.dispatch(), this.retryDelay);
    };

    try {
      this.listener(item.job, ack, nack);
    } catch (err) {
      nack();
    }
  }
}