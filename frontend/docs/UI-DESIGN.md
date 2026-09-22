### UI Implementation Rule

Do not invent new visual patterns when an existing component
or design rule can be reused.

If a required UI pattern is not defined in this document,
prefer the existing PennyWise design language rather than
introducing a new style.

# PennyWise UI Design System

## 1. Design Philosophy

PennyWise should feel:

- Clean
- Calm
- Professional
- Trustworthy
- Modern
- Simple

The interface should prioritize financial information,
clarity, and user actions over visual decoration.

### Design Principles

1. Clarity over decoration
   Financial information should be easy to scan and understand.

2. Consistency over novelty
   Reuse the same visual patterns throughout the application.

3. Whitespace over clutter
   Give important information enough breathing room.

4. Color with meaning
   Colors should communicate state or meaning rather than
   being used purely for decoration.

5. Simple interactions
   Common actions such as adding a transaction, switching
   Spaces, and viewing accounts should require minimal effort.

6. Professional, not corporate
   The interface should feel polished without looking like
   enterprise accounting software.

7. No unnecessary visual noise
   Avoid excessive gradients, shadows, animations,
   decorative elements, and emojis.

### Overall Visual Direction

Style:
Clean + Minimal + Friendly

The UI should resemble a modern personal finance SaaS
application rather than a traditional accounting system.

The design should remain approachable for users who are
not financially or technically experienced.

## 2. Color System

PennyWise uses a restrained color palette.

Green is the primary brand color and represents positive
financial states such as income and healthy progress.

Semantic colors should be used consistently and sparingly.

### Brand / Primary

Primary:
#16A34A

Primary Hover:
#15803D

Primary Light:
#DCFCE7

### Neutral

Background:
#F8FAF9

Surface:
#FFFFFF

Border:
#E5E7EB

Text:
#17201B

Muted Text:
#6B746D

### Semantic Colors

Income:
#16A34A

Expense:
#DC2626

Transfer:
#2563EB

Warning:
#D97706

### Color Usage Rules

- Use Primary for primary actions and important positive states.
- Use Primary Hover for hovered/active primary controls.
- Use Primary Light for subtle backgrounds, selected states,
  and lightweight highlights.
- Use Expense only for expense-related information and
  destructive actions.
- Use Income for income-related information.
- Use Transfer for transfer-related information.
- Use Warning for warnings and attention-required states.
- Use Neutral colors for the majority of the interface.
- Do not introduce additional colors without a clear reason.
- Do not use gradients.
- Do not use color purely for decoration when it could create
  confusion with financial meaning.
- Do not rely on color alone to communicate important information.

## 3. Typography

### Font Family

Primary font:
Inter

Use Inter throughout the application.

Do not introduce additional fonts unless explicitly requested.

### Font Weights

Regular:
400

Medium:
500

Semibold:
600

Bold:
700

Prefer 400–600 for normal UI.
Use 700 sparingly for emphasis.

### Type Scale

Page Title:

- 28px
- 600
- Used for main page headings

Section Title:

- 20px
- 600
- Used for major sections within a page

Subsection Title:

- 16px
- 600

Body:

- 14px
- 400

Body Emphasis:

- 14px
- 500

Secondary Text:

- 13px
- 400

Small / Caption:

- 12px
- 400

### Financial Amounts

Financial amounts should have stronger visual emphasis
than surrounding text.

Large Amount:

- 28–32px
- 600

Standard Amount:

- 16–20px
- 600

Small Amount:

- 14px
- 500

Financial numbers should remain easy to scan.

Use semantic colors when appropriate:

Income → Income color
Expense → Expense color
Transfer → Transfer color

Do not color every financial number automatically.
Use color when the transaction type or financial meaning
benefits from the distinction.

## 4. Spacing, Radius & Elevation

### Spacing System

PennyWise uses an 8px-based spacing system.

Base spacing:
8px

