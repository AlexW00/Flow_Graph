# FlowGraph - alpha
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/d3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white"/>

<img src="https://github.com/AlexW00/Flow_Graph/blob/master/doc/banner-animation.gif"></img>

## What is this?

FlowGraph is a tool for visualizing relationships between concepts, making them easier to understand/explain.

→ Check it out on the [online Playground](https://alexw00.github.io/Flow_Graph/)

## 📖 Documentation

### Syntax

#### → Basic Relationship

To create a basic (positive) relationship, use the following syntax:

`"<NODE_1_NAME>"---->"<NODE_2_NAME>"`

- `<NODE_X_NAME>`: the name of the node

<details>
  <summary>Example</summary>
  <code>"Hello"---->"World"</code></br>
  <img src="https://github.com/AlexW00/Flow_Graph/blob/master/doc/hello_world.gif"></img>
</details>


#### ⚙️ Relationship options

You can also configure relationships like so:

`"<NODE_NAME>"--(<TYPE><STRENGTH>, <SPEED>)-->"<NODE_NAME>"`
- `<TYPE>`: the type of the relationship, supported types:
  - `+`: Plus
  - `-`: Minus
  - `*`: Multiplication
  - `/`: Division
- `<STRENGTH>`: the impact of the relationship
- `<SPEED>`: how fast the relationship will be executed

<details>
  <summary>Example</summary>
  <code>"Hello"--(-10, 2)-->"World"</code></br>
  <img src="https://github.com/AlexW00/Flow_Graph/blob/master/doc/hello_world_negative.gif"></img>
</details>


### Default values

- Node size: 50
- Relationship: 
  - `<TYPE>`: Plus
  - `<STRENGTH>`: 5
  - `<SPEED>`: 1

## 👨‍💻 Development

### Roadmap:

- [ ] Further polishing & bug fixes
- [ ] Obsidian Plugin
- [ ] Play/Pause controls
- [ ] GIF export

## Credits

Inspired by [Loopy](https://ncase.me/loopy/)
