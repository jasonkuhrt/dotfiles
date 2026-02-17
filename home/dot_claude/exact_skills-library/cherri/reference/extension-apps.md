# Known Extension App Patterns

## Using Third-Party Actions in Cherri

For actions not built into Cherri, use raw action syntax:

```cherri
// Raw action with identifier from analyze-shortcuts-actions.fish
rawAction("com.alexhay.ToolboxProForShortcuts.IsDarkModeOnIntent", {
    "placeholder": "unused"  // rawAction requires at least one parameter
})
```

**Important:** Cherri's `rawAction` crashes with empty `{}`. Always include at least one placeholder parameter.

**Discovering parameters:** Use the analysis script to query the ToolKit database:

```bash
# Show all parameters for an action
./analyze-shortcuts-actions.fish params GlobalVariablesIntent

# Find actions for an app
./analyze-shortcuts-actions.fish actions sindre
```

The ToolKit database at `~/Library/Shortcuts/ToolKit/` contains all parameter definitions.

## Toolbox Pro

Action prefix: `com.alexhay.ToolboxProForShortcuts`

Key actions:
- `GlobalVariablesIntent` - Get/set/check global variables
- `CheckGVIntent` - Check if global variable exists
- `IsDarkModeOnIntent` - Check dark mode (verified)
- `DeviceDetailsIntent` - Device info
- `GetTextFromImageIntent` - OCR
- `CreateMenuIntent` / `SmartMenuIntent` - Custom menus

```cherri
// VERIFIED: Check if dark mode is on
rawAction("com.alexhay.ToolboxProForShortcuts.IsDarkModeOnIntent", {
    "ShowWhenRun": true
})

// VERIFIED: Global Variables (use `./analyze-shortcuts-actions.fish params GlobalVariablesIntent` for all params)
// Set a variable
rawAction("com.alexhay.ToolboxProForShortcuts.GlobalVariablesIntent", {
    "mode": "set",
    "setVariableKey": "myVariable",
    "setVariableValue": "myValue"
})

// Get a variable
rawAction("com.alexhay.ToolboxProForShortcuts.GlobalVariablesIntent", {
    "mode": "get",
    "getVariableKey": "myVariable"
})

// Delete a variable
rawAction("com.alexhay.ToolboxProForShortcuts.GlobalVariablesIntent", {
    "mode": "delete",
    "deleteVariableKey": "myVariable"
})
```

## Persistent Config (JSON in iCloud)

REQUIRED SUB-SKILL: apple-shortcuts -- for persistent config (JSON in iCloud), CLI access, and iCloud Drive integration.

## Menu Box (installed)

Action prefix: `dev.alexhay.MenuBox`

Beautiful custom menus with SF Symbols, colors, and hidden data fields. Fully CLI-driven - no GUI needed.

**Quick Menu (inline, no pre-config):**
```cherri
// Create menu from marked-up text
// Format: "Title | symbol" per line
rawAction("dev.alexhay.MenuBox.QuickMenuIntent", {
    "text": "Settings | gear\nProfile | person.circle\nHelp | questionmark.circle"
})
```

**Custom Menu Items (full control):**
```cherri
// Create styled menu item with SF Symbol
rawAction("dev.alexhay.MenuBox.CreateSymbolItemIntent", {
    "title": "Settings",
    "subtitle": "Configure options",
    "symbol": "gear",
    "symbolColourHex": "#FFFFFF",
    "bgColourHex": "#007AFF",
    "mask": "circle"
})

// Create menu item from emoji
rawAction("dev.alexhay.MenuBox.CreateEmojiItemIntent", {
    "title": "Coffee Break",
    "emoji": "coffee"
})

// Create menu item from image
rawAction("dev.alexhay.MenuBox.CreateImageItemIntent", {
    "title": "Photo",
    "image": imageVariable
})
```

**Hidden Data Fields:** Each menu item supports `field1` through `field4` for storing data that isn't visible but accessible when item is selected.

**Menu Sets:** Save menus to reuse across shortcuts:
```cherri
rawAction("dev.alexhay.MenuBox.CreateMenuSetIntent", {
    "menuItems": menuItemsVariable,
    "setType": "new",
    "setName": "My Project Menu"
})

// Later, choose from saved set
rawAction("dev.alexhay.MenuBox.ChooseMenuSetIntent", {
    "menuSet": "My Project Menu"
})
```

Run `./analyze-shortcuts-actions.fish params CreateSymbolItemIntent` for all styling options (weights, scales, masks).

## FocusCuts (installed, macOS only)

Action prefix: `dev.snailedit.FocusCuts`

FocusCuts provides Focus Mode awareness with 3 custom actions + a status bar menu.

**Get current Focus Mode:**
```cherri
// Returns the currently active Focus Mode name (or empty if none)
rawAction("dev.snailedit.FocusCuts.GetCurrentFocusModeIntent", {
    "ShowWhenRun": false
})
```

**Check if specific Focus is active:**
```cherri
rawAction("dev.snailedit.FocusCuts.IsFocusModeActiveIntent", {
    "focusMode": "Work"  // returns true/false
})
```

**List all Focus Modes:**
```cherri
rawAction("dev.snailedit.FocusCuts.ListFocusModesIntent", {
    "ShowWhenRun": false
})
```

