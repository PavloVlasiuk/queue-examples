# Queue Examples

There is a demonstration of using queue as data structure and message queue in this repository.

## 1. Queue as a Data Structure

Located in `/data-structure`, this example shows a basic queue implementation and its usage in processing microtasks.

### Components:
- `Queue` - Basic queue data structure with standard operations (enqueue, dequeue)
- `MicrotaskProcessor` - Simulates part of Node.js event loop for handling microtasks

## 2. Message Queue Implementation

Located in `/message-queue`, this example demonstrates a persistent message queue for handling payment processing.

### Components:
- `PersistentQueue` - Queue with retry mechanism and acknowledgments
- `PaymentQueue` - Specialized queue for payment processing
- `PaymentCreator` - Creates and enqueues payment tasks
- `PaymentProcessor` - Processes payments with error handling and email notifications
- Features:
  - Retry mechanism with configurable limits
  - Acknowledgment system (ack/nack)
  - Simulated service downtime handling
  - Error handling and recovery

## Running Examples

Each example can be run independently:

```bash
# Run data structure queue example
node data-structure/index.js

# Run message queue example
node message-queue/index.js
```