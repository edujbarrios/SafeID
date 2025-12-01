# SafeID

Client-side document watermarking application with advanced protection capabilities.

![SafeID Screenshot](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Overview

SafeID is an open-source web application designed to add robust watermarks to documents directly in the browser. All processing occurs client-side, ensuring complete privacy and data security.

> [!CAUTION]
> This Open Source project is inspired by [Safelayer](https://saferlayer.com/)

## Features

- **Complete Privacy**: All processing happens locally in the browser
- **Zero Dependencies**: Pure HTML5, CSS3, and vanilla JavaScript
- **AI-Resistant Watermarks**: Multi-layer pattern technique for enhanced protection
- **Format Support**: JPG, PNG, and WEBP image formats
- **Full Customization**: Text, opacity, size, rotation, and color control
- **Responsive Design**: Works across desktop, tablet, and mobile devices
- **Dark Mode Interface**: Professional dark theme optimized for extended use
- **Offline Capable**: Functions without internet connection after initial load

## Quick Start

### Installation

Clone the repository:
```bash
git clone https://github.com/edujbarrios/SafeID.git
cd SafeID
```

### Usage

**Option 1: Direct Browser Access**
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

**Option 2: Local Server**
```bash
python -m http.server 8000
# Navigate to http://localhost:8000
```


### Technology Stack

- HTML5 (Semantic markup, Canvas API)
- CSS3 (Custom properties, Grid, Flexbox)
- JavaScript ES6+ (Modular architecture, no frameworks)

## How It Works
**Watermarking Technique:**
- Multi-layer overlapping patterns
- Variable opacity and rotation
- Subtle noise pattern injection
- Diagonal repetition coverage

## Example

![image](assets/images/image.png)


## Use Cases

- Identity document protection (IDs, passports, licenses)
- Academic credentials (diplomas, certificates)
- Legal documents (contracts, agreements)
- Financial documents (invoices, receipts)
- Proprietary content (internal documents, photographs)

## Security and Privacy

- No server communication
- No data collection or analytics
- No external dependencies
- Client-side only processing
- Offline operation capability
- Open-source and auditable

## Author

**Eduardo J. Barrios**
- GitHub: [@edujbarrios](https://github.com/edujbarrios)


