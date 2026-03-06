# Cherri Syntax Reference

## Defines (Shortcut Metadata)

```cherri
#define name My Shortcut
#define color red
#define glyph heart
#define version 18.4
#define inputs text, image
#define outputs file
```

Colors: `red`, `darkorange`, `orange`, `yellow`, `green`, `teal`, `lightblue`, `blue`, `darkblue`, `violet`, `purple`, `pink`, `taupe`, `gray`, `darkgray`

Glyphs: Use `cherri --glyph=search` to find icons.

## Variables

```cherri
@name = "World"                    // Variable assignment
const greeting = "Hello"           // Constant
@message = "{greeting}, {name}!"   // String interpolation
```

Global variables: `Ask`, `Clipboard`, `CurrentDate`, `ShortcutInput`, `RepeatIndex`, `RepeatItem`

## Essential Actions

```cherri
// Dialogs
alert("Message", "Title")          // Alert with title
alert("Message")                   // Alert without title
show("Text to display")            // Show output

// User input
@text = prompt("Enter text:")      // Text input
@num = askNumber("Enter number:")  // Number input

// Control
nothing()                          // Clear output
stop()                             // Stop shortcut
exit()                             // Same as stop
comment("Note")                    // Add comment
```

## Control Flow

```cherri
// If statement
if condition {
    // code
} else {
    // code
}

// Repeat n times
repeat 5 {
    alert("{RepeatIndex}")
}

// Repeat with named index
repeat i for 5 {
    alert("Index: {i}")
}

// For each in list
for item in list {
    alert(item)
}
```

## Menus

**IMPORTANT:** Use colon `:` after item name, NOT curly braces!

```cherri
menu "Choose an option:" {
    item "Option 1":
        alert("You chose 1")
    item "Option 2":
        alert("You chose 2")
        show("More actions here")
}
```

## Lists

```cherri
#include 'actions/scripting'

@items = list("apple", "banana", "cherry")
@chosen = chooseFromList(items, "Pick one")

repeatEach fruit in items {
    alert(fruit)
}
```

## Custom Actions (Functions)

```cherri
action greet(text name) {
    alert("Hello, {name}!")
}

greet("World")
```

## Includes

```cherri
#include "other_file.cherri"
#include 'actions/scripting'   // Built-in action libraries
```
