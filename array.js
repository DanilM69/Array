class ArrayList {
  constructor(...args) {
    this.pseudoArray = {};
    let i = 0;
    for (let arg of args) {
      this.pseudoArray[i] = arg;
      i++;
    };
    this.length = i;
  };

  getPseudoArray() {
    return this.pseudoArray;
  };

  getArray() {
    return Object.values(this.pseudoArray);
  };

  getlength() {
    return Math.max(...Object.keys(this.pseudoArray)) + 1;
  };

  getNewArray(arr) {
    return Object.values(arr);
  };

  push(...items) {
    let i = 0;
    for (let item of items) {
      this.pseudoArray[this.length + i] = item;
      i++
    };
    this.length += i; 
  };

  pop() {
    delete this.pseudoArray[Math.max(...Object.keys(this.pseudoArray))];
    this.length -= 1;
  };

  unshift(...items) {
    for (let item of items) {
      let key = this.length - 1;
      while (key != -1) {
        this.pseudoArray[key + 1] = this.pseudoArray[key];
        key -= 1;
      };
      this.length += 1;
    };
    let i = 0;
    for (let item of items) {
      this.pseudoArray[i] = item;
      i++;
    }
  };

  shift() {
    let key = 0;
    while (key != this.length - 1) {
      this.pseudoArray[key] = this.pseudoArray[key + 1];
      key += 1;
    };
    delete this.pseudoArray[this.length - 1];
    this.length -= 1;
  };

  splice(pos, deleteCount, ...items) {
    //Удаление
    for (let i = 0; i != deleteCount; i++){
      let key = pos + 1;
      while (key != this.length) {
          this.pseudoArray[key - 1] = this.pseudoArray[key];
          key += 1;
      };
      delete this.pseudoArray[this.length - 1];
      this.length -= 1;
    };

    //Добавление
    for (let item of items) {
      let key = this.length - 1;
      while (key != pos - 1) {
        this.pseudoArray[key + 1] = this.pseudoArray[key];
        key -= 1;
      };
      this.length += 1;
    };
    let i = pos;
    for (let item of items) {
      this.pseudoArray[i] = item;
      i++;
    };
    
  };

  slice(start, end) {
    if (start == undefined) {
      start = 0;
    }
    if (end == undefined) {
      end = this.length;
    }
    let newPseudoArray = {};
    let j = 0;
    for (let i = start; i != end; i++) {
      newPseudoArray[j] = this.pseudoArray[i];
      j++;
    };
    newPseudoArray.length = j;
    Object.defineProperty(newPseudoArray, "length", {
      enumerable: false,
    });
    return newPseudoArray;
  };

  concat(...items) {
    let newPseudoArray = {};
    Object.assign(newPseudoArray, this.pseudoArray);
    let i = this.length;
    for (let item of items) {
      if (typeof(item) == "object") {
        for (let it in item) {
          newPseudoArray[i] = item[it];
          i++;
        };
      } else {
        newPseudoArray[i] = item;
        i++;
      };
    };
    newPseudoArray.length = i;
    Object.defineProperty(newPseudoArray, "length", {
      enumerable: false,
    });
    return newPseudoArray;
  };

  indexOf(item, pos) {
    let i;
    for (i = pos; i != this.length; i++) {
      if (this.pseudoArray[i] == item) {
        return i;
      };
    };
    if (i == this.length) {
      return -1;
    }
  };

  includes(value) {
    let i;
    for (i = 0; i != this.length; i++) {
      if (this.pseudoArray[i] == value) {
        return true;
      };
    };
    if (i == this.length) {
      return false;
    }
  };

  find(func) {
    let i = 0;
    for (i = 0; i != this.length; i++) {
      if (func(this.pseudoArray[i])) {
        return this.pseudoArray[i];
      }
    };
    if (i == this.length) {
      return undefined;
    }
  };

  findIndex(func) {
    let i = 0;
    for (i = 0; i != this.length; i++) {
      if (func(this.pseudoArray[i])) {
        return i;
      }
    };
    if (i == this.length) {
      return -1;
    }
  };

  filter(func) {
    let newPseudoArray = {};
    let i = 0;
    let j = 0;
    for (i = 0; i != this.length; i++) {
      if (func(this.pseudoArray[i])) {
        newPseudoArray[j] = this.pseudoArray[i];
        j++;
      };
    };
    if (Math.max(...Object.keys(newPseudoArray)) >= 0) {
      return Object.values(newPseudoArray);
    } else{
      return undefined;
    };
  };

  forEach(func) {
    for (let i = 0; i != this.length; i++) {
      this.pseudoArray[i] = func(this.pseudoArray[i]);
    };
  };

  map(func) {
    let newPseudoArray = {};
    let i;
    for (i = 0; i != this.length; i++) {
      newPseudoArray[i] = func(this.pseudoArray[i]);
    };
    newPseudoArray.length = i;
    Object.defineProperty(newPseudoArray, "length", {
      enumerable: false,
    });
    return newPseudoArray;
  };

  reverse() {
    let i = 0;
    let j = this.length - 1;
    do {
      let save = this.pseudoArray[i];
      this.pseudoArray[i] = this.pseudoArray[j];
      this.pseudoArray[j] = save;
      i++;
      j--;
    } while ((i != j) && ((i-1) != j)); 
  };

}; 

let arr = new ArrayList(3, 6, 8, 1);
let arr1 = new ArrayList({name: 'vadim'}, {name: 'danil'})


arr.push(5, 6, 7);
arr.pop();
arr.unshift(1, 2, 3);
arr.shift();
arr.splice(2, 2, 10, 11);
console.log(arr.getNewArray(arr.slice(2, 4)));
console.log(arr.getNewArray(arr.concat(1, 2, [12, 13, 15])));
console.log(arr.indexOf(5, 0));
console.log(arr.includes(5));
console.log(arr.findIndex(i => i == 5));

console.log(arr1.map(obj=> {
  return {
    name: obj.name,
    age: 18,
  };
}));
arr.reverse();

console.log(arr.getArray());
console.log(arr.length);

arr.length = 205;
console.log(arr.length);

//legko