import { Queue } from './queue.js';

// Simulation of the part of nodejs event loop that handles microtasks
export class MicrotaskProcessor {
  constructor() {
    this.name = this.constructor.name;
    this.taskQueue = new Queue(`${this.name}-Queue`);
    this.isProcessing = false;
    this.processedCount = 0;
    this.stats = {
      totalAdded: 0,
      totalProcessed: 0,
      errors: 0,
      startTime: null
    };
  }

  addTask(taskFunction) {
    const task = {
      id: Date.now() + Math.random(),
      name: `Task-${this.stats.totalAdded + 1}`,
      fn: taskFunction,
      addedAt: new Date(),
    };

    this.taskQueue.enqueue(task);
    this.stats.totalAdded++;

    console.log(`[${this.name}] task added: "${task.name}" (ID: ${task.id})\n`);

    this.scheduleMicrotask();

    return task.id;
  }

  scheduleMicrotask() {
    if (this.isProcessing) return;

    Promise.resolve().then(() => {
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing) return;

    this.isProcessing = true;
    this.stats.startTime = this.stats.startTime || new Date();

    console.log(`[${this.name}] Start processing queue of ${this.taskQueue.size()} tasks\n`);

    while (!this.taskQueue.isEmpty()) {
      const task = this.taskQueue.dequeue();
      await this.processTask(task);
    }

    this.isProcessing = false;
    console.log(`[${this.name}] Queue processed. Total tasks: ${this.stats.totalProcessed}\n`);
  }

  async processTask(task) {
    try {
      const result = await task.fn();

      this.stats.totalProcessed++;
      console.log(`[${this.name}] Task processed: "${task.name}"${result ? ` -> ${result}` : ''}\n`);

    } catch (error) {
      console.error(`[${this.name}] Error in "${task.name}":`, error.message, '\n');
      this.stats.errors++;
    }
  }

  getStats() {
    const now = new Date();
    const duration = this.stats.startTime ? now - this.stats.startTime : 0;

    return {
      ...this.stats,
      queueSize: this.taskQueue.size(),
      isProcessing: this.isProcessing,
      duration: Math.round(duration),
      throughput: duration > 0 ? (this.stats.totalProcessed / (duration / 1000)).toFixed(2) : 0
    };
  }

  showQueueState() {
    console.log(`[${this.name}] Queue state:`, this.taskQueue.toString());
    console.log(`[${this.name}] Statistics:`, this.getStats());
  }
}