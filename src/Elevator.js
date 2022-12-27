export class Elevator {
  constructor(start_position, number) {
    this.number = number
    this.current_position = start_position
    this.stack_positions = null
    this.next_position = null
    this.error = false
    this.stopped = false
  }

  openDoor() {
    console.log(`Лифт ${this.number} открыл двери на ${this.current_position} этаже`);
  }

  closeDoor() {
    console.log(`Лифт ${this.number} закрыл двери на ${this.current_position} этаже`);
  }

  up() {
    this.current_position += 1
  }

  down() {
    this.current_position -= 1
  }

  initialState() {
    this.next_position = this.stack_positions.shift();
  }

  stop() {
    this.openDoor();
    this.closeDoor();
  }

  goUp() {
    let count = 0;
    while (this.current_position < this.next_position) { this.up(); count++; }
    console.log(`Лифт ${this.number} поднялся на ${count} этаж(a, ей)`)
    this.stop()
  }

  goDown() {
    let count = 0;
    while (this.current_position > this.next_position) { this.down(); count++; }
    console.log(`Лифт ${this.number} опустился на ${count} этаж(a, ей)`)
    this.stop()
  }


  run(stack_positions) {
    this.stack_positions = stack_positions;
    while (this.stack_positions.length) {
      this.initialState();
      if (this.current_position == this.next_position) {
        this.stop();
        continue;
      }
      if (this.current_position < this.next_position) {
        this.goUp();
        continue;
      }
      this.goDown();
    }
    console.log(`Лифт ${this.number} завершил работу`);
  }
}