Common spacing values:

4px → Very small gaps
8px → Small gaps
12px → Compact spacing
16px → Standard spacing
24px → Section spacing
32px → Large spacing
40px → Major spacing
48px → Page-level spacing

Prefer these values rather than arbitrary spacing values.

### Usage

4px:

- Icon-to-text micro spacing
- Small visual adjustments

8px:

- Related elements
- Button content
- Form field internals

12px:

- Compact lists
- Badges
- Small card content

16px:

- Card padding
- Form field spacing
- Navigation items

24px:

- Section spacing
- Standard page content gaps

32px:

- Major sections
- Dashboard groups

40–48px:

- Page-level spacing
- Large visual separation

### Border Radius

Use a restrained radius system.

Small:
6px

Default:
8px

Card:
12px

Large:
16px

Pills:
9999px

### Usage

6px:

- Small controls
- Compact elements

8px:

- Buttons
- Inputs
- Selects

12px:

- Cards
- Panels
- Tables

16px:

- Large containers
- Feature sections

9999px:

- Status badges
- Tags
- Pills

Avoid excessive use of fully rounded containers.

### Borders

Default border:
1px solid #E5E7EB

Use borders to establish hierarchy and separation.

Avoid thick borders.

Avoid decorative borders.

### Shadows

PennyWise uses minimal shadows.

Default:
No shadow or very subtle shadow

Interactive/elevated elements:
Use a subtle shadow only when necessary.

Avoid:

- Heavy shadows
- Multiple layered shadows
- Glowing effects
- Neumorphism

### General Rule

The interface should feel structured through:

- spacing
- typography
- borders
- alignment

rather than through heavy decoration.

## 5. Icons

PennyWise uses Circum Icons.

### Icon Style

- Use outline icons.
- Use a consistent icon weight.
- Icons should generally be simple and recognizable.
- Icons should support the meaning of the UI rather than
  replace text unnecessarily.

### Rules

- Do not use emojis as UI icons.
- Do not mix icon libraries.
- Do not introduce another icon library.
- Do not use decorative icons unnecessarily.
- Use icons consistently for repeated actions.

### Navigation

Navigation items should use:

Icon + Label

Example:

Dashboard
Accounts
Transactions
Budgets
Savings Goals
Analytics
Settings

Icons should remain visually secondary to the labels.

### Semantic Icons

Use icons consistently for recurring concepts such as:

- Income
- Expense
- Transfer
- Account
- Budget
- Savings Goal
- Search
- Filter
- Add
- Edit
- Delete
- Settings

## 6. Core Components

PennyWise should use a small set of consistent reusable UI components.

Components should follow the design system rather than introducing
page-specific visual styles.

---

### 6.1 Buttons

#### Primary Button

Used for the main action on a page or form.

- Background: Primary
- Text: White
- Radius: 8px
- Font weight: 500
- Height: approximately 40px
- Hover: Primary Hover

Examples:

- Add Account
- Add Transaction
- Create Budget
- Save Changes

#### Secondary Button

Used for alternative or less prominent actions.

- Background: Surface
- Text: Text
- Border: Border
- Radius: 8px
- Font weight: 500

#### Destructive Button

Used for irreversible or destructive actions.

- Background: Expense
- Text: White
- Radius: 8px

Examples:

- Delete Account
- Delete Transaction

Do not use destructive styling for ordinary cancel actions.

#### Button Rules

- Keep button labels short and action-oriented.
- Do not use emojis.
- Use icons only when they improve recognition.
- Do not create unnecessary button variants.

---

### 6.2 Inputs

Inputs should be simple and easy to scan.

- Background: Surface
- Border: Border
- Radius: 8px
- Text: Text
- Placeholder: Muted Text
- Height: approximately 40px

Focus state:

- Use the Primary color to clearly indicate focus.

Error state:

- Use Expense color for the border/message.

Inputs should have visible labels.

