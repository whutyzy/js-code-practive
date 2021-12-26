/* var Person = (function () {
    var instance
    function CreatePerson(name) {
        if (instance) {
            instance.name = name
            return instance
        }
        this.name = name
        return (instance = this)
    }
    CreatePerson.prototype.sayHi = function (params) {
        console.log(this.name + 'hi')
    }
    return CreatePerson
})() */

class Person {
    constructor(name) {
        if (Person.instance) {
            Person.instance.name = name
            return Person.instance
        }
        this.name = name
        return (Person.instance = this)
    }
    sayHi() {
        console.log(this.name + 'hi')
    }
}

const a = new Person('hello')
a.sayHi()
const b = new Person('hi')
b.sayHi()
