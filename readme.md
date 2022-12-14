# VUE3

## 1. Begining 

### 1.1 Basics
To play with of course we can use npm but we just basically 
- pull on from cdn
`<script src="https://unpkg.com/vue@3"></script>`

Vue 2 methods `createApp` and `mount` to place element on page

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

steps: 
- import tailwind to play 
- add markup for completed and incompleted ones 


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

component like with blade - everything could be a component 

- create custom view component 

wile is processing should be deactivated : 

```
:disabled="processing"
```

```js
    let app = {
            components: {
                'app-button': {
                    template: `
                        <button 
                            class="bg-gray-200 hover:bg-gray-400 border rounded px-5 py-2"
                            :disabled="processing">
                            <slot />
                        </button>
                    `,
                    data() {
                        return {
                            processing: true
                        };
                    }
```



### 2.2 One Vue Component per file

components/AppButton.js

create JS module to export 

```js
export default {
    template: `
        <button class="bg-gray-200 hover:bg-gray-400 border rounded px-5 py-2 disabled:cursor-not-allowed" :disabled="processing">
            <slot />
        </button>
    `,

    data() {
        return {
            processing: true
        };
    }
}
```

then import inside script that is module enabled !

```js
   <script type="module">
        import AppButton from './components/AppButton.js';
        let app = {
            components: {
                'app-button': AppButton
            }
        }
```



### 2.3 Component Props

create main App component file : 

```js
import AppButton from './AppButton.js';
export default {
    components: {
        'app-button': AppButton
    }
}
```

```js
    <script type="module">
        import App from "./components/App.js";
        Vue.createApp(App).mount('#app');
    </script>
```



-  how pass data from outside into inside 

  in our App Button component set properties

  

```js
export default {
    template: `
    <button 
    :class="{
        'border rounded px-5 py-2 disabled:cursor-not-allowed': true,
        'bg-blue-600 hover:bg-blue-700': type === 'primary',
        'bg-purple-200 hover:bg-purple-400': type === 'secondary',
        'bg-gray-200 hover:bg-gray-400': type === 'muted',
        'is-loading': processing
    }" 
    :disabled="processing">
    <slot />
    </button>
`,


props: {
    type: {
        type: String,
        default: 'primary'
    },

    processing: {
        type: Boolean,
        default: false
    }
}

}
```

### 2.4 Brining All Together
we have 2 assignment lists 
they consist of single assignment
so create 3 components : 
- Assignment for list element
- AssignmnetList - for ul
- Assignments for wrapper 
 

## 3. Event Handling
### 3.1 Handle Form Submission
- listening when form is submitted 
- page refreshed - we want to prevent default action 
therefore we call
`@submit.prevent="add"`

### 3.2 Parent-child state communication
we have form component and we want to communicate with parent one 
- pass as prop  - but one thing that is weird that we will have access to all assignments all the time

Parent is passing properties to the child 
Child communicate back by emitting back to event 
`$emit(event, data)`

submit - 
Component fire an event  `add` 

## 4. Beyond Basics
### 4.1 Playing aroundz
- show total number of assignments  -> make dynamic
```js
  <span>({{assignments.length }})</span>
```
### 4.2 Component Responsibility
-- thinking like "should this component should be responsible for that" 
component might be responsible with so many things 

- create component for tags
    - take template
    - create computed property for generating tags 
    -> pass initial Tags in `AssignmentList` 

    = current tag - communicate between AssignmentList and AssignmentTags
     on Button `@click="$emit()` we pass : 
        - change event
        - tag that was clicked 
    inside AssignmentList we listen for `@change` of current tag     

        - pass as prop currentTag for selection : 


### 4.3 A deeper look at V-Model
- we can apply to input and everything is async
v-model is 
    - setting value of input 
    - listening for input 

if we would like to do by hand  - long form : 
```js
    <div id="app">
        <input type="text" :value="name" @input="name = $event.target.value">
    </div>
    <script type="module">
        
        Vue.createApp({
            data() {
                return {
                    name: ''
                };
            }
        }).mount('#app');
```
similar situation is with our `AssignmentTags`

```js
   <assignment-tags 
                :initial-tags="assignments.map(a => a.tag)"
                :current-tag="currentTag"
                @change="currentTag = $event" />

```
in our list add `v-model` :
```js
    <assignment-tags 
        v-model="currentTag"
        :initial-tags="assignments.map(a => a.tag)"
    />
```

```js
    <button
        @click="$emit('update:modelValue', tag)"
        v-for="tag in tags" 
        class="border rounded px-1 py-px text-xs"
        :class="{
            'border-blue-500 text-blue-500': tag === modelValue 
        }"
    >{{ tag }}</button> 
```
and remember about props
```js
    props: {    
        initialTags: Array,
        modelValue: String
    },
```
we can pass after column and we will not need to change Tags
```js
v-model:currentTag
```
### 4.4 Lifecycle hooks / fake API and AJAX 
-> set Fake Api
```bash
npm install json-server --save-dev
```
create source : db.json

`npx json-server db.json -p 3001`

**Lifecycle**
 component render - mounted - unmounted goes after lifecycle methods 

 Promise - we will get eventually 
 - `created()` method of Assignments

 ### 4.5 Flexible components with Slots 
 npm script to run 2 commands 
 add slot if we want to put after from outside 
 - use flags
`canToggle: {type: Boolean, default: false}`
