# FlowGraph - alpha
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/d3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white"/>

<img src="https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/28263/hs6g469wdcyZVS0VZVE4ow7mBDha2hqU8As438nl.gif?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQDA6SDqPEHKS2q7jSTXhkhFGdHyjRBr42jH4ypNd7nCzgIgO8joZR01%2FQN2SrbduAPITZ8eJmr%2FTN34zuMGRg9XcbgqoQIINhAAGgw5MTk1MTQ0OTE2NzQiDNHc7n3DEk35xixwVir%2BASx%2F5ymexc5ugPQebfsYi45EfH4G6iho02iCewn1tsIFx6SlU29zQZvtMBrq3WSsn1S1kGMqQoyxagOXyF5P3ucAbU8uTj7NYDTe%2BuVFBjgEvsXQpHqDJ5DDlrC%2Fam%2F1pduydVt23mzYR%2FktgZ8kXIc9%2FRmPmaR6G1s2DCmhvY7GfIKQemoNoJY9HyeLtxR7wqnD93Wh5MEKK1rom2mX7v29ylHZMj%2B9ZTnfmhJ1mKVMnhuE0TN5cySBiwvGCMx8LYqimQdK5UYOcG7OLsKhlwEFeWx72al7gFsdr8vW%2B7gdidmekzI1OXzO5rQgwPdew%2FoFIZ%2BlyBmsevxKUaY%2BMOiXtJEGOpoBzFNuUM9k1oPfKhOYuZ1QIvpPmaWNrx%2F0gdYZ1EEaXaOLvbnWpUUdljBWcvtVbgSfH8knRV9Tss9JP3tm8vVRmxC7qqxyKr3mGUfD2Nt53rAfVYZMaOus6zyjs0qsLhHWjSFg3W10tMMnEKJFytzskR8RHm9xJYIp2OvnUf7fXOzC8Nlx9UYgt2HRwXSpa88U4PRF1mMUlFRtiQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNETDTDKWQ%2F20220312%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220312T215343Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=19463632a71acfd47094f5a9ec7cbbbc8d51b3a9c9e139147feb541e0213db60"></img>

## What is this?

FlowGraph is a tool for visualizing relationships between concepts, making them easier to understand/explain.

→ check it out [HERE](https://alexw00.github.io/Flow_Graph/)

## 📖 Documentation

### Syntax

#### → Basic Relationship

To create a basic (positive) relationship, use the following syntax:

`"<NODE_1_NAME>"---->"<NODE_2_NAME>"`

- `<NODE_X_NAME>`: the name of the node

<details>
  <summary>Example</summary>
  <code>`"Hello"---->"World"`</code>
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

##### Example: 
`"Hello"--(-10, 2)-->"World"`

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
