# VUE3

## 1. Begining 

### 1.1 Basics

- pull on from cdn

Vue `createApp` and `mount` to page element 

`createApp` - create object for our application 

- add method `data` to return value

```js
    <div id="app">
        {{greeting}}
    </div>
    <script>
        Vue.createApp({
            data() {
                return {
                    greeting: "Ania S Hej! "
                };
            }
        }).mount('#app');
```

we can js properties :

```js
    <div id="app">
        {{greeting}} - ({{greeting.length}})
    </div>
```



`v-model` 

- bind value & listening change of value
- re - render page 



`mounted()` - fire automatically when component mount to the page 

```js
data() {},
        mounted()  {
                setTimeout(() => {
                    this.greeting = 'Changed'
                }, 3000)
            }
```

 

### 1.2 Attribute Binding & Event Handling

- we have button 

in case of `VUE` and attributes : 

- `v-bind:class` -in case of classes

  `v-bind` is shorthand to just `:`

```js
    <div id="app">
        <button :class="buttonClasses">Click button</button>
    </div>
    <script>
        Vue.createApp({
            data() {
                return {
                    buttonClasses: 'text-green'
                }
            }
        }).mount('#app');
```



handling click event : 

`v-on:click`

Vue option API not composition api 

- we need to create `methods` object where we create `toggle` method 

```html
<button :class="buttonClasses" v-on:click="toggle">Click button</button>
```



```js
data() {},
              methods: {
                toggle() {
                    this.buttonClasses = 'text-red';
                }
            }
..
```



state button - "on, active"

`v-on:click`  ~ `@click`

```html
<button :class="active ? 'text-red' : 'text-green'" @click="toggle">
    
</button>
```



- track state 

```js
        Vue.createApp({
            data() {
                return {
                    active:false
                }
            },
            methods: {
                toggle() {
                    this.active = ! this.active;
                }
            }
        }).mount('#app');
```



### 1.3 Lists conditionals and computed properties

```js
        let app = {
            data() {
                return {
                    assignments: [
                        {name: "Finish Project", complete: false},
                        {name: "Read Chapter 4", complete: false},
                        {name: "Make summary", complete: false},
                    ]
                }
            }
        }
        Vue.createApp(app).mount('#app');
```

usage of that : 

```html
            <li v-for="assignment in assignments">
                {{assignment.name}}
                <input type="checkbox" v-model="assignment.complete">
            </li>
```



computed properties :

first of all doing as js expression : 

```js
            
            <h2 class="font-bold mb-2">In progress</h2>
            <ul>
                <li v-for="assignment in assignments.filter(a => !a.complete)">
                    ...
<h2 class="font-bold mb-2">Completed</h2>
            <ul>
                <li v-for="assignment in assignments.filter(a => a.complete)">
```



there is a problem when we click complete it add key and mark next item 

- add id to assignments and use vue key prop 



```js
                  {name: "Finish Project", complete: false, id: 1},
                      
              ...
              
                              <li v-for="assignment in assignments.filter(a => !a.complete)" :key="assignment.id">
```



**conditional**

`v-show` toggle visiblity based on condition 

-> only show if we have completed assignments:

vue added to the dom 

 ```html
    <section v-show="assignments.filter(a => a.complete).length">
 ```

`v-if` will not add  to the dom 



**COMPUTED**

- methods that can be cached - > to avoid duplications

  > scoping in Vue. Vue is proxing variable-> so we do not need to care about scope

  ```js
              computed: {
                  inProgressAssignments() {
                      return this.assignments.filter(assignment => ! assignment.complete);
                  },
                  completedAssignments() {
                      return this.assignments.filter(assignment => assignment.complete);
                  }
              }
          }
  ```

  ```js
    <section v-show="completedAssignments.length">
              <h2 class="font-bold mb-2">Completed</h2>
              <ul>
                  <li v-for="assignment in completedAssignments" :key="assignment.id">
  ```

  

---



## 2. Vue Components

### 2.1 First Custom Vue Components





### 2.2 One Vue Component per file

### 2.3 Component Prop 