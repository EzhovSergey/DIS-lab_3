import { Elevator } from './Elevator.js'

export class Controller {
  constructor(start_position1, start_position2, floor_count) {
    this.floor_count = floor_count
    this.elevator1 = new Elevator(start_position1, 1)
    this.elevator2 = new Elevator(start_position2, 2)
    this.stack = []
    this.stack_elevator1 = []
    this.stack_elevator2 = []
    this.current_command = null
    this.next_command = null
  }

  error(command) {
    if (command[0] > this.floor_count
      || command[1] > this.floor_count
      || command[0] < 1
      || command[1] < 1) {
      console.log("Ошибка номера этажа не существует")
      return true
    }
    return false
  }

  initialize(stack) { this.stack = stack }

  check_way(command) {
    return command[0] < command[1] ? "up" : "down"
  }

  return_empty() {
    if (!this.stack_elevator1.length && !this.stack_elevator2.length) { return "all" }
    if (!this.stack_elevator1.length) { return 1 }
    if (!this.stack_elevator2.length) { return 2 }
    return "none"
  }

  change_nearest(command) {
    if (this.stack_elevator1.length && this.stack_elevator2.length) {
      if (Math.abs(this.stack_elevator1[this.stack_elevator1.length - 1] - command[0])
        <= Math.abs(this.stack_elevator2[this.stack_elevator2.length - 1] - command[0])) { return 1 }
      return 2
    }
    else {
      if (Math.abs(this.elevator1.current_position - command[0])
        <= Math.abs(this.elevator2.current_position - command[0])) { return 1 }
      return 2
    }
  }

  passenger(command, number) {
    const currentElevator = this[`stack_elevator${number}`];
    if (this.check_way(command)
      == this.check_way((currentElevator[currentElevator.length - 2], currentElevator[currentElevator.length - 1]))) {
      if (command[0] >= currentElevator[currentElevator.length - 2]
        && command[0] <= currentElevator[currentElevator.length - 1]
        || command[0] <= currentElevator[currentElevator.length - 2]
        && command[0] >= currentElevator[currentElevator.length - 1]) {
        currentElevator.splice(currentElevator.length - 1, 0, command[0])
        currentElevator.push(command[1])
        this[`stack_elevator${number}`] = currentElevator
        return true
      }
    }
    return false
  }

  cleaning(stack) {
    for (let index = 0; index < stack.length; index++) {
      if (index < stack.length - 1 && stack[index] === stack[index + 1]) {
        stack.splice(index, 1)
      }
    }
  }

  optimize() {
    while (this.stack.length) {
      this.current_command = this.stack.shift()
      if (this.error(this.current_command)) { return; }

      switch (this.return_empty()) {
        case "all": {
          this[`stack_elevator${this.change_nearest(this.current_command)}`].push(...this.current_command)
          break;
        };
        case 1: {
          if (!this.passenger(this.current_command, 2)) {
            this.stack_elevator1.push(...this.current_command)
          }
          break
        }
        case 2: {
          if (!this.passenger(this.current_command, 1)) {
            this.stack_elevator2.push(...this.current_command)
          }
          break;
        }
        case 'none': {
          if (!this.passenger(this.current_command, 2) && !this.passenger(this.current_command, 1)) {
            this[`stack_elevator${this.change_nearest(this.current_command)}`].push(...this.current_command)
          }
        }
      }
      this.cleaning(this.stack_elevator1)
      this.cleaning(this.stack_elevator2)
    }
    console.log(this.stack_elevator1)
    console.log(this.stack_elevator2)
  }

  run() {
    this.elevator1.run(this.stack_elevator1)
    this.elevator2.run(this.stack_elevator2)
  }
}
