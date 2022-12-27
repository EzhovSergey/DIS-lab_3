import { Controller } from './Controller.js';

const controller = new Controller(1, 5, 9)
controller.initialize([[5, 8], [2, 4], [3, 5], [1, 2], [7, 8], [7, 6], [7, 3], [3, 8], [4, 6]])
controller.optimize()
controller.run()