**Focus-aware conditional logic pattern:**
```cherri
// Get current focus, then branch
rawAction("dev.snailedit.FocusCuts.GetCurrentFocusModeIntent", {
    "ShowWhenRun": false
})
@focusMode = ShortcutInput

if focusMode == "Work" {
    alert("Loading work projects...", "Work Mode")
} else if focusMode == "Personal" {
    alert("Loading personal projects...", "Personal Mode")
} else {
    alert("No Focus Mode active", "Default")
}
```

**FocusCuts menu bar:** Also provides a status bar menu showing shortcuts relevant to your current Focus Mode (configure in app).

## Logger (installed)

Action prefix: `com.alexhay.Console`

Real-time debugging console with log levels, tags, and iCloud sync. Much better than `alert()` spam.

**Basic logging:**
```cherri
// Log a message with category (info/success/warning/error)
rawAction("com.alexhay.Console.LogMessageIntent", {
    "title": "API Response",
    "messages": "Got 200 OK",
    "category": "success",
    "tag": "api"
})

// Log with error fallback if empty
rawAction("com.alexhay.Console.LogMessageIntent", {
    "title": "User Input",
    "messages": userInput,
    "errorIfEmpty": true,
    "errorMessage": "No input provided!"
})
```

**Session control:**
```cherri
// Start a logging session
rawAction("com.alexhay.Console.StartLoggingIntent", {
    "mode": "start"
})

// ... your shortcut logic ...

// Stop logging
rawAction("com.alexhay.Console.StartLoggingIntent", {
    "mode": "stop"
})
```

**Log files/items:**
```cherri
rawAction("com.alexhay.Console.LogItemsIntent", {
    "items": fileVariable,
    "title": "Downloaded File",
    "message": "Processing complete"
})
```

**Conditional logging:**
```cherri
// Log different messages based on condition
rawAction("com.alexhay.Console.LogConditionalMessageIntent", {
    "condition": "equals",
    "sourceValue": statusCode,
    "query": "200",
    "trueTitle": "Success",
    "trueMessage": "Request completed",
    "trueCategory": "success",
    "falseTitle": "Failed",
    "falseMessage": "Request failed with status",
    "falseCategory": "error",
    "tag": "api"
})
```

**Export logs:**
```cherri
// Output all logs as markdown
rawAction("com.alexhay.Console.OutputMessagesIntent", {
    "outputMode": "markdown"
})

// Clear console after export
rawAction("com.alexhay.Console.ClearMessagesIntent", {
    "ShowWhenRun": false
})
```

**System diagnostics:**
```cherri
// Log device details (model, OS, battery, etc.)
rawAction("com.alexhay.Console.LogDeviceDetailsIntent", {
    "tag": "system"
})

// Log internet connection info
rawAction("com.alexhay.Console.LogInternetConnectionIntent", {
    "tag": "network"
})
```

**Debugging workflow:**
1. Add `StartLoggingIntent` at shortcut start
2. Sprinkle `LogMessageIntent` calls at key points
3. Use tags to filter (e.g., "api", "ui", "data")
4. Use categories for severity (info/success/warning/error)
5. Export with `OutputMessagesIntent` when done
6. Logs sync via iCloud - debug iOS shortcuts from Mac

## Actions by Sindre Sorhus (installed)

Action prefix: `com.sindresorhus.Actions`

199 utility actions. Key ones:

```cherri
// Generate UUID
rawAction("com.sindresorhus.Actions.GenerateUUIDIntent", {
    "placeholder": "unused"
})

// Format duration
rawAction("com.sindresorhus.Actions.FormatDurationIntent", {
    "placeholder": "unused"
})

// Debug (shows variables in console)
rawAction("com.sindresorhus.Actions.DebugIntent", {
    "placeholder": "unused"
})
```

Run `./analyze-shortcuts-actions.fish actions sindre` for full list (199 actions).

## Charty (installed)

Action prefix: `com.brogrammers.charty`

Generate charts and graphs from Shortcuts. 24 actions for 7 chart types: bar, line, pie, donut, scatter, area, rings.

**Create a chart:**
```cherri
// Create new chart (returns chart ID)
rawAction("com.brogrammers.charty.NewChartIntent", {
    "title": "Monthly Stats",
    "automaticId": true
})
@chartId = ShortcutInput
```

**Add data series:**
```cherri
// Add bar series
rawAction("com.brogrammers.charty.AddSeriesToChartIntent", {
    "chartId": "{chartId}",
    "label": "Revenue",
    "type": "bar",
    "barXValues": ["Jan", "Feb", "Mar"],
    "barYValues": [100, 150, 200]
})

// Add line series
rawAction("com.brogrammers.charty.AddSeriesToChartIntent", {
    "chartId": "{chartId}",
    "label": "Trend",
    "type": "line",
    "lineXValues": [1, 2, 3],
    "lineYValues": [100, 150, 200]
})

// Add pie/donut series
rawAction("com.brogrammers.charty.AddSeriesToChartIntent", {
    "chartId": "{chartId}",
    "label": "Distribution",
    "type": "pie",
    "pieLabels": ["A", "B", "C"],
    "pieValues": [30, 50, 20]
})
```

**Export chart:**
```cherri
rawAction("com.brogrammers.charty.ExportChartAsImageIntent", {
    "chartId": "{chartId}"
})
```

**Other actions:** `StyleChartIntent`, `StyleAxisIntent`, `AddAverageIntent`, `FilterDataIntent`, `GroupDataIntent`, `AddSeriesFromCSVIntent`

Run `./analyze-shortcuts-actions.fish actions charty` for full list (24 actions).