Do not rely on placeholder text as the only label.

---

### 6.3 Select / Dropdown

Select controls should visually match inputs.

Use dropdowns for:

- Account selection
- Category selection
- Space selection
- Transaction type
- Filters

The currently selected value should be clearly visible.

---

### 6.4 Cards

Cards are the primary container for grouped information.

- Background: Surface
- Border: 1px solid Border
- Radius: 12px
- Padding: 16–24px
- Minimal/no shadow

Cards should group related information.

Do not put every individual piece of information inside
its own card.

Avoid excessive card nesting.

---

### 6.5 Badges

Badges are used for small pieces of status information.

Examples:

- Active
- Archived
- Closed
- Income
- Expense
- Transfer

Badges should use subtle backgrounds rather than highly
saturated backgrounds.

Example:

Income:

- Green text
- Primary Light background

Expense:

- Red text
- Light red background

Transfer:

- Blue text
- Light blue background

Badges should be compact and visually secondary.

---

### 6.6 Tables / Lists

Use tables for structured data when comparison between
multiple rows is important.

Use lists when chronological or activity-based scanning
is more important.

Transaction history should prioritize readability
and chronological scanning.

Table/list rules:

- Clear column or content hierarchy
- Comfortable row height
- Subtle borders
- Minimal decoration
- Important values aligned consistently
- Avoid excessive vertical lines

---

### 6.7 Progress Bars

Progress bars are used for:

- Budgets
- Savings Goals

They should communicate progress clearly.

Use:

- Neutral track
- Primary color for normal progress
- Warning when approaching a concerning threshold
- Expense color when a budget has been exceeded

Progress bars should include supporting text when the
exact amount is important.

Example:

₱7,500 / ₱10,000

rather than relying on the visual bar alone.

---

### 6.8 Modal / Dialog

Use dialogs for focused actions that do not require
leaving the current page.

Examples:

- Add Account
- Add Transaction
- Create Budget
- Create Savings Goal
- Create Space

Dialog structure:

Title
Description (when necessary)
Form/content
Actions

Primary action should be visually prominent.

Cancel should be secondary.

Destructive actions require clear confirmation.

---

### 6.9 Dropdown Menu

Use dropdown menus for contextual actions.

Examples:

- Edit
- Archive
- Delete
- Account actions

Keep menus short.

Do not hide important primary actions inside dropdown menus.

---

### 6.10 Toast / Feedback

Use temporary feedback for completed actions.

Examples:

- Account created
- Transaction added
- Changes saved
- Budget updated

Success:
Primary/green

Error:
Expense/red

Warning:
Warning/amber

Toasts should be brief and should not contain unnecessary
information.

---

### 6.11 Empty States

Empty states should explain what is missing and provide
a clear next action.

Example:

No accounts yet.

Add your first account to start tracking your finances.

[Add Account]

Avoid decorative illustrations unless they provide
meaningful value.

Do not use emojis.

---

### 6.12 Loading States

Use simple loading indicators or skeletons.

Loading states should preserve the layout of the content
when possible.

Avoid excessive animations.

---

### 6.13 Error States

Errors should be:

- Clear
- Specific
- Actionable

Avoid technical error messages when a user-friendly
message can be shown.

Example:

Unable to load transactions.

Please try again.

[Retry]

## 6.14 Interaction States

Interactive components should have clear states:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error, when applicable

Interactive states should use the existing PennyWise
color system.

Do not introduce new colors solely for interaction states.

Focus states should remain clearly visible for keyboard users.

Disabled elements should appear visually inactive while
remaining readable.

## 6.15 Theme

PennyWise MVP uses a light theme only.

Dark mode is out of scope for the initial UI implementation.

Do not implement dark mode unless explicitly requested.

## 7. Application Layout

PennyWise uses a persistent application shell consisting of:

- Sidebar
- Main content area
- Optional topbar/page header

The layout should remain consistent across authenticated pages.

