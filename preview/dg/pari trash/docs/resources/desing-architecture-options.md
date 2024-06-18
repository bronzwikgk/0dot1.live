# Design Approaches

### Object-Oriented CSS (OOCSS)
**Example**: Splitting structure from skin means you can define a `.button` structure and apply different skins like `.primary` or `.secondary`.

```css
.button { /* Structure */
  padding: 10px 20px;
  border-radius: 5px;
}

.primary { /* Skin */
  background-color: #007bff;
  color: white;
}

.secondary { /* Skin */
  background-color: #6c757d;
  color: white;
}
```



### Atomic Design
**Example**: Creating a small button (atom), which can be used in a form (molecule), which in turn is part of a sign-up section (organism).


```html
<!-- Atom -->
<button class="btn">Click me</button>

<!-- Molecule -->
<form class="form">
  <input type="text" />
  <button class="btn">Submit</button>
</form>

<!-- Organism -->
<div class="signup-section">
  <h2>Sign Up</h2>
  <form class="form">
    <input type="text" />
    <button class="btn">Register</button>
  </form>
</div>
```

### Functional (Utility-First) CSS
**Example**: Instead of a button with many styles, use utility classes like .bg-blue, .text-white, .px-4, and .py-2.

```html
<button class="bg-blue text-white px-4 py-2">Click me</button>
```

###  SMACSS (Scalable and Modular Architecture for CSS)
``Example``: Categorizing CSS rules: base, layout, module, state, and theme.


```css
/* Base */
body, input, button { /* ... */ }

/* Layout */
.l-header { /* ... */ }
.l-footer { /* ... */ }

/* Module */
.module-name { /* ... */ }

/* State */
.is-active { /* ... */ }

/* Theme */
.theme-dark { /* ... */ }

```

### BEM (Block Element Modifier)
``Example``: Naming convention where .block__element--modifier represents a part of a block that performs a certain function.

```css
Copy code
/* Block component */
.btn { /* ... */ }

/* Element that depends on the block */
.btn__icon { /* ... */ }

/* Modifier that changes the style of the block */
.btn--primary { /* ... */ }
```

### ITCSS (Inverted Triangle CSS)
``Example``: Stylesheets are organized with the least specific selectors at the top and the most specific at the bottom.

```css

/* Settings, Tools, Generic, Elements, Objects, Components, Utilities */
:root { /* Settings: colors, fonts, etc. */ }
*, *:before, *:after { /* Generic: reset/normalize */ }
h1, h2, h3, p { /* Elements: styling for pure HTML elements */ }
.o-layout-grid { /* Objects: design patterns */ }
.c-button { /* Components: designed components */ }
.u-hidden { /* Utilities: helper classes with high specificity */ }
```

### Component-Based Design
Example: Design components like .dropdown that are reusable and can stand alone or be part of larger sections.

```html
<div class="dropdown">
  <button class="dropdown-toggle">Dropdown</button>
  <div class="dropdown-menu">
    <a href="#">Action</a>
    <a href="#">Another action</a>
    <a href="#">Something else here</a>
  </div>
</div>
```