---

### 7.1 Overall Structure

Desktop layout:

┌─────────────────────────────────────────────────────────┐
│ │
│ Sidebar │ Main Content │
│ │ │
│ │ Page Header │
│ │ │
│ │ Page Content │
│ │ │
│ │ │
└─────────┴───────────────────────────────────────────────┘

The sidebar provides navigation.

The main content area contains the currently selected
page and its actions.

The layout should use the full available viewport height.

### 7.2 Sidebar

The sidebar is the primary navigation area.

It should be visually restrained and should not compete
with the page content.

Structure:

1. PennyWise branding
2. Space selector
3. Main navigation
4. Settings
5. User/account area

Example:

PennyWise

[ Current Space ]
Mikee & Tan
Shared Space
[dropdown]

Dashboard
Accounts
Transactions
Budgets
Savings Goals
Analytics

Settings

[ User Profile ]

### 7.3 Navigation

Primary navigation:

- Dashboard
- Accounts
- Transactions
- Budgets
- Savings Goals
- Analytics

Secondary navigation:

- Settings

Each navigation item contains:

Icon + Label

The currently active page should have a clear visual
active state.

The active state should use the Primary Light background
and Primary text/icon color.

Do not use excessive visual decoration for the active state.

### 7.4 Space Selector

The Space selector is located near the top of the sidebar,
below the PennyWise branding.

It displays the currently selected Space.

Example:

┌──────────────────────────┐
│ Mikee & Tan v │
│ Shared Space │
└──────────────────────────┘

Clicking the selector opens a dropdown containing the
Spaces available to the current user.

Example:

Your Spaces

Mikee Personal
Personal Space

Mikee & Tan
Shared Space

- Create Space

The currently selected Space should be clearly indicated.

Switching Spaces updates the financial context of the
application.

Dashboard, transactions, budgets, savings goals, and
analytics should reflect the selected Space.

### Space vs Account

Do not visually represent a Space as a financial account.

A Space represents a financial context.

An Account represents an actual source of money.

For example:

Space:
Mikee & Tan

Accounts:

- Mikee GCash
- Tan BPI
- Shared Cash

The UI should preserve this distinction.

### 7.5 Main Content

The main content area should:

- Occupy the remaining viewport width
- Use the Background color
- Provide comfortable horizontal padding
- Maintain consistent content width
- Avoid unnecessarily wide layouts

Recommended page padding:

Desktop:
32px

Large screens:
32–48px

Content should have a sensible maximum width when
appropriate rather than stretching indefinitely.

### 7.6 Page Header

Most pages should begin with a page header.

Structure:

Page Title
Short description (when useful)

                              Primary Action

Example:

Accounts
Manage the accounts connected to this Space.

                              [ + Add Account ]

The primary action should be aligned with the page heading
when the layout allows it.

Do not repeat the Space name in every page title when the
current Space is already clearly visible in the sidebar.

### 7.7 Responsive Layout

PennyWise should support desktop, tablet, and mobile screens.

Desktop:

- Persistent sidebar
- Full navigation labels
- Main content beside sidebar

Tablet:

- Sidebar may collapse
- Main content receives more available width

Mobile:

- Sidebar becomes a drawer or mobile navigation
- Navigation labels remain accessible
- Content becomes single-column where appropriate
- Tables may transform into stacked lists/cards
- Forms should use the available screen width
- Primary actions remain easy to reach

Do not simply shrink the desktop layout onto mobile.

Mobile layouts should prioritize readability and common
financial actions.

### 7.8 Layout Rules

- Do not create a different application shell for individual pages.
- Do not create page-specific navigation systems.
- Reuse the same sidebar and navigation components.
- Maintain consistent page padding.
- Maintain consistent alignment between page headers and content.
- Avoid horizontal scrolling unless the data genuinely requires it.
- Prefer responsive layouts over fixed-width layouts.